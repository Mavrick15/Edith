import ContactInfoWidget from "../Widget/ContactInfoWidget";
import MenuWidget from "../Widget/MenuWidget";
import NewsletterStyle4 from "../Widget/NewsletterStyle4";
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

export default function FooterStyle4() {
  return (
    <footer className="cs_footer cs_style_2 cs_type_1 cs_accent_bg cs_white_color">
      <div className="container">
        <NewsletterStyle4
          title="Restez informé"
          subTitle="Inscrivez-vous à notre newsletter pour recevoir <br />les actualités santé de nos experts"
        />
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
            © 2023 Edith. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
