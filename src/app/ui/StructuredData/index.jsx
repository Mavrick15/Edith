/**
 * Composant pour générer le structured data JSON-LD (Schema.org)
 * Améliore le SEO et permet aux moteurs de recherche de mieux comprendre le contenu
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

/** Schéma WebSite pour l'indexation (sitelinks, recherche) */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Centre Médical Edith",
    alternateName: "Edith - Gynécologie & fertilité Kinshasa",
    url: siteUrl,
    description:
      "Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC. Suivi de grossesse, FIV, consultations.",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "MedicalOrganization",
      name: "Edith - Centre médical Kinshasa",
      logo: `${siteUrl}/images/logo.png`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Edith - Centre médical Kinshasa",
    description:
      "Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa, RDC.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kinshasa",
      addressCountry: "CD",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+243-999-952-335",
      contactType: "customer service",
      areaServed: "CD",
      availableLanguage: ["fr"],
    },
    sameAs: [
      // Ajoutez vos réseaux sociaux ici si disponibles
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Edith - Centre médical Kinshasa",
    description:
      "Gynécologie-obstétrique, maternité & fertilité à Kinshasa. Suivi de grossesse, accouchement, FIV et PMA.",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kinshasa",
      addressCountry: "CD",
    },
    telephone: "+243-999-952-335",
    priceRange: "$$",
    medicalSpecialty: [
      "Gynecology",
      "Obstetrics",
      "Reproductive Medicine",
      "Fertility Medicine",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ article }) {
  if (!article) return null;

  // S'assurer que l'image a une URL complète
  const imageUrl = article.image?.startsWith('http') 
    ? article.image 
    : `${siteUrl}${article.image?.startsWith('/') ? '' : '/'}${article.image || '/images/blog/default.jpeg'}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description || article.title,
    image: imageUrl,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || article.datePublished || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: article.author || "Dr. Mboloko Esimo Justin",
    },
    publisher: {
      "@type": "Organization",
      name: "Edith - Centre médical Kinshasa",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
