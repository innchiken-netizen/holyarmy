# HOLY.ARMY — Plateforme de Croissance & Strike Force Digitale pour Ministères

> **"Le plus grand message de l'histoire mérite la meilleure technologie. Concentrez-vous sur les âmes. Nous gérons votre visibilité."**

`holy.army` est une plateforme SaaS multi-tenant complète et prête pour la production, conçue pour les églises, pasteurs et ministères chrétiens. Elle combine une suite d'outils collaboratifs pour la production créative, des bio-pages personnalisées de haute autorité pour les pasteurs, et un centre d'opérations d'agence.

---

## Architecture & Caractéristiques Clés

- **Stack Technique Moderne :** Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS, Lucide Icons, Zod, Supabase PostgreSQL avec RLS strict.
- **Multi-Tenant Natif :** Isolation stricte au niveau de la base de données (Row Level Security) et au niveau applicatif (`lib/server/organizations.ts`).
- **3 Domaines Applicatifs Distincts :**
  1. **Site Public Marketing (`/`) :** Accueil à fort impact, services, méthode, portfolio, tarifs, témoignages, capture de leads avec protection anti-spam.
  2. **Portail Client Ministère (`/dashboard`) :** Demandes créatives, révisions en ligne, validation en 1 clic de livrables HD, médiathèque d'église, gestion d'équipe et factures.
  3. **Centre Opérationnel Holy Army (`/admin`) :** Pipeline de production des directeurs artistiques, validation des paiements manuels, gestion des comptes églises, journal d'audit immuable.
  4. **Bio-Pages Pasteurs Publiques (`/[slug]`) :** 3 templates exclusifs (`minimal-editorial`, `bold-ministry`, `executive-pastor`) avec intégration dons, sermons YouTube, réseaux sociaux et analytics respectueux de la vie privée.
- **Abstraction Paiements :** Prise en charge combinée de **Stripe** (carte bancaire automatisée) et des **Paiements Manuels** (virement bancaire/mobile money avec validation en admin).
- **Entitlement & Quotas :** Moteur dynamique d'autorisations (`canUse`, `getLimit`, `getUsage`).

---

## Démarrage Rapide

### 1. Installation des Dépendances
```bash
npm install
```

### 2. Configuration d'Environnement
Copiez le fichier `.env.example` en `.env.local` :
```bash
cp .env.example .env.local
```

### 3. Lancement des Tests
```bash
npm test
```
*Exécute la suite de tests unitaires et d'isolation multi-tenant (11 tests réussis).*

### 4. Build de Production
```bash
npm run build
```
*Compilation vérifiée avec typage strict et 41 routes pré-rendues pour Vercel.*

### 5. Lancement en Développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Documentation Complète

Retrouvez les guides détaillés dans le dossier [`docs/`](./docs) :
- [Architecture Système (`docs/ARCHITECTURE.md`)](./docs/ARCHITECTURE.md)
- [Modèle de Base de Données & Migrations (`docs/DATABASE.md`)](./docs/DATABASE.md)
- [Matrice des Rôles & Autorisations (`docs/AUTHORIZATION.md`)](./docs/AUTHORIZATION.md)
- [Sécurité & Isolation RLS (`docs/SECURITY.md`)](./docs/SECURITY.md)
- [Moteur de Facturation & Abonnements (`docs/BILLING.md`)](./docs/BILLING.md)
- [Guide de Déploiement Vercel (`docs/DEPLOYMENT.md`)](./docs/DEPLOYMENT.md)
- [Stratégie de Tests (`docs/TESTING.md`)](./docs/TESTING.md)
- [Guide Administrateur Holy Army (`docs/ADMIN_GUIDE.md`)](./docs/ADMIN_GUIDE.md)
- [Guide d'Utilisation Client (`docs/CLIENT_GUIDE.md`)](./docs/CLIENT_GUIDE.md)