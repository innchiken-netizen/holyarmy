import { AdminSidebar } from "@/components/admin/sidebar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#070709]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-zinc-800 bg-[#09090B]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">holy.army Administration</span>
            <span className="text-zinc-600">/</span>
            <span className="text-white font-medium">Opérations</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <ShieldCheck className="mr-1 h-3 w-3" />
              SUPER_ADMIN
            </Badge>
            <div className="text-xs font-medium text-white">Directeur Général</div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}