import { z } from "zod";
import { isReservedSlug, isValidSlugFormat } from "./reserved-slugs";

export const slugSchema = z
  .string()
  .min(3, "Le slug doit comporter au moins 3 caractères")
  .max(50, "Le slug ne peut dépasser 50 caractères")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Format invalide (minuscules, chiffres, tirets)")
  .refine((slug) => !isReservedSlug(slug), {
    message: "Cet identifiant est réservé par le système",
  });

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Au moins 8 caractères requis"),
  organizationName: z.string().min(2, "Le nom de l'église ou ministère est requis"),
});

export const creativeRequestSchema = z.object({
  title: z.string().min(3, "Le titre est requis"),
  category: z.enum([
    "SOCIAL_VISUAL",
    "FLYER",
    "MOTION_FLYER",
    "VIDEO_AD",
    "SOCIAL_MEDIA_CAMPAIGN",
    "BRANDING",
    "WEBSITE",
    "EVENT_CAMPAIGN",
    "CUSTOM_REQUEST",
  ]),
  objective: z.string().optional(),
  description: z.string().min(10, "Veuillez fournir une description détaillée d'au moins 10 caractères"),
  targetAudience: z.string().optional(),
  deadline: z.string().optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  channels: z.array(z.string()).default([]),
  formatSpecs: z.string().optional(),
  referenceLinks: z.array(z.string().url("URL de référence invalide")).default([]),
  campaignId: z.string().uuid().optional().nullable(),
});

export const digitalProfileSchema = z.object({
  displayName: z.string().min(2, "Nom d'affichage requis"),
  pastorName: z.string().min(2, "Nom du pasteur requis"),
  churchName: z.string().min(2, "Nom du ministère ou église requis"),
  bio: z.string().max(500, "Bio limitée à 500 caractères").optional().nullable(),
  avatarUrl: z.string().url("URL d'avatar invalide").optional().nullable(),
  coverUrl: z.string().url("URL de couverture invalide").optional().nullable(),
  templateId: z.enum(["minimal-editorial", "bold-ministry", "executive-pastor"]).default("minimal-editorial"),
  location: z.string().optional().nullable(),
  contactEmail: z.string().email("Email invalide").optional().nullable().or(z.literal("")),
  contactPhone: z.string().optional().nullable(),
  whatsappNumber: z.string().optional().nullable(),
  givingUrl: z.string().url("Lien de don invalide").optional().nullable().or(z.literal("")),
  youtubeUrl: z.string().url("Lien YouTube invalide").optional().nullable().or(z.literal("")),
  instagramUrl: z.string().url("Lien Instagram invalide").optional().nullable().or(z.literal("")),
  facebookUrl: z.string().url("Lien Facebook invalide").optional().nullable().or(z.literal("")),
  tiktokUrl: z.string().url("Lien TikTok invalide").optional().nullable().or(z.literal("")),
  twitterUrl: z.string().url("Lien X/Twitter invalide").optional().nullable().or(z.literal("")),
});

export const leadCaptureSchema = z.object({
  fullName: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Adresse email valide requise"),
  phone: z.string().min(6, "Numéro de téléphone ou WhatsApp requis"),
  ministryName: z.string().min(2, "Nom du ministère / église requis"),
  country: z.string().min(2, "Pays requis"),
  desiredService: z.string().min(2, "Veuillez sélectionner ou préciser le service souhaité"),
  message: z.string().optional(),
});