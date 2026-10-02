import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">NOTRE MANIFESTE</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Nous sommes holy.army.
          </h1>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Plus qu&apos;une agence marketing, nous sommes la force de frappe digitale de votre ministère.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <div className="p-8 rounded-2xl border border-zinc-800 bg-[#121214]">
            <h3 className="text-xl font-bold text-white mb-4">Notre conviction fondamentale</h3>
            <p className="mb-4">
              Dans un monde hyper-connecté où chaque seconde compte, l&apos;Évangile est le message le plus puissant jamais confié à l&apos;humanité. Pourtant, trop souvent, les églises sont freinées par un manque d&apos;outils professionnels, des designs amateurs ou la fatigue des bénévoles.
            </p>
            <p>
              Nous croyons que le Royaume de Dieu mérite le standard d&apos;excellence des plus grandes entreprises de technologie. C&apos;est pourquoi nous avons combiné la rigueur d&apos;un SaaS Silicon Valley et la passion d&apos;un coeur dévoué à l&apos;avancement des âmes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-zinc-800 bg-[#121214]">
              <Shield className="h-6 w-6 text-[#FF5500] mb-3" />
              <h4 className="font-bold text-white mb-2">Alignement spirituel</h4>
              <p className="text-xs text-zinc-400">
                Nos équipes partagent votre foi et respectent la solennité de votre appel ministériel.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#121214]">
              <Sparkles className="h-6 w-6 text-[#FF5500] mb-3" />
              <h4 className="font-bold text-white mb-2">Discipline technique</h4>
              <p className="text-xs text-zinc-400">
                Délais garantis, workflows de validation fluides et sécurité rigoureuse des données.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-[#121214]">
              <HeartHandshake className="h-6 w-6 text-[#FF5500] mb-3" />
              <h4 className="font-bold text-white mb-2">Partenariat durable</h4>
              <p className="text-xs text-zinc-400">
                Nous ne sommes pas un prestataire anonyme, mais un allié stratégique au service de vos victoires.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
              Rejoindre le mouvement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}