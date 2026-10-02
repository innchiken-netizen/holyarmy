# Matrice des Rôles & Autorisations — holy.army

## 1. Distinction des Niveaux de Privilèges
La sécurité repose sur deux dimensions de contrôle d'accès :
1. **Rôles de Plateforme (`PlatformRole`) :**
   - `SUPER_ADMIN` : Contrôle absolu sur l'ensemble du SaaS, gestion des forfaits, suspension d'églises.
   - `ADMIN` : Gestion des clients, facturation, supervision opérationnelle.
   - `STAFF` : Directeurs artistiques et graphistes holy.army, traitement des demandes et dépôt de livrables.
   - `SUPPORT` : Chargés de relation client et diagnostic d'assistance.
2. **Rôles Locataires / Organisations (`OrganizationRole`) :**
   - `OWNER` : Pasteur principal ou représentant légal (accès total, suppression, facturation).
   - `ADMIN` : Responsable du département communication (gestion d'équipe, demandes, approbations).
   - `EDITOR` : Bénévole ou chargé de projet (création et modification de demandes).
   - `MEMBER` : Membre de l'équipe (lecture et création de demandes de base).
   - `VIEWER` : Observateur (lecture seule des livrables sans droit de validation).

## 2. Règle d'Or
Ne jamais confondre **Authentifié** et **Autorisé**.
Toutes les Server Actions et requêtes API vérifient le triplet `(UserId, OrganizationId, Permission)` avant toute exécution de code métier.