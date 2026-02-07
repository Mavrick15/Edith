import ContactInfoWidget from "../Widget/ContactInfoWidget";
import MenuWidget from "../Widget/MenuWidget";
import NewsletterStyle3 from "../Widget/NewsletterStyle3";
import SocialWidget from "../Widget/SocialWidget";
import TextWidget from "../Widget/TextWidget";

import newsletterImg from "../../../../public/images/home_3/newsletter_img.png";

const menuDataOne = [
  { title: "À propos", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Rendez-vous", href: "/appointments" },
];

const menuDataTwo = [
  { title: "Témoignages", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/" },
  { title: "FAQ", href: "/" },
];
const menuDataThree = [
  { title: "Politique de confidentialité", href: "/" },
  { title: "Conditions générales", href: "/blog" },
];

export default function FooterStyle3() {
  return (
    <footer className="cs_footer cs_style_2 cs_accent_bg cs_white_color">
      <NewsletterStyle3
        title="Recevez les dernières actualités santé de nos experts"
        subTitle="RESTEZ INFORMÉ"
        imgUrl={newsletterImg}
      />
      <div className="container">
        <div className="cs_footer_in">
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <TextWidget
                logoUrl="/images/footer_logo_white.svg"
                text="Edith Centre médical et de santé"
              />
              <ContactInfoWidget />
            </div>
          </div>
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <MenuWidget data={menuDataOne} />
            </div>
          </div>
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <MenuWidget data={menuDataTwo} />
            </div>
          </div>
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <MenuWidget data={menuDataThree} />
              <SocialWidget />
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom">
        <div className="container">
          <div className="cs_copyright">
            © 2024 Edith. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
