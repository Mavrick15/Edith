import NewsletterStyle5 from "../Widget/NewsletterStyle5";
import RecentPostWidget from "../Widget/RecentPostWidget";
import SideMenuWidget from "../Widget/SideMenuWidget";
const categoryData = [
  {
    title: "Conseils santé et bien-être",
    url: "/",
  },
  {
    title: "Tendances et analyses",
    url: "/",
  },
  {
    title: "Gestion du temps",
    url: "/",
  },
];
const recentPostData = [
  {
    title:
      "Infertilité du couple : diagnostic et parcours de prise en charge personnalisée",
    author: "Dr. Mboloko Esimo Justin",
    date: "12 mars 2025",
    href: "/blog/infertilite-couple",
  },
  {
    title:
      "PMA et FIV à Kinshasa : comprendre la procréation médicalement assistée",
    author: "Dr. Mboloko Esimo Justin",
    date: "11 mars 2025",
    href: "/blog/pma-fiv-kinshasa",
  },
  {
    title:
      "Consultation gynécologique : suivi préconceptionnel et santé reproductive",
    author: "Dr. Mboloko Esimo Justin",
    date: "9 mars 2025",
    href: "/blog/consultation-gynecologique",
  },
];

export default function Sidebar() {
  return (
    <div className="cs_sidebar">
      <div className="cs_sidebar_item widget_categories">
        <SideMenuWidget title="Catégories populaires" data={categoryData} />
      </div>
      <div className="cs_sidebar_item">
        <RecentPostWidget title="Articles populaires" data={recentPostData} />
      </div>
      <div className="cs_sidebar_item widget_categories">
        <NewsletterStyle5 title="S'inscrire à la newsletter" />
      </div>
    </div>
  );
}
