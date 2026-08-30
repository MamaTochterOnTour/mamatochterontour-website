import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiCheckCircle,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiGlobe,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiRefreshCw,
  FiShoppingBag,
  FiStar,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./AGB.css";


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
   AGB
========================================================= */

export default function AGB() {
  return (
    <>
      <Navbar />

      <main className="agb-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="agb-hero">
          <div className="agb-hero-glow agb-hero-glow-green" />
          <div className="agb-hero-glow agb-hero-glow-purple" />

          <div className="agb-container agb-hero-inner">

            <AnimatedSection className="agb-hero-content">

              <div className="agb-eyebrow agb-eyebrow-light">
                <span className="agb-eyebrow-line" />
                <span>Rechtliches</span>
              </div>

              <h1 className="agb-hero-title">
                Allgemeine
                <span>Geschäftsbedingungen.</span>
              </h1>

              <p className="agb-hero-text">
                Die folgenden Allgemeinen Geschäftsbedingungen
                gelten für unseren Onlineshop sowie für die
                Nutzung von Momentry by MamaTochterOnTour in
                der Web-App und unseren mobilen Apps.
              </p>

              <div className="agb-hero-pills">

                <div className="agb-hero-pill">
                  <FiFileText />
                  <span>Digitale Reiseguides</span>
                </div>

                <div className="agb-hero-pill">
                  <FiUser />
                  <span>Momentry</span>
                </div>

                <div className="agb-hero-pill">
                  <FiStar />
                  <span>Free & Premium</span>
                </div>

              </div>

            </AnimatedSection>

          </div>
        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="agb-intro">

          <div className="agb-container">

            <AnimatedSection className="agb-intro-grid">

              <div className="agb-intro-left">

                <div className="agb-eyebrow agb-eyebrow-dark">
                  <span className="agb-eyebrow-line" />
                  <span>Das Wichtigste vorab</span>
                </div>

                <h2>
                  Transparent.
                  <span>Verständlich.</span>
                </h2>

              </div>

              <div className="agb-intro-right">

                <p>
                  Wir möchten, dass du weißt, wie Käufe in
                  unserem Onlineshop funktionieren, welche
                  Bedingungen für dein Momentry-Konto gelten
                  und welche Regeln bei der Nutzung unserer
                  Community und Premium-Funktionen zu beachten
                  sind.
                </p>

                <p>
                  Diese AGB gelten deshalb sowohl für digitale
                  Reiseguides als auch für Momentry by
                  MamaTochterOnTour in der Web-App und den
                  unterstützten Apps.
                </p>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            AGB CONTENT
        ===================================================== */}

        <section className="agb-content-section">

          <div className="agb-container">

            <div className="agb-card-grid">


              {/* 01 */}

              <AnimatedSection className="agb-card agb-card-wide">

                <div className="agb-card-number">
                  01
                </div>

                <div className="agb-card-icon">
                  <FiFileText />
                </div>

                <h3>
                  Geltungsbereich und Anbieter
                </h3>

                <p>
                  Diese Allgemeinen Geschäftsbedingungen gelten
                  für die Nutzung der von MamaTochterOnTour
                  angebotenen digitalen Angebote sowie für
                  Verträge, die über unseren Onlineshop, unsere
                  Web-App oder unsere unterstützten Apps
                  geschlossen werden.
                </p>

                <p>
                  Hierzu gehören insbesondere der Kauf digitaler
                  Reiseguides sowie die kostenlose und
                  kostenpflichtige Nutzung von Momentry by
                  MamaTochterOnTour.
                </p>

                <div className="agb-address">

                  <strong>
                    Vertragspartnerin und Anbieterin:
                  </strong>

                  <span>
                    MamaTochterOnTour
                  </span>

                  <span>
                    Jennifer Weinreich
                  </span>

                  <span>
                    Stettiner Straße 41
                  </span>

                  <span>
                    35410 Hungen
                  </span>

                  <span>
                    Deutschland
                  </span>

                  <a href="mailto:mamatochterontour@outlook.de">
                    mamatochterontour@outlook.de
                  </a>

                </div>

                <p>
                  Verbraucher ist jede natürliche Person, die
                  ein Rechtsgeschäft zu Zwecken abschließt, die
                  überwiegend weder ihrer gewerblichen noch ihrer
                  selbstständigen beruflichen Tätigkeit
                  zugerechnet werden können.
                </p>

              </AnimatedSection>


              {/* 02 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  02
                </div>

                <div className="agb-card-icon">
                  <FiShoppingBag />
                </div>

                <h3>
                  Unsere digitalen Angebote
                </h3>

                <p>
                  MamaTochterOnTour bietet digitale Reiseguides
                  sowie die digitale Plattform Momentry by
                  MamaTochterOnTour an.
                </p>

                <p>
                  Unsere Reiseguides werden grundsätzlich als
                  digitale PDF-Dateien bereitgestellt. Eine
                  Lieferung körperlicher Produkte erfolgt nicht,
                  sofern dies beim jeweiligen Angebot nicht
                  ausdrücklich anders angegeben ist.
                </p>

                <p>
                  Momentry ist eine digitale Anwendung zur
                  Reiseplanung, zum Austausch innerhalb einer
                  Reise-Community sowie zur Erstellung und
                  Verwaltung eigener Inhalte.
                </p>

                <p>
                  Momentry kann – abhängig von der jeweils
                  angebotenen Version – über eine Web-App sowie
                  über Apps für unterstützte Betriebssysteme
                  genutzt werden.
                </p>

                <p>
                  Maßgeblich für den konkreten Funktionsumfang
                  eines Angebots ist die jeweilige
                  Leistungsbeschreibung zum Zeitpunkt des
                  Vertragsschlusses.
                </p>

              </AnimatedSection>


              {/* 03 */}

              <AnimatedSection
                className="agb-card"
                delay={0.05}
              >

                <div className="agb-card-number">
                  03
                </div>

                <div className="agb-card-icon">
                  <FiUser />
                </div>

                <h3>
                  Momentry-Konto
                </h3>

                <p>
                  Für die Nutzung der Web-App und der mobilen
                  beziehungsweise unterstützten Momentry-Apps
                  ist ein Benutzerkonto erforderlich.
                </p>

                <p>
                  Die Erstellung eines Benutzerkontos ist
                  kostenlos.
                </p>

                <p>
                  Das Momentry-Konto ist zugleich das
                  Kundenkonto für den Onlineshop von
                  MamaTochterOnTour. Soweit technisch
                  unterstützt, können dieselben Zugangsdaten und
                  Anmeldemethoden in Onlineshop, Web-App und App
                  verwendet werden.
                </p>

                <p>
                  Du bist verpflichtet, bei der Registrierung
                  zutreffende Angaben zu machen und deine
                  Zugangsdaten vor dem unbefugten Zugriff
                  Dritter zu schützen.
                </p>

                <p>
                  Das Benutzerkonto ist persönlich und darf
                  grundsätzlich nicht auf andere Personen
                  übertragen werden.
                </p>

              </AnimatedSection>


              {/* 04 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  04
                </div>

                <div className="agb-card-icon">
                  <FiCheckCircle />
                </div>

                <h3>
                  Kostenlose Nutzung von Momentry
                </h3>

                <p>
                  Momentry stellt Nutzerinnen und Nutzern einen
                  kostenlosen Funktionsumfang zur Verfügung.
                </p>

                <p>
                  Zum kostenlosen Angebot können insbesondere
                  Community-Funktionen wie Beiträge, Stories,
                  Fragen und Antworten, Reisegruppen,
                  Reiseforum sowie persönliche
                  Reisetagebücher gehören.
                </p>

                <p>
                  Auch Funktionen zur Reiseplanung können in
                  einem begrenzten Umfang kostenlos genutzt
                  werden.
                </p>

                <p>
                  Für einzelne Funktionen können
                  Nutzungslimits gelten. Hierzu können
                  insbesondere eine begrenzte Anzahl von Reisen,
                  Planungsinhalten oder Funktionsmöglichkeiten
                  gehören.
                </p>

                <p>
                  Der jeweils aktuelle kostenlose
                  Funktionsumfang wird innerhalb von Momentry
                  beziehungsweise vor Nutzung der jeweiligen
                  Funktion angezeigt.
                </p>

              </AnimatedSection>


              {/* 05 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  05
                </div>

                <div className="agb-card-icon">
                  <FiStar />
                </div>

                <h3>
                  Momentry Premium
                </h3>

                <p>
                  Zusätzlich zum kostenlosen Funktionsumfang
                  kann ein kostenpflichtiges
                  Momentry-Premium-Abonnement abgeschlossen
                  werden.
                </p>

                <p>
                  Premium erweitert den innerhalb von Momentry
                  verfügbaren Funktionsumfang.
                </p>

                <p>
                  Zu den Premium-Funktionen können insbesondere
                  erweiterte beziehungsweise vollständige
                  Funktionen der Reiseplanung, zusätzliche
                  Gruppenchat-Funktionen sowie erweiterte
                  Story-Funktionen gehören.
                </p>

                <p>
                  Welche Funktionen konkret Bestandteil von
                  Premium sind, wird vor Abschluss des
                  Abonnements angezeigt.
                </p>

                <div className="agb-notice">
                  <FiCheckCircle />

                  <p>
                    Ein Premium-Abonnement beinhaltet nicht
                    automatisch kostenpflichtige Reiseguides.
                    Ebenso führt der Kauf eines Reiseguides
                    nicht automatisch zu einer
                    Premium-Mitgliedschaft.
                  </p>
                </div>

              </AnimatedSection>


              {/* 06 */}

              <AnimatedSection className="agb-card agb-card-wide agb-card-accent">

                <div className="agb-card-number">
                  06
                </div>

                <div className="agb-card-icon">
                  <FiCreditCard />
                </div>

                <h3>
                  Premium-Abonnements, Laufzeit und Verlängerung
                </h3>

                <p>
                  Momentry Premium wird als Monats- oder
                  Jahresabonnement angeboten.
                </p>

                <div className="agb-consent-box">

                  <div className="agb-consent-icon">
                    <FiRefreshCw />
                  </div>

                  <div>
                    <strong>
                      Automatische Verlängerung
                    </strong>

                    <p>
                      Das Abonnement verlängert sich nach Ablauf
                      des jeweiligen Abrechnungszeitraums
                      automatisch um einen weiteren
                      entsprechenden Zeitraum, sofern es nicht
                      rechtzeitig gekündigt wird.
                    </p>
                  </div>

                </div>

                <p>
                  Der konkrete Preis, der Abrechnungszeitraum
                  sowie alle für den Vertragsschluss
                  wesentlichen Informationen werden vor
                  Abschluss des Abonnements angezeigt.
                </p>

                <p>
                  Soweit Preise abhängig vom jeweiligen Land,
                  App Store, der verwendeten Währung oder
                  steuerlichen Vorgaben unterschiedlich
                  dargestellt werden, ist der unmittelbar vor
                  Abschluss des Abonnements angezeigte Preis
                  maßgeblich.
                </p>

                <p>
                  Nach einer Kündigung bleibt Premium
                  grundsätzlich bis zum Ende des bereits
                  bezahlten Abrechnungszeitraums verfügbar.
                </p>

              </AnimatedSection>


              {/* 07 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  07
                </div>

                <div className="agb-card-icon">
                  <FiCreditCard />
                </div>

                <h3>
                  Abschluss und Zahlung von Premium
                </h3>

                <p>
                  Premium kann – soweit jeweils angeboten –
                  über die Momentry-Web-App sowie über die
                  unterstützten mobilen Apps abgeschlossen
                  werden.
                </p>

                <p>
                  Bei Abschluss über die Web-App erfolgt die
                  Zahlungsabwicklung über den dort angebotenen
                  Zahlungsdienst, insbesondere Stripe.
                </p>

                <p>
                  Soweit verfügbar, können hierbei insbesondere
                  Kredit- oder Debitkarte, PayPal und Apple Pay
                  angeboten werden.
                </p>

                <p>
                  Bei Abschluss innerhalb einer iOS- oder
                  Android-App erfolgt die Zahlungsabwicklung
                  nach den Vorgaben des jeweiligen App Stores.
                  Ergänzend können daher die Zahlungs- und
                  Nutzungsbedingungen des jeweiligen
                  Plattformbetreibers gelten.
                </p>

                <p>
                  Die technische Verwaltung und Zuordnung von
                  Premium-Berechtigungen kann über hierfür
                  eingesetzte technische Dienstleister
                  erfolgen.
                </p>

              </AnimatedSection>


              {/* 08 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  08
                </div>

                <div className="agb-card-icon">
                  <FiGlobe />
                </div>

                <h3>
                  Geräteübergreifende Premium-Nutzung
                </h3>

                <p>
                  Ein Premium-Abonnement wird deinem
                  Momentry-Benutzerkonto zugeordnet.
                </p>

                <p>
                  Nach erfolgreicher Zuordnung kann Premium
                  grundsätzlich auf allen von uns unterstützten
                  Plattformen genutzt werden, auf denen du dich
                  mit demselben Momentry-Konto anmeldest.
                </p>

                <p>
                  Dies gilt grundsätzlich unabhängig davon, ob
                  das Premium-Abonnement über die Web-App, den
                  Apple App Store oder Google Play abgeschlossen
                  wurde.
                </p>

                <p>
                  Voraussetzung ist, dass die jeweilige
                  Plattform und Funktion von uns unterstützt
                  wird und das Abonnement dem richtigen
                  Benutzerkonto zugeordnet werden kann.
                </p>

              </AnimatedSection>


              {/* 09 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  09
                </div>

                <div className="agb-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>
                  Kündigung von Premium
                </h3>

                <p>
                  Ein Premium-Abonnement kann für die Zukunft
                  gekündigt werden.
                </p>

                <p>
                  Die Kündigung erfolgt grundsätzlich über die
                  Plattform, über die das Abonnement
                  abgeschlossen wurde.
                </p>

                <ul>
                  <li>
                    Apple-Abonnements werden über die von Apple
                    vorgesehenen Abonnement-Einstellungen
                    verwaltet und gekündigt.
                  </li>

                  <li>
                    Google-Play-Abonnements werden über die von
                    Google vorgesehenen
                    Abonnement-Einstellungen verwaltet und
                    gekündigt.
                  </li>

                  <li>
                    Über die Web-App abgeschlossene
                    Abonnements können über die dafür auf
                    unserer Website bereitgestellte
                    Kündigungsmöglichkeit gekündigt werden.
                  </li>
                </ul>

                <p>
                  Die Kündigung beendet die
                  Premium-Berechtigung grundsätzlich nicht
                  sofort, sondern zum Ende des bereits
                  bezahlten Abrechnungszeitraums.
                </p>

                <p>
                  Gesetzliche Rechte zur außerordentlichen
                  Kündigung oder anderweitigen
                  Vertragsbeendigung bleiben unberührt.
                </p>

              </AnimatedSection>


              {/* 10 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  10
                </div>

                <div className="agb-card-icon">
                  <FiCreditCard />
                </div>

                <h3>
                  Preisänderungen bei Premium
                </h3>

                <p>
                  Wir können die Preise für zukünftig neu
                  abgeschlossene Premium-Abonnements ändern.
                </p>

                <p>
                  Nach unserem derzeitigen Preismodell behalten
                  ununterbrochen fortgeführte bestehende
                  Abonnements grundsätzlich den für sie
                  vereinbarten bisherigen Preis.
                </p>

                <p>
                  Wird ein bestehendes Abonnement beendet und
                  später erneut abgeschlossen, gilt der zum
                  Zeitpunkt des neuen Vertragsschlusses
                  angebotene Preis.
                </p>

                <p>
                  Soweit bei über einen App Store
                  abgeschlossenen Abonnements zwingende
                  gesetzliche Regelungen oder Vorgaben des
                  jeweiligen Stores für Preisänderungen,
                  Mitteilungen oder erforderliche Zustimmungen
                  gelten, bleiben diese unberührt.
                </p>

              </AnimatedSection>


              {/* 11 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  11
                </div>

                <div className="agb-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>
                  Weiterentwicklung und Änderungen von Momentry
                </h3>

                <p>
                  Momentry wird fortlaufend weiterentwickelt.
                  Hierdurch können neue Funktionen hinzukommen
                  und bestehende Funktionen verändert werden.
                </p>

                <p>
                  Soweit rechtlich zulässig, können einzelne
                  Funktionen auch eingestellt oder durch andere
                  Funktionen ersetzt werden, insbesondere wenn
                  dies aufgrund technischer Entwicklungen,
                  Sicherheitsanforderungen, gesetzlicher
                  Vorgaben oder der Weiterentwicklung unseres
                  Angebots erforderlich ist.
                </p>

                <p>
                  Änderungen erfolgen unter Beachtung der
                  gesetzlichen Anforderungen für digitale
                  Produkte.
                </p>

                <p>
                  Soweit eine Änderung deine
                  Zugriffsmöglichkeit oder Nutzbarkeit mehr als
                  nur unerheblich beeinträchtigt, stehen dir die
                  jeweils gesetzlich vorgesehenen Informations-
                  und Beendigungsrechte zu.
                </p>

              </AnimatedSection>


              {/* 12 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  12
                </div>

                <div className="agb-card-icon">
                  <FiDownload />
                </div>

                <h3>
                  Updates und technische Voraussetzungen
                </h3>

                <p>
                  Für die Nutzung von Momentry benötigst du ein
                  kompatibles internetfähiges Endgerät, eine
                  Internetverbindung und – bei Nutzung einer
                  App – eine unterstützte Betriebssystemversion.
                </p>

                <p>
                  Die Web-App wird von uns zentral
                  aktualisiert. Änderungen stehen dort
                  grundsätzlich automatisch zur Verfügung.
                </p>

                <p>
                  Bei mobilen oder anderen installierten Apps
                  kann es erforderlich sein, verfügbare Updates
                  über den jeweiligen App Store zu installieren.
                </p>

                <p>
                  Wir empfehlen, sicherheitsrelevante und für
                  die weitere vertragsgemäße Nutzung
                  erforderliche Updates zeitnah zu installieren.
                </p>

                <p>
                  Gesetzliche Verpflichtungen zur
                  Bereitstellung erforderlicher Aktualisierungen
                  bleiben unberührt.
                </p>

              </AnimatedSection>


              {/* 13 */}

              <AnimatedSection className="agb-card agb-card-wide">

                <div className="agb-card-number">
                  13
                </div>

                <div className="agb-card-icon">
                  <FiUsers />
                </div>

                <h3>
                  Community und Nutzerinhalte
                </h3>

                <p>
                  Momentry ermöglicht es Nutzerinnen und Nutzern,
                  eigene Inhalte zu erstellen, zu speichern und
                  mit anderen Personen zu teilen.
                </p>

                <p>
                  Hierzu können insbesondere Beiträge, Stories,
                  Fragen, Antworten, Kommentare, Reisegruppen,
                  Gruppennachrichten und Beiträge im Reiseforum
                  gehören.
                </p>

                <p>
                  Je nach Funktion können Inhalte öffentlich,
                  für andere registrierte Nutzerinnen und
                  Nutzer oder nur für einen bestimmten
                  Teilnehmerkreis sichtbar sein.
                </p>

                <p>
                  Reiseplanungen und persönliche
                  Reisetagebücher sind grundsätzlich für das
                  jeweilige Benutzerkonto bestimmt und nicht
                  öffentlich sichtbar, soweit bei der
                  jeweiligen Funktion nicht ausdrücklich etwas
                  anderes angegeben wird.
                </p>

                <p>
                  Gruppennachrichten sind grundsätzlich nur für
                  die Mitglieder der jeweiligen Gruppe
                  bestimmt.
                </p>

              </AnimatedSection>


              {/* 14 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  14
                </div>

                <div className="agb-card-icon">
                  <FiFileText />
                </div>

                <h3>
                  Verantwortung für eigene Inhalte
                </h3>

                <p>
                  Für Inhalte, die du über Momentry
                  veröffentlichst oder mit anderen teilst,
                  bist du selbst verantwortlich.
                </p>

                <p>
                  Du darfst nur Inhalte einstellen, für deren
                  Veröffentlichung und Nutzung du über die
                  erforderlichen Rechte verfügst.
                </p>

                <p>
                  Insbesondere dürfen keine Inhalte
                  veröffentlicht werden, die rechtswidrig,
                  beleidigend, bedrohend, diskriminierend,
                  bewusst irreführend oder sonst unzulässig
                  sind oder Rechte Dritter verletzen.
                </p>

                <p>
                  Hierzu gehören insbesondere fremde
                  Urheberrechte, Persönlichkeitsrechte,
                  Markenrechte und Datenschutzrechte.
                </p>

                <p>
                  Unzulässig sind außerdem Spam, missbräuchliche
                  Werbung, betrügerische Inhalte sowie die
                  missbräuchliche Nutzung von Momentry oder
                  seiner technischen Funktionen.
                </p>

              </AnimatedSection>


              {/* 15 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  15
                </div>

                <div className="agb-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Rechte an Nutzerinhalten
                </h3>

                <p>
                  Die Rechte an deinen eigenen Inhalten bleiben
                  grundsätzlich bei dir beziehungsweise den
                  jeweiligen Rechteinhabern.
                </p>

                <p>
                  Soweit dies für die Bereitstellung der von dir
                  genutzten Momentry-Funktion erforderlich ist,
                  räumst du uns für die Dauer der Bereitstellung
                  des jeweiligen Inhalts ein einfaches,
                  räumlich nicht beschränktes und auf den
                  technischen Betrieb von Momentry beschränktes
                  Nutzungsrecht ein.
                </p>

                <p>
                  Dieses Recht umfasst insbesondere die
                  technische Speicherung, Verarbeitung,
                  Vervielfältigung und – bei von dir zur
                  Veröffentlichung bestimmten Inhalten – die
                  Anzeige innerhalb von Momentry.
                </p>

                <p>
                  Eine darüber hinausgehende Nutzung deiner
                  Inhalte erfolgt nicht allein aufgrund dieser
                  AGB.
                </p>

              </AnimatedSection>


              {/* 16 */}

              <AnimatedSection className="agb-card agb-card-wide agb-card-accent">

                <div className="agb-card-number">
                  16
                </div>

                <div className="agb-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Moderation, Entfernung und Accountsperren
                </h3>

                <p>
                  Wir sind berechtigt, Inhalte zu prüfen und im
                  rechtlich zulässigen Umfang Maßnahmen zu
                  ergreifen, wenn Inhalte oder Verhaltensweisen
                  gegen diese AGB, gesetzliche Vorschriften oder
                  die Sicherheit und Funktionsfähigkeit von
                  Momentry verstoßen.
                </p>

                <div className="agb-consent-box">

                  <div className="agb-consent-icon">
                    <FiCheckCircle />
                  </div>

                  <div>
                    <strong>
                      Mögliche Maßnahmen
                    </strong>

                    <p>
                      Abhängig von Art, Schwere und Häufigkeit
                      eines Verstoßes können insbesondere
                      Inhalte entfernt oder ihre Sichtbarkeit
                      eingeschränkt, einzelne Funktionen
                      vorübergehend beschränkt oder
                      Benutzerkonten vorübergehend oder
                      dauerhaft gesperrt werden.
                    </p>
                  </div>

                </div>

                <p>
                  Bei der Entscheidung berücksichtigen wir,
                  soweit dies nach den Umständen möglich und
                  angemessen ist, insbesondere die Schwere des
                  Verstoßes, frühere Verstöße sowie mögliche
                  Auswirkungen auf andere Nutzerinnen und
                  Nutzer.
                </p>

                <p>
                  Gesetzlich vorgeschriebene Informations-,
                  Begründungs-, Melde- oder
                  Beschwerdemöglichkeiten bleiben unberührt.
                </p>

              </AnimatedSection>


              {/* 17 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  17
                </div>

                <div className="agb-card-icon">
                  <FiUser />
                </div>

                <h3>
                  Minderjährige Nutzer
                </h3>

                <p>
                  Soweit Minderjährige Momentry nutzen, sind die
                  jeweils geltenden gesetzlichen Vorschriften
                  über die Geschäftsfähigkeit zu beachten.
                </p>

                <p>
                  Soweit für die Erstellung eines Kontos, die
                  Nutzung einer Funktion oder den Abschluss
                  eines kostenpflichtigen Vertrags die
                  Einwilligung oder Zustimmung einer
                  gesetzlichen Vertreterin beziehungsweise
                  eines gesetzlichen Vertreters erforderlich
                  ist, darf die entsprechende Handlung nur mit
                  dieser Einwilligung oder Zustimmung erfolgen.
                </p>

                <p>
                  Alters- oder Inhaltsfreigaben der jeweiligen
                  App Stores bleiben hiervon unberührt.
                </p>

              </AnimatedSection>


              {/* 18 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  18
                </div>

                <div className="agb-card-icon">
                  <FiUser />
                </div>

                <h3>
                  Accountlöschung
                </h3>

                <p>
                  Du kannst dein Momentry-Benutzerkonto über die
                  hierfür vorgesehene Funktion löschen.
                </p>

                <p>
                  Mit der Löschung des Kontos endet der Zugriff
                  auf kontobezogene Funktionen und Inhalte,
                  soweit gesetzliche Aufbewahrungspflichten oder
                  andere rechtlich zulässige Gründe einer
                  sofortigen Löschung einzelner Daten nicht
                  entgegenstehen.
                </p>

                <div className="agb-notice">
                  <FiRefreshCw />

                  <p>
                    Die Löschung deines Momentry-Kontos beendet
                    ein über Apple oder Google abgeschlossenes
                    Abonnement nicht automatisch.
                  </p>
                </div>

                <p>
                  Ein über einen App Store abgeschlossenes
                  Abonnement muss zusätzlich über die
                  Abonnementverwaltung des jeweiligen Stores
                  gekündigt werden.
                </p>

                <p>
                  Bei einem über die Web-App abgeschlossenen
                  Abonnement solltest du vor beziehungsweise im
                  Zusammenhang mit der Kontolöschung prüfen, ob
                  das Abonnement ordnungsgemäß beendet wurde.
                </p>

                <p>
                  Wenn du dir beim Status deines Abonnements
                  unsicher bist, kannst du uns kontaktieren.
                </p>

              </AnimatedSection>


              {/* 19 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  19
                </div>

                <div className="agb-card-icon">
                  <FiShoppingBag />
                </div>

                <h3>
                  Vertragsschluss bei Reiseguides
                </h3>

                <p>
                  Die Darstellung unserer Reiseguides im
                  Onlineshop stellt noch kein verbindliches
                  Vertragsangebot dar, sondern eine Aufforderung
                  zur Abgabe einer Bestellung.
                </p>

                <p>
                  Du kannst ausgewählte Produkte zunächst in den
                  Warenkorb legen und deine Auswahl vor Beginn
                  des Zahlungsvorgangs überprüfen und ändern.
                </p>

                <p>
                  Über die Schaltfläche „Zur Kasse“ gelangst du
                  zum Zahlungsprozess. Die kostenpflichtige
                  Bestellung wird anschließend über den
                  angezeigten Zahlungsprozess abgeschlossen.
                </p>

                <p>
                  Mit Betätigung der im Zahlungsprozess
                  vorgesehenen Schaltfläche zur Durchführung
                  der Zahlung gibst du ein verbindliches Angebot
                  zum Abschluss eines Vertrags über die im
                  Warenkorb enthaltenen digitalen Reiseguides ab.
                </p>

                <p>
                  Der Vertrag kommt zustande, sobald die Zahlung
                  erfolgreich abgeschlossen wurde und wir die
                  Bestellung durch Bereitstellung der gekauften
                  Reiseguides annehmen.
                </p>

                <p>
                  Nach erfolgreichem Abschluss erhältst du eine
                  Bestellbestätigung per E-Mail.
                </p>

              </AnimatedSection>


              {/* 20 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  20
                </div>

                <div className="agb-card-icon">
                  <FiCreditCard />
                </div>

                <h3>
                  Preise, Rabatte und Zahlung bei Reiseguides
                </h3>

                <p>
                  Es gelten die zum Zeitpunkt der Bestellung im
                  Onlineshop angegebenen Preise.
                </p>

                <div className="agb-notice">
                  <FiCheckCircle />

                  <p>
                    Alle angegebenen Preise sind Gesamtpreise
                    und enthalten die gesetzliche Umsatzsteuer.
                  </p>
                </div>

                <p>
                  Für ausschließlich digital bereitgestellte
                  Produkte fallen keine Versandkosten an.
                </p>

                <p>
                  Soweit Rabattaktionen, Mengenrabatte,
                  Willkommensrabatte, Bundle-Angebote oder
                  sonstige Preisvorteile angeboten werden,
                  gelten die jeweils bei der entsprechenden
                  Aktion angegebenen Bedingungen.
                </p>

                <p>
                  Der tatsächlich zu zahlende Gesamtbetrag
                  einschließlich eines gegebenenfalls gewährten
                  Rabatts wird dir vor Abschluss der Bestellung
                  angezeigt.
                </p>

                <p>
                  Soweit im Checkout verfügbar, können
                  insbesondere PayPal, Kredit- oder Debitkarte
                  sowie Apple Pay genutzt werden.
                </p>

              </AnimatedSection>


              {/* 21 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  21
                </div>

                <div className="agb-card-icon">
                  <FiDownload />
                </div>

                <h3>
                  Bereitstellung der Reiseguides
                </h3>

                <p>
                  Die gekauften digitalen Reiseguides werden
                  grundsätzlich unmittelbar nach erfolgreicher
                  Zahlung bereitgestellt.
                </p>

                <p>
                  Nach erfolgreicher Bestellung kannst du die
                  erworbenen Reiseguides über die Erfolgsseite
                  herunterladen.
                </p>

                <p>
                  Zusätzlich erhältst du eine
                  Bestellbestätigung per E-Mail, über die die
                  gekauften Reiseguides ebenfalls abrufbar sind.
                </p>

                <p>
                  Wenn die Bestellung über ein Kundenkonto
                  erfolgt ist, stehen die erworbenen
                  Reiseguides zusätzlich im Kundenkonto zum
                  erneuten Abruf zur Verfügung, solange das
                  Kundenkonto und die entsprechende
                  Abruffunktion von uns angeboten werden.
                </p>

                <p>
                  Unabhängig davon kannst du eine eigene Kopie
                  des erworbenen Reiseguides auf deinen
                  Endgeräten speichern.
                </p>

                <p>
                  Bei einer Gastbestellung erfolgt keine
                  Speicherung des gekauften Reiseguides in
                  einem persönlichen Kundenkonto. Der Abruf
                  erfolgt über die Erfolgsseite und die
                  Bestellbestätigung.
                </p>

              </AnimatedSection>


              {/* 22 */}

              <AnimatedSection className="agb-card agb-card-wide agb-card-accent">

                <div className="agb-card-number">
                  22
                </div>

                <div className="agb-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Widerrufsrecht
                </h3>

                <p>
                  Verbraucherinnen und Verbrauchern steht bei
                  Fernabsatzverträgen grundsätzlich ein
                  gesetzliches Widerrufsrecht zu, soweit keine
                  gesetzliche Ausnahme eingreift.
                </p>

                <p>
                  Für digitale Reiseguides, die nicht auf einem
                  körperlichen Datenträger geliefert werden,
                  kann das Widerrufsrecht unter den gesetzlichen
                  Voraussetzungen mit Beginn der
                  Vertragserfüllung vorzeitig erlöschen.
                </p>

                <div className="agb-consent-box">

                  <div className="agb-consent-icon">
                    <FiCheckCircle />
                  </div>

                  <div>
                    <strong>
                      Digitale Reiseguides
                    </strong>

                    <p>
                      Vor der sofortigen Bereitstellung eines
                      kostenpflichtigen digitalen Reiseguides
                      holen wir die gesetzlich erforderliche
                      ausdrückliche Zustimmung zum Beginn der
                      Vertragserfüllung vor Ablauf der
                      Widerrufsfrist sowie die Bestätigung der
                      Kenntnis vom Verlust des Widerrufsrechts
                      ein.
                    </p>
                  </div>

                </div>

                <p>
                  Für Premium-Abonnements und sonstige digitale
                  Dienstleistungen gelten die hierfür
                  einschlägigen gesetzlichen
                  Widerrufsvorschriften.
                </p>

                <p>
                  Bei über Apple oder Google abgeschlossenen
                  Käufen oder Abonnements sind zusätzlich die
                  jeweils anwendbaren Abläufe des betreffenden
                  App Stores zu beachten.
                </p>

                <p>
                  Einzelheiten findest du in unserer
                  gesonderten Widerrufsbelehrung.
                </p>

                <Link
                  to="/widerruf"
                  className="agb-inline-link agb-inline-link-light"
                >
                  Zur Widerrufsbelehrung
                </Link>

              </AnimatedSection>


              {/* 23 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  23
                </div>

                <div className="agb-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Nutzungsrechte an Reiseguides
                </h3>

                <p>
                  Mit vollständiger Zahlung erhältst du an dem
                  erworbenen Reiseguide ein einfaches,
                  nicht ausschließliches und nicht übertragbares
                  Recht zur persönlichen und privaten Nutzung.
                </p>

                <p>
                  Du darfst den Reiseguide auf deinen eigenen
                  Endgeräten speichern und für deine persönliche
                  Nutzung verwenden.
                </p>

                <p>
                  Nicht gestattet ist insbesondere,
                  den Reiseguide oder wesentliche Teile davon
                  ohne unsere Zustimmung:
                </p>

                <ul>
                  <li>
                    an andere Personen weiterzugeben,
                  </li>

                  <li>
                    weiterzuverkaufen oder anderweitig
                    gewerblich zu verwerten,
                  </li>

                  <li>
                    öffentlich zugänglich zu machen,
                  </li>

                  <li>
                    auf öffentlich zugänglichen Plattformen,
                    Webseiten oder Cloud-Speichern
                    bereitzustellen,
                  </li>

                  <li>
                    zu vervielfältigen oder zu verbreiten,
                    soweit dies über die persönliche Nutzung
                    hinausgeht.
                  </li>
                </ul>

                <p>
                  Gesetzlich ausdrücklich erlaubte Nutzungen
                  bleiben unberührt.
                </p>

              </AnimatedSection>


              {/* 24 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  24
                </div>

                <div className="agb-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>
                  Aktualisierungen von Reiseguides
                </h3>

                <p>
                  Unsere Reiseguides enthalten Informationen,
                  die sich im Laufe der Zeit verändern können.
                  Wir können bestehende Reiseguides daher
                  redaktionell überarbeiten und aktualisieren.
                </p>

                <p>
                  Wird ein von dir bereits erworbener
                  Reiseguide von uns überarbeitet, stellen wir
                  die aktualisierte Version über die für deinen
                  Kauf vorhandenen Abrufmöglichkeiten zur
                  Verfügung.
                </p>

                <p>
                  Über eine solche Aktualisierung können wir
                  dich über die bei der Bestellung angegebene
                  E-Mail-Adresse informieren.
                </p>

                <p>
                  Unsere gesetzlichen Pflichten zur
                  Bereitstellung und Information über
                  erforderliche Aktualisierungen bleiben
                  unberührt.
                </p>

              </AnimatedSection>


              {/* 25 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  25
                </div>

                <div className="agb-card-icon">
                  <FiShoppingBag />
                </div>

                <h3>
                  Reiseinformationen und Drittanbieter
                </h3>

                <p>
                  Unsere Reiseguides sowie innerhalb von
                  Momentry bereitgestellte Reiseinformationen
                  werden sorgfältig auf Grundlage eigener
                  Erfahrungen, Recherchen und zum jeweiligen
                  Zeitpunkt verfügbarer Informationen erstellt.
                </p>

                <p>
                  Angaben zu externen Anbietern und Angeboten –
                  beispielsweise Öffnungszeiten, Eintrittspreise,
                  Fahrpläne, Restaurants, Sehenswürdigkeiten,
                  Reservierungsmöglichkeiten,
                  Verkehrsanbindungen oder örtliche
                  Bestimmungen – können sich jederzeit ändern.
                </p>

                <p>
                  Wir empfehlen deshalb, insbesondere
                  zeitabhängige Informationen vor der Nutzung
                  nochmals beim jeweiligen Anbieter oder einer
                  offiziellen Stelle zu überprüfen.
                </p>

                <p>
                  Gesetzliche Rechte wegen eines Mangels eines
                  von uns bereitgestellten digitalen Produkts
                  werden dadurch nicht eingeschränkt.
                </p>

              </AnimatedSection>


              {/* 26 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  26
                </div>

                <div className="agb-card-icon">
                  <FiStar />
                </div>

                <h3>
                  Bewertungen
                </h3>

                <p>
                  Auf unseren Angeboten können Nutzerinnen und
                  Nutzer Bewertungen zu Reiseguides oder
                  anderen dafür vorgesehenen Inhalten abgeben.
                </p>

                <p>
                  Die Abgabe einer Bewertung setzt nicht
                  zwingend voraus, dass ein bewerteter
                  Reiseguide zuvor über unseren Onlineshop
                  erworben wurde. Bewertungen stellen daher
                  nicht automatisch verifizierte Käufe dar.
                </p>

                <p>
                  Für Bewertungen gelten die Regelungen dieser
                  AGB zu Nutzerinhalten entsprechend.
                </p>

                <p>
                  Rechtswidrige oder gegen diese Vorgaben
                  verstoßende Bewertungen können im rechtlich
                  zulässigen Umfang entfernt werden.
                </p>

              </AnimatedSection>


              {/* 27 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  27
                </div>

                <div className="agb-card-icon">
                  <FiCheckCircle />
                </div>

                <h3>
                  Gesetzliche Mängelrechte
                </h3>

                <p>
                  Für unsere digitalen Inhalte und digitalen
                  Dienstleistungen gelten die gesetzlichen
                  Vorschriften über digitale Produkte und die
                  gesetzlichen Mängelrechte.
                </p>

                <p>
                  Wird ein digitales Produkt nicht
                  bereitgestellt oder entspricht es nicht den
                  gesetzlichen oder vertraglich vereinbarten
                  Anforderungen, stehen dir die gesetzlich
                  vorgesehenen Rechte zu.
                </p>

                <p>
                  Hierzu können – abhängig von den gesetzlichen
                  Voraussetzungen – insbesondere Ansprüche auf
                  Herstellung des vertragsgemäßen Zustands,
                  Minderung, Beendigung des Vertrags oder
                  Schadensersatz gehören.
                </p>

                <p>
                  Zwingende gesetzliche Rechte werden durch
                  diese AGB nicht eingeschränkt.
                </p>

              </AnimatedSection>


              {/* 28 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  28
                </div>

                <div className="agb-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Verfügbarkeit
                </h3>

                <p>
                  Wir bemühen uns um eine möglichst
                  unterbrechungsfreie Verfügbarkeit unserer
                  digitalen Angebote.
                </p>

                <p>
                  Eine jederzeitige und vollständig
                  störungsfreie Verfügbarkeit kann jedoch nicht
                  garantiert werden.
                </p>

                <p>
                  Vorübergehende Einschränkungen können
                  insbesondere aufgrund von Wartungsarbeiten,
                  Sicherheitsmaßnahmen, technischen Störungen,
                  notwendigen Updates oder Umständen außerhalb
                  unseres Einflussbereichs auftreten.
                </p>

                <p>
                  Gesetzliche Ansprüche bei einer nicht
                  vertragsgemäßen Bereitstellung bleiben
                  unberührt.
                </p>

              </AnimatedSection>


              {/* 29 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  29
                </div>

                <div className="agb-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Haftung
                </h3>

                <p>
                  Wir haften unbeschränkt für Schäden, die auf
                  vorsätzlichem oder grob fahrlässigem Verhalten
                  beruhen, sowie für Schäden aus der Verletzung
                  des Lebens, des Körpers oder der Gesundheit.
                </p>

                <p>
                  Zwingende gesetzliche
                  Haftungsvorschriften bleiben unberührt.
                </p>

                <p>
                  Im Übrigen richtet sich unsere Haftung nach
                  den gesetzlichen Vorschriften.
                </p>

                <p>
                  Insbesondere werden gesetzliche Rechte im
                  Zusammenhang mit mangelhaften digitalen
                  Produkten oder digitalen Dienstleistungen
                  durch diese Regelung nicht eingeschränkt.
                </p>

              </AnimatedSection>


              {/* 30 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  30
                </div>

                <div className="agb-card-icon">
                  <FiGlobe />
                </div>

                <h3>
                  Internationale Nutzung
                </h3>

                <p>
                  Momentry kann grundsätzlich auch außerhalb
                  Deutschlands genutzt werden, soweit unser
                  Angebot im jeweiligen Land verfügbar ist und
                  keine rechtlichen oder technischen
                  Einschränkungen entgegenstehen.
                </p>

                <p>
                  Verfügbare Funktionen, Zahlungsarten,
                  Abonnementpreise, Währungen und
                  App-Store-Angebote können abhängig vom
                  jeweiligen Land oder der verwendeten
                  Plattform abweichen.
                </p>

                <p>
                  Nutzerinnen und Nutzer sind dafür
                  verantwortlich, bei der Nutzung von Momentry
                  die für sie geltenden örtlichen gesetzlichen
                  Vorschriften zu beachten.
                </p>

              </AnimatedSection>


              {/* 31 */}

              <AnimatedSection className="agb-card">

                <div className="agb-card-number">
                  31
                </div>

                <div className="agb-card-icon">
                  <FiMail />
                </div>

                <h3>
                  Vertragssprache und Vertragsinformationen
                </h3>

                <p>
                  Die für den Vertragsschluss über unsere
                  deutschsprachigen Angebote zur Verfügung
                  stehende Vertragssprache ist Deutsch.
                </p>

                <p>
                  Soweit künftig Vertragsabschlüsse über eine
                  ausdrücklich englischsprachige
                  Angebotsoberfläche ermöglicht werden, können
                  hierfür ergänzend englischsprachige
                  Vertragsinformationen bereitgestellt werden.
                </p>

                <p>
                  Vor Abschluss einer kostenpflichtigen
                  Bestellung oder eines Abonnements kannst du
                  die für den Vertragsschluss wesentlichen
                  Angaben überprüfen und – soweit technisch
                  vorgesehen – berichtigen oder ändern.
                </p>

                <p>
                  Nach erfolgreichem Abschluss eines
                  kostenpflichtigen Vertrags werden die für
                  dessen Abwicklung und Dokumentation
                  erforderlichen Vertragsdaten gespeichert und
                  die gesetzlich erforderlichen
                  Vertragsinformationen bereitgestellt.
                </p>

                <p>
                  Diese Allgemeinen Geschäftsbedingungen können
                  über unsere Website aufgerufen sowie in
                  wiedergabefähiger Form gespeichert oder
                  ausgedruckt werden.
                </p>

              </AnimatedSection>


              {/* 32 */}

              <AnimatedSection
                className="agb-card"
                delay={0.03}
              >

                <div className="agb-card-number">
                  32
                </div>

                <div className="agb-card-icon">
                  <FiFileText />
                </div>

                <h3>
                  Datenschutz
                </h3>

                <p>
                  Informationen zur Verarbeitung
                  personenbezogener Daten im Zusammenhang mit
                  Website, Onlineshop, Web-App und unseren Apps
                  findest du in unserer Datenschutzerklärung.
                </p>

                <Link
                  to="/datenschutz"
                  className="agb-inline-link"
                >
                  Zur Datenschutzerklärung
                </Link>

              </AnimatedSection>


              {/* 33 */}

              <AnimatedSection className="agb-card agb-card-wide">

                <div className="agb-card-number">
                  33
                </div>

                <div className="agb-card-icon">
                  <FiFileText />
                </div>

                <h3>
                  Anwendbares Recht
                </h3>

                <p>
                  Es gilt das Recht der Bundesrepublik
                  Deutschland.
                </p>

                <p>
                  Gegenüber Verbraucherinnen und Verbrauchern
                  gilt diese Rechtswahl nur insoweit, als
                  dadurch nicht der Schutz entzogen wird, der
                  durch zwingende Bestimmungen des Staates
                  gewährt wird, in dem die Verbraucherin oder
                  der Verbraucher ihren beziehungsweise seinen
                  gewöhnlichen Aufenthalt hat.
                </p>

                <p>
                  Zwingende Verbraucherschutzvorschriften eines
                  Staates, die unabhängig von der Rechtswahl
                  Anwendung finden, bleiben unberührt.
                </p>

              </AnimatedSection>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTACT CTA
        ===================================================== */}

        <section className="agb-contact">

          <div className="agb-contact-glow agb-contact-glow-green" />
          <div className="agb-contact-glow agb-contact-glow-purple" />

          <div className="agb-container">

            <AnimatedSection className="agb-contact-card">

              <div>

                <div className="agb-eyebrow agb-eyebrow-light">
                  <span className="agb-eyebrow-line" />
                  <span>Noch etwas unklar?</span>
                </div>

                <h2>
                  Wir helfen dir
                  <span>gerne weiter.</span>
                </h2>

                <p>
                  Wenn du Fragen zu einem Kauf, deinem
                  Momentry-Konto oder deinem
                  Premium-Abonnement hast, kannst du uns über
                  unsere Kontaktseite erreichen.
                </p>

              </div>

              <Link
                to="/kontakt"
                className="agb-contact-button"
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