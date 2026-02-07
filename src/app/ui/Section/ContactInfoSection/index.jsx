import IconBoxStyle11 from "../../IconBox/IconBoxStyle11";
import Spacing from "../../Spacing";

export default function ContactInfoSection({ sectionTitle }) {
  return (
    <div className="container">
      <h2 className="cs_fs_72 mb-0">{sectionTitle}</h2>
      <Spacing md="70" lg="50" />
      <div className="row g-4 g-xl-3 g-xxl-5">
        <div className="col-xl-4">
          <IconBoxStyle11
            title="Téléphone"
            subTitle="+243 999 952 335"
            iconSrc="/images/contact/icon_1.svg"
          />
        </div>
        <div className="col-xl-4">
          <IconBoxStyle11
            title="E-mail"
            subTitle="contact@edith.org"
            iconSrc="/images/contact/icon_2.svg"
          />
        </div>
        <div className="col-xl-4">
          <IconBoxStyle11
            title="Clinique Lemba Foire"
            subTitle="Avenue Labue n°13, Lemba Foire"
            iconSrc="/images/contact/icon_3.svg"
          />
        </div>
        <div className="col-xl-4">
          <IconBoxStyle11
            title="Cabinet Centre-Ville"
            subTitle="Boulevard du 30 Juin n°364, En face de la grande poste"
            iconSrc="/images/contact/icon_3.svg"
          />
        </div>
      </div>
      <Spacing md="35" />
      {/* Carte Lemba, Kinshasa — Avenue Labue 13, Lemba Foire */}
      <div className="cs_map">
        <iframe
          id="map"
          title="Carte - Centre médical Edith, Avenue Labue 13, Lemba Foire, Kinshasa"
          src="https://maps.google.com/maps?q=Avenue+Labue+13,+Lemba+Foire,+Kinshasa,+R%C3%A9publique+d%C3%A9mocratique+du+Congo&t=&z=15&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
