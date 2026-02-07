import Section from "@/app/ui/Section";
import BannerSectionStyle5 from "@/app/ui/Section/BannerSection/BannerSectionStyle5";
import BannerSectionStyle6 from "@/app/ui/Section/BannerSection/BannerSectionStyle6";
import DepartmentSectionStyle3 from "@/app/ui/Section/DepartmentSection/DepartmentSectionStyle3";
import { getServicesForList } from "@/lib/servicesData";

import bannerImg from "../../../../public/images/departments/banner_img.png";
import bannerImg2 from "../../../../public/images/departments/banner_img_2.png";

const serviceData = getServicesForList();

export default function Services() {
  return (
    <>
      <BannerSectionStyle5
        bgUrl="/images/departments/banner_bg.svg"
        imgUrl={bannerImg}
        title="Découvrez les <br />services Edith"
        subTitle="Chez Edith, nous proposons une large gamme de services médicaux et de santé conçus pour répondre à vos besoins individuels et vous aider à atteindre une santé optimale."
      />
      <Section bottomMd={140} bottomLg={100} bottomXl={60}>
        <DepartmentSectionStyle3 data={serviceData} />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle6
          imgUrl={bannerImg2}
          title="Ne négligez pas votre santé !"
          subTitle="Prenez rendez-vous dès aujourd'hui avec l'un de nos <br />professionnels de santé expérimentés !"
        />
      </Section>
    </>
  );
}
