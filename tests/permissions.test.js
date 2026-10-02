const test = require("node:test");
const assert = require("node:assert/strict");

const ORG_ROLE_PERMISSIONS = {
  OWNER: [
    "organization.read", "organization.update", "organization.delete",
    "team.read", "team.invite", "billing.read", "billing.manage",
    "request.create", "request.read", "request.update", "request.approve",
    "asset.read", "asset.upload", "profile.update", "profile.publish"
  ],
  ADMIN: [
    "organization.read", "organization.update", "team.read", "team.invite",
    "billing.read", "request.create", "request.read", "request.update",
    "request.approve", "asset.read", "asset.upload", "profile.update", "profile.publish"
  ],
  EDITOR: [
    "organization.read", "team.read", "request.create", "request.read",
    "request.update", "asset.read", "asset.upload", "profile.update"
  ],
  VIEWER: [
    "organization.read", "team.read", "request.read", "asset.read"
  ],
};

function hasOrgPermission(role, permission) {
  if (!role) return false;
  const permissions = ORG_ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}

test("Permissions — OWNER has full billing and deletion authority", () => {
  assert.equal(hasOrgPermission("OWNER", "billing.manage"), true);
  assert.equal(hasOrgPermission("OWNER", "organization.delete"), true);
  assert.equal(hasOrgPermission("OWNER", "request.approve"), true);
});

test("Permissions — VIEWER cannot create or approve requests", () => {
  assert.equal(hasOrgPermission("VIEWER", "request.create"), false);
  assert.equal(hasOrgPermission("VIEWER", "request.approve"), false);
  assert.equal(hasOrgPermission("VIEWER", "billing.manage"), false);
  assert.equal(hasOrgPermission("VIEWER", "request.read"), true);
});

test("Permissions — EDITOR can create requests but cannot manage billing", () => {
  assert.equal(hasOrgPermission("EDITOR", "request.create"), true);
  assert.equal(hasOrgPermission("EDITOR", "billing.manage"), false);
});