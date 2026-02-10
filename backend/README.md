# API Blog Edith

Serveur minimal pour la gestion des articles de blog et l’upload d’images.

## Démarrage

```bash
cd backend
pnpm install
pnpm start
```

En dev avec rechargement : `pnpm dev`

Variables d’environnement :

- `PORT` — port (défaut 3001)
- `BASE_URL` — URL publique du serveur (pour les URLs des images uploadées, ex. `https://mon-api.example.com`)
- `CORS_ORIGIN` — origine autorisée (optionnel, par défaut tout)

## Endpoints

- `GET /articles` — liste des articles (format `{ list, articles }`)
- `GET /articles/:slug` — un article
- `POST /articles` — créer (body : `title`, `thumbUrl?`, `sections`)
- `PUT /articles/:slug` — modifier
- `DELETE /articles/:slug` — supprimer
- `POST /upload` — upload image (multipart, champ `image`) → `{ url }`

Stockage : `data/blog/*.json` et `uploads/` dans ce dossier.
