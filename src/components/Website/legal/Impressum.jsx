import {
  FiArrowRight,
  FiCamera,
  FiCode,
  FiExternalLink,
  FiFileText,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiSmartphone,
  FiUser,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Impressum.css";

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
  vatId: "DE441919331",
};

const navigationItems = [
  {
    href: "#anbieter",
    label: "Anbieter",
    number: "01",
  },
  {
    href: "#kontakt",
    label: "Kontakt",
    number: "02",
  },
  {
    href: "#steuer",
    label: "Steuerangaben",
    number: "03",
  },
  {
    href: "#redaktion",
    label: "Redaktion",
    number: "04",
  },
  {
    href: "#streitbeilegung",
    label: "Streitbeilegung",
    number: "05",
  },
  {
    href: "#entwicklung",
    label: "Entwicklung",
    number: "06",
  },
  {
    href: "#urheberrecht",
    label: "Urheberrecht",
    number: "07",
  },
];

function LegalSection({
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
      className={`imprint-section ${
        variant
          ? `imprint-section--${variant}`
          : ""
      }`}
    >
      <div className="imprint-section__head">
        <span className="imprint-section__number">
          {number}
        </span>

        <span className="imprint-section__icon">
          <Icon aria-hidden="true" />
        </span>
      </div>

      <div className="imprint-section__body">
        <p className="imprint-section__eyebrow">
          {eyebrow}
        </p>

        <h2>{title}</h2>

        <div className="imprint-section__content">
          {children}
        </div>
      </div>
    </section>
  );
}

function Impressum() {
  return (
    <>
      <Navbar />

      <main className="imprint-page">
        {/* =================================================
            HERO
        ================================================== */}

        <section className="imprint-hero">
          <div
            className="imprint-hero__glow imprint-hero__glow--green"
            aria-hidden="true"
          />

          <div
            className="imprint-hero__glow imprint-hero__glow--purple"
            aria-hidden="true"
          />

          <div
            className="imprint-hero__grid"
            aria-hidden="true"
          />

          <div className="imprint-container imprint-hero__layout">
            <div className="imprint-hero__content">
              <span className="imprint-hero__eyebrow">
                Rechtliche Informationen
              </span>

              <h1>
                Impressum.
                <span>
                  Klar, persönlich und
                  transparent.
                </span>
              </h1>

              <p className="imprint-hero__lead">
                Hier findest du die gesetzlich
                vorgeschriebenen Anbieterangaben
                für die Website, den Online-Shop,
                die Web-App und die mobile App von
                MamaTochterOnTour.
              </p>

              <div className="imprint-hero__meta">
                <span>
                  <FiFileText
                    aria-hidden="true"
                  />

                  Angaben gemäß § 5 DDG
                </span>

                <span>
                  Stand: August 2026
                </span>
              </div>
            </div>

            <aside className="imprint-hero__identity">
              <div className="imprint-hero__identity-top">
                <span>Betreiberin</span>

                <FiUser aria-hidden="true" />
              </div>

              <strong>
                Jennifer
                <br />
                Weinreich
              </strong>

              <p>
                Einzelunternehmerin
                <br />
                handelnd unter
              </p>

              <div className="imprint-hero__brand">
                Mama
                <span>Tochter</span>
                OnTour
              </div>

              <div className="imprint-hero__identity-line">
                <span>Website</span>
                <span>Shop</span>
                <span>App</span>
                <span>Web-App</span>
              </div>
            </aside>
          </div>
        </section>

        {/* =================================================
            INHALT
        ================================================== */}

        <section className="imprint-content">
          <div className="imprint-container imprint-content__layout">
            <aside className="imprint-navigation">
              <div className="imprint-navigation__inner">
                <p>
                  Auf dieser Seite
                </p>

                <nav aria-label="Inhalt des Impressums">
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

                        <FiArrowRight
                          aria-hidden="true"
                        />
                      </a>
                    )
                  )}
                </nav>

                <div className="imprint-navigation__contact">
                  <span>
                    Direkter Kontakt
                  </span>

                  <a
                    href={`mailto:${COMPANY.email}`}
                  >
                    <FiMail
                      aria-hidden="true"
                    />

                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </aside>

            <div className="imprint-sections">
              {/* Anbieter */}

              <LegalSection
                id="anbieter"
                number="01"
                eyebrow="Diensteanbieterin"
                title="Angaben gemäß § 5 DDG"
                icon={FiUser}
                variant="primary"
              >
                <div className="imprint-provider">
                  <div>
                    <span className="imprint-detail-label">
                      Geschäftsbezeichnung
                    </span>

                    <strong>
                      {COMPANY.brandName}
                    </strong>
                  </div>

                  <div>
                    <span className="imprint-detail-label">
                      Inhaberin
                    </span>

                    <strong>
                      {COMPANY.ownerName}
                    </strong>

                    <p>
                      Einzelunternehmerin,
                      handelnd unter{" "}
                      {COMPANY.brandName}
                    </p>
                  </div>

                  <div>
                    <span className="imprint-detail-label">
                      Geschäftsanschrift
                    </span>

                    <address>
                      {COMPANY.street}
                      <br />
                      {COMPANY.postalCode}{" "}
                      {COMPANY.city}
                      <br />
                      {COMPANY.country}
                    </address>
                  </div>
                </div>
              </LegalSection>

              {/* Kontakt */}

              <LegalSection
                id="kontakt"
                number="02"
                eyebrow="Erreichbarkeit"
                title="Kontakt"
                icon={FiMessageIcon}
              >
                <div className="imprint-contact-grid">
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="imprint-contact-card"
                  >
                    <span className="imprint-contact-card__icon">
                      <FiMail
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      <small>
                        E-Mail
                      </small>

                      <strong>
                        {COMPANY.email}
                      </strong>
                    </span>

                    <FiExternalLink
                      className="imprint-contact-card__arrow"
                      aria-hidden="true"
                    />
                  </a>

                  <a
                    href={`tel:${COMPANY.phoneLink}`}
                    className="imprint-contact-card"
                  >
                    <span className="imprint-contact-card__icon">
                      <FiPhone
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      <small>
                        Telefon
                      </small>

                      <strong>
                        {COMPANY.phoneDisplay}
                      </strong>
                    </span>

                    <FiExternalLink
                      className="imprint-contact-card__arrow"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                <div className="imprint-address-line">
                  <FiMapPin aria-hidden="true" />

                  <span>
                    {COMPANY.street},{" "}
                    {COMPANY.postalCode}{" "}
                    {COMPANY.city},{" "}
                    {COMPANY.country}
                  </span>
                </div>
              </LegalSection>

              {/* Steuer */}

              <LegalSection
                id="steuer"
                number="03"
                eyebrow="Steuerliche Angaben"
                title="Umsatzsteuer"
                icon={FiFileText}
              >
                <p>
                  Umsatzsteuer-Identifikationsnummer
                  gemäß § 27a Umsatzsteuergesetz:
                </p>

                <div className="imprint-vat">
                  <span>USt-IdNr.</span>

                  <strong>
                    {COMPANY.vatId}
                  </strong>
                </div>
              </LegalSection>

              {/* Redaktion */}

              <LegalSection
                id="redaktion"
                number="04"
                eyebrow="Inhaltliche Verantwortung"
                title="Redaktionell verantwortlich"
                icon={FiFileText}
              >
                <p>
                  Verantwortlich für
                  journalistisch-redaktionelle
                  Inhalte im Sinne des § 18
                  Absatz 2 Medienstaatsvertrag:
                </p>

                <div className="imprint-person-card">
                  <span className="imprint-person-card__avatar">
                    JW
                  </span>

                  <div>
                    <strong>
                      {COMPANY.ownerName}
                    </strong>

                    <address>
                      {COMPANY.street}
                      <br />
                      {COMPANY.postalCode}{" "}
                      {COMPANY.city}
                      <br />
                      {COMPANY.country}
                    </address>
                  </div>
                </div>
              </LegalSection>

              {/* Streitbeilegung */}

              <LegalSection
                id="streitbeilegung"
                number="05"
                eyebrow="Verbraucherinformation"
                title="Streitbeilegung"
                icon={FiShield}
                variant="purple"
              >
                <p>
                  Wir sind weder verpflichtet
                  noch bereit, an
                  Streitbeilegungsverfahren vor
                  einer Verbraucherschlichtungsstelle
                  teilzunehmen.
                </p>

                <div className="imprint-legal-highlight">
                  <FiShield
                    aria-hidden="true"
                  />

                  <p>
                    Sollte es einmal ein Problem
                    mit einer Bestellung oder
                    einem unserer digitalen
                    Angebote geben, kannst du
                    dich selbstverständlich
                    direkt an uns wenden.
                  </p>
                </div>

                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(
                    "Frage zu einer Bestellung"
                  )}`}
                  className="imprint-inline-link"
                >
                  Direkt Kontakt aufnehmen

                  <FiArrowRight
                    aria-hidden="true"
                  />
                </a>
              </LegalSection>

              {/* Eigene Entwicklung */}

              <LegalSection
                id="entwicklung"
                number="06"
                eyebrow="Made by us"
                title="Eigene Konzeption und Entwicklung"
                icon={FiCode}
                variant="dark"
              >
                <p>
                  Konzeption, Gestaltung,
                  individuelle Entwicklung und
                  redaktionelle Betreuung dieser
                  Website, des Online-Shops, der
                  Web-App sowie der mobilen App
                  „Momentry by
                  MamaTochterOnTour“ erfolgen
                  eigenständig durch
                  MamaTochterOnTour.
                </p>

                <p>
                  Unsere digitalen Angebote
                  wurden nicht durch eine externe
                  Webdesign-, Software- oder
                  Entwicklungsagentur für uns
                  erstellt.
                </p>

                <div className="imprint-development-grid">
                  <div>
                    <FiCode
                      aria-hidden="true"
                    />

                    <span>
                      Website und Online-Shop
                    </span>
                  </div>

                  <div>
                    <FiSmartphone
                      aria-hidden="true"
                    />

                    <span>
                      Mobile App und Web-App
                    </span>
                  </div>

                  <div>
                    <FiCamera
                      aria-hidden="true"
                    />

                    <span>
                      Inhalte und Fotografien
                    </span>
                  </div>
                </div>

                <p className="imprint-note imprint-note--dark">
  Für einzelne technische Funktionen,
  Zahlungsprozesse, den Versand von
  Nachrichten und den Betrieb unserer
  digitalen Angebote nutzen wir
  technische Dienste externer Anbieter.
  Diese stellen einzelne Infrastrukturen
  und Dienstleistungen bereit, haben
  unsere Website, unseren Online-Shop,
  unsere Web-App und unsere mobile App
  jedoch nicht für uns konzipiert oder
  entwickelt. Weitere Informationen zu
  den eingesetzten Diensten findest du
  in unserer Datenschutzerklärung.
</p>
              </LegalSection>

              {/* Urheberrecht */}

              <LegalSection
                id="urheberrecht"
                number="07"
                eyebrow="Texte, Bilder und Guides"
                title="Urheberrecht und Bildnachweise"
                icon={FiCamera}
              >
                <p>
  Die auf dieser Website, im Online-Shop,
  in der Web-App und in der mobilen App
  veröffentlichten eigenen Texte,
  Reiseguides, Fotografien und sonstigen
  redaktionellen Inhalte wurden – soweit
  nicht ausdrücklich anders gekennzeichnet –
  von MamaTochterOnTour selbst erstellt.
</p>

<p>
  Die verwendeten Reise-, Erlebnis- und
  Produktfotografien stammen – soweit nicht
  anders angegeben – aus unserem eigenen
  Bildarchiv und wurden von uns selbst
  aufgenommen.
</p>

<p>
  Davon ausgenommen sind insbesondere
  technisch eingebundene Symbole,
  Markenkennzeichen, Benutzerinhalte und
  sonstige Inhalte Dritter. Für diese gelten
  die Rechte und Lizenzbedingungen der
  jeweiligen Rechteinhaberinnen und
  Rechteinhaber.
</p>

<p>
  Die durch uns erstellten Inhalte und Werke
  unterliegen dem deutschen Urheberrecht.
  Eine Vervielfältigung, Bearbeitung,
  Verbreitung oder sonstige Verwertung
  außerhalb der gesetzlich zulässigen Grenzen
  bedarf unserer vorherigen Zustimmung.
</p>
              </LegalSection>
            </div>
          </div>
        </section>

        {/* =================================================
            ABSCHLUSS
        ================================================== */}

        <section className="imprint-footer-section">
          <div className="imprint-container">
            <div className="imprint-footer-card">
              <div>
                <span>
                  Noch etwas unklar?
                </span>

                <h2>
                  Sprich direkt
                  <strong>
                    mit uns.
                  </strong>
                </h2>

                <p>
                  Bei Fragen zu unseren
                  rechtlichen Angaben, unseren
                  digitalen Angeboten oder einer
                  Bestellung erreichst du uns
                  direkt per E-Mail.
                </p>
              </div>

              <a
                href={`mailto:${COMPANY.email}`}
              >
                <FiMail aria-hidden="true" />

                <span>
                  <small>
                    E-Mail schreiben
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

/*
 * Kleiner Alias, damit wir im JSX einen
 * verständlichen Namen verwenden können.
 */
function FiMessageIcon(props) {
  return <FiMail {...props} />;
}

export default Impressum;