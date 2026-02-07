import Section from "@/app/ui/Section";
import BannerSectionStyle3 from "@/app/ui/Section/BannerSection/BannerSectionStyle3";
import BannerSectionStyle9 from "@/app/ui/Section/BannerSection/BannerSectionStyle9";
import BlogSectionStyle2 from "@/app/ui/Section/BlogSection/BlogSectionStyle2";
import { blogList } from "@/lib/blogData";
import bannerImg from "../../../../public/images/about/banner_img.png";
import bannerImgCta from "../../../../public/images/doctors/banner_img_3.png";

export const metadata = {
  title: "Blog",
  description:
    "Articles sur la fertilité, la gynécologie et la santé reproductive. Conseils et actualités du centre médical Edith à Kinshasa.",
};

export default function Blog() {
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl={bannerImg}
        title="Blog Edith"
        subTitle="Fertilité, gynécologie et santé reproductive"
      />
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <BlogSectionStyle2
          data={blogList}
          sectionTitleUp="ARTICLES"
          sectionTitle="Dernières actualités"
        />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Ne négligez pas votre santé !"
          subTitle="Prenez rendez-vous dès aujourd'hui avec l'un de nos professionnels de santé expérimentés !"
          imgUrl={bannerImgCta}
          btnText="Prendre rendez-vous"
          btnUrl="/appointments"
          sectionClassName="text-center"
        />
      </Section>
    </>
  );
}
