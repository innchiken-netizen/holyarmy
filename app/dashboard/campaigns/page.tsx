import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Plus, Calendar, ArrowRight } from "lucide-react";
import { getOrganizationCampaigns } from "@/lib/server/campaigns";

export default async function CampaignsPage() {
  const campaigns = await getOrganizationCampaigns();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Campagnes & Évènements</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Regroupez vos visuels, vidéos et bannières pour vos séries ou temps forts.
          </p>
        </div>

        <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Nouvelle campagne
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <Card key={camp.id} className="border-zinc-800 bg-[#121214] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="holy" className="text-[10px]">
                {camp.status}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>Du {camp.start_date} au {camp.end_date}</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">{camp.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{camp.description}</p>
            </div>

            <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
              <div className="text-xs text-zinc-400">
                Canaux : <span className="text-zinc-200">{camp.channels.join(", ")}</span>
              </div>
              <Link href="/dashboard/requests">
                <Button variant="outline" size="sm" className="text-xs border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                  Voir les visuels
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}