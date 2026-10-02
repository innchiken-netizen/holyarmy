# Guide de Déploiement Vercel — holy.army

## 1. Déploiement en 1 Clic sur Vercel
Le projet est optimisé pour un déploiement fluide sur Vercel sans aucune dépendance locale au système de fichiers.

### Variables d'Environnement Obligatoires sur Vercel
Configurer les variables suivantes dans le panneau Vercel > Settings > Environment Variables :
- `NEXT_PUBLIC_SITE_URL` : URL de votre domaine de production (ex: `https://holy.army`).
- `NEXT_PUBLIC_SUPABASE_URL` : URL de votre instance de base de données Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé publique anonyme Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` : Clé secrète de service Supabase (jamais transmise au navigateur).
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET` : Identifiants de facturation automatisée.
- `RESEND_API_KEY` : Clé pour l'envoi d'emails transactionnels.
- `CRON_SECRET` : Clé de sécurisation des tâches planifiées.

## 2. Déploiement via CLI Vercel
```bash
# Vérification locale préalable
npm test
npm run build

# Déploiement
vercel --prod
```