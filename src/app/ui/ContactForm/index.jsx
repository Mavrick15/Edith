"use client";

import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value || "Contact",
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
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
      className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30"
    >
      <div className="row">
        <div className="col-lg-6">
          <label
            className="cs_input_label cs_heading_color"
            htmlFor="contact-name"
          >
            Nom
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="cs_form_field"
            placeholder="Jean Dupont"
            required
          />
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-6">
          <label
            className="cs_input_label cs_heading_color"
            htmlFor="contact-email"
          >
            E-mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="cs_form_field"
            placeholder="example@gmail.com"
            required
          />
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-12">
          <label
            className="cs_input_label cs_heading_color"
            htmlFor="contact-subject"
          >
            Sujet
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            className="cs_form_field"
            placeholder="Votre sujet"
          />
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-12">
          <label
            className="cs_input_label cs_heading_color"
            htmlFor="contact-message"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            cols={30}
            rows={10}
            className="cs_form_field"
            placeholder="Écrivez votre message..."
            required
          />
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
          <div className="cs_height_18" />
          <button
            type="submit"
            className="cs_btn cs_style_1"
            disabled={loading}
          >
            <span>{loading ? "Envoi..." : "Envoyer"}</span>
            <ArrowIcon height={11} width={15} />
          </button>
        </div>
      </div>
    </form>
  );
}
