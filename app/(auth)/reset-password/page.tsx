"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <Card className="border-zinc-800 bg-[#121214] shadow-2xl">
      <CardContent className="pt-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Réinitialisation</h2>
          <p className="text-xs text-zinc-400 mt-1">Recevez un lien sécurisé par email</p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-xs text-zinc-300">
              Si un compte est associé à <strong>{email}</strong>, un lien de réinitialisation vous a été envoyé.
            </p>
            <div className="pt-4">
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-zinc-700 text-xs text-white">
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold h-10 mt-2"
            >
              Envoyer le lien
            </Button>

            <div className="text-center pt-2">
              <Link href="/login" className="inline-flex items-center text-xs text-zinc-400 hover:text-white">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}