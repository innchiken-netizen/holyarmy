"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, LayoutDashboard, Building2, FileEdit, 
  CreditCard, Inbox, History, Settings, ExternalLink 
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Vue Opérationnelle", href: "/admin", icon: LayoutDashboard },
    { label: "Organisations Clientes", href: "/admin/organizations", icon: Building2 },
    { label: "Production Créative", href: "/admin/requests", icon: FileEdit },
    { label: "Paiements & Facturation", href: "/admin/payments", icon: CreditCard },
    { label: "Prospects & Leads", href: "/admin/leads", icon: Inbox },
    { label: "Journal d'Audit", href: "/admin/audit", icon: History },
    { label: "Paramètres Plateforme", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-[#070709] flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500 font-black text-black text-xs">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-bold tracking-tight text-white text-base">
              holy<span className="text-emerald-400">.staff</span>
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block">
            Centre de Commandement
          </span>
        </div>

        <nav className="p-3 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white border-l-2 border-emerald-400"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-950/60">
        <Link href="/dashboard" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white">
          <span>Retour Espace Client</span>
          <ExternalLink className="h-3.5 w-3.5 text-[#FF5500]" />
        </Link>
      </div>
    </aside>
  );
}