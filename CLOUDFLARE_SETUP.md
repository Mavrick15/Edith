# Configuration Cloudflare Pages pour le blog admin

Les variables d'environnement sont gérées dans **wrangler.toml**. Seuls les **secrets** (ex. token API) se configurent dans le tableau de bord ou via `wrangler secret`.

## 1. Créer un namespace KV

```bash
pnpm wrangler kv:namespace create BLOG
```

Notez l'ID du namespace (ex. `abc123...`).

## 2. Renseigner wrangler.toml

Dans **wrangler.toml**, complétez :

- **`[vars]`** : votre Account ID (Cloudflare Dashboard → côté droit ou URL) et l’ID du namespace KV
- **`[[kv_namespaces]]`** : le même `id` du namespace

Exemple :

```toml
[vars]
CLOUDFLARE_ACCOUNT_ID = "votre_account_id"
CLOUDFLARE_KV_NAMESPACE_ID = "abc123..."

[[kv_namespaces]]
binding = "BLOG_KV"
id = "abc123..."
```

## 3. Définir le secret (token API)

Le token API ne doit **pas** être mis en clair dans wrangler.toml. Utilisez l’un des deux :

**Option A – Tableau de bord**  
Cloudflare Pages → votre projet → Settings → Environment variables → Add variable → **CLOUDFLARE_API_TOKEN** → cocher « Encrypt » (secret).

**Option B – Ligne de commande**

1. Créer un token : Cloudflare Dashboard → My Profile → API Tokens → Create Token → Custom → Permissions : **Workers KV Storage** (Read + Edit).
2. Puis :

```bash
pnpm wrangler secret put CLOUDFLARE_API_TOKEN
# Coller le token quand il est demandé
```

## Résumé

| Où ?            | Quoi ?                          |
|-----------------|----------------------------------|
| **wrangler.toml** | `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_KV_NAMESPACE_ID`, `[[kv_namespaces]]` |
| **Secret** (dashboard ou `wrangler secret`) | `CLOUDFLARE_API_TOKEN` |

## Limitations

- **Upload d'images** : non disponible sur Cloudflare Pages. Utilisez les images par défaut (post_1.jpeg, post_2.jpeg, post_3.jpeg) ou un service externe (Cloudinary, R2).
