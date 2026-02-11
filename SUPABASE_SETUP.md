# Blog — configuration Supabase

Les articles du blog et les images peuvent être stockés sur **Supabase**. Si Supabase est configuré, il est utilisé en priorité (à la place de D1 ou des fichiers).

## 1. Variables d'environnement

Dans `.env.local` ou sur votre plateforme de déploiement :f

| Variable | Description | Secret |
|----------|-------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet (ex. `https://xxx.supabase.co`) | Non |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé « service role » (Dashboard → Settings → API) | **Oui** |
| `RESEND_API_KEY` | Clé API Resend pour envoyer les emails (notifications admin) | **Oui** |
| `ADMIN_EMAIL` | Adresse qui reçoit les notifications (défaut : `contact@cmedith.com`) | Non |
| `FROM_EMAIL` | Expéditeur des emails (défaut : `Centre Médical Edith <onboarding@resend.dev>`) | Non |

La clé **service role** contourne les RLS ; ne l’exposez pas côté client. Les routes API Next.js s’en servent côté serveur.

**Notifications email :** lorsqu’un visiteur envoie un message (Contact) ou une demande de rendez-vous, un email récapitulatif est envoyé à `ADMIN_EMAIL` via [Resend](https://resend.com). Créez un compte Resend, récupérez une clé API (Dashboard → API Keys) et définissez `RESEND_API_KEY`. Sans cette variable, les formulaires restent fonctionnels (données en base) mais aucun email n’est envoyé. Pour utiliser votre domaine comme expéditeur (ex. `noreply@cmedith.com`), ajoutez le domaine dans Resend puis définissez `FROM_EMAIL`.

## 2. Table `blog_articles`

Dans l’éditeur SQL Supabase (Dashboard → SQL Editor), exécutez :

```sql
CREATE TABLE IF NOT EXISTS blog_articles (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  thumb_url TEXT,
  date TEXT NOT NULL,
  author TEXT,
  sections JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optionnel : index pour tri par date
CREATE INDEX IF NOT EXISTS blog_articles_date_idx ON blog_articles (date DESC);
```

## 3. Tables Contact et Rendez-vous

Pour enregistrer les messages du formulaire de contact et les demandes de rendez-vous, exécutez dans le SQL Editor :

```sql
-- Messages de contact (page Contact)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'Contact',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);

-- Demandes de rendez-vous (page Rendez-vous)
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  medical_file_number TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  reason_for_visit TEXT,
  department TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS appointments_created_at_idx ON appointments (created_at DESC);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments (status);
```

Une fois ces tables créées et les variables Supabase configurées (voir §1), les soumissions des formulaires **Contact** et **Rendez-vous** sont enregistrées dans Supabase. Vous pouvez les consulter dans le Dashboard (Table Editor).

## 4. Bucket Storage pour les images

Pour activer l’upload d’images depuis l’admin :

1. Dashboard Supabase → **Storage** → **New bucket**.
2. Nom du bucket : **`blog`** (exactement).
3. Cochez **Public bucket** pour que les URLs renvoyées soient accessibles sans auth.
4. (Optionnel) Politique : autoriser les uploads pour les utilisateurs authentifiés ou via la **service role** (utilisée par l’API).

Si le bucket n’existe pas, l’upload renverra une erreur ; vous pouvez continuer à utiliser les images par défaut (`post_1.jpeg`, etc.).

## 5. Ordre de priorité du stockage

- **Supabase** : si `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont définis.
- **D1** (Cloudflare) : si Supabase n’est pas configuré et que les variables D1 le sont.
- **Fichiers** : en local, si ni Supabase ni D1 ne sont configurés (`content/blog/*.json`).

## 6. En local

Avec les deux variables Supabase dans `.env.local`, le blog et l’admin utilisent Supabase. Sans elles, le stockage reste par fichiers (Node).

## 7. Importer les 3 articles statiques dans la base

Pour copier les 3 articles (infertilité, PMA/FIV, consultation gynécologique) dans la table `blog_articles` :

1. Démarrez l'app (`pnpm run dev`).
2. Envoyez une requête **POST** vers l'API de seed :
   ```bash
   curl -X POST http://localhost:3000/api/blog/seed
   ```
   En production, remplacez par l'URL de votre site (ex. `https://www.cmedith.com/api/blog/seed`).

3. Réponse attendue : `{ "success": true, "message": "3 article(s) inséré(s) dans la base.", "inserted": ["infertilite-couple", "pma-fiv-kinshasa", "consultation-gynecologique"] }`.

Après le seed, ces articles sont lus depuis Supabase. Les données statiques dans `src/lib/blogData.js` servent de fallback si la base est vide.
