# Déploiement en production — API blog (sans Docker)

## Variables d'environnement

| Variable       | Obligatoire | Description |
|----------------|-------------|-------------|
| `PORT`        | Non         | Port (défaut 3001). Souvent imposé par l'hébergeur. |
| `BASE_URL`    | **Oui**     | URL publique de l'API (ex. `https://blog-api.example.com`). Utilisée pour les URLs des images. |
| `CORS_ORIGIN` | Non         | Origine autorisée pour CORS (ex. `https://edith-medical.pages.dev`). |

---

## Option 1 — VPS / serveur Linux (PM2)

1. Cloner ou copier le projet sur le serveur, puis :

```bash
cd backend
pnpm install --prod
```

2. Créer un fichier `.env` (ou exporter les variables) :

```bash
PORT=3001
BASE_URL=https://votre-api.example.com
CORS_ORIGIN=https://votre-site.com
```

3. Lancer avec PM2 (redémarrage auto, logs) :

```bash
pnpm add -g pm2
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

Commandes utiles : `pm2 status`, `pm2 logs edith-blog-api`, `pm2 restart edith-blog-api`.

4. Ouvrir le port 3001 dans le pare-feu (ex. firewalld) :

```bash
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

5. Mettre un reverse proxy (Nginx/Caddy) devant pour HTTPS si besoin.

---

## Option 2 — PaaS (Railway, Render, etc.)

- **Root directory** (ou dossier de build) : `backend`
- **Build** : `pnpm install` ou `npm install`
- **Start** : `node server.js` ou `pnpm start`
- **Variables** : `BASE_URL` (obligatoire), `CORS_ORIGIN` (recommandé). `PORT` est en général fourni par la plateforme.

Les fichiers `data/` et `uploads/` sont souvent éphémères : à chaque redéploiement les données peuvent être perdues. Vérifier si l’hébergeur propose des volumes persistants ou prévoir un stockage externe (S3, etc.) plus tard.

---

## Après déploiement

1. Tester : `curl https://votre-api.example.com/articles` → doit renvoyer `{"articles":{},"list":[]}` ou des données.
2. Dans le frontend : définir `NEXT_PUBLIC_BLOG_API_URL=https://votre-api.example.com` (sans slash final).
