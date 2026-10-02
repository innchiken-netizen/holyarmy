import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, CheckCircle2, Sparkles, Shield, Zap, 
  Layers, Users, Video, Palette, Globe, Play, Heart 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-[#FF5500] mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            <span>LA FORCE DE FRAPPE DIGITALE DE VOTRE MINISTÈRE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
            Le plus grand message de l&apos;histoire mérite{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#FF5500]">
              la meilleure technologie.
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Concentrez-vous sur les âmes. Nous gérons votre visibilité. 
            Production graphique d&apos;élite, motion flyers, vidéos de prédication et bio-pages exclusives pour pasteurs et églises.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
                Déployer holy.army
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-800 hover:bg-zinc-900 text-zinc-300 h-12 px-8">
                Découvrir la méthode
              </Button>
            </Link>
          </div>

          {/* Social Proof metrics */}
          <div className="mt-16 pt-8 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">100+</div>
              <div className="text-xs text-zinc-500 mt-0.5">Ministères et églises équipés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">24h – 48h</div>
              <div className="text-xs text-zinc-500 mt-0.5">Délai moyen de production</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF5500] tracking-tight">100%</div>
              <div className="text-xs text-zinc-500 mt-0.5">Alignement et respect spirituel</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">0 Contrat</div>
              <div className="text-xs text-zinc-500 mt-0.5">Sans engagement à long terme</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMS MINISTRIES FACE */}
      <section className="py-20 border-t border-zinc-800/80 bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="text-zinc-400 border-zinc-800 mb-4">
              LE CONSTAT
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Votre communication souffre souvent de 3 limites majeures
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#121214] border-zinc-800">
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-md bg-red-500/10 text-red-400 flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Le bricolage amateur</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Des templates Canva répétitifs qui diluent l&apos;autorité spirituelle de vos annonces et ne reflètent pas l&apos;onction de votre assemblée.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#121214] border-zinc-800">
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Le burn-out des bénévoles</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Des jeunes de l&apos;église sollicités jusqu&apos;à minuit chaque samedi pour envoyer un flyer, avec des retards chroniques et une fatigue évidente.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#121214] border-zinc-800">
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-md bg-orange-500/10 text-[#FF5500] flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold text-white mb-2">L&apos;incompréhension des agences profanes</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Les agences classiques ne comprennent ni le langage de la foi, ni les impératifs des séries de jeûne, ni la solennité des cultes d&apos;onction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION & SERVICES */}
      <section className="py-24 border-t border-zinc-800/80 bg-[#09090B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="holy" className="mb-4">
              NOTRE RÉPONSE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Une direction artistique de calibre Silicon Valley au service du Royaume
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base">
              Une infrastructure complète combinant plateforme SaaS de collaboration et créatifs chevronnés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
              <Palette className="h-8 w-8 text-[#FF5500] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Visuels Cultes & Séries</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Affiches, déclinaisons réseaux sociaux (stories, posts portrait) et habillages géants pour écrans d&apos;auditorium.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
              <Video className="h-8 w-8 text-[#FF5500] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Motion Flyers & Vidéos</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Animations vidéo rythmées et modernes pour vos évènements majeurs, génériques de culte et extraits verticaux percutants.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
              <Globe className="h-8 w-8 text-[#FF5500] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Bio-Pages Pasteurs</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Une page officielle moderne (ex: holy.army/paulmukendi) regroupant vos prédications, vos liens de don sécurisés et vos évènements.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
              <Zap className="h-8 w-8 text-[#FF5500] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Campagnes & Conférences</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Accompagnement complet de A à Z pour vos conférences annuelles, croisades d&apos;impact et évènements de jeunesse.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
              <Shield className="h-8 w-8 text-[#FF5500] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Kit d&apos;Identité de Marque</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Refonte de logo, charte graphique rigoureuse, typographies propriétaires et guides de style pour toute votre assemblée.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 bg-[#121214] hover:border-zinc-700 transition-colors">
              <Users className="h-8 w-8 text-[#FF5500] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Portail Collaboratif Église</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Suivi de vos demandes en temps réel, validations en 1 clic depuis votre smartphone et archivage cloud illimité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIGITAL PASTOR PROFILE SHOWCASE */}
      <section className="py-24 border-t border-zinc-800/80 bg-[#0c0c0e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="holy" className="mb-4">EXCLUSIVITÉ HOLY.ARMY</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Votre profil digital de pasteur. Élégant, puissant, centralisé.
              </h2>
              <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                Remplacez les outils de bio-links basiques par une page digne d&apos;une autorité ministérielle. 
                Diffusable sur tous vos réseaux sociaux (Instagram, YouTube, TikTok, WhatsApp).
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF5500] mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Centralisation de vos prédications :</strong> Liens directs vers vos messages récents et playlists YouTube.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF5500] mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Don & Libéralité fluide :</strong> Bouton d&apos;action directe pour les offrandes, dîmes et partenaires de mission.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF5500] mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Identifiant personnalisé unique :</strong> ex: <code className="text-[#FF5500]">holy.army/paulmukendi</code>
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/paulmukendi">
                  <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                    Voir la page démo de Pasteur Paul Mukendi
                    <ArrowRight className="ml-2 h-4 w-4 text-[#FF5500]" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mockup Preview */}
            <div className="rounded-2xl border border-zinc-800 bg-[#121214] p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <Badge variant="outline" className="text-xs bg-zinc-900 border-zinc-800 text-zinc-400">
                  holy.army/paulmukendi
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-6 pt-2">
                <div className="h-16 w-16 rounded-full bg-zinc-800 border-2 border-[#FF5500] flex items-center justify-center font-bold text-xl text-white">
                  PM
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Pasteur Paul Mukendi</h4>
                  <p className="text-xs text-[#FF5500] font-medium">Centre Réveil & Vie • Paris</p>
                  <p className="text-xs text-zinc-400 mt-1">Ministre de l&apos;Évangile depuis plus de 20 ans.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Play className="h-4 w-4 text-[#FF5500]" />
                    <span className="text-sm font-medium text-white">Culte en direct ce dimanche</span>
                  </div>
                  <span className="text-xs text-zinc-500">10h00</span>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-[#FF5500]" />
                    <span className="text-sm font-medium text-white">Soutenir le ministère / Donner</span>
                  </div>
                  <span className="text-xs text-[#FF5500] font-semibold">En ligne</span>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-[#FF5500]" />
                    <span className="text-sm font-medium text-white">Écouter le podcast Foi & Puissance</span>
                  </div>
                  <span className="text-xs text-zinc-500">Spotify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING TEASER */}
      <section className="py-24 border-t border-zinc-800/80 bg-[#09090B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="holy" className="mb-4">TARIFS TRANSPARENTS</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Une formule claire adaptée à la taille de votre église
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base">
              Tout est inclus. Aucun coût caché. Support par carte bancaire ou virement manuel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essentiel */}
            <div className="rounded-xl border border-zinc-800 bg-[#121214] p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Formule</div>
                <h3 className="text-2xl font-bold text-white mb-2">Essentiel</h3>
                <p className="text-xs text-zinc-400 mb-6">Pour structurer la communication dominicale d&apos;une église locale.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">990 €</span>
                  <span className="text-zinc-500 text-xs">/ mois</span>
                </div>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 10 visuels cultes & réseaux / mois</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 1 motion flyer ou reel / mois</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> Bio-page pasteur standard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 3 révisions par demande</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 2 accès équipe</li>
                </ul>
              </div>
              <Link href="/pricing">
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">
                  Choisir Essentiel
                </Button>
              </Link>
            </div>

            {/* Impact */}
            <div className="rounded-xl border-2 border-[#FF5500] bg-[#141416] p-8 flex flex-col justify-between relative shadow-xl shadow-orange-950/20">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#FF5500] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Le plus choisi
                </span>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider mb-2">Formule</div>
                <h3 className="text-2xl font-bold text-white mb-2">Impact</h3>
                <p className="text-xs text-zinc-400 mb-6">Pour les ministères exigeant une communication créative omnicanale.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">1 990 €</span>
                  <span className="text-zinc-500 text-xs">/ mois</span>
                </div>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 25 visuels cultes, séries & réseaux</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 4 motion flyers ou clips prédication</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> Révisions illimitées</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> Bio-page pasteur enrichie + analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> File de production prioritaire (24h)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 5 accès équipe</li>
                </ul>
              </div>
              <Link href="/pricing">
                <Button className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold">
                  Choisir Impact
                </Button>
              </Link>
            </div>

            {/* Strike Force */}
            <div className="rounded-xl border border-zinc-800 bg-[#121214] p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Formule</div>
                <h3 className="text-2xl font-bold text-white mb-2">Strike Force</h3>
                <p className="text-xs text-zinc-400 mb-6">Votre direction artistique et marketing externalisée complète.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">3 990 €</span>
                  <span className="text-zinc-500 text-xs">/ mois</span>
                </div>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> Visuels illimités</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 12 vidéos & reels prédication premium</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> Directeur artistique dédié</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> Campagnes ads Meta & Google</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> SLA 12h-24h & ligne directe</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#FF5500]" /> 15 accès équipe</li>
                </ul>
              </div>
              <Link href="/pricing">
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">
                  Choisir Strike Force
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-24 border-t border-zinc-800/80 bg-[#0c0c0e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="border-zinc-800 text-zinc-400 mb-4">MÉTHODOLOGIE</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Comment fonctionne holy.army ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-4xl font-black text-zinc-800 mb-3">01</div>
              <h4 className="text-lg font-bold text-white mb-2">Demandez</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Remplissez notre formulaire guidé en 2 minutes : titre, passage biblique, date, formats souhaités.
              </p>
            </div>

            <div className="relative">
              <div className="text-4xl font-black text-zinc-800 mb-3">02</div>
              <h4 className="text-lg font-bold text-white mb-2">Production</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nos directeurs artistiques chrétiens réalisent vos créations sous 24h à 48h selon votre formule.
              </p>
            </div>

            <div className="relative">
              <div className="text-4xl font-black text-zinc-800 mb-3">03</div>
              <h4 className="text-lg font-bold text-white mb-2">Validez</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Consultez l&apos;aperçu sur votre smartphone. Validez en 1 clic ou demandez un ajustement précis.
              </p>
            </div>

            <div className="relative">
              <div className="text-4xl font-black text-zinc-800 mb-3">04</div>
              <h4 className="text-lg font-bold text-white mb-2">Diffusez</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Téléchargez les fichiers sources et HD (PNG, MP4, PDF) prêts à projeter et publier immédiatement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 border-t border-zinc-800/80 bg-gradient-to-b from-[#09090B] to-[#120804] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Prêt à transformer la présence digitale de votre ministère ?
          </h2>
          <p className="mt-6 text-zinc-400 text-base max-w-xl mx-auto">
            Rejoignez les églises qui ont choisi l&apos;excellence graphique et la sérénité technique.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-12 px-8">
                Demander un audit gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12 px-8">
                Voir toutes les formules
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}