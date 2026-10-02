"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Mail, Shield } from "lucide-react";

export default function TeamPage() {
  const [members, setMembers] = useState([
    { id: "1", name: "Pasteur Paul Mukendi", email: "paul.mukendi@reveilvie.org", role: "OWNER" },
    { id: "2", name: "Sarah Lumumba", email: "sarah.com@reveilvie.org", role: "ADMIN" },
  ]);

  const [inviteModal, setInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "Nouveau Collaborateur", email: inviteEmail, role: "EDITOR" },
    ]);
    setInviteModal(false);
    setInviteEmail("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Équipe & Collaborateurs</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gérez les personnes autorisées à soumettre des demandes et valider les créations.
          </p>
        </div>

        <Button
          onClick={() => setInviteModal(true)}
          size="sm"
          className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9"
        >
          <UserPlus className="mr-1.5 h-3.5 w-3.5" />
          Inviter un membre
        </Button>
      </div>

      <Card className="border-zinc-800 bg-[#121214]">
        <div className="p-0 divide-y divide-zinc-800/80 text-xs">
          {members.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-white">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{m.name}</div>
                  <div className="text-zinc-500 text-[11px]">{m.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px] bg-zinc-900 border-zinc-800 text-zinc-300">
                  {m.role === "OWNER" ? "Propriétaire" : m.role === "ADMIN" ? "Administrateur" : "Éditeur"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Invite Modal */}
      {inviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl border border-zinc-800 bg-[#121214] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Inviter un collaborateur</h3>
            <p className="text-xs text-zinc-400">
              Un email d&apos;invitation sécurisé sera transmis pour rejoindre l&apos;espace de Centre Réveil & Vie.
            </p>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Adresse email</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="collaborateur@eglise.org"
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setInviteModal(false)} className="text-xs border-zinc-800">
                  Annuler
                </Button>
                <Button type="submit" size="sm" className="text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold">
                  Envoyer l&apos;invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}