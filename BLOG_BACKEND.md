# Backend blog (optionnel)

Pour éviter de dépendre de Cloudflare D1, vous pouvez héberger un petit serveur d’API qui gère les articles et l’upload d’images.

## 1. Lancer le backend

```bash
cd backend
pnpm install
pnpm start
```

Le serveur écoute sur le port **3001** (ou `PORT`). En production, définissez `BASE_URL` (URL publique du serveur) pour que les URLs des images uploadées soient correctes.

## 2. Brancher le frontend

Dans le frontend (fichier `.env.local` ou variables d’environnement) :

```env
NEXT_PUBLIC_BLOG_API_URL=http://localhost:3001
```

En production, mettez l’URL réelle du backend (ex. `https://edith-blog-api.railway.app`).

Quand cette variable est définie :

- Les pages **/blog** et **/blog/[slug]** chargent les articles depuis ce backend.
- L’**admin** blog envoie création / édition / suppression et upload d’images vers ce backend.

Sans cette variable, le frontend continue d’utiliser les routes Next.js (`/api/blog` → D1 ou fichiers selon la config).

## 3. Déploiement du backend

Vous pouvez déployer le dossier `backend/` sur Railway, Render, Fly.io, un VPS, etc. Pensez à :

- Définir `PORT` si imposé par la plateforme.
- Définir `BASE_URL` avec l’URL publique (ex. `https://votre-backend.example.com`).
- Optionnel : `CORS_ORIGIN` avec l’URL du site frontend (ex. `https://edith-medical.pages.dev`).

Les articles sont stockés dans `backend/data/blog/*.json` et les images dans `backend/uploads/`. En production, prévoir une persistance (volume, S3, etc.) selon l’hébergeur.
