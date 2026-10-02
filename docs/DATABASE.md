# Architecture de Base de Données — holy.army

## 1. Vue d'Ensemble
Le schéma de base de données PostgreSQL comprend 20 tables interconnectées avec contraintes strictes d'intégrité référentielle, index d'optimisation et Row Level Security activé sur 100% des tables exposées.

## 2. Tables Principales
- `profiles` : Profils utilisateurs liés aux comptes d'authentification Supabase avec rôle de plateforme (`SUPER_ADMIN`, `ADMIN`, `STAFF`, `SUPPORT`).
- `organizations` : Les entités locataires (églises, ministères, marques pastorales).
- `organization_members` : Table de jointure associant un utilisateur à une église avec un rôle d'organisation (`OWNER`, `ADMIN`, `EDITOR`, `MEMBER`, `VIEWER`).
- `plans` : Formules d'abonnement (Essentiel, Impact, Strike Force) avec quotas et fonctionnalités en JSONB.
- `subscriptions` : État de l'abonnement du locataire (`TRIALING`, `ACTIVE`, `PAYMENT_PENDING`, `MANUAL`, etc.).
- `creative_requests` : Demandes graphiques avec catégories, formats demandés, priorité et statut de production.
- `deliverables` & `approvals` : Fichiers créés par l'équipe d'art avec versioning immuable et logs de validation par le client.
- `digital_profiles` : Données de présentation de la bio-page pasteur (nom, bio, template, coordonnées, dons, prédications).
- `slug_history` : Historique des identifiants d'URL pour gestion transparente des redirections 301.
- `audit_logs` : Journal d'audit immuable consignant chaque mutation sensible avec horodatage et contexte acteur.

## 3. Fichiers de Migration
- `supabase/migrations/00001_initial_schema.sql` : Création des tables, clés étrangères et index.
- `supabase/migrations/00002_row_level_security.sql` : Politiques d'isolation tenant RLS.
- `supabase/seed/seed.sql` : Données initiales sécurisées pour le développement local et les tests.