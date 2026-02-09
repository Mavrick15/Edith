# Configuration Cloudflare Pages pour le blog admin

Pour que l'admin blog fonctionne sur Cloudflare Pages, configurez Cloudflare KV.

## 1. Créer un namespace KV

```bash
pnpm wrangler kv:namespace create BLOG
```

Notez l'ID du namespace (ex. `abc123...`).

## 2. Ajouter les variables d'environnement

Dans le tableau de bord Cloudflare Pages → votre projet → Settings → Environment variables :

| Variable | Valeur | Secret |
|----------|--------|--------|
| `CLOUDFLARE_ACCOUNT_ID` | Votre Account ID (voir l'URL du dashboard) | Non |
| `CLOUDFLARE_KV_NAMESPACE_ID` | L'ID du namespace créé | Non |
| `CLOUDFLARE_API_TOKEN` | Token avec permissions "Workers KV Storage" | Oui |

## 3. Créer un API Token

1. Cloudflare Dashboard → My Profile → API Tokens
2. Create Token → Custom token
3. Permissions : **Workers KV Storage** (Read + Edit)
4. Copiez le token (visible une seule fois)

## Limitations

- **Upload d'images** : non disponible sur Cloudflare Pages. Utilisez les images par défaut (post_1.jpeg, post_2.jpeg, post_3.jpeg) ou un service externe (Cloudinary, R2).
