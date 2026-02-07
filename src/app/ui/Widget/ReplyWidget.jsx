import Image from 'next/image';

export default function ReplyWidget({ title }) {
  return (
    <>
      <h3 className="cs_semibold cs_fs_24 mb-0">{title}</h3>
      <div className="cs_height_12" />
      <p className="cs_fs_18">
        Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *
      </p>
      <div className="cs_height_7" />
      <form action="#">
        <label className="cs_input_label cs_heading_color cs_fs_18 cs_medium">
          Commentaire*
        </label>
        <textarea
          cols={30}
          rows={8}
          className="cs_form_field_2"
          defaultValue={''}
        />
        <div className="cs_height_20" />
        <label className="cs_input_label cs_heading_color cs_fs_18 cs_medium">
          Votre nom*
        </label>
        <input type="text" className="cs_form_field_2" />
        <div className="cs_height_20" />
        <label className="cs_input_label cs_heading_color cs_fs_18 cs_medium">
          Votre e-mail*
        </label>
        <input type="email" className="cs_form_field_2" />
        <div className="cs_height_30" />
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Enregistrer mon nom et mon e-mail dans ce navigateur pour mon prochain commentaire.
          </label>
        </div>
        <div className="cs_height_60" />
        <button className="cs_btn cs_style_1">
          <span>Envoyer</span>
          <i>
            <Image src="/images/icons/arrow_white.svg" alt="Icon" height={11} width={15} />
            <Image src="/images/icons/arrow_white.svg" alt="Icon" height={11} width={15} />
          </i>
        </button>
      </form>
    </>
  );
}
