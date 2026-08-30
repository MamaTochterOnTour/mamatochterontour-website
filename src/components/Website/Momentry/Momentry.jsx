import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiCheck,
  FiCompass,
  FiHeart,
  FiMap,
  FiMessageCircle,
  FiSave,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import momentryAppScreen from
  "../../../assets/images/home/momentry-app-screen.png";

import "./momentry.css";

/* =========================================================
   STORE BADGES
========================================================= */

import googlePlayBadge from
  "../../../assets/store-badges/google-play-de.png";

import appStoreBadge from
  "../../../assets/store-badges/app-store-de.svg";

/* =========================================================
   APP-BILDER
========================================================= */

/*
 * Dateinamen gegebenenfalls
 * an deine echten Dateien anpassen.
 */

import appPreview1 from
  "../../../assets/images/momentry/app-preview-1.png";

import appPreview2 from
  "../../../assets/images/momentry/app-preview-2.png";

import appPreview3 from
  "../../../assets/images/momentry/app-preview-3.png";

import appPreview4 from
  "../../../assets/images/momentry/app-preview-4.png";

import appPreview5 from
  "../../../assets/images/momentry/app-preview-5.png";

/* =========================================================
   LINKS
========================================================= */

const APP_STORE_URL =
  "https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch";

/* =========================================================
   APP PREVIEWS
========================================================= */

const APP_PREVIEWS = [
  {
    id: "inspiration",
    image: appPreview1,
    alt:
      "Momentry App – Reiseinspiration entdecken",
  },
  {
    id: "highlights",
    image: appPreview2,
    alt:
      "Momentry App – Reise-Highlights teilen",
  },
  {
    id: "groups",
    image: appPreview3,
    alt:
      "Momentry App – Reisegruppen und Community",
  },
  {
    id: "planning",
    image: appPreview4,
    alt:
      "Momentry App – Reisen planen",
  },
  {
    id: "questions",
    image: appPreview5,
    alt:
      "Momentry App – Fragen stellen und Antworten erhalten",
  },
];

/* =========================================================
   FEATURES
========================================================= */

const FEATURES = [
  {
    icon: FiCompass,

    eyebrow:
      "Inspiration",

    title:
      "Entdecke neue Reisemomente.",

    text:
      "Lass dich von echten Reisen, besonderen Orten und persönlichen Erfahrungen anderer Reisender inspirieren.",
  },

  {
    icon: FiHeart,

    eyebrow:
      "Community",

    title:
      "Reisen verbindet.",

    text:
      "Folge anderen Reisenden, like Beiträge, kommentiere besondere Momente und baue deine eigene Reise-Community auf.",
  },

  {
    icon: FiMap,

    eyebrow:
      "Reiseplanung",

    title:
      "Alles für deine Reise an einem Ort.",

    text:
      "Organisiere deine Reisen mit Aufgaben, Notizen, Budget und Packlisten – übersichtlich und gemeinsam.",
  },

  {
    icon: FiUsers,

    eyebrow:
      "Reisegruppen",

    title:
      "Finde Menschen auf deiner Reise.",

    text:
      "Vernetze dich in Reisegruppen mit Menschen, die dieselbe Reise, Route oder Kreuzfahrt erleben.",
  },

  {
    icon: FiMessageCircle,

    eyebrow:
      "Q&A & Forum",

    title:
      "Fragen. Antworten. Erfahrungen.",

    text:
      "Stelle Fragen, teile Erfahrungen und finde hilfreiche Antworten aus der Community.",
  },

  {
    icon: FiSave,

    eyebrow:
      "Persönliches Profil",

    title:
      "Deine Reisen. Deine Momente.",

    text:
      "Sammle deine Beiträge, gespeicherten Inspirationen und Reiseerlebnisse in deinem persönlichen Profil.",
  },
];

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
          : 36,
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
            : 0.8,

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
   SECTION LABEL
========================================================= */

function SectionLabel({
  children,
  light = false,
}) {
  return (
    <span
      className={`momentry-section-label ${
        light
          ? "momentry-section-label--light"
          : ""
      }`}
    >
      {children}
    </span>
  );
}

/* =========================================================
   STORE BADGES
========================================================= */

function StoreBadges({
  light = false,
}) {
  return (
    <div
      className={`momentry-store ${
        light
          ? "momentry-store--light"
          : ""
      }`}
    >
      <span className="momentry-store__label">
        Jetzt kostenlos herunterladen
      </span>

      <div className="momentry-store__badges">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Momentry im Apple App Store herunterladen"
        >
          <img
            src={appStoreBadge}
            alt="Laden im App Store"
          />
        </a>

        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Momentry bei Google Play herunterladen"
        >
          <img
            src={googlePlayBadge}
            alt="Jetzt bei Google Play"
          />
        </a>
      </div>

      <small>
        Download kostenlos.
        Optionale Premium-Funktionen
        können kostenpflichtig sein.
      </small>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function MomentryHero() {
  const prefersReducedMotion =
    useReducedMotion();

  return (
    <section className="momentry-hero">
      <div
        className="momentry-hero__glow momentry-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="momentry-hero__glow momentry-hero__glow--two"
        aria-hidden="true"
      />

      <div className="momentry-container momentry-hero__layout">
        <motion.div
          className="momentry-hero__content"
          initial={{
            opacity: 0,

            y: prefersReducedMotion
              ? 0
              : 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.95,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <span className="momentry-hero__eyebrow">
            Momentry by MamaTochterOnTour
          </span>

          <h1>
            Reisen.
            <span>
              Gemeinsam.
            </span>
            Erleben.
          </h1>

          <p className="momentry-hero__lead">
            Momentry by MamaTochterOnTour verbindet
            Reiseinspiration, Community und
            Reiseplanung in einer App.
            Entdecke neue Orte, vernetze dich
            mit anderen Reisenden und plane
            deine nächste Reise gemeinsam.
          </p>

          <div className="momentry-hero__benefits">
            <span>
              <FiCheck aria-hidden="true" />
              Reiseplanung
            </span>

            <span>
              <FiCheck aria-hidden="true" />
              Community
            </span>

            <span>
              <FiCheck aria-hidden="true" />
              Inspiration
            </span>
          </div>

          <StoreBadges light />
        </motion.div>

        <motion.div
  className="momentry-hero__visual"
  initial={{
    opacity: 0,

    x: prefersReducedMotion
      ? 0
      : 40,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration:
      prefersReducedMotion
        ? 0
        : 1,

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
  <div
    className="momentry-hero__orbit"
    aria-hidden="true"
  />

  <div className="momentry-hero__phone">
    <div className="momentry-hero__phone-speaker" />

    <div className="momentry-hero__phone-screen">
      <img
        src={momentryAppScreen}
        alt="Momentry App"
      />
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   INTRO
========================================================= */

function MomentryIntro() {
  return (
    <section className="momentry-intro">
      <div className="momentry-container">
        <div className="momentry-intro__grid">
          <AnimatedSection className="momentry-intro__heading">
            <SectionLabel>
              Mehr als Reiseplanung
            </SectionLabel>

            <h2>
              Eine Reise beginnt
              <span>
                lange vor dem Abflug.
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection
            className="momentry-intro__copy"
            delay={0.12}
          >
            <p>
              Reiseideen liegen in
              Screenshots, Packlisten in
              Notizen und wichtige
              Informationen irgendwo
              zwischen unzähligen
              Nachrichten.
            </p>

            <p>
              Momentry by MamaTochterOnTour bringt Inspiration,
              Planung und Austausch an einen
              gemeinsamen Ort – vor, während
              und nach deiner Reise.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   APP PREVIEWS
========================================================= */

function MomentryPreviews() {
  return (
    <section className="momentry-previews">
      <div className="momentry-container">
        <AnimatedSection className="momentry-previews__heading">
          <SectionLabel light>
            Entdecke Momentry by MamaTochterOnTour
          </SectionLabel>

          <h2>
            Eine App.
            <span>
              Deine ganze Reisewelt.
            </span>
          </h2>

          <p>
            Inspiration entdecken,
            Erlebnisse teilen, Menschen
            kennenlernen und gemeinsam
            Reisen organisieren.
          </p>
        </AnimatedSection>
      </div>

      <div className="momentry-previews__rail">
        {APP_PREVIEWS.map(
          (preview, index) => (
            <AnimatedSection
              key={preview.id}
              className="momentry-preview"
              delay={index * 0.06}
            >
              <img
                src={preview.image}
                alt={preview.alt}
                loading="lazy"
              />
            </AnimatedSection>
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   FEATURES
========================================================= */

function MomentryFeatures() {
  return (
    <section className="momentry-features">
      <div className="momentry-container">
        <AnimatedSection className="momentry-features__heading">
          <SectionLabel>
            Alles in einer App
          </SectionLabel>

          <h2>
            Für alles,
            <span>
              was Reisen verbindet.
            </span>
          </h2>
        </AnimatedSection>

        <div className="momentry-features__grid">
          {FEATURES.map(
            (feature, index) => {
              const Icon =
                feature.icon;

              return (
                <AnimatedSection
                  key={feature.title}
                  className="momentry-feature-card"
                  delay={
                    index * 0.05
                  }
                >
                  <div className="momentry-feature-card__icon">
                    <Icon
                      aria-hidden="true"
                    />
                  </div>

                  <span>
                    {feature.eyebrow}
                  </span>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.text}
                  </p>
                </AnimatedSection>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   PAGE
========================================================= */

function Momentry() {
  return (
    <>
      <Navbar />

      <main className="momentry-page">
        <MomentryHero />

        <MomentryIntro />

        <MomentryPreviews />

        <MomentryFeatures />

      </main>

      <Footer />
    </>
  );
}

export default Momentry;