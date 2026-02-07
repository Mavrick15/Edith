import Section from "@/app/ui/Section";
import BannerSectionStyle3 from "@/app/ui/Section/BannerSection/BannerSectionStyle3";
import BannerSectionStyle9 from "@/app/ui/Section/BannerSection/BannerSectionStyle9";
import GallerySectionStyle2 from "@/app/ui/Section/GallerySection/GallerySectionStyle2";
import { getGalleryPageData } from "@/lib/galleryData";
import bannerImg from "../../../../public/images/about/banner_img.png";
import bannerImgDoctor from "../../../../public/images/doctors/banner_img_3.png";

export const metadata = {
  title: "Galerie",
  description:
    "Découvrez les installations et les activités du centre médical Edith à Kinshasa. Nos espaces de soins et moments forts.",
};

export default function Gallery() {
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl={bannerImg}
        title="Découvrez nos installations"
        subTitle="Un cadre moderne et accueillant pour votre suivi"
      />
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <GallerySectionStyle2
          data={getGalleryPageData()}
          sectionTitleUp="DÉCOUVREZ"
          sectionTitle="Nos installations et dernières activités"
        />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Prenez rendez-vous et venez nous rencontrer"
          subTitle="Votre projet parental mérite les meilleurs soins — nos spécialistes vous attendent."
          imgUrl={bannerImgDoctor}
          btnText="Prendre rendez-vous"
          btnUrl="/appointments"
          sectionClassName="text-center"
        />
      </Section>
    </>
  );
}
