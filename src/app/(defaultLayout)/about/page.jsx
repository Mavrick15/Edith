"use client";
import Section from "@/app/ui/Section";
import AwardSectionStyle2 from "@/app/ui/Section/AwardSection/AwardSectionStyle2";
import BannerSectionStyle3 from "@/app/ui/Section/BannerSection/BannerSectionStyle3";
import BannerSectionStyle4 from "@/app/ui/Section/BannerSection/BannerSectionStyle4";
import DepartmentSectionStyle2 from "@/app/ui/Section/DepartmentSection/DepartmentSectionStyle2";
import FeaturesSectionStyle2 from "@/app/ui/Section/FeaturesSection/FeaturesSectionStyle2";
import FunFactSection from "@/app/ui/Section/FunFactSection";
import GallerySection from "@/app/ui/Section/GallerySection";
import TeamSection from "@/app/ui/Section/TeamSection";
import { getAboutGalleryData } from "@/lib/galleryData";
import { getTopServices } from "@/lib/servicesData";

import bannerImg from "../../../../public/images/about/banner_img.png";
import whyChooseUsImg from "../../../../public/images/about/why_choose_us.png";

const departmentData = getTopServices(5);

const featureListData = [
  {
    title: "Professionnels de santé expérimentés",
    subTitle:
      "Notre équipe comprend des médecins, infirmiers <br />et autres professionnels de santé dévoués <br />à offrir les meilleurs soins possibles à nos patients.",
    iconUrl: "/images/icons/professional.svg",
  },
  {
    title: "Services <br />complets",
    subTitle:
      "Nous proposons une large gamme de services de santé, <br />des soins préventifs aux traitements spécialisés <br />pour les affections complexes.",
    iconUrl: "/images/icons/comprehensive.svg",
  },
  {
    title: "Approche <br />centrée patient",
    subTitle:
      "Nous traitons chaque patient comme un individu unique <br />et prenons le temps de comprendre vos besoins <br />et préoccupations en matière de santé.",
    iconUrl: "/images/icons/patient.svg",
  },
  {
    title: "Installations <br />modernes",
    subTitle:
      "Notre centre de santé est équipé des dernières <br />technologies et équipements pour offrir à nos <br />patients les soins les plus avancés.",
    iconUrl: "/images/icons/facilities.svg",
  },
];

const funFactData = [
  { number: "30+", title: "Années d'expérience" },
  { number: "90%", title: "Taux de satisfaction des patients" },
  { number: "450+", title: "Patients pris en charge par an" },
  { number: "10+", title: "Professionnels de santé" },
  { number: "2", title: "Points d'accueil dans la région" },
];

const teamData = [
  {
    imgUrl: "/images/about/doctor_2.png",
    name: "Dr. Mosanda Rachidi",
    designation: "Assistant",
    description:
      "Assure le suivi des grossesses, les accouchements et les consultations gynécologiques dans le cadre de son internat en gynéco-obstétrique.",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
  },
  {
    imgUrl: "/images/about/doctor_1.png",
    name: "Dr. KELAKELA John",
    designation: "Assistant senior",
    description:
      "En charge des grossesses pathologiques, césariennes et urgences obstétricales. Interne senior en gynécologie-obstétrique.",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
  },
  {
    imgUrl: "/images/about/doctor_3.png",
    name: "Dr. Baki Benyamin",
    designation: "Assistant senior",
    description:
      "Interne senior en gynécologie-obstétrique, spécialisé dans le suivi des grossesses et la prise en charge des patientes en consultation.",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
  },
];

const awardData = [
  {
    iconUrl: "/images/icons/award.svg",
    title: "Label qualité Ministère de la Santé RDC",
  },
  {
    iconUrl: "/images/icons/award.svg",
    title: "Prix d'excellence Université de Kinshasa",
  },
  {
    iconUrl: "/images/icons/award.svg",
    title: "Distinction Ordre des Médecins du Congo",
  },
  {
    iconUrl: "/images/icons/award.svg",
    title: "Prix santé maternelle Kinshasa",
  },
];

export default function About() {
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl={bannerImg}
        title="Bienvenue au <br />Centre médical Edith"
        subTitle="Votre partenaire santé et bien-être"
      />
      <Section topMd={200} topLg={150} topXl={110}>
        <DepartmentSectionStyle2
          sectionTitle="Nos meilleurs services"
          sectionTitleUp="SERVICES"
          data={departmentData}
        />
      </Section>
      <Section topMd={175} topLg={125} topXl={85} bottomMd={100} bottomLg={110}>
        <FeaturesSectionStyle2
          sectionTitle="Pourquoi nous choisir"
          imgUrl={whyChooseUsImg}
          data={featureListData}
        />
      </Section>
      <Section>
        <FunFactSection
          bgUrl="/images/about/fun_fact_bg.jpeg"
          data={funFactData}
        />
      </Section>
      <Section topMd={190} topLg={145} topXl={105}>
        <TeamSection
          sectionTitle="Nos médecins experts"
          sectionTitleUp="RENCONTREZ"
          data={teamData}
        />
      </Section>
      <Section topMd={170} topLg={120} topXl={80}>
        <GallerySection
          sectionTitle="Nos installations et <br />dernières activités"
          sectionTitleUp="DÉCOUVREZ"
          data={getAboutGalleryData()}
        />
      </Section>
      <Section
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <AwardSectionStyle2
          sectionTitle="Prix et distinctions <br />remportés"
          sectionTitleUp="RÉCOMPENSES"
          sectionSubTitle="Nous avons été reconnus pour notre engagement <br />en faveur de l'excellence des soins de santé."
          data={awardData}
        />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle4
          bgUrl="/images/about/banner_bg_2.png"
          title="Ne laissez pas votre santé <br />passer au second plan !"
          subTitle="Prenez rendez-vous dès aujourd'hui avec l'un de nos professionnels de santé expérimentés !"
          center
        />
      </Section>
    </>
  );
}
