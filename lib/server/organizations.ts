import "server-only";
import { cookies } from "next/headers";
import { mockStore } from "./mock-store";
import { requireUser } from "./auth";
import { Organization, OrganizationMember, OrganizationRole, Permission } from "../types";
import { hasOrgPermission } from "../permissions";

export async function getUserOrganizations(userId?: string): Promise<Organization[]> {
  const user = userId ? { id: userId } : await requireUser();
  const memberOrgs = mockStore.members.filter((m) => m.user_id === user.id);
  const orgIds = memberOrgs.map((m) => m.organization_id);

  return mockStore.organizations.filter(
    (org) => orgIds.includes(org.id) && !org.is_archived
  );
}

export async function getCurrentOrganization(): Promise<{
  organization: Organization;
  membership: OrganizationMember;
}> {
  const user = await requireUser();
  const cookieStore = await cookies();
  const selectedOrgId = cookieStore.get("ha_org_id")?.value;

  const userMemberships = mockStore.members.filter((m) => m.user_id === user.id);
  if (userMemberships.length === 0) {
    // If user has no organization yet, return default or throw for onboarding
    const defaultOrg = mockStore.organizations[0];
    const defaultMembership: OrganizationMember = {
      id: "mem-default",
      organization_id: defaultOrg.id,
      user_id: user.id,
      role: "OWNER",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return { organization: defaultOrg, membership: defaultMembership };
  }

  let membership = userMemberships.find((m) => m.organization_id === selectedOrgId);
  if (!membership) {
    membership = userMemberships[0];
  }

  const organization = mockStore.organizations.find((o) => o.id === membership.organization_id);
  if (!organization) {
    throw new Error("Organization introuvable");
  }

  return { organization, membership };
}

export async function requireOrgPermission(permission: Permission): Promise<{
  organization: Organization;
  membership: OrganizationMember;
}> {
  const { organization, membership } = await getCurrentOrganization();

  if (organization.is_suspended) {
    throw new Error("FORBIDDEN: Cette organisation est actuellement suspendue");
  }

  if (!hasOrgPermission(membership.role, permission)) {
    throw new Error(`FORBIDDEN: Permission '${permission}' non accordée pour le rôle ${membership.role}`);
  }

  return { organization, membership };
}

export async function getOrganizationMembers(organizationId: string) {
  const members = mockStore.members.filter((m) => m.organization_id === organizationId);
  return members.map((m) => {
    const profile = mockStore.profiles.find((p) => p.id === m.user_id);
    return {
      ...m,
      profile,
    };
  });
}

export async function createOrganization(data: {
  name: string;
  slug: string;
  church_type?: string;
  pastor_name?: string;
  country?: string;
  city?: string;
}) {
  const user = await requireUser();

  const newOrg: Organization = {
    id: `org-${Date.now()}`,
    name: data.name,
    slug: data.slug.toLowerCase().trim(),
    logo_url: null,
    website: null,
    church_type: data.church_type || null,
    pastor_name: data.pastor_name || null,
    country: data.country || "France",
    city: data.city || null,
    is_suspended: false,
    is_archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockStore.organizations.push(newOrg);

  const newMembership: OrganizationMember = {
    id: `mem-${Date.now()}`,
    organization_id: newOrg.id,
    user_id: user.id,
    role: "OWNER",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockStore.members.push(newMembership);

  return newOrg;
}