import { OrganizationRole, PlatformRole, Permission } from "../types";

export const ORG_ROLE_PERMISSIONS: Record<OrganizationRole, Permission[]> = {
  OWNER: [
    "organization.read",
    "organization.update",
    "organization.delete",
    "team.read",
    "team.invite",
    "team.update_role",
    "team.remove",
    "billing.read",
    "billing.manage",
    "request.create",
    "request.read",
    "request.update",
    "request.delete",
    "request.approve",
    "campaign.create",
    "campaign.read",
    "campaign.update",
    "campaign.delete",
    "asset.read",
    "asset.upload",
    "asset.delete",
    "profile.read",
    "profile.update",
    "profile.publish",
    "analytics.read",
    "support.create",
    "support.read",
  ],
  ADMIN: [
    "organization.read",
    "organization.update",
    "team.read",
    "team.invite",
    "team.update_role",
    "billing.read",
    "request.create",
    "request.read",
    "request.update",
    "request.approve",
    "campaign.create",
    "campaign.read",
    "campaign.update",
    "asset.read",
    "asset.upload",
    "asset.delete",
    "profile.read",
    "profile.update",
    "profile.publish",
    "analytics.read",
    "support.create",
    "support.read",
  ],
  EDITOR: [
    "organization.read",
    "team.read",
    "request.create",
    "request.read",
    "request.update",
    "campaign.read",
    "asset.read",
    "asset.upload",
    "profile.read",
    "profile.update",
    "analytics.read",
    "support.create",
    "support.read",
  ],
  MEMBER: [
    "organization.read",
    "team.read",
    "request.create",
    "request.read",
    "campaign.read",
    "asset.read",
    "profile.read",
    "support.create",
    "support.read",
  ],
  VIEWER: [
    "organization.read",
    "team.read",
    "request.read",
    "campaign.read",
    "asset.read",
    "profile.read",
    "support.read",
  ],
};

export function hasOrgPermission(
  role: OrganizationRole | null | undefined,
  permission: Permission
): boolean {
  if (!role) return false;
  const permissions = ORG_ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}

export function isPlatformStaffOrAdmin(role: PlatformRole | null | undefined): boolean {
  if (!role) return false;
  return ["SUPER_ADMIN", "ADMIN", "STAFF", "SUPPORT"].includes(role);
}

export function isPlatformSuperAdmin(role: PlatformRole | null | undefined): boolean {
  return role === "SUPER_ADMIN";
}