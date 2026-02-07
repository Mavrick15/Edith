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
        title="Votre partenaire santé et bien-être"
        subTitle="Nous nous engageons à vous offrir les meilleurs services médicaux et de santé pour vous aider à vivre plus sainement et plus heureux."
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
        <FeaturesSection sectionTitle="Nos valeurs" data={featureListData} />
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
                "Edith est une équipe de professionnels de santé expérimentés",
              featureListSubTitle:
                "Dédiée à fournir des services de santé de haute qualité. Nous croyons en une approche holistique de la santé qui vise à traiter la personne dans son ensemble, et non seulement la maladie ou les symptômes.",
            },
          ]}
        />
      </Section>
      {/* End About Section */}

      {/* Start Departments Section */}
      <Section topMd={185} topLg={150} topXl={110}>
        <DepartmentSection
          sectionTitle="Nos services"
          bgUrl="/images/home_1/department_bg.svg"
          data={departmentData}
        />
      </Section>
      {/* End Departments Section */}

      {/* Start Award Section */}
      <Section topMd={185} topLg={140} topXl={100}>
        <AwardSection sectionTitle="Nos récompenses" data={awardData} />
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
          sectionTitle="Témoignages"
          sectionTitleDown="de nos patients"
        />
      </Section>
      {/* End Testimonial */}

      {/* Start Banner Section */}
      <Section>
        <Banner
          bgUrl="/images/home_1/cta_bg.svg"
          imgUrl={bannerImg}
          title="Ne négligez pas votre santé !"
          subTitle="Prenez rendez-vous dès aujourd'hui avec l'un de nos professionnels de santé expérimentés !"
        />
      </Section>
      {/* End Banner Section */}

      {/* Start Blog Section */}
      <Section topMd={190} topLg={145} topXl={105}>
        <BlogSection
          sectionTitle="Dernières actualités"
          sectionTitleUp="ARTICLES DU BLOG"
          data={blogList}
        />
      </Section>
      {/* End Blog Section */}

      {/* Start Appointment Section */}
      <Section topMd={190} topLg={145} topXl={105} id="appointment">
        <AppointmentSection
          sectionTitle="Rendez-vous"
          sectionTitleUp="PRENDRE UN"
          imgUrl={appointmentImg}
        />
      </Section>
      {/* End Appointment Section */}

      {/* Start FAQ Section */}
      <Section topMd={190} topLg={145} topXl={105} id="faq">
        <FaqSection
          data={faqData}
          sectionTitle="fréquemment posées"
          sectionTitleUp="Questions"
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
