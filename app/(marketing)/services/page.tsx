import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Video, Globe, Zap, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">NOTRE ARSENAL CRÉATIF</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Des services taillés sur-mesure pour les exigences ministérielles
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            De l&apos;annonce dominicale aux grandes campagnes d&apos;impact international.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-8">
            <Palette className="h-10 w-10 text-[#FF5500] mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Visuels Cultes & Séries</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Chaque dimanche est un rendez-vous avec l&apos;éternité. Nous créons des affiches cinématiques et des déclinaisons multi-formats pour vos cultes, vos séries d&apos;enseignements et vos évènements de prière.
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 mb-6">
              <li>• Formats Instagram (1080x1350 portrait & stories 9:16)</li>
              <li>• Habillages écrans géants d&apos;auditorium (16:9 4K)</li>
              <li>• Affiches imprimées haute résolution (A3, A2, 4x3)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-8">
            <Video className="h-10 w-10 text-[#FF5500] mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Motion Flyers & Reels</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              La vidéo capte 10x plus d&apos;attention que les images fixes. Nous animons vos annonces avec des effets sonores saisissants et concevons des reels verticaux extraits de vos prédications pour toucher la jeunesse.
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 mb-6">
              <li>• Motion flyers rythmés de 15 à 30 secondes</li>
              <li>• Sous-titrage cinématique dynamique</li>
              <li>• Génériques de culte et transitions vidéo d&apos;accueil</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-8">
            <Globe className="h-10 w-10 text-[#FF5500] mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Bio-Pages Pasteurs Officielles</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Votre identité publique mérite un espace centralisé qui renforce votre crédibilité. Regroupez vos réseaux sociaux, vos prédications phares, vos dates de tournée et vos liens de don sécurisés.
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 mb-6">
              <li>• URL personnalisée : holy.army/[votre-nom]</li>
              <li>• 3 templates exclusifs au design épuré</li>
              <li>• Statistiques de consultation sans pistage intrusif</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-8">
            <Zap className="h-10 w-10 text-[#FF5500] mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Campagnes & Conférences</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Un dispositif de communication complet pour vos grands rendez-vous annuels : Conférences pastorales, conventions de jeunesse, Pâques, rentrées ministérielles et nuits de la traversée.
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 mb-6">
              <li>• Kit complet de 10 à 30 assets coordonnés</li>
              <li>• Badges d&apos;orateurs, programmes et bannières web</li>
              <li>• Publicités ciblées sponsorisées sur les réseaux</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
              Découvrir nos formules tout-inclus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}