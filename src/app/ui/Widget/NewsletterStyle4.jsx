import { safeParse } from "@/lib/safeParse";
import NewsletterForm from '../NewsletterForm';

export default function NewsletterStyle4({ title, subTitle }) {
  return (
    <div className="cs_newsletter cs_style_4">
      <div className="cs_newsletter_left">
        <h2 className="cs_newsletter_title cs_white_color">{safeParse(title)}</h2>
        <p className="cs_newsletter_subtitle mb-0">{safeParse(subTitle)}</p>
      </div>
      <div className="cs_newsletter_right">
        <NewsletterForm
          label="Votre e-mail"
          btnText="Envoyer"
          btnArrowUrl="/images/icons/right_arrow_blue.svg"
        />
      </div>
    </div>
  );
}
