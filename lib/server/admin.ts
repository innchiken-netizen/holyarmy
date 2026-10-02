import "server-only";
import { mockStore } from "./mock-store";
import { requirePlatformStaff, requireSuperAdmin } from "./auth";

export async function getAdminOverviewMetrics() {
  await requirePlatformStaff();

  const activeOrgs = mockStore.organizations.filter((o) => !o.is_suspended && !o.is_archived).length;
  const activeSubs = mockStore.subscriptions.filter((s) => s.status === "ACTIVE");

  // Compute MRR from active subscriptions
  const mrr = activeSubs.reduce((acc, sub) => {
    const plan = mockStore.plans.find((p) => p.id === sub.plan_id);
    return acc + (plan?.price_monthly || 0);
  }, 0);

  const pendingManualPayments = mockStore.payments.filter((p) => p.status === "PENDING").length;
  const requestsAwaitingAssignment = mockStore.creativeRequests.filter((r) => !r.assigned_to && r.status === "SUBMITTED").length;
  const requestsInProduction = mockStore.creativeRequests.filter((r) => r.status === "IN_PRODUCTION").length;
  const clientApprovalsPending = mockStore.deliverables.filter((d) => d.status === "PENDING_REVIEW").length;
  const newLeads = mockStore.leads.filter((l) => l.status === "NEW").length;

  return {
    activeOrganizations: activeOrgs,
    totalOrganizations: mockStore.organizations.length,
    activeSubscriptions: activeSubs.length,
    mrrCents: mrr,
    pendingManualPayments,
    requestsAwaitingAssignment,
    requestsInProduction,
    clientApprovalsPending,
    newLeads,
  };
}

export async function getAllOrganizations() {
  await requirePlatformStaff();
  return mockStore.organizations.map((org) => {
    const sub = mockStore.subscriptions.find((s) => s.organization_id === org.id);
    const plan = sub ? mockStore.plans.find((p) => p.id === sub.plan_id) : null;
    const reqCount = mockStore.creativeRequests.filter((r) => r.organization_id === org.id).length;
    return {
      ...org,
      subscription: sub,
      plan,
      requestCount: reqCount,
    };
  });
}

export async function getAllRequestsAdmin() {
  await requirePlatformStaff();
  return mockStore.creativeRequests.map((req) => {
    const org = mockStore.organizations.find((o) => o.id === req.organization_id);
    const creator = mockStore.profiles.find((p) => p.id === req.created_by);
    const assignee = req.assigned_to ? mockStore.profiles.find((p) => p.id === req.assigned_to) : null;
    return {
      ...req,
      organizationName: org?.name || "Organisation",
      creatorName: creator?.full_name || creator?.email || "Utilisateur",
      assigneeName: assignee?.full_name || "Non assigné",
    };
  });
}

export async function getAllPaymentsAdmin() {
  await requirePlatformStaff();
  return mockStore.payments.map((p) => {
    const org = mockStore.organizations.find((o) => o.id === p.organization_id);
    return {
      ...p,
      organizationName: org?.name || "Organisation",
    };
  });
}

export async function getAllLeadsAdmin() {
  await requirePlatformStaff();
  return mockStore.leads;
}

export async function getAllAuditLogsAdmin() {
  await requirePlatformStaff();
  return mockStore.auditLogs.map((log) => {
    const actor = mockStore.profiles.find((p) => p.id === log.actor_id);
    const org = log.organization_id ? mockStore.organizations.find((o) => o.id === log.organization_id) : null;
    return {
      ...log,
      actorName: actor?.full_name || actor?.email || "Système",
      organizationName: org?.name || null,
    };
  });
}

export async function toggleOrganizationSuspension(orgId: string, suspend: boolean) {
  const staff = await requireSuperAdmin();
  const org = mockStore.organizations.find((o) => o.id === orgId);
  if (!org) throw new Error("Organisation introuvable");

  org.is_suspended = suspend;
  org.updated_at = new Date().toISOString();

  mockStore.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    organization_id: org.id,
    actor_id: staff.id,
    action: suspend ? "ORGANIZATION_SUSPENDED" : "ORGANIZATION_UNSUSPENDED",
    resource_type: "organization",
    resource_id: org.id,
    metadata: { is_suspended: suspend },
    created_at: new Date().toISOString(),
  });

  return org;
}