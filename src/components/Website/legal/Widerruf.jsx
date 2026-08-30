import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiLock,
  FiMail,
  FiRefreshCw,
  FiStar,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Widerruf.css";


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
   WIDERRUF
========================================================= */

export default function Widerruf() {
  return (
    <>
      <Navbar />

      <main className="widerruf-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="widerruf-hero">

          <div className="widerruf-hero-glow widerruf-hero-glow-green" />
          <div className="widerruf-hero-glow widerruf-hero-glow-purple" />

          <div className="widerruf-container widerruf-hero-inner">

            <AnimatedSection className="widerruf-hero-content">

              <div className="widerruf-eyebrow widerruf-eyebrow-light">
                <span className="widerruf-eyebrow-line" />
                <span>Rechtliches</span>
              </div>

              <h1 className="widerruf-hero-title">
                Widerrufs-
                <span>belehrung.</span>
              </h1>

              <p className="widerruf-hero-text">
                Hier findest du alle Informationen zu deinem
                gesetzlichen Widerrufsrecht bei digitalen
                Reiseguides und bei Momentry Premium.
              </p>

              <div className="widerruf-hero-pills">

                <div className="widerruf-hero-pill">
                  <FiClock />
                  <span>14 Tage grundsätzlich</span>
                </div>

                <div className="widerruf-hero-pill">
                  <FiDownload />
                  <span>Digitale Reiseguides</span>
                </div>

                <div className="widerruf-hero-pill">
                  <FiStar />
                  <span>Momentry Premium</span>
                </div>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="widerruf-intro">

          <div className="widerruf-container">

            <AnimatedSection className="widerruf-intro-grid">

              <div className="widerruf-intro-left">

                <div className="widerruf-eyebrow widerruf-eyebrow-dark">
                  <span className="widerruf-eyebrow-line" />
                  <span>Widerrufsrecht</span>
                </div>

                <h2>
                  Klar geregelt.
                  <span>Transparent erklärt.</span>
                </h2>

              </div>

              <div className="widerruf-intro-right">

                <p>
                  Bei einem online geschlossenen Vertrag steht
                  Verbraucherinnen und Verbrauchern grundsätzlich
                  ein gesetzliches Widerrufsrecht zu.
                </p>

                <p>
                  Dabei gelten für digitale Reiseguides andere
                  Besonderheiten als für das laufende
                  Premium-Abonnement von Momentry by
                  MamaTochterOnTour.
                </p>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="widerruf-content-section">

          <div className="widerruf-container">

            <div className="widerruf-card-grid">


              {/* 01 */}

              <AnimatedSection className="widerruf-card widerruf-card-wide">

                <div className="widerruf-card-number">
                  01
                </div>

                <div className="widerruf-card-icon">
                  <FiClock />
                </div>

                <h3>
                  Widerrufsrecht
                </h3>

                <p>
                  Du hast das Recht, binnen vierzehn Tagen ohne
                  Angabe von Gründen diesen Vertrag zu
                  widerrufen.
                </p>

                <p>
                  Die Widerrufsfrist beträgt vierzehn Tage ab
                  dem Tag des Vertragsabschlusses.
                </p>

                <p>
                  Um dein Widerrufsrecht auszuüben, musst du uns
                  mittels einer eindeutigen Erklärung
                  (z. B. ein mit der Post versandter Brief oder
                  eine E-Mail) über deinen Entschluss, diesen
                  Vertrag zu widerrufen, informieren.
                </p>

                <div className="widerruf-address">

                  <strong>
                    Widerruf richten an:
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
                  Du kannst hierfür das unten aufgeführte
                  Muster-Widerrufsformular verwenden. Die
                  Verwendung dieses Formulars ist jedoch nicht
                  vorgeschrieben.
                </p>

                <div className="widerruf-notice">

                  <FiCheckCircle />

                  <p>
                    Zur Wahrung der Widerrufsfrist genügt es,
                    wenn du deine Mitteilung über die Ausübung
                    des Widerrufsrechts vor Ablauf der
                    Widerrufsfrist absendest.
                  </p>

                </div>

              </AnimatedSection>


              {/* 02 */}

              <AnimatedSection
                className="widerruf-card"
                delay={0.03}
              >

                <div className="widerruf-card-number">
                  02
                </div>

                <div className="widerruf-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>
                  Folgen des Widerrufs
                </h3>

                <p>
                  Wenn du diesen Vertrag wirksam widerrufst,
                  erstatten wir dir alle Zahlungen, die wir von
                  dir im Zusammenhang mit dem widerrufenen
                  Vertrag erhalten haben.
                </p>

                <p>
                  Die Rückzahlung erfolgt unverzüglich und
                  spätestens binnen vierzehn Tagen ab dem Tag,
                  an dem deine Mitteilung über den Widerruf bei
                  uns eingegangen ist.
                </p>

                <p>
                  Für die Rückzahlung verwenden wir grundsätzlich
                  dasselbe Zahlungsmittel, das du bei der
                  ursprünglichen Zahlung eingesetzt hast,
                  sofern nicht ausdrücklich etwas anderes mit
                  dir vereinbart wurde.
                </p>

                <p>
                  Für die Rückzahlung werden dir keine Entgelte
                  berechnet.
                </p>

                <p>
                  Bei einem Vertrag über Momentry Premium kann
                  bei einem Widerruf ein angemessener Wertersatz
                  für die bis zum Zeitpunkt des Widerrufs bereits
                  erbrachten Leistungen zu zahlen sein, wenn du
                  ausdrücklich verlangt hast, dass wir bereits
                  vor Ablauf der Widerrufsfrist mit der Leistung
                  beginnen, und die weiteren gesetzlichen
                  Voraussetzungen hierfür erfüllt sind.
                </p>

              </AnimatedSection>


              {/* 03 */}

              <AnimatedSection
                className="widerruf-card"
                delay={0.05}
              >

                <div className="widerruf-card-number">
                  03
                </div>

                <div className="widerruf-card-icon">
                  <FiDownload />
                </div>

                <h3>
                  Digitale Reiseguides
                </h3>

                <p>
                  Unsere Reiseguides werden als digitale
                  Inhalte in Form von PDF-Dateien angeboten und
                  nicht auf einem körperlichen Datenträger
                  geliefert.
                </p>

                <p>
                  Die gekauften Reiseguides werden grundsätzlich
                  unmittelbar nach erfolgreicher Zahlung
                  bereitgestellt.
                </p>

                <p>
                  Die Bereitstellung erfolgt insbesondere über
                  die Erfolgsseite nach dem Kauf sowie über die
                  Bestellbestätigung per E-Mail.
                </p>

                <p>
                  Bei einem Kauf über ein Kundenkonto können die
                  erworbenen Reiseguides zusätzlich über das
                  Kundenkonto erneut abgerufen werden.
                </p>

              </AnimatedSection>


              {/* 04 */}

              <AnimatedSection className="widerruf-card widerruf-card-wide widerruf-card-accent">

                <div className="widerruf-card-number">
                  04
                </div>

                <div className="widerruf-card-icon">
                  <FiLock />
                </div>

                <h3>
                  Vorzeitiges Erlöschen bei digitalen Reiseguides
                </h3>

                <p>
                  Bei einem kostenpflichtigen Vertrag über
                  digitale Inhalte, die nicht auf einem
                  körperlichen Datenträger bereitgestellt
                  werden, kann das Widerrufsrecht bereits vor
                  Ablauf der vierzehntägigen Widerrufsfrist
                  erlöschen.
                </p>

                <p>
                  Das Widerrufsrecht erlischt mit Beginn der
                  Vertragserfüllung, wenn
                </p>

                <ul>
                  <li>
                    wir mit der Vertragserfüllung begonnen haben,
                  </li>

                  <li>
                    du zuvor ausdrücklich zugestimmt hast, dass
                    wir vor Ablauf der Widerrufsfrist mit der
                    Vertragserfüllung beginnen,
                  </li>

                  <li>
                    du bestätigt hast, dass dir bekannt ist,
                    dass du durch deine Zustimmung mit Beginn
                    der Vertragserfüllung dein Widerrufsrecht
                    verlierst,
                  </li>

                  <li>
                    und wir dir die gesetzlich erforderliche
                    Vertragsbestätigung zur Verfügung gestellt
                    haben.
                  </li>
                </ul>

                <div className="widerruf-consent-box">

                  <div className="widerruf-consent-icon">
                    <FiCheckCircle />
                  </div>

                  <div>

                    <strong>
                      Zustimmung im Bestellprozess
                    </strong>

                    <p>
                      Vor dem Checkout bestätigst du
                      ausdrücklich, dass die von dir gekauften
                      digitalen Reiseguides direkt nach dem Kauf
                      bereitgestellt werden dürfen und dass dir
                      bekannt ist, dass du dein Widerrufsrecht
                      mit Beginn der Bereitstellung verlierst.
                    </p>

                  </div>

                </div>

                <p>
                  Nach Beginn der Bereitstellung besteht deshalb
                  kein Widerrufsrecht mehr, sofern sämtliche
                  gesetzlichen Voraussetzungen für das
                  vorzeitige Erlöschen erfüllt sind.
                </p>

                <p>
                  Deine Zustimmung und Bestätigung werden
                  dokumentiert. Die Bestellbestätigung enthält
                  ebenfalls die gesetzlich erforderliche
                  Bestätigung deiner Erklärung.
                </p>

              </AnimatedSection>


              {/* 05 */}

              <AnimatedSection className="widerruf-card">

                <div className="widerruf-card-number">
                  05
                </div>

                <div className="widerruf-card-icon">
                  <FiStar />
                </div>

                <h3>
                  Momentry Premium
                </h3>

                <p>
                  Momentry Premium ist eine laufend
                  bereitgestellte digitale Dienstleistung.
                </p>

                <p>
                  Premium kann als Monats- oder Jahresabonnement
                  abgeschlossen werden und wird unmittelbar nach
                  erfolgreichem Vertragsabschluss beziehungsweise
                  erfolgreicher Zahlungsabwicklung freigeschaltet.
                </p>

                <p>
                  Die Premium-Funktionen können anschließend
                  sofort genutzt werden.
                </p>

                <div className="widerruf-notice">

                  <FiClock />

                  <p>
                    Die sofortige Freischaltung von Premium
                    führt nicht allein dazu, dass dein
                    vierzehntägiges Widerrufsrecht sofort
                    erlischt.
                  </p>

                </div>

              </AnimatedSection>


              {/* 06 */}

              <AnimatedSection
                className="widerruf-card"
                delay={0.03}
              >

                <div className="widerruf-card-number">
                  06
                </div>

                <div className="widerruf-card-icon">
                  <FiCheckCircle />
                </div>

                <h3>
                  Sofortiger Beginn von Premium
                </h3>

                <p>
                  Damit du Momentry Premium unmittelbar nach
                  Vertragsschluss nutzen kannst, verlangen wir
                  vor Abschluss eines über unsere Web-App
                  angebotenen Premium-Abonnements deine
                  ausdrückliche Erklärung, dass wir bereits vor
                  Ablauf der Widerrufsfrist mit der
                  Bereitstellung der Premium-Leistungen beginnen
                  sollen.
                </p>

                <p>
                  Widerrufst du den Vertrag anschließend noch
                  innerhalb der Widerrufsfrist, kann für die bis
                  zum Widerruf bereits erbrachte Leistung ein
                  angemessener Wertersatz geschuldet sein, sofern
                  die gesetzlichen Voraussetzungen hierfür
                  erfüllt sind.
                </p>

                <div className="widerruf-warning">
                  <FiAlertCircle />

                  <p>
                    Anders als beim sofort bereitgestellten
                    digitalen Reiseguide verliert eine
                    Verbraucherin oder ein Verbraucher das
                    Widerrufsrecht bei Momentry Premium nicht
                    bereits allein dadurch, dass Premium sofort
                    freigeschaltet und genutzt wird.
                  </p>

                </div>

              </AnimatedSection>


              {/* 07 */}

              <AnimatedSection className="widerruf-card widerruf-card-wide widerruf-card-accent">

                <div className="widerruf-card-number">
                  07
                </div>

                <div className="widerruf-card-icon">
                  <FiCreditCard />
                </div>

                <h3>
                  Premium über Apple oder Google
                </h3>

                <p>
                  Wird Momentry Premium innerhalb der mobilen
                  App über den Apple App Store oder Google Play
                  abgeschlossen, erfolgt die Zahlungsabwicklung
                  über das jeweilige In-App-Kaufsystem.
                </p>

                <p>
                  Für die Abwicklung von Widerrufen,
                  Rückerstattungen und sonstigen
                  zahlungsbezogenen Vorgängen können zusätzlich
                  die gesetzlichen Regelungen und die jeweils
                  anwendbaren Verfahren und Bedingungen des
                  betreffenden App Stores gelten.
                </p>

                <p>
                  Ein Widerruf oder Erstattungsantrag sollte bei
                  einem über Apple oder Google abgewickelten
                  Kauf deshalb über die hierfür vom jeweiligen
                  App Store zur Verfügung gestellten
                  Möglichkeiten vorgenommen werden, soweit die
                  Abwicklung dort erfolgt.
                </p>

                <p>
                  Gesetzliche Verbraucherrechte bleiben
                  unberührt.
                </p>

              </AnimatedSection>


              {/* 08 */}

              <AnimatedSection className="widerruf-card">

                <div className="widerruf-card-number">
                  08
                </div>

                <div className="widerruf-card-icon">
                  <FiAlertCircle />
                </div>

                <h3>
                  Was bedeutet das konkret?
                </h3>

                <p>
                  Bei einem digitalen Reiseguide kann dein
                  Widerrufsrecht mit Beginn der Bereitstellung
                  erlöschen, wenn du dem unmittelbaren Beginn
                  ausdrücklich zugestimmt, die Kenntnis vom
                  Verlust des Widerrufsrechts bestätigt hast
                  und sämtliche weiteren gesetzlichen
                  Voraussetzungen erfüllt sind.
                </p>

                <p>
                  Bei Momentry Premium bleibt das
                  Widerrufsrecht dagegen grundsätzlich für die
                  gesetzliche Widerrufsfrist bestehen, auch
                  wenn Premium auf deinen ausdrücklichen Wunsch
                  sofort freigeschaltet wird.
                </p>

                <p>
                  Bei einem Widerruf von Premium innerhalb
                  dieser Frist kann gegebenenfalls Wertersatz
                  für den bereits erbrachten Teil der
                  Premium-Leistung anfallen.
                </p>

                <div className="widerruf-warning">
                  <FiAlertCircle />

                  <p>
                    Gesetzliche Rechte wegen eines mangelhaften
                    oder nicht vertragsgemäß bereitgestellten
                    digitalen Produkts bleiben unabhängig vom
                    Widerrufsrecht bestehen.
                  </p>

                </div>

              </AnimatedSection>


              {/* 09 */}

              <AnimatedSection
                className="widerruf-card"
                delay={0.03}
              >

                <div className="widerruf-card-number">
                  09
                </div>

                <div className="widerruf-card-icon">
                  <FiMail />
                </div>

                <h3>
                  Widerruf erklären
                </h3>

                <p>
                  Besteht dein Widerrufsrecht noch, kannst du
                  deinen Widerruf durch eine eindeutige
                  Erklärung ausüben.
                </p>

                <p>
                  Bei einer Erklärung per E-Mail gib bitte nach
                  Möglichkeit deinen Namen, deine
                  Bestellnummer beziehungsweise die zur
                  Zuordnung des Premium-Abonnements erforderlichen
                  Vertragsdaten und den betroffenen Vertrag an.
                </p>

                <a
                  href="mailto:mamatochterontour@outlook.de?subject=Widerruf%20meines%20Vertrags"
                  className="widerruf-mail-button"
                >
                  Widerruf per E-Mail
                  <FiMail />
                </a>

              </AnimatedSection>


              {/* 10 */}



              {/* =================================================
                  MUSTER-WIDERRUFSFORMULAR
              ================================================= */}

              <AnimatedSection className="widerruf-card widerruf-card-wide widerruf-form-card">

                <div className="widerruf-card-number">
                  10
                </div>

                <div className="widerruf-card-icon">
                  <FiFileText />
                </div>

                <h3>
                  Muster-Widerrufsformular
                </h3>

                <p className="widerruf-form-intro">
                  Wenn du den Vertrag widerrufen möchtest, kannst
                  du dieses Muster verwenden und an uns senden.
                  Die Verwendung des Formulars ist nicht
                  vorgeschrieben.
                </p>

                <div className="widerruf-form-template">

                  <p>
                    <strong>
                      An:
                    </strong>
                  </p>

                  <p>
                    MamaTochterOnTour
                    <br />
                    Jennifer Weinreich
                    <br />
                    Stettiner Straße 41
                    <br />
                    35410 Hungen
                    <br />
                    Deutschland
                    <br />
                    mamatochterontour@outlook.de
                  </p>

                  <div className="widerruf-form-divider" />

                  <p>
                    Hiermit widerrufe ich den von mir
                    abgeschlossenen Vertrag über den Erwerb
                    beziehungsweise die Bereitstellung der
                    folgenden digitalen Inhalte oder digitalen
                    Dienstleistungen:
                  </p>

                  <div className="widerruf-form-field">
                    Vertrag / Produkt / Abonnement:
                    <span />
                  </div>

                  <div className="widerruf-form-field">
                    Bestellt / abgeschlossen am:
                    <span />
                  </div>

                  <div className="widerruf-form-field">
                    Bestell- / Vertragsnummer:
                    <span />
                  </div>

                  <div className="widerruf-form-field">
                    Name:
                    <span />
                  </div>

                  <div className="widerruf-form-field">
                    Anschrift:
                    <span />
                  </div>

                  <div className="widerruf-form-field">
                    Unterschrift:
                    <span />
                  </div>

                  <div className="widerruf-form-field">
                    Datum:
                    <span />
                  </div>

                  <p className="widerruf-form-note">
                    Eine Unterschrift ist nur erforderlich,
                    wenn der Widerruf auf Papier erklärt wird.
                  </p>

                </div>

              </AnimatedSection>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section className="widerruf-contact">

          <div className="widerruf-contact-glow widerruf-contact-glow-green" />
          <div className="widerruf-contact-glow widerruf-contact-glow-purple" />

          <div className="widerruf-container">

            <AnimatedSection className="widerruf-contact-card">

              <div>

                <div className="widerruf-eyebrow widerruf-eyebrow-light">
                  <span className="widerruf-eyebrow-line" />
                  <span>Fragen zu deinem Vertrag?</span>
                </div>

                <h2>
                  Wir helfen
                  <span>dir weiter.</span>
                </h2>

                <p>
                  Wenn du Fragen zu einem Reiseguide, deinem
                  Momentry-Premium-Abonnement oder deinem
                  Widerrufsrecht hast, kannst du dich an uns
                  wenden.
                </p>

              </div>

              <Link
                to="/kontakt"
                className="widerruf-contact-button"
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