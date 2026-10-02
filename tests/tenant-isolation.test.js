const test = require("node:test");
const assert = require("node:assert/strict");

// Simulated multi-tenant repository
const mockDb = {
  organizations: [
    { id: "org-A", name: "Église A" },
    { id: "org-B", name: "Église B" },
  ],
  members: [
    { orgId: "org-A", userId: "user-1", role: "OWNER" },
    { orgId: "org-B", userId: "user-2", role: "OWNER" },
  ],
  requests: [
    { id: "req-A-1", orgId: "org-A", title: "Affiche Église A" },
    { id: "req-B-1", orgId: "org-B", title: "Affiche Église B" },
  ],
  invoices: [
    { id: "inv-A-1", orgId: "org-A", amount: 199000 },
    { id: "inv-B-1", orgId: "org-B", amount: 399000 },
  ],
};

function getRequestsForUser(userId) {
  const userMemberships = mockDb.members.filter((m) => m.userId === userId);
  const authorizedOrgIds = userMemberships.map((m) => m.orgId);
  return mockDb.requests.filter((r) => authorizedOrgIds.includes(r.orgId));
}

function getInvoicesForUser(userId) {
  const userMemberships = mockDb.members.filter((m) => m.userId === userId);
  const authorizedOrgIds = userMemberships.map((m) => m.orgId);
  return mockDb.invoices.filter((i) => authorizedOrgIds.includes(i.orgId));
}

function canUserAccessRequest(userId, requestId) {
  const targetReq = mockDb.requests.find((r) => r.id === requestId);
  if (!targetReq) return false;
  const isMember = mockDb.members.some(
    (m) => m.userId === userId && m.orgId === targetReq.orgId
  );
  return isMember;
}

test("Multi-Tenant Isolation — User of Org A cannot see Org B requests", () => {
  const requests = getRequestsForUser("user-1");
  assert.equal(requests.length, 1);
  assert.equal(requests[0].id, "req-A-1");
  assert.equal(requests.some((r) => r.orgId === "org-B"), false);
});

test("Multi-Tenant Isolation — Adversarial access denied", () => {
  // User 1 attempts direct IDOR query on Org B request
  const accessAllowed = canUserAccessRequest("user-1", "req-B-1");
  assert.equal(accessAllowed, false);
});

test("Multi-Tenant Isolation — Financial records isolation", () => {
  const invoices = getInvoicesForUser("user-1");
  assert.equal(invoices.length, 1);
  assert.equal(invoices[0].amount, 199000);
  assert.equal(invoices.some((i) => i.orgId === "org-B"), false);
});