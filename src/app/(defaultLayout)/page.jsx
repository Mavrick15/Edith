"use client";
import { blogList } from "@/lib/blogData";
import {
  awardData,
  brandData,
  departmentData,
  faqData,
  featureListData,
} from "@/lib/homeData";
import aboutImage from "../../../public/images/home_1/about.png";
import appointmentImg from "../../../public/images/home_1/appointment.png";
import bannerImg from "../../../public/images/home_1/cta_img.png";
import heroImage from "../../../public/images/home_1/hero_img.png";
import Hero from "../ui/Hero";
import Section from "../ui/Section";
import AboutSection from "../ui/Section/AboutSection";
import AppointmentSection from "../ui/Section/AppointmentSection";
import AwardSection from "../ui/Section/AwardSection";
import Banner from "../ui/Section/BannerSection";
import BlogSection from "../ui/Section/BlogSection";
import BrandsSection from "../ui/Section/BrandsSection";
import DepartmentSection from "../ui/Section/DepartmentSection";
import FaqSection from "../ui/Section/FaqSection";
import FeaturesSection from "../ui/Section/FeaturesSection";
import TestimonialSection from "../ui/Section/TestimonialSection";

export default function Home() {
  return (
    <>
      <Hero
        title="Votre projet parental mérite les meilleurs soins"
        subTitle="Prenez rendez-vous dès aujourd'hui — nos spécialistes en gynécologie, obstétrique et fertilité vous accompagnent à Kinshasa."
        bgUrl="/images/home_1/hero_bg.jpeg"
        imgUrl={heroImage}
        videoBtnText="Découvrez notre fonctionnement"
        videoUrl="https://www.youtube.com/embed/VcaAVWtP48A"
        infoList={[
          {
            title: "Hotline",
            subTitle: "+243 999 952 335",
            iconUrl: "/images/contact/icon_1.svg",
          },
          {
            title: "Ambulance",
            subTitle: "+243 999 952 335",
            iconUrl: "/images/icons/ambulance.svg",
          },
          {
            title: "Adresse",
            subTitle: "Kinshasa, RDCongo",
            iconUrl: "/images/icons/pin.svg",
          },
        ]}
        btnText="Prendre rendez-vous"
        btnUrl="/appointments"
      />

      {/* Start Feature Section */}
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={185}
        bottomLg={140}
        bottomXl={100}
      >
        <FeaturesSection sectionTitle="Ce qui nous inspire — et vous accompagne" data={featureListData} />
      </Section>
      {/* End Feature Section */}

      {/* Start About Section */}
      <Section>
        <AboutSection
          imgUrl={aboutImage}
          spiningImgUrl="/images/home_1/about_mini.svg"
          title="À propos de nous"
          subTitle="EDITH"
          featureList={[
            {
              featureListTitle:
                "Votre projet parental mérite les meilleurs soins",
              featureListSubTitle:
                "Edith accompagne les femmes à chaque étape : de la contraception au suivi de grossesse, de l'accouchement au suivi des nouveau-nés. Notre expertise en procréation médicalement assistée (PMA) aide les couples à réaliser leur projet parental.",
            },
          ]}
        />
      </Section>
      {/* End About Section */}

      {/* Start Departments Section */}
      <Section topMd={185} topLg={150} topXl={110}>
        <DepartmentSection
          sectionTitle="Découvrez ce que nous proposons pour vous"
          bgUrl="/images/home_1/department_bg.svg"
          data={departmentData}
        />
      </Section>
      {/* End Departments Section */}

      {/* Start Award Section */}
      <Section topMd={185} topLg={140} topXl={100}>
        <AwardSection sectionTitle="Reconnus pour notre excellence" data={awardData} />
      </Section>
      {/* End Award Section */}

      {/* Start Testimonial */}
      <Section
        id="temoignages"
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <TestimonialSection
          sectionTitle="Ils nous font confiance"
          sectionTitleDown="et vous recommandent"
        />
      </Section>
      {/* End Testimonial */}

      {/* Start Banner Section */}
      <Section>
        <Banner
          bgUrl="/images/home_1/cta_bg.svg"
          imgUrl={bannerImg}
          title="Faites le premier pas — prenez rendez-vous"
          subTitle="Votre projet parental mérite les meilleurs soins. Nos spécialistes vous attendent à Kinshasa."
        />
      </Section>
      {/* End Banner Section */}

      {/* Start Blog Section */}
      <Section topMd={190} topLg={145} topXl={105}>
        <BlogSection
          sectionTitle="Restez informé sur votre santé"
          sectionTitleUp="ACTUALITÉS"
          data={blogList}
        />
      </Section>
      {/* End Blog Section */}

      {/* Start Appointment Section */}
      <Section topMd={190} topLg={145} topXl={105} id="appointment">
        <AppointmentSection
          sectionTitle="Réservez votre créneau dès maintenant"
          sectionTitleUp="PRENDRE UN"
          imgUrl={appointmentImg}
        />
      </Section>
      {/* End Appointment Section */}

      {/* Start FAQ Section */}
      <Section topMd={190} topLg={145} topXl={105} id="faq">
        <FaqSection
          data={faqData}
          sectionTitle="Réponses à vos questions"
          sectionTitleUp="BESOIN D'INFO ?"
        />
      </Section>
      {/* End FAQ Section */}

      {/* Start Brand Section */}
      <Section
        topMd={200}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <BrandsSection data={brandData} />
      </Section>
      {/* End Brand Section */}
    </>
  );
}
