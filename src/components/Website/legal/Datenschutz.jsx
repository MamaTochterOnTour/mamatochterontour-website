import {
  FiArrowRight,
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiCloud,
  FiCreditCard,
  FiDatabase,
  FiExternalLink,
  FiFileText,
  FiGlobe,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiServer,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiTrash2,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Datenschutz.css";

/*
 * WICHTIG:
 *
 * 1. HOSTING_PROVIDER und HOSTING_ADDRESS ersetzen.
 * 2. Nicht verwendete optionale Abschnitte entfernen.
 * 3. Bei neuen Diensten die Datenschutzerklärung aktualisieren.
 */

const COMPANY = {
  brandName: "MamaTochterOnTour",
  ownerName: "Jennifer Weinreich",
  street: "Stettiner Straße 41",
  postalCode: "35410",
  city: "Hungen",
  country: "Deutschland",
  phoneDisplay: "+49 178 6947734",
  phoneLink: "+491786947734",
  email: "mamatochterontour@outlook.de",
};

const PROVIDERS = {
  /*
   * BITTE VOR VERÖFFENTLICHUNG ERSETZEN.
   *
   * Beispiele:
   * Firebase Hosting / Google Cloud,
   * Vercel, Netlify, IONOS usw.
   */
  hostingName: "Vercel Inc.",
hostingAddress:
  "440 N Barranca Avenue #4133, Covina, CA 91723, Vereinigte Staaten",
  google:
    "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland",

  stripe:
    "Stripe Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland",

  brevo:
    "Brevo, Sendinblue GmbH, Köpenicker Straße 126, 10179 Berlin, Deutschland",

  apple:
    "Apple Distribution International Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Irland",
};

const navigationItems = [
  {
    href: "#verantwortliche",
    label: "Verantwortliche",
    number: "01",
  },
  {
    href: "#grundlagen",
    label: "Grundlagen",
    number: "02",
  },
  {
    href: "#bereitstellung",
    label: "Bereitstellung",
    number: "03",
  },
  {
    href: "#firebase",
    label: "Firebase",
    number: "04",
  },
  {
    href: "#konto",
    label: "Kundenkonto",
    number: "05",
  },
  {
    href: "#shop",
    label: "Online-Shop",
    number: "06",
  },
  {
    href: "#stripe",
    label: "Stripe",
    number: "07",
  },
  {
    href: "#brevo",
    label: "Brevo & Newsletter",
    number: "08",
  },
  {
    href: "#community",
    label: "Community",
    number: "09",
  },
  {
    href: "#kontakt",
    label: "Kontakt",
    number: "10",
  },
  {
    href: "#speicherung",
    label: "Speicherdauer",
    number: "11",
  },
  {
    href: "#rechte",
    label: "Deine Rechte",
    number: "12",
  },
];

const legalBases = [
  {
    title: "Art. 6 Abs. 1 lit. a DSGVO",
    text:
      "Verarbeitung auf Grundlage deiner freiwillig erteilten Einwilligung.",
  },
  {
    title: "Art. 6 Abs. 1 lit. b DSGVO",
    text:
      "Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder zur Erfüllung eines Vertrags.",
  },
  {
    title: "Art. 6 Abs. 1 lit. c DSGVO",
    text:
      "Verarbeitung zur Erfüllung gesetzlicher Verpflichtungen.",
  },
  {
    title: "Art. 6 Abs. 1 lit. f DSGVO",
    text:
      "Verarbeitung zur Wahrung unserer berechtigten Interessen oder der berechtigten Interessen Dritter.",
  },
];

const rights = [
  {
    title: "Auskunft",
    text:
      "Du kannst Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir über dich verarbeiten.",
  },
  {
    title: "Berichtigung",
    text:
      "Du kannst die Berichtigung unrichtiger und die Ergänzung unvollständiger Daten verlangen.",
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
      "Du kannst bestimmte Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten.",
  },
  {
    title: "Widerspruch",
    text:
      "Du kannst einer Verarbeitung aufgrund berechtigter Interessen aus Gründen deiner besonderen Situation widersprechen.",
  },
  {
    title: "Widerruf",
    text:
      "Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.",
  },
  {
    title: "Beschwerde",
    text:
      "Du kannst dich bei einer zuständigen Datenschutzaufsichtsbehörde beschweren.",
  },
];

function PrivacySection({
  id,
  number,
  eyebrow,
  title,
  icon: Icon,
  children,
  variant = "",
}) {
  return (
    <section
      id={id}
      className={`privacy-section ${
        variant
          ? `privacy-section--${variant}`
          : ""
      }`}
    >
      <div className="privacy-section__head">
        <span className="privacy-section__number">
          {number}
        </span>

        <span className="privacy-section__icon">
          <Icon aria-hidden="true" />
        </span>
      </div>

      <div className="privacy-section__body">
        <p className="privacy-section__eyebrow">
          {eyebrow}
        </p>

        <h2>{title}</h2>

        <div className="privacy-section__content">
          {children}
        </div>
      </div>
    </section>
  );
}

function ProviderCard({
  icon: Icon,
  name,
  address,
  purpose,
}) {
  return (
    <div className="privacy-provider-card">
      <span className="privacy-provider-card__icon">
        <Icon aria-hidden="true" />
      </span>

      <div>
        <small>Dienstanbieter</small>

        <strong>{name}</strong>

        {address && <p>{address}</p>}

        {purpose && (
          <span className="privacy-provider-card__purpose">
            {purpose}
          </span>
        )}
      </div>
    </div>
  );
}

function Datenschutz() {
  return (
    <>
      <Navbar />

      <main className="privacy-page">
        {/* =================================================
            HERO
        ================================================== */}

        <section className="privacy-hero">
          <div
            className="privacy-hero__glow privacy-hero__glow--green"
            aria-hidden="true"
          />

          <div
            className="privacy-hero__glow privacy-hero__glow--purple"
            aria-hidden="true"
          />

          <div
            className="privacy-hero__grid"
            aria-hidden="true"
          />

          <div className="privacy-container privacy-hero__layout">
            <div className="privacy-hero__content">
              <span className="privacy-hero__eyebrow">
                Datenschutz
              </span>

              <h1>
                Deine Daten.
                <span>
                  Transparent erklärt.
                </span>
              </h1>

              <p className="privacy-hero__lead">
                In dieser Datenschutzerklärung
                informieren wir dich darüber,
                welche personenbezogenen Daten wir
                auf unserer Website, im
                Online-Shop, in der Web-App und in
                der mobilen App verarbeiten.
              </p>

              <div className="privacy-hero__meta">
                <span>
                  <FiShield aria-hidden="true" />

                  DSGVO-Informationen
                </span>

                <span>
                  Stand: August 2026
                </span>
              </div>
            </div>

            <aside className="privacy-hero__visual">
              <div className="privacy-orbit privacy-orbit--one" />
              <div className="privacy-orbit privacy-orbit--two" />

              <div className="privacy-shield">
                <FiShield aria-hidden="true" />

                <span>
                  Privacy
                </span>

                <strong>
                  Deine Daten bleiben
                  deine Daten.
                </strong>
              </div>

            </aside>
          </div>
        </section>

        {/* =================================================
            INHALT
        ================================================== */}

        <section className="privacy-content">
          <div className="privacy-container privacy-content__layout">
            <aside className="privacy-navigation">
              <div className="privacy-navigation__inner">
                <p>Auf dieser Seite</p>

                <nav aria-label="Inhalt der Datenschutzerklärung">
                  {navigationItems.map(
                    (item) => (
                      <a
                        key={item.href}
                        href={item.href}
                      >
                        <span>
                          {item.number}
                        </span>

                        <strong>
                          {item.label}
                        </strong>

                        <FiChevronRight
                          aria-hidden="true"
                        />
                      </a>
                    )
                  )}
                </nav>

                <div className="privacy-navigation__contact">
                  <span>
                    Datenschutzanfrage
                  </span>

                  <a
                    href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(
                      "Datenschutzanfrage"
                    )}`}
                  >
                    <FiMail aria-hidden="true" />

                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </aside>

            <div className="privacy-sections">
              {/* Verantwortliche */}

              <PrivacySection
                id="verantwortliche"
                number="01"
                eyebrow="Wer entscheidet über die Verarbeitung?"
                title="Verantwortliche Stelle"
                icon={FiUser}
                variant="primary"
              >
                <p>
                  Verantwortliche im Sinne der
                  Datenschutz-Grundverordnung und
                  sonstiger datenschutzrechtlicher
                  Vorschriften ist:
                </p>

                <div className="privacy-controller">
                  <div>
                    <span>
                      Geschäftsbezeichnung
                    </span>

                    <strong>
                      {COMPANY.brandName}
                    </strong>
                  </div>

                  <div>
                    <span>Inhaberin</span>

                    <strong>
                      {COMPANY.ownerName}
                    </strong>
                  </div>

                  <address>
                    {COMPANY.street}
                    <br />
                    {COMPANY.postalCode}{" "}
                    {COMPANY.city}
                    <br />
                    {COMPANY.country}
                  </address>

                  <div className="privacy-controller__links">
                    <a
                      href={`mailto:${COMPANY.email}`}
                    >
                      <FiMail aria-hidden="true" />

                      {COMPANY.email}
                    </a>

                    <a
                      href={`tel:${COMPANY.phoneLink}`}
                    >
                      <FiSmartphone
                        aria-hidden="true"
                      />

                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </div>

                <p className="privacy-note">
                  Ein betrieblicher
                  Datenschutzbeauftragter ist
                  derzeit nicht bestellt, da nach
                  unserer gegenwärtigen
                  Unternehmensstruktur keine
                  gesetzliche Pflicht zur
                  Benennung besteht.
                </p>
              </PrivacySection>

              {/* Grundlagen */}

              <PrivacySection
                id="grundlagen"
                number="02"
                eyebrow="Rechtsgrundlagen"
                title="Wie und warum wir Daten verarbeiten"
                icon={FiFileText}
              >
                <p>
                  Personenbezogene Daten sind alle
                  Informationen, die sich auf eine
                  identifizierte oder
                  identifizierbare natürliche
                  Person beziehen. Wir verarbeiten
                  solche Daten nur, wenn eine
                  gesetzliche Grundlage besteht.
                </p>

                <div className="privacy-basis-grid">
                  {legalBases.map(
                    (basis) => (
                      <div key={basis.title}>
                        <FiCheckCircle
                          aria-hidden="true"
                        />

                        <strong>
                          {basis.title}
                        </strong>

                        <p>{basis.text}</p>
                      </div>
                    )
                  )}
                </div>

                <p>
                  Sofern wir uns auf berechtigte
                  Interessen stützen, bestehen
                  diese insbesondere in der
                  sicheren, wirtschaftlichen und
                  nutzerfreundlichen Bereitstellung
                  unserer digitalen Angebote, der
                  Verhinderung von Missbrauch und
                  der Kommunikation mit unserer
                  Community.
                </p>
              </PrivacySection>

              {/* Hosting */}

              <PrivacySection
                id="bereitstellung"
                number="03"
                eyebrow="Website und Server"
                title="Bereitstellung und Hosting"
                icon={FiServer}
                variant="warning"
              >

                <p>
                  Beim Aufruf unserer Website oder
                  Web-App verarbeitet der
                  eingesetzte Hosting-Anbieter
                  technisch erforderliche
                  Verbindungsdaten. Dazu können
                  insbesondere folgende Daten
                  gehören:
                </p>

                <ul className="privacy-list">
                  <li>IP-Adresse</li>
                  <li>Datum und Uhrzeit des Abrufs</li>
                  <li>
                    aufgerufene Seite oder Datei
                  </li>
                  <li>
                    Referrer-URL und Browsertyp
                  </li>
                  <li>
                    Betriebssystem und Gerätetyp
                  </li>
                  <li>
                    HTTP-Statuscode und übertragene
                    Datenmenge
                  </li>
                </ul>

                <p>
                  Die Verarbeitung erfolgt zur
                  technischen Bereitstellung, zur
                  Sicherstellung der Stabilität
                  und Sicherheit sowie zur
                  Erkennung und Abwehr von
                  Angriffen auf Grundlage von Art.
                  6 Abs. 1 lit. f DSGVO.
                </p>

                <ProviderCard
                  icon={FiCloud}
                  name={PROVIDERS.hostingName}
                  address={PROVIDERS.hostingAddress}
                  purpose="Hosting und technische Bereitstellung"
                />
              </PrivacySection>

              {/* Firebase */}

              <PrivacySection
                id="firebase"
                number="04"
                eyebrow="Technische Infrastruktur"
                title="Firebase und Google Cloud"
                icon={FiDatabase}
                variant="dark"
              >
                <p>
                  Für wesentliche technische
                  Funktionen unserer Website,
                  unseres Online-Shops, unserer
                  Web-App und unserer mobilen App
                  verwenden wir Dienste von
                  Google Firebase.
                </p>

                <ProviderCard
                  icon={FiDatabase}
                  name="Google Firebase"
                  address={PROVIDERS.google}
                  purpose="Authentifizierung, Datenbank, Cloud Functions und technische Infrastruktur"
                />

                <h3>
                  Firebase Authentication
                </h3>

                <p>
                  Firebase Authentication wird für
                  die Registrierung, Anmeldung und
                  Verwaltung von Benutzerkonten
                  eingesetzt. Abhängig von der
                  Anmeldemethode können
                  insbesondere folgende Daten
                  verarbeitet werden:
                </p>

                <ul className="privacy-list">
                  <li>
                    E-Mail-Adresse und
                    Benutzerkennung
                  </li>
                  <li>
                    verschlüsselte
                    Authentifizierungsinformationen
                  </li>
                  <li>
                    Anzeigename und gegebenenfalls
                    Profilbild
                  </li>
                  <li>
                    verwendeter Login-Anbieter
                  </li>
                  <li>
                    Zeitpunkt der Registrierung
                    und letzter Anmeldung
                  </li>
                  <li>
                    technische Sicherheits- und
                    Protokolldaten
                  </li>
                </ul>

                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1
                  lit. b DSGVO, soweit die
                  Anmeldung zur Nutzung unseres
                  Kundenkontos oder unserer
                  Angebote erforderlich ist.
                  Ergänzend erfolgt die
                  Verarbeitung zur Sicherung
                  unserer Systeme auf Grundlage
                  von Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h3>
                  Cloud Firestore
                </h3>

                <p>
                  In Cloud Firestore speichern wir
                  je nach Nutzung beispielsweise
                  Profildaten, App-Inhalte,
                  Reiseinformationen,
                  Community-Beiträge,
                  Bewertungen, Bestellungen,
                  erworbene Reiseguides,
                  Favoriten sowie technische
                  Statusinformationen.
                </p>

                <h3>
                  Cloud Functions
                </h3>

                <p>
                  Cloud Functions werden unter
                  anderem für serverseitige
                  Prozesse eingesetzt, etwa für
                  den Checkout, die Prüfung von
                  Gutscheinen, die Verarbeitung
                  von Stripe-Ereignissen, den
                  Versand von Bestellbestätigungen
                  und die Newsletter-Anmeldung.
                </p>

                <h3>
                  Datenübermittlung in Drittländer
                </h3>

                <p>
                  Bei Firebase kann eine
                  Verarbeitung auch außerhalb der
                  Europäischen Union und des
                  Europäischen Wirtschaftsraums,
                  insbesondere in den USA,
                  stattfinden. Nach Angaben von
                  Google wird Firebase
                  Authentication ausschließlich
                  über Rechenzentren in den USA
                  betrieben.
                </p>

                <p>
                  Google stützt internationale
                  Datenübermittlungen je nach
                  Fall auf einen
                  Angemessenheitsbeschluss,
                  insbesondere das
                  EU-US Data Privacy Framework,
                  oder auf
                  Standardvertragsklauseln und
                  ergänzende
                  Schutzmechanismen.
                </p>
              </PrivacySection>

              {/* Kundenkonto */}

              <PrivacySection
                id="konto"
                number="05"
                eyebrow="Registrierung und Anmeldung"
                title="Kundenkonto und Benutzerprofil"
                icon={FiUserCheck}
              >
                <p>
                  Nutzerinnen und Nutzer können
                  ein Kundenkonto erstellen, das
                  sowohl für unsere App als auch
                  für unseren Online-Shop
                  verwendet werden kann.
                </p>

                <p>
                  Dabei können insbesondere
                  folgende Daten verarbeitet
                  werden:
                </p>

                <ul className="privacy-list">
                  <li>
                    Vor- und Nachname oder
                    Anzeigename
                  </li>
                  <li>E-Mail-Adresse</li>
                  <li>Benutzerkennung</li>
                  <li>Profilbild</li>
                  <li>
                    hinterlegte Profil- und
                    Kontoeinstellungen
                  </li>
                  <li>
                    gekaufte Reiseguides und
                    Bestellhistorie
                  </li>
                  <li>
                    in der App erstellte oder
                    gespeicherte Inhalte
                  </li>
                </ul>

                <p>
                  Die Verarbeitung erfolgt zur
                  Bereitstellung des Kontos und
                  der damit verbundenen Funktionen
                  auf Grundlage von Art. 6 Abs. 1
                  lit. b DSGVO.
                </p>

                <h3>
                  Anmeldung mit Google
                </h3>

                <p>
                  Bei einer Anmeldung über Google
                  erhalten wir abhängig von deinen
                  Einstellungen bei Google
                  insbesondere deine
                  E-Mail-Adresse, deinen Namen,
                  dein Profilbild und eine
                  eindeutige Benutzerkennung.
                </p>

                <ProviderCard
                  icon={FiGlobe}
                  name="Google-Anmeldung"
                  address={PROVIDERS.google}
                  purpose="Optionale Anmeldung über ein Google-Konto"
                />

                <h3>
                  Anmeldung mit Apple
                </h3>

                <p>
                  Bei einer Anmeldung über Apple
                  erhalten wir abhängig von deiner
                  Auswahl insbesondere eine
                  Apple-Benutzerkennung, deinen
                  Namen und deine tatsächliche
                  oder von Apple bereitgestellte
                  Relay-E-Mail-Adresse.
                </p>

                <ProviderCard
                  icon={FiSmartphone}
                  name="Sign in with Apple"
                  address={PROVIDERS.apple}
                  purpose="Optionale Anmeldung über eine Apple-ID"
                />

                <p className="privacy-note">
                  Die Nutzung der Google- oder
                  Apple-Anmeldung ist freiwillig.
                  Alternativ kann ein Konto mit
                  E-Mail-Adresse und Passwort
                  erstellt werden.
                </p>
              </PrivacySection>

              {/* Shop */}

              <PrivacySection
                id="shop"
                number="06"
                eyebrow="Bestellungen"
                title="Online-Shop und digitale Reiseguides"
                icon={FiShoppingBag}
                variant="shop"
              >
                <p>
                  Bei einer Bestellung verarbeiten
                  wir die Daten, die für die
                  Anbahnung, Durchführung und
                  Abwicklung des Kaufvertrags
                  erforderlich sind.
                </p>

                <div className="privacy-data-columns">
                  <div>
                    <strong>
                      Bestelldaten
                    </strong>

                    <ul>
                      <li>
                        gekaufte Produkte
                      </li>
                      <li>
                        Bestellnummer
                      </li>
                      <li>
                        Bestellzeitpunkt
                      </li>
                      <li>
                        Preis, Rabatt und
                        Gesamtbetrag
                      </li>
                    </ul>
                  </div>

                  <div>
                    <strong>
                      Kundendaten
                    </strong>

                    <ul>
                      <li>Name</li>
                      <li>E-Mail-Adresse</li>
                      <li>Rechnungsanschrift</li>
                      <li>
                        Kundenkonto-Zuordnung
                      </li>
                    </ul>
                  </div>

                  <div>
                    <strong>
                      Nachweisdaten
                    </strong>

                    <ul>
                      <li>Zahlungsstatus</li>
                      <li>
                        Zustimmung zur sofortigen
                        Bereitstellung
                      </li>
                      <li>
                        Zeitpunkt der Zustimmung
                      </li>
                      <li>
                        verwendeter Rabatt
                      </li>
                    </ul>
                  </div>
                </div>

                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1
                  lit. b DSGVO. Soweit Daten für
                  steuer- oder handelsrechtliche
                  Nachweise aufbewahrt werden
                  müssen, erfolgt die Verarbeitung
                  zusätzlich auf Grundlage von
                  Art. 6 Abs. 1 lit. c DSGVO.
                </p>

                <p>
                  Bei einer Bestellung mit
                  Kundenkonto werden die erworbenen
                  Reiseguides dauerhaft dem
                  Benutzerkonto zugeordnet. Bei
                  einer Gastbestellung verwenden
                  wir die angegebene
                  E-Mail-Adresse zur Abwicklung
                  der Bestellung und zur
                  Bereitstellung der gekauften
                  Inhalte.
                </p>
              </PrivacySection>

              {/* Stripe */}

              <PrivacySection
                id="stripe"
                number="07"
                eyebrow="Zahlungsabwicklung"
                title="Stripe Checkout"
                icon={FiCreditCard}
                variant="purple"
              >
                <p>
                  Zur sicheren Abwicklung von
                  Zahlungen verwenden wir Stripe
                  Checkout. Die eigentliche
                  Eingabe und Verarbeitung der
                  Zahlungsdaten erfolgt auf den
                  Systemen von Stripe.
                </p>

                <ProviderCard
                  icon={FiCreditCard}
                  name="Stripe"
                  address={PROVIDERS.stripe}
                  purpose="Zahlungsabwicklung und Betrugsprävention"
                />

                <p>
                  Abhängig von der gewählten
                  Zahlungsart verarbeitet Stripe
                  insbesondere:
                </p>

                <ul className="privacy-list">
                  <li>
                    Name und Rechnungsanschrift
                  </li>
                  <li>E-Mail-Adresse</li>
                  <li>
                    Zahlungs- und
                    Transaktionsinformationen
                  </li>
                  <li>
                    Betrag, Währung und
                    Bestellreferenz
                  </li>
                  <li>
                    Geräte-, Browser- und
                    Verbindungsdaten
                  </li>
                  <li>
                    Informationen zur
                    Betrugsprävention
                  </li>
                </ul>

                <p>
                  Wir erhalten von Stripe
                  grundsätzlich keine vollständigen
                  Kreditkarten- oder
                  Bankkartendaten. Wir erhalten
                  jedoch Informationen über den
                  Zahlungsstatus und die
                  zugehörige Transaktion.
                </p>

                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1
                  lit. b DSGVO. Sicherheits- und
                  Betrugspräventionsmaßnahmen
                  können außerdem auf Art. 6 Abs. 1
                  lit. f DSGVO beruhen.
                </p>

                <p>
                  Stripe kann Daten im Rahmen
                  seiner eigenen gesetzlichen
                  Verpflichtungen, etwa zur
                  Betrugs- und Geldwäscheprävention,
                  teilweise in eigener
                  datenschutzrechtlicher
                  Verantwortlichkeit verarbeiten.
                  Dabei kann es auch zu
                  Datenübermittlungen außerhalb
                  des EWR kommen.
                </p>
              </PrivacySection>

              {/* Brevo */}

              <PrivacySection
                id="brevo"
                number="08"
                eyebrow="E-Mail-Kommunikation"
                title="Brevo, Newsletter und Bestellmails"
                icon={FiMail}
              >
                <ProviderCard
                  icon={FiMail}
                  name="Brevo"
                  address={PROVIDERS.brevo}
                  purpose="Newsletter und transaktionale E-Mails"
                />

                <h3>
                  Newsletter
                </h3>

                <p>
                  Du kannst dich freiwillig für
                  unseren Newsletter anmelden. Für
                  die Anmeldung verarbeiten wir
                  deine E-Mail-Adresse und
                  gegebenenfalls technische
                  Nachweisdaten zur Anmeldung und
                  Bestätigung.
                </p>

                <p>
                  Die Anmeldung erfolgt
                  grundsätzlich über ein
                  Bestätigungsverfahren. Erst nach
                  Bestätigung der Anmeldung wird
                  die E-Mail-Adresse in die Liste
                  der bestätigten
                  Newsletter-Abonnentinnen und
                  -Abonnenten aufgenommen.
                </p>

                <p>
                  Rechtsgrundlage für den
                  Newsletterversand ist deine
                  Einwilligung gemäß Art. 6 Abs. 1
                  lit. a DSGVO. Die Verarbeitung
                  von Nachweisdaten kann außerdem
                  auf Art. 6 Abs. 1 lit. f DSGVO
                  beruhen, da wir ein berechtigtes
                  Interesse am Nachweis einer
                  ordnungsgemäßen Einwilligung
                  haben.
                </p>

                <div className="privacy-highlight">
                  <FiBell aria-hidden="true" />

                  <div>
                    <strong>
                      Newsletter abbestellen
                    </strong>

                    <p>
                      Du kannst deine Einwilligung
                      jederzeit über den
                      Abmeldelink in einer
                      Newsletter-E-Mail oder durch
                      eine Nachricht an uns
                      widerrufen.
                    </p>
                  </div>
                </div>

                <h3>
                  Transaktionale E-Mails
                </h3>

                <p>
                  Brevo wird außerdem für
                  notwendige E-Mails eingesetzt,
                  etwa für
                  Bestellbestätigungen,
                  Downloadinformationen oder
                  andere Nachrichten zur
                  Vertragsabwicklung.
                </p>

                <p>
                  Diese Nachrichten werden nicht
                  auf Grundlage einer
                  Newsletter-Einwilligung, sondern
                  zur Durchführung des Vertrags
                  gemäß Art. 6 Abs. 1 lit. b DSGVO
                  versendet.
                </p>
              </PrivacySection>

              {/* Community */}

              <PrivacySection
                id="community"
                number="09"
                eyebrow="App, Bewertungen und Beiträge"
                title="Community-Funktionen"
                icon={FiMessageCircle}
                variant="community"
              >
                <p>
                  Unsere App und teilweise unser
                  Online-Shop enthalten
                  Community-Funktionen. Dazu
                  gehören je nach aktuellem
                  Funktionsumfang insbesondere:
                </p>

                <ul className="privacy-list">
                  <li>
                    Produktbewertungen
                  </li>
                  <li>
                    Beiträge und Kommentare
                  </li>
                  <li>
                    Fragen und Antworten
                  </li>
                  <li>
                    Reiseforum und Reisegruppen
                  </li>
                  <li>
                    Reisebeiträge und
                    Community-Profile
                  </li>
                </ul>

                <p>
                  Dabei können Benutzerkennung,
                  Anzeigename, Profilbild,
                  Zeitpunkt des Beitrags sowie die
                  von dir veröffentlichten Texte,
                  Bilder, Sternebewertungen und
                  sonstigen Inhalte verarbeitet
                  werden.
                </p>

                <div className="privacy-public-note">
                  <FiGlobe aria-hidden="true" />

                  <div>
                    <strong>
                      Öffentliche Inhalte
                    </strong>

                    <p>
                      Inhalte, die du in öffentlich
                      sichtbaren Community-Bereichen
                      veröffentlichst, können für
                      andere Nutzerinnen und Nutzer
                      sichtbar sein. Veröffentliche
                      dort keine vertraulichen
                      Informationen oder
                      personenbezogenen Daten
                      anderer Personen.
                    </p>
                  </div>
                </div>

                <p>
                  Die Verarbeitung erfolgt zur
                  Bereitstellung der jeweiligen
                  Funktion auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO. Maßnahmen
                  zur Moderation, Missbrauchs- und
                  Betrugsbekämpfung beruhen
                  ergänzend auf Art. 6 Abs. 1 lit. f
                  DSGVO.
                </p>

                <h3>
                  Gastbewertungen
                </h3>

                <p>
                  Soweit Bewertungen ohne
                  registriertes Kundenkonto
                  möglich sind, kann zur
                  technischen Zuordnung eine
                  anonyme Firebase-Benutzerkennung
                  erstellt werden. Öffentlich
                  angezeigt werden nur der
                  gewählte Name oder das gewählte
                  Kürzel, die Bewertung und der
                  Bewertungstext.
                </p>

                <h3>
                  Moderation und Löschung
                </h3>

                <p>
                  Wir dürfen Inhalte prüfen,
                  ausblenden oder löschen, wenn
                  dies zur Durchsetzung unserer
                  Regeln, zum Schutz anderer
                  Personen oder zur Erfüllung
                  rechtlicher Verpflichtungen
                  erforderlich ist.
                </p>
              </PrivacySection>

              {/* Kontakt */}

              <PrivacySection
                id="kontakt"
                number="10"
                eyebrow="Anfragen und Nachrichten"
                title="Kontaktaufnahme"
                icon={FiMail}
              >
                <p>
                  Wenn du uns per E-Mail,
                  Kontaktformular, über Social
                  Media oder auf anderem Weg
                  kontaktierst, verarbeiten wir die
                  von dir übermittelten
                  Informationen.
                </p>

                <p>
                  Dazu können insbesondere dein
                  Name, deine E-Mail-Adresse, dein
                  Social-Media-Benutzername, der
                  Inhalt deiner Nachricht sowie
                  gegebenenfalls Bestell- oder
                  Vertragsinformationen gehören.
                </p>

                <p>
                  Erfolgt die Anfrage im
                  Zusammenhang mit einem Vertrag
                  oder einer Bestellung, ist Art. 6
                  Abs. 1 lit. b DSGVO die
                  Rechtsgrundlage. Bei allgemeinen
                  Anfragen erfolgt die Verarbeitung
                  auf Grundlage unseres
                  berechtigten Interesses an der
                  Bearbeitung und Beantwortung von
                  Nachrichten gemäß Art. 6 Abs. 1
                  lit. f DSGVO.
                </p>

                <div className="privacy-mail-card">
                  <span>
                    <FiMail aria-hidden="true" />
                  </span>

                  <div>
                    <small>
                      Kontaktadresse
                    </small>

                    <strong>
                      {COMPANY.email}
                    </strong>
                  </div>

                  <a
                    href={`mailto:${COMPANY.email}`}
                    aria-label="E-Mail schreiben"
                  >
                    <FiExternalLink
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </PrivacySection>

              {/* Lokale Speicherung */}

              <PrivacySection
                id="lokale-speicherung"
                number="10A"
                eyebrow="Browser und Endgerät"
                title="Lokale Speicherung"
                icon={FiSmartphone}
              >
                <p>
                  Für bestimmte Funktionen können
                  Informationen lokal auf deinem
                  Gerät oder in deinem Browser
                  gespeichert werden. Dies kann
                  beispielsweise den Warenkorb,
                  Favoriten, Anzeigeeinstellungen
                  oder technische
                  Sitzungsinformationen betreffen.
                </p>

                <p>
                  Soweit diese Speicherung
                  technisch erforderlich ist,
                  erfolgt sie zur Bereitstellung
                  der ausdrücklich gewünschten
                  Funktion. Nicht erforderliche
                  Speicherungen würden wir nur
                  nach vorheriger Einwilligung
                  einsetzen.
                </p>

                <p>
                  Derzeit setzen wir nach dem
                  bekannten Funktionsstand keine
                  eigenständige
                  Reichweitenanalyse oder
                  personalisierte
                  Werbe-Tracking-Technologie ein.
                  Sollte sich dies ändern, wird
                  diese Datenschutzerklärung
                  angepasst und erforderlichenfalls
                  eine Einwilligung eingeholt.
                </p>
              </PrivacySection>

              {/* App */}

              <PrivacySection
                id="app"
                number="10B"
                eyebrow="Mobile Anwendung"
                title="Momentry App und Web-App"
                icon={FiSmartphone}
                variant="app"
              >
                <p>
                  Unsere mobile App und Web-App
                  dienen der Reiseplanung, der
                  Speicherung persönlicher
                  Reiseinformationen und dem
                  Austausch innerhalb der
                  Community.
                </p>

                <p>
                  Je nach Nutzung können
                  insbesondere folgende Daten
                  verarbeitet werden:
                </p>

                <ul className="privacy-list">
                  <li>
                    Benutzerkonto und Profil
                  </li>
                  <li>
                    angelegte Reisen und
                    Reisedaten
                  </li>
                  <li>
                    Packlisten und persönliche
                    Reiseeinträge
                  </li>
                  <li>
                    Reisegruppen und
                    Community-Zuordnungen
                  </li>
                  <li>
                    Beiträge, Fragen,
                    Kommentare und Antworten
                  </li>
                  <li>
                    hochgeladene Bilder und
                    Profildaten
                  </li>
                  <li>
                    erworbene oder freigeschaltete
                    Inhalte
                  </li>
                </ul>

                <p>
                  Die Verarbeitung erfolgt zur
                  Bereitstellung der von dir
                  genutzten Funktionen auf
                  Grundlage von Art. 6 Abs. 1 lit. b
                  DSGVO.
                </p>

                <p className="privacy-note">
                  Geräteberechtigungen wie
                  Kamera-, Foto-, Standort- oder
                  Benachrichtigungszugriff werden
                  nur verwendet, wenn die
                  jeweilige Funktion tatsächlich
                  eingebaut ist und du die
                  entsprechende Berechtigung über
                  dein Betriebssystem erteilst.
                </p>
              </PrivacySection>

              {/* Speicherdauer */}

              <PrivacySection
                id="speicherung"
                number="11"
                eyebrow="Löschung und Aufbewahrung"
                title="Speicherdauer"
                icon={FiTrash2}
              >
                <p>
                  Wir speichern personenbezogene
                  Daten grundsätzlich nur so lange,
                  wie sie für den jeweiligen Zweck
                  erforderlich sind oder
                  gesetzliche
                  Aufbewahrungspflichten bestehen.
                </p>

                <div className="privacy-storage-grid">
                  <div>
                    <strong>
                      Kundenkonto
                    </strong>

                    <p>
                      Bis zur Löschung des Kontos,
                      sofern keine gesetzlichen
                      Aufbewahrungspflichten oder
                      berechtigten Gründe für eine
                      weitere Speicherung bestehen.
                    </p>
                  </div>

                  <div>
                    <strong>
                      Bestellungen
                    </strong>

                    <p>
                      Vertrags-, Buchungs- und
                      steuerrelevante Unterlagen
                      werden entsprechend den
                      gesetzlichen
                      Aufbewahrungsfristen
                      gespeichert.
                    </p>
                  </div>

                  <div>
                    <strong>
                      Newsletter
                    </strong>

                    <p>
                      Bis zum Widerruf der
                      Einwilligung. Nachweisdaten
                      können darüber hinaus zur
                      Verteidigung gegen
                      Rechtsansprüche aufbewahrt
                      werden.
                    </p>
                  </div>

                  <div>
                    <strong>
                      Community-Inhalte
                    </strong>

                    <p>
                      Bis zur Löschung durch dich,
                      zur Löschung des Kontos oder
                      bis der Inhalt aus
                      rechtlichen oder
                      moderativen Gründen entfernt
                      wird.
                    </p>
                  </div>

                  <div>
                    <strong>
                      Kontaktanfragen
                    </strong>

                    <p>
                      Bis die Anfrage abschließend
                      bearbeitet wurde und keine
                      gesetzlichen oder
                      berechtigten Gründe für eine
                      weitere Speicherung
                      bestehen.
                    </p>
                  </div>

                  <div>
                    <strong>
                      Serverprotokolle
                    </strong>

                    <p>
                      Nur so lange, wie dies für
                      Sicherheit, Fehleranalyse
                      und Missbrauchsabwehr
                      erforderlich ist.
                    </p>
                  </div>
                </div>
              </PrivacySection>

              {/* Empfänger */}

              <PrivacySection
                id="empfaenger"
                number="11A"
                eyebrow="Dienstleister"
                title="Empfänger und Auftragsverarbeiter"
                icon={FiCloud}
              >
                <p>
                  Wir geben personenbezogene Daten
                  nur weiter, wenn dies zur
                  Vertragserfüllung erforderlich
                  ist, eine gesetzliche Pflicht
                  besteht, du eingewilligt hast
                  oder wir einen Dienstleister im
                  Rahmen einer
                  Auftragsverarbeitung einsetzen.
                </p>

                <p>
                  Zu den möglichen Empfängern
                  gehören insbesondere:
                </p>

                <ul className="privacy-list">
                  <li>
                    Hosting- und
                    Infrastruktur-Anbieter
                  </li>
                  <li>
                    Google Firebase und Google
                    Cloud
                  </li>
                  <li>
                    Stripe zur
                    Zahlungsabwicklung
                  </li>
                  <li>
                    Brevo für Newsletter und
                    E-Mail-Versand
                  </li>
                  <li>
                    Steuerberatung,
                    Rechtsberatung oder Behörden,
                    soweit dies erforderlich ist
                  </li>
                </ul>

                <p>
                  Mit Dienstleistern, die Daten in
                  unserem Auftrag verarbeiten,
                  schließen wir soweit erforderlich
                  Verträge zur
                  Auftragsverarbeitung gemäß Art.
                  28 DSGVO.
                </p>
              </PrivacySection>

              {/* Sicherheit */}

              <PrivacySection
                id="sicherheit"
                number="11B"
                eyebrow="Schutzmaßnahmen"
                title="Datensicherheit"
                icon={FiLock}
                variant="security"
              >
                <p>
                  Wir treffen angemessene
                  technische und organisatorische
                  Maßnahmen, um personenbezogene
                  Daten vor Verlust, Manipulation,
                  unberechtigtem Zugriff und
                  sonstigem Missbrauch zu schützen.
                </p>

                <div className="privacy-security-list">
                  <div>
                    <FiLock aria-hidden="true" />

                    <span>
                      verschlüsselte
                      Datenübertragung
                    </span>
                  </div>

                  <div>
                    <FiShield aria-hidden="true" />

                    <span>
                      Zugriffs- und
                      Berechtigungskonzepte
                    </span>
                  </div>

                  <div>
                    <FiDatabase aria-hidden="true" />

                    <span>
                      serverseitige Prüfungen
                      kritischer Vorgänge
                    </span>
                  </div>

                  <div>
                    <FiUserCheck
                      aria-hidden="true"
                    />

                    <span>
                      Authentifizierung und
                      Benutzerzuordnung
                    </span>
                  </div>
                </div>

                <p>
                  Eine vollständig risikofreie
                  Datenübertragung über das
                  Internet kann trotz
                  sorgfältiger Schutzmaßnahmen
                  nicht garantiert werden.
                </p>
              </PrivacySection>

              {/* Rechte */}

              <PrivacySection
                id="rechte"
                number="12"
                eyebrow="Deine Kontrolle"
                title="Deine Datenschutzrechte"
                icon={FiShield}
                variant="rights"
              >
                <p>
                  Dir stehen nach Maßgabe der
                  gesetzlichen Voraussetzungen
                  insbesondere folgende Rechte zu:
                </p>

                <div className="privacy-rights-grid">
                  {rights.map(
                    (right, index) => (
                      <article key={right.title}>
                        <span>
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <strong>
                          {right.title}
                        </strong>

                        <p>{right.text}</p>
                      </article>
                    )
                  )}
                </div>

                <div className="privacy-objection">
                  <FiShield aria-hidden="true" />

                  <div>
                    <strong>
                      Besonderer Hinweis zum
                      Widerspruchsrecht
                    </strong>

                    <p>
                      Soweit wir personenbezogene
                      Daten auf Grundlage von Art.
                      6 Abs. 1 lit. f DSGVO
                      verarbeiten, kannst du aus
                      Gründen, die sich aus deiner
                      besonderen Situation ergeben,
                      jederzeit Widerspruch gegen
                      die Verarbeitung einlegen.
                    </p>
                  </div>
                </div>

                <h3>
                  Widerruf von Einwilligungen
                </h3>

                <p>
                  Eine erteilte Einwilligung kann
                  jederzeit mit Wirkung für die
                  Zukunft widerrufen werden. Die
                  Rechtmäßigkeit der bis zum
                  Widerruf erfolgten Verarbeitung
                  bleibt davon unberührt.
                </p>

                <h3>
                  Beschwerderecht
                </h3>

                <p>
                  Du hast außerdem das Recht, dich
                  bei einer
                  Datenschutzaufsichtsbehörde zu
                  beschweren. Du kannst dich
                  insbesondere an die
                  Aufsichtsbehörde deines
                  Aufenthaltsortes, deines
                  Arbeitsplatzes oder des Orts des
                  vermuteten Verstoßes wenden.
                </p>
              </PrivacySection>

              {/* Pflichtangaben */}

              <PrivacySection
                id="pflichtangaben"
                number="13"
                eyebrow="Bereitstellung von Daten"
                title="Ist die Angabe deiner Daten verpflichtend?"
                icon={FiFileText}
              >
                <p>
                  Die Angabe personenbezogener
                  Daten ist grundsätzlich
                  freiwillig. Bestimmte Angaben
                  sind jedoch erforderlich, damit
                  wir einzelne Funktionen oder
                  Verträge bereitstellen können.
                </p>

                <p>
                  Ohne eine gültige
                  E-Mail-Adresse können wir
                  beispielsweise kein
                  Kundenkonto anlegen, keine
                  Bestellung abwickeln und keine
                  digitalen Reiseguides
                  bereitstellen. Ohne die für eine
                  Zahlung erforderlichen Angaben
                  kann Stripe keine Zahlung
                  durchführen.
                </p>
              </PrivacySection>

              {/* Automatisierte Entscheidungen */}

              <PrivacySection
                id="automatisierung"
                number="14"
                eyebrow="Automatisierte Verarbeitung"
                title="Keine ausschließlich automatisierte Entscheidung"
                icon={FiCheckCircle}
              >
                <p>
                  Eine ausschließlich auf einer
                  automatisierten Verarbeitung
                  beruhende Entscheidung mit
                  rechtlicher Wirkung oder ähnlich
                  erheblicher Beeinträchtigung im
                  Sinne von Art. 22 DSGVO findet
                  durch uns derzeit nicht statt.
                </p>

                <p>
                  Stripe kann im Rahmen der
                  Zahlungsabwicklung eigene
                  automatisierte
                  Sicherheits- und
                  Betrugspräventionsprüfungen
                  durchführen. Für Einzelheiten
                  gelten die
                  Datenschutzinformationen von
                  Stripe.
                </p>
              </PrivacySection>

              {/* Änderungen */}

              <PrivacySection
                id="aenderungen"
                number="15"
                eyebrow="Aktualität"
                title="Änderungen dieser Datenschutzerklärung"
                icon={FiFileText}
              >
                <p>
                  Wir passen diese
                  Datenschutzerklärung an, wenn
                  sich unsere Angebote,
                  eingesetzten Dienste oder
                  rechtlichen Anforderungen
                  ändern.
                </p>

                <p>
                  Es gilt die jeweils auf dieser
                  Seite veröffentlichte Fassung.
                  Das Datum der letzten
                  Aktualisierung findest du im
                  oberen Bereich dieser
                  Datenschutzerklärung.
                </p>
              </PrivacySection>
            </div>
          </div>
        </section>

        {/* =================================================
            ABSCHLUSS
        ================================================== */}

        <section className="privacy-footer-section">
          <div className="privacy-container">
            <div className="privacy-footer-card">
              <div>
                <span>
                  Fragen zum Datenschutz?
                </span>

                <h2>
                  Deine Daten.
                  <strong>
                    Deine Entscheidung.
                  </strong>
                </h2>

                <p>
                  Bei Fragen zur Verarbeitung
                  deiner Daten oder zur Ausübung
                  deiner Datenschutzrechte kannst
                  du dich direkt an uns wenden.
                </p>
              </div>

              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(
                  "Datenschutzanfrage"
                )}`}
              >
                <FiMail aria-hidden="true" />

                <span>
                  <small>
                    Datenschutzanfrage
                  </small>

                  <strong>
                    {COMPANY.email}
                  </strong>
                </span>

                <FiArrowRight
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Datenschutz;