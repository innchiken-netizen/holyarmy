"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function InvitePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccept = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <Card className="border-zinc-800 bg-[#121214] shadow-2xl">
      <CardContent className="pt-6 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF5500]">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Invitation à rejoindre un ministère</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Vous avez été invité à collaborer sur l&apos;espace de :
          </p>
          <div className="mt-2 text-base font-semibold text-[#FF5500]">
            Centre Réveil & Vie (Paris)
          </div>
        </div>

        <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-300">
          Rôle assigné : <strong>Administrateur Communication</strong>
        </div>

        <Button
          onClick={handleAccept}
          isLoading={loading}
          className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-10"
        >
          Accepter et accéder à l&apos;espace
        </Button>
      </CardContent>
    </Card>
  );
}