import { motion, useReducedMotion } from "framer-motion";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import momentryHome from "../../../assets/images/app/momentry-home.jpg";
import momentryHome2 from "../../../assets/images/app/momentry-home2.jpg";

import "./momentry.css";

const APP_STORE_URL =
  "https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch";

import appStoreBadge from "../../../assets/store-badges/app-store-de.svg";
import googlePlayBadge from "../../../assets/store-badges/google-play-de.png";

const appAreas = [
  {
    number: "01",
    label: "Vor der Reise",
    title: "Planen",
    text: "Bereite deine nächste Reise übersichtlich vor und sammle alles an einem Ort.",
    features: [
      "Reisen anlegen und organisieren",
      "Individuelle Packlisten erstellen",
      "Packlisten alter Reisen importieren",
      "In Reisegruppen vorab connecten",
    ],
  },
  {
    number: "02",
    label: "Während der Reise",
    title: "Erleben",
    text: "Entdecke echte Erfahrungen, persönliche Empfehlungen und hilfreiche Antworten.",
    features: [
      "Beiträge im Reise-Feed entdecken",
      "In Reisegruppen gemeinsam austauschen",
      "Fragen im Q&A-Bereich stellen",
      "Reise-Guides und Insider-Tipps nutzen",
    ],
  },
  {
    number: "03",
    label: "Nach der Reise",
    title: "Erinnern",
    text: "Halte deine Reisemomente fest und bewahre die Erinnerungen, die bleiben.",
    features: [
      "Eigene Reisemomente teilen",
      "Beiträge liken und kommentieren",
      "Mit der Reisegruppe in Kontakt bleiben",
      "Andere Reisende inspirieren",
    ],
  },
];

function StoreButtons({ className = "" }) {
  return (
    <div
      className={`momentry-store-buttons ${className}`.trim()}
      aria-label="Momentry herunterladen"
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="momentry-store-badge-link"
        aria-label="Momentry im App Store öffnen"
      >
        <img
          src={appStoreBadge}
          alt="Laden im App Store"
          className="momentry-store-badge"
        />
      </a>

      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="momentry-store-badge-link"
        aria-label="Momentry bei Google Play öffnen"
      >
        <img
          src={googlePlayBadge}
          alt="Jetzt bei Google Play"
          className="momentry-store-badge"
        />
      </a>
    </div>
  );
}

export default function Momentry() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <>
      <Navbar />

      <main className="momentry-page">
        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="momentry-hero">

          <div className="momentry-container momentry-hero-grid">
            <motion.div
              className="momentry-hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                className="momentry-eyebrow"
                variants={fadeUp}
              >
                Momentry by MamaTochterOnTour
              </motion.span>

              <motion.h1 variants={fadeUp}>
                Deine Reise.
                <span>Alles in einer App.</span>
              </motion.h1>

              <motion.p
                className="momentry-hero-lead"
                variants={fadeUp}
              >
                Mit Momentry kannst du deine Reisen planen, neue Orte
                entdecken und deine schönsten Momente mit anderen teilen.
              </motion.p>

              <motion.div variants={fadeUp}>
                <StoreButtons />
              </motion.div>
            </motion.div>

            <motion.div
              className="momentry-hero-visual"
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : 45,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.95,
                delay: prefersReducedMotion ? 0 : 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="momentry-phone momentry-phone--primary">
                <div className="momentry-phone-frame">
                  <div className="momentry-phone-speaker" />

                  <img
                    src={momentryHome}
                    alt="Startseite der Momentry Reise-App"
                  />
                </div>
              </div>

              <div className="momentry-phone momentry-phone--secondary">
                <div className="momentry-phone-frame">
                  <div className="momentry-phone-speaker" />

                  <img
                    src={momentryHome2}
                    alt="Reiseansicht der Momentry Reise-App"
                  />
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* ===================================================
            GEMEINSAMER FUNKTIONSBEREICH
        ==================================================== */}

        <section className="momentry-functions">
          <div className="momentry-container">
            <motion.div
              className="momentry-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerContainer}
            >
              <motion.span
                className="momentry-section-label"
                variants={fadeUp}
              >
                Eine App für deine ganze Reise
              </motion.span>

              <motion.h2 variants={fadeUp}>
                Planen. Erleben.
                <span> Erinnern.</span>
              </motion.h2>

              <motion.p variants={fadeUp}>
                Momentry begleitet dich von der ersten Reiseidee bis zu den
                Erinnerungen, die du danach mit nach Hause nimmst.
              </motion.p>
            </motion.div>

            <motion.div
              className="momentry-function-rail"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
            >
              {appAreas.map((area) => (
                <motion.article
                  className="momentry-function-column"
                  key={area.number}
                  variants={fadeUp}
                >
                  <div className="momentry-function-top">
                    <span className="momentry-function-number">
                      {area.number}
                    </span>

                    <span className="momentry-function-label">
                      {area.label}
                    </span>
                  </div>

                  <h3>{area.title}</h3>

                  <p className="momentry-function-description">
                    {area.text}
                  </p>

                  <ul className="momentry-function-list">
                    {area.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              className="momentry-function-bottom"
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="momentry-function-bottom-icon" aria-hidden="true">
                ✦
              </span>

              <div>
                <strong>Eine Reise endet. Die Erinnerung bleibt.</strong>

                <p>
                  Bewahre besondere Erlebnisse, teile deine Erfahrungen und
                  finde deine gespeicherten Inspirationen jederzeit wieder.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}