"use client";

import Section from "@/app/ui/Section";
import AboutSectionStyle2 from "@/app/ui/Section/AboutSection/AboutSectionStyle2";
import AppointmentSection from "@/app/ui/Section/AppointmentSection";
import BannerSectionStyle7 from "@/app/ui/Section/BannerSection/BannerSectionStyle7";
import FeaturesSectionStyle3 from "@/app/ui/Section/FeaturesSection/FeaturesSectionStyle3";
import TeamSectionStyle3 from "@/app/ui/Section/TeamSection/TeamSectionStyle3";
import { getServiceBySlug } from "@/lib/servicesData";
import { notFound, useParams } from "next/navigation";

import bannerImg from "../../../../../public/images/departments/banner_img_3.png";
import appointmentImg from "../../../../../public/images/home_1/appointment.png";

const doctorData = [
  {
    imgUrl: "/images/departments/related_doctor_1.png",
    name: "Dr. Mboloko Esimo Justin",
    designation: "Gynécologue-obstétricien",
    description: "Expert en fertilité et PMA",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
    availableUrl: "/doctor-detail",
    callUrl: "/contact",
    chatUrl: "/contact",
    btnText: "Réserver",
    btnUrl: "/appointments",
  },
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
    availableUrl: "/contact",
    callUrl: "/contact",
    chatUrl: "/contact",
    btnText: "Réserver",
    btnUrl: "/appointments",
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
    availableUrl: "/contact",
    callUrl: "/contact",
    chatUrl: "/contact",
    btnText: "Réserver",
    btnUrl: "/appointments",
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
    availableUrl: "/contact",
    callUrl: "/contact",
    chatUrl: "/contact",
    btnText: "Réserver",
    btnUrl: "/appointments",
  },
];

export default function ServiceDetailsClient() {
  const params = useParams();
  const slug = params?.slug;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Section topMd={135} topLg={100} topXl={100}>
        <AboutSectionStyle2
          title={`Service de ${service.title.toLowerCase()}`}
          subTitle={service.subTitle}
          imgUrl={service.imgUrl || "/images/departments/department_img_1.png"}
        />
      </Section>

      <Section topMd={170} topLg={145} topXl={90}>
        <FeaturesSectionStyle3
          sectionTitle="Traitements"
          sectionTitleUp="TYPES DE"
          data={service.features}
        />
      </Section>

      <Section topMd={200} topLg={150} topXl={100}>
        <TeamSectionStyle3 sectionTitle="Médecins associés" data={doctorData} />
      </Section>

      <Section
        topMd={190}
        topLg={145}
        topXl={105}
        id="appointment"
      >
        <AppointmentSection
          sectionTitle="Rendez-vous"
          sectionTitleUp="PRENDRE UN"
          imgUrl={appointmentImg}
        />
      </Section>

      <Section className="cs_footer_margin_0 cs_service_banner_wrap">
        <BannerSectionStyle7
          imgUrl={bannerImg}
          bgUrl="/images/departments/banner_bg_3.svg"
          title="Faites le premier pas — prenez rendez-vous"
          subTitle="Nos spécialistes vous accompagnent pour votre projet parental. <br />Réservez votre créneau dès aujourd'hui."
        />
      </Section>
    </>
  );
}
