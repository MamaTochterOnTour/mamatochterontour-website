import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./NotFound.css";


/* =========================================================
   EMPFOHLENE SEITEN
========================================================= */

const NOT_FOUND_LINKS = [
  {
    number: "01",
    title: "Startseite",
    to: "/",
  },
  {
    number: "02",
    title: "Über uns",
    to: "/ueber-uns",
  },
  {
    number: "03",
    title: "Momentry entdecken",
    to: "/momentry",
  },
  {
    number: "04",
    title: "Reiseguides ansehen",
    to: "/shop/reiseguides",
  },
];


/* =========================================================
   404-SEITE
========================================================= */

function NotFound() {
  const prefersReducedMotion =
    useReducedMotion();

  useEffect(() => {
    const previousTitle =
      document.title;

    document.title =
      "Seite nicht gefunden | MamaTochterOnTour";

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    return () => {
      document.title =
        previousTitle;
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="not-found-page">
        <section className="not-found-hero">
          <div
            className="not-found-hero__glow not-found-hero__glow--green"
            aria-hidden="true"
          />

          <div
            className="not-found-hero__glow not-found-hero__glow--purple"
            aria-hidden="true"
          />

          <div className="not-found-container not-found-hero__layout">
            <motion.div
              className="not-found-hero__content"
              initial={{
                opacity: 0,
                y: prefersReducedMotion
                  ? 0
                  : 32,
              }}
              animate={{
                opacity: 1,
                y: 0,
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
              <span className="not-found-hero__eyebrow">
                Fehler 404
              </span>

              <span
                className="not-found-hero__number"
                aria-hidden="true"
              >
                404
              </span>

              <h1>
                Diese Seite ist
                <span>
                  wohl schon weitergereist.
                </span>
              </h1>

              <p className="not-found-hero__lead">
                Die gesuchte Seite wurde
                möglicherweise verschoben,
                gelöscht oder die Adresse
                wurde nicht richtig
                eingegeben.
              </p>

              <Link
                to="/"
                className="not-found-hero__button"
              >
                <FiHome
                  aria-hidden="true"
                />

                <span>
                  Zurück zur Startseite
                </span>

                <FiArrowRight
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.nav
              className="not-found-routes"
              aria-label="Empfohlene Seiten"
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
              <span className="not-found-routes__label">
                Vielleicht suchst du das
              </span>

              <div className="not-found-routes__list">
                {NOT_FOUND_LINKS.map(
                  (item) => (
                    <Link
                      key={item.number}
                      to={item.to}
                      className="not-found-routes__item"
                    >
                      <strong>
                        {item.number}
                      </strong>

                      <span>
                        {item.title}
                      </span>

                      <FiArrowRight
                        aria-hidden="true"
                      />
                    </Link>
                  )
                )}
              </div>
            </motion.nav>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default NotFound;