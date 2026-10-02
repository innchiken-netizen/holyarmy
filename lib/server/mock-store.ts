import "server-only";
import { 
  UserProfile, Organization, OrganizationMember, Plan, 
  Subscription, CreativeRequest, Deliverable, Campaign, 
  DigitalProfile, InvoiceItem, NotificationItem, AuditLogItem, PaymentStatus 
} from "../types";

export interface InvoiceRecord {
  id: string;
  organization_id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: "DRAFT" | "PENDING" | "PAID" | "VOID";
  payment_method: string;
  due_date: string;
  paid_at: string | null;
  created_at: string;
  items: InvoiceItem[];
}

export interface PaymentRecord {
  id: string;
  organization_id: string;
  amount: number;
  currency: string;
  provider: "STRIPE" | "MANUAL" | "BANK_TRANSFER" | "MOBILE_MONEY";
  status: PaymentStatus;
  proof_url: string | null;
  notes: string | null;
  created_at: string;
}

export interface LeadRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  ministry_name: string;
  country: string;
  desired_service: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "ARCHIVED";
  created_at: string;
}

// In-memory persistent data store for dev/preview/fallback
class HolyArmyStore {
  profiles: UserProfile[] = [
    {
      id: "user-superadmin-1",
      email: "admin@holy.army",
      full_name: "Directeur Holy Army",
      avatar_url: null,
      phone: "+33 1 23 45 67 89",
      platform_role: "SUPER_ADMIN",
      is_suspended: false,
      created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "user-pastor-1",
      email: "paul.mukendi@reveilvie.org",
      full_name: "Pasteur Paul Mukendi",
      avatar_url: null,
      phone: "+33 6 12 34 56 78",
      platform_role: null,
      is_suspended: false,
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "user-com-1",
      email: "sarah.com@reveilvie.org",
      full_name: "Sarah Lumumba",
      avatar_url: null,
      phone: "+33 6 98 76 54 32",
      platform_role: null,
      is_suspended: false,
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  organizations: Organization[] = [
    {
      id: "org-reveil-1",
      name: "Centre Réveil & Vie",
      slug: "centre-reveil-vie",
      logo_url: null,
      website: "https://reveilvie.org",
      church_type: "Église Évangélique",
      pastor_name: "Pasteur Paul Mukendi",
      country: "France",
      city: "Paris",
      is_suspended: false,
      is_archived: false,
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "org-impact-2",
      name: "Impact Centre Chrétien",
      slug: "impact-centre",
      logo_url: null,
      website: "https://impact-centre.org",
      church_type: "Église Multiculturelle",
      pastor_name: "Pasteur David Kouassi",
      country: "Belgique",
      city: "Bruxelles",
      is_suspended: false,
      is_archived: false,
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  members: OrganizationMember[] = [
    {
      id: "mem-1",
      organization_id: "org-reveil-1",
      user_id: "user-pastor-1",
      role: "OWNER",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "mem-2",
      organization_id: "org-reveil-1",
      user_id: "user-com-1",
      role: "ADMIN",
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  plans: Plan[] = [
    {
      id: "plan-essentiel",
      name: "Essentiel",
      code: "essentiel",
      description: "La force de frappe digitale de base pour structurer votre communication dominicale.",
      price_monthly: 99000,
      price_annual: 990000,
      currency: "EUR",
      is_active: true,
      features: [
        "10 Visuels cultes & réseaux sociaux / mois",
        "1 Motion flyer ou reel / mois",
        "Bio-page pasteur & ministère officielle",
        "Bibliothèque de médias sécurisée (10 Go)",
        "3 Révisions par demande",
        "Support réactif sous 48h",
      ],
      max_visual_requests_monthly: 10,
      max_video_requests_monthly: 1,
      max_revisions_per_request: 3,
      storage_limit_bytes: 10737418240,
      team_seats_limit: 2,
      support_level: "STANDARD",
      has_priority_queue: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "plan-impact",
      name: "Impact",
      code: "impact",
      description: "Pour les ministères en pleine expansion exigeant une communication créative omnicanale.",
      price_monthly: 199000,
      price_annual: 1990000,
      currency: "EUR",
      is_active: true,
      features: [
        "25 Visuels pour cultes, séries & réseaux / mois",
        "4 Motion flyers ou clips prédication / mois",
        "Bio-page pasteur personnalisée avec analytics",
        "Gestion multi-campagnes (Pâques, Conférences)",
        "Révisions illimitées",
        "Stockage 50 Go haute vitesse",
        "File de production prioritaire (24-48h)",
        "Support dédié WhatsApp & email",
      ],
      max_visual_requests_monthly: 25,
      max_video_requests_monthly: 4,
      max_revisions_per_request: 99,
      storage_limit_bytes: 53687091200,
      team_seats_limit: 5,
      support_level: "PRIORITY",
      has_priority_queue: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "plan-strike-force",
      name: "Strike Force",
      code: "strike_force",
      description: "Votre département média et marketing complet externalisé auprès de directeurs artistiques chevronnés.",
      price_monthly: 399000,
      price_annual: 3990000,
      currency: "EUR",
      is_active: true,
      features: [
        "Production visuelle illimitée",
        "12 Vidéos & reels premium / mois",
        "Directeur artistique dédié à votre ministère",
        "Stratégie de marque & kit identité complet",
        "Campagnes publicitaires Meta & Google",
        "Bio-page sur-mesure & nom de domaine personnalisé",
        "Stockage 250 Go",
        "Production express sous 12h-24h",
        "Ligne directe avec la direction créative",
      ],
      max_visual_requests_monthly: 999,
      max_video_requests_monthly: 12,
      max_revisions_per_request: 99,
      storage_limit_bytes: 268435456000,
      team_seats_limit: 15,
      support_level: "DEDICATED",
      has_priority_queue: true,
      created_at: new Date().toISOString(),
    },
  ];

  subscriptions: Subscription[] = [
    {
      id: "sub-reveil-1",
      organization_id: "org-reveil-1",
      plan_id: "plan-impact",
      status: "ACTIVE",
      current_period_start: new Date(Date.now() - 10 * 86400000).toISOString(),
      current_period_end: new Date(Date.now() + 20 * 86400000).toISOString(),
      cancel_at_period_end: false,
      payment_method: "STRIPE",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  creativeRequests: CreativeRequest[] = [
    {
      id: "req-1",
      organization_id: "org-reveil-1",
      created_by: "user-pastor-1",
      assigned_to: "user-superadmin-1",
      campaign_id: "camp-paques-1",
      title: "Visuel d'annonce Série Pâques 2027 : 'Vainqueur du Tombeau'",
      category: "SOCIAL_VISUAL",
      objective: "Annoncer le thème du mois pascal sur Instagram et Facebook avec une typographie percutante et solennelle.",
      description: "Format 1080x1350 (Instagram portrait) + format 16:9 pour écrans géants de l'auditorium. Accent sur la lumière divine, sombre et cinématographique, touches dorées/oranges.",
      target_audience: "Fidèles et non-croyants invités aux cultes de fête.",
      deadline: new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0],
      priority: "HIGH",
      status: "IN_PRODUCTION",
      channels: ["Instagram", "Facebook", "Écrans Église"],
      format_specs: "1080x1350 + 1920x1080",
      reference_links: ["https://instagram.com/p/sample-reference"],
      attachments: [],
      internal_notes: "Projet prioritaire — Directeur artistique en charge de la typographie 3D.",
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "req-2",
      organization_id: "org-reveil-1",
      created_by: "user-com-1",
      assigned_to: "user-superadmin-1",
      campaign_id: null,
      title: "Motion Flyer Vendredi Miracle & Délivrance",
      category: "MOTION_FLYER",
      objective: "Vidéo courte de 15s rythmée pour stories Instagram et statut WhatsApp.",
      description: "Musique puissante, animation dynamique de la date (Vendredi 20h), insertion photo du Pasteur Paul Mukendi.",
      target_audience: "Membres de la communauté et participants en ligne.",
      deadline: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
      priority: "NORMAL",
      status: "CLIENT_REVIEW",
      channels: ["Instagram Stories", "WhatsApp"],
      format_specs: "1080x1920 (9:16)",
      reference_links: [],
      attachments: [],
      internal_notes: "Aperçu v1 envoyé pour validation.",
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  campaigns: Campaign[] = [
    {
      id: "camp-paques-1",
      organization_id: "org-reveil-1",
      created_by: "user-pastor-1",
      name: "Pâques 2027 — Vainqueur du Tombeau",
      objective: "Campagne omnicanale de sensibilisation et d'évangélisation pour la célébration de la résurrection.",
      description: "Série complète de 6 visuels, 2 reels vidéo, programme imprimé et habillage réseaux sociaux.",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date(Date.now() + 25 * 86400000).toISOString().split("T")[0],
      status: "ACTIVE",
      channels: ["Instagram", "Facebook", "Affichage Local", "Site Web"],
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  deliverables: Deliverable[] = [
    {
      id: "deliv-1",
      organization_id: "org-reveil-1",
      request_id: "req-2",
      uploaded_by: "user-superadmin-1",
      title: "Motion_Vendredi_Miracle_v1.mp4",
      version: 1,
      file_url: "https://assets.holy.army/demo/motion-flyer-v1.mp4",
      file_type: "video/mp4",
      file_size: 14500000,
      thumbnail_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      status: "PENDING_REVIEW",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  digitalProfiles: DigitalProfile[] = [
    {
      id: "dp-reveil-1",
      organization_id: "org-reveil-1",
      slug: "paulmukendi",
      display_name: "Pasteur Paul Mukendi",
      pastor_name: "Paul Mukendi",
      church_name: "Centre Réveil & Vie",
      bio: "Porteur d'un message de foi vivante, d'édification et de puissance du Saint-Esprit. Ministre de l'Évangile depuis plus de 20 ans.",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      cover_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      template_id: "minimal-editorial",
      status: "PUBLISHED",
      location: "Paris, France",
      contact_email: "contact@reveilvie.org",
      contact_phone: "+33 1 23 45 67 89",
      whatsapp_number: "+33612345678",
      giving_url: "https://reveilvie.org/donner",
      youtube_url: "https://youtube.com/@reveilvie",
      instagram_url: "https://instagram.com/paulmukendiofficiel",
      facebook_url: "https://facebook.com/paulmukendi",
      tiktok_url: "https://tiktok.com/@paulmukendi",
      twitter_url: "https://x.com/paulmukendi",
      custom_links: [
        { title: "Écouter le podcast Foi & Puissance", url: "https://spotify.com", icon: "podcast" },
        { title: "Commander le livre 'La Foi Triomphante'", url: "https://amazon.fr", icon: "book" },
        { title: "Participer au Culte en Direct ce Dimanche", url: "https://reveilvie.org/live", icon: "video" },
      ],
      sermons: [
        { title: "Demeurer inébranlable au milieu de l'adversité", url: "https://youtube.com/watch?v=sample1", date: "Dimanche dernier" },
        { title: "Le mystère de la prière exaucée", url: "https://youtube.com/watch?v=sample2", date: "Il y a 2 semaines" },
      ],
      events: [
        { title: "Culte de Pâques & Célébration", date: "Ce Dimanche à 10h00", location: "Auditorium Principal — Paris", link: "https://reveilvie.org" },
      ],
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  invoices: InvoiceRecord[] = [
    {
      id: "inv-1",
      organization_id: "org-reveil-1",
      invoice_number: "HA-2027-0012",
      amount: 199000,
      currency: "EUR",
      status: "PAID",
      payment_method: "Carte Bancaire (Stripe)",
      due_date: new Date().toISOString(),
      paid_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      items: [
        {
          id: "item-1",
          invoice_id: "inv-1",
          description: "Abonnement holy.army — Formule Impact (Mensuel)",
          quantity: 1,
          unit_amount: 199000,
          total_amount: 199000,
        },
      ],
    },
  ];

  payments: PaymentRecord[] = [
    {
      id: "pay-1",
      organization_id: "org-reveil-1",
      amount: 199000,
      currency: "EUR",
      provider: "STRIPE",
      status: "VERIFIED",
      proof_url: null,
      notes: "Paiement mensuel automatique traité avec succès.",
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
  ];

  notifications: NotificationItem[] = [
    {
      id: "notif-1",
      user_id: "user-pastor-1",
      organization_id: "org-reveil-1",
      title: "Livrable prêt pour validation",
      message: "Un aperçu du motion flyer 'Vendredi Miracle & Délivrance' a été téléversé par notre équipe.",
      link_url: "/dashboard/deliverables",
      is_read: false,
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  auditLogs: AuditLogItem[] = [
    {
      id: "audit-1",
      organization_id: "org-reveil-1",
      actor_id: "user-pastor-1",
      action: "PROFILE_PUBLISHED",
      resource_type: "digital_profile",
      resource_id: "dp-reveil-1",
      metadata: { slug: "paulmukendi" },
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    },
  ];

  leads: LeadRecord[] = [
    {
      id: "lead-1",
      full_name: "Pasteur Jonathan Mbemba",
      email: "jonathan@nouvelle-alliance.org",
      phone: "+33 7 11 22 33 44",
      ministry_name: "Église Nouvelle Alliance",
      country: "France",
      desired_service: "Formule Impact — Campagnes & Visuels",
      message: "Nous souhaitons moderniser entièrement nos supports d'ici 3 semaines.",
      status: "NEW",
      created_at: new Date(Date.now() - 1200000).toISOString(),
    },
  ];
}

// Global persistent instance for node lifecycle
const globalStore = global as unknown as { __holyArmyStore?: HolyArmyStore };
if (!globalStore.__holyArmyStore) {
  globalStore.__holyArmyStore = new HolyArmyStore();
}

export const mockStore = globalStore.__holyArmyStore;