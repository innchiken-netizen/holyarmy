# Architecture Système — holy.army

## 1. Principes Fondamentaux
holy.army est conçu comme un **monolithe modulaire** ultra-performant reposant sur Next.js 15 (App Router), React 19 et Supabase (PostgreSQL + RLS + Storage).
L'application adopte les standards des meilleurs SaaS Silicon Valley (Linear, Stripe, Vercel) avec une séparation stricte des responsabilités.

## 2. Découpage des Espaces Applicatifs
```
/app
  /(marketing)     -> Site public promotionnel, portfolio, offres & conversion de leads
  /(auth)          -> Connexion, inscription, réinitialisation de mot de passe, invitation
  /onboarding      -> Assistant de bienvenue en 5 étapes pour nouveaux ministères
  /dashboard       -> Portail client pour les équipes de communication d'églises
  /admin           -> Centre opérationnel pour le staff interne holy.army
  /[slug]          -> Bio-pages publiques personnalisées pour pasteurs
  /api             -> Webhooks idempotents (Stripe), health checks et crons planifiés
```

## 3. Couche d'Accès aux Données (`server-only`)
Toutes les mutations et requêtes sensibles s'exécutent sur le serveur via des modules isolés :
- `lib/server/auth.ts` : Résolution sécurisée de la session et des privilèges.
- `lib/server/organizations.ts` : Gestion du locataire (tenant), adhésion et vérification des rôles.
- `lib/server/requests.ts` : Machine à états des demandes créatives.
- `lib/server/deliverables.ts` : Versions des créations et historique immuable des validations.
- `lib/server/digital-profile.ts` : Moteur de templates et protection contre les collisions de slugs.
- `lib/server/billing.ts` : Moteur d'entitlements et conciliation des paiements manuels et Stripe.
- `lib/server/audit.ts` : Traçabilité immuable des évènements système sensibles.