import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRight, ShieldCheck, Heart, Play, Share2 } from "lucide-react";

export default function DigitalProfilesShowcasePage() {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">BIO-PAGES PASTEURS</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Un profil digital officiel pour incarner l&apos;autorité de votre appel
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Centralisez vos réseaux, cultes en direct, enseignements et dons sur une page à l&apos;esthétique d&apos;excellence.
          </p>
        </div>

        {/* 3 Templates preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 flex flex-col justify-between">
            <div>
              <Badge variant="outline" className="text-xs text-zinc-400 border-zinc-800 mb-3">Template 01</Badge>
              <h3 className="text-xl font-bold text-white mb-2">Minimal Editorial</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Inspiré des plus grandes publications internationales. Typographie raffinée, fort contraste et mise en avant sobre de la parole.
              </p>
            </div>
            <Link href="/paulmukendi">
              <Button variant="outline" size="sm" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
                Aperçu : Pasteur Paul Mukendi
              </Button>
            </Link>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 flex flex-col justify-between">
            <div>
              <Badge variant="outline" className="text-xs text-zinc-400 border-zinc-800 mb-3">Template 02</Badge>
              <h3 className="text-xl font-bold text-white mb-2">Bold Ministry</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Design percutant avec bannière héroïque en pleine largeur, accents vibrants et boutons d&apos;appel à l&apos;action mis en exergue.
              </p>
            </div>
            <Link href="/davidkouassi">
              <Button variant="outline" size="sm" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
                Aperçu : Pasteur David Kouassi
              </Button>
            </Link>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 flex flex-col justify-between">
            <div>
              <Badge variant="outline" className="text-xs text-zinc-400 border-zinc-800 mb-3">Template 03</Badge>
              <h3 className="text-xl font-bold text-white mb-2">Executive Pastor</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Structure modulaire en cartes : agenda des conférences, chaîne de podcast, livres publiés et partenariats ministériels.
              </p>
            </div>
            <Link href="/pricing">
              <Button variant="outline" size="sm" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
                Inclus dans toutes les formules
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
              Créer votre bio-page officielle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}