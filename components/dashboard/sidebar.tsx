"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FolderKanban, FileEdit, CheckSquare, 
  Image as ImageIcon, Globe, BarChart3, CreditCard, 
  Users, LifeBuoy, Settings, ChevronDown, Plus 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
    { label: "Demandes", href: "/dashboard/requests", icon: FileEdit },
    { label: "Livrables & Approbations", href: "/dashboard/deliverables", icon: CheckSquare },
    { label: "Campagnes", href: "/dashboard/campaigns", icon: FolderKanban },
    { label: "Médiathèque", href: "/dashboard/media", icon: ImageIcon },
    { label: "Bio-Page Pasteur", href: "/dashboard/profile", icon: Globe },
    { label: "Statistiques", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Abonnement & Factures", href: "/dashboard/billing", icon: CreditCard },
    { label: "Équipe & Rôles", href: "/dashboard/team", icon: Users },
    { label: "Support Dédié", href: "/dashboard/support", icon: LifeBuoy },
    { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800/80 bg-[#0c0c0e] flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand & Organization Switcher */}
        <div className="p-4 border-b border-zinc-800/80">
          <Link href="/dashboard" className="flex items-center gap-2 mb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#FF5500] font-black text-black text-xs">
              HA
            </div>
            <span className="font-bold tracking-tight text-white text-base">
              holy<span className="text-[#FF5500]">.</span>army
            </span>
          </Link>

          {/* Org selector button */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
            <div className="truncate">
              <div className="font-semibold text-white truncate">Centre Réveil & Vie</div>
              <div className="text-[10px] text-[#FF5500]">Formule Impact (Actif)</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
          </div>
        </div>

        {/* Action Button: Nouvelle Demande */}
        <div className="p-3">
          <Link href="/dashboard/requests/new">
            <button className="w-full flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs py-2 px-3 rounded-md transition-colors shadow-sm">
              <Plus className="h-3.5 w-3.5" />
              Nouvelle demande
            </button>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white border-l-2 border-[#FF5500]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#FF5500]" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer: User profile info */}
      <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-white">
            PM
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold text-white truncate">Pasteur Paul Mukendi</div>
            <div className="text-[10px] text-zinc-500 truncate">paul.mukendi@reveilvie.org</div>
          </div>
        </div>
      </div>
    </aside>
  );
}