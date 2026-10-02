"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, Smartphone, Monitor, Save, ExternalLink, 
  CheckCircle2, Plus, Trash2, Heart, Play, Share2 
} from "lucide-react";

export default function ProfileEditorPage() {
  const [template, setTemplate] = useState("minimal-editorial");
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [slug, setSlug] = useState("paulmukendi");
  const [displayName, setDisplayName] = useState("Pasteur Paul Mukendi");
  const [churchName, setChurchName] = useState("Centre Réveil & Vie");
  const [location, setLocation] = useState("Paris, France");
  const [bio, setBio] = useState(
    "Porteur d'un message de foi vivante, d'édification et de puissance du Saint-Esprit. Ministre de l'Évangile depuis plus de 20 ans."
  );
  const [givingUrl, setGivingUrl] = useState("https://reveilvie.org/don");
  const [whatsapp, setWhatsapp] = useState("+33612345678");

  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">Éditeur de Bio-Page Pasteur</h1>
            <Badge variant={status === "PUBLISHED" ? "success" : "secondary"} className="text-[10px]">
              {status === "PUBLISHED" ? "En ligne" : "Brouillon"}
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">
            Personnalisez votre présence officielle sur holy.army/{slug}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/${slug}`} target="_blank">
            <Button variant="outline" size="sm" className="h-9 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-[#FF5500]" />
              Voir en direct
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            size="sm"
            className="h-9 text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Enregistré !
              </>
            ) : (
              <>
                <Save className="mr-1.5 h-3.5 w-3.5" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Template Switcher */}
          <Card className="border-zinc-800 bg-[#121214]">
            <CardContent className="pt-5 space-y-3">
              <label className="block text-xs font-semibold text-white">Modèle Graphique</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "minimal-editorial", label: "01. Minimal Editorial" },
                  { id: "bold-ministry", label: "02. Bold Ministry" },
                  { id: "executive-pastor", label: "03. Executive Pastor" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplate(t.id)}
                    className={`p-3 rounded-lg border text-xs font-medium transition-all text-left ${
                      template === t.id
                        ? "border-[#FF5500] bg-orange-500/10 text-white"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Core Info */}
          <Card className="border-zinc-800 bg-[#121214]">
            <CardContent className="pt-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">
                  Lien public personnalisé (Slug)
                </label>
                <div className="flex rounded-md border border-zinc-800 bg-zinc-900">
                  <span className="inline-flex items-center px-3 text-zinc-500 text-xs">holy.army/</span>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 bg-transparent px-2 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-zinc-300 mb-1.5">Nom d&apos;affichage</label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-zinc-900 border-zinc-800 text-xs" />
                </div>
                <div>
                  <label className="block font-medium text-zinc-300 mb-1.5">Église rattachée</label>
                  <Input value={churchName} onChange={(e) => setChurchName(e.target.value)} className="bg-zinc-900 border-zinc-800 text-xs" />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">Localisation (Ville, Pays)</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} className="bg-zinc-900 border-zinc-800 text-xs" />
              </div>

              <div>
                <label className="block font-medium text-zinc-300 mb-1.5">Biographie officielle</label>
                <Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="bg-zinc-900 border-zinc-800 text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
                <div>
                  <label className="block font-medium text-zinc-300 mb-1.5">Lien de don en ligne</label>
                  <Input value={givingUrl} onChange={(e) => setGivingUrl(e.target.value)} placeholder="https://..." className="bg-zinc-900 border-zinc-800 text-xs" />
                </div>
                <div>
                  <label className="block font-medium text-zinc-300 mb-1.5">WhatsApp officiel</label>
                  <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+33..." className="bg-zinc-900 border-zinc-800 text-xs" />
                </div>
              </div>

              {/* Status publication */}
              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Visibilité Publique</span>
                  <span className="text-[11px] text-zinc-500">Rendre la bio-page accessible sur le web</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus(status === "PUBLISHED" ? "DRAFT" : "PUBLISHED")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    status === "PUBLISHED" ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {status === "PUBLISHED" ? "Publié (Accessible)" : "Brouillon (Masqué)"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Mobile / Desktop Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Aperçu en Direct</span>
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded text-xs ${previewDevice === "mobile" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded text-xs ${previewDevice === "desktop" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Screen Frame */}
          <div className="rounded-3xl border-4 border-zinc-800 bg-[#09090B] p-4 shadow-2xl max-w-sm mx-auto overflow-hidden text-center min-h-[500px] flex flex-col justify-between">
            <div className="space-y-4 pt-4">
              <div className="h-20 w-20 rounded-full bg-zinc-800 border-2 border-[#FF5500] mx-auto flex items-center justify-center font-bold text-2xl text-white">
                PM
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{displayName}</h3>
                <p className="text-xs text-[#FF5500] font-medium">{churchName}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{location}</p>
              </div>

              <p className="text-[11px] text-zinc-300 px-4 leading-relaxed line-clamp-3">
                {bio}
              </p>

              {/* Action Buttons Mockup */}
              <div className="space-y-2 pt-2 px-2">
                <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-white font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5 text-[#FF5500]" />
                    <span>Culte en Direct ce Dimanche</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">10h00</span>
                </div>

                <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-white font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-3.5 w-3.5 text-[#FF5500]" />
                    <span>Faire un Don / Soutenir</span>
                  </div>
                  <span className="text-[10px] text-[#FF5500]">En ligne</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 text-[10px] text-zinc-600">
              Propulsé par holy.army
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}