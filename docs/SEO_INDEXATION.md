# Indexation et SEO — Centre Médical Edith

Ce document décrit la configuration mise en place pour l’indexation par Google et les autres moteurs de recherche.

---

## 1. Sitemap (`/sitemap.xml`)

- **Génération dynamique** : le sitemap inclut les pages statiques, les **articles de blog** (y compris ceux issus de Supabase) et les **pages services**.
- **Priorités** : accueil (1), pages principales (0,9), blog/services (0,8), galerie/tarifs (0,7–0,8).
- **Fréquence** : `weekly` pour l’accueil et le blog, `monthly` pour le reste.
- **URL** : `https://www.cmedith.com/sitemap.xml` (ou la valeur de `NEXT_PUBLIC_SITE_URL`).

À soumettre dans [Google Search Console](https://search.google.com/search-console) → Sitemaps → Ajouter un sitemap → `sitemap.xml`.

---

## 2. Fichier robots.txt (`/robots.txt`)

- **Autorisation** : `Allow: /` pour tout le site public.
- **Interdiction** : `/api/`, `/admin/`, `/_next/` (pas d’indexation des API, de l’admin ni des assets Next.js).
- **Sitemap** : référence vers `https://www.cmedith.com/sitemap.xml`.
- **Host** : URL canonique du site.

Les crawlers respectent ces règles pour ne pas indexer l’administration ni les routes techniques.

---

## 3. Données structurées (JSON-LD)

Les schémas Schema.org sont injectés dans le `<head>` pour aider Google à comprendre le site :

| Schéma | Rôle |
|--------|------|
| **WebSite** | Identité du site, langue (fr-FR), éditeur, action de recherche (optionnel). |
| **MedicalOrganization** | Nom, description, logo, adresse, téléphone, type de contact. |
| **MedicalBusiness** | Spécialités (gynécologie, obstétrique, fertilité), fourchette de prix. |
| **Article** | Sur chaque article de blog : titre, description, image, auteur, date. |
| **BreadcrumbList** | Fil d’Ariane sur les pages qui l’utilisent. |
| **FAQPage** | Sur les pages avec FAQ. |

Vérification possible : [Google Rich Results Test](https://search.google.com/test/rich-results) ou l’onglet “Données structurées” dans Search Console.

---

## 4. Métadonnées et balises

- **metadataBase** : URL de base du site pour les URLs canoniques et Open Graph.
- **Title** : titre par défaut + template par page (`%s | Edith - Gynécologie & fertilité Kinshasa`).
- **Description** : meta description par défaut et par page (about, blog, contact, etc.).
- **Open Graph** : titre, description, type `website`, locale `fr_FR`, `siteName`.
- **Twitter** : `summary_large_image`, titre et description.
- **Canonical** : défini au niveau global ; à surcharger par page si besoin (ex. pagination, variantes).
- **Admin** : `robots: { index: false, follow: false }` sur toutes les pages sous `/admin` pour éviter l’indexation de l’espace d’administration.

---

## 5. Vérification des propriétés (Search Console, Bing)

1. **Google Search Console**  
   - Aller sur [search.google.com/search-console](https://search.google.com/search-console).  
   - Ajouter la propriété avec l’URL du site (ex. `https://www.cmedith.com`).  
   - Vérification recommandée : **balise HTML** (meta) dans `layout.js` :
     - Décommenter et renseigner dans `metadata.verification.google` le code fourni par Search Console.

2. **Bing Webmaster Tools**  
   - [bing.com/webmasters](https://www.bing.com/webmasters).  
   - Ajouter le site et, si proposé, utiliser la meta de vérification (à ajouter dans `metadata.verification.bing`).

Dans le projet, les champs sont prévus dans `src/app/layout.js` :

```js
verification: {
  google: "votre-code-google",   // optionnel
  yandex: "votre-code-yandex",  // optionnel
  bing: "votre-code-bing",      // optionnel
},
```

---

## 6. Bonnes pratiques déjà en place

- **URLs canoniques** : `metadataBase` + `alternates.canonical` où nécessaire.
- **Images** : composant Next.js `Image`, attribut `alt` sur les images importantes.
- **Hiérarchie** : titres H1/H2 cohérents, un H1 par page.
- **Performance** : préchargement du logo, optimisation des images.
- **Mobile** : viewport et thème définis ; manifest PWA avec nom, description, couleurs.
- **Accessibilité** : rôles ARIA et labels sur les boutons/liens importants.

---

## 7. Checklist post-mise en ligne

- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` en production (ex. `https://www.cmedith.com`).
- [ ] Soumettre le sitemap dans Google Search Console.
- [ ] Ajouter la propriété dans Bing Webmaster Tools et soumettre le sitemap.
- [ ] Vérifier les données structurées (Rich Results Test).
- [ ] Décommenter et remplir les codes de vérification dans `layout.js` si vous utilisez Search Console / Bing.
- [ ] Contrôler que `/admin` et `/api/*` n’apparaissent pas dans les résultats de recherche (robots.txt + noindex admin).

---

*Dernière mise à jour : configuration sitemap dynamique, robots, WebSite schema et documentation SEO.*
