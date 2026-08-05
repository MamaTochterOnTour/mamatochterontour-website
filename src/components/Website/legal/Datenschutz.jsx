import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiDatabase,
  FiExternalLink,
  FiEye,
  FiFileText,
  FiGlobe,
  FiInfo,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiServer,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiTrash2,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import { MdCookie } from "react-icons/md";

import { Link } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Datenschutz.css";

/* =========================================================
   ANGABEN DER VERANTWORTLICHEN STELLE

   DIESE PLATZHALTER VOR VERÖFFENTLICHUNG ERSETZEN.
========================================================= */

const PRIVACY_DATA = {
  responsibleName:
    "Jennifer Weinreich",

  businessName:
    "MamaTochterOnTour",

  street:
    "Stettiner Straße 41",

  postalCode:
    "35410",

  city:
    "Hungen",

  country:
    "Deutschland",

  email:
    "mamatochterontour@outlook.de",

  supervisoryAuthority:
    "[ZUSTÄNDIGE DATENSCHUTZAUFSICHTSBEHÖRDE]",

  supervisoryAuthorityUrl:
    "",

  lastUpdated:
    "August 2026",
};

/* =========================================================
   INHALTSVERZEICHNIS
========================================================= */

const privacyNavigation = [
  {
    id: "verantwortliche-stelle",
    number: "01",
    label: "Verantwortliche Stelle",
    icon: FiUser,
  },
  {
    id: "allgemeine-hinweise",
    number: "02",
    label: "Allgemeine Hinweise",
    icon: FiInfo,
  },
  {
    id: "website-hosting",
    number: "03",
    label: "Website und Hosting",
    icon: FiServer,
  },
  {
    id: "cookies",
    number: "04",
    label: "Cookies und Einwilligung",
    icon: MdCookie,
  },
  {
    id: "analytics",
    number: "05",
    label: "Analyse und Reichweitenmessung",
    icon: FiEye,
  },
  {
    id: "kontakt-newsletter",
    number: "06",
    label: "Kontakt und Newsletter",
    icon: FiMail,
  },
  {
    id: "online-shop",
    number: "07",
    label: "Online-Shop und Zahlungen",
    icon: FiShoppingBag,
  },
  {
    id: "momentry",
    number: "08",
    label: "Momentry App und Web-App",
    icon: FiSmartphone,
  },
  {
    id: "firebase",
    number: "09",
    label: "Firebase-Dienste",
    icon: FiDatabase,
  },
  {
    id: "community",
    number: "10",
    label: "Community-Inhalte",
    icon: FiUsers,
  },
  {
    id: "push",
    number: "11",
    label: "Push-Benachrichtigungen",
    icon: FiMessageCircle,
  },
  {
    id: "premium",
    number: "12",
    label: "Premium und In-App-Käufe",
    icon: FiCreditCard,
  },
  {
    id: "drittland",
    number: "13",
    label: "Drittlandübermittlungen",
    icon: FiGlobe,
  },
  {
    id: "speicherdauer",
    number: "14",
    label: "Speicherdauer und Löschung",
    icon: FiTrash2,
  },
  {
    id: "rechte",
    number: "15",
    label: "Deine Rechte",
    icon: FiShield,
  },
];

/* =========================================================
   VERARBEITETE DATEN IN MOMENTRY
========================================================= */

const momentryDataCategories = [
  {
    title: "Registrierungs- und Kontodaten",
    text:
      "Name, Benutzername, E-Mail-Adresse, interne Nutzer-ID, Anmeldedaten, Anmeldeanbieter, Kontostatus sowie Zeitpunkt der Registrierung und letzter Aktivitäten.",
  },
  {
    title: "Profildaten",
    text:
      "Profilbild, Profilbeschreibung, Spracheinstellungen, öffentliche Profilinformationen und weitere freiwillig gemachte Angaben.",
  },
  {
    title: "Reise- und Planungsdaten",
    text:
      "Reiseziele, Reisezeiträume, Reisenamen, Reisebegleitungen, Packlisten, Aufgaben, gespeicherte Inspirationen, Reiseplanungen und hochgeladene Reisedokumente.",
  },
  {
    title: "Community-Inhalte",
    text:
      "Beiträge, Bilder, Videos, Kommentare, Likes, gespeicherte Inhalte, Fragen, Antworten, Forumsbeiträge, Nachrichten in Reisegruppen und erstellte Reisegruppen.",
  },
  {
    title: "Reisetagebuchdaten",
    text:
      "Tagebucheinträge, Reiseerlebnisse, Texte, Bilder, Datumsangaben und weitere freiwillig gespeicherte Erinnerungen.",
  },
  {
    title: "Nutzungs- und Gerätedaten",
    text:
      "Zeitstempel, aufgerufene Bereiche, Interaktionen, technische Ereignisse, Betriebssystem, App-Version, Gerätemodell, Spracheinstellungen und technische Kennungen.",
  },
  {
    title: "Benachrichtigungsdaten",
    text:
      "Push-Token, Benachrichtigungseinstellungen und Informationen über den technischen Versand von Push-Benachrichtigungen.",
  },
  {
    title: "Kauf- und Premiumdaten",
    text:
      "Produkt, Abonnementstatus, Kaufzeitpunkt, Transaktionsreferenz, Zahlungsstatus und Informationen zur Freischaltung gekaufter Inhalte.",
  },
];

/* =========================================================
   BETROFFENENRECHTE
========================================================= */

const dataSubjectRights = [
  {
    title: "Auskunft",
    text:
      "Du kannst Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir über dich verarbeiten.",
  },
  {
    title: "Berichtigung",
    text:
      "Du kannst die Berichtigung unrichtiger und die Ergänzung unvollständiger personenbezogener Daten verlangen.",
  },
  {
    title: "Löschung",
    text:
      "Du kannst unter den gesetzlichen Voraussetzungen die Löschung deiner personenbezogenen Daten verlangen.",
  },
  {
    title: "Einschränkung",
    text:
      "Du kannst unter den gesetzlichen Voraussetzungen die Einschränkung der Verarbeitung verlangen.",
  },
  {
    title: "Datenübertragbarkeit",
    text:
      "Du kannst Daten, die du uns bereitgestellt hast, in einem strukturierten, gängigen und maschinenlesbaren Format erhalten.",
  },
  {
    title: "Widerspruch",
    text:
      "Du kannst einer Verarbeitung widersprechen, die auf berechtigten Interessen oder der Wahrnehmung einer Aufgabe im öffentlichen Interesse beruht.",
  },
  {
    title: "Widerruf",
    text:
      "Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.",
  },
  {
    title: "Beschwerde",
    text:
      "Du kannst dich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung deiner personenbezogenen Daten beschweren.",
  },
];

/* =========================================================
   GEMEINSAME KOMPONENTEN
========================================================= */

function PrivacySection({
  id,
  number,
  eyebrow,
  title,
  intro,
  children,
  dark = false,
}) {
  return (
    <section
      id={id}
      className={`privacy-section ${
        dark
          ? "privacy-section--dark"
          : ""
      }`}
    >
      <div className="privacy-container">
        <div className="privacy-section__grid">
          <div className="privacy-section__aside">
            <span className="privacy-section__number">
              {number}
            </span>

            <span className="privacy-section__eyebrow">
              {eyebrow}
            </span>
          </div>

          <div className="privacy-section__content">
            <h2>{title}</h2>

            {intro && (
              <p className="privacy-section__intro">
                {intro}
              </p>
            )}

            <div className="privacy-section__body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacyInfoCard({
  icon: Icon,
  title,
  children,
  variant = "",
}) {
  return (
    <article
      className={`privacy-info-card ${
        variant
          ? `privacy-info-card--${variant}`
          : ""
      }`}
    >
      {Icon && (
        <span className="privacy-info-card__icon">
          <Icon aria-hidden="true" />
        </span>
      )}

      <div>
        <h3>{title}</h3>

        <div className="privacy-info-card__text">
          {children}
        </div>
      </div>
    </article>
  );
}

function PrivacyDetails({
  title,
  children,
  open = false,
}) {
  return (
    <details
      className="privacy-details"
      open={open}
    >
      <summary>
        <span>{title}</span>

        <FiChevronRight
          aria-hidden="true"
        />
      </summary>

      <div className="privacy-details__content">
        {children}
      </div>
    </details>
  );
}

function ExternalPrivacyLink({
  href,
  children,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="privacy-external-link"
    >
      {children}

      <FiExternalLink aria-hidden="true" />
    </a>
  );
}

/* =========================================================
   HAUPTKOMPONENTE
========================================================= */

export default function Datenschutz() {
  const prefersReducedMotion =
    useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion
          ? 0
          : 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren:
          prefersReducedMotion ? 0 : 0.07,
      },
    },
  };

  return (
    <>
      <Navbar />

      <main className="privacy-page">
        {/* =================================================
            HERO
        ================================================== */}

        <section
          className="privacy-hero"
          id="top"
        >
          <div
            className="privacy-hero__background"
            aria-hidden="true"
          >
            <span className="privacy-hero__glow privacy-hero__glow--one" />
            <span className="privacy-hero__glow privacy-hero__glow--two" />
          </div>

          <div className="privacy-container privacy-hero__grid">
            <motion.div
              className="privacy-hero__content"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.span
                className="privacy-eyebrow"
                variants={fadeUp}
              >
                Datenschutz
              </motion.span>

              <motion.h1 variants={fadeUp}>
                Deine Daten.
                <span>
                  Transparent geschützt.
                </span>
              </motion.h1>

              <motion.p
                className="privacy-hero__lead"
                variants={fadeUp}
              >
                In dieser Datenschutzerklärung
                informieren wir dich darüber,
                welche personenbezogenen Daten wir
                bei der Nutzung unserer Website,
                unseres Online-Shops sowie der
                Momentry App und Web-App
                verarbeiten.
              </motion.p>

              <motion.div
                className="privacy-hero__meta"
                variants={fadeUp}
              >
                <span>
                  <FiClock aria-hidden="true" />

                  Stand:{" "}
                  {PRIVACY_DATA.lastUpdated}
                </span>

                <span>
                  <FiFileText aria-hidden="true" />

                  Website, Shop und Momentry
                </span>
              </motion.div>
            </motion.div>

            <motion.aside
              className="privacy-hero__card"
              initial={{
                opacity: 0,
                x: prefersReducedMotion
                  ? 0
                  : 42,
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
              <span className="privacy-hero__card-icon">
                <FiShield
                  aria-hidden="true"
                />
              </span>

              <span className="privacy-hero__card-label">
                Unser Grundsatz
              </span>

              <h2>
                So viel wie nötig.
                <strong>
                  So sicher wie möglich.
                </strong>
              </h2>

              <p>
                Wir verarbeiten personenbezogene
                Daten nur für festgelegte Zwecke
                und nur, soweit dies für unsere
                Angebote erforderlich, gesetzlich
                vorgeschrieben oder von dir
                gestattet ist.
              </p>

              <a
                href={`mailto:${PRIVACY_DATA.email}`}
                className="privacy-hero__contact"
              >
                <FiMail aria-hidden="true" />

                {PRIVACY_DATA.email}
              </a>
            </motion.aside>
          </div>
        </section>

        {/* =================================================
            WICHTIGER HINWEIS
        ================================================== */}

        <section className="privacy-notice">
          <div className="privacy-container">
            <div className="privacy-notice__card">
              <FiAlertCircle
                aria-hidden="true"
              />

              <div>
                <strong>
                  Hinweis zur Aktualität
                </strong>

                <p>
                  Diese Datenschutzerklärung gilt
                  für die jeweils tatsächlich
                  eingesetzten Funktionen. Werden
                  neue Funktionen oder
                  Dienstleister eingeführt, wird
                  diese Erklärung entsprechend
                  aktualisiert. Einwilligungspflichtige
                  Dienste werden erst nach deiner
                  Einwilligung aktiviert.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            INHALTSVERZEICHNIS
        ================================================== */}

        <section className="privacy-overview">
          <div className="privacy-container">
            <div className="privacy-overview__heading">
              <span>
                Schnellzugriff
              </span>

              <h2>
                Was möchtest du wissen?
              </h2>

              <p>
                Über die folgenden Bereiche
                gelangst du direkt zu den
                jeweiligen Informationen.
              </p>
            </div>

            <nav
              className="privacy-overview__grid"
              aria-label="Inhaltsverzeichnis der Datenschutzerklärung"
            >
              {privacyNavigation.map(
                (item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="privacy-overview__item"
                    >
                      <span className="privacy-overview__number">
                        {item.number}
                      </span>

                      <Icon aria-hidden="true" />

                      <strong>
                        {item.label}
                      </strong>

                      <FiArrowRight
                        aria-hidden="true"
                      />
                    </a>
                  );
                }
              )}
            </nav>
          </div>
        </section>

        {/* =================================================
            01 VERANTWORTLICHE STELLE
        ================================================== */}

        <PrivacySection
          id="verantwortliche-stelle"
          number="01"
          eyebrow="Verantwortung"
          title="Verantwortliche Stelle"
          intro="Verantwortlich für die Verarbeitung personenbezogener Daten im Zusammenhang mit MamaTochterOnTour, dem Online-Shop und Momentry ist:"
        >
          <div className="privacy-address-card">
            <span className="privacy-address-card__icon">
              <FiUser aria-hidden="true" />
            </span>

            <address>
              <strong>
                {PRIVACY_DATA.responsibleName}
              </strong>

              <span>
                {PRIVACY_DATA.businessName}
              </span>

              <span>
                {PRIVACY_DATA.street}
              </span>

              <span>
                {PRIVACY_DATA.postalCode}{" "}
                {PRIVACY_DATA.city}
              </span>

              <span>
                {PRIVACY_DATA.country}
              </span>

              <a
                href={`mailto:${PRIVACY_DATA.email}`}
              >
                {PRIVACY_DATA.email}
              </a>
            </address>
          </div>

          <p>
            Die verantwortliche Stelle entscheidet
            allein oder gemeinsam mit anderen über
            die Zwecke und Mittel der Verarbeitung
            personenbezogener Daten.
          </p>

          <PrivacyInfoCard
            icon={FiMail}
            title="Datenschutzanfragen"
          >
            <p>
              Für Auskunfts-, Berichtigungs-,
              Löschungs- oder sonstige
              Datenschutzanfragen kannst du dich
              jederzeit per E-Mail an{" "}
              <a
                href={`mailto:${PRIVACY_DATA.email}`}
              >
                {PRIVACY_DATA.email}
              </a>{" "}
              wenden.
            </p>
          </PrivacyInfoCard>
        </PrivacySection>

        {/* =================================================
            02 ALLGEMEINE HINWEISE
        ================================================== */}

        <PrivacySection
          id="allgemeine-hinweise"
          number="02"
          eyebrow="Grundlagen"
          title="Allgemeine Hinweise zur Datenverarbeitung"
          intro="Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen."
        >
          <PrivacyDetails
            title="Rechtsgrundlagen der Verarbeitung"
            open
          >
            <p>
              Wir verarbeiten personenbezogene
              Daten insbesondere auf Grundlage
              folgender Bestimmungen:
            </p>

            <ul>
              <li>
                <strong>
                  Art. 6 Abs. 1 lit. a DSGVO:
                </strong>{" "}
                Verarbeitung aufgrund deiner
                Einwilligung, beispielsweise für
                optionale Cookies, Analyse,
                Newsletter oder
                Push-Benachrichtigungen.
              </li>

              <li>
                <strong>
                  Art. 6 Abs. 1 lit. b DSGVO:
                </strong>{" "}
                Verarbeitung zur Erfüllung eines
                Vertrags oder zur Durchführung
                vorvertraglicher Maßnahmen,
                beispielsweise für Nutzerkonten,
                Käufe, Premium-Abonnements und die
                Bereitstellung von Reiseguides.
              </li>

              <li>
                <strong>
                  Art. 6 Abs. 1 lit. c DSGVO:
                </strong>{" "}
                Verarbeitung zur Erfüllung
                gesetzlicher Verpflichtungen,
                insbesondere handels- und
                steuerrechtlicher
                Aufbewahrungspflichten.
              </li>

              <li>
                <strong>
                  Art. 6 Abs. 1 lit. f DSGVO:
                </strong>{" "}
                Verarbeitung zur Wahrung unserer
                berechtigten Interessen,
                beispielsweise zur technischen
                Sicherheit, Missbrauchsprävention,
                Fehleranalyse und
                Rechtsverteidigung.
              </li>
            </ul>

            <p>
              Soweit auf Endgeräten Informationen
              gespeichert oder ausgelesen werden,
              erfolgt dies zusätzlich nach den
              anwendbaren Vorschriften des
              Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Empfänger personenbezogener Daten">
            <p>
              Personenbezogene Daten erhalten nur
              diejenigen Stellen, die sie zur
              Erfüllung der jeweiligen Zwecke
              benötigen. Dazu können insbesondere
              Hosting-, IT-, Analyse-, Newsletter-,
              Zahlungs- und
              Plattformdienstleister gehören.
            </p>

            <p>
              Soweit Dienstleister Daten in unserem
              Auftrag verarbeiten, schließen wir
              erforderliche Vereinbarungen zur
              Auftragsverarbeitung.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Pflicht zur Bereitstellung von Daten">
            <p>
              Die Bereitstellung personenbezogener
              Daten ist grundsätzlich freiwillig.
              Bestimmte Angaben sind jedoch
              erforderlich, damit wir einen Vertrag
              erfüllen, ein Nutzerkonto anlegen,
              eine Bestellung abwickeln oder eine
              angefragte Funktion bereitstellen
              können.
            </p>

            <p>
              Ohne diese Angaben kann die
              betreffende Funktion möglicherweise
              nicht genutzt werden.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Automatisierte Entscheidungen">
            <p>
              Wir treffen grundsätzlich keine
              Entscheidungen, die ausschließlich
              auf einer automatisierten
              Verarbeitung beruhen und dir
              gegenüber rechtliche Wirkung
              entfalten oder dich in ähnlicher
              Weise erheblich beeinträchtigen.
            </p>

            <p>
              Personalisierte Empfehlungen oder
              Sortierungen innerhalb von Momentry
              stellen keine Entscheidung im Sinne
              von Art. 22 DSGVO dar.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Datensicherheit">
            <p>
              Wir treffen angemessene technische
              und organisatorische Maßnahmen, um
              personenbezogene Daten vor Verlust,
              Manipulation, unbefugtem Zugriff und
              sonstigen Sicherheitsrisiken zu
              schützen.
            </p>

            <p>
              Die Übertragung unserer Website und
              Web-App erfolgt verschlüsselt über
              HTTPS. Dennoch kann eine
              Datenübertragung über das Internet
              nie vollständig risikofrei
              gewährleistet werden.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            03 WEBSITE UND HOSTING
        ================================================== */}

        <PrivacySection
          id="website-hosting"
          number="03"
          eyebrow="Website"
          title="Hosting und technische Bereitstellung"
          intro="Beim Aufruf unserer Website und Web-App werden technisch notwendige Verbindungsdaten verarbeitet."
        >
          <PrivacyInfoCard
            icon={FiServer}
            title="Hosting über Fly.io"
          >
            <p>
              Unsere Website beziehungsweise Teile
              unserer technischen Infrastruktur
              werden über Dienste von Fly.io, Inc.
              bereitgestellt.
            </p>

            <p>
              Beim Aufruf können insbesondere
              IP-Adresse, Datum und Uhrzeit des
              Zugriffs, angeforderte Ressource,
              übertragene Datenmenge,
              Referrer-Informationen,
              Browsertyp, Betriebssystem und
              Fehlerprotokolle verarbeitet werden.
            </p>

            <p>
              Die Verarbeitung dient der
              Auslieferung unserer Angebote, der
              Stabilität, der technischen
              Fehleranalyse und dem Schutz vor
              Angriffen.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. f DSGVO. Unser
              berechtigtes Interesse liegt in
              einem sicheren und zuverlässigen
              Betrieb unserer Online-Angebote.
            </p>

            <ExternalPrivacyLink href="https://fly.io/legal/privacy-policy/">
              Datenschutzhinweise von Fly.io
            </ExternalPrivacyLink>
          </PrivacyInfoCard>

          <PrivacyInfoCard
            icon={FiFileText}
            title="GitHub"
          >
            <p>
              Wir nutzen GitHub zur
              Versionsverwaltung und Verwaltung
              unseres Quellcodes. GitHub ist nicht
              automatisch Bestandteil der
              Datenübertragung beim normalen
              Besuch unserer Website.
            </p>

            <p>
              Soweit keine Dateien, Skripte oder
              sonstigen Ressourcen unmittelbar von
              GitHub geladen werden, werden durch
              den bloßen Websitebesuch keine
              Besucherdaten an GitHub übertragen.
            </p>
          </PrivacyInfoCard>

          <PrivacyDetails title="Server-Protokolldaten">
            <p>
              Technische Protokolldaten werden nur
              so lange gespeichert, wie dies für
              den Betrieb, die Sicherheit, die
              Fehlerbehebung und die Aufklärung
              möglicher Missbrauchsfälle
              erforderlich ist.
            </p>

            <p>
              Eine längere Speicherung kann
              erfolgen, wenn ein sicherheitsrelevantes
              Ereignis untersucht oder ein
              rechtlicher Anspruch durchgesetzt
              beziehungsweise abgewehrt werden
              muss.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            04 COOKIES
        ================================================== */}

        <PrivacySection
          id="cookies"
          number="04"
          eyebrow="Endgeräte"
          title="Cookies und Einwilligungsverwaltung"
          intro="Unsere Website kann Cookies und vergleichbare Technologien verwenden, sofern diese technisch erforderlich sind oder du in ihre Verwendung eingewilligt hast."
        >
          <div className="privacy-card-grid privacy-card-grid--two">
            <PrivacyInfoCard
              icon={FiLock}
              title="Technisch notwendige Technologien"
            >
              <p>
                Technisch notwendige Cookies oder
                lokale Speichertechnologien können
                eingesetzt werden, um grundlegende
                Funktionen, Sicherheit,
                Warenkorbstatus, Login-Zustand,
                Spracheinstellungen oder deine
                Datenschutzauswahl bereitzustellen.
              </p>

              <p>
                Die Verarbeitung erfolgt, soweit
                erforderlich, nach den anwendbaren
                Vorschriften für den Zugriff auf
                Endeinrichtungen sowie auf
                Grundlage von Art. 6 Abs. 1 lit. b
                oder lit. f DSGVO.
              </p>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={MdCookie}
              title="Optionale Technologien"
            >
              <p>
                Analyse-, Marketing- oder externe
                Mediendienste werden erst
                aktiviert, nachdem du über unser
                Consent-Banner eingewilligt hast.
              </p>

              <p>
                Rechtsgrundlage ist deine
                Einwilligung gemäß Art. 6 Abs. 1
                lit. a DSGVO. Du kannst deine
                Entscheidung jederzeit mit Wirkung
                für die Zukunft ändern.
              </p>
            </PrivacyInfoCard>
          </div>

          <PrivacyDetails title="Änderung deiner Datenschutzauswahl">
            <p>
              Deine Einwilligung kannst du über
              die auf der Website bereitgestellten
              Datenschutzeinstellungen jederzeit
              widerrufen oder neu konfigurieren.
            </p>

            <button
              type="button"
              className="privacy-consent-button"
              onClick={() => {
                /*
                 * HIER SPÄTER DAS COOKIE-CONSENT-TOOL
                 * ÖFFNEN.
                 *
                 * Beispiel:
                 * window.showCookieSettings?.();
                 */
              }}
            >
              Datenschutzeinstellungen öffnen
            </button>
          </PrivacyDetails>

          <div className="privacy-warning-box">
            <FiAlertCircle aria-hidden="true" />

            <p>
              <strong>
                Technischer Hinweis:
              </strong>{" "}
              Der Button muss vor Veröffentlichung
              mit eurem tatsächlichen
              Consent-Management-System verbunden
              werden. Google Analytics und
              YouTube-Einbettungen dürfen nicht
              bereits vor der erforderlichen
              Einwilligung geladen werden.
            </p>
          </div>
        </PrivacySection>

        {/* =================================================
            05 ANALYTICS
        ================================================== */}

        <PrivacySection
          id="analytics"
          number="05"
          eyebrow="Statistik"
          title="Google Analytics und Firebase Analytics"
          intro="Wir verwenden Analysewerkzeuge, um zu verstehen, wie unsere Angebote genutzt werden und wie wir sie verbessern können."
        >
          <PrivacyInfoCard
            icon={FiEye}
            title="Google Analytics auf der Website"
          >
            <p>
              Nach deiner Einwilligung nutzen wir
              Google Analytics, einen Analysedienst
              der Google Ireland Limited, Gordon
              House, Barrow Street, Dublin 4,
              Irland.
            </p>

            <p>
              Dabei können insbesondere
              pseudonyme Online-Kennungen,
              Geräteinformationen,
              Browserinformationen, ungefähre
              Standortinformationen,
              Interaktionen, Seitenaufrufe,
              Sitzungsdaten, Referrer-Daten sowie
              Zeitpunkt und Dauer der Nutzung
              verarbeitet werden.
            </p>

            <p>
              Google Analytics hilft uns dabei,
              Nutzungsvorgänge statistisch
              auszuwerten und unsere Website zu
              optimieren.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. a DSGVO. Die
              Verarbeitung erfolgt erst nach
              deiner Einwilligung.
            </p>

            <p>
              Die Speicherdauer richtet sich nach
              den von uns in Google Analytics
              vorgenommenen Einstellungen.
              Ereignis- und Nutzungsdaten werden
              nach Ablauf des eingestellten
              Aufbewahrungszeitraums gelöscht oder
              anonymisiert.
            </p>

            <ExternalPrivacyLink href="https://policies.google.com/privacy?hl=de">
              Datenschutzerklärung von Google
            </ExternalPrivacyLink>
          </PrivacyInfoCard>

          <PrivacyInfoCard
            icon={FiSmartphone}
            title="Firebase Analytics in Momentry"
          >
            <p>
              In der Momentry App und gegebenenfalls
              der Web-App setzen wir Firebase
              Analytics ein, sofern du der
              Analyse zugestimmt hast oder die
              jeweilige Plattform eine
              entsprechende Einwilligung
              bereitstellt.
            </p>

            <p>
              Verarbeitet werden können
              App-Instanzkennungen,
              Geräteinformationen,
              Betriebssystem, App-Version,
              Sprache, ungefähre Region,
              Nutzungsereignisse,
              Sitzungsinformationen und
              Interaktionen mit App-Funktionen.
            </p>

            <p>
              Wir nutzen diese Daten, um
              Funktionsnutzung, Stabilität und
              Nutzerführung zu analysieren und
              Momentry weiterzuentwickeln.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. a DSGVO, soweit
              eine Einwilligung erforderlich ist.
            </p>
          </PrivacyInfoCard>

          <PrivacyDetails title="Personalisierte Empfehlungen und Feed-Sortierung">
            <p>
              Soweit Momentry personalisierte
              Empfehlungen oder einen
              personalisierten Feed anbietet,
              können hierfür Nutzungsinteressen,
              gespeicherte Reiseziele,
              Interaktionen, gefolgte Profile,
              Likes, gespeicherte Beiträge und
              Reiseplanungen ausgewertet werden.
            </p>

            <p>
              Die Personalisierung dient dazu, dir
              Inhalte anzuzeigen, die voraussichtlich
              besser zu deinen Reiseinteressen
              passen.
            </p>

            <p>
              Soweit die Personalisierung nicht
              zur Vertragserfüllung erforderlich
              ist, erfolgt sie auf Grundlage
              deiner Einwilligung oder unserer
              berechtigten Interessen an einer
              nutzerfreundlichen Bereitstellung
              unseres Angebots.
            </p>

            <p>
              Über deine App-Einstellungen sollst
              du personalisierte Empfehlungen
              deaktivieren oder zurücksetzen
              können.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            06 KONTAKT UND NEWSLETTER
        ================================================== */}

        <PrivacySection
          id="kontakt-newsletter"
          number="06"
          eyebrow="Kommunikation"
          title="Kontaktaufnahme und Newsletter"
          intro="Wenn du mit uns Kontakt aufnimmst oder unseren Newsletter abonnierst, verarbeiten wir die dafür erforderlichen Angaben."
        >
          <PrivacyInfoCard
            icon={FiMail}
            title="Kontaktaufnahme"
          >
            <p>
              Bei einer Kontaktaufnahme per
              E-Mail, Kontaktformular oder über
              andere bereitgestellte Wege
              verarbeiten wir deine Kontaktdaten
              und den Inhalt deiner Nachricht.
            </p>

            <p>
              Dazu können Name, E-Mail-Adresse,
              Betreff, Nachricht, Zeitpunkt der
              Anfrage und gegebenenfalls weitere
              freiwillige Angaben gehören.
            </p>

            <p>
              Die Verarbeitung erfolgt zur
              Bearbeitung deiner Anfrage.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO bei
              vertragsbezogenen Anfragen und
              ansonsten Art. 6 Abs. 1 lit. f
              DSGVO.
            </p>

            <p>
              Nachrichten werden gelöscht, wenn
              die Anfrage abschließend bearbeitet
              wurde und keine gesetzlichen
              Aufbewahrungspflichten oder
              berechtigten Gründe für eine weitere
              Speicherung bestehen.
            </p>
          </PrivacyInfoCard>

          <PrivacyInfoCard
            icon={FiMessageCircle}
            title="Newsletter über Brevo"
          >
            <p>
              Für den Versand unseres Newsletters
              nutzen wir Brevo. Beim Abonnieren
              werden insbesondere deine
              E-Mail-Adresse, der Zeitpunkt der
              Anmeldung, die Bestätigung der
              Anmeldung sowie technische
              Protokolldaten verarbeitet.
            </p>

            <p>
              Die Anmeldung erfolgt im
              Double-Opt-in-Verfahren. Nach der
              Anmeldung erhältst du eine E-Mail,
              über die du bestätigen musst, dass
              du den Newsletter erhalten möchtest.
            </p>

            <p>
              Newsletter können Messpixel oder
              vergleichbare Technologien
              enthalten, durch die Öffnungen,
              Klicks und technische
              Zustellinformationen ausgewertet
              werden. Eine solche Auswertung
              erfolgt nur, soweit sie von deiner
              Einwilligung umfasst ist.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. a DSGVO.
            </p>

            <p>
              Du kannst den Newsletter jederzeit
              über den Abmeldelink in jeder
              Newsletter-E-Mail oder per Nachricht
              an uns abbestellen.
            </p>

            <ExternalPrivacyLink href="https://www.brevo.com/de/legal/privacypolicy/">
              Datenschutzhinweise von Brevo
            </ExternalPrivacyLink>
          </PrivacyInfoCard>
        </PrivacySection>

        {/* =================================================
            07 ONLINE-SHOP
        ================================================== */}

        <PrivacySection
          id="online-shop"
          number="07"
          eyebrow="Bestellungen"
          title="Online-Shop und digitale Reiseguides"
          intro="Bei einer Bestellung verarbeiten wir die Angaben, die für Vertragsschluss, Zahlung, Bereitstellung und gesetzliche Nachweise erforderlich sind."
        >
          <PrivacyDetails
            title="Bestell- und Vertragsdaten"
            open
          >
            <p>
              Bei einer Bestellung können
              insbesondere folgende Daten
              verarbeitet werden:
            </p>

            <ul>
              <li>Name und E-Mail-Adresse,</li>

              <li>
                Rechnungs- und gegebenenfalls
                Anschriftdaten,
              </li>

              <li>
                bestellte Produkte und Preise,
              </li>

              <li>
                Kaufzeitpunkt und Bestellnummer,
              </li>

              <li>
                Zahlungsstatus und
                Transaktionsreferenz,
              </li>

              <li>
                verwendete Rabatt- oder
                Aktionscodes,
              </li>

              <li>
                Informationen zur Bereitstellung
                des digitalen Reiseguides,
              </li>

              <li>
                Kommunikation im Zusammenhang mit
                der Bestellung.
              </li>
            </ul>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </PrivacyDetails>

          <PrivacyInfoCard
            icon={FiCreditCard}
            title="Zahlungsabwicklung über Stripe"
          >
            <p>
              Für Zahlungen im Online-Shop und
              später innerhalb der Momentry
              Web-App nutzen wir Stripe.
            </p>

            <p>
              Je nach gewählter Zahlungsart können
              Name, E-Mail-Adresse,
              Rechnungsanschrift,
              Zahlungsinformationen,
              Transaktionsdaten, IP-Adresse,
              Geräteinformationen und Daten zur
              Betrugsprävention an Stripe
              übermittelt werden.
            </p>

            <p>
              Vollständige Kreditkartendaten
              werden grundsätzlich direkt über
              Stripe verarbeitet und nicht von uns
              gespeichert, sofern das
              Zahlungsformular technisch direkt
              durch Stripe bereitgestellt wird.
            </p>

            <p>
              Die Datenübermittlung erfolgt zur
              Zahlungsabwicklung, zur
              Betrugsprävention, zur Erfüllung
              gesetzlicher Vorgaben und zur
              Bearbeitung möglicher Rückzahlungen
              oder Zahlungsstreitigkeiten.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO sowie,
              soweit erforderlich, Art. 6 Abs. 1
              lit. c und lit. f DSGVO.
            </p>

            <ExternalPrivacyLink href="https://stripe.com/de/privacy">
              Datenschutzhinweise von Stripe
            </ExternalPrivacyLink>
          </PrivacyInfoCard>

          <PrivacyDetails title="Bereitstellung digitaler Inhalte">
            <p>
              Nach erfolgreicher Zahlung
              verarbeiten wir deine E-Mail-Adresse,
              Bestell- und Produktinformationen,
              um den gekauften Reiseguide per
              E-Mail, Download oder im
              Kundenkonto bereitzustellen.
            </p>

            <p>
              Bei einem Kundenkonto kann der Kauf
              dauerhaft mit deinem Konto
              verknüpft werden, damit du später
              erneut auf deine Inhalte zugreifen
              kannst.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Buchhaltung und gesetzliche Aufbewahrung">
            <p>
              Rechnungen, Buchungsbelege,
              Zahlungsnachweise und
              steuerrechtlich relevante
              Informationen werden für die
              gesetzlich vorgeschriebenen
              Aufbewahrungsfristen gespeichert.
            </p>

            <p>
              Diese Daten werden auch dann nicht
              sofort gelöscht, wenn ein
              Kundenkonto gelöscht wird, sofern
              eine gesetzliche
              Aufbewahrungspflicht besteht.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. c DSGVO.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            08 MOMENTRY
        ================================================== */}

        <PrivacySection
          id="momentry"
          number="08"
          eyebrow="Reise-App"
          title="Momentry App und Web-App"
          intro="Momentry ist eine Reise-, Planungs- und Community-Plattform. Welche Daten verarbeitet werden, hängt davon ab, welche Funktionen du verwendest."
          dark
        >
          <div className="privacy-data-grid">
            {momentryDataCategories.map(
              (category, index) => (
                <article
                  key={category.title}
                  className="privacy-data-card"
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3>
                    {category.title}
                  </h3>

                  <p>{category.text}</p>
                </article>
              )
            )}
          </div>

          <PrivacyDetails title="Registrierung und Nutzerkonto">
            <p>
              Für die Einrichtung und Verwaltung
              eines Nutzerkontos verarbeiten wir
              insbesondere Namen beziehungsweise
              Benutzernamen, E-Mail-Adresse,
              Authentifizierungsdaten, interne
              Nutzer-ID, Profilinformationen und
              Zeitstempel.
            </p>

            <p>
              Die Verarbeitung ist erforderlich,
              um dein Konto zu erstellen, dich zu
              authentifizieren, deine Inhalte
              zuzuordnen und die App-Funktionen
              bereitzustellen.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Freiwillige Inhalte und Eingaben">
            <p>
              Daten, die du innerhalb von
              Momentry eingibst oder hochlädst,
              werden für die jeweils ausgewählte
              Funktion verarbeitet. Dazu gehören
              insbesondere Reiseplanungen,
              Packlisten, Beiträge,
              Reisetagebücher, Bilder, Videos,
              Kommentare, Gruppenbeiträge,
              Fragen, Antworten und gespeicherte
              Inhalte.
            </p>

            <p>
              Bitte veröffentliche keine
              personenbezogenen Daten anderer
              Personen, wenn du hierfür keine
              Berechtigung besitzt.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Reisedokumente und Tickets">
            <p>
              Soweit Momentry das Hochladen von
              Reisedokumenten, Tickets,
              Reservierungen oder Buchungsbelegen
              ermöglicht, werden diese Dateien
              ausschließlich zur Speicherung und
              Bereitstellung innerhalb deines
              Kontos oder einer von dir
              freigegebenen Reise verarbeitet.
            </p>

            <p>
              Solche Dokumente können sensible
              Angaben wie Namen,
              Buchungsnummern, Reisedaten oder
              Barcodes enthalten. Lade nur
              Dokumente hoch, die für die Nutzung
              der Funktion erforderlich sind.
            </p>

            <p>
              Der Zugriff soll auf dich und
              gegebenenfalls ausdrücklich von dir
              eingeladene Mitreisende beschränkt
              werden.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Gemeinsame Reiseplanung">
            <p>
              Wenn du andere Nutzer zu einer Reise
              einlädst, können diese abhängig von
              den vergebenen Berechtigungen auf
              Reiseinformationen, Aufgaben,
              Packlisten, gespeicherte Orte und
              hochgeladene Dokumente zugreifen
              oder diese bearbeiten.
            </p>

            <p>
              Vor einer Freigabe wird dir
              angezeigt, welche Inhalte mit
              eingeladenen Personen geteilt
              werden.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Zeitstempel und Aktivitätsinformationen">
            <p>
              Für die Sortierung von Inhalten,
              Synchronisierung, Sicherheit,
              Benachrichtigungen und Darstellung
              von Aktivitäten speichern wir
              Zeitstempel, beispielsweise für
              Kontoerstellung, Veröffentlichung,
              Bearbeitung, Login, Nachrichten und
              sonstige App-Aktivitäten.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            09 FIREBASE
        ================================================== */}

        <PrivacySection
          id="firebase"
          number="09"
          eyebrow="Technische Infrastruktur"
          title="Google Firebase"
          intro="Für zentrale technische Funktionen der App und Web-App nutzen wir Dienste der Firebase-Plattform von Google."
        >
          <div className="privacy-service-grid">
            <PrivacyInfoCard
              icon={FiUser}
              title="Firebase Authentication"
            >
              <p>
                Dient der Registrierung,
                Anmeldung, Authentifizierung,
                Passwortverwaltung und
                Kontosicherheit.
              </p>

              <p>
                Verarbeitet werden können
                E-Mail-Adresse, interne Nutzer-ID,
                Anmeldeanbieter,
                Authentifizierungszeitpunkte,
                Sicherheitsinformationen und
                technische Verbindungsdaten.
              </p>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiDatabase}
              title="Cloud Firestore"
            >
              <p>
                Dient der Speicherung und
                Synchronisierung von
                Nutzerkonten, Reisen,
                Community-Inhalten,
                Reisegruppen, Fragen,
                Antworten, Nachrichten,
                Packlisten und weiteren
                Funktionsdaten.
              </p>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiFileText}
              title="Firebase Storage"
            >
              <p>
                Dient der Speicherung
                hochgeladener Dateien wie
                Profilbildern, Beitragsbildern,
                Videos, Tagebuchbildern,
                Tickets und Reisedokumenten.
              </p>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiServer}
              title="Cloud Functions for Firebase"
            >
              <p>
                Dient der serverseitigen
                Verarbeitung, etwa für
                Benachrichtigungen,
                Sicherheitsprüfungen,
                Bestellprozesse,
                Newsletter-Anmeldungen,
                Zahlungsabgleiche und
                automatisierte App-Funktionen.
              </p>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiMessageCircle}
              title="Firebase Cloud Messaging"
            >
              <p>
                Dient dem technischen Versand von
                Push-Benachrichtigungen an
                registrierte Geräte.
              </p>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiEye}
              title="Firebase Analytics"
            >
              <p>
                Dient nach entsprechender
                Einwilligung der statistischen
                Analyse der App-Nutzung und der
                Weiterentwicklung unserer
                Funktionen.
              </p>
            </PrivacyInfoCard>
          </div>

          <p>
            Anbieter ist insbesondere Google
            Ireland Limited, Gordon House, Barrow
            Street, Dublin 4, Irland. Je nach
            Dienst können Daten auch durch Google
            LLC und weitere Google-Unternehmen
            verarbeitet werden.
          </p>

          <p>
            <strong>Rechtsgrundlagen:</strong>{" "}
            Art. 6 Abs. 1 lit. b DSGVO für die
            Bereitstellung notwendiger
            App-Funktionen, Art. 6 Abs. 1 lit. f
            DSGVO für Sicherheit und Stabilität
            sowie Art. 6 Abs. 1 lit. a DSGVO für
            einwilligungsabhängige Analyse- und
            Benachrichtigungsfunktionen.
          </p>

          <ExternalPrivacyLink href="https://firebase.google.com/support/privacy">
            Datenschutzinformationen zu Firebase
          </ExternalPrivacyLink>
        </PrivacySection>

        {/* =================================================
            10 COMMUNITY
        ================================================== */}

        <PrivacySection
          id="community"
          number="10"
          eyebrow="Öffentliche Bereiche"
          title="Community, Beiträge und Kommunikation"
          intro="Momentry enthält öffentliche, eingeschränkt sichtbare und private Bereiche. Vor dem Veröffentlichen wird angezeigt, für wen ein Inhalt sichtbar ist."
        >
          <PrivacyInfoCard
            icon={FiUsers}
            title="Öffentliche Profil- und Community-Inhalte"
          >
            <p>
              Je nach Funktion können
              Benutzername, Profilbild,
              Profilbeschreibung, Beiträge,
              Bilder, Kommentare, Likes, Fragen,
              Antworten, Forumsbeiträge und
              Reisetagebücher für andere Nutzer
              sichtbar sein.
            </p>

            <p>
              Öffentlich bereitgestellte Inhalte
              können von anderen Personen
              angesehen, kommentiert,
              gespeichert oder weitergegeben
              werden. Veröffentliche daher keine
              vertraulichen Informationen,
              Adressen, Buchungsnummern oder
              sonstigen sensiblen Daten.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO, da die
              Veröffentlichung auf deiner
              bewussten Nutzung der jeweiligen
              Community-Funktion beruht.
            </p>
          </PrivacyInfoCard>

          <PrivacyInfoCard
            icon={FiMessageCircle}
            title="Reisegruppen und Gruppennachrichten"
          >
            <p>
              Beim Beitritt zu einer Reisegruppe
              werden dein Profil und deine
              Gruppenmitgliedschaft für andere
              Gruppenmitglieder sichtbar.
            </p>

            <p>
              Nachrichten, Bilder, Umfragen und
              sonstige Inhalte innerhalb einer
              Gruppe sind für die jeweiligen
              Gruppenmitglieder sichtbar.
            </p>

            <p>
              Je nach Gruppenart können Titel,
              Reisezeitraum und
              Mitgliederinformationen bereits vor
              dem Beitritt sichtbar sein.
            </p>
          </PrivacyInfoCard>

          <PrivacyDetails title="Moderation und Meldungen">
            <p>
              Gemeldete Inhalte, zugehörige
              Metadaten und Angaben zur Meldung
              können zur Prüfung von Verstößen,
              zum Schutz anderer Nutzer und zur
              Durchsetzung unserer Regeln
              verarbeitet werden.
            </p>

            <p>
              In begründeten Fällen können Inhalte
              eingeschränkt, entfernt oder Konten
              gesperrt werden.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. f DSGVO. Unser
              berechtigtes Interesse liegt im
              sicheren und fairen Betrieb der
              Community.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Folgen, Likes und gespeicherte Inhalte">
            <p>
              Wenn du Profilen folgst, Beiträge
              likest oder Inhalte speicherst,
              werden diese Interaktionen deinem
              Nutzerkonto zugeordnet.
            </p>

            <p>
              Likes und Follower-Beziehungen
              können abhängig von der jeweiligen
              Funktion für andere Nutzer sichtbar
              sein. Gespeicherte Inhalte sind
              grundsätzlich nur für dich sichtbar,
              sofern nicht anders gekennzeichnet.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            11 PUSH
        ================================================== */}

        <PrivacySection
          id="push"
          number="11"
          eyebrow="Benachrichtigungen"
          title="Push-Benachrichtigungen"
          intro="Momentry kann dich auf Wunsch über Nachrichten, Gruppenaktivitäten, Reaktionen, Reiseerinnerungen und wichtige Kontoereignisse informieren."
        >
          <PrivacyInfoCard
            icon={FiMessageCircle}
            title="Firebase Cloud Messaging"
          >
            <p>
              Für den Versand von
              Push-Benachrichtigungen verwenden
              wir Firebase Cloud Messaging.
              Hierbei wird deinem Gerät ein
              Push-Token zugeordnet.
            </p>

            <p>
              Zusätzlich können Geräteplattform,
              App-Instanz, Sprache,
              Benachrichtigungstyp,
              Versandzeitpunkt und technischer
              Zustellstatus verarbeitet werden.
            </p>

            <p>
              Der Push-Token dient ausschließlich
              dazu, die ausgewählte
              Benachrichtigung an dein Gerät zu
              senden.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. a DSGVO, soweit
              du Push-Benachrichtigungen freiwillig
              aktiviert hast. Sicherheits- und
              vertragsrelevante Hinweise können,
              soweit technisch und rechtlich
              erforderlich, auf Grundlage von
              Art. 6 Abs. 1 lit. b oder lit. f
              DSGVO verarbeitet werden.
            </p>
          </PrivacyInfoCard>

          <PrivacyDetails title="Deaktivierung">
            <p>
              Du kannst Push-Benachrichtigungen in
              den Einstellungen deines Geräts und,
              soweit vorhanden, zusätzlich in den
              Benachrichtigungseinstellungen von
              Momentry deaktivieren oder nach
              Kategorien anpassen.
            </p>

            <p>
              Bei einer Abmeldung, Deaktivierung
              oder Kontolöschung wird der
              zugehörige Push-Token entfernt oder
              entkoppelt, sobald dies technisch
              verarbeitet wurde.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            12 PREMIUM UND IN-APP
        ================================================== */}

        <PrivacySection
          id="premium"
          number="12"
          eyebrow="Bezahlfunktionen"
          title="Premium, In-App-Käufe und Abonnements"
          intro="Die Zahlungsabwicklung unterscheidet sich danach, ob du Premium über die App oder über die Web-App abschließt."
        >
          <div className="privacy-card-grid privacy-card-grid--three">
            <PrivacyInfoCard
              icon={FiSmartphone}
              title="Apple App Store"
            >
              <p>
                Käufe innerhalb der iOS-App werden
                grundsätzlich über das
                In-App-Kaufsystem von Apple
                abgewickelt.
              </p>

              <p>
                Apple verarbeitet Zahlungs-,
                Konto-, Geräte- und
                Transaktionsdaten nach eigener
                Verantwortung. Wir erhalten
                insbesondere Informationen über
                Produkt, Kaufstatus,
                Transaktionsreferenz und
                Berechtigung zur
                Premium-Freischaltung.
              </p>

              <ExternalPrivacyLink href="https://www.apple.com/legal/privacy/de-ww/">
                Datenschutz bei Apple
              </ExternalPrivacyLink>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiSmartphone}
              title="Google Play"
            >
              <p>
                Käufe innerhalb der Android-App
                werden grundsätzlich über das
                Abrechnungssystem von Google Play
                abgewickelt.
              </p>

              <p>
                Google verarbeitet Zahlungs-,
                Konto-, Geräte- und
                Transaktionsdaten nach eigener
                Verantwortung. Wir erhalten
                insbesondere Kaufstatus,
                Produktinformation,
                Transaktionsreferenz und
                Informationen zur
                Premium-Freischaltung.
              </p>

              <ExternalPrivacyLink href="https://policies.google.com/privacy?hl=de">
                Datenschutz bei Google
              </ExternalPrivacyLink>
            </PrivacyInfoCard>

            <PrivacyInfoCard
              icon={FiCreditCard}
              title="Web-App über Stripe"
            >
              <p>
                Käufe oder Abonnements in der
                Momentry Web-App werden über
                Stripe abgewickelt.
              </p>

              <p>
                Wir erhalten von Stripe die zur
                Vertragsverwaltung erforderlichen
                Informationen, insbesondere
                Zahlungsstatus,
                Transaktionsreferenz,
                Abo-Status, Laufzeit und
                gegebenenfalls
                Rechnungsinformationen.
              </p>
            </PrivacyInfoCard>
          </div>

          <PrivacyDetails title="Verknüpfung mit dem Nutzerkonto">
            <p>
              Damit Premium-Funktionen
              freigeschaltet und über mehrere
              Geräte hinweg verwendet werden
              können, wird der Kaufstatus deinem
              Momentry-Nutzerkonto zugeordnet.
            </p>

            <p>
              Wir speichern dabei grundsätzlich
              keine vollständigen
              Zahlungskartendaten, sondern
              Produkt-, Status- und
              Transaktionsinformationen.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Kündigung und Ablauf">
            <p>
              Ein Abonnement muss grundsätzlich
              über die Plattform gekündigt werden,
              über die es abgeschlossen wurde.
              Nach Ende der bezahlten Laufzeit
              wird der Premium-Status entsprechend
              angepasst.
            </p>

            <p>
              Transaktions- und Rechnungsdaten
              können aufgrund gesetzlicher
              Aufbewahrungspflichten weiterhin
              gespeichert werden.
            </p>
          </PrivacyDetails>
        </PrivacySection>

        {/* =================================================
            YOUTUBE UND SOCIAL MEDIA
        ================================================== */}

        <PrivacySection
          id="externe-inhalte"
          number="13"
          eyebrow="Externe Plattformen"
          title="YouTube und Social-Media-Verlinkungen"
          intro="Unsere Website kann externe Medien einbinden und enthält Links zu unseren Profilen auf sozialen Netzwerken."
        >
          <PrivacyInfoCard
            icon={FiExternalLink}
            title="YouTube-Einbettungen"
          >
            <p>
              Auf einzelnen Seiten können Videos
              von YouTube eingebunden werden.
              Anbieter für Nutzer im Europäischen
              Wirtschaftsraum ist grundsätzlich
              Google Ireland Limited.
            </p>

            <p>
              Eingebettete Videos werden erst
              geladen, wenn du dem Laden externer
              Medien zugestimmt oder die
              Einbettung aktiv angeklickt hast.
            </p>

            <p>
              Beim Laden können insbesondere
              IP-Adresse, Geräte- und
              Browserinformationen,
              aufgerufene Seite,
              Interaktionen mit dem Video und
              gegebenenfalls Informationen aus
              deinem Google-Konto an Google
              übermittelt werden.
            </p>

            <p>
              Soweit technisch möglich, verwenden
              wir den erweiterten
              Datenschutzmodus von YouTube.
              Dennoch kann beim Abspielen eine
              Datenübermittlung an Google
              stattfinden.
            </p>

            <p>
              <strong>Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. a DSGVO.
            </p>
          </PrivacyInfoCard>

          <PrivacyInfoCard
            icon={FiGlobe}
            title="Instagram, TikTok und YouTube"
          >
            <p>
              Unsere Website enthält einfache
              Links zu Instagram, TikTok und
              YouTube. Beim bloßen Anzeigen
              unserer Website wird durch einen
              normalen Link grundsätzlich noch
              keine Verbindung zur jeweiligen
              Plattform hergestellt.
            </p>

            <p>
              Erst wenn du einen Link anklickst,
              wirst du zur jeweiligen Plattform
              weitergeleitet. Dort gelten die
              Datenschutzbestimmungen des
              jeweiligen Anbieters.
            </p>

            <p>
              Ist dein Nutzerkonto bei der
              Plattform angemeldet, kann der
              Anbieter deinen Besuch
              möglicherweise deinem Konto
              zuordnen.
            </p>
          </PrivacyInfoCard>
        </PrivacySection>

        {/* =================================================
            13 DRITTLAND
        ================================================== */}

        <PrivacySection
          id="drittland"
          number="14"
          eyebrow="International"
          title="Datenübermittlungen in Drittländer"
          intro="Einige unserer Dienstleister gehören zu international tätigen Unternehmensgruppen oder verarbeiten Daten außerhalb des Europäischen Wirtschaftsraums."
        >
          <p>
            Bei einer Übermittlung in Länder
            außerhalb des Europäischen
            Wirtschaftsraums achten wir auf eine
            zulässige Grundlage für die
            Datenübermittlung.
          </p>

          <p>
            Dazu können insbesondere ein
            Angemessenheitsbeschluss der
            Europäischen Kommission,
            Zertifizierungen nach dem
            EU-U.S. Data Privacy Framework,
            Standardvertragsklauseln der
            Europäischen Kommission und
            ergänzende Schutzmaßnahmen gehören.
          </p>

          <p>
            Trotz solcher Schutzmechanismen kann
            bei einer Verarbeitung in Drittländern
            nicht in jedem Fall ausgeschlossen
            werden, dass staatliche Stellen nach
            dortigem Recht auf Daten zugreifen.
          </p>

          <div className="privacy-warning-box">
            <FiGlobe aria-hidden="true" />

            <p>
              Betroffen sein können insbesondere
              Dienste von Google, Firebase,
              Stripe, Fly.io sowie Apple und
              weitere technisch eingebundene
              Anbieter.
            </p>
          </div>
        </PrivacySection>

        {/* =================================================
            14 SPEICHERDAUER
        ================================================== */}

        <PrivacySection
          id="speicherdauer"
          number="15"
          eyebrow="Aufbewahrung"
          title="Speicherdauer und Kontolöschung"
          intro="Wir speichern personenbezogene Daten nur so lange, wie sie für den jeweiligen Zweck benötigt werden oder gesetzliche Pflichten eine weitere Speicherung verlangen."
        >
          <div className="privacy-retention-list">
            <article>
              <span>01</span>

              <div>
                <h3>
                  Aktive Nutzerkonten
                </h3>

                <p>
                  Konto-, Profil- und
                  Funktionsdaten werden
                  grundsätzlich gespeichert,
                  solange dein Nutzerkonto aktiv
                  ist und die Daten für die
                  Bereitstellung von Momentry
                  benötigt werden.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>

              <div>
                <h3>
                  Von dir gelöschte Inhalte
                </h3>

                <p>
                  Gelöschte Beiträge,
                  Kommentare, Bilder oder andere
                  Inhalte werden aus den aktiven
                  Systemen entfernt, soweit keine
                  gesetzlichen Pflichten,
                  Missbrauchsfälle oder
                  berechtigten Rechtsansprüche
                  entgegenstehen.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>

              <div>
                <h3>
                  Kontolöschung
                </h3>

                <p>
                  Bei Löschung deines Kontos
                  werden deine personenbezogenen
                  Konto- und Inhaltsdaten
                  gelöscht oder anonymisiert,
                  soweit keine gesetzlichen
                  Aufbewahrungspflichten oder
                  zwingenden berechtigten Gründe
                  eine weitere Speicherung
                  erfordern.
                </p>
              </div>
            </article>

            <article>
              <span>04</span>

              <div>
                <h3>
                  Käufe und Buchhaltung
                </h3>

                <p>
                  Rechnungen, Zahlungsnachweise,
                  Bestell- und Buchungsdaten
                  werden für die gesetzlich
                  vorgeschriebene Dauer
                  aufbewahrt. Sie werden für
                  andere Zwecke gesperrt, sobald
                  sie nicht mehr operativ
                  benötigt werden.
                </p>
              </div>
            </article>

            <article>
              <span>05</span>

              <div>
                <h3>
                  Sicherheitsdaten
                </h3>

                <p>
                  Protokolle und
                  Sicherheitsinformationen
                  können für einen begrenzten
                  Zeitraum gespeichert werden,
                  um Missbrauch, Betrug,
                  Angriffe oder technische
                  Störungen zu erkennen und
                  aufzuklären.
                </p>
              </div>
            </article>

            <article>
              <span>06</span>

              <div>
                <h3>
                  Sicherungskopien
                </h3>

                <p>
                  Gelöschte Daten können für
                  einen begrenzten Zeitraum noch
                  in technisch geschützten
                  Sicherungskopien enthalten
                  sein. Sie werden im Rahmen der
                  regulären Überschreibungs- und
                  Löschzyklen entfernt und nicht
                  erneut für operative Zwecke
                  verwendet.
                </p>
              </div>
            </article>
          </div>

          <PrivacyInfoCard
            icon={FiTrash2}
            title="So kannst du dein Konto löschen"
            variant="highlight"
          >
            <p>
              Du kannst die Kontolöschung über
              die dafür vorgesehene Funktion in
              den Kontoeinstellungen von
              Momentry beantragen.
            </p>

            <p>
              Alternativ kannst du eine
              Löschanfrage von der mit deinem
              Konto verknüpften E-Mail-Adresse an{" "}
              <a
                href={`mailto:${PRIVACY_DATA.email}?subject=${encodeURIComponent(
                  "Kontolöschung Momentry"
                )}`}
              >
                {PRIVACY_DATA.email}
              </a>{" "}
              senden.
            </p>

            <p>
              Zur Vermeidung unberechtigter
              Löschungen können wir vor der
              Löschung einen Nachweis verlangen,
              dass du Inhaberin oder Inhaber des
              betroffenen Kontos bist.
            </p>

            <Link
              to="/momentry/kontoloeschung"
              className="privacy-inline-button"
            >
              Informationen zur Kontolöschung

              <FiArrowRight aria-hidden="true" />
            </Link>
          </PrivacyInfoCard>
        </PrivacySection>

        {/* =================================================
            15 RECHTE
        ================================================== */}

        <PrivacySection
          id="rechte"
          number="16"
          eyebrow="Deine Kontrolle"
          title="Deine Datenschutzrechte"
          intro="Dir stehen nach Maßgabe der gesetzlichen Voraussetzungen verschiedene Rechte im Zusammenhang mit deinen personenbezogenen Daten zu."
          dark
        >
          <div className="privacy-rights-grid">
            {dataSubjectRights.map(
              (right, index) => (
                <article
                  key={right.title}
                  className="privacy-right-card"
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3>{right.title}</h3>

                  <p>{right.text}</p>
                </article>
              )
            )}
          </div>

          <PrivacyDetails title="Widerspruchsrecht nach Art. 21 DSGVO">
            <div className="privacy-objection-box">
              <strong>
                Besonderer Hinweis zum
                Widerspruchsrecht
              </strong>

              <p>
                Erfolgt die Verarbeitung deiner
                personenbezogenen Daten auf
                Grundlage von Art. 6 Abs. 1 lit. e
                oder lit. f DSGVO, hast du das
                Recht, aus Gründen, die sich aus
                deiner besonderen Situation
                ergeben, jederzeit Widerspruch
                gegen die Verarbeitung einzulegen.
              </p>

              <p>
                Werden personenbezogene Daten zum
                Zweck der Direktwerbung
                verarbeitet, kannst du jederzeit
                ohne Angabe besonderer Gründe
                widersprechen.
              </p>
            </div>
          </PrivacyDetails>

          <PrivacyDetails title="Widerruf einer Einwilligung">
            <p>
              Du kannst eine erteilte Einwilligung
              jederzeit mit Wirkung für die
              Zukunft widerrufen. Die
              Rechtmäßigkeit der bis zum Widerruf
              erfolgten Verarbeitung bleibt
              unberührt.
            </p>

            <p>
              Ein Widerruf kann beispielsweise
              über die Datenschutzeinstellungen,
              App-Einstellungen, den
              Newsletter-Abmeldelink oder per
              E-Mail erfolgen.
            </p>
          </PrivacyDetails>

          <PrivacyDetails title="Beschwerderecht">
            <p>
              Du hast das Recht, dich bei einer
              Datenschutzaufsichtsbehörde zu
              beschweren, wenn du der Ansicht
              bist, dass die Verarbeitung deiner
              personenbezogenen Daten gegen
              Datenschutzrecht verstößt.
            </p>

            <p>
              Zuständig kann insbesondere die
              Aufsichtsbehörde unseres
              Unternehmenssitzes oder deines
              Wohnortes sein.
            </p>

            <p>
              Vorgesehene zuständige Behörde:
            </p>

            <strong>
              {
                PRIVACY_DATA.supervisoryAuthority
              }
            </strong>
          </PrivacyDetails>

          <PrivacyInfoCard
            icon={FiMail}
            title="Rechte ausüben"
            variant="light"
          >
            <p>
              Sende deine Anfrage bitte an:
            </p>

            <a
              href={`mailto:${PRIVACY_DATA.email}?subject=${encodeURIComponent(
                "Datenschutzanfrage"
              )}`}
            >
              {PRIVACY_DATA.email}
            </a>

            <p>
              Damit wir deine Anfrage dem
              richtigen Konto zuordnen können,
              verwende nach Möglichkeit die dort
              hinterlegte E-Mail-Adresse.
            </p>
          </PrivacyInfoCard>
        </PrivacySection>

        {/* =================================================
            KINDER UND JUGENDLICHE
        ================================================== */}

        <PrivacySection
          id="minderjaehrige"
          number="17"
          eyebrow="Jugendschutz"
          title="Daten von Kindern und Jugendlichen"
          intro="Unsere Angebote richten sich nicht gezielt an Kinder, die nach dem jeweils anwendbaren Recht nicht selbst wirksam in die Verarbeitung ihrer Daten einwilligen können."
        >
          <p>
            Soweit für eine Funktion eine
            Einwilligung erforderlich ist, gelten
            die gesetzlichen Anforderungen an die
            Einwilligung Minderjähriger.
          </p>

          <p>
            Erhalten wir Kenntnis davon, dass
            personenbezogene Daten eines Kindes
            ohne erforderliche Zustimmung
            verarbeitet wurden, werden wir die
            Daten prüfen und erforderlichenfalls
            löschen.
          </p>

          <p>
            Eltern oder
            Erziehungsberechtigte können sich
            hierzu unter{" "}
            <a
              href={`mailto:${PRIVACY_DATA.email}`}
            >
              {PRIVACY_DATA.email}
            </a>{" "}
            an uns wenden.
          </p>
        </PrivacySection>

        {/* =================================================
            ÄNDERUNGEN
        ================================================== */}

        <PrivacySection
          id="aenderungen"
          number="18"
          eyebrow="Aktualisierungen"
          title="Änderungen dieser Datenschutzerklärung"
          intro="Wir passen diese Datenschutzerklärung an, wenn sich unsere Angebote, eingesetzten Dienste oder gesetzlichen Anforderungen ändern."
        >
          <p>
            Die jeweils aktuelle Fassung ist auf
            dieser Seite abrufbar. Bei
            wesentlichen Änderungen, die
            bestehende Nutzerkonten oder
            Einwilligungen betreffen, informieren
            wir dich in angemessener Weise,
            beispielsweise über die App, per
            E-Mail oder durch einen deutlichen
            Hinweis auf unserer Website.
          </p>

          <p>
            Frühere Einwilligungen werden nicht
            automatisch auf neue,
            einwilligungspflichtige Zwecke
            erweitert. Soweit erforderlich,
            bitten wir dich erneut um eine
            Einwilligung.
          </p>

          <div className="privacy-version-card">
            <FiCheckCircle
              aria-hidden="true"
            />

            <div>
              <span>
                Aktuelle Fassung
              </span>

              <strong>
                Stand:{" "}
                {PRIVACY_DATA.lastUpdated}
              </strong>
            </div>
          </div>
        </PrivacySection>

        {/* =================================================
            ABSCHLUSS
        ================================================== */}

        <section className="privacy-contact">
          <div className="privacy-container">
            <div className="privacy-contact__card">
              <div className="privacy-contact__copy">
                <span>
                  Noch eine Frage?
                </span>

                <h2>
                  Datenschutz soll
                  <strong>
                    verständlich bleiben.
                  </strong>
                </h2>

                <p>
                  Bei Fragen zur Verarbeitung
                  deiner Daten, zu deinem
                  Nutzerkonto oder zu einer
                  Löschanfrage kannst du dich
                  direkt an uns wenden.
                </p>
              </div>

              <div className="privacy-contact__actions">
                <a
                  href={`mailto:${PRIVACY_DATA.email}?subject=${encodeURIComponent(
                    "Frage zum Datenschutz"
                  )}`}
                  className="privacy-contact__button privacy-contact__button--primary"
                >
                  <FiMail aria-hidden="true" />

                  Datenschutzanfrage senden

                  <FiArrowRight
                    aria-hidden="true"
                  />
                </a>

                <Link
                  to="/kontakt"
                  className="privacy-contact__button privacy-contact__button--secondary"
                >
                  Zur Kontaktseite

                  <FiArrowRight
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
