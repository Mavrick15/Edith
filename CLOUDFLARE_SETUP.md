# Blog admin – stockage sur Cloudflare (D1)

Les articles créés via l’admin sont stockés dans **Cloudflare D1** en production. En local sans variables D1, le stockage reste par **fichiers** (`content/blog/*.json`).

## 1. Créer la base D1

1. Dans le [dashboard Cloudflare](https://dash.cloudflare.com) : **Workers & Pages** → **D1** → **Create database**.
2. Nommez la base (ex. `edith-blog`) et créez-la.
3. Notez l’**Account ID** (sidebar) et l’**Database ID** (page de la base).

## 2. Schéma SQL

Exécutez ce SQL dans D1 (onglet **Console** de la base) ou en CLI :

```bash
npx wrangler d1 execute edith-blog --remote --command "
CREATE TABLE IF NOT EXISTS blog_articles (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  thumb_url TEXT,
  date TEXT NOT NULL,
  author TEXT,
  sections TEXT
);
"
```

(Remplacez `edith-blog` par le **nom** de votre base D1.)

## 3. Variables d’environnement

Sur **Cloudflare Pages** (Settings → Environment variables), définissez pour **Production** (et Preview si besoin) :

| Variable | Description | Secret |
|----------|-------------|--------|
| `CLOUDFLARE_ACCOUNT_ID` | ID du compte Cloudflare | Non |
| `CLOUDFLARE_D1_DATABASE_ID` | ID de la base D1 | Non |
| `CLOUDFLARE_API_TOKEN` | Token API avec droits D1 (Edit) | **Oui** |

Pour créer un token : **My Profile** → **API Tokens** → **Create Token** → modèle **Edit Cloudflare Workers** (ou custom avec permission **D1 Edit**).

## 4. Upload d’images

Sur Cloudflare (runtime Edge), l’upload vers le disque n’est pas disponible. L’API `/api/blog/upload` renvoie **501** en production. Utilisez les images par défaut (`post_1.jpeg`, `post_2.jpeg`, `post_3.jpeg`) ou prévoyez plus tard un stockage **R2**.

## 5. En local

- **Sans** variables D1 : lecture/écriture dans `content/blog/*.json` (Node).
- **Avec** les mêmes variables D1 : utilisation de D1 (pratique pour tester avant déploiement).

## 6. Dépannage — « rien ne s'enregistre »

- Vérifiez que les **trois** variables sont bien définies pour l’environnement **Production** (Pages → projet → Settings → Environment variables).
- Vérifiez que la table **blog_articles** existe (voir § 2) et que le token API a la permission **D1 Edit**.
- Lorsque l’enregistrement échoue, l’admin affiche maintenant un message d’erreur explicite (ex. « Impossible d'enregistrer (vérifiez la config D1…) »).
