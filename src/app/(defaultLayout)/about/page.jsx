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
    title: "Spécialistes <br />gynéco-obstétriques",
    subTitle:
      "Gynécologues, obstétriciens et sages-femmes dévoués <br />au suivi de grossesse, à l'accouchement et à la <br />santé féminine à chaque étape de la vie.",
    iconUrl: "/images/icons/professional.svg",
  },
  {
    title: "Maternité & <br />fertilité",
    subTitle:
      "De la conception à la naissance : consultations, <br />FIV, insémination, bilan de fertilité et suivi <br />personnalisé de votre projet parental.",
    iconUrl: "/images/icons/comprehensive.svg",
  },
  {
    title: "Approche <br />centrée patiente",
    subTitle:
      "Chaque femme est unique. Nous prenons le temps <br />d'écouter vos besoins, vos questions et votre <br />parcours en matière de santé reproductive.",
    iconUrl: "/images/icons/patient.svg",
  },
  {
    title: "Équipements <br />de pointe",
    subTitle:
      "Échographie, laboratoire, bloc opératoire : des <br />installations modernes pour des soins gynécologiques <br />et obstétricaux de qualité à Kinshasa.",
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
    name: "Dr. Kelakela Hillaire",
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
    name: "Dr. Ngakinono Joel",
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
        subTitle="Votre projet parental mérite les meilleurs soins — prenez rendez-vous avec nos spécialistes"
      />
      <Section topMd={200} topLg={150} topXl={110}>
        <DepartmentSectionStyle2
          sectionTitle="Découvrez ce que nous proposons"
          sectionTitleUp="NOS SERVICES"
          data={departmentData}
        />
      </Section>
      <Section topMd={175} topLg={125} topXl={85} bottomMd={100} bottomLg={110}>
        <FeaturesSectionStyle2
          sectionTitle="Pourquoi des centaines de femmes nous font confiance"
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
          sectionSubTitle="Reconnus pour notre expertise en gynécologie-obstétrique <br />et notre engagement pour la santé maternelle et la fertilité."
          data={awardData}
        />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle4
          bgUrl="/images/about/banner_bg_2.png"
          title="Faites le premier pas — prenez rendez-vous"
          subTitle="Votre projet parental mérite les meilleurs soins. Nos spécialistes vous attendent à Kinshasa."
          center
        />
      </Section>
    </>
  );
}
