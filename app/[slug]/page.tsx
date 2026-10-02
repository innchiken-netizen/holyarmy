import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { isReservedSlug } from "@/lib/validation/reserved-slugs";
import { getPublicDigitalProfileBySlug } from "@/lib/server/digital-profile";
import { 
  Play, Heart, Globe, MessageCircle, Mail, MapPin, 
  ExternalLink, Calendar, Youtube, Instagram, Facebook 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isReservedSlug(slug)) return {};

  const profile = await getPublicDigitalProfileBySlug(slug);
  if (!profile) return { title: "Profil non trouvé" };

  return {
    title: `${profile.display_name} — ${profile.church_name}`,
    description: profile.bio || `Espace officiel de ${profile.display_name}. Retrouvez nos prédications, cultes et liens.`,
    openGraph: {
      title: `${profile.display_name} — ${profile.church_name}`,
      description: profile.bio || "",
      type: "profile",
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isReservedSlug(slug)) {
    notFound();
  }

  const profile = await getPublicDigitalProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  // RENDER ACCORDING TO SELECTED TEMPLATE
  if (profile.template_id === "bold-ministry") {
    return <BoldMinistryTemplate profile={profile} />;
  }

  if (profile.template_id === "executive-pastor") {
    return <ExecutivePastorTemplate profile={profile} />;
  }

  // Default: Minimal Editorial
  return <MinimalEditorialTemplate profile={profile} />;
}

// ----------------------------------------------------------------------
// TEMPLATE 01: MINIMAL EDITORIAL
// ----------------------------------------------------------------------
function MinimalEditorialTemplate({ profile }: { profile: any }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-200 py-16 px-4 sm:px-6 selection:bg-[#FF5500] selection:text-white">
      <div className="max-w-md mx-auto space-y-8 text-center">
        {/* Avatar */}
        <div className="relative mx-auto w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-[#FF5500] flex items-center justify-center font-bold text-3xl text-white overflow-hidden shadow-2xl">
            {profile.pastor_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        </div>

        {/* Identity Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {profile.display_name}
          </h1>
          <p className="text-xs text-[#FF5500] font-semibold mt-1 tracking-wide uppercase">
            {profile.church_name}
          </p>
          {profile.location && (
            <p className="text-xs text-zinc-400 mt-1 flex items-center justify-center gap-1">
              <MapPin className="h-3 w-3 text-zinc-500" />
              {profile.location}
            </p>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-xs text-zinc-300 leading-relaxed px-4">
            {profile.bio}
          </p>
        )}

        {/* Primary CTA (Giving / Support) */}
        {profile.giving_url && (
          <a
            href={profile.giving_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold p-3.5 text-xs shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Soutenir le ministère / Faire un don</span>
            </div>
          </a>
        )}

        {/* Custom Links */}
        <div className="space-y-3 pt-2">
          {profile.custom_links?.map((link: any, idx: number) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-zinc-800 bg-[#121214] hover:border-zinc-700 p-3.5 text-xs font-semibold text-white transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <span>{link.title}</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
              </div>
            </a>
          ))}
        </div>

        {/* Sermons / Messages */}
        {profile.sermons && profile.sermons.length > 0 && (
          <div className="pt-4 border-t border-zinc-800/80 text-left space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-center">
              Derniers enseignements
            </h4>
            {profile.sermons.map((sermon: any, idx: number) => (
              <a
                key={idx}
                href={sermon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200"
              >
                <div className="flex items-center gap-3">
                  <Play className="h-3.5 w-3.5 text-[#FF5500]" />
                  <span>{sermon.title}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{sermon.date}</span>
              </a>
            ))}
          </div>
        )}

        {/* WhatsApp & Contact */}
        {profile.whatsapp_number && (
          <div className="pt-2">
            <a
              href={`https://wa.me/${profile.whatsapp_number.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Contacter sur WhatsApp officiel</span>
            </a>
          </div>
        )}

        {/* Footer Brand */}
        <div className="pt-8 border-t border-zinc-800/40">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-300">
            <span>Propulsé par</span>
            <span className="font-bold text-white">holy<span className="text-[#FF5500]">.</span>army</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TEMPLATE 02: BOLD MINISTRY
// ----------------------------------------------------------------------
function BoldMinistryTemplate({ profile }: { profile: any }) {
  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* Hero Banner */}
      <div className="h-48 bg-gradient-to-r from-orange-950 via-zinc-900 to-black relative flex items-end justify-center pb-0 border-b border-zinc-800">
        <div className="absolute -bottom-12">
          <div className="w-24 h-24 rounded-2xl bg-zinc-900 border-4 border-[#070709] flex items-center justify-center font-black text-3xl text-[#FF5500] shadow-2xl">
            {profile.pastor_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto pt-16 pb-12 px-4 text-center space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight">{profile.display_name}</h1>
          <p className="text-sm text-[#FF5500] font-bold mt-1">{profile.church_name}</p>
          {profile.location && <p className="text-xs text-zinc-400 mt-1">{profile.location}</p>}
        </div>

        {profile.bio && <p className="text-xs text-zinc-300 leading-relaxed">{profile.bio}</p>}

        {profile.giving_url && (
          <a
            href={profile.giving_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-black font-extrabold p-3 text-xs shadow-xl"
          >
            Faire un Don / Soutenir ce Ministère
          </a>
        )}

        <div className="space-y-3 pt-2">
          {profile.custom_links?.map((link: any, idx: number) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-zinc-800 bg-[#121214] hover:bg-zinc-800 p-3.5 text-xs font-semibold text-white"
            >
              <div className="flex items-center justify-between">
                <span>{link.title}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#FF5500]" />
              </div>
            </a>
          ))}
        </div>

        <div className="pt-8 text-[10px] text-zinc-600">
          <Link href="/">holy.army • Plateforme Digitale du Royaume</Link>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TEMPLATE 03: EXECUTIVE PASTOR
// ----------------------------------------------------------------------
function ExecutivePastorTemplate({ profile }: { profile: any }) {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-200 py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Card Header */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-[#141416] flex items-center gap-5">
          <div className="h-20 w-20 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-2xl text-white shrink-0">
            {profile.pastor_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{profile.display_name}</h1>
            <p className="text-xs text-[#FF5500] font-semibold">{profile.church_name}</p>
            <p className="text-xs text-zinc-400 mt-1">{profile.location || "Ministère International"}</p>
          </div>
        </div>

        {/* Bio Card */}
        {profile.bio && (
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#141416] text-xs text-zinc-300 leading-relaxed">
            {profile.bio}
          </div>
        )}

        {/* Direct Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.giving_url && (
            <a
              href={profile.giving_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-white flex items-center gap-3 text-xs font-bold"
            >
              <Heart className="h-4 w-4 text-[#FF5500]" />
              <span>Dons & Partenariats</span>
            </a>
          )}

          {profile.whatsapp_number && (
            <a
              href={`https://wa.me/${profile.whatsapp_number.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-zinc-800 bg-[#141416] hover:bg-zinc-800 text-white flex items-center gap-3 text-xs font-semibold"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Officiel</span>
            </a>
          )}
        </div>

        {/* Sermons and custom links */}
        <div className="space-y-3">
          {profile.custom_links?.map((link: any, idx: number) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-zinc-800 bg-[#141416] hover:border-zinc-700 text-xs font-medium text-white"
            >
              <div className="flex items-center justify-between">
                <span>{link.title}</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center pt-8 text-xs text-zinc-600">
          <Link href="/">holy.army</Link>
        </div>
      </div>
    </div>
  );
}