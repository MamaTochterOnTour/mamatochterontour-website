import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiBookOpen,
  FiMail,
  FiShoppingBag,
  FiSmartphone,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import shopProducts from
  "../../../data/Onlineshop/shopProducts";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Home.css";

import youtubeMallorcaThumbnail from
  "../../../assets/images/home/youtube-mallorca.jpg";

import youtubeCruiseThumbnail from
  "../../../assets/images/home/youtube-kreuzfahrt.jpg";

import instagramMallorcaPreview from
  "../../../assets/videos/instagram-mallorca.mp4";

import tiktokColognePreview from
  "../../../assets/videos/tiktok-koeln.mp4";

const VIDEO_ITEMS = [
  {
    id: "youtube-mallorca",
    type: "image",
    platform: "YouTube",

    image:
      youtubeMallorcaThumbnail,

    url:
      "https://youtube.com/@mamatochterontour?si=4BaCtO0z2mOtJq1d",

  },

  {
    id: "youtube-kreuzfahrt",
    type: "image",
    platform: "YouTube",

    image:
      youtubeCruiseThumbnail,

    url:
      "https://youtube.com/@mamatochterontour?si=4BaCtO0z2mOtJq1d",

  },

  {
    id: "instagram-mallorca",
    type: "video",
    platform: "Instagram",

    preview:
      instagramMallorcaPreview,

    url:
      "https://www.instagram.com/mamatochterontour?igsh=MXkybTVuNnBuNHowaQ%3D%3D&utm_source=qr",

  },

  {
    id: "tiktok-koeln",
    type: "video",
    platform: "TikTok",

    preview:
      tiktokColognePreview,

    url:
      "https://www.tiktok.com/@mamatochterontour?_r=1&_t=ZG-98enOr0BhC4",

  },
];

const HOME_GUIDE_IDS = [
  "mallorca-insider-guide",
  "kreuzfahrt-norwegens-fjorde-ab-hamburg",
];

const HOME_GUIDES = HOME_GUIDE_IDS
  .map((id) =>
    shopProducts.find(
      (product) => product.id === id
    )
  )
  .filter(Boolean);

/* =========================================================
   HILFSKOMPONENTEN
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
          : 38,
      }}
      whileInView={{
        opacity: 1,

        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
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

function SectionLabel({
  children,
  light = false,
}) {
  return (
    <span
      className={`home-section-label ${
        light
          ? "home-section-label--light"
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

function HomeHero() {
  const prefersReducedMotion =
    useReducedMotion();

  return (
    <section className="home-hero">
      <div className="home-hero__media">
       <video
  className="home-hero__video home-hero__video--landscape"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source
    src="/videos/hero-travel-h264.mp4"
    type="video/mp4"
  />
</video>

<video
  className="home-hero__video home-hero__video--portrait"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source
    src="/videos/hero-travel-mobile-h264.mp4"
    type="video/mp4"
  />
</video>

        <div className="home-hero__overlay" />

        <div
          className="home-hero__grain"
          aria-hidden="true"
        />

        <div
          className="home-hero__light home-hero__light--one"
          aria-hidden="true"
        />

        <div
          className="home-hero__light home-hero__light--two"
          aria-hidden="true"
        />
      </div>

      <div className="home-container home-hero__layout">
        <motion.div
          className="home-hero__content"
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
                : 1,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <span className="home-hero__eyebrow">
            MamaTochterOnTour
          </span>

          <h1>
            Entdecke
            <span>
              die Welt.
            </span>

            <strong>
              Bereise sie gemeinsam.
            </strong>
          </h1>

          <p className="home-hero__lead">
            Reiseerlebnisse, persönliche
            Empfehlungen, unsere Reise-App
            Momentry by MamaTochterOnTour und digitale Reiseguides –
            entwickelt von einem
            Mama-Tochter-Duo, das die Welt
            gemeinsam entdeckt.
          </p>

          <div className="home-hero__actions">
  <Link
    to="/momentry"
    className="home-button home-button--app"
  >
    <FiSmartphone
      aria-hidden="true"
    />

    <span>
      <small>
        Reisen gemeinsam planen
      </small>

      <strong>
        Momentry entdecken
      </strong>
    </span>

    <FiArrowRight
      className="home-button__arrow"
      aria-hidden="true"
    />
  </Link>

  <Link
    to="/kooperationen"
    className="home-button home-button--glass"
  >
    <FiUsers
      aria-hidden="true"
    />

    <span>
      <small>
        Für Marken & Partner
      </small>

      <strong>
        Mit uns zusammenarbeiten
      </strong>
    </span>

    <FiArrowRight
      className="home-button__arrow"
      aria-hidden="true"
    />
  </Link>
</div>

          <div className="home-hero__tags">
            <span>
              Persönliche Reiseerlebnisse
            </span>

            <span>
              Reise-App
            </span>

            <span>
              Digitale Reiseguides
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   STATEMENT
========================================================= */

function HomeStatement() {
  return (
    <section className="home-statement">
      <div className="home-container">
        <div className="home-statement__grid">
          <AnimatedSection className="home-statement__heading">
            <span>
              Unsere Art zu reisen
            </span>

            <h2>
              Reisen ist mehr
              <strong>
                als nur Urlaub.
              </strong>
            </h2>
          </AnimatedSection>

          <AnimatedSection
            className="home-statement__copy"
            delay={0.12}
          >
            <p>
              Eine Reise beginnt nicht erst am
              Flughafen und endet nicht mit dem
              Rückflug. Sie beginnt mit einer
              Idee, wächst während der Planung
              und bleibt durch gemeinsame
              Erinnerungen lebendig.
            </p>

            <p>
  Genau deshalb verbinden wir
  persönliche Reiseerlebnisse mit
  unserer Reise-App Momentry by MamaTochterOnTour,
  ehrlichem Content und einer
  Community, die Reisen gemeinsam
  plant und Erinnerungen teilt.
  Unsere digitalen Reiseguides
  entstehen dabei direkt aus
  unseren eigenen Erfahrungen.
</p>

            <div className="home-statement__signature">
              <span>
                Jenny & Katharina
              </span>

              <small>
                MamaTochterOnTour
              </small>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   VIDEOS
========================================================= */

function VideoWorld() {
  const youtubeVideos =
    VIDEO_ITEMS.filter(
      (video) =>
        video.platform === "YouTube"
    );

  const socialVideos =
    VIDEO_ITEMS.filter(
      (video) =>
        video.platform !== "YouTube"
    );

  function renderVideoCard(
    video,
    index
  ) {
    return (
      <AnimatedSection
        key={video.id}
        className={`home-video-card home-video-card--${video.type} home-video-card--${video.platform.toLowerCase()}`}
        delay={index * 0.08}
      >
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${video.platform}-Beitrag öffnen`}
        >
          {video.type === "video" ? (
            <video
              className="home-video-card__media"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source
                src={video.preview}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              className="home-video-card__media"
              src={video.image}
              alt={`${video.platform}-Video von MamaTochterOnTour`}
              loading="lazy"
            />
          )}

          <div className="home-video-card__overlay" />

          <div className="home-video-card__content">
            

            <span className="home-video-card__link">
              Auf {video.platform} ansehen

              <FiArrowRight
                aria-hidden="true"
              />
            </span>
          </div>
        </a>
      </AnimatedSection>
    );
  }

  return (
    <section
      id="videos"
      className="home-videos"
    >
      <div className="home-container">
        <AnimatedSection className="home-videos__heading">
          <SectionLabel light>
  Unterwegs mit uns
</SectionLabel>

          <h2>
            Nicht nur ansehen.
            <span>
              Mitreisen.
            </span>
          </h2>

          <p>
            Unsere Reisen leben in Videos weiter.
            Auf TikTok, Instagram und YouTube
            nehmen wir dich mit hinter die
            Kulissen und direkt an besondere
            Orte.
          </p>
        </AnimatedSection>

        <div className="home-video-layout">
          <div className="home-video-youtube-column">
            {youtubeVideos.map(
              (video, index) =>
                renderVideoCard(
                  video,
                  index
                )
            )}
          </div>

          <div className="home-video-social-column">
            {socialVideos.map(
              (video, index) =>
                renderVideoCard(
                  video,
                  index + youtubeVideos.length
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SHOP
========================================================= */

function ShopExperience() {
  return (
    <section className="home-shop">

      <div className="home-container home-shop__layout">
        <AnimatedSection className="home-shop__content">
          <SectionLabel>
            Reiseguides
          </SectionLabel>

          <h2>
            Unsere Erfahrungen.
            <span>
              Für deine Reise.
            </span>
          </h2>

          <p>
            In unseren digitalen Reiseguides
            sammeln wir persönliche Tipps,
            ehrliche Erfahrungen und besondere
            Orte aus unseren eigenen Reisen.
          </p>

          <div className="home-shop__features">
            <div>
              <FiStar aria-hidden="true" />

              <span>
                Von uns selbst erlebt und getestet
              </span>
            </div>

            <div>
              <FiBookOpen aria-hidden="true" />

              <span>
                Persönlich von uns erstellt
              </span>
            </div>

            <div>
              <FiSmartphone aria-hidden="true" />

              <span>
                Direkt digital verfügbar
              </span>
            </div>
          </div>

                    <a
            href="#newsletter"
            className="home-shop__newsletter-benefit"
            aria-label="Zur Newsletter-Anmeldung"
          >
            <FiMail
              aria-hidden="true"
            />

            <span>
              10 % Willkommensrabatt
              bei Newsletter-Anmeldung
            </span>

            <FiArrowRight
              aria-hidden="true"
            />
          </a>

          <Link
            to="/shop"
            className="home-shop__button"
          >
            <span className="home-shop__button-icon">
              <FiShoppingBag aria-hidden="true" />
            </span>

            <span className="home-shop__button-copy">
              <small>
                Alle Reiseguides entdecken
              </small>

              <strong>
                Zum Online-Shop
              </strong>
            </span>

            <span className="home-shop__button-arrow">
              <FiArrowRight aria-hidden="true" />
            </span>
          </Link>
        </AnimatedSection>

        <AnimatedSection
          className="home-shop__visual"
          delay={0.12}
        >
          <div className="home-shop__guides">
            {HOME_GUIDES.map(
              (guide, index) => (
                <Link
                  key={guide.id}
                  to={`/shop/reiseguides/${guide.slug}`}
                  className={`home-shop-guide ${
                    index === 1
                      ? "home-shop-guide--second"
                      : ""
                  }`}
                  aria-label={`${guide.title} ansehen`}
                >
                  <div className="home-shop-guide__image">
                    <img
                      src={guide.imageUrl}
                      alt={guide.title}
                      loading="lazy"
                    />

                  </div>

                  <div className="home-shop-guide__content">
                    <span className="home-shop-guide__category">
                      {guide.categoryLabel}
                    </span>

                    <h3>
                      {guide.title}
                    </h3>

                    <div className="home-shop-guide__bottom">
                      <span>
                        Guide ansehen

                        <FiArrowRight
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* =========================================================
   ABSCHLUSS / KOOPERATION
========================================================= */

function HomeFinalCTA() {
  return (
    <section className="home-final-cta">
      <div className="home-container">
        <AnimatedSection className="home-final-cta__card">
          <div className="home-final-cta__content">
            <SectionLabel light>
  Gemeinsam etwas bewegen
</SectionLabel>

            <h2>
              Lasst uns gemeinsam
              <span>
                etwas Besonderes entwickeln.
              </span>
            </h2>

            <p>
  Wir freuen uns auf kreative
  Kooperationen mit Marken und Partnern,
  deren Ideen und Werte authentisch zu
  uns, unserem Alltag und unserer
  Community passen – als einzelne
  Kampagne oder langfristige
  Zusammenarbeit.
</p>
          </div>

          <div className="home-final-cta__actions">
            <Link
              to="/kooperationen"
              className="home-final-cta__button home-final-cta__button--primary"
            >
              <FiUsers aria-hidden="true" />

              <span>
                Kooperation anfragen
              </span>

              <FiArrowRight aria-hidden="true" />
            </Link>

            <Link
              to="/ueber-uns"
              className="home-final-cta__button home-final-cta__button--secondary"
            >
              <span>
                Mehr über uns
              </span>

              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* =========================================================
   HOMEPAGE
========================================================= */

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <HomeHero />

<HomeStatement />

<ShopExperience />

<VideoWorld />

<HomeFinalCTA />
      </main>

      <Footer />
    </>
  );
}

export default Home;