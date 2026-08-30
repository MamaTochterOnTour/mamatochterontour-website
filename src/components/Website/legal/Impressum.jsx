import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiBriefcase,
  FiCheckCircle,
  FiFileText,
  FiHash,
  FiHome,
  FiMail,
  FiMapPin,
  FiPenTool,
  FiUser,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Impressum.css";


/* =========================================================
   ANIMATION
========================================================= */

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 34,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}


/* =========================================================
   IMPRESSUM
========================================================= */

export default function Impressum() {
  return (
    <>
      <Navbar />

      <main className="impressum-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="impressum-hero">

          <div className="impressum-hero-glow impressum-hero-glow-green" />
          <div className="impressum-hero-glow impressum-hero-glow-purple" />

          <div className="impressum-container impressum-hero-inner">

            <AnimatedSection className="impressum-hero-content">

              <div className="impressum-eyebrow impressum-eyebrow-light">
                <span className="impressum-eyebrow-line" />
                <span>Rechtliches</span>
              </div>

              <h1 className="impressum-hero-title">
                Unser
                <span>Impressum.</span>
              </h1>

              <p className="impressum-hero-text">
                Hier findest du die gesetzlich vorgeschriebenen
                Angaben zu MamaTochterOnTour sowie die
                Möglichkeiten, uns direkt zu kontaktieren.
              </p>

              <div className="impressum-hero-pills">

                <div className="impressum-hero-pill">
                  <FiUser />
                  <span>Jennifer Weinreich</span>
                </div>

                <div className="impressum-hero-pill">
                  <FiBriefcase />
                  <span>Einzelunternehmen</span>
                </div>

                <div className="impressum-hero-pill">
                  <FiMail />
                  <span>Direkt erreichbar</span>
                </div>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="impressum-intro">

          <div className="impressum-container">

            <AnimatedSection className="impressum-intro-grid">

              <div className="impressum-intro-left">

                <div className="impressum-eyebrow impressum-eyebrow-dark">
                  <span className="impressum-eyebrow-line" />
                  <span>Anbieterkennzeichnung</span>
                </div>

                <h2>
                  Transparent.
                  <span>Direkt erreichbar.</span>
                </h2>

              </div>

              <div className="impressum-intro-right">

                <p>
                  MamaTochterOnTour wird als Einzelunternehmen
                  von Jennifer Weinreich betrieben.
                </p>

                <p>
                  Auf dieser Seite findest du unsere
                  Anbieterangaben, Kontaktmöglichkeiten und
                  weitere rechtlich relevante Informationen.
                </p>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="impressum-content-section">

          <div className="impressum-container">

            <div className="impressum-card-grid">


              {/* 01 */}

              <AnimatedSection className="impressum-card impressum-card-wide">

                <div className="impressum-card-number">
                  01
                </div>

                <div className="impressum-card-icon">
                  <FiHome />
                </div>

                <h3>
                  Angaben gemäß § 5 DDG
                </h3>

                <div className="impressum-business-card">

                  <div className="impressum-business-logo">
                    <FiUser />
                  </div>

                  <div>

                    <span className="impressum-business-label">
                      Diensteanbieterin
                    </span>

                    <strong>
                      Jennifer Weinreich
                    </strong>

                    <span>
                      MamaTochterOnTour
                    </span>

                  </div>

                </div>

                <div className="impressum-address">

                  <div className="impressum-address-row">

                    <FiMapPin />

                    <div>
                      <span>
                        Stettiner Straße 41
                      </span>

                      <span>
                        35410 Hungen
                      </span>

                      <span>
                        Deutschland
                      </span>
                    </div>

                  </div>

                </div>

                <p>
                  MamaTochterOnTour wird als Einzelunternehmen
                  betrieben.
                </p>

              </AnimatedSection>


              {/* 02 */}

              <AnimatedSection
                className="impressum-card"
                delay={0.03}
              >

                <div className="impressum-card-number">
                  02
                </div>

                <div className="impressum-card-icon">
                  <FiMail />
                </div>

                <h3>
                  Kontakt
                </h3>

                <p>
  Für Fragen zu unserer Website, unserem
  Onlineshop, unseren Reiseguides, Momentry by
  MamaTochterOnTour, deinem Benutzerkonto,
  Premium-Abonnements oder deiner Bestellung
  kannst du uns per E-Mail kontaktieren.
</p>

                <a
                  href="mailto:mamatochterontour@outlook.de"
                  className="impressum-contact-mail"
                >
                  <FiMail />

                  <span>
                    mamatochterontour@outlook.de
                  </span>
                </a>

                <p className="impressum-small-text">
                  E-Mail-Anfragen werden regelmäßig bearbeitet.
                </p>

              </AnimatedSection>


              {/* 03 */}

              <AnimatedSection
                className="impressum-card"
                delay={0.05}
              >

                <div className="impressum-card-number">
                  03
                </div>

                <div className="impressum-card-icon">
                  <FiHash />
                </div>

                <h3>
                  Umsatzsteuer
                </h3>

                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß
                  § 27a Umsatzsteuergesetz:
                </p>

                <div className="impressum-tax-number">
                  DE441919331
                </div>

              </AnimatedSection>


              {/* 04 */}

              <AnimatedSection className="impressum-card impressum-card-wide impressum-card-accent">

                <div className="impressum-card-number">
                  04
                </div>

                <div className="impressum-card-icon">
                  <FiPenTool />
                </div>

                <h3>
                  Verantwortlich für redaktionelle Inhalte
                </h3>

                <p>
                  Verantwortlich für journalistisch-redaktionelle
                  Inhalte gemäß § 18 Abs. 2 Medienstaatsvertrag
                  (MStV):
                </p>

                <div className="impressum-editorial-box">

                  <div className="impressum-editorial-icon">
                    <FiUser />
                  </div>

                  <div>

                    <strong>
                      Jennifer Weinreich
                    </strong>

                    <span>
                      Stettiner Straße 41
                    </span>

                    <span>
                      35410 Hungen
                    </span>

                    <span>
                      Deutschland
                    </span>

                  </div>

                </div>

              </AnimatedSection>


              {/* 05 */}

              <AnimatedSection className="impressum-card">

                <div className="impressum-card-number">
                  05
                </div>

                <div className="impressum-card-icon">
                  <FiFileText />
                </div>

                <h3>
                  Register & Aufsicht
                </h3>

                <p>
                  Es besteht keine Eintragung in einem
                  Handels-, Vereins-, Partnerschafts- oder
                  Genossenschaftsregister.
                </p>

                <p>
                  Die über MamaTochterOnTour ausgeübte Tätigkeit
                  bedarf keiner besonderen behördlichen
                  Zulassung.
                </p>

                <div className="impressum-status">

                  <FiCheckCircle />

                  <span>
                    Keine Register- oder Aufsichtsangabe erforderlich
                  </span>

                </div>

              </AnimatedSection>


              {/* 06 */}

              <AnimatedSection
                className="impressum-card"
                delay={0.03}
              >

                <div className="impressum-card-number">
                  06
                </div>

                <div className="impressum-card-icon">
                  <FiBriefcase />
                </div>

                <h3>
                  Weitere rechtliche Informationen
                </h3>

                <p>
  Weitere Informationen zu Bestellungen,
  digitalen Reiseguides, der Nutzung von
  Momentry by MamaTochterOnTour sowie deinen
  Rechten als Nutzerin, Nutzer, Kundin oder
  Kunde findest du in unseren rechtlichen
  Hinweisen.
</p>

                <div className="impressum-legal-links">

                  <Link to="/agb">
                    AGB ansehen
                    <FiFileText />
                  </Link>

                  <Link to="/widerruf">
                    Widerrufsbelehrung
                    <FiFileText />
                  </Link>

                  <Link to="/datenschutz">
                    Datenschutz
                    <FiFileText />
                  </Link>

                </div>

              </AnimatedSection>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section className="impressum-contact">

          <div className="impressum-contact-glow impressum-contact-glow-green" />
          <div className="impressum-contact-glow impressum-contact-glow-purple" />

          <div className="impressum-container">

            <AnimatedSection className="impressum-contact-card">

              <div>

                <div className="impressum-eyebrow impressum-eyebrow-light">
                  <span className="impressum-eyebrow-line" />
                  <span>Noch eine Frage?</span>
                </div>

                <h2>
                  Schreib uns
                  <span>einfach.</span>
                </h2>

                <p>
  Wenn du Fragen zu MamaTochterOnTour, unserem
  Onlineshop, Momentry by MamaTochterOnTour,
  deinem Benutzerkonto oder einer Bestellung
  hast, erreichst du uns über unsere
  Kontaktseite.
</p>

              </div>

              <Link
                to="/kontakt"
                className="impressum-contact-button"
              >
                Kontakt aufnehmen
                <FiMail />
              </Link>

            </AnimatedSection>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}