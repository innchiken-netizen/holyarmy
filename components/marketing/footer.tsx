import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#060608] text-zinc-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-[#FF5500] font-black text-black text-xs">
                HA
              </div>
              <span className="font-bold tracking-tight text-white text-base">
                holy<span className="text-[#FF5500]">.</span>army
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm text-xs leading-relaxed">
              Plus qu&apos;une agence marketing, nous sommes la force de frappe digitale de votre ministère. 
              Concentrez-vous sur les âmes. Nous gérons votre visibilité.
            </p>
            <div className="text-xs text-zinc-600">
              © {new Date().getFullYear()} holy.army. Tous droits réservés.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Produit</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services" className="hover:text-white">Services Créatifs</Link></li>
              <li><Link href="/digital-profiles" className="hover:text-white">Bio-Pages Pasteurs</Link></li>
              <li><Link href="/portfolio" className="hover:text-white">Réalisations</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Formules & Tarifs</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">Comment ça marche</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Ministère</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white">Notre Vision</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact & Audits</Link></li>
              <li><Link href="/login" className="hover:text-white">Portail Client</Link></li>
              <li><Link href="/admin" className="hover:text-white">Accès Staff</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Légal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
              <li><Link href="/terms" className="hover:text-white">Conditions Générales</Link></li>
              <li><Link href="/cookies" className="hover:text-white">Gestion des Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}