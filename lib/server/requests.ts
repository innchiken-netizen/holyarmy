import "server-only";
import { mockStore } from "./mock-store";
import { requireOrgPermission, getCurrentOrganization } from "./organizations";
import { requireUser } from "./auth";
import { CreativeRequest, RequestStatus, RequestCategory, RequestPriority } from "../types";

export async function getOrganizationRequests(): Promise<CreativeRequest[]> {
  const { organization } = await requireOrgPermission("request.read");
  return mockStore.creativeRequests
    .filter((r) => r.organization_id === organization.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getRequestById(id: string): Promise<CreativeRequest | null> {
  const { organization } = await getCurrentOrganization();
  const request = mockStore.creativeRequests.find(
    (r) => r.id === id && r.organization_id === organization.id
  );
  return request || null;
}

export async function createCreativeRequest(data: {
  title: string;
  category: RequestCategory;
  objective?: string;
  description: string;
  targetAudience?: string;
  deadline?: string;
  priority?: RequestPriority;
  channels?: string[];
  formatSpecs?: string;
  referenceLinks?: string[];
  campaignId?: string | null;
}): Promise<CreativeRequest> {
  const { organization } = await requireOrgPermission("request.create");
  const user = await requireUser();

  const newRequest: CreativeRequest = {
    id: `req-${Date.now()}`,
    organization_id: organization.id,
    created_by: user.id,
    assigned_to: null,
    campaign_id: data.campaignId || null,
    title: data.title,
    category: data.category,
    objective: data.objective || null,
    description: data.description,
    target_audience: data.targetAudience || null,
    deadline: data.deadline || null,
    priority: data.priority || "NORMAL",
    status: "SUBMITTED",
    channels: data.channels || [],
    format_specs: data.formatSpecs || null,
    reference_links: data.referenceLinks || [],
    attachments: [],
    internal_notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockStore.creativeRequests.unshift(newRequest);

  // Notify team/staff
  mockStore.notifications.unshift({
    id: `notif-${Date.now()}`,
    user_id: user.id,
    organization_id: organization.id,
    title: "Demande créée avec succès",
    message: `Votre demande "${newRequest.title}" a été transmise à l'équipe holy.army.`,
    link_url: `/dashboard/requests/${newRequest.id}`,
    is_read: false,
    created_at: new Date().toISOString(),
  });

  return newRequest;
}

export async function updateRequestStatus(
  requestId: string,
  newStatus: RequestStatus,
  notes?: string
): Promise<CreativeRequest> {
  const user = await requireUser();
  const request = mockStore.creativeRequests.find((r) => r.id === requestId);
  if (!request) {
    throw new Error("Demande introuvable");
  }

  request.status = newStatus;
  request.updated_at = new Date().toISOString();
  if (notes) {
    request.internal_notes = notes;
  }

  return request;
}