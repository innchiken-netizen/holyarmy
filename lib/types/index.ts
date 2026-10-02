// Platform and Organization Roles
export type PlatformRole = "SUPER_ADMIN" | "ADMIN" | "STAFF" | "SUPPORT";

export type OrganizationRole = "OWNER" | "ADMIN" | "EDITOR" | "MEMBER" | "VIEWER";

export type Permission =
  | "organization.read"
  | "organization.update"
  | "organization.delete"
  | "team.read"
  | "team.invite"
  | "team.update_role"
  | "team.remove"
  | "billing.read"
  | "billing.manage"
  | "request.create"
  | "request.read"
  | "request.update"
  | "request.delete"
  | "request.approve"
  | "campaign.create"
  | "campaign.read"
  | "campaign.update"
  | "campaign.delete"
  | "asset.read"
  | "asset.upload"
  | "asset.delete"
  | "profile.read"
  | "profile.update"
  | "profile.publish"
  | "analytics.read"
  | "support.create"
  | "support.read";

export type RequestStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "NEEDS_INFORMATION"
  | "APPROVED_FOR_PRODUCTION"
  | "IN_PRODUCTION"
  | "CLIENT_REVIEW"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "DELIVERED"
  | "ARCHIVED"
  | "CANCELLED";

export type RequestCategory =
  | "SOCIAL_VISUAL"
  | "FLYER"
  | "MOTION_FLYER"
  | "VIDEO_AD"
  | "SOCIAL_MEDIA_CAMPAIGN"
  | "BRANDING"
  | "WEBSITE"
  | "EVENT_CAMPAIGN"
  | "CUSTOM_REQUEST";

export type RequestPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type SubscriptionStatus =
  | "TRIALING"
  | "ACTIVE"
  | "PAYMENT_PENDING"
  | "PAST_DUE"
  | "GRACE_PERIOD"
  | "PAUSED"
  | "CANCEL_AT_PERIOD_END"
  | "CANCELED"
  | "EXPIRED"
  | "COMPLIMENTARY"
  | "MANUAL"
  | "SUSPENDED";

export type PaymentMethod = "STRIPE" | "MANUAL" | "BANK_TRANSFER" | "MOBILE_MONEY";

export type PaymentStatus = "PENDING" | "VERIFIED" | "FAILED" | "REFUNDED" | "CANCELLED";

export type InvoiceStatus = "DRAFT" | "PENDING" | "PAID" | "VOID" | "UNCOLLECTIBLE";

export type ProfileStatus = "DRAFT" | "PUBLISHED" | "UNPUBLISHED" | "SUSPENDED";

export type SupportTicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "WAITING_FOR_CLIENT"
  | "WAITING_FOR_SUPPORT"
  | "RESOLVED"
  | "CLOSED";

export type SupportTicketPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

// Core Models
export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_amount: number;
  total_amount: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  platform_role: PlatformRole | null;
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website: string | null;
  church_type: string | null;
  pastor_name: string | null;
  country: string | null;
  city: string | null;
  is_suspended: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: OrganizationRole;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
}

export interface Plan {
  id: string;
  name: string;
  code: string; // 'essentiel' | 'impact' | 'strike_force'
  description: string;
  price_monthly: number; // in cents
  price_annual: number; // in cents
  currency: string;
  is_active: boolean;
  features: string[];
  max_visual_requests_monthly: number;
  max_video_requests_monthly: number;
  max_revisions_per_request: number;
  storage_limit_bytes: number;
  team_seats_limit: number;
  support_level: string;
  has_priority_queue: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  organization_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  payment_method: PaymentMethod;
  created_at: string;
  updated_at: string;
  plan?: Plan;
}

export interface CreativeRequest {
  id: string;
  organization_id: string;
  created_by: string;
  assigned_to: string | null;
  campaign_id: string | null;
  title: string;
  category: RequestCategory;
  objective: string | null;
  description: string;
  target_audience: string | null;
  deadline: string | null;
  priority: RequestPriority;
  status: RequestStatus;
  channels: string[];
  format_specs: string | null;
  reference_links: string[];
  attachments: string[];
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  campaign?: Campaign;
  creator?: UserProfile;
}

export interface Campaign {
  id: string;
  organization_id: string;
  created_by: string;
  name: string;
  objective: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  status: "PLANNING" | "ACTIVE" | "COMPLETED" | "ARCHIVED";
  channels: string[];
  created_at: string;
  updated_at: string;
}

export interface Deliverable {
  id: string;
  organization_id: string;
  request_id: string;
  uploaded_by: string;
  title: string;
  version: number;
  file_url: string;
  file_type: string;
  file_size: number;
  thumbnail_url: string | null;
  status: "PENDING_REVIEW" | "APPROVED" | "CHANGES_REQUESTED";
  created_at: string;
}

export interface DigitalProfile {
  id: string;
  organization_id: string;
  slug: string;
  display_name: string;
  pastor_name: string;
  church_name: string;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  template_id: string; // 'minimal-editorial' | 'bold-ministry' | 'executive-pastor'
  status: ProfileStatus;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
  giving_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  twitter_url: string | null;
  custom_links: { title: string; url: string; icon?: string }[];
  sermons: { title: string; url: string; date?: string }[];
  events: { title: string; date: string; location?: string; link?: string }[];
  created_at: string;
  updated_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  organization_id: string | null;
  title: string;
  message: string;
  link_url: string | null;
  is_read: boolean;
  created_at: string;
}

export interface AuditLogItem {
  id: string;
  organization_id: string | null;
  actor_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  metadata: Record<string, any>;
  ip_address?: string;
  created_at: string;
}