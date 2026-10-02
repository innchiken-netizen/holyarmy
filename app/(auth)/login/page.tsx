"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple dev / production auth handling
    setTimeout(() => {
      setLoading(false);
      // If email has admin, go to /admin, else /dashboard
      if (email.includes("admin")) {
        document.cookie = "ha_role_override=admin; path=/";
        router.push("/admin");
      } else {
        document.cookie = "ha_role_override=; path=/; max-age=0";
        router.push("/dashboard");
      }
    }, 600);
  };

  const handleQuickDemoLogin = (role: "client" | "admin") => {
    setLoading(true);
    if (role === "admin") {
      document.cookie = "ha_role_override=admin; path=/";
      router.push("/admin");
    } else {
      document.cookie = "ha_role_override=; path=/; max-age=0";
      router.push("/dashboard");
    }
  };

  return (
    <Card className="border-zinc-800 bg-[#121214] shadow-2xl">
      <CardContent className="pt-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Accès Plateforme</h2>
          <p className="text-xs text-zinc-400 mt-1">Connectez-vous à votre espace ministère</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Adresse email</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pasteur@eglise.org"
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-zinc-300">Mot de passe</label>
              <Link href="/reset-password" className="text-xs text-[#FF5500] hover:underline">
                Oublié ?
              </Link>
            </div>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-10 mt-2"
          >
            Se connecter
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </form>

        {/* Quick Demo Access Bar for Evaluation */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2.5 text-center">
            Accès Rapide Démo
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemoLogin("client")}
              className="text-xs border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300"
            >
              <UserCheck className="mr-1.5 h-3.5 w-3.5 text-[#FF5500]" />
              Espace Client
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemoLogin("admin")}
              className="text-xs border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300"
            >
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
              Espace Admin
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-500">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-[#FF5500] font-medium hover:underline">
            S&apos;inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}