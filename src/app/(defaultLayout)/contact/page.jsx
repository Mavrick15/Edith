import ContactForm from "@/app/ui/ContactForm";
import Section from "@/app/ui/Section";
import BannerSectionStyle5 from "@/app/ui/Section/BannerSection/BannerSectionStyle5";
import ContactInfoSection from "@/app/ui/Section/ContactInfoSection";

import bannerImg from "../../../../public/images/contact/banner_img.png";

export const metadata = {
  title: "Contact",
  description:
    "Contactez Edith — gynécologie-obstétrique et fertilité à Kinshasa. Questions grossesse, FIV ou rendez-vous : notre équipe vous répond.",
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
