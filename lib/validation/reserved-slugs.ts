export const RESERVED_SLUGS: readonly string[] = [
  "admin",
  "dashboard",
  "login",
  "signup",
  "register",
  "pricing",
  "services",
  "contact",
  "about",
  "api",
  "auth",
  "privacy",
  "terms",
  "settings",
  "support",
  "billing",
  "portfolio",
  "blog",
  "how-it-works",
  "digital-profiles",
  "onboarding",
  "checkout",
  "legal",
  "faq",
  "help",
  "docs",
  "status",
  "health",
  "webhooks",
  "cron",
  "public",
  "assets",
  "static",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "holy",
  "army",
  "holyarmy",
  "root",
  "system",
  "null",
  "undefined",
];

export function isReservedSlug(slug: string): boolean {
  if (!slug) return true;
  const clean = slug.trim().toLowerCase();
  return RESERVED_SLUGS.includes(clean);
}

export function isValidSlugFormat(slug: string): boolean {
  if (!slug) return false;
  // Slug format: 3-50 chars, lowercase letters, numbers, and hyphens only, cannot start or end with hyphen
  const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slug.length >= 3 && slug.length <= 50 && regex.test(slug);
}

export function validateSlug(slug: string): { valid: boolean; error?: string } {
  const clean = slug.trim().toLowerCase();
  if (clean.length < 3) {
    return { valid: false, error: "Le slug doit contenir au moins 3 caractères." };
  }
  if (clean.length > 50) {
    return { valid: false, error: "Le slug ne peut pas dépasser 50 caractères." };
  }
  if (!isValidSlugFormat(clean)) {
    return {
      valid: false,
      error: "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets.",
    };
  }
  if (isReservedSlug(clean)) {
    return { valid: false, error: "Ce lien personnalisé est réservé par la plateforme." };
  }
  return { valid: true };
}