"use client";

import { useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";
import { validateEmail, validateName, validateMessage } from "@/lib/formValidation";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    let validation;
    switch (name) {
      case 'name':
        validation = validateName(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'message':
        validation = validateMessage(value);
        break;
      default:
        return;
    }
    
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, [name]: validation.error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function handleBlur(e) {
    validateField(e.target.name, e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setErrors({});
    
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value || "Contact",
      message: form.message.value,
    };

    // Validation côté client
    const nameValidation = validateName(data.name);
    const emailValidation = validateEmail(data.email);
    const messageValidation = validateMessage(data.message);

    if (!nameValidation.valid || !emailValidation.valid || !messageValidation.valid) {
      setErrors({
        name: nameValidation.valid ? undefined : nameValidation.error,
        email: emailValidation.valid ? undefined : emailValidation.error,
        message: messageValidation.valid ? undefined : messageValidation.error,
      });
      return;
    }

    setLoading(true);

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
        setErrors({});
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
            className={`cs_form_field ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Jean Dupont"
            required
            onBlur={handleBlur}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <div id="contact-name-error" className="invalid-feedback d-block" role="alert">
              {errors.name}
            </div>
          )}
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
            className={`cs_form_field ${errors.email ? 'is-invalid' : ''}`}
            placeholder="example@gmail.com"
            required
            onBlur={handleBlur}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <div id="contact-email-error" className="invalid-feedback d-block" role="alert">
              {errors.email}
            </div>
          )}
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
            className={`cs_form_field ${errors.message ? 'is-invalid' : ''}`}
            placeholder="Écrivez votre message..."
            required
            onBlur={handleBlur}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <div id="contact-message-error" className="invalid-feedback d-block" role="alert">
              {errors.message}
            </div>
          )}
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
