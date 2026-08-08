import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCompass,
  FiDownload,
  FiHeart,
  FiMail,
  FiPackage,
  FiShoppingBag,
  FiSmartphone,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Kooperationen.css";

/* =========================================================
   KONSTANTEN
========================================================= */

const MEDIA_KIT_URL =
  "/downloads/media-kit-mamatochterontour.pdf";

/*
 * Hier bitte später eure echte
 * Kooperations-Mail einsetzen.
 */
const CONTACT_EMAIL =
  "mamatochterontour@outlook.de";

/* =========================================================
   KOOPERATIONS-BEREICHE
========================================================= */

const COOPERATION_AREAS = [
  {
    id: "content",
    number: "01",
    icon: FiUsers,
    eyebrow:
      "MamaTochterOnTour",
    title:
      "Content, Social Media & Events",
    text:
      "Wir erzählen Geschichten aus unserem Alltag und von unseren Reisen – persönlich, nahbar und immer mit dem Anspruch, Kooperationen natürlich in unseren Content zu integrieren.",
    items: [
      "Social-Media-Kampagnen",
      "Reels, TikToks, Stories & Posts",
      "Events & Einladungen",
      "Hotels & Unterkünfte",
      "Kreuzfahrten & Reiseerlebnisse",
      "Destinationen & Pressereisen",
      "Produktintegrationen",
      "Langfristige Partnerschaften",
    ],
  },

  {
    id: "momentry",
    number: "02",
    icon: FiSmartphone,
    eyebrow:
      "Momentry by MamaTochterOnTour",
    title:
      "Partnerschaften für unsere Reise-App",
    text:
      "Mit Momentry by MamaTochterOnTour möchten wir eine Plattform schaffen, die Reisende vor, während und nach ihrer Reise begleitet. Dafür suchen wir Partner, deren Angebote und Produkte einen echten Mehrwert für Reisende schaffen.",
    items: [
      "Hotels & Unterkünfte",
      "Destinationen & Tourismus",
      "Kreuzfahrt & Mobilität",
      "Reiseveranstalter",
      "Freizeit & Erlebnisse",
      "Reiseaccessoires",
      "Praktische Reiseprodukte",
      "Food, Drinks & To-go-Produkte",
    ],
  },

  {
    id: "shop",
    number: "03",
    icon: FiShoppingBag,
    eyebrow:
      "Online-Shop",
    title:
      "Produkte, die gemeinsam entstehen",
    text:
      "Auch für unseren Online-Shop sind spannende Kooperationen denkbar – von ausgewählten Produkten bis hin zu gemeinsamen Produktideen rund um Reisen, Alltag und unterwegs sein.",
    items: [
      "Reiseaccessoires",
      "Gemeinsame Produktlinien",
      "Co-Branding",
      "Limitierte Editionen",
      "Praktische Reiseprodukte",
      "Bundles & Aktionen",
      "Produktkooperationen",
      "Individuelle Shop-Konzepte",
    ],
  },
];

/* =========================================================
   KOOPERATIONS-MÖGLICHKEITEN
========================================================= */

const POSSIBILITIES = [
  {
    icon: FiHeart,
    title:
      "Authentischer Content",
    text:
      "Produkte, Marken und Erlebnisse werden so eingebunden, dass sie natürlich zu unseren bestehenden Inhalten passen.",
  },

  {
    icon: FiCompass,
    title:
      "Reise & Erlebnis",
    text:
      "Hotels, Kreuzfahrten, Destinationen, Events und besondere Erlebnisse können wir redaktionell und auf Social Media begleiten.",
  },

  {
    icon: FiSmartphone,
    title:
      "Momentry Partnerschaften",
    text:
      "Marken und Services können Teil der Momentry-Reisewelt werden und Reisenden einen echten praktischen Mehrwert bieten.",
  },

  {
    icon: FiPackage,
    title:
      "Produktkooperationen",
    text:
      "Von passenden Reiseprodukten bis hin zu gemeinsam entwickelten Produkten oder Aktionen für unseren Online-Shop.",
  },

  {
    icon: FiStar,
    title:
      "Individuelle Kampagnen",
    text:
      "Nicht jede Kooperation muss gleich aussehen. Wir entwickeln gerne individuelle Konzepte passend zur Marke und Zielsetzung.",
  },

  {
    icon: FiBriefcase,
    title:
      "Langfristige Partnerschaften",
    text:
      "Besonders spannend finden wir Kooperationen, die über einzelne Kampagnen hinausgehen und langfristig wachsen können.",
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
          : 34,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.14,
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
   SECTION LABEL
========================================================= */

function SectionLabel({
  children,
  light = false,
}) {
  return (
    <span
      className={`cooperation-section-label ${
        light
          ? "cooperation-section-label--light"
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

function CooperationHero() {
  const prefersReducedMotion =
    useReducedMotion();

  return (
    <section className="cooperation-hero">
      <div
        className="cooperation-hero__glow cooperation-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="cooperation-hero__glow cooperation-hero__glow--two"
        aria-hidden="true"
      />

      <div className="cooperation-container cooperation-hero__layout">
        <motion.div
          className="cooperation-hero__content"
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
                : 0.9,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <span className="cooperation-hero__eyebrow">
            Kooperationen
          </span>

          <h1>
            Ideen, die
            <span>
              gemeinsam wachsen.
            </span>
          </h1>

          <p className="cooperation-hero__lead">
            Wir lieben Kooperationen,
            die zu uns, unserer Community
            und unseren Projekten passen.
            Von Content und Events über
            Momentry by MamaTochterOnTour bis hin zu gemeinsamen
            Produktideen für unseren
            Online-Shop.
          </p>

          <div className="cooperation-hero__actions">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Kooperationsanfrage`}
              className="cooperation-button cooperation-button--primary"
            >
              <FiMail
                aria-hidden="true"
              />

              <span>
                Kooperation anfragen
              </span>

              <FiArrowRight
                aria-hidden="true"
              />
            </a>

            <a
              href={MEDIA_KIT_URL}
              download
              className="cooperation-button cooperation-button--secondary"
            >
              <FiDownload
                aria-hidden="true"
              />

              <span>
                Media Kit herunterladen
              </span>
            </a>
          </div>
        </motion.div>

        <AnimatedSection
          className="cooperation-hero__side"
          delay={0.12}
        >
          <span className="cooperation-hero__side-label">
            Drei Bereiche
          </span>

          <div className="cooperation-hero__side-item">
            <strong>
              01
            </strong>

            <span>
              Content,
              Social Media
              & Events
            </span>
          </div>

          <div className="cooperation-hero__side-item">
            <strong>
              02
            </strong>

            <span>
              Momentry
              Partnerschaften
            </span>
          </div>

          <div className="cooperation-hero__side-item">
            <strong>
              03
            </strong>

            <span>
              Online-Shop
              & Produkte
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* =========================================================
   INTRO
========================================================= */

function CooperationIntro() {
  return (
    <section className="cooperation-intro">
      <div className="cooperation-container">
        <AnimatedSection>
          <SectionLabel>
            Zusammenarbeit
          </SectionLabel>

          <div className="cooperation-intro__grid">
            <h2>
              Nicht jede Kooperation
              <span>
                muss gleich aussehen.
              </span>
            </h2>

            <div>
              <p>
                MamaTochterOnTour besteht
                heute aus verschiedenen
                Bereichen, die jeweils ganz
                unterschiedliche Möglichkeiten
                für Partnerschaften bieten.
              </p>

              <p>
                Wichtig ist uns dabei immer,
                dass eine Zusammenarbeit
                authentisch zu uns, unseren
                Projekten und den Menschen
                passt, die uns begleiten.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* =========================================================
   DREI BEREICHE
========================================================= */

function CooperationAreas() {
  return (
    <section className="cooperation-areas">
      <div className="cooperation-container">
        <AnimatedSection className="cooperation-areas__heading">
          <SectionLabel light>
            Unsere Bereiche
          </SectionLabel>

          <h2>
            Drei Welten.
            <span>
              Viele Möglichkeiten.
            </span>
          </h2>

          <p>
            Je nach Marke, Produkt oder
            Idee kann eine Zusammenarbeit
            ganz unterschiedlich aussehen.
          </p>
        </AnimatedSection>

        <div className="cooperation-areas__grid">
          {COOPERATION_AREAS.map(
            (area, index) => {
              const Icon =
                area.icon;

              return (
                <AnimatedSection
                  key={area.id}
                  className="cooperation-area-card"
                  delay={
                    index * 0.08
                  }
                >
                  <div className="cooperation-area-card__top">
                    <span className="cooperation-area-card__number">
                      {area.number}
                    </span>

                    <div className="cooperation-area-card__icon">
                      <Icon
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <span className="cooperation-area-card__eyebrow">
                    {area.eyebrow}
                  </span>

                  <h3>
                    {area.title}
                  </h3>

                  <p>
                    {area.text}
                  </p>

                  <div className="cooperation-area-card__items">
                    {area.items.map(
                      (item) => (
                        <span
                          key={item}
                        >
                          <FiCheck
                            aria-hidden="true"
                          />

                          {item}
                        </span>
                      )
                    )}
                  </div>
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
   MÖGLICHKEITEN
========================================================= */

function CooperationPossibilities() {
  return (
    <section className="cooperation-possibilities">
      <div className="cooperation-container">
        <AnimatedSection className="cooperation-possibilities__heading">
          <SectionLabel>
            Möglichkeiten
          </SectionLabel>

          <h2>
            Vom einzelnen Moment
            <span>
              bis zur Partnerschaft.
            </span>
          </h2>
        </AnimatedSection>

        <div className="cooperation-possibilities__grid">
          {POSSIBILITIES.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <AnimatedSection
                  key={item.title}
                  className="cooperation-possibility-card"
                  delay={
                    index * 0.05
                  }
                >
                  <div className="cooperation-possibility-card__icon">
                    <Icon
                      aria-hidden="true"
                    />
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
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

function Kooperationen() {
  return (
    <>
      <Navbar />

      <main className="cooperation-page">
        <CooperationHero />

        <CooperationIntro />

        <CooperationAreas />

        <CooperationPossibilities />

      </main>

      <Footer />
    </>
  );
}

export default Kooperationen;