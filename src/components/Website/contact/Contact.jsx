import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiUsers,
  FiSmartphone,
  FiShoppingBag,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Contact.css";

import {
  Link,
} from "react-router-dom";

/* =========================================================
   KONTAKT
========================================================= */

const CONTACT_EMAIL =
  "mamatochterontour@outlook.de";

/* =========================================================
   ANIMATION
========================================================= */

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}) {
  const prefersReducedMotion =
    useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: prefersReducedMotion
          ? 0
          : 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.16,
      }}
      transition={{
        duration:
          prefersReducedMotion
            ? 0
            : 0.75,
        delay:
          prefersReducedMotion
            ? 0
            : delay,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   LABEL
========================================================= */

function SectionLabel({
  children,
  light = false,
}) {
  return (
    <span
      className={`contact-section-label ${
        light
          ? "contact-section-label--light"
          : ""
      }`}
    >
      {children}
    </span>
  );
}

/* =========================================================
   HERO
========================================================= */

function ContactHero() {
  const prefersReducedMotion =
    useReducedMotion();

  return (
    <section className="contact-hero">
      <div
        className="contact-hero__glow contact-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="contact-hero__glow contact-hero__glow--two"
        aria-hidden="true"
      />

      <div className="contact-container contact-hero__layout">
        <motion.div
          className="contact-hero__content"
          initial={{
            opacity: 0,
            y: prefersReducedMotion
              ? 0
              : 34,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.9,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <span className="contact-hero__eyebrow">
            Kontakt
          </span>

          <h1>
            Lass uns
            <span>
              sprechen.
            </span>
          </h1>

          <p className="contact-hero__lead">
  Du hast eine Frage, eine Idee
  oder möchtest mit
  MamaTochterOnTour
  zusammenarbeiten? Dann freuen
  wir uns auf deine Nachricht.
</p>

          <div className="contact-hero__topics">
            <span>
              <FiMessageCircle
                aria-hidden="true"
              />
              Allgemeine Anfragen
            </span>

            <span>
              <FiUsers
                aria-hidden="true"
              />
              Kooperationen
            </span>

            <span>
              <FiSmartphone
                aria-hidden="true"
              />
              Momentry by MamaTochterOnTour
            </span>

            <span>
              <FiShoppingBag
                aria-hidden="true"
              />
              Online-Shop
            </span>
          </div>

          <a
  href="#kontaktformular"
  className="contact-hero__button"
>
  <FiMail aria-hidden="true" />

  <span>
    Nachricht schreiben
  </span>

  <FiArrowRight
    aria-hidden="true"
  />
</a>
                </motion.div>

    <motion.div
  className="contact-hero__routes"
  initial={{
    opacity: 0,
    x: prefersReducedMotion
      ? 0
      : 35,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration:
      prefersReducedMotion
        ? 0
        : 0.9,
    delay:
      prefersReducedMotion
        ? 0
        : 0.12,
    ease: [
      0.22,
      1,
      0.36,
      1,
    ],
  }}
>
  <span className="contact-hero__routes-label">
    Kontaktmöglichkeiten
  </span>

  <div className="contact-hero__routes-list">
    <div className="contact-hero__route">
      <strong>
        01
      </strong>

      <span>
        Allgemeine Fragen & Ideen
      </span>
    </div>

    <div className="contact-hero__route">
      <strong>
        02
      </strong>

      <span>
        Kooperationen & Partnerschaften
      </span>
    </div>

    <div className="contact-hero__route">
      <strong>
        03
      </strong>

      <span>
        Momentry & Online-Shop
      </span>
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FORMULAR
========================================================= */

function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData =
      new FormData(event.currentTarget);

    const name =
      formData.get("Name") || "";

    const email =
      formData.get("E-Mail") || "";

    const company =
      formData.get("Unternehmen") || "";

    const topic =
      formData.get("Thema") || "";

    const message =
      formData.get("Nachricht") || "";

    const subject =
      `${topic} von ${name}`;

    const body = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      company
        ? `Unternehmen oder Marke: ${company}`
        : null,
      `Thema: ${topic}`,
      "",
      "Nachricht:",
      message,
    ]
      .filter(
        (line) => line !== null
      )
      .join("\n");

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href =
      mailtoUrl;
  }

  return (
    <section
  id="kontaktformular"
  className="contact-main"
>
      <div className="contact-container">
        <div className="contact-main__grid">
          <AnimatedSection className="contact-form-card">
            <SectionLabel>
              Schreib uns
            </SectionLabel>

            <h2>
              Was können wir
              <span>
                für dich tun?
              </span>
            </h2>

            <p className="contact-form-card__intro">
  Erzähl uns kurz, worum es
  geht. Anschließend öffnet
  sich dein E-Mail-Programm
  mit deiner vorbereiteten
  Nachricht.
</p>

            <form
  className="contact-form"
  onSubmit={handleSubmit}
>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name">
                    Name
                  </label>

                  <input
  id="contact-name"
  name="Name"
  type="text"
  placeholder="Dein Name"
  autoComplete="name"
  required
/>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-email">
                    E-Mail
                  </label>

                 <input
  id="contact-email"
  name="E-Mail"
  type="email"
  placeholder="name@beispiel.de"
  autoComplete="email"
  required
/>
                </div>
              </div>

              <div className="contact-form__field">
  <label htmlFor="contact-company">
    Unternehmen oder Marke
    <span className="contact-form__optional">
      {" "}(optional)
    </span>
  </label>

  <input
    id="contact-company"
    name="Unternehmen"
    type="text"
    placeholder="Name des Unternehmens oder der Marke"
    autoComplete="organization"
  />
</div>

              <div className="contact-form__field">
                <label htmlFor="contact-topic">
                  Thema
                </label>

                <select
                  id="contact-topic"
                  name="Thema"
                  defaultValue=""
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Worum geht es?
                  </option>

                  <option value="Allgemeine Anfrage">
                    Allgemeine Anfrage
                  </option>

                  <option value="Kooperation">
                    Kooperation
                  </option>

                  <option value="Momentry">
                    Momentry by MamaTochterOnTour
                  </option>

                  <option value="Online-Shop">
                    Online-Shop
                  </option>

                </select>
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-message">
                  Nachricht
                </label>

                <textarea
                  id="contact-message"
                  name="Nachricht"
                  rows="7"
                  placeholder="Erzähl uns gerne ein bisschen mehr ..."
                  required
                />
              </div>

             <label className="contact-form__privacy">
  <input
    type="checkbox"
    name="Datenschutz"
    required
  />

  <span>
    Ich habe die{" "}
    <Link
      to="/datenschutz"
      target="_blank"
      rel="noopener noreferrer"
    >
      Datenschutzerklärung
    </Link>{" "}
    gelesen und stimme der
    Verarbeitung meiner Angaben
    zur Bearbeitung meiner
    Anfrage zu.
  </span>
</label>

              <button
                type="submit"
                className="contact-form__submit"
              >
                <FiSend
                  aria-hidden="true"
                />

                <span>
                  Nachricht senden
                </span>

                <FiArrowRight
                  aria-hidden="true"
                />
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection
            className="contact-info"
            delay={0.12}
          >
            <div className="contact-info__card contact-info__card--dark">
              <div className="contact-info__icon">
                <FiMail
                  aria-hidden="true"
                />
              </div>

              <span className="contact-info__eyebrow">
                Lieber direkt?
              </span>

              <h3>
                Schreib uns einfach
                eine E-Mail.
              </h3>

              <p>
                Du kannst deine Nachricht
                natürlich auch direkt
                über dein eigenes
                E-Mail-Programm senden.
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="contact-info__mail"
              >
                {CONTACT_EMAIL}

                <FiArrowRight
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="contact-info__card contact-info__card--cooperation">
  <div className="contact-info__cooperation-icon">
    <FiUsers aria-hidden="true" />
  </div>

  <span className="contact-info__eyebrow contact-info__eyebrow--dark">
    Zusammenarbeit
  </span>

  <h3>
    Du möchtest mit uns
    zusammenarbeiten?
  </h3>

  <p>
    Auf unserer Kooperationsseite
    findest du unsere Bereiche,
    bestehenden Partnerschaften
    und weitere Informationen
    zur Zusammenarbeit.
  </p>

  <Link
    to="/kooperationen"
    className="contact-info__cooperation-link"
  >
    <span>
      Kooperationen ansehen
    </span>

    <FiArrowRight
      aria-hidden="true"
    />
  </Link>
</div>

            <div className="contact-info__note">
              <FiMessageCircle
                aria-hidden="true"
              />

              <p>
                Wir lesen jede Nachricht
                persönlich und melden uns
                so schnell wie möglich
                zurück.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-page">
        <ContactHero />

        <ContactForm />
        
      </main>

      <Footer />
    </>
  );
}

export default Contact;