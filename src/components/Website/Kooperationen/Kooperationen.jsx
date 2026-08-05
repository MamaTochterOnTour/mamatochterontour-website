import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiCamera,
  FiDownload,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPackage,
  FiPlay,
  FiShoppingBag,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Kooperationen.css";

const CONTACT_EMAIL =
  "mamatochterontour@outlook.de";

const MEDIA_KIT_URL =
  "/downloads/media-kit-mamatochterontour.pdf";

/* =========================================================
   KOOPERATIONSBEREICHE
========================================================= */

const cooperationAreas = [
  {
    number: "01",
    eyebrow: "Content & Kampagnen",
    title: "Social Media",
    text:
      "Authentischer Content, der sich glaubwürdig in unsere Kanäle und unsere Reiseerlebnisse einfügt.",
    services: [
      "Reels, TikToks und Story-Content",
      "Kreative Kampagnen und Markenpartnerschaften",
    ],
    className: "cooperations-area--social",
    icon: FiPlay,
  },
  {
    number: "02",
    eyebrow: "Vor Ort erleben",
    title: "Events & Reisen",
    text:
      "Wir begleiten passende Veranstaltungen, Reiseerlebnisse und Destinationen mit persönlichen Einblicken.",
    services: [
      "Pressereisen, Hotels und Kreuzfahrten",
      "Events, Eröffnungen und Content vor Ort",
    ],
    className: "cooperations-area--travel",
    icon: FiMapPin,
  },
  {
    number: "03",
    eyebrow: "Digitale Partnerschaften",
    title: "Momentry",
    text:
      "Mit unserer Reise-App schaffen wir zusätzliche Berührungspunkte innerhalb einer aktiven Reise-Community.",
    services: [
      "Gemeinsame Community-Aktionen",
      "Individuelle Integrationen und App-Konzepte",
    ],
    className: "cooperations-area--app",
    icon: FiSmartphone,
  },
  {
    number: "04",
    eyebrow: "Produkte & Ideen",
    title: "Online-Shop",
    text:
      "Gemeinsam entwickeln wir Produkte und Aktionen, die unsere Reiseangebote sinnvoll ergänzen.",
    services: [
      "Reiseprodukte und Accessoires",
      "Reiseguides, Bundles und Sonderaktionen",
    ],
    className: "cooperations-area--shop",
    icon: FiShoppingBag,
  },
];

/* =========================================================
   GRÜNDE FÜR EINE ZUSAMMENARBEIT
========================================================= */

const cooperationAdvantages = [
  {
    number: "01",
    icon: FiUsers,
    title: "Zwei Generationen",
    text:
      "Als Mama-Tochter-Duo verbinden wir unterschiedliche Perspektiven, Erfahrungen und Zielgruppen.",
  },
  {
    number: "02",
    icon: FiSmartphone,
    title: "Mehr als Social Media",
    text:
      "Mit Website, Momentry, Community und Online-Shop bieten wir mehrere eigene Berührungspunkte.",
  },
  {
    number: "03",
    icon: FiHeart,
    title: "Persönlich statt austauschbar",
    text:
      "Kooperationen werden bei uns nicht einfach platziert, sondern passend in unsere Inhalte und Projekte integriert.",
  },
];

/* =========================================================
   ABLAUF
========================================================= */

const cooperationSteps = [
  {
    number: "01",
    title: "Idee kennenlernen",
    text:
      "Ihr erzählt uns von eurem Unternehmen, eurem Ziel und der geplanten Zusammenarbeit.",
  },
  {
    number: "02",
    title: "Konzept entwickeln",
    text:
      "Gemeinsam entwickeln wir eine Idee, die zur Marke, zu uns und zu unserer Community passt.",
  },
  {
    number: "03",
    title: "Gemeinsam umsetzen",
    text:
      "Wir produzieren den vereinbarten Content oder setzen das gemeinsame Projekt zuverlässig um.",
  },
];

/* =========================================================
   MAIL-BUTTON
========================================================= */

function MailButton({
  className = "",
  compact = false,
}) {
  const subject = encodeURIComponent(
    "Kooperationsanfrage an MamaTochterOnTour"
  );

  const body = encodeURIComponent(
    `Hallo MamaTochterOnTour,

wir interessieren uns für eine mögliche Zusammenarbeit und würden euch gerne unsere Idee vorstellen.

Unternehmen:
Ansprechperson:
Art der Kooperation:
Geplanter Zeitraum:
Budgetrahmen:

Weitere Informationen:`
  );

  return (
    <a
      href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
      className={`cooperations-button cooperations-button--primary ${
        compact
          ? "cooperations-button--compact"
          : ""
      } ${className}`.trim()}
    >
      <FiMail aria-hidden="true" />

      <span>
        {!compact && (
          <small>
            Direkt Kontakt aufnehmen
          </small>
        )}

        <strong>
          Kooperation anfragen
        </strong>
      </span>

      <FiArrowRight
        className="cooperations-button-arrow"
        aria-hidden="true"
      />
    </a>
  );
}

/* =========================================================
   HAUPTKOMPONENTE
========================================================= */

export default function Kooperationen() {
  const prefersReducedMotion =
    useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion
          ? 0
          : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion
          ? 0
          : 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion
          ? 0
          : 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren:
          prefersReducedMotion
            ? 0
            : 0.1,
      },
    },
  };

  return (
    <>
      <Navbar />

      <main className="cooperations-page">
        {/* =================================================
            HERO
        ================================================== */}

        <section className="cooperations-hero">
          <div className="cooperations-container cooperations-hero-grid">
            <motion.div
              className="cooperations-hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                className="cooperations-eyebrow"
                variants={fadeUp}
              >
                Kooperationen
              </motion.span>

              <motion.h1 variants={fadeUp}>
                Gemeinsam Ideen
                <span>
                  zum Leben erwecken.
                </span>
              </motion.h1>

              <motion.p
                className="cooperations-hero-lead"
                variants={fadeUp}
              >
                Von kreativem Social-Media-Content
                über Reisen und Events bis zu
                Partnerschaften innerhalb von
                Momentry und unserem Online-Shop:
                Wir entwickeln Kooperationen, die
                zu beiden Seiten passen.
              </motion.p>

              <motion.div
                className="cooperations-hero-actions"
                variants={fadeUp}
              >
                <MailButton />

                <a
                  href={MEDIA_KIT_URL}
                  download
                  className="cooperations-button cooperations-button--secondary"
                >
                  <FiDownload
                    aria-hidden="true"
                  />

                  <span>
                    <small>
                      Zahlen und Informationen
                    </small>

                    <strong>
                      Media Kit herunterladen
                    </strong>
                  </span>
                </a>
              </motion.div>

            </motion.div>

            {/* Kreative Marken-Collage */}

            {/* Kooperationswelt */}

<motion.div
  className="cooperations-hero-world"
  initial="hidden"
  animate="visible"
  variants={fadeRight}
  aria-label="Kooperationsbereiche von MamaTochterOnTour"
>
  <motion.div
    className="cooperations-world-orbit"
    animate={
      prefersReducedMotion
        ? undefined
        : {
            rotate: 360,
          }
    }
    transition={{
      duration: 45,
      repeat: Infinity,
      ease: "linear",
    }}
    aria-hidden="true"
  />

  <div
    className="cooperations-world-orbit cooperations-world-orbit--inner"
    aria-hidden="true"
  />

  <div
    className="cooperations-world-route cooperations-world-route--one"
    aria-hidden="true"
  />

  <div
    className="cooperations-world-route cooperations-world-route--two"
    aria-hidden="true"
  />

  {/* Zentrale Welt */}

  <motion.div
    className="cooperations-world-center"
    animate={
      prefersReducedMotion
        ? undefined
        : {
            y: [0, -8, 0],
          }
    }
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="cooperations-world-globe">
      <span
        className="cooperations-world-globe-line cooperations-world-globe-line--vertical"
        aria-hidden="true"
      />

      <span
        className="cooperations-world-globe-line cooperations-world-globe-line--horizontal"
        aria-hidden="true"
      />

      <span
        className="cooperations-world-globe-line cooperations-world-globe-line--horizontal-two"
        aria-hidden="true"
      />

      <span
        className="cooperations-world-globe-line cooperations-world-globe-line--diagonal"
        aria-hidden="true"
      />

      <div className="cooperations-world-globe-content">
        <span>MamaTochterOnTour</span>

        <strong>
          Gemeinsam
          <br />
          mehr erreichen.
        </strong>
      </div>
    </div>
  </motion.div>

  {/* Social Media */}

  <motion.div
    className="cooperations-world-point cooperations-world-point--social"
    animate={
      prefersReducedMotion
        ? undefined
        : {
            y: [0, -7, 0],
          }
    }
    transition={{
      duration: 5.2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="cooperations-world-point-icon">
      <FiPlay aria-hidden="true" />
    </span>

    <div>
      <small>Content & Kampagnen</small>
      <strong>Social Media</strong>
    </div>
  </motion.div>

  {/* Reisen und Events */}

  <motion.div
    className="cooperations-world-point cooperations-world-point--travel"
    animate={
      prefersReducedMotion
        ? undefined
        : {
            x: [0, 6, 0],
            y: [0, -4, 0],
          }
    }
    transition={{
      duration: 6.4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="cooperations-world-point-icon">
      <FiMapPin aria-hidden="true" />
    </span>

    <div>
      <small>Vor Ort erleben</small>
      <strong>Events & Reisen</strong>
    </div>
  </motion.div>

  {/* Momentry */}

  <motion.div
    className="cooperations-world-point cooperations-world-point--app"
    animate={
      prefersReducedMotion
        ? undefined
        : {
            x: [0, -6, 0],
            y: [0, 5, 0],
          }
    }
    transition={{
      duration: 5.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="cooperations-world-point-icon">
      <FiSmartphone aria-hidden="true" />
    </span>

    <div>
      <small>Digitale Partnerschaften</small>
      <strong>Momentry</strong>
    </div>
  </motion.div>

  {/* Online-Shop */}

  <motion.div
    className="cooperations-world-point cooperations-world-point--shop"
    animate={
      prefersReducedMotion
        ? undefined
        : {
            y: [0, 7, 0],
          }
    }
    transition={{
      duration: 6.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="cooperations-world-point-icon">
      <FiShoppingBag aria-hidden="true" />
    </span>

    <div>
      <small>Produkte & Ideen</small>
      <strong>Online-Shop</strong>
    </div>
  </motion.div>

  {/* Kleine zusätzliche Elemente */}

  <span
    className="cooperations-world-marker cooperations-world-marker--one"
    aria-hidden="true"
  />

  <span
    className="cooperations-world-marker cooperations-world-marker--two"
    aria-hidden="true"
  />

  <span
    className="cooperations-world-marker cooperations-world-marker--three"
    aria-hidden="true"
  />
</motion.div>
          </div>
        </section>

        {/* =================================================
            STATEMENT
        ================================================== */}

        <section className="cooperations-statement">
          <div className="cooperations-container">
            <motion.div
              className="cooperations-statement-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
            >
              <motion.div
                className="cooperations-statement-heading"
                variants={fadeLeft}
              >
                <span>
                  Was uns wichtig ist
                </span>

                <h2>
                  Authentisch
                  <strong>
                    statt beliebig.
                  </strong>
                </h2>
              </motion.div>

              <motion.div
                className="cooperations-statement-copy"
                variants={fadeRight}
              >
                <p>
                  Eine Zusammenarbeit muss nicht
                  ausschließlich aus dem
                  Reisebereich kommen. Entscheidend
                  ist, dass die Marke, das Produkt
                  und die Idee glaubwürdig zu uns
                  und unserer Community passen.
                </p>

                <p>
                  Deshalb entwickeln wir keine
                  austauschbaren Werbeplatzierungen,
                  sondern individuelle Konzepte,
                  die sich natürlich in unsere
                  Inhalte, Reisen und Projekte
                  einfügen.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            KOOPERATIONSBEREICHE
        ================================================== */}

        <section className="cooperations-possibilities">
          <div className="cooperations-container">
            <motion.div
              className="cooperations-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={staggerContainer}
            >
              <motion.span
                className="cooperations-section-label"
                variants={fadeUp}
              >
                Was gemeinsam möglich ist
              </motion.span>

              <motion.h2 variants={fadeUp}>
                Partnerschaften,
                <span>
                  die wirklich passen.
                </span>
              </motion.h2>

              <motion.p variants={fadeUp}>
                Unsere Kanäle, unsere App und unser
                Online-Shop bieten unterschiedliche
                Möglichkeiten für individuelle und
                langfristige Zusammenarbeit.
              </motion.p>
            </motion.div>

            <motion.div
              className="cooperations-areas"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              variants={staggerContainer}
            >
              {cooperationAreas.map(
                (area) => {
                  const Icon = area.icon;

                  return (
                    <motion.article
                      key={area.number}
                      className={`cooperations-area ${area.className}`}
                      variants={fadeUp}
                    >
                      <div className="cooperations-area-head">
                        <span className="cooperations-area-number">
                          {area.number}
                        </span>

                        <span className="cooperations-area-icon">
                          <Icon
                            aria-hidden="true"
                          />
                        </span>
                      </div>

                      <div className="cooperations-area-content">
                        <span className="cooperations-area-eyebrow">
                          {area.eyebrow}
                        </span>

                        <h3>
                          {area.title}
                        </h3>

                        <p>
                          {area.text}
                        </p>

                        <ul>
                          {area.services.map(
                            (service) => (
                              <li key={service}>
                                <FiArrowRight
                                  aria-hidden="true"
                                />

                                <span>
                                  {service}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div
                        className="cooperations-area-decoration"
                        aria-hidden="true"
                      />
                    </motion.article>
                  );
                }
              )}
            </motion.div>
          </div>
        </section>

        {/* =================================================
            ABSCHLUSS-CTA
        ================================================== */}

        <section className="cooperations-contact">
          <div className="cooperations-container">
            <motion.div
              className="cooperations-contact-card"
              initial={{
                opacity: 0,
                y: prefersReducedMotion
                  ? 0
                  : 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration:
                  prefersReducedMotion
                    ? 0
                    : 0.85,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <div className="cooperations-contact-copy">
                <span>
                  Bereit für etwas Gemeinsames?
                </span>

                <h2>
                  Eine Idee im Kopf?
                  <strong>
                    Lasst uns darüber sprechen.
                  </strong>
                </h2>

                <p>
                  Ob einzelne Kampagne,
                  Reiseprojekt, Produktidee oder
                  langfristige Partnerschaft: Wir
                  freuen uns darauf, eure Idee
                  kennenzulernen.
                </p>

                <div className="cooperations-contact-tags">
                  <span>
                    Individuelle Konzepte
                  </span>

                  <span>
                    Kreative Kampagnen
                  </span>

                  <span>
                    Langfristige Partnerschaften
                  </span>
                </div>
              </div>

              <div className="cooperations-contact-actions">
                <MailButton compact />

                <a
                  href={MEDIA_KIT_URL}
                  download
                  className="cooperations-button cooperations-button--contact-secondary"
                >
                  <FiDownload
                    aria-hidden="true"
                  />

                  <strong>
                    Media Kit herunterladen
                  </strong>

                  <FiArrowRight
                    className="cooperations-button-arrow"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}