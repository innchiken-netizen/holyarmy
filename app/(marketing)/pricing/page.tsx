import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">INVESTISSEMENT ROYAUME</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Des formules conçues pour démultiplier l&apos;impact de votre église
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Aucun engagement de longue durée. Paiement par carte bancaire ou virement bancaire manuel.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Essentiel */}
          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Formule</div>
              <h3 className="text-2xl font-bold text-white mb-2">Essentiel</h3>
              <p className="text-xs text-zinc-400 mb-6">Idéal pour les églises locales souhaitant une communication dominicale soignée.</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">990 €</span>
                <span className="text-zinc-500 text-xs">/ mois</span>
              </div>

              <div className="border-t border-zinc-800/80 pt-6 space-y-3 text-xs text-zinc-300 mb-8">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 10 visuels cultes & réseaux / mois</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 1 motion flyer ou reel / mois</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 3 révisions par demande</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Bio-page pasteur standard</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Bibliothèque cloud (10 Go)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 2 sièges équipe</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Délai de livraison : 48h</div>
              </div>
            </div>

            <Link href="/register?plan=essentiel">
              <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">
                Démarrer avec Essentiel
              </Button>
            </Link>
          </div>

          {/* Impact */}
          <div className="rounded-2xl border-2 border-[#FF5500] bg-[#141416] p-8 flex flex-col justify-between relative shadow-2xl shadow-orange-950/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#FF5500] text-black text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                Recommandé
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider mb-2">Formule</div>
              <h3 className="text-2xl font-bold text-white mb-2">Impact</h3>
              <p className="text-xs text-zinc-400 mb-6">Pour les ministères dynamiques qui ont besoin d&apos;une présence omnicanale continue.</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">1 990 €</span>
                <span className="text-zinc-500 text-xs">/ mois</span>
              </div>

              <div className="border-t border-zinc-800/80 pt-6 space-y-3 text-xs text-zinc-300 mb-8">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 25 visuels cultes, séries & réseaux / mois</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 4 motion flyers ou clips prédication / mois</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Révisions illimitées</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Bio-page pasteur enrichie + analytics</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Bibliothèque cloud (50 Go)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 5 sièges équipe</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> File prioritaire (livraison 24h)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Ligne directe WhatsApp</div>
              </div>
            </div>

            <Link href="/register?plan=impact">
              <Button className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold">
                Déployer la formule Impact
              </Button>
            </Link>
          </div>

          {/* Strike Force */}
          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Formule</div>
              <h3 className="text-2xl font-bold text-white mb-2">Strike Force</h3>
              <p className="text-xs text-zinc-400 mb-6">Votre département média et marketing complet externalisé auprès de nos directeurs artistiques.</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">3 990 €</span>
                <span className="text-zinc-500 text-xs">/ mois</span>
              </div>

              <div className="border-t border-zinc-800/80 pt-6 space-y-3 text-xs text-zinc-300 mb-8">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Production visuelle illimitée</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 12 vidéos & reels prédication premium / mois</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Directeur artistique dédié</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Campagnes publicitaires Meta & Google</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Stratégie d&apos;identité et refonte de marque</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Bibliothèque cloud (250 Go)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> 15 sièges équipe</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" /> Délai express 12h-24h & SLA garantie</div>
              </div>
            </div>

            <Link href="/register?plan=strike_force">
              <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">
                Activer Strike Force
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}