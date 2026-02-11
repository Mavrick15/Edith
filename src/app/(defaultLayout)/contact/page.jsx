import ContactForm from "@/app/ui/ContactForm";
import Section from "@/app/ui/Section";
import BannerSectionStyle5 from "@/app/ui/Section/BannerSection/BannerSectionStyle5";
import ContactInfoSection from "@/app/ui/Section/ContactInfoSection";

import bannerImg from "../../../../public/images/contact/banner_img.png";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cmedith.com";

export const metadata = {
  title: "Contact",
  description:
    "Contactez Edith — gynécologie-obstétrique et fertilité à Kinshasa. Questions grossesse, FIV ou rendez-vous : notre équipe vous répond.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact | Edith - Centre médical Kinshasa",
    description:
      "Contactez Edith — gynécologie-obstétrique et fertilité à Kinshasa. Questions grossesse, FIV ou rendez-vous : notre équipe vous répond.",
    url: `${siteUrl}/contact`,
    siteName: "Edith - Centre médical Kinshasa",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Edith - Centre médical Kinshasa" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Edith - Centre médical Kinshasa",
    description:
      "Contactez Edith — gynécologie-obstétrique et fertilité à Kinshasa. Questions grossesse, FIV ou rendez-vous : notre équipe vous répond.",
    images: ["/opengraph-image"],
  },
};

export default function Contact() {
  return (
    <>
      <BannerSectionStyle5
        bgUrl="/images/contact/banner_bg.svg"
        imgUrl={bannerImg}
        title="Une question ? Nous vous répondons"
        subTitle="Prenez contact dès aujourd'hui — notre équipe est à votre écoute pour votre projet parental."
      />
      <div className="container cs_mt_minus_110">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <ContactForm />
          </div>
        </div>
      </div>
      <Section
        topMd={200}
        topLg={150}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <ContactInfoSection sectionTitle="Venez nous rencontrer" />
      </Section>
    </>
  );
}
