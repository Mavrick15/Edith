import ContactInfoWidget from "../Widget/ContactInfoWidget";
import MenuWidget from "../Widget/MenuWidget";
import NewsletterStyle2 from "../Widget/NewsletterStyle2";
import SocialWidget from "../Widget/SocialWidget";
import TextWidget from "../Widget/TextWidget";
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

export default function FooterStyle2() {
  return (
    <footer className="cs_footer cs_style_2 cs_accent_bg cs_white_color">
      <NewsletterStyle2
        title="Restez informé"
        subTitle="Recevez les dernières actualités santé <br /> de nos experts"
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
