import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllAuditLogsAdmin } from "@/lib/server/admin";

export default async function AdminAuditPage() {
  const logs = await getAllAuditLogsAdmin();

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Journal d&apos;Audit & Sécurité</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Traçabilité immuable des actions critiques (validation de paiements, modifications de rôles, publications).
        </p>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-0 divide-y divide-zinc-800 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px] bg-zinc-900 border-zinc-700 text-zinc-300">
                    {log.action}
                  </Badge>
                  <span className="font-semibold text-white">{log.actorName}</span>
                  {log.organizationName && (
                    <span className="text-zinc-500">({log.organizationName})</span>
                  )}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1">
                  Ressource : {log.resource_type} • ID: {log.resource_id}
                </div>
              </div>
              <div className="text-right text-[11px] text-zinc-500">
                {new Date(log.created_at).toLocaleDateString("fr-FR")} à{" "}
                {new Date(log.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}