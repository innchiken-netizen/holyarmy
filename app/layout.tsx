import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://holy.army"),
  title: {
    default: "holy.army — La Force de Frappe Digitale de Votre Ministère",
    template: "%s | holy.army",
  },
  description:
    "Plateforme de croissance digitale et agence créative dédiée aux églises, pasteurs et ministères chrétiens. De la stratégie de marque aux visuels d'impact.",
  keywords: [
    "croissance église",
    "marketing église chrétienne",
    "graphisme culte pasteur",
    "vidéo chrétienne",
    "holy army",
    "bio link pasteur",
    "communication évangélique",
  ],
  authors: [{ name: "holy.army" }],
  creator: "holy.army",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://holy.army",
    siteName: "holy.army",
    title: "holy.army — La Force de Frappe Digitale de Votre Ministère",
    description:
      "Modernisez l'impact visuel et la portée de votre église avec notre équipe dédiée de directeurs artistiques chrétiens.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-[#FF5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}