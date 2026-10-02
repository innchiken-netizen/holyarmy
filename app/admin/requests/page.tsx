"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";

export default function AdminRequestsPipelinePage() {
  const [requests, setRequests] = useState([
    {
      id: "req-1",
      title: "Visuel d'annonce Série Pâques 2027 : 'Vainqueur du Tombeau'",
      org: "Centre Réveil & Vie",
      category: "SOCIAL_VISUAL",
      priority: "HIGH",
      status: "IN_PRODUCTION",
      assignedTo: "Directeur Artistique 1",
      deadline: "2027-03-20",
    },
    {
      id: "req-2",
      title: "Motion Flyer Vendredi Miracle & Délivrance",
      org: "Centre Réveil & Vie",
      category: "MOTION_FLYER",
      priority: "NORMAL",
      status: "CLIENT_REVIEW",
      assignedTo: "Directeur Artistique 1",
      deadline: "2027-03-15",
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Pipeline de Production Créative</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Supervisez les demandes de tous les ministères clients et gérez les attributions de l&apos;équipe.
          </p>
        </div>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-0 divide-y divide-zinc-800 text-xs">
          {requests.map((req) => (
            <div key={req.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#FF5500]">{req.org}</span>
                  <Badge variant="outline" className="text-[10px] bg-zinc-900 border-zinc-800 text-zinc-400">
                    {req.category}
                  </Badge>
                  {req.priority === "HIGH" && <Badge variant="holy" className="text-[10px]">Urgent</Badge>}
                </div>
                <h3 className="text-sm font-bold text-white">{req.title}</h3>
                <div className="text-[11px] text-zinc-500">
                  Assigné à : <span className="text-zinc-300 font-medium">{req.assignedTo}</span> • Échéance : {req.deadline}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  className="h-8 rounded-md border border-zinc-700 bg-zinc-900 px-2 text-xs text-white focus:outline-none"
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="IN_PRODUCTION">IN_PRODUCTION</option>
                  <option value="CLIENT_REVIEW">CLIENT_REVIEW</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>

                <Button
                  size="sm"
                  onClick={() => alert(`Fichier livrable attaché à la demande ${req.id}`)}
                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Téléverser version
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}