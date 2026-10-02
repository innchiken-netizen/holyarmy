const test = require("node:test");
const assert = require("node:assert/strict");

const RESERVED_SLUGS = [
  "admin", "dashboard", "login", "signup", "register", "pricing", 
  "services", "contact", "about", "api", "auth", "privacy", "terms", 
  "settings", "support", "billing", "portfolio", "blog"
];

function isReservedSlug(slug) {
  if (!slug) return true;
  return RESERVED_SLUGS.includes(slug.trim().toLowerCase());
}

function isValidSlugFormat(slug) {
  if (!slug) return false;
  const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slug.length >= 3 && slug.length <= 50 && regex.test(slug);
}

function validateSlug(slug) {
  const clean = slug ? slug.trim().toLowerCase() : "";
  if (clean.length < 3) return { valid: false, error: "trop court" };
  if (clean.length > 50) return { valid: false, error: "trop long" };
  if (!isValidSlugFormat(clean)) return { valid: false, error: "format invalide" };
  if (isReservedSlug(clean)) return { valid: false, error: "slug réservé" };
  return { valid: true };
}

test("Slug Validation — Valid ministry slugs", () => {
  assert.equal(validateSlug("paulmukendi").valid, true);
  assert.equal(validateSlug("reveil-vie").valid, true);
  assert.equal(validateSlug("impact-centre-2027").valid, true);
});

test("Slug Validation — Reserved platform slugs rejected", () => {
  assert.equal(validateSlug("admin").valid, false);
  assert.equal(validateSlug("dashboard").valid, false);
  assert.equal(validateSlug("login").valid, false);
  assert.equal(validateSlug("billing").valid, false);
  assert.equal(validateSlug("api").valid, false);
});

test("Slug Validation — Invalid characters and formatting rejected", () => {
  assert.equal(validateSlug("ab").valid, false); // < 3 chars
  assert.equal(validateSlug("Pasteur Paul!").valid, false); // spaces & special chars
  assert.equal(validateSlug("-centre-reveil").valid, false); // leading hyphen
  assert.equal(validateSlug("centre-reveil-").valid, false); // trailing hyphen
});