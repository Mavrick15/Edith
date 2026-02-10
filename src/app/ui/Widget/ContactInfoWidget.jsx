import { Icon } from "@iconify/react";
import Link from "next/link";

export default function ContactInfoWidget() {
  return (
    <ul className="cs_contact_widget">
      <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        <span>
          Clinique Lemba Foire — Avenue Labue n°13, Lemba Foire
        </span>
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        <span>
          Cabinet Centre-Ville — Boulevard du 30 Juin n°364, En face de la
          grande poste
        </span>
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="fluent:call-24-regular" />
        </i>
        <Link href="tel:+243999952335" className="text-decoration-none">
          +243 999 952 335
        </Link>
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="bi:envelope" />
        </i>
        <Link href="mailto:contact@cmedith.com" className="text-decoration-none">
          contact@cmedith.com
        </Link>
      </li>
    </ul>
  );
}
