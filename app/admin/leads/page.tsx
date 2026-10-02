"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mail, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([
    {
      id: "lead-1",
      name: "Pasteur Jonathan Mbemba",
      email: "jonathan@nouvelle-alliance.org",
      phone: "+33 7 11 22 33 44",
      ministry: "Église Nouvelle Alliance",
      service: "Formule Impact — Campagnes & Visuels",
      message: "Nous souhaitons moderniser entièrement nos supports d'ici 3 semaines.",
      status: "NEW",
      date: "Il y a 20 minutes",
    },
  ]);

  const handleConvert = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "CONVERTED" } : l))
    );
    alert("Prospect converti avec succès. Une nouvelle organisation a été créée et une invitation transmise.");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Prospects & Demandes de Contact</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Leads capturés via le site public et opportunités d&apos;onboarding de nouveaux ministères.
        </p>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-0 divide-y divide-zinc-800 text-xs">
          {leads.map((l) => (
            <div key={l.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{l.name}</h3>
                  <Badge variant={l.status === "NEW" ? "holy" : "success"} className="text-[10px]">
                    {l.status === "NEW" ? "Nouveau Lead" : "Converti"}
                  </Badge>
                  <span className="text-[11px] text-zinc-400 font-semibold">{l.ministry}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-zinc-500" /> {l.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-zinc-500" /> {l.phone}</span>
                </div>
                {l.message && (
                  <p className="text-zinc-300 bg-zinc-900/60 p-2.5 rounded border border-zinc-800 mt-2 max-w-xl">
                    &quot;{l.message}&quot;
                  </p>
                )}
                <div className="text-[10px] text-zinc-500">Intérêt : {l.service} • {l.date}</div>
              </div>

              {l.status === "NEW" && (
                <div className="shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleConvert(l.id)}
                    className="h-8 text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold"
                  >
                    Convertir en organisation
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}