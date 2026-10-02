"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, CheckCircle2, Download, AlertCircle, ArrowUpRight } from "lucide-react";

export default function BillingPage() {
  const [manualModal, setManualModal] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setManualModal(false);
      alert("Votre référence de paiement a été transmise au service financier holy.army pour validation.");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Abonnement & Facturation</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gérez votre formule ministérielle, vos quotas mensuels et vos factures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setManualModal(true)}
            variant="outline"
            size="sm"
            className="text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-9"
          >
            Paiement manuel / Virement
          </Button>
          <a href="/pricing">
            <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
              Changer de formule
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Subscription Card */}
      <Card className="border-2 border-[#FF5500]/40 bg-[#121214] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider">Abonnement Actuel</span>
              <Badge variant="success" className="text-[10px]">Actif</Badge>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Formule Impact</h2>
            <p className="text-xs text-zinc-400">
              1 990,00 € / mois • Prochain renouvellement le 22 du mois prochain par Carte Bancaire
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-400">Délai garanti de production</div>
            <div className="text-sm font-bold text-white">24h – 48h (File prioritaire)</div>
          </div>
        </div>
      </Card>

      {/* Invoices List */}
      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-5 border-b border-zinc-800/80">
          <h3 className="text-sm font-bold text-white">Historique des factures</h3>
        </div>
        <div className="divide-y divide-zinc-800/80 text-xs">
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">Facture HA-2027-0012</div>
              <div className="text-zinc-500 text-[11px]">Payée le 10 Février 2027 • Carte bancaire</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-white">1 990,00 €</span>
              <Badge variant="success" className="text-[10px]">Réglée</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-zinc-400 hover:text-white p-0">
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Manual Payment Modal */}
      {manualModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl border border-zinc-800 bg-[#121214] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Déclarer un paiement manuel</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Si vous effectuez un virement bancaire ou un transfert pour votre formule, saisissez ici votre référence de transaction pour accréditation immédiate.
            </p>

            <form onSubmit={handleManualSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Montant viré</label>
                <input
                  type="text"
                  required
                  defaultValue="1990 €"
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Référence bancaire du virement</label>
                <input
                  type="text"
                  required
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  placeholder="Ex: VIR-HA-REVEIL-2027"
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setManualModal(false)} className="text-xs border-zinc-800">
                  Fermer
                </Button>
                <Button type="submit" size="sm" className="text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold">
                  {submitted ? "Transmission..." : "Valider le paiement"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}