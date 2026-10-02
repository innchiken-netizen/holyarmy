"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, Download, Play, Eye } from "lucide-react";

export default function DeliverablesPage() {
  const [deliverables, setDeliverables] = useState([
    {
      id: "deliv-1",
      title: "Motion_Vendredi_Miracle_v1.mp4",
      version: 1,
      requestTitle: "Motion Flyer Vendredi Miracle & Délivrance",
      fileSize: "14.5 Mo",
      fileType: "video/mp4",
      status: "PENDING_REVIEW",
      uploadedAt: "Hier à 18h20",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "deliv-2",
      title: "Serie_Paques_2027_Affiche_Finale.png",
      version: 2,
      requestTitle: "Visuel d'annonce Série Pâques 2027",
      fileSize: "8.2 Mo",
      fileType: "image/png",
      status: "APPROVED",
      uploadedAt: "Il y a 3 jours",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const [feedbackModal, setFeedbackModal] = useState<string | null>(null);
  const [feedbackNote, setFeedbackNote] = useState("");

  const handleApprove = (id: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "APPROVED" } : d))
    );
  };

  const handleRequestRevision = (id: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "CHANGES_REQUESTED" } : d))
    );
    setFeedbackModal(null);
    setFeedbackNote("");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Livrables & Approbations</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Passez en revue les créations de votre équipe d&apos;art holy.army, validez en un clic ou demandez un ajustement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverables.map((item) => (
          <Card key={item.id} className="border-zinc-800 bg-[#121214] overflow-hidden flex flex-col justify-between">
            <div>
              {/* Media Preview Box */}
              <div className="h-48 bg-zinc-900 border-b border-zinc-800 relative flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-300" 
                     style={{ backgroundImage: `url(${item.thumbnail})` }} />
                <div className="relative z-10 flex items-center gap-2">
                  <div className="p-3 rounded-full bg-black/70 text-white border border-white/20">
                    {item.fileType.includes("video") ? <Play className="h-5 w-5 text-[#FF5500]" /> : <Eye className="h-5 w-5 text-white" />}
                  </div>
                </div>
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="outline" className="text-[10px] bg-black/70 text-zinc-200 border-zinc-700 backdrop-blur-sm">
                    Version {item.version}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant={item.status === "APPROVED" ? "success" : item.status === "CHANGES_REQUESTED" ? "danger" : "warning"} className="text-[10px]">
                    {item.status === "APPROVED" ? "Validé pour diffusion" : item.status === "CHANGES_REQUESTED" ? "Modifications demandées" : "En attente de votre accord"}
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.requestTitle}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/60">
                  <span>Taille : {item.fileSize}</span>
                  <span>Téléversé : {item.uploadedAt}</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-5 pt-0 flex items-center justify-between gap-3">
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Téléchargement du fichier source HD démarré."); }}>
                <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Download className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                  Télécharger HD
                </Button>
              </a>

              {item.status === "PENDING_REVIEW" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeedbackModal(item.id)}
                    className="h-8 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    Ajuster
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(item.id)}
                    className="h-8 text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold"
                  >
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                    Approuver
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Revision Modal */}
      {feedbackModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl border border-zinc-800 bg-[#121214] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Demande d&apos;ajustements</h3>
            <p className="text-xs text-zinc-400">
              Précisez les points à modifier pour notre directeur artistique (horaire, orthographe, recadrage...)
            </p>
            <textarea
              rows={4}
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="Ex: Merci de décaler l'heure à 19h30 au lieu de 20h00 et d'éclaircir le visage de l'orateur."
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5500]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setFeedbackModal(null)} className="text-xs border-zinc-800">
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={() => handleRequestRevision(feedbackModal)}
                className="text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold"
              >
                Transmettre les retouches
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}