import { getBlogData } from "@/lib/blogDataServerEdge";
import { servicesData } from "@/lib/servicesData";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Pages statiques avec priorité et fréquence pour l'indexation */
const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "about", changeFrequency: "monthly", priority: 0.9 },
  { path: "services", changeFrequency: "monthly", priority: 0.9 },
  { path: "blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "appointments", changeFrequency: "monthly", priority: 0.9 },
  { path: "contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "tarifs", changeFrequency: "monthly", priority: 0.8 },
  { path: "gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "doctor-detail", changeFrequency: "monthly", priority: 0.8 },
];

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${BASE_URL}/${path}` : BASE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  let blogEntries = [];
  try {
    const { list } = await getBlogData();
    blogEntries = (list || []).map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    blogEntries = [];
  }

  const serviceEntries = (servicesData || []).map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...serviceEntries];
}
