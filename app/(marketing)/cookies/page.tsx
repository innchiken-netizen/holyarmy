export default function CookiesPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 text-zinc-300">
      <h1 className="text-3xl font-extrabold text-white mb-6">Gestion des Cookies</h1>
      <div className="space-y-6 text-sm leading-relaxed border-t border-zinc-800 pt-6">
        <p>
          La plateforme <strong>holy.army</strong> utilise des cookies techniques strictement nécessaires au maintien sécurisé de votre session de connexion, au routage de votre organisation active et à la prévention des attaques de falsification de requêtes (CSRF).
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">Cookies indispensables</h2>
        <p>
          Ces traceurs ne peuvent être désactivés car ils garantissent le bon fonctionnement du portail client et de l&apos;authentification administrateur.
        </p>
      </div>
    </div>
  );
}