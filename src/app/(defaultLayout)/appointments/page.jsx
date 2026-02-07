"use client";
import Section from "@/app/ui/Section";
import AppointmentWithContactInfoSection from "@/app/ui/Section/AppointmentWithContactInfoSection";
import BannerSectionStyle3 from "@/app/ui/Section/BannerSection/BannerSectionStyle3";

import bannerImg from "../../../../public/images/appointments/banner_img.png";

export default function Appointments() {
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl={bannerImg}
        title="Réservez votre créneau dès maintenant"
        subTitle="Faites le premier pas — nos spécialistes vous attendent pour accompagner votre projet parental."
        className="cs_appointments_banner"
      />
      <Section
        topMd={200}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <AppointmentWithContactInfoSection />
      </Section>
    </>
  );
}
