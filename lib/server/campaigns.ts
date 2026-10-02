import "server-only";
import { mockStore } from "./mock-store";
import { requireOrgPermission, getCurrentOrganization } from "./organizations";
import { requireUser } from "./auth";
import { Campaign } from "../types";

export async function getOrganizationCampaigns(): Promise<Campaign[]> {
  const { organization } = await requireOrgPermission("campaign.read");
  return mockStore.campaigns
    .filter((c) => c.organization_id === organization.id && c.status !== "ARCHIVED")
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createCampaign(data: {
  name: string;
  objective?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  channels?: string[];
}): Promise<Campaign> {
  const { organization } = await requireOrgPermission("campaign.create");
  const user = await requireUser();

  const newCampaign: Campaign = {
    id: `camp-${Date.now()}`,
    organization_id: organization.id,
    created_by: user.id,
    name: data.name,
    objective: data.objective || null,
    description: data.description || null,
    start_date: data.startDate || null,
    end_date: data.endDate || null,
    status: "ACTIVE",
    channels: data.channels || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockStore.campaigns.unshift(newCampaign);
  return newCampaign;
}