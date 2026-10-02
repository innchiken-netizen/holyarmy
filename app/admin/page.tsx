import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, CreditCard, FileEdit, Users, 
  AlertCircle, ArrowRight, CheckCircle2, TrendingUp 
} from "lucide-react";
import { getAdminOverviewMetrics } from "@/lib/server/admin";
import { formatCurrency } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const metrics = await getAdminOverviewMetrics();

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Centre de Commandement</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Pilotage opérationnel de la production créative, des abonnements et des ministères.
          </p>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Revenu Récurrent (MRR)</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {formatCurrency(metrics.mrrCents, "EUR")}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            {metrics.activeSubscriptions} abonnements actifs
          </div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Ministères Actifs</span>
            <Building2 className="h-4 w-4 text-[#FF5500]" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics.activeOrganizations}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Sur {metrics.totalOrganizations} inscrits</div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">En Production</span>
            <FileEdit className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics.requestsInProduction}</div>
          <div className="text-[10px] text-amber-400 mt-1">
            {metrics.requestsAwaitingAssignment} en attente d&apos;attribution
          </div>
        </Card>

        <Card className="border-zinc-800 bg-[#121214] p-5">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs">Paiements en attente</span>
            <CreditCard className="h-4 w-4 text-[#FF5500]" />
          </div>
          <div className="text-2xl font-bold text-white">{metrics.pendingManualPayments}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Virements à vérifier</div>
        </Card>
      </div>

      {/* Operational Queues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Urgent Actions Queue */}
        <Card className="border-zinc-800 bg-[#121214]">
          <CardHeader className="pb-3 border-b border-zinc-800">
            <CardTitle className="text-sm font-semibold text-white">
              Actions Opérationnelles Requises
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            {metrics.pendingManualPayments > 0 && (
              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Virements manuels en attente</div>
                  <div className="text-zinc-400 text-[11px]">Un client a soumis une preuve bancaire à vérifier</div>
                </div>
                <Link href="/admin/payments">
                  <Button size="sm" className="h-7 text-xs bg-[#FF5500] hover:bg-[#E04B00] text-black font-semibold">
                    Vérifier
                  </Button>
                </Link>
              </div>
            )}

            <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Demandes en cours de création</div>
                <div className="text-zinc-400 text-[11px]">Série Pâques 2027 & Motion Miracle</div>
              </div>
              <Link href="/admin/requests">
                <Button variant="outline" size="sm" className="h-7 text-xs border-zinc-700 text-zinc-300">
                  Ouvrir pipeline
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Platform Activity */}
        <Card className="border-zinc-800 bg-[#121214]">
          <CardHeader className="pb-3 border-b border-zinc-800">
            <CardTitle className="text-sm font-semibold text-white">
              Derniers évènements système
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/60">
              <div>
                <span className="font-semibold text-white">Livrable soumis par le DA</span>
                <div className="text-[11px] text-zinc-400">Motion_Vendredi_Miracle_v1.mp4</div>
              </div>
              <span className="text-[10px] text-zinc-500">Il y a 1h</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-800/60">
              <div>
                <span className="font-semibold text-white">Publication de bio-page</span>
                <div className="text-[11px] text-zinc-400">holy.army/paulmukendi</div>
              </div>
              <span className="text-[10px] text-emerald-400">En ligne</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}