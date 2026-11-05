import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiArrowRight,
  FiCamera,
  FiCode,
  FiCompass,
  FiHeart,
  FiMessageCircle,
  FiPlus,
  FiShoppingBag,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./About.css";


/* =========================================================
   ENTSTEHUNG
========================================================= */

const STORY_STEPS = [
  {
    number: "01",
    title:
      "Gemeinsame Reisen",
    text:
      "Angefangen hat alles mit unserer gemeinsamen Freude am Reisen und dem Wunsch, Erinnerungen, Erfahrungen und ehrliche Empfehlungen mit anderen zu teilen.",
  },

  {
    number: "02",
    title:
      "Eine wachsende Community",
    text:
      "Aus einzelnen Reiseeinblicken wurde nach und nach MamaTochterOnTour – eine Community, die unsere Reisen, unseren Alltag und unsere Projekte begleitet.",
  },

  {
    number: "03",
    title:
      "Eigene digitale Projekte",
    text:
      "Mit Momentry by MamaTochterOnTour und unserem Online-Shop ist aus dem Social-Media-Kanal eine vielseitige Reisewelt mit eigenen Produkten und Angeboten entstanden.",
  },

  {
    number: "04",
    title:
      "Noch lange nicht fertig",
    text:
      "Wir entwickeln MamaTochterOnTour kontinuierlich weiter, probieren neue Ideen aus und nehmen unsere Community dabei so ehrlich wie möglich mit.",
  },
];


/* =========================================================
   PROJEKTE
========================================================= */

const PROJECTS = [
  {
    id: "content",
    icon: FiCamera,
    eyebrow:
      "Instagram, TikTok & YouTube",
    title:
      "Reisen miterleben",
    text:
      "Auf unseren Social-Media-Kanälen teilen wir Reiseerlebnisse, persönliche Einblicke, Empfehlungen und alles, was unterwegs wirklich passiert.",
  },

  {
    id: "momentry",
    icon: FiSmartphone,
    eyebrow:
      "Unsere Reise-App",
    title:
      "Momentry by MamaTochterOnTour",
    text:
      "Momentry by MamaTochterOnTour begleitet Reisende bei der Planung, während der Reise und beim Festhalten ihrer persönlichen Erinnerungen.",
  },

  {
    id: "shop",
    icon: FiShoppingBag,
    eyebrow:
      "Reiseguides & digitale Produkte",
    title:
      "Unser Online-Shop",
    text:
      "In unserem Online-Shop findest du digitale Reiseguides, die aus unseren eigenen Reisen entstehen, sowie weitere Produkte und Ideen rund ums Reisen.",
  },
];


/* =========================================================
   Q&A
========================================================= */

const FAQ_ITEMS = [
  {
    question:
      "Wer steckt hinter MamaTochterOnTour?",
    answer:
      "Hinter MamaTochterOnTour stehen wir – Jenny und Katharina, ein Mama-Tochter-Duo mit einer gemeinsamen Leidenschaft für Reisen, digitale Projekte und ehrlichen Content.",
  },

  {
    question:
      "Wie entstehen eure Reiseguides?",
    answer:
      "Unsere Reiseguides basieren auf unseren eigenen Reisen. Wir sammeln gemeinsam Erfahrungen, Orte, Ausflugsziele und persönliche Empfehlungen. Anschließend werden diese Informationen strukturiert und als digitaler Reiseguide aufbereitet.",
  },

  {
    question:
      "Was ist Momentry by MamaTochterOnTour?",
    answer:
      "Momentry by MamaTochterOnTour ist unsere eigene Reise-App. Sie soll Reisende bei der Planung begleiten und dabei helfen, Erlebnisse, Erinnerungen und besondere Momente rund um eine Reise festzuhalten.",
  },

  {
    question:
      "Ist bei euch wirklich immer alles perfekt geplant?",
    answer:
      "Ganz und gar nicht. Bei uns gehören spontane Planänderungen, kleine Pannen, unterschiedliche Meinungen und eine gute Portion Chaos genauso dazu wie die schönen Reisemomente. Genau das möchten wir auch ehrlich zeigen.",
  },

  {
    question:
      "Wo kann man eure Reisen verfolgen?",
    answer:
      "Unsere Reisen und unseren Alltag teilen wir vor allem auf Instagram, TikTok und YouTube. Dort nehmen wir unsere Community mit und zeigen nicht nur Reiseziele, sondern auch das, was hinter den Kulissen passiert.",
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
          : 32,
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
      className={`about-section-label ${
        light
          ? "about-section-label--light"
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

function AboutHero() {
  const prefersReducedMotion =
    useReducedMotion();

  return (
    <section className="about-hero">
      <div
        className="about-hero__glow about-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="about-hero__glow about-hero__glow--two"
        aria-hidden="true"
      />

      <div className="about-container about-hero__layout">
        <motion.div
          className="about-hero__content"
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
          <span className="about-hero__eyebrow">
            Über uns
          </span>

          <h1>
            Zwei Generationen.
            <span>
              Eine Reisewelt.
            </span>
          </h1>

          <p className="about-hero__lead">
            Wir sind Jenny und Katharina –
            ein Mama-Tochter-Duo, das
            gemeinsame Reisen, ehrliche
            Einblicke und digitale Ideen
            miteinander verbindet.
          </p>

          <div className="about-hero__actions">
            <a
              href="#unsere-geschichte"
              className="about-button about-button--primary"
            >
              <FiHeart
                aria-hidden="true"
              />

              <span>
                Unsere Geschichte
              </span>

              <FiArrowRight
                aria-hidden="true"
              />
            </a>

            <Link
              to="/kontakt"
              className="about-button about-button--secondary"
            >
              <FiMessageCircle
                aria-hidden="true"
              />

              <span>
                Kontakt aufnehmen
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="about-hero__facts"
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
          <span className="about-hero__facts-label">
            Das sind wir
          </span>

          <div className="about-hero__fact">
            <strong>
              01
            </strong>

            <span>
              Mama & Tochter
            </span>
          </div>

          <div className="about-hero__fact">
            <strong>
              02
            </strong>

            <span>
              Zwei Generationen
            </span>
          </div>

          <div className="about-hero__fact">
            <strong>
              03
            </strong>

            <span>
              Eine gemeinsame Marke
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* =========================================================
   VORSTELLUNG
========================================================= */

function AboutIntro() {
  return (
    <section className="about-intro">
      <div className="about-container">
        <AnimatedSection>
          <SectionLabel>
            MamaTochterOnTour
          </SectionLabel>

          <div className="about-intro__grid">
            <h2>
              Mehr als nur
              <span>
                ein Reisekanal.
              </span>
            </h2>

            <div className="about-intro__copy">
              <p>
                MamaTochterOnTour verbindet
                unsere gemeinsamen Reisen
                mit persönlichen Geschichten,
                ehrlichen Empfehlungen und
                digitalen Projekten.
              </p>

              <p>
                Unsere Community kann unsere
                Reisen auf Instagram, TikTok
                und YouTube miterleben.
                Gleichzeitig entwickeln wir
                mit Momentry by MamaTochterOnTour und unserem Online-Shop eigene Angebote rund ums Reisen.
              </p>

              <p>
                Dabei möchten wir nicht so tun,
                als wäre bei uns immer alles
                perfekt. Wir sind unterschiedlich,
                manchmal chaotisch und nicht
                immer einer Meinung – aber genau
                das gehört für uns dazu.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* =========================================================
   GESCHICHTE
========================================================= */

function AboutStory() {
  return (
    <section
      id="unsere-geschichte"
      className="about-story"
    >
      <div className="about-container">
        <AnimatedSection className="about-story__heading">
          <SectionLabel light>
            Unsere Geschichte
          </SectionLabel>

          <h2>
            Wie aus Reisen
            <span>
              eine Marke wurde.
            </span>
          </h2>

          <p>
            MamaTochterOnTour ist nicht
            an einem Tag entstanden.
            Die Marke ist mit unseren
            Reisen, unserer Community
            und unseren Ideen gewachsen.
          </p>
        </AnimatedSection>

        <div className="about-story__list">
          {STORY_STEPS.map(
            (step, index) => (
              <AnimatedSection
                key={step.number}
                className="about-story__item"
                delay={
                  index * 0.06
                }
              >
                <span className="about-story__number">
                  {step.number}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
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
   PROJEKTE
========================================================= */

function AboutProjects() {
  return (
    <section className="about-projects">
      <div className="about-container">
        <AnimatedSection className="about-projects__heading">
          <SectionLabel>
  Unsere Reisewelt
</SectionLabel>

          <h2>
            Eine Marke.
            <span>
              Mehrere Projekte.
            </span>
          </h2>

          <p>
  Social Media, Momentry und unser
  Online-Shop verbinden unsere Reisen
  mit persönlichen Einblicken und
  eigenen digitalen Angeboten.
</p>
        </AnimatedSection>

        <div className="about-projects__grid">
          {PROJECTS.map(
            (project, index) => {
              const Icon =
                project.icon;

              return (
                <AnimatedSection
                  key={project.id}
                  className="about-project"
                  delay={
                    index * 0.06
                  }
                >
                  <div className="about-project__icon">
                    <Icon aria-hidden="true" />
                  </div>

                  <span className="about-project__eyebrow">
                    {project.eyebrow}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.text}
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
   NICHT PERFEKT
========================================================= */

function AboutReality() {
  return (
    <section className="about-reality">
      <div className="about-container">
        <AnimatedSection className="about-reality__layout">
          <div>
            <SectionLabel light>
  Echt unterwegs
</SectionLabel>

            <h2>
              Nicht perfekt.
              <span>
                Aber immer wir.
              </span>
            </h2>
          </div>

          <div className="about-reality__copy">
            <p>
              Bei uns besteht eine Reise
              nicht nur aus perfekten
              Aussichtspunkten, schönem
              Wetter und minutiös geplanten
              Tagesabläufen.
            </p>

            <p>
              Es gibt spontane Änderungen,
              kleine Pannen, unterschiedliche
              Meinungen, chaotische Momente
              und sehr viel gemeinsames
              Lachen. Wir möchten genau
              diese Mischung zeigen.
            </p>

            <div className="about-reality__values">
              <span>
                <FiHeart aria-hidden="true" />
                Persönlich
              </span>

              <span>
                <FiCompass aria-hidden="true" />
                Reiselustig
              </span>

              <span>
                <FiCode aria-hidden="true" />
                Ideenreich
              </span>

              <span>
                <FiUsers aria-hidden="true" />
                Gemeinsam
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* =========================================================
   Q&A
========================================================= */

function AboutFAQ() {
  return (
    <section className="about-faq">
      <div className="about-container">
        <AnimatedSection className="about-faq__heading">
          <SectionLabel>
  Kurz gefragt
</SectionLabel>

          <h2>
            Fragen über uns
            <span>
              und unsere Projekte.
            </span>
          </h2>

          <p>
            Hier beantworten wir einige
            Fragen zu MamaTochterOnTour,
            unserer Zusammenarbeit und
            unseren verschiedenen Projekten.
          </p>
        </AnimatedSection>

        <AnimatedSection className="about-faq__list">
          {FAQ_ITEMS.map(
            (item) => (
              <details
                key={item.question}
                className="about-faq__item"
              >
                <summary>
                  <span>
                    {item.question}
                  </span>

                  <FiPlus
                    aria-hidden="true"
                  />
                </summary>

                <div className="about-faq__answer">
                  <p>
                    {item.answer}
                  </p>
                </div>
              </details>
            )
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}


/* =========================================================
   ABSCHLUSS
========================================================= */

function AboutCTA() {
  return (
    <section className="about-cta">
      <div className="about-container">
        <AnimatedSection className="about-cta__layout">
          <div>
            <SectionLabel light>
  Noch Fragen?
</SectionLabel>

            <h2>
              Jetzt kennst du
              <span>
                uns ein bisschen besser.
              </span>
            </h2>
          </div>

          <div className="about-cta__copy">
            <p>
              Wenn du mehr über uns,
              unsere Projekte oder eine
              mögliche Zusammenarbeit
              erfahren möchtest, freuen
              wir uns auf deine Nachricht.
            </p>

            <div className="about-cta__actions">
              <Link
                to="/kontakt"
                className="about-button about-button--dark"
              >
                <FiMessageCircle
                  aria-hidden="true"
                />

                <span>
                  Nachricht schreiben
                </span>

                <FiArrowRight
                  aria-hidden="true"
                />
              </Link>

              <Link
                to="/kooperationen"
                className="about-button about-button--outline"
              >
                <FiUsers
                  aria-hidden="true"
                />

                <span>
                  Kooperationen
                </span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* =========================================================
   PAGE
========================================================= */

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <AboutHero />

        <AboutIntro />

        <AboutStory />

        <AboutProjects />

        <AboutReality />

        <AboutFAQ />

        <AboutCTA />
      </main>

      <Footer />
    </>
  );
}

export default About;