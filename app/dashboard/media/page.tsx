"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download, Search, Image as ImageIcon, Folder } from "lucide-react";

export default function MediaLibraryPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = [
    { id: "ALL", label: "Tous les fichiers" },
    { id: "LOGOS", label: "Logos & Identité" },
    { id: "PASTOR_PHOTOS", label: "Photos du Pasteur" },
    { id: "CHURCH_PHOTOS", label: "Photos de l'Auditorium" },
    { id: "VIDEOS", label: "Vidéos Brutes" },
    { id: "BRAND_GUIDELINES", label: "Chartes Graphiques" },
  ];

  const files = [
    { id: "1", name: "Logo_Centre_Reveil_Vector.svg", category: "LOGOS", size: "240 Ko", date: "Il y a 1 mois" },
    { id: "2", name: "Portrait_Pasteur_Paul_HD_2027.jpg", category: "PASTOR_PHOTOS", size: "12.4 Mo", date: "Il y a 2 semaines" },
    { id: "3", name: "Charte_Typographie_Officielle.pdf", category: "BRAND_GUIDELINES", size: "3.1 Mo", date: "Il y a 1 mois" },
    { id: "4", name: "Photo_Auditorium_Culte_Dimanche.png", category: "CHURCH_PHOTOS", size: "18.2 Mo", date: "Il y a 3 jours" },
  ];

  const filteredFiles = activeCategory === "ALL" ? files : files.filter((f) => f.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Médiathèque du Ministère</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Stockage cloud sécurisé de vos logos, photos officielles et ressources réutilisables.
          </p>
        </div>

        <Button size="sm" className="bg-[#FF5500] hover:bg-[#E04B00] text-black font-bold text-xs h-9">
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Téléverser des fichiers
        </Button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === c.id
                ? "bg-[#FF5500] text-black font-semibold"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="border-zinc-800 bg-[#121214] p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="space-y-3">
              <div className="h-28 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <ImageIcon className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white truncate" title={file.name}>
                  {file.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-zinc-800/60 flex justify-end">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-zinc-400 hover:text-white p-0">
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}