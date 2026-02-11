"use client";

import Image from "next/image";
import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";

export default function AppointmentFormStyle2() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const data = {
      name: form.name?.value?.trim() || "",
      email: form.email?.value?.trim() || "",
      phone: form.phone.value,
      preferredDate: form.date?.value || "",
      preferredTime: "",
      reasonForVisit: "",
      department: form.specialization?.value || "",
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
    <form
      onSubmit={handleSubmit}
      className="cs_appointment_form cs_style_1 cs_type_1 cs_fs_20 position-relative"
    >
      <div className="cs_appointment_form_field">
        <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
          <Image
            src="/images/home_4/appointment_icon_1.svg"
            alt="Nom"
            width={24}
            height={24}
          />
        </div>
        <div className="cs_appointment_form_field_right">
          <label htmlFor="appt2-name">Nom</label>
          <input
            id="appt2-name"
            name="name"
            type="text"
            placeholder="Votre nom"
          />
        </div>
      </div>
      <div className="cs_appointment_form_field">
        <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
          <Image
            src="/images/home_4/appointment_icon_1.svg"
            alt="E-mail"
            width={24}
            height={24}
          />
        </div>
        <div className="cs_appointment_form_field_right">
          <label htmlFor="appt2-email">E-mail</label>
          <input
            id="appt2-email"
            name="email"
            type="email"
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>
      <div className="cs_appointment_form_field">
        <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
          <Image
            src="/images/home_4/appointment_icon_1.svg"
            alt="Calendrier"
            width={24}
            height={24}
          />
        </div>
        <div className="cs_appointment_form_field_right">
          <label htmlFor="appt2-date">Date</label>
          <input
            id="appt2-date"
            name="date"
            type="text"
            placeholder="JJ/MM/AAAA"
          />
        </div>
      </div>
      <div className="cs_appointment_form_field">
        <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
          <Image
            src="/images/home_4/appointment_icon_2.svg"
            alt="Spécialité"
            width={24}
            height={24}
          />
        </div>
        <div className="cs_appointment_form_field_right">
          <label htmlFor="appt2-specialization">Spécialité</label>
          <input
            id="appt2-specialization"
            name="specialization"
            type="text"
            placeholder="Ex. Gynécologie"
          />
        </div>
      </div>
      <div className="cs_appointment_form_field">
        <div className="cs_appointment_form_icon cs_center rounded-circle cs_white_bg">
          <Image
            src="/images/home_4/appointment_icon_3.svg"
            alt="Téléphone"
            width={24}
            height={24}
          />
        </div>
        <div className="cs_appointment_form_field_right">
          <label htmlFor="appt2-phone">Numéro de téléphone</label>
          <input
            id="appt2-phone"
            name="phone"
            type="tel"
            placeholder="+243 XXX XXX XXX"
            required
          />
        </div>
      </div>
      {status && (
        <div
          className={`mb-2 ${
            status.type === "success" ? "text-success" : "text-danger"
          }`}
          style={{ fontSize: "0.9rem" }}
        >
          {status.message}
        </div>
      )}
      <button
        type="submit"
        className="cs_btn cs_style_1 w-100"
        disabled={loading}
      >
        <span>{loading ? "Envoi..." : "Prendre rendez-vous"}</span>
        <ArrowIcon height={11} width={16} />
      </button>
      <a href="#services" className="cs_down_btn cs_center rounded-circle">
        <svg
          width={23}
          height={15}
          viewBox="0 0 23 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.9996 1.76428C23.0071 1.42036 22.9085 1.08263 22.7175 0.798044C22.5265 0.513457 22.2525 0.296151 21.9337 0.17634C21.615 0.0565293 21.2674 0.0401662 20.939 0.129525C20.6107 0.218884 20.3181 0.409525 20.1018 0.674944L11.5264 10.8022L2.95408 0.674943C2.8207 0.49134 2.65137 0.337576 2.45653 0.223282C2.26169 0.108988 2.04557 0.0366257 1.82181 0.010726C1.59805 -0.0151737 1.37146 0.00594769 1.15614 0.0727673C0.940819 0.139587 0.741392 0.250665 0.570471 0.399046C0.399549 0.547427 0.260902 0.729914 0.162918 0.935079C0.0649356 1.14024 0.00990291 1.36367 0.00121874 1.59136C-0.00746352 1.81905 0.0302848 2.0461 0.112352 2.25829C0.19442 2.47049 0.318905 2.66325 0.478018 2.82452L10.2836 14.4193C10.4372 14.6014 10.6278 14.7476 10.8427 14.8478C11.0575 14.9481 11.2914 15 11.528 15C11.7646 15 11.9984 14.9481 12.2132 14.8478C12.4281 14.7476 12.6189 14.6014 12.7725 14.4193L22.5875 2.82452C22.8447 2.53162 22.9905 2.15593 22.9996 1.76428Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </form>
  );
}
