import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllOrganizations } from "@/lib/server/admin";
import { ExternalLink } from "lucide-react";

export default async function AdminOrganizationsPage() {
  const orgs = await getAllOrganizations();

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Organisations & Ministères</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Supervision de l&apos;ensemble des églises clientes, formules et accès.
          </p>
        </div>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-0 divide-y divide-zinc-800 text-xs">
          {orgs.map((org) => (
            <div key={org.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{org.name}</h3>
                  <Badge variant={org.is_suspended ? "danger" : "success"} className="text-[10px]">
                    {org.is_suspended ? "Suspendu" : "Actif"}
                  </Badge>
                  {org.plan && (
                    <Badge variant="holy" className="text-[10px]">
                      {org.plan.name}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-zinc-400">
                  {org.pastor_name} • {org.city}, {org.country}
                </p>
                <div className="text-[11px] text-zinc-500">
                  Identifiant : <code className="text-[#FF5500]">holy.army/{org.slug}</code>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="font-semibold text-white">{org.requestCount} demandes</div>
                  <div className="text-[11px] text-zinc-500">au total</div>
                </div>

                <a href={`/${org.slug}`} target="_blank">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-700 text-zinc-300">
                    <ExternalLink className="h-3.5 w-3.5 text-[#FF5500]" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}