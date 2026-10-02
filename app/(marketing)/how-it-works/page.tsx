import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Clock, Sparkles, RefreshCw, Download } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">PROCESSUS SIMPLIFIÉ</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Une logistique rodée pour libérer votre équipe pastorale
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Fini le stress du samedi soir. holy.army fonctionne comme une extension directe de votre église.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl border border-zinc-800 bg-[#121214]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FF5500] font-black text-black text-xl">
              01
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Vous soumettez votre brief en 2 minutes</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Depuis votre tableau de bord ou votre smartphone, vous renseignez les détails essentiels : thème du culte, orateur, passage biblique clé, date et canaux de diffusion prioritaires.
              </p>
              <div className="text-xs text-[#FF5500] font-medium flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Temps moyen de création d&apos;une demande : 1 min 45s
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl border border-zinc-800 bg-[#121214]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-800 font-black text-white text-xl">
              02
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Nos directeurs artistiques produisent votre création</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Votre demande est assignée à un designer senior chrétien qui comprend l&apos;atmosphère de votre message. Il élabore la composition, la typographie et les formats requis sous 24h à 48h.
              </p>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Qualité d&apos;agence de marque internationale
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl border border-zinc-800 bg-[#121214]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-800 font-black text-white text-xl">
              03
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Vous validez ou demandez des ajustements</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Une notification vous avertit dès que l&apos;aperçu est disponible. Vous pouvez valider en 1 clic ou pointer précisément les rectifications (horaires, orthographe d&apos;un nom, colorimétrie).
              </p>
              <div className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-[#FF5500]" /> Historique des versions transparent et conservé
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl border border-zinc-800 bg-[#121214]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-800 font-black text-white text-xl">
              04
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Téléchargement et diffusion immédiate</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Dès validation, vos fichiers HD sont prêts au téléchargement et restent archivés dans votre médiathèque cloud sécurisée. Votre équipe de culte peut les projeter le dimanche matin en toute tranquillité.
              </p>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <Download className="h-4 w-4" /> Prêt pour Instagram, Facebook, écrans géants & projection
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
              Choisir votre formule
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}