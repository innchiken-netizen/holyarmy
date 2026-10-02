"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [churchName, setChurchName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Redirect to onboarding workflow
      router.push("/onboarding");
    }, 700);
  };

  return (
    <Card className="border-zinc-800 bg-[#121214] shadow-2xl">
      <CardContent className="pt-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Rejoindre holy.army</h2>
          <p className="text-xs text-zinc-400 mt-1">Créez votre compte ministère en 1 minute</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nom complet</label>
            <Input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Pasteur Paul Mukendi"
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nom de l&apos;église ou ministère</label>
            <Input
              required
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
              placeholder="Centre Réveil & Vie"
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Adresse email professionnelle</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@reveilvie.org"
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Mot de passe (8+ caractères)</label>
            <Input
              type="password"
              required
              minLength={8}
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
            Créer mon compte
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-[#FF5500] font-medium hover:underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}