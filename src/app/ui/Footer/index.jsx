"use client";
import Image from "next/image";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import MenuWidget from "../Widget/MenuWidget";
import Newsletter from "../Widget/Newsletter";
import SocialWidget from "../Widget/SocialWidget";
import TextWidget from "../Widget/TextWidget";
const menuDataOne = [
  { title: "À propos", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Rendez-vous", href: "/appointments" },
  { title: "Galerie", href: "/gallery" },
  { title: "Témoignages", href: "/#temoignages" },
];
const menuDataTwo = [
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
  { title: "Tarifs", href: "/tarifs" },
  { title: "FAQ", href: "/#faq" },
];

export default function Footer() {
  return (
    <footer className="cs_footer cs_style_1 cs_heading_color">
      <div
        className="cs_footer_logo_wrap"
        style={{ backgroundImage: "url(/images/footer_bg_1.svg)" }}
      >
        <div
          className="cs_footer_brand"
          style={{ backgroundImage: "url(/images/footer_logo_bg.svg)" }}
        >
          <div className="cs_footer_brand_text cs_footer_brand_arc">
            <svg viewBox="0 -70 300 140" className="cs_arc_svg">
              <defs>
                <path
                  id="arcPath180"
                  d="M 25,65 A 125,125 0 0 1 275,65"
                  fill="none"
                />
              </defs>
              <text
                fill="#fff"
                fontSize="32"
                fontFamily="inherit"
                fontWeight="700"
              >
                <textPath
                  href="#arcPath180"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Centre Médical Edith
                </textPath>
              </text>
            </svg>
          </div>
          <div className="cs_footer_brand_icon_wrap">
            <Image
              src="/images/logo_icon.png"
              alt="Logo Icon"
              className="cs_footer_brand_icon"
              height={270}
              width={250}
            />
          </div>
        </div>
      </div>
      <div className="cs_footer_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <TextWidget text="Centre médical spécialisé en gynécologie-obstétrique, fertilité et PMA à Kinshasa. Votre santé, notre priorité." />
                <ContactInfoWidget />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataOne} title="Navigation" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataTwo} title="Informations" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <Newsletter
                  title="Restez informé"
                  subTitle="Recevez les dernières actualités santé de nos experts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom cs_accent_bg">
        <div className="container">
          <div className="cs_footer_bottom_in">
            <SocialWidget />
            <div className="cs_copyright">
              © {new Date().getFullYear()} Edith - Centre médical Kinshasa.
              Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
