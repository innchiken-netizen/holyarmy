import "server-only";
import { mockStore } from "./mock-store";
import { requireOrgPermission, getCurrentOrganization } from "./organizations";
import { validateSlug } from "../validation/reserved-slugs";
import { DigitalProfile, ProfileStatus } from "../types";

export async function getOrganizationDigitalProfile(): Promise<DigitalProfile> {
  const { organization } = await requireOrgPermission("profile.read");
  let profile = mockStore.digitalProfiles.find((p) => p.organization_id === organization.id);

  if (!profile) {
    // Generate initial draft profile
    profile = {
      id: `dp-${Date.now()}`,
      organization_id: organization.id,
      slug: organization.slug,
      display_name: organization.name,
      pastor_name: organization.pastor_name || "Pasteur",
      church_name: organization.name,
      bio: "Bienvenue sur notre espace officiel holy.army.",
      avatar_url: null,
      cover_url: null,
      template_id: "minimal-editorial",
      status: "DRAFT",
      location: `${organization.city || "Paris"}, ${organization.country || "France"}`,
      contact_email: null,
      contact_phone: null,
      whatsapp_number: null,
      giving_url: null,
      youtube_url: null,
      instagram_url: null,
      facebook_url: null,
      tiktok_url: null,
      twitter_url: null,
      custom_links: [],
      sermons: [],
      events: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockStore.digitalProfiles.push(profile);
  }

  return profile;
}

export async function getPublicDigitalProfileBySlug(slug: string): Promise<DigitalProfile | null> {
  const cleanSlug = slug.toLowerCase().trim();
  const profile = mockStore.digitalProfiles.find(
    (p) => p.slug.toLowerCase() === cleanSlug && p.status === "PUBLISHED"
  );
  return profile || null;
}

export async function updateDigitalProfile(
  data: Partial<DigitalProfile> & { slug?: string }
): Promise<DigitalProfile> {
  const { organization } = await requireOrgPermission("profile.update");
  let profile = mockStore.digitalProfiles.find((p) => p.organization_id === organization.id);

  if (!profile) {
    profile = await getOrganizationDigitalProfile();
  }

  if (data.slug && data.slug !== profile.slug) {
    const slugValidation = validateSlug(data.slug);
    if (!slugValidation.valid) {
      throw new Error(slugValidation.error);
    }

    const existingSlug = mockStore.digitalProfiles.find(
      (p) => p.slug.toLowerCase() === data.slug!.toLowerCase() && p.id !== profile!.id
    );
    if (existingSlug) {
      throw new Error("Cet identifiant public est déjà utilisé par un autre ministère.");
    }

    profile.slug = data.slug.toLowerCase().trim();
  }

  Object.assign(profile, data, { updated_at: new Date().toISOString() });
  return profile;
}

export async function setProfilePublishStatus(status: ProfileStatus): Promise<DigitalProfile> {
  const { organization } = await requireOrgPermission("profile.publish");
  const profile = await getOrganizationDigitalProfile();

  profile.status = status;
  profile.updated_at = new Date().toISOString();
  return profile;
}

export async function getProfileAnalyticsSummary(organizationId: string) {
  // Simulated analytics derived from realistic profile events
  return {
    viewsThisMonth: 1420,
    uniqueVisitors: 890,
    linkClicks: 320,
    givingClicks: 74,
    topLinks: [
      { label: "Culte en Direct", count: 184 },
      { label: "Écouter le podcast", count: 86 },
      { label: "Faire un don", count: 74 },
    ],
    devices: {
      mobile: "78%",
      desktop: "19%",
      tablet: "3%",
    },
  };
}