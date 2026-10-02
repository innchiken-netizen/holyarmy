import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, MessageSquare, Download, CheckCircle2, FileEdit } from "lucide-react";
import { getRequestById } from "@/lib/server/requests";
import { getDeliverablesByRequest } from "@/lib/server/deliverables";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await getRequestById(id);

  if (!request) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-bold text-white mb-2">Demande introuvable</h2>
        <Link href="/dashboard/requests">
          <Button variant="outline" size="sm">Retour aux demandes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-zinc-800/80 pb-4">
        <Link href="/dashboard/requests">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[10px] bg-zinc-900 border-zinc-800 text-zinc-400">
              {request.category.replace("_", " ")}
            </Badge>
            <Badge variant="holy" className="text-[10px]">
              Statut : {request.status}
            </Badge>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">{request.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Brief Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-zinc-800 bg-[#121214]">
            <CardHeader className="pb-3 border-b border-zinc-800/80">
              <CardTitle className="text-sm font-semibold text-white">Brief & Spécifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div>
                <span className="font-semibold text-zinc-400 block mb-1">Description</span>
                <p className="text-zinc-200 leading-relaxed bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                  {request.description}
                </p>
              </div>

              {request.objective && (
                <div>
                  <span className="font-semibold text-zinc-400 block mb-1">Objectif</span>
                  <p className="text-zinc-300">{request.objective}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
                <div>
                  <span className="font-semibold text-zinc-400 block mb-1">Formats demandés</span>
                  <p className="text-zinc-300">{request.format_specs || "Multi-formats standard"}</p>
                </div>
                <div>
                  <span className="font-semibold text-zinc-400 block mb-1">Canaux cibles</span>
                  <p className="text-zinc-300">{request.channels.join(", ") || "Instagram, Culte"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Feedback */}
          <Card className="border-zinc-800 bg-[#121214]">
            <CardHeader className="pb-3 border-b border-zinc-800/80">
              <CardTitle className="text-sm font-semibold text-white">Journal d&apos;activité & Échanges</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <div className="h-6 w-6 rounded-full bg-[#FF5500] text-black font-bold flex items-center justify-center text-[10px] shrink-0">
                  HA
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">Directeur Artistique holy.army</span>
                    <span className="text-[10px] text-zinc-500">Prise en charge</span>
                  </div>
                  <p className="text-zinc-300">
                    Brief validé. La composition typographique et le montage vidéo sont en cours d&apos;élaboration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Meta & Deliverables */}
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-[#121214]">
            <CardHeader className="pb-3 border-b border-zinc-800/80">
              <CardTitle className="text-sm font-semibold text-white">Informations Clés</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Échéance</span>
                <span className="text-[#FF5500] font-semibold">{request.deadline || "Standard"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Priorité</span>
                <span className="text-white font-medium">{request.priority}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Créé le</span>
                <span className="text-zinc-300">{new Date(request.created_at).toLocaleDateString("fr-FR")}</span>
              </div>
            </CardContent>
          </Card>

          <Link href="/dashboard/deliverables" className="block">
            <Button className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-10">
              Accéder aux livrables & validation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}