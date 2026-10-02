const test = require("node:test");
const assert = require("node:assert/strict");

const ALLOWED_STATUS_TRANSITIONS = {
  DRAFT: ["SUBMITTED", "CANCELLED"],
  SUBMITTED: ["UNDER_REVIEW", "IN_PRODUCTION", "CANCELLED"],
  UNDER_REVIEW: ["IN_PRODUCTION", "NEEDS_INFORMATION", "CANCELLED"],
  IN_PRODUCTION: ["CLIENT_REVIEW", "NEEDS_INFORMATION"],
  CLIENT_REVIEW: ["APPROVED", "CHANGES_REQUESTED"],
  CHANGES_REQUESTED: ["IN_PRODUCTION"],
  APPROVED: ["DELIVERED"],
  DELIVERED: ["ARCHIVED"],
};

function canTransition(currentStatus, nextStatus) {
  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus];
  return allowed ? allowed.includes(nextStatus) : false;
}

test("Creative Workflow — Valid state transitions", () => {
  assert.equal(canTransition("SUBMITTED", "IN_PRODUCTION"), true);
  assert.equal(canTransition("IN_PRODUCTION", "CLIENT_REVIEW"), true);
  assert.equal(canTransition("CLIENT_REVIEW", "APPROVED"), true);
  assert.equal(canTransition("CLIENT_REVIEW", "CHANGES_REQUESTED"), true);
  assert.equal(canTransition("APPROVED", "DELIVERED"), true);
});

test("Creative Workflow — Invalid direct jumps blocked", () => {
  // Cannot jump from DELIVERED to DRAFT
  assert.equal(canTransition("DELIVERED", "DRAFT"), false);
  // Cannot jump directly from DRAFT to APPROVED
  assert.equal(canTransition("DRAFT", "APPROVED"), false);
});