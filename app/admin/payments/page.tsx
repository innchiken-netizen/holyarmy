"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: "pay-manual-101",
      org: "Impact Centre Chrétien",
      amount: "990,00 €",
      plan: "Essentiel",
      provider: "MANUAL",
      status: "PENDING",
      reference: "VIR-ICC-BRUXELLES-2027",
      date: "Aujourd'hui à 09h40",
    },
    {
      id: "pay-stripe-102",
      org: "Centre Réveil & Vie",
      amount: "1 990,00 €",
      plan: "Impact",
      provider: "STRIPE",
      status: "VERIFIED",
      reference: "ch_3M1902K392819",
      date: "Il y a 10 jours",
    },
  ]);

  const handleVerify = (id: string, approve: boolean) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: approve ? "VERIFIED" : "FAILED" } : p
      )
    );
    if (approve) {
      alert("Paiement validé avec succès. L'abonnement a été immédiatement activé pour ce ministère.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Gestion des Paiements & Virements</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Validation des virements bancaires manuels et suivi des souscriptions Stripe.
        </p>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-0 divide-y divide-zinc-800 text-xs">
          {payments.map((p) => (
            <div key={p.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{p.org}</h3>
                  <Badge variant={p.status === "VERIFIED" ? "success" : p.status === "FAILED" ? "danger" : "warning"} className="text-[10px]">
                    {p.status === "VERIFIED" ? "Validé" : p.status === "FAILED" ? "Rejeté" : "En attente de vérification"}
                  </Badge>
                  <span className="text-[10px] text-zinc-500 uppercase">{p.provider}</span>
                </div>
                <div className="text-xs text-zinc-400">
                  Formule {p.plan} • Montant : <strong className="text-white">{p.amount}</strong>
                </div>
                <div className="text-[11px] text-zinc-500">
                  Réf. : <code className="text-[#FF5500]">{p.reference}</code> • Soumis le {p.date}
                </div>
              </div>

              {p.status === "PENDING" && (
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVerify(p.id, false)}
                    className="h-8 text-xs border-zinc-700 text-red-400 hover:bg-zinc-800"
                  >
                    Rejeter
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleVerify(p.id, true)}
                    className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                    Valider et activer l&apos;abonnement
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}