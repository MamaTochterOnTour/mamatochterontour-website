import {
  FiArrowUpRight,
  FiBriefcase,
  FiFileText,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiSmartphone,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Impressum.css";

/*
 * =========================================================
 * NOCH PRÜFEN UND ERSETZEN
 * =========================================================
 *
 * 1. Telefonnummer ergänzen.
 *
 * 2. Falls bereits vorhanden:
 *    Wirtschafts-Identifikationsnummer ergänzen.
 *
 * 3. Falls ein Registereintrag besteht:
 *    Registergericht und Registernummer ergänzen.
 *
 * 4. Den Abschnitt zur Verbraucherschlichtung nur so
 *    verwenden, wenn ihr tatsächlich nicht an einem
 *    Streitbeilegungsverfahren teilnehmt.
 */

const LEGAL_DATA = {
  businessName: "MamaTochterOnTour",
  ownerName: "Jennifer Weinreich",

  street: "Stettiner Straße 41",
  postalCode: "35410",
  city: "Hungen",
  country: "Deutschland",

  email: "mamatochterontour@outlook.de",

  /*
   * Beispiel:
   * phoneDisplay: "+49 123 456789",
   * phoneLink: "+49123456789",
   */
  phoneDisplay: "Telefonnummer ergänzen",
  phoneLink: "",

  vatId: "DE441919331",

  /*
   * Nur eintragen, wenn bereits vom
   * Bundeszentralamt für Steuern zugeteilt.
   *
   * Beispiel:
   * businessId: "DE123456789-00001",
   */
  businessId: "",

  /*
   * Nur eintragen, falls tatsächlich ein
   * Registereintrag besteht.
   */
  registerCourt: "",
  registerNumber: "",

  lastUpdated: "August 2026",
};

function LegalItem({
  icon: Icon,
  label,
  children,
  className = "",
}) {
  return (
    <div
      className={`imprint-legal-item ${className}`.trim()}
    >
      <span
        className="imprint-legal-item__icon"
        aria-hidden="true"
      >
        <Icon />
      </span>

      <div className="imprint-legal-item__content">
        <span className="imprint-legal-item__label">
          {label}
        </span>

        <div className="imprint-legal-item__value">
          {children}
        </div>
      </div>
    </div>
  );
}

function ImprintSection({
  number,
  eyebrow,
  title,
  children,
  featured = false,
}) {
  return (
    <section
      className={`imprint-section ${
        featured
          ? "imprint-section--featured"
          : ""
      }`.trim()}
    >
      <div className="imprint-section__top">
        <span className="imprint-section__number">
          {number}
        </span>

        <span className="imprint-section__eyebrow">
          {eyebrow}
        </span>
      </div>

      <h2>{title}</h2>

      <div className="imprint-section__content">
        {children}
      </div>
    </section>
  );
}

export default function Impressum() {
  const completeAddress =
    `${LEGAL_DATA.street}, ` +
    `${LEGAL_DATA.postalCode} ` +
    `${LEGAL_DATA.city}, ` +
    `${LEGAL_DATA.country}`;

  const mapsUrl =
    `https://www.google.com/maps/search/?api=1&query=` +
    encodeURIComponent(completeAddress);

  const hasRegisterEntry =
    Boolean(
      LEGAL_DATA.registerCourt &&
      LEGAL_DATA.registerNumber
    );

  return (
    <>
      <Navbar />

      <main className="imprint-page">
        {/* =================================================
            HERO
        ================================================== */}

        <section className="imprint-hero">
          <div
            className="imprint-hero__grid-decoration"
            aria-hidden="true"
          />

          <div
            className="imprint-hero__orb imprint-hero__orb--one"
            aria-hidden="true"
          />

          <div
            className="imprint-hero__orb imprint-hero__orb--two"
            aria-hidden="true"
          />

          <div className="imprint-container imprint-hero__layout">
            <div className="imprint-hero__content">
              <span className="imprint-hero__eyebrow">
                Rechtliche Anbieterkennzeichnung
              </span>

              <h1>
                Impressum
                <span>
                  Klar. Direkt. Transparent.
                </span>
              </h1>

              <p className="imprint-hero__lead">
                Hier findest du alle rechtlichen
                Angaben zu MamaTochterOnTour, unserer
                Website, unserem Online-Shop und
                unseren digitalen Angeboten.
              </p>

              <div className="imprint-hero__services">
                <span>
                  <FiGlobe aria-hidden="true" />
                  Website
                </span>

                <span>
                  <FiShoppingBag aria-hidden="true" />
                  Online-Shop
                </span>

                <span>
                  <FiSmartphone aria-hidden="true" />
                  Momentry App
                </span>
              </div>
            </div>

            <aside className="imprint-identity-card">
              <div className="imprint-identity-card__top">
                <span className="imprint-identity-card__status">
                  Anbieterin
                </span>

                <FiShield aria-hidden="true" />
              </div>

              <div className="imprint-identity-card__monogram">
                MTT
              </div>

              <div className="imprint-identity-card__copy">
                <span>
                  Digitale Angebote von
                </span>

                <strong>
                  {LEGAL_DATA.businessName}
                </strong>

                <p>
                  Inhaberin und Diensteanbieterin:
                  <br />
                  {LEGAL_DATA.ownerName}
                </p>
              </div>

              <a
                href={`mailto:${LEGAL_DATA.email}`}
                className="imprint-identity-card__link"
              >
                Kontakt aufnehmen

                <FiArrowUpRight aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        {/* =================================================
            HAUPTINHALT
        ================================================== */}

        <section className="imprint-content">
          <div className="imprint-container">
            <div className="imprint-intro">
              <div>
                <span className="imprint-section-label">
                  Angaben gemäß § 5 DDG
                </span>

                <h2>
                  Wer hinter
                  <span>
                    MamaTochterOnTour steckt.
                  </span>
                </h2>
              </div>

              <p>
                Die folgenden Informationen gelten
                für die Website, den Online-Shop,
                browserbasierte Angebote sowie die
                mobilen Anwendungen von
                MamaTochterOnTour, soweit dort auf
                dieses Impressum verwiesen wird.
              </p>
            </div>

            <div className="imprint-legal-overview">
              <LegalItem
                icon={FiUser}
                label="Diensteanbieterin"
              >
                <strong>
                  {LEGAL_DATA.ownerName}
                </strong>

                <span>
                  handelnd unter{" "}
                  {LEGAL_DATA.businessName}
                </span>

                <span>
                  Einzelunternehmen
                </span>
              </LegalItem>

              <LegalItem
                icon={FiMapPin}
                label="Ladungsfähige Anschrift"
              >
                <address>
                  {LEGAL_DATA.ownerName}
                  <br />
                  {LEGAL_DATA.street}
                  <br />
                  {LEGAL_DATA.postalCode}{" "}
                  {LEGAL_DATA.city}
                  <br />
                  {LEGAL_DATA.country}
                </address>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Adresse öffnen
                  <FiArrowUpRight
                    aria-hidden="true"
                  />
                </a>
              </LegalItem>

              <LegalItem
                icon={FiMail}
                label="E-Mail"
              >
                <a
                  href={`mailto:${LEGAL_DATA.email}`}
                >
                  {LEGAL_DATA.email}
                </a>
              </LegalItem>

              <LegalItem
                icon={FiPhone}
                label="Telefon"
                className={
                  LEGAL_DATA.phoneLink
                    ? ""
                    : "imprint-legal-item--todo"
                }
              >
                {LEGAL_DATA.phoneLink ? (
                  <a
                    href={`tel:${LEGAL_DATA.phoneLink}`}
                  >
                    {LEGAL_DATA.phoneDisplay}
                  </a>
                ) : (
                  <>
                    <strong>
                      {LEGAL_DATA.phoneDisplay}
                    </strong>

                    <small>
                      Vor Veröffentlichung eine
                      geschäftliche Telefonnummer
                      eintragen.
                    </small>
                  </>
                )}
              </LegalItem>
            </div>

            <div className="imprint-sections">
              <ImprintSection
                number="01"
                eyebrow="Steuerliche Angaben"
                title="Umsatzsteuer"
                featured
              >
                <p>
                  Umsatzsteuer-Identifikationsnummer
                  gemäß § 27a Umsatzsteuergesetz:
                </p>

                <strong className="imprint-code">
                  {LEGAL_DATA.vatId}
                </strong>

                {LEGAL_DATA.businessId ? (
                  <>
                    <p className="imprint-section__spaced">
                      Wirtschafts-Identifikationsnummer
                      gemäß § 139c Abgabenordnung:
                    </p>

                    <strong className="imprint-code">
                      {LEGAL_DATA.businessId}
                    </strong>
                  </>
                ) : (
                  <div className="imprint-todo-note">
                    <FiFileText aria-hidden="true" />

                    <p>
                      Sobald eine
                      Wirtschafts-Identifikationsnummer
                      zugeteilt wurde, muss sie hier
                      zusätzlich aufgenommen werden.
                    </p>
                  </div>
                )}
              </ImprintSection>

              <ImprintSection
                number="02"
                eyebrow="Registerangaben"
                title="Registereintrag"
              >
                {hasRegisterEntry ? (
                  <dl className="imprint-definition-list">
                    <div>
                      <dt>Registergericht</dt>
                      <dd>
                        {LEGAL_DATA.registerCourt}
                      </dd>
                    </div>

                    <div>
                      <dt>Registernummer</dt>
                      <dd>
                        {LEGAL_DATA.registerNumber}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <>
                    <p>
                      Es besteht derzeit kein im
                      Impressum angegebener
                      Registereintrag.
                    </p>

                    <div className="imprint-todo-note">
                      <FiBriefcase aria-hidden="true" />

                      <p>
                        Bitte vor Veröffentlichung
                        prüfen, ob eine Eintragung im
                        Handelsregister,
                        Partnerschaftsregister oder
                        einem vergleichbaren Register
                        besteht.
                      </p>
                    </div>
                  </>
                )}
              </ImprintSection>

              <ImprintSection
                number="03"
                eyebrow="Redaktionelle Verantwortung"
                title="Verantwortlich für Inhalte"
              >
                <p>
                  Verantwortlich für
                  journalistisch-redaktionell
                  gestaltete Inhalte gemäß § 18
                  Absatz 2 Medienstaatsvertrag:
                </p>

                <address className="imprint-address-block">
                  <strong>
                    {LEGAL_DATA.ownerName}
                  </strong>
                  <br />
                  {LEGAL_DATA.street}
                  <br />
                  {LEGAL_DATA.postalCode}{" "}
                  {LEGAL_DATA.city}
                  <br />
                  {LEGAL_DATA.country}
                </address>
              </ImprintSection>

              <ImprintSection
                number="04"
                eyebrow="Verbraucherinformation"
                title="Streitbeilegung"
              >
                <p>
                  Wir sind weder verpflichtet noch
                  bereit, an Streitbeilegungsverfahren
                  vor einer
                  Verbraucherschlichtungsstelle
                  teilzunehmen.
                </p>

                <div className="imprint-important-note">
                  <FiShield aria-hidden="true" />

                  <p>
                    Dieser Satz darf nur verwendet
                    werden, wenn MamaTochterOnTour
                    tatsächlich nicht freiwillig an
                    solchen Verfahren teilnimmt und
                    keine gesetzliche Verpflichtung
                    hierzu besteht.
                  </p>
                </div>
              </ImprintSection>

              <ImprintSection
                number="05"
                eyebrow="Hinweise zu Inhalten"
                title="Urheberrecht"
              >
                <p>
                  Die auf dieser Website, im
                  Online-Shop und in unseren
                  digitalen Angeboten veröffentlichten
                  Inhalte, Texte, Fotografien,
                  Grafiken, Reiseguides, Designs und
                  sonstigen Werke unterliegen dem
                  deutschen Urheberrecht.
                </p>

                <p>
                  Jede Vervielfältigung,
                  Bearbeitung, Verbreitung oder
                  sonstige Verwertung außerhalb der
                  gesetzlichen Grenzen bedarf der
                  vorherigen Zustimmung der
                  jeweiligen Rechteinhaberin oder des
                  jeweiligen Rechteinhabers.
                </p>

                <p>
                  Soweit Inhalte nicht von
                  MamaTochterOnTour erstellt wurden,
                  werden die Rechte Dritter beachtet
                  und entsprechende Quellen oder
                  Rechtehinweise kenntlich gemacht.
                </p>
              </ImprintSection>

              <ImprintSection
                number="06"
                eyebrow="Externe Angebote"
                title="Verlinkte Inhalte"
              >
                <p>
                  Unser Angebot kann Links zu
                  externen Websites und Diensten
                  Dritter enthalten. Auf deren
                  Inhalte und deren weitere
                  Verarbeitung haben wir keinen
                  unmittelbaren Einfluss.
                </p>

                <p>
                  Für die Inhalte externer Angebote
                  ist der jeweilige Anbieter
                  verantwortlich. Werden uns
                  konkrete Rechtsverletzungen
                  bekannt, entfernen wir betroffene
                  Verlinkungen im Rahmen der
                  gesetzlichen Vorgaben.
                </p>
              </ImprintSection>
            </div>

            <section className="imprint-contact-banner">
              <div className="imprint-contact-banner__copy">
                <span>
                  Rechtliche Anfrage
                </span>

                <h2>
                  Noch etwas unklar?
                </h2>

                <p>
                  Für rechtliche Hinweise, Fragen zu
                  unseren Angeboten oder Meldungen
                  zu möglichen Rechtsverletzungen
                  kannst du uns direkt kontaktieren.
                </p>
              </div>

              <a
                href={`mailto:${LEGAL_DATA.email}?subject=${encodeURIComponent(
                  "Rechtliche Anfrage an MamaTochterOnTour"
                )}`}
                className="imprint-contact-banner__button"
              >
                <FiMail aria-hidden="true" />

                <span>
                  <small>
                    E-Mail schreiben
                  </small>

                  <strong>
                    {LEGAL_DATA.email}
                  </strong>
                </span>

                <FiArrowUpRight aria-hidden="true" />
              </a>
            </section>

            <p className="imprint-updated">
              Stand: {LEGAL_DATA.lastUpdated}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}