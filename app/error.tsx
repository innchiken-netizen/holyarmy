"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 font-bold text-lg mb-6">
        !
      </div>
      <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Une interruption inattendue est survenue</h1>
      <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
        Notre système a intercepté l&apos;incident. L&apos;équipe technique en a été notifiée.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" size="sm" className="text-xs border-zinc-700 text-zinc-300">
          Réessayer
        </Button>
        <Link href="/">
          <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs">
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}