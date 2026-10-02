import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Clock, FileEdit, ArrowRight } from "lucide-react";
import { getOrganizationRequests } from "@/lib/server/requests";

export default async function RequestsListPage() {
  const requests = await getOrganizationRequests();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Demandes Créatives</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gérez vos demandes de visuels, motion flyers et vidéos de culte.
          </p>
        </div>

        <Link href="/dashboard/requests/new">
          <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Nouvelle demande
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <Card key={req.id} className="border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] bg-zinc-900 border-zinc-800 text-zinc-400">
                    {req.category.replace("_", " ")}
                  </Badge>
                  {req.priority === "HIGH" && (
                    <Badge variant="holy" className="text-[10px]">
                      Prioritaire
                    </Badge>
                  )}
                  <span className="text-[11px] text-zinc-500">
                    Créé le {new Date(req.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{req.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl">{req.description}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">Statut : {req.status}</div>
                  <div className="text-[11px] text-zinc-400">Échéance : {req.deadline || "Standard"}</div>
                </div>

                <Link href={`/dashboard/requests/${req.id}`}>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Voir détails
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}