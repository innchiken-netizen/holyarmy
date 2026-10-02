"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function NewRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SOCIAL_VISUAL");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [formatSpecs, setFormatSpecs] = useState("1080x1350 (Portrait) + 16:9");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/requests");
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-zinc-800/80 pb-4">
        <Link href="/dashboard/requests">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Nouvelle Demande Créative</h1>
          <p className="text-xs text-zinc-400">
            Renseignez votre brief pour lancement immédiat en production
          </p>
        </div>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Titre du projet / Évènement <span className="text-[#FF5500]">*</span>
              </label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Culte de Bénédiction Nuptiale — 'Bâtir sur le Roc'"
                className="bg-zinc-900 border-zinc-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Type de livrable <span className="text-[#FF5500]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                >
                  <option value="SOCIAL_VISUAL">Visuel Réseaux / Culte Dominical</option>
                  <option value="MOTION_FLYER">Motion Flyer Vidéo (9:16)</option>
                  <option value="VIDEO_AD">Clip Prédication / Vidéo Teaser</option>
                  <option value="FLYER">Flyer Imprimé / Affiche HD</option>
                  <option value="BRANDING">Logo & Identité de Marque</option>
                  <option value="EVENT_CAMPAIGN">Pack Complet Conférence</option>
                  <option value="CUSTOM_REQUEST">Demande Sur-Mesure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Priorité
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
                >
                  <option value="NORMAL">Normale (délai 24h-48h)</option>
                  <option value="HIGH">Haute (délai 24h)</option>
                  <option value="URGENT">Urgente (SLA prioritaire)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Description & Brief <span className="text-[#FF5500]">*</span>
              </label>
              <Textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Indiquez l'orateur, le passage biblique, la date, l'heure, l'adresse, les indications d'ambiance..."
                className="bg-zinc-900 border-zinc-800 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Formats souhaités
                </label>
                <Input
                  value={formatSpecs}
                  onChange={(e) => setFormatSpecs(e.target.value)}
                  placeholder="Ex: 1080x1350 + Stories 9:16 + Écrans 16:9"
                  className="bg-zinc-900 border-zinc-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Date de diffusion souhaitée
                </label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Link href="/dashboard/requests">
                <Button variant="outline" type="button" size="sm" className="border-zinc-800 text-xs text-zinc-300">
                  Annuler
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={loading}
                className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9 px-6"
              >
                Transmettre à holy.army
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}