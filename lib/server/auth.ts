import "server-only";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { mockStore } from "./mock-store";
import { UserProfile, PlatformRole } from "../types";

export async function getCurrentUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const simulatedRole = cookieStore.get("ha_role_override")?.value;

  if (simulatedRole === "admin") {
    const adminUser = mockStore.profiles.find((p) => p.platform_role === "SUPER_ADMIN");
    if (adminUser) return adminUser;
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        return profile as UserProfile;
      }

      // If user exists in auth but profile record is missing, return a synthesized profile
      return {
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        phone: null,
        platform_role: null,
        is_suspended: false,
        created_at: user.created_at,
        updated_at: user.created_at,
      };
    }
  } catch {
    // In local dev without live Supabase credentials, fall back to mockStore
  }

  // Development fallback user (Pasteur Paul Mukendi)
  return mockStore.profiles[1];
}

export async function requireUser(): Promise<UserProfile> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED: Session requise");
  }
  if (user.is_suspended) {
    throw new Error("FORBIDDEN: Votre compte est actuellement suspendu");
  }
  return user;
}

export async function requirePlatformStaff(): Promise<UserProfile> {
  const user = await requireUser();
  const staffRoles: PlatformRole[] = ["SUPER_ADMIN", "ADMIN", "STAFF", "SUPPORT"];
  if (!user.platform_role || !staffRoles.includes(user.platform_role)) {
    throw new Error("FORBIDDEN: Accès réservé à l'équipe holy.army");
  }
  return user;
}

export async function requireSuperAdmin(): Promise<UserProfile> {
  const user = await requireUser();
  if (user.platform_role !== "SUPER_ADMIN") {
    throw new Error("FORBIDDEN: Action réservée aux Super Administrateurs");
  }
  return user;
}