import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const items = [
    { title: "Série d'Enseignement : 'Vainqueur du Tombeau'", category: "Visuels Cultes & Écrans", church: "Centre Réveil & Vie", date: "Pâques 2027" },
    { title: "Motion Flyer Vendredi Miracle & Délivrance", category: "Motion Video 9:16", church: "Impact Centre Chrétien", date: "Février 2027" },
    { title: "Convention Internationale de la Jeunesse", category: "Kit de Campagne Complet", church: "Mission Nouvelle Alliance", date: "Janvier 2027" },
    { title: "Refonte Identité & Charte Graphique", category: "Branding d'Église", church: "Église Grâce & Vérité", date: "Décembre 2026" },
    { title: "Série Prédication : 'L'Onction du Saint-Esprit'", category: "Vidéos & Reels Prédication", church: "Centre Évangélique de la Foi", date: "Novembre 2026" },
    { title: "Campagne d'Évangélisation de Rue & Affichage", category: "Affiches & Dépliants HD", church: "Mission Apostolique", date: "Octobre 2026" },
  ];

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">RÉALISATIONS</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            L&apos;excellence graphique au service du message
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Découvrez un aperçu des productions créatives livrées à nos églises partenaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 hover:border-zinc-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-[#FF5500] font-medium">{item.church}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>Production holy.army</span>
                <span className="text-emerald-400 font-semibold">Validé & Diffusé</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
              Équiper votre église maintenant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}