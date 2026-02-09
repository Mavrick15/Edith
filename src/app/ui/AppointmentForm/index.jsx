"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      medicalFileNumber: form.medicalFileNumber?.value || "",
      preferredDate: selectedDate
        ? selectedDate.toISOString().slice(0, 10)
        : "",
      preferredTime: form.preferredTime?.value || "",
      reasonForVisit: form.reasonForVisit?.value || "",
      department: form.department?.value || "",
    };

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: json.message });
        form.reset();
        setSelectedDate(null);
      } else {
        setStatus({ type: "error", message: json.error || "Erreur" });
      }
    } catch {
      setStatus({ type: "error", message: "Erreur de connexion" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color" htmlFor="appt-name">
          Nom
        </label>
        <input
          id="appt-name"
          name="name"
          type="text"
          className="cs_form_field"
          placeholder="Jean Dupont"
          required
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color" htmlFor="appt-phone">
          Numéro de téléphone
        </label>
        <input
          id="appt-phone"
          name="phone"
          type="tel"
          className="cs_form_field"
          placeholder="+243 XXX XXX XXX"
          required
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label
          className="cs_input_label cs_heading_color"
          htmlFor="appt-medicalFileNumber"
        >
          Numéro de dossier médical
        </label>
        <input
          id="appt-medicalFileNumber"
          name="medicalFileNumber"
          type="text"
          className="cs_form_field"
          placeholder="123456-7890-0987"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color" htmlFor="appt-date">
          Date préférée
        </label>
        <div className="cs_with_icon_input">
          <DatePicker
            id="appt-date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            placeholderText="dd/mm/yyyy"
            aria-label="Sélectionner une date préférée"
          />
          <i aria-hidden="true">
            <Icon icon="fa6-solid:calendar-days" aria-hidden="true" />
          </i>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color" htmlFor="appt-time">
          Heure préférée
        </label>
        <div className="cs_with_icon_input">
          <input
            id="appt-time"
            name="preferredTime"
            type="time"
            className="cs_form_field cs_timepicker"
          />
          <i aria-hidden="true">
            <Icon icon="fa6-regular:clock" aria-hidden="true" />
          </i>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <fieldset>
          <legend className="cs_input_label cs_heading_color" id="reason-legend">
            Motif de la consultation
          </legend>
          <div className="cs_radio_group" role="radiogroup">
            <div className="cs_radio_wrap">
              <input
                className="cs_radio_input"
                type="radio"
                name="reasonForVisit"
                id="routineCheckup"
                value="routineCheckup"
              />
              <label className="cs_radio_label" htmlFor="routineCheckup">
                Bilan de routine
              </label>
            </div>
            <div className="cs_radio_wrap">
              <input
                className="cs_radio_input"
                type="radio"
                name="reasonForVisit"
                id="newPatientVisit"
                value="newPatientVisit"
                defaultChecked
              />
              <label className="cs_radio_label" htmlFor="newPatientVisit">
                Première consultation
              </label>
            </div>
            <div className="cs_radio_wrap">
              <input
                className="cs_radio_input"
                type="radio"
                name="reasonForVisit"
                id="specificConcern"
                value="specificConcern"
              />
              <label className="cs_radio_label" htmlFor="specificConcern">
                Problème spécifique
              </label>
            </div>
          </div>
        </fieldset>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label
          className="cs_input_label cs_heading_color"
          htmlFor="appt-department"
        >
          Service
        </label>
        <select
          id="appt-department"
          className="cs_form_field"
          name="department"
          aria-label="Sélectionner un service"
        >
          <option value="gynecologie-obstetrique">
            Gynécologie obstétrique
          </option>
          <option value="consultation-gynecologique">
            Consultation gynécologique
          </option>
          <option value="soins-infertilite">Soins infertilité</option>
          <option value="maternite">Maternité</option>
          <option value="pediatrie">Pédiatrie</option>
          <option value="imagerie-medicale">Imagerie médicale</option>
          <option value="laboratoire-biomedical">Laboratoire biomédical</option>
          <option value="hospitalisation">Hospitalisation</option>
          <option value="chirurgie">Chirurgie</option>
        </select>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {status && (
        <div
          className={`col-12 mb-3 ${
            status.type === "success" ? "text-success" : "text-danger"
          }`}
        >
          {status.message}
        </div>
      )}
      <div className="col-lg-12">
        <button type="submit" className="cs_btn cs_style_1" disabled={loading}>
          <span>{loading ? "Envoi..." : "Envoyer"}</span>
          <ArrowIcon height={11} width={15} />
        </button>
      </div>
    </form>
  );
}
