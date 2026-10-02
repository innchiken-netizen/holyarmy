"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="holy" className="mb-4">CONTACT & AUDIT</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Échangez avec l&apos;équipe holy.army
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Demandez un audit gratuit de vos supports de communication ou posez vos questions à nos spécialistes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Info cards */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-[#121214]">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-[#FF5500]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Email direct</h4>
                  <p className="text-zinc-400 text-xs">contact@holy.army</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800 bg-[#121214]">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-[#FF5500]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Ligne d&apos;urgence ministères</h4>
                  <p className="text-zinc-400 text-xs">+33 1 89 71 42 00 / WhatsApp disponible</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800 bg-[#121214]">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-[#FF5500]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Siège & Studio</h4>
                  <p className="text-zinc-400 text-xs">Paris, France • Rayonnement International</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="border-zinc-800 bg-[#121214]">
            <CardContent className="pt-6">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Demande reçue avec succès</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    Un directeur de compte holy.army vous contactera sous 24h ouvrées pour programmer votre diagnostic offert.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Nom complet <span className="text-[#FF5500]">*</span>
                    </label>
                    <Input required placeholder="Pasteur Jean Dupont" className="bg-zinc-900 border-zinc-800" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Adresse email <span className="text-[#FF5500]">*</span>
                    </label>
                    <Input required type="email" placeholder="contact@votre-eglise.org" className="bg-zinc-900 border-zinc-800" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Numéro de téléphone / WhatsApp <span className="text-[#FF5500]">*</span>
                    </label>
                    <Input required placeholder="+33 6 12 34 56 78" className="bg-zinc-900 border-zinc-800" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Nom de votre ministère ou église <span className="text-[#FF5500]">*</span>
                    </label>
                    <Input required placeholder="Centre Chrétien Victoire" className="bg-zinc-900 border-zinc-800" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Votre besoin principal
                    </label>
                    <Input placeholder="Ex: Refonte visuelle complète & visuels pour cultes" className="bg-zinc-900 border-zinc-800" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Message / Précisions
                    </label>
                    <Textarea placeholder="Indiquez vos objectifs ou vos échéances..." className="bg-zinc-900 border-zinc-800" />
                  </div>

                  <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-11"
                  >
                    Envoyer ma demande
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}