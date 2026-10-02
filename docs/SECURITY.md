# Sécurité & Modèle d'Isolation — holy.army

## 1. Isolation Multi-Tenant (RLS)
La sécurité n'est pas uniquement gérée par le code frontend :
- Chaque table sensible comporte une colonne `organization_id`.
- Des politiques RLS strictes sous PostgreSQL garantissent qu'un client de l'organisation A ne peut en aucun cas lire ou modifier les enregistrements de l'organisation B.
- Les tests automatisés (`tests/tenant-isolation.test.js`) simulent des attaques IDOR et prouvent l'imperméabilité des cloisons.

## 2. En-têtes HTTP de Sécurité
Configurés via `next.config.mjs` et `middleware.ts` :
- `Strict-Transport-Security` : HSTS préchargé pour forcer HTTPS.
- `X-Frame-Options: SAMEORIGIN` : Protection contre le détournement de clic (Clickjacking).
- `X-Content-Type-Options: nosniff` : Prévention du reniflage de type MIME.
- `Referrer-Policy: origin-when-cross-origin`.

## 3. Protection des Identifiants Slugs Réservés
Un registre centralisé (`lib/validation/reserved-slugs.ts`) interdit formellement à tout ministère de s'attribuer un identifiant réservé par le système (`admin`, `dashboard`, `login`, `api`, `pricing`, `support`, etc.).