import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileEdit, CheckSquare, Clock, ArrowRight, Plus, 
  ExternalLink, Sparkles, Download, AlertCircle, ShieldAlert 
} from "lucide-react";
import { getCurrentOrganization } from "@/lib/server/organizations";
import { getOrganizationRequests } from "@/lib/server/requests";
import { getOrganizationDeliverables } from "@/lib/server/deliverables";
import { getEntitlements } from "@/lib/server/billing";

export default async function DashboardPage() {
  const { organization } = await getCurrentOrganization();
  const requests = await getOrganizationRequests();
  const deliverables = await getOrganizationDeliverables();
  const entitlements = await getEntitlements(organization.id);

  const pendingApprovals = deliverables.filter((d) => d.status === "PENDING_REVIEW");
  const inProductionRequests = requests.filter((r) => r.status === "IN_PRODUCTION");

  return (
    <div className="space-y-8">
      {/* 1. Header with Next Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Bonjour, Pasteur Paul Mukendi
            </h1>
            <Badge variant="holy" className="text-[10px]">
              Formule {entitlements.plan?.name}
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">
            Espace officiel de {organization.name} • Votre équipe créative holy.army est opérationnelle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/requests/new">
            <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Nouvelle demande
            </Button>
          </Link>
          <Link href="/paulmukendi" target="_blank">
            <Button variant="outline" size="sm" className="border-zinc-800 text-xs text-zinc-300 hover:bg-zinc-800 h-9">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-[#FF5500]" />
              Bio-Page Publique
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Critical Action Banner if approvals are pending */}
      {pendingApprovals.length > 0 && (
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FF5500] text-black">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {pendingApprovals.length} livrable attend votre validation
              </div>
              <div className="text-xs text-zinc-300">
                &quot;{pendingApprovals[0].title}&quot; a été téléversé par notre directeur artistique.
              </div>
            </div>
          </div>
          <Link href="/dashboard/deliverables">
            <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-semibold text-xs shrink-0">
              Vérifier et valider
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* 3. Real Usage Metrics (Quota Accounting) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-zinc-800 bg-[#121214]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center text-xs text-zinc-400 mb-2">
              <span>Visuels Cultes & Réseaux</span>
              <span className="font-semibold text-white">
                {entitlements.getUsage("visual_requests")} / {entitlements.getLimit("visual_requests")} ce mois
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden mb-3">
              <div
                className="bg-[#FF5500] h-full"
                style={{
                  width: `${(entitlements.getUsage("visual_requests") / entitlements.getLimit("visual_requests")) * 100}%`,
                }}
              />
            </div>
            <div className="text-[11px] text-zinc-500">
              Renouvellement automatique le 22 du mois.
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#121214]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center text-xs text-zinc-400 mb-2">
              <span>Motion Flyers & Vidéos</span>
              <span className="font-semibold text-white">
                {entitlements.getUsage("video_requests")} / {entitlements.getLimit("video_requests")} ce mois
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden mb-3">
              <div
                className="bg-emerald-500 h-full"
                style={{
                  width: `${(entitlements.getUsage("video_requests") / entitlements.getLimit("video_requests")) * 100}%`,
                }}
              />
            </div>
            <div className="text-[11px] text-zinc-500">
              Inclus : clips prédication et animations 9:16.
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#121214]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center text-xs text-zinc-400 mb-2">
              <span>Espace Cloud Utilisé</span>
              <span className="font-semibold text-white">1.2 Go / 50 Go</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden mb-3">
              <div className="bg-blue-500 h-full" style={{ width: "2.4%" }} />
            </div>
            <div className="text-[11px] text-zinc-500">
              Tous vos visuels et fichiers sources archivés à vie.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Active Creative Pipeline & Pending Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Requests */}
        <Card className="border-zinc-800 bg-[#121214]">
          <CardHeader className="pb-3 border-b border-zinc-800/80 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-white">
              Demandes en cours de création ({requests.length})
            </CardTitle>
            <Link href="/dashboard/requests" className="text-xs text-[#FF5500] hover:underline">
              Voir tout
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-zinc-800/80">
            {requests.map((req) => (
              <div key={req.id} className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-white line-clamp-1">{req.title}</div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>{req.category.replace("_", " ")}</span>
                    <span>•</span>
                    <span className="text-[#FF5500]">Échéance : {req.deadline || "Standard"}</span>
                  </div>
                </div>
                <div className="shrink-0 ml-4">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300">
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Latest Deliverables */}
        <Card className="border-zinc-800 bg-[#121214]">
          <CardHeader className="pb-3 border-b border-zinc-800/80 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-white">
              Livrables récents
            </CardTitle>
            <Link href="/dashboard/deliverables" className="text-xs text-[#FF5500] hover:underline">
              Gérer les validations
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-zinc-800/80">
            {deliverables.map((deliv) => (
              <div key={deliv.id} className="p-4 flex items-center justify-between hover:bg-zinc-900/40 transition-colors">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-white line-clamp-1">{deliv.title}</div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>Version {deliv.version}</span>
                    <span>•</span>
                    <span>{(deliv.file_size / 1000000).toFixed(1)} Mo</span>
                  </div>
                </div>
                <div className="shrink-0 ml-4 flex items-center gap-2">
                  <Badge variant={deliv.status === "APPROVED" ? "success" : "warning"} className="text-[10px]">
                    {deliv.status === "APPROVED" ? "Validé" : "En attente"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}