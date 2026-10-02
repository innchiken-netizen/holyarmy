# Guide de l'Administrateur Holy Army (`/admin`)

## 1. Vue Opérationnelle (`/admin`)
Le tableau de bord permet de visualiser en temps réel :
- Le revenu mensuel récurrent (MRR) issu des abonnements actifs.
- Le nombre d'églises partenaires en activité.
- Les projets en cours de production graphique.
- La file d'attente des virements manuels à confirmer.

## 2. Traitement d'un Paiement Manuel (`/admin/payments`)
Lorsqu'un pasteur effectue un virement :
1. Rendez-vous sur `/admin/payments`.
2. Vérifiez la référence bancaire saisie et le montant attendu.
3. Cliquez sur **"Valider et activer l'abonnement"**.
4. L'abonnement du ministère est immédiatement activé pour 30 jours et une facture acquittée est générée.

## 3. Gestion de la Production Créative (`/admin/requests`)
- Assignation d'un graphiste ou directeur artistique.
- Changement de statut vers `IN_PRODUCTION` puis `CLIENT_REVIEW` après dépôt du livrable.
- Ajout de notes internes invisibles pour le client.