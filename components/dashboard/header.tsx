"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Search, Shield, ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-14 border-b border-zinc-800/80 bg-[#09090B]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Centre Réveil & Vie</span>
          <span>/</span>
          <span className="text-white font-medium">Tableau de bord</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Public profile quick link */}
        <Link href="/paulmukendi" target="_blank">
          <Button variant="ghost" size="sm" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 h-8">
            <span>Bio-Page</span>
            <ExternalLink className="h-3 w-3 text-[#FF5500]" />
          </Button>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#FF5500]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-zinc-800 bg-[#121214] shadow-2xl p-4 z-50 text-xs">
              <div className="flex items-center justify-between font-semibold text-white pb-2 border-b border-zinc-800">
                <span>Notifications</span>
                <span className="text-[10px] text-[#FF5500]">1 non lue</span>
              </div>
              <div className="py-3 border-b border-zinc-800/60">
                <div className="font-medium text-white mb-1">Aperçu vidéo disponible</div>
                <div className="text-zinc-400 text-[11px] leading-relaxed">
                  Le motion flyer pour le &quot;Vendredi Miracle&quot; est prêt pour votre validation.
                </div>
                <div className="text-[10px] text-zinc-500 mt-1.5">Il y a 1 heure</div>
              </div>
              <div className="pt-2 text-center">
                <Link href="/dashboard/deliverables" onClick={() => setNotificationsOpen(false)} className="text-[#FF5500] hover:underline font-medium text-[11px]">
                  Voir tous les livrables
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Switch to Admin Mode (for staff/superadmin convenience) */}
        <Link href="/admin">
          <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>Accès Admin</span>
          </Button>
        </Link>

        {/* Logout */}
        <Link href="/login">
          <button className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-red-400" title="Déconnexion">
            <LogOut className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </header>
  );
}