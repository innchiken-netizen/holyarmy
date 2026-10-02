"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Save } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Paramètres du Ministère</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Identité visuelle de base, coordonnées officielles et préférences de notification.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-zinc-800 bg-[#121214]">
          <CardContent className="pt-6 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm mb-2">Identité de l&apos;Assemblée</h3>

            <div>
              <label className="block font-medium text-zinc-300 mb-1.5">Nom de l&apos;église</label>
              <Input defaultValue="Centre Réveil & Vie" className="bg-zinc-900 border-zinc-800 text-xs" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">Ville</label>
                <Input defaultValue="Paris" className="bg-zinc-900 border-zinc-800 text-xs" />
              </div>
              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">Pays</label>
                <Input defaultValue="France" className="bg-zinc-900 border-zinc-800 text-xs" />
              </div>
            </div>

            <div>
              <label className="block font-medium text-zinc-300 mb-1.5">Site Web Officiel</label>
              <Input defaultValue="https://reveilvie.org" className="bg-zinc-900 border-zinc-800 text-xs" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-[#121214]">
          <CardContent className="pt-6 space-y-3 text-xs">
            <h3 className="font-bold text-white text-sm mb-2">Notifications par Email</h3>
            
            <label className="flex items-center gap-3 text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded border-zinc-700 text-[#FF5500] focus:ring-0" />
              <span>M&apos;avertir dès qu&apos;un nouveau livrable est disponible pour validation</span>
            </label>

            <label className="flex items-center gap-3 text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded border-zinc-700 text-[#FF5500] focus:ring-0" />
              <span>Recevoir une notification lors des changements de statut de mes demandes</span>
            </label>

            <label className="flex items-center gap-3 text-zinc-300">
              <input type="checkbox" defaultChecked className="rounded border-zinc-700 text-[#FF5500] focus:ring-0" />
              <span>M&apos;envoyer les factures et reçus de paiement par email</span>
            </label>
          </CardContent>
        </Card>

        <Button type="submit" size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
          {saved ? <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Enregistré</> : <><Save className="mr-1.5 h-3.5 w-3.5" /> Enregistrer les paramètres</>}
        </Button>
      </form>
    </div>
  );
}