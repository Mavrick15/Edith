import Image from "next/image";

export default function AppointmentSectionStyle3({ title }) {
  return (
    <div className="container">
      <form action="#" className="cs_appointment_form cs_style_1">
        <div className="cs_appointment_form_head">
          <h2 className="cs_fs_40 mb-0">{title}</h2>
          <div className="cs_appointment_categories">
            <div className="cs_appointment_category">
              <input
                type="radio"
                name="category"
                defaultValue="gyneco-obstetrique"
                defaultChecked=""
              />
              <span>Gynécologie obstétrique</span>
            </div>
            <div className="cs_appointment_category">
              <input
                type="radio"
                name="category"
                defaultValue="consultation-gynecologique"
              />
              <span>Consultation gynécologique</span>
            </div>
            <div className="cs_appointment_category">
              <input
                type="radio"
                name="category"
                defaultValue="laboratoire-biomedical"
              />
              <span>Laboratoire biomédical</span>
            </div>
            <div className="cs_appointment_category">
              <input type="radio" name="category" defaultValue="maternite" />
              <span>Maternité</span>
            </div>
            <div className="cs_appointment_category">
              <input type="radio" name="category" defaultValue="chirurgie" />
              <span>Chirurgie</span>
            </div>
            <div className="cs_appointment_category">
              <input
                type="radio"
                name="category"
                defaultValue="imagerie-medicale"
              />
              <span>Imagerie médicale</span>
            </div>
            <div className="cs_appointment_category">
              <input
                type="radio"
                name="category"
                defaultValue="soins-infertilite"
              />
              <span>Soins infertilité</span>
            </div>
            <div className="cs_appointment_category">
              <input
                type="radio"
                name="category"
                defaultValue="hospitalisation"
              />
              <span>Hospitalisation</span>
            </div>
            <div className="cs_appointment_category">
              <input type="radio" name="category" defaultValue="pediatrie" />
              <span>Pédiatrie</span>
            </div>
          </div>
          <div className="cs_appointment_submit d-none d-lg-block">
            <button className="cs_btn cs_style_1">
              <span>Prendre rendez-vous</span>
              <i>
                <Image
                  src="/images/icons/arrow_white.svg"
                  alt="Icon"
                  height={11}
                  width={16}
                />
                <Image
                  src="/images/icons/arrow_white.svg"
                  alt="Icon"
                  height={11}
                  width={16}
                />
              </i>
            </button>
          </div>
        </div>
        <div className="cs_appointment_form_fields">
          <div className="cs_appointment_form_field">
            <div className="cs_appointment_form_icon cs_center rounded-circle cs_accent_bg">
              <Image
                src="/images/home_3/appointment_icon_1.svg"
                alt="Icon"
                height={33}
                width={33}
              />
            </div>
            <div className="cs_appointment_form_field_right">
              <label>Nom</label>
              <input type="text" placeholder="Jean Dupont" />
            </div>
          </div>
          <div className="cs_appointment_form_field">
            <div className="cs_appointment_form_icon cs_center rounded-circle cs_accent_bg">
              <Image
                src="/images/home_3/appointment_icon_2.svg"
                alt="Icon"
                height={33}
                width={33}
              />
            </div>
            <div className="cs_appointment_form_field_right">
              <label>Numéro de téléphone</label>
              <input type="text" placeholder="01 23 45 67 89" />
            </div>
          </div>
          <div className="cs_appointment_form_field">
            <div className="cs_appointment_form_icon cs_center rounded-circle cs_accent_bg">
              <Image
                src="/images/home_3/appointment_icon_3.svg"
                alt="Icon"
                height={33}
                width={33}
              />
            </div>
            <div className="cs_appointment_form_field_right">
              <label>Numéro de dossier médical</label>
              <input type="text" placeholder="123456-7890-0987" />
            </div>
          </div>
          <div className="cs_appointment_form_field">
            <div className="cs_appointment_form_icon cs_center rounded-circle cs_accent_bg">
              <Image
                src="/images/home_3/appointment_icon_4.svg"
                alt="Icon"
                height={33}
                width={33}
              />
            </div>
            <div className="cs_appointment_form_field_right">
              <label>Motif de la consultation</label>
              <input type="text" placeholder="Bilan de routine" />
            </div>
          </div>
          <div className="cs_appointment_form_field">
            <div className="cs_appointment_form_icon cs_center rounded-circle cs_accent_bg">
              <Image
                src="/images/home_3/appointment_icon_5.svg"
                alt="Icon"
                height={33}
                width={33}
              />
            </div>
            <div className="cs_appointment_form_field_right">
              <label>Date préférée</label>
              <input type="text" placeholder="23/08/2025" id="datepicker" />
            </div>
          </div>
          <div className="cs_appointment_form_field">
            <div className="cs_appointment_form_icon cs_center rounded-circle cs_accent_bg">
              <Image
                src="/images/home_3/appointment_icon_6.svg"
                alt="Icon"
                height={33}
                width={33}
              />
            </div>
            <div className="cs_appointment_form_field_right">
              <label>Heure préférée</label>
              <input
                type="text"
                className="cs_timepicker"
                placeholder="10:00"
              />
            </div>
          </div>
        </div>
        <div className="d-block d-lg-none">
          <div className="cs_height_30" />
          <button className="cs_btn cs_style_1">
            <span>Prendre rendez-vous</span>
            <i>
              <Image
                src="/images/icons/arrow_white.svg"
                alt="Icon"
                height={11}
                width={16}
              />
              <Image
                src="/images/icons/arrow_white.svg"
                alt="Icon"
                height={11}
                width={16}
              />
            </i>
          </button>
        </div>
      </form>
    </div>
  );
}
