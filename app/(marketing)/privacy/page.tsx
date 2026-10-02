export default function PrivacyPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 text-zinc-300">
      <h1 className="text-3xl font-extrabold text-white mb-6">Politique de Confidentialité</h1>
      <div className="space-y-6 text-sm leading-relaxed border-t border-zinc-800 pt-6">
        <p>
          Chez <strong>holy.army</strong>, la préservation de la confidentialité des données de nos églises partenaires, de leurs pasteurs et de leurs fidèles est une priorité absolue.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">1. Collecte et finalité des données</h2>
        <p>
          Nous collectons uniquement les informations strictement nécessaires à la fourniture de nos services : création et gestion de votre compte, production et archivage de vos créations graphiques, facturation, et diffusion sécurisée de vos bio-pages publiques.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">2. Respect de la vie privée & Analytics</h2>
        <p>
          Les données analytiques de vos bio-pages publiques sont collectées de manière agrégée et respectueuse des réglementations (RGPD). Nous ne stockons pas d&apos;adresses IP brutes à long terme et ne commercialisons aucune donnée ministérielle à des tiers publicitaires.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">3. Sécurité et hébergement</h2>
        <p>
          Nos serveurs et bases de données bénéficient d&apos;un chiffrement de pointe (au repos et en transit). L&apos;isolation multi-tenant stricte garantit qu&apos;aucune organisation ne peut accéder aux fichiers d&apos;une autre assemblée.
        </p>
      </div>
    </div>
  );
}