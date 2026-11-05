import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
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
   BESTEHENDE PARTNERSCHAFTEN
========================================================= */

const EXISTING_PARTNERS = [
  {
    id: "macromedia",
    name: "Macromedia University",
    since: "Social-Media-Partner seit August 2025",
  },
  {
    id: "holy",
    name: "HOLY",
    since: "Social-Media-Partner seit Januar 2026",
  },
  {
    id: "tui-aschaffenburg",
    name: "TUI Reisebüro Aschaffenburg",
    since: "Momentry App-Partner seit Januar 2026",
  },
  {
    id: "snocks",
    name: "SNOCKS",
    since: "Social-Media-Partner seit August 2026",
  },
];

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
    "Wir erzählen Geschichten aus unserem Alltag und von unseren Reisen – persönlich, nahbar und immer mit dem Anspruch, Kooperationen natürlich und glaubwürdig in unseren Content zu integrieren.",
  items: [
    "Social-Media-Kampagnen",
    "Reels, TikToks, Stories & Posts",
    "Authentische Produktintegrationen",
    "Content-Produktion",
    "Events & Einladungen",
    "Markenbotschafter-Kampagnen",
    "Individuelle Konzepte",
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
  "Momentry by MamaTochterOnTour ist unsere Reise-App, die Reisende vor, während und nach ihrer Reise begleitet. Wir sind offen für Partnerschaften, die unserer Community einen echten Mehrwert bieten und sich sinnvoll in die Reisewelt der App integrieren lassen.",
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

const COOPERATION_STRENGTHS = [
  {
    icon: FiUsers,
    title:
      "Persönliches Mama-Tochter-Duo",
    text:
      "Zwei Generationen, unterschiedliche Perspektiven und eine gemeinsame Art, Geschichten persönlich und nahbar zu erzählen.",
  },

  {
    icon: FiHeart,
    title:
      "Authentisches Storytelling",
    text:
      "Kooperationen werden so in unseren Content eingebunden, dass sie glaubwürdig zu uns und unseren bestehenden Inhalten passen.",
  },

  {
    icon: FiSmartphone,
    title:
      "Plattformübergreifender Content",
    text:
      "Wir entwickeln Inhalte für unterschiedliche Formate und Plattformen – von kurzen Social-Media-Videos bis zu ausführlicheren Einblicken.",
  },

  {
    icon: FiPackage,
    title:
      "Eigene Projekte & Produkte",
    text:
      "Mit Momentry, unseren Reiseguides und unserem Online-Shop verbinden wir Content mit eigenen digitalen Projekten und Produkten.",
  },

  {
    icon: FiStar,
    title:
      "Individuelle Konzepte",
    text:
      "Wir entwickeln Kooperationen passend zur Marke, zur Zielsetzung und zu den Menschen, die unsere Inhalte begleiten.",
  },

  {
    icon: FiBriefcase,
    title:
      "Langfristiges Markenverständnis",
    text:
      "Besonders wichtig sind uns Partnerschaften, die authentisch wachsen und über eine einzelne Kampagne hinausgehen können.",
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
    Unsere Kooperationswelten
  </span>

  <div className="cooperation-hero__side-item">
    <strong>
      01
    </strong>

    <div className="cooperation-hero__side-copy">
      <div>
        <FiUsers aria-hidden="true" />
      </div>

      <span>
        Content, Social Media
        & Events
      </span>
    </div>
  </div>

  <div className="cooperation-hero__side-item">
    <strong>
      02
    </strong>

    <div className="cooperation-hero__side-copy">
      <div>
        <FiSmartphone aria-hidden="true" />
      </div>

      <span>
        Momentry
        Partnerschaften
      </span>
    </div>
  </div>

  <div className="cooperation-hero__side-item">
    <strong>
      03
    </strong>

    <div className="cooperation-hero__side-copy">
      <div>
        <FiShoppingBag aria-hidden="true" />
      </div>

      <span>
        Online-Shop
        & Produkte
      </span>
    </div>
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
   BESTEHENDE PARTNERSCHAFTEN
========================================================= */

function CooperationPartners() {
  return (
    <section className="cooperation-partners">
      <div className="cooperation-container">
        <AnimatedSection className="cooperation-partners__heading">
          <SectionLabel>
            Bestehende Partnerschaften
          </SectionLabel>

          <div className="cooperation-partners__heading-grid">
            <h2>
              Partner, die uns
              <span>
                langfristig begleiten.
              </span>
            </h2>

            <div className="cooperation-partners__copy">
  <p>
  Mit der Macromedia University,
  HOLY und SNOCKS arbeiten wir im
  Rahmen langfristiger
  Social-Media-Kooperationen zusammen.
  Das TUI Reisebüro Aschaffenburg
  begleitet Momentry by MamaTochterOnTour als App-Partner.
</p>

  <p>
    Darüber hinaus haben wir bereits
    vielfältige Einzelkooperationen umgesetzt –
    unter anderem mit Hotels sowie im Rahmen
    von Events, Museen, Ausstellungen,
    Freizeitparks und Musicals.
  </p>
</div>
          </div>
        </AnimatedSection>

        <div className="cooperation-partners__grid">
          {EXISTING_PARTNERS.map(
            (partner, index) => (
              <AnimatedSection
                key={partner.id}
                className="cooperation-partner-card"
                delay={index * 0.06}
              >
                <div className="cooperation-partner-card__top">
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <FiCheck aria-hidden="true" />
                  </div>
                </div>

                <h3>
                  {partner.name}
                </h3>

                <p>
                  {partner.since}
                </p>
              </AnimatedSection>
            )
          )}
        </div>
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

/* =========================================================
   WAS UNS AUSZEICHNET
========================================================= */

function CooperationStrengths() {
  return (
    <section className="cooperation-possibilities">
      <div className="cooperation-container">
        <AnimatedSection className="cooperation-possibilities__heading">
          <SectionLabel>
            Zusammenarbeit mit uns
          </SectionLabel>

          <h2>
            Was eine Zusammenarbeit
            <span>
              mit uns auszeichnet.
            </span>
          </h2>
        </AnimatedSection>

        <div className="cooperation-possibilities__grid">
          {COOPERATION_STRENGTHS.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <AnimatedSection
                  key={item.title}
                  className="cooperation-possibility-card"
                  delay={index * 0.05}
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
   ABSCHLUSS / KONTAKT
========================================================= */

function CooperationCTA() {
  return (
    <section className="cooperation-cta">
      <div className="cooperation-container">
        <AnimatedSection className="cooperation-cta__card">
          <div
            className="cooperation-cta__glow"
            aria-hidden="true"
          />

          <div className="cooperation-cta__icon">
            <FiMail aria-hidden="true" />
          </div>

          <span className="cooperation-cta__eyebrow">
            Lasst uns sprechen
          </span>

          <h2>
            Eine Idee, die
            <span>
              zu uns passen könnte?
            </span>
          </h2>

          <p>
            Dann freuen wir uns darauf,
            mehr über die Marke, die Idee
            und die geplante Zusammenarbeit
            zu erfahren.
          </p>

          <div className="cooperation-cta__actions">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Kooperationsanfrage`}
              className="cooperation-button cooperation-button--primary"
            >
              <FiMail aria-hidden="true" />

              <span>
                Kooperation anfragen
              </span>

              <FiArrowRight aria-hidden="true" />
            </a>

            <a
              href={MEDIA_KIT_URL}
              download
              className="cooperation-button cooperation-button--secondary"
            >
              <FiDownload aria-hidden="true" />

              <span>
                Media Kit herunterladen
              </span>
            </a>
          </div>
        </AnimatedSection>
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

<CooperationPartners />

<CooperationStrengths />

<CooperationCTA />

      </main>

      <Footer />
    </>
  );
}

export default Kooperationen;