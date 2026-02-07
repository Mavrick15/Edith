"use client";
import Section from "@/app/ui/Section";
import BannerSectionStyle10 from "@/app/ui/Section/BannerSection/BannerSectionStyle10";
import BannerSectionStyle3 from "@/app/ui/Section/BannerSection/BannerSectionStyle3";
import FaqSectionStyle4 from "@/app/ui/Section/FaqSection/FaqSectionStyle4";
import PricingSection from "@/app/ui/Section/PricingSection";

import { faqData } from "@/lib/homeData";
import { pricingData } from "@/lib/pricingData";
import faqImg from "../../../../public/images/about/why_choose_us.png";
import bannerImg from "../../../../public/images/pricing_plan/banner_img.png";
import bannerImgBtm from "../../../../public/images/pricing_plan/banner_img_2.png";

export default function Tarifs() {
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/pricing_plan/banner_bg.svg"
        imgUrl={bannerImg}
        title="Trouvez le forfait <br />adapté à vos besoins"
        subTitle="Découvrez nos offres d'abonnement et commencez votre parcours vers une meilleure santé"
        btnText="Commencer"
        btnUrl="/contact"
      />
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <PricingSection
          sectionTitle="Choisissez votre forfait <br />Edith"
          data={pricingData}
        />
      </Section>
      <Section
        topMd={185}
        topLg={145}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
        className="cs_gray_bg_1"
      >
        <FaqSectionStyle4
          sectionTitle="Questions <br />fréquentes"
          data={faqData}
          faqImgUrl={faqImg}
          spiningImgUrl="/images/home_1/about_mini.svg"
        />
      </Section>
      <Section
        topMd={200}
        topLg={150}
        topXl={110}
        className="cs_footer_margin_0"
      >
        <BannerSectionStyle10
          imgUrl={bannerImgBtm}
          title="Choisissez votre forfait et investissez dans votre santé dès aujourd'hui !"
        />
      </Section>
    </>
  );
}
