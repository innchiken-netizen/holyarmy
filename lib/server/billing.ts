import "server-only";
import { mockStore, InvoiceRecord } from "./mock-store";
import { requireOrgPermission, getCurrentOrganization } from "./organizations";
import { requireUser, requirePlatformStaff } from "./auth";
import { Plan, Subscription, PaymentStatus } from "../types";

export async function getAvailablePlans(): Promise<Plan[]> {
  return mockStore.plans.filter((p) => p.is_active);
}

export async function getOrganizationSubscription(): Promise<{
  subscription: Subscription | null;
  plan: Plan | null;
}> {
  const { organization } = await requireOrgPermission("billing.read");
  const subscription = mockStore.subscriptions.find((s) => s.organization_id === organization.id) || null;
  const plan = subscription ? mockStore.plans.find((p) => p.id === subscription.plan_id) || null : null;

  return { subscription, plan };
}

export async function getEntitlements(organizationId: string) {
  const subscription = mockStore.subscriptions.find((s) => s.organization_id === organizationId);
  const plan = subscription ? mockStore.plans.find((p) => p.id === subscription.plan_id) : mockStore.plans[0];

  const orgRequests = mockStore.creativeRequests.filter((r) => r.organization_id === organizationId);
  const currentMonthVisuals = orgRequests.filter((r) => r.category !== "VIDEO_AD" && r.category !== "MOTION_FLYER").length;
  const currentMonthVideos = orgRequests.filter((r) => r.category === "VIDEO_AD" || r.category === "MOTION_FLYER").length;

  return {
    canUse: (feature: string) => {
      if (feature === "priority_queue") return plan?.has_priority_queue ?? false;
      if (feature === "dedicated_art_director") return plan?.code === "strike_force";
      if (feature === "video_motion") return (plan?.max_video_requests_monthly ?? 0) > 0;
      if (feature === "unlimited_revisions") return (plan?.max_revisions_per_request ?? 0) > 10;
      return true;
    },
    getLimit: (feature: string) => {
      if (feature === "visual_requests") return plan?.max_visual_requests_monthly ?? 10;
      if (feature === "video_requests") return plan?.max_video_requests_monthly ?? 1;
      if (feature === "storage_bytes") return plan?.storage_limit_bytes ?? 10737418240;
      if (feature === "team_seats") return plan?.team_seats_limit ?? 2;
      return 0;
    },
    getUsage: (feature: string) => {
      if (feature === "visual_requests") return currentMonthVisuals;
      if (feature === "video_requests") return currentMonthVideos;
      if (feature === "storage_bytes") return 1240000000; // ~1.24 GB
      if (feature === "team_seats") return 2;
      return 0;
    },
    plan,
    status: subscription?.status || "INACTIVE",
  };
}

export async function submitManualPayment(data: {
  amount: number;
  planId: string;
  notes?: string;
  proofUrl?: string;
}) {
  const { organization } = await requireOrgPermission("billing.manage");
  const user = await requireUser();

  const newPayment = {
    id: `pay-${Date.now()}`,
    organization_id: organization.id,
    amount: data.amount,
    currency: "EUR",
    provider: "MANUAL" as const,
    status: "PENDING" as PaymentStatus,
    proof_url: data.proofUrl || null,
    notes: data.notes || "Virement manuel en attente de vérification bancaire",
    created_at: new Date().toISOString(),
  };

  mockStore.payments.unshift(newPayment);

  // Update subscription status to PAYMENT_PENDING
  let subscription = mockStore.subscriptions.find((s) => s.organization_id === organization.id);
  if (subscription) {
    subscription.status = "PAYMENT_PENDING";
    subscription.plan_id = data.planId;
    subscription.payment_method = "MANUAL";
  } else {
    subscription = {
      id: `sub-${Date.now()}`,
      organization_id: organization.id,
      plan_id: data.planId,
      status: "PAYMENT_PENDING",
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
      cancel_at_period_end: false,
      payment_method: "MANUAL",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockStore.subscriptions.push(subscription);
  }

  // Audit log
  mockStore.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    organization_id: organization.id,
    actor_id: user.id,
    action: "MANUAL_PAYMENT_SUBMITTED",
    resource_type: "payment",
    resource_id: newPayment.id,
    metadata: { amount: data.amount, planId: data.planId },
    created_at: new Date().toISOString(),
  });

  return newPayment;
}

export async function verifyManualPayment(paymentId: string, approve: boolean, notes?: string) {
  const staff = await requirePlatformStaff();
  const payment = mockStore.payments.find((p) => p.id === paymentId);
  if (!payment) {
    throw new Error("Paiement introuvable");
  }

  if (approve) {
    payment.status = "VERIFIED";
    const subscription = mockStore.subscriptions.find((s) => s.organization_id === payment.organization_id);
    if (subscription) {
      subscription.status = "ACTIVE";
      subscription.current_period_start = new Date().toISOString();
      subscription.current_period_end = new Date(Date.now() + 30 * 86400000).toISOString();
      subscription.updated_at = new Date().toISOString();
    }

    // Generate invoice
    const newInvoice: InvoiceRecord = {
      id: `inv-${Date.now()}`,
      organization_id: payment.organization_id,
      invoice_number: `HA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: payment.amount,
      currency: payment.currency,
      status: "PAID",
      payment_method: "Virement Bancaire (Vérifié)",
      due_date: new Date().toISOString(),
      paid_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      items: [
        {
          id: `item-${Date.now()}`,
          invoice_id: `inv-${Date.now()}`,
          description: "Abonnement holy.army — Paiement manuel validé",
          quantity: 1,
          unit_amount: payment.amount,
          total_amount: payment.amount,
        },
      ],
    };
    mockStore.invoices.unshift(newInvoice);
  } else {
    payment.status = "FAILED";
  }

  // Audit log
  mockStore.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    organization_id: payment.organization_id,
    actor_id: staff.id,
    action: approve ? "MANUAL_PAYMENT_APPROVED" : "MANUAL_PAYMENT_REJECTED",
    resource_type: "payment",
    resource_id: payment.id,
    metadata: { notes, approved: approve },
    created_at: new Date().toISOString(),
  });

  return payment;
}

export async function getOrganizationInvoices(): Promise<InvoiceRecord[]> {
  const { organization } = await requireOrgPermission("billing.read");
  return mockStore.invoices
    .filter((inv) => inv.organization_id === organization.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}