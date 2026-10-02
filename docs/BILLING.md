# Facturation, Quotas & Paiements — holy.army

## 1. Moteur d'Entitlements (Droits & Limites)
Pour éviter de disséminer des conditions de type `if (plan === "strike_force")` dans les composants, holy.army utilise un service d'entitlements dynamique :
- `canUse("priority_queue")`
- `canUse("dedicated_art_director")`
- `getLimit("visual_requests")`
- `getLimit("video_requests")`
- `getLimit("storage_bytes")`
- `getUsage("visual_requests")`

## 2. Formules Disponibles
1. **Essentiel (990 € / mois) :**
   - 10 visuels cultes & réseaux par mois
   - 1 motion flyer ou reel par mois
   - 3 révisions par demande
   - Bio-page pasteur standard
   - 10 Go de stockage cloud
   - Délai moyen : 48h
2. **Impact (1 990 € / mois) :**
   - 25 visuels cultes par mois
   - 4 motion flyers ou clips prédication par mois
   - Révisions illimitées
   - Bio-page pasteur enrichie avec statistiques
   - 50 Go de stockage cloud
   - File prioritaire (livraison 24h)
3. **Strike Force (3 990 € / mois) :**
   - Production visuelle illimitée
   - 12 vidéos & reels prédication premium
   - Directeur artistique dédié
   - Campagnes publicitaires et refonte d'identité de marque
   - 250 Go de stockage cloud
   - Délai express 12h-24h & ligne directe

## 3. Prise en Charge des Paiements Manuels
De nombreux ministères en Afrique et en Europe francophone fonctionnent par virement bancaire SEPA ou mobile money :
1. Le client déclare son virement dans l'espace facturation avec sa référence bancaire.
2. L'abonnement bascule en `PAYMENT_PENDING`.
3. Le gestionnaire holy.army vérifie la réception des fonds sur `/admin/payments` et clique sur "Valider".
4. L'abonnement est immédiatement actif pour 30 jours et une facture acquittée est émise dans le compte client.