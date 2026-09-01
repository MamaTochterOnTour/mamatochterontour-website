import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiClock,
  FiFileText,
  FiMonitor,
  FiShield,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Nutzungsbedingungen.css";


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
      animate={{
        opacity: 1,
        y: 0,
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
   NUTZUNGSBEDINGUNGEN
========================================================= */

export default function Nutzungsbedingungen() {
  return (
    <>
      <Navbar />

      <main className="terms-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="terms-hero">

          <div className="terms-hero-glow terms-hero-glow-green" />
          <div className="terms-hero-glow terms-hero-glow-purple" />

          <div className="terms-container">

            <AnimatedSection className="terms-hero-content">

              <div className="terms-eyebrow">
                <span className="terms-eyebrow-line" />
                <span>Rechtliches</span>
              </div>

              <h1 className="terms-hero-title">
                Unsere
                <span>Nutzungsbedingungen.</span>
              </h1>

              <p className="terms-hero-text">
                Die vollständigen Nutzungsbedingungen für
                Momentry by MamaTochterOnTour werden hier
                veröffentlicht, sobald unsere Web-App
                verfügbar ist.
              </p>

              <div className="terms-hero-pills">

                <div className="terms-hero-pill">
                  <FiFileText />
                  <span>Nutzungsbedingungen</span>
                </div>

                <div className="terms-hero-pill">
                  <FiShield />
                  <span>Transparent & verständlich</span>
                </div>

                <div className="terms-hero-pill">
                  <FiMonitor />
                  <span>Momentry Web-App</span>
                </div>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            COMING SOON
        ===================================================== */}

        <section className="terms-coming">

          <div className="terms-container">

            <AnimatedSection
              className="terms-coming-card"
              delay={0.05}
            >

              <div className="terms-coming-icon">
                <FiClock />
              </div>

              <div className="terms-coming-content">

                <div className="terms-coming-label">
                  Demnächst verfügbar
                </div>

                <h2>
                  Diese Seite
                  <span>folgt in Kürze.</span>
                </h2>

                <p>
                  Unsere Nutzungsbedingungen werden aktuell
                  für die Nutzung von Momentry by
                  MamaTochterOnTour vorbereitet.
                </p>

                <p>
                  Sobald die Momentry Web-App verfügbar ist,
                  findest du hier alle Informationen zu den
                  Bedingungen für die Nutzung unserer
                  Plattform und ihrer Funktionen.
                </p>

              </div>

              <div
                className="terms-coming-status"
                aria-label="Nutzungsbedingungen werden vorbereitet"
              >
                <span className="terms-coming-status-dot" />
                <span>In Vorbereitung</span>
              </div>

            </AnimatedSection>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}