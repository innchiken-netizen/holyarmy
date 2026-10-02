"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF5500] font-black text-black text-sm tracking-tighter transition-transform group-hover:scale-105">
              HA
            </div>
            <span className="font-bold tracking-tight text-lg text-white">
              holy<span className="text-[#FF5500]">.</span>army
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">
              Méthode
            </Link>
            <Link href="/digital-profiles" className="hover:text-white transition-colors">
              Bio-Pages Pasteurs
            </Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Tarifs
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
              Connexion
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-semibold">
              Rejoindre l&apos;armée
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090B] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-zinc-300">
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>
              Méthode
            </Link>
            <Link href="/digital-profiles" onClick={() => setMobileMenuOpen(false)}>
              Bio-Pages Pasteurs
            </Link>
            <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>
              Portfolio
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              Tarifs
            </Link>
          </nav>
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Connexion
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#FF5500] text-black font-semibold hover:bg-[#E04B00]">
                Rejoindre l&apos;armée
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}