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
        title="Des soins adaptés <br />à chaque étape"
        subTitle="De la conception à l'accouchement — découvrez nos services et prenez rendez-vous avec nos spécialistes."
      />
      <Section bottomMd={140} bottomLg={100} bottomXl={60}>
        <DepartmentSectionStyle3 data={serviceData} />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle6
          imgUrl={bannerImg2}
          title="Votre projet parental mérite les meilleurs soins"
          subTitle="Faites le premier pas — prenez rendez-vous avec nos spécialistes <br />en gynécologie, obstétrique et fertilité."
        />
      </Section>
    </>
  );
}
