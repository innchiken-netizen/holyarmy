"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, User, Palette, Share2, CreditCard, 
  Globe, CheckCircle2, ArrowRight, ArrowLeft 
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [churchName, setChurchName] = useState("Centre Réveil & Vie");
  const [pastorName, setPastorName] = useState("Pasteur Paul Mukendi");
  const [city, setCity] = useState("Paris");
  const [country, setCountry] = useState("France");
  const [selectedPlan, setSelectedPlan] = useState("impact");
  const [selectedTemplate, setSelectedTemplate] = useState("minimal-editorial");
  const [publicSlug, setPublicSlug] = useState("paulmukendi");

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard");
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#FF5500] font-black text-black text-xs">
              HA
            </div>
            <span className="font-bold tracking-tight text-white text-base">holy.army</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Configuration de votre ministère</h1>
          <p className="text-xs text-zinc-400 mt-1">Étape {step} sur {totalSteps}</p>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#FF5500] h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-zinc-800 bg-[#121214] shadow-2xl">
          <CardContent className="pt-6">
            {/* STEP 1: Church Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-5 w-5 text-[#FF5500]" />
                  <h3 className="font-bold text-white text-base">Informations de votre assemblée</h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nom de l&apos;église / ministère</label>
                  <Input value={churchName} onChange={(e) => setChurchName(e.target.value)} className="bg-zinc-900 border-zinc-800" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Ville</label>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Pays</label>
                    <Input value={country} onChange={(e) => setCountry(e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Pastor Profile */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-5 w-5 text-[#FF5500]" />
                  <h3 className="font-bold text-white text-base">Pasteur principal & Leader</h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nom et titre du pasteur</label>
                  <Input value={pastorName} onChange={(e) => setPastorName(e.target.value)} className="bg-zinc-900 border-zinc-800" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Numéro WhatsApp officiel</label>
                  <Input placeholder="+33 6 12 34 56 78" className="bg-zinc-900 border-zinc-800" />
                </div>
              </div>
            )}

            {/* STEP 3: Plan selection */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="h-5 w-5 text-[#FF5500]" />
                  <h3 className="font-bold text-white text-base">Choix de la formule initiale</h3>
                </div>

                <div className="space-y-3">
                  <div 
                    onClick={() => setSelectedPlan("essentiel")}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      selectedPlan === "essentiel" ? "border-[#FF5500] bg-orange-500/5" : "border-zinc-800 bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Essentiel (990 €/mois)</span>
                      <span className="text-xs text-zinc-400">10 visuels cultes / mois</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan("impact")}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      selectedPlan === "impact" ? "border-[#FF5500] bg-orange-500/5" : "border-zinc-800 bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Impact (1 990 €/mois)</span>
                      <span className="text-xs text-[#FF5500] font-semibold">25 visuels + 4 motions</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan("strike_force")}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      selectedPlan === "strike_force" ? "border-[#FF5500] bg-orange-500/5" : "border-zinc-800 bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Strike Force (3 990 €/mois)</span>
                      <span className="text-xs text-zinc-400">Production illimitée</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Bio-Page Template */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-5 w-5 text-[#FF5500]" />
                  <h3 className="font-bold text-white text-base">Modèle de Bio-Page Pasteur</h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "minimal-editorial", label: "Minimal Editorial" },
                    { id: "bold-ministry", label: "Bold Ministry" },
                    { id: "executive-pastor", label: "Executive Pastor" },
                  ].map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`p-3 rounded-lg border text-center cursor-pointer text-xs ${
                        selectedTemplate === tpl.id ? "border-[#FF5500] bg-orange-500/10 text-white font-bold" : "border-zinc-800 text-zinc-400"
                      }`}
                    >
                      {tpl.label}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Lien public : holy.army/<span className="text-[#FF5500]">{publicSlug}</span>
                  </label>
                  <Input 
                    value={publicSlug} 
                    onChange={(e) => setPublicSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} 
                    className="bg-zinc-900 border-zinc-800 font-mono text-xs" 
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Confirmation */}
            {step === 5 && (
              <div className="text-center py-4 space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Tout est prêt !</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  Votre espace ministère pour <strong>{churchName}</strong> est initialisé. Vous pouvez désormais créer votre première demande graphique ou personnaliser votre bio-page.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(step - 1)}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Précédent
                </Button>
              ) : <div />}

              <Button
                onClick={handleNext}
                isLoading={loading}
                className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-9 px-5 text-xs"
              >
                {step === totalSteps ? "Accéder à mon tableau de bord" : "Continuer"}
                {step < totalSteps && <ArrowRight className="ml-1.5 h-3.5 w-3.5" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}