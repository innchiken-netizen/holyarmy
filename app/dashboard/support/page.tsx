"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LifeBuoy, Plus, MessageSquare, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
  const [tickets, setTickets] = useState([
    {
      id: "TICK-101",
      subject: "Question sur le format d'exportation pour écrans LED",
      status: "RESOLVED",
      date: "Il y a 5 jours",
      lastReply: "L'équipe holy.army vous a transmis le preset 3840x2160 sans compression.",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setTickets((prev) => [
      {
        id: `TICK-${Date.now().toString().slice(-4)}`,
        subject,
        status: "OPEN",
        date: "À l'instant",
        lastReply: message,
      },
      ...prev,
    ]);
    setModal(false);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Support & Assistance</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Ligne directe avec la direction technique et artistique de holy.army.
          </p>
        </div>

        <Button
          onClick={() => setModal(true)}
          size="sm"
          className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Ouvrir un ticket
        </Button>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => (
          <Card key={t.id} className="border-zinc-800 bg-[#121214] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#FF5500]">{t.id}</span>
              <Badge variant={t.status === "RESOLVED" ? "success" : "warning"} className="text-[10px]">
                {t.status === "RESOLVED" ? "Résolu" : "En cours"}
              </Badge>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{t.subject}</h3>
            <p className="text-xs text-zinc-400 mb-3">{t.lastReply}</p>
            <div className="text-[11px] text-zinc-500">{t.date}</div>
          </Card>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl border border-zinc-800 bg-[#121214] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Nouveau ticket d&apos;assistance</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Sujet de votre demande</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Problème d'accès à la bio-page ou demande d'export"
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Détails de la demande</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setModal(false)} className="text-xs border-zinc-800">
                  Annuler
                </Button>
                <Button type="submit" size="sm" className="text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold">
                  Envoyer le ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}