"use client";
import Image from "next/image";
import { useState } from "react";
import Rating from "../Rating";

export default function Testimonial() {
  const [activeTab, setActiveTab] = useState(2);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="cs_tabs cs_style1">
      <ul className="cs_tab_links">
        <li className={activeTab === 1 ? "active" : ""}>
          <div className="cs_tab_link_in" onClick={() => handleTabClick(1)}>
            <div className="cs_testimonial_1_avatar">
              <Image
                src="/images/home_1/avatar_1.png"
                alt="Avatar"
                height={125}
                width={125}
              />
              <div className="cs_testimonial_1_avatar_right">
                <h3 className="cs_fs_24 cs_semibold mb-0">Glody Nzuzi</h3>
                <p className="cs_heading_color mb-0">Kinshasa, RDC</p>
              </div>
            </div>
          </div>
        </li>
        <li className={activeTab === 2 ? "active" : ""}>
          <div className="cs_tab_link_in" onClick={() => handleTabClick(2)}>
            <div className="cs_testimonial_1_avatar">
              <Image
                src="/images/home_1/avatar_2.png"
                alt="Avatar"
                height={125}
                width={125}
              />
              <div className="cs_testimonial_1_avatar_right">
                <h3 className="cs_fs_24 cs_semibold mb-0">Kevine Etanaka</h3>
                <p className="cs_heading_color mb-0">Kinshasa, RDC</p>
              </div>
            </div>
          </div>
        </li>
        <li className={activeTab === 3 ? "active" : ""}>
          <div className="cs_tab_link_in" onClick={() => handleTabClick(3)}>
            <div className="cs_testimonial_1_avatar">
              <Image
                src="/images/home_1/avatar_3.png"
                alt="Avatar"
                height={125}
                width={125}
              />
              <div className="cs_testimonial_1_avatar_right">
                <h3 className="cs_fs_24 cs_semibold mb-0">Joel Ngakinono</h3>
                <p className="cs_heading_color mb-0">Kinshasa, RDC</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="cs_tab_body">
        {activeTab === 1 && (
          <div className="cs_testimonial cs_style_1">
            <Image
              src="/images/icons/quote.svg"
              alt="Icon"
              height={38}
              width={50}
            />
            <p>
              Ma femme a accouché de notre premier enfant à Edith. L&apos;équipe
              de la maternité a été exceptionnelle : professionnelle, à
              l&apos;écoute et rassurante. Les sages-femmes ont accompagné ma
              femme tout au long de l&apos;accouchement avec bienveillance. Je
              recommande vivement ce centre aux familles de Kinshasa.
            </p>
            <Rating ratingNumber={5} />
          </div>
        )}
        {activeTab === 2 && (
          <div className="cs_testimonial cs_style_1">
            <Image
              src="/images/icons/quote.svg"
              alt="Icon"
              height={38}
              width={50}
            />
            <p>
              Après plusieurs années en PMA, c&apos;est à Edith que notre rêve
              s&apos;est réalisé. Le personnel du service soins infertilité nous
              a soutenus avec empathie et compétence. Aujourd&apos;hui nous
              avons une belle petite fille. Merci à toute l&apos;équipe pour
              leur dévouement.
            </p>
            <Rating ratingNumber={5} />
          </div>
        )}
        {activeTab === 3 && (
          <div className="cs_testimonial cs_style_1">
            <Image
              src="/images/icons/quote.svg"
              alt="Icon"
              height={38}
              width={50}
            />
            <p>
              Ma sœur consulte Edith pour le suivi de sa grossesse depuis le
              début. Les échographies sont claires, les médecins prennent le
              temps d&apos;expliquer et les rendez-vous sont bien organisés. Un
              établissement de confiance pour les familles à Kinshasa.
            </p>
            <Rating ratingNumber={5} />
          </div>
        )}
      </div>
    </div>
  );
}
