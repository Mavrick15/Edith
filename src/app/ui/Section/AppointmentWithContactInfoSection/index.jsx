import Image from "next/image";
import AppointmentForm from "../../AppointmentForm";

import appointmentImg from "../../../../../public/images/appointments/appointment_img.jpeg";

const contactInfo = [
  { title: "Téléphone", subTitle: "+243 999 952 335" },
  { title: "E-mail", subTitle: "contact@cmedith.com" },
  {
    title: "Clinique Lemba Foire",
    subTitle: "Avenue Labue n°13, Lemba Foire, Kinshasa",
  },
  {
    title: "Cabinet Centre-Ville",
    subTitle:
      "Boulevard du 30 Juin n°364, En face de la grande poste, Kinshasa",
  },
];

export default function AppointmentWithContactInfoSection() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <h2 className="cs_fs_40 cs_medium mb-0">Rendez-vous</h2>
          <div className="cs_height_42 cs_height_xl_25" />
          <AppointmentForm />
        </div>
        <div className="col-lg-4 offset-lg-1">
          <div className="cs_height_lg_100" />
          <h2 className="cs_fs_40 cs_medium mb-0">Coordonnées</h2>
          <div className="cs_height_60 cs_height_xl_40" />
          <Image
            src={appointmentImg}
            alt="Rendez-vous"
            className="cs_radius_25 w-100"
            placeholder="blur"
          />
          <div className="cs_height_100 cs_height_xl_60" />
          <ul className="cs_contact_info cs_style_1 cs_mp0">
            {contactInfo.map((item, index) => (
              <li key={index}>
                <h3 className="cs_fs_24 cs_semibold mb-0">{item.title}</h3>
                <p className="mb-0 cs_heading_color">{item.subTitle}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
