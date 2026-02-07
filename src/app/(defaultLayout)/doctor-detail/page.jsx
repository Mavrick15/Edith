"use client";
import Section from "@/app/ui/Section";
import AppointmentSectionStyle2 from "@/app/ui/Section/AppointmentSection/AppointmentSectionStyle2";
import BannerSectionStyle9 from "@/app/ui/Section/BannerSection/BannerSectionStyle9";
import DoctorDetailsSection from "@/app/ui/Section/DoctorDetailsSection";

import appointmentImg from "../../../../public/images/doctors/appointment_img.png";
import bannerImg from "../../../../public/images/doctors/banner_img_3.png";
import doctorImg from "../../../../public/images/doctors/doctor_details.png";

export default function DoctorDetail() {
  return (
    <>
      <Section bottomMd={190} bottomLg={150} bottomXl={110}>
        <DoctorDetailsSection
          bgUrl="/images/doctors/doctor_details_bg.svg"
          imgUrl={doctorImg}
          name="Dr. Mboloko Esimo Justin"
          department="Service de gynécologie-obstétrique"
          designation="Expert en Gynécologie, Fertilité et PMA"
          description="Professeur ordinaire de gynécologie-obstétrique, expert reconnu en fertilité et procréation médicalement assistée (PMA). Un engagement constant pour la santé reproductive à Kinshasa, RDC. Plus de 30 ans d'expérience au service de la santé reproductive."
          social={[
            { icon: "fa6-brands:facebook-f", href: "/about" },
            { icon: "fa6-brands:linkedin-in", href: "/about" },
            { icon: "fa6-brands:twitter", href: "/about" },
          ]}
          contactInfo={[
            { iconUrl: "/images/icons/call.svg", title: "+243 999 952 335" },
            {
              iconUrl: "/images/icons/envlope.svg",
              title: "Jmboloko@edith.org",
            },
          ]}
          contactInfoHeading="Coordonnées"
          schedules={[
            { day: "Lundi", time: "09.00-12.00" },
            { day: "Mercredi", time: "15.00-18.00" },
            { day: "Vendredi", time: "09.00-12.00" },
          ]}
          scheduleHeading="Horaires de consultation"
          degrees={[
            {
              title: "Doctorat en médecine générale",
              subTitle: "Spécialisation en gynécologie-obstétrique",
            },
            {
              title: "Professeur ordinaire",
              subTitle: "Enseignement et recherche en gynécologie-obstétrique",
            },
            {
              title: "Chef de service",
              subTitle:
                "Direction de département et encadrement d'équipes médicales",
            },
          ]}
          degreesHeading="Formation"
          experiences={[
            {
              title:
                "Plus de 30 ans d'expérience clinique et académique en santé reproductive.",
            },
            {
              title:
                "Expertise en procréation médicalement assistée (PMA) et endoscopie gynécologique.",
            },
            {
              title:
                "Parcours combinant excellence clinique et leadership académique, supervisant des équipes médicales et encadrant des étudiants en médecine.",
            },
            {
              title:
                "Référence régionale en fertilité et santé reproductive en Afrique.",
            },
          ]}
          experiencesHeading="Expériences"
          awards={[
            {
              title:
                "Membre de la SCOGO (Société Congolaise de Gynécologie et d'Obstétrique).",
            },
            {
              title:
                "Membre du GIERAF (Groupe Interafricain d'Étude, de Recherche et d'Application sur la Fertilité).",
            },
            {
              title:
                "Membre de la Société de Chirurgie Endoscopique d'Afrique Centrale et de l'Ouest.",
            },
          ]}
          awardHeading="Affiliations scientifiques"
        />
      </Section>
      <Section
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
        className="cs_doctor_detail_appointment"
      >
        <AppointmentSectionStyle2
          bgUrl="/images/home_2/appointment_bg.svg"
          imgUrl={appointmentImg}
          sectionTitle="Prendre rendez-vous"
          sectionTitleUp="RÉSERVER UN"
        />
      </Section>

      <Section className="cs_footer_margin_0 cs_doctor_detail_banner_wrap">
        <BannerSectionStyle9
          title="Réservez une consultation avec notre spécialiste"
          subTitle="Faites le premier pas — prenez rendez-vous dès aujourd'hui."
          imgUrl={bannerImg}
          imgClassName="cs_img_shift_right"
          sectionClassName="cs_doctor_detail_banner"
        />
      </Section>
    </>
  );
}
