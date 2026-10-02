import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, MousePointerClick, Heart, Smartphone, Monitor } from "lucide-react";
import { getCurrentOrganization } from "@/lib/server/organizations";
import { getProfileAnalyticsSummary } from "@/lib/server/digital-profile";

export default async function AnalyticsPage() {
  const { organization } = await getCurrentOrganization();
  const data = await getProfileAnalyticsSummary(organization.id);

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Statistiques de Visibilité</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Mesurez l&apos;impact de votre bio-page et de vos liens de culte (données agrégées, respectueuses de la vie privée).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Vues ce mois</span>
            <Eye className="h-4 w-4 text-[#FF5500]" />
          </div>
          <div className="text-2xl font-bold text-white">{data.viewsThisMonth}</div>
          <div className="text-[10px] text-emerald-400 mt-1">+18% par rapport au mois dernier</div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Visiteurs uniques</span>
            <Users className="h-4 w-4 text-[#FF5500]" />
          </div>
          <div className="text-2xl font-bold text-white">{data.uniqueVisitors}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Fidèles et invités</div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Clics sur les liens</span>
            <MousePointerClick className="h-4 w-4 text-[#FF5500]" />
          </div>
          <div className="text-2xl font-bold text-white">{data.linkClicks}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Vers YouTube & Podcasts</div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Clics Dons & Libéralités</span>
            <Heart className="h-4 w-4 text-[#FF5500]" />
          </div>
          <div className="text-2xl font-bold text-white">{data.givingClicks}</div>
          <div className="text-[10px] text-emerald-400 mt-1">Offrandes et partenaires</div>
        </Card>
      </div>

      {/* Top Links & Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-zinc-800 bg-[#121214] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Liens les plus consultés</h3>
          <div className="space-y-3">
            {data.topLinks.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-zinc-800/60">
                <span className="text-zinc-300 font-medium">{item.label}</span>
                <span className="text-[#FF5500] font-semibold">{item.count} clics</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Répartition des appareils</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-[#FF5500]" /> Smartphones
              </span>
              <span className="font-bold text-white">{data.devices.mobile}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-zinc-500" /> Ordinateurs
              </span>
              <span className="font-bold text-white">{data.devices.desktop}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">Tablettes</span>
              <span className="font-bold text-white">{data.devices.tablet}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}