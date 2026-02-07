# Edith - Centre médical Kinshasa

Site vitrine du centre médical Edith, spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC.

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Styles** : Sass, Bootstrap 5
- **Animations** : Framer Motion
- **Icônes** : Iconify React

## Démarrage

```bash
# Installation
pnpm install

# Développement
pnpm run dev

# Build
pnpm run build

# Production
pnpm start
```

## API

Les formulaires (contact, rendez-vous) envoient les données vers :

- `POST /api/contact` — formulaire de contact
- `POST /api/appointment` — formulaire de rendez-vous

À brancher sur votre backend (email, base de données, agenda, etc.) dans les fichiers `src/app/api/*/route.js`.

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner :

- `NEXT_PUBLIC_SITE_URL` : URL du site (pour sitemap et robots)

## Structure

- `src/app/` : pages et layouts Next.js
- `src/lib/` : données (blog, services, tarifs, etc.)
- `src/app/ui/` : composants réutilisables
- `public/images/` : assets statiques
