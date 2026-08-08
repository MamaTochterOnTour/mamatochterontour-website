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
  FiHeart,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Contact.css";

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
            Du hast eine Frage,
            eine Idee oder möchtest mit
            MamaTochterOnTour
            zusammenarbeiten?
            Dann schreib uns gerne.
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
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FORMULAR
========================================================= */

function ContactForm() {
  return (
    <section className="contact-main">
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
              geht. Über das Formular
              öffnet sich anschließend
              dein E-Mail-Programm mit
              deiner Nachricht.
            </p>

            <form
              className="contact-form"
              action={`mailto:${CONTACT_EMAIL}`}
              method="post"
              encType="text/plain"
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
                    required
                  />
                </div>
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
                  required
                />

                <span>
                  Ich habe die
                  Datenschutzerklärung
                  gelesen und stimme der
                  Verarbeitung meiner
                  Angaben zur Bearbeitung
                  meiner Anfrage zu.
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

            <div className="contact-info__card">
              <span className="contact-info__eyebrow contact-info__eyebrow--dark">
                Dafür kannst du uns schreiben
              </span>

              <div className="contact-info__list">
                <div>
                  <FiHeart
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Allgemeine Fragen
                    </strong>

                    <small>
                      Reise, Content,
                      MamaTochterOnTour
                      und alles drumherum.
                    </small>
                  </span>
                </div>

                <div>
                  <FiUsers
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Kooperationen
                    </strong>

                    <small>
                      Social Media,
                      Events, Reisen,
                      App-Partnerschaften
                      oder Shop-Ideen.
                    </small>
                  </span>
                </div>

                <div>
                  <FiSmartphone
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Momentry by MamaTochterOnTour
                    </strong>

                    <small>
                      Fragen zur App,
                      Feedback oder
                      Partnerschaften.
                    </small>
                  </span>
                </div>

                <div>
                  <FiShoppingBag
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Online-Shop
                    </strong>

                    <small>
                      Reiseguides,
                      Produkte oder
                      mögliche
                      Zusammenarbeit.
                    </small>
                  </span>
                </div>
              </div>
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