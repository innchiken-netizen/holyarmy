import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF5500] font-black text-lg mb-6">
        404
      </div>
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Page non trouvée</h1>
      <p className="text-xs text-zinc-400 max-w-sm mb-8 leading-relaxed">
        Cette ressource ou ce profil ministériel n&apos;existe pas ou a été déplacé vers une nouvelle adresse.
      </p>
      <Link href="/">
        <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Retour à l&apos;accueil
        </Button>
      </Link>
    </div>
  );
}