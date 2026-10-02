"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Paramètres Globaux de la Plateforme</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configuration des contrôles d&apos;accès, passerelles et mode maintenance.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-zinc-800 bg-[#121214]">
          <CardContent className="pt-6 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm mb-2">Mode Maintenance</h3>

            <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/60">
              <div>
                <span className="font-semibold text-white block">Activer le Mode Maintenance</span>
                <span className="text-zinc-400 text-[11px]">
                  Bloque temporairement l&apos;accès client pour mise à jour tout en préservant l&apos;accès /admin
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMaintenance(!maintenance)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold ${
                  maintenance ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {maintenance ? "ACTIVÉ" : "DÉSACTIVÉ"}
              </button>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 px-6">
          {saved ? "Modifications enregistrées" : "Enregistrer les modifications"}
        </Button>
      </form>
    </div>
  );
}