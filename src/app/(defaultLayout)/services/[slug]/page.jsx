import { getServiceBySlug, servicesData } from "@/lib/servicesData";
import ServiceDetailsClient from "./ServiceDetailsClient";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const service = slug ? getServiceBySlug(slug) : null;
  if (!service) return {};
  return {
    title: service.title,
    description: service.subTitle?.slice(0, 160) || service.title,
  };
}

export default function ServiceDetailsPage() {
  return <ServiceDetailsClient />;
}
