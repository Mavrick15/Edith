import { getServiceBySlug, servicesData } from "@/lib/servicesData";
import ServiceDetailsClient from "./ServiceDetailsClient";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edith-medical.vercel.app";

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const service = slug ? getServiceBySlug(slug) : null;
  if (!service) return {};
  
  const description = service.subTitle?.slice(0, 160) || service.title;
  const imageUrl = service.imgUrl ? `${siteUrl}${service.imgUrl}` : `${siteUrl}/images/departments/department_img_1.png`;
  const pageUrl = `${siteUrl}/services/${slug}`;

  return {
    title: service.title,
    description,
    openGraph: {
      title: service.title,
      description,
      url: pageUrl,
      siteName: "Edith - Centre médical Kinshasa",
      images: [
        {
          url: imageUrl,
          width: 791,
          height: 644,
          alt: service.title,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ServiceDetailsPage() {
  return <ServiceDetailsClient />;
}
