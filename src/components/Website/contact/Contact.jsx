import { useState } from "react";
import {
  FiArrowRight,
  FiMail,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Contact.css";

const CONTACT_EMAIL =
  "mamatochterontour@outlook.de";

function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formError, setFormError] =
    useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      setFormError(
        "Bitte fülle alle Felder aus."
      );

      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError(
        "Bitte gib eine gültige E-Mail-Adresse ein."
      );

      return;
    }

    const mailSubject =
      encodeURIComponent(
        `Kontaktanfrage: ${subject}`
      );

    const mailBody =
      encodeURIComponent(
        `Hallo MamaTochterOnTour,\n\n` +
          `${message}\n\n` +
          `Liebe Grüße\n${name}\n\n` +
          `E-Mail-Adresse: ${email}`
      );

    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${mailSubject}` +
      `&body=${mailBody}`;
  }

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero">
          <div
            className="contact-hero__decoration contact-hero__decoration--one"
            aria-hidden="true"
          />

          <div
            className="contact-hero__decoration contact-hero__decoration--two"
            aria-hidden="true"
          />

          <div className="contact-container">
  <div className="contact-hero-content">
    <span className="contact-eyebrow">
      Kontakt
    </span>

    <h1>
      Wir freuen uns,
      <span>von dir zu hören.</span>
    </h1>

    <p className="contact-hero__text">
      Du hast eine Frage zu unserer
      Reise-App, zu einem Reiseguide
      oder möchtest uns einfach eine
      Nachricht schicken? Schreib uns
      gerne.
    </p>
  </div>
</div>
        </section>

        <section className="contact-content">
          <div className="contact-container">
            <div className="contact-layout">
              <aside className="contact-info">

                <span className="contact-section-label">
  Persönlich erreichbar
</span>

                <h2>
                  Deine Nachricht landet direkt
                  bei uns.
                </h2>

                <p className="contact-info__text">
                  Wir lesen jede Nachricht
                  persönlich und melden uns so
                  schnell wie möglich bei dir
                  zurück.
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="contact-email"
                >
                  <span className="contact-email__icon">
                    <FiMail aria-hidden="true" />
                  </span>

                  <span>
                    <small>
                      Schreib uns direkt
                    </small>

                    <strong>
                      {CONTACT_EMAIL}
                    </strong>
                  </span>

                  <FiArrowRight
                    className="contact-email__arrow"
                    aria-hidden="true"
                  />
                </a>

                <p className="contact-info__hint">
                  Bitte beachte, dass sich die
                  Antwortzeit an Wochenenden und
                  während unserer Reisen etwas
                  verlängern kann.
                </p>
              </aside>

              <div className="contact-form-card">
                <div className="contact-form-card__heading">
                  <span className="contact-section-label">
  Nachricht senden
</span>

                  <h2>
                    Wie können wir dir helfen?
                  </h2>
                </div>

                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name">
                        Dein Name
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder="Vor- und Nachname"
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contact-email">
                        E-Mail-Adresse
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="name@beispiel.de"
                      />
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="contact-subject">
                      Betreff
                    </label>

                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Worum geht es?"
                    />
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="contact-message">
                      Deine Nachricht
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={7}
                      maxLength={2000}
                      placeholder="Schreib uns gerne deine Frage oder Nachricht."
                    />

                    <span className="contact-form__counter">
                      {formData.message.length}
                      /2000
                    </span>
                  </div>

                  {formError && (
                    <p
                      className="contact-form__error"
                      role="alert"
                    >
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="contact-form__submit"
                  >
                    Nachricht vorbereiten

                    <FiSend aria-hidden="true" />
                  </button>

                  <p className="contact-form__notice">
                    Beim Absenden öffnet sich
                    dein E-Mail-Programm mit
                    deiner vorbereiteten
                    Nachricht.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Kontakt;