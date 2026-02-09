import Section from "@/app/ui/Section";
import BannerSectionStyle3 from "@/app/ui/Section/BannerSection/BannerSectionStyle3";
import BannerSectionStyle9 from "@/app/ui/Section/BannerSection/BannerSectionStyle9";
import BlogSectionStyle2 from "@/app/ui/Section/BlogSection/BlogSectionStyle2";
import { getBlogData } from "@/lib/blogDataServer";
import bannerImg from "../../../../public/images/about/banner_img.png";
import bannerImgCta from "../../../../public/images/doctors/banner_img_3.png";

export const metadata = {
  title: "Blog",
  description:
    "Articles sur la fertilité, la gynécologie et la santé reproductive. Conseils et actualités du centre médical Edith à Kinshasa.",
};

// Données à jour à chaque visite (articles créés via l'admin)
export const dynamic = "force-dynamic";

export default async function Blog() {
  const { list } = await getBlogData();
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl={bannerImg}
        title="Actualités santé"
        subTitle="Conseils et infos sur la fertilité, la grossesse et la santé féminine"
      />
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
      >
        <BlogSectionStyle2
          data={list}
          sectionTitleUp="ARTICLES"
          sectionTitle="Dernières actualités"
        />
      </Section>
      <Section className="cs_footer_margin_0 cs_service_banner_wrap">
        <BannerSectionStyle9
          title="Votre projet parental <br />mérite les meilleurs soins"
          subTitle="Faites le premier pas — prenez rendez-vous avec nos spécialistes dès aujourd'hui."
          imgUrl={bannerImgCta}
          btnText="Prendre rendez-vous"
          btnUrl="/appointments"
          sectionClassName="text-center"
        />
      </Section>
    </>
  );
}
