import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import ComingSoonModal from "../comingsoon/ComingSoonModal";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Home.css";

function Home() {
  const heroRef = useRef(null);

  const [comingSoonOpen, setComingSoonOpen] =
    useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion
      ? [1, 1]
      : [1.03, 1.14]
  );

  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion
      ? ["0%", "0%"]
      : ["0%", "3%"]
  );

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.72, 0.35]
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0.72, 1]
  );

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion
      ? [0, 0]
      : [0, -120]
  );

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9],
    [1, 0.8, 0]
  );

  const bottomY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion
      ? [0, 0]
      : [0, -55]
  );

  const bottomOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.65, 0]
  );

  return (
    <>
      <Navbar />

      <main>
        <section
          className="hero"
          id="top"
          ref={heroRef}
        >
          <motion.video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            style={{
              scale: videoScale,
              y: videoY,
              opacity: videoOpacity,
            }}
          >
            <source
              src="/videos/hero-travel.mp4"
              type="video/mp4"
            />
          </motion.video>

          <motion.div
            className="hero-overlay"
            style={{
              opacity: overlayOpacity,
            }}
          />

          <div className="hero-noise" />

          <motion.div
            className="hero-glow hero-glow-green"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, 35, 0],
                    y: [0, 25, 0],
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="hero-glow hero-glow-purple"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, -30, 0],
                    y: [0, -22, 0],
                    scale: [1, 1.1, 1],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="container hero-content">
            <motion.div
              className="hero-copy"
              style={{
                y: copyY,
                opacity: copyOpacity,
              }}
            >
              <div className="hero-title-wrap">
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 55,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 1.1,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  Gemeinsam die Welt
                  <span>entdecken.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.48,
                  duration: 0.9,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                Wir sind Jenny und Katharina – ein
                Reise-Mama-Tochter-Duo mit einer
                Leidenschaft für besondere Reiseziele,
                Kreuzfahrten und unsere eigene Reise-App
                Momentry by MamaTochterOnTour.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.68,
                  duration: 0.9,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <Link
                  to="/momentry"
                  className="hero-button hero-button-primary"
                >
                  Momentry entdecken
                </Link>

                <button
  type="button"
  className="hero-button hero-button-secondary"
  onClick={() => setComingSoonOpen(true)}
>
  Reiseguides entdecken
</button>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-bottom"
              style={{
                y: bottomY,
                opacity: bottomOpacity,
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
                duration: 1,
              }}
            >
              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>11</strong>
                  <span>Kreuzfahrten</span>
                </div>

                <div className="hero-stat">
                  <strong>3</strong>
                  <span>
                    Roadtrips durch Amerika
                  </span>
                </div>

                <div className="hero-stat">
                  <strong>∞</strong>
                  <span>Mallorca-Momente</span>
                </div>

                <div className="hero-stat">
                  <strong>∞</strong>
                  <span>Städtereisen</span>
                </div>

                <div className="hero-stat">
                  <strong>∞</strong>
                  <span>
                    Weitere Reisemomente
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hero-bottom-fade" />
        </section>
      </main>

            <Footer />

      <ComingSoonModal
        open={comingSoonOpen}
        type="shop"
        onClose={() =>
          setComingSoonOpen(false)
        }
      />
    </>
  );
}

export default Home;