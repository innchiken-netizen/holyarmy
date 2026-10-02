import "server-only";
import { mockStore } from "./mock-store";
import { requireOrgPermission, getCurrentOrganization } from "./organizations";
import { requireUser } from "./auth";
import { Deliverable } from "../types";

export async function getOrganizationDeliverables(): Promise<Deliverable[]> {
  const { organization } = await requireOrgPermission("asset.read");
  return mockStore.deliverables
    .filter((d) => d.organization_id === organization.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getDeliverablesByRequest(requestId: string): Promise<Deliverable[]> {
  const { organization } = await getCurrentOrganization();
  return mockStore.deliverables
    .filter((d) => d.request_id === requestId && d.organization_id === organization.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function submitDeliverableApproval(
  deliverableId: string,
  action: "APPROVED" | "CHANGES_REQUESTED",
  comment?: string
): Promise<Deliverable> {
  const { organization } = await requireOrgPermission("request.approve");
  const user = await requireUser();

  const deliverable = mockStore.deliverables.find(
    (d) => d.id === deliverableId && d.organization_id === organization.id
  );
  if (!deliverable) {
    throw new Error("Livrable introuvable");
  }

  deliverable.status = action;

  // Update associated request status
  const request = mockStore.creativeRequests.find((r) => r.id === deliverable.request_id);
  if (request) {
    if (action === "APPROVED") {
      request.status = "APPROVED";
    } else {
      request.status = "CHANGES_REQUESTED";
    }
    request.updated_at = new Date().toISOString();
  }

  // Record audit log
  mockStore.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    organization_id: organization.id,
    actor_id: user.id,
    action: action === "APPROVED" ? "DELIVERABLE_APPROVED" : "DELIVERABLE_REVISION_REQUESTED",
    resource_type: "deliverable",
    resource_id: deliverable.id,
    metadata: { version: deliverable.version, comment },
    created_at: new Date().toISOString(),
  });

  return deliverable;
}

export async function uploadDeliverableVersion(data: {
  requestId: string;
  title: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  thumbnailUrl?: string;
}): Promise<Deliverable> {
  const user = await requireUser();
  const request = mockStore.creativeRequests.find((r) => r.id === data.requestId);
  if (!request) {
    throw new Error("Demande introuvable");
  }

  const existingDeliverables = mockStore.deliverables.filter((d) => d.request_id === data.requestId);
  const nextVersion = existingDeliverables.length + 1;

  const newDeliverable: Deliverable = {
    id: `deliv-${Date.now()}`,
    organization_id: request.organization_id,
    request_id: request.id,
    uploaded_by: user.id,
    title: data.title,
    version: nextVersion,
    file_url: data.fileUrl,
    file_type: data.fileType,
    file_size: data.fileSize,
    thumbnail_url: data.thumbnailUrl || null,
    status: "PENDING_REVIEW",
    created_at: new Date().toISOString(),
  };

  mockStore.deliverables.unshift(newDeliverable);

  // Transition request to CLIENT_REVIEW
  request.status = "CLIENT_REVIEW";
  request.updated_at = new Date().toISOString();

  // Notify client organization
  mockStore.notifications.unshift({
    id: `notif-${Date.now()}`,
    user_id: request.created_by,
    organization_id: request.organization_id,
    title: "Nouveau livrable disponible pour validation",
    message: `La version ${nextVersion} de "${request.title}" est prête pour votre révision.`,
    link_url: `/dashboard/deliverables`,
    is_read: false,
    created_at: new Date().toISOString(),
  });

  return newDeliverable;
}