import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiAlertTriangle,
  FiBookOpen,
  FiCheckCircle,
  FiEdit3,
  FiFileText,
  FiFlag,
  FiGlobe,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiTrash2,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Nutzungsbedingungen.css";


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
   NUTZUNGSBEDINGUNGEN
========================================================= */

export default function Nutzungsbedingungen() {
  return (
    <>
      <Navbar />

      <main className="terms-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="terms-hero">

          <div className="terms-hero-glow terms-hero-glow-green" />
          <div className="terms-hero-glow terms-hero-glow-purple" />

          <div className="terms-container">

            <AnimatedSection className="terms-hero-content">

              <div className="terms-eyebrow">
                <span className="terms-eyebrow-line" />
                <span>Rechtliches</span>
              </div>

              <h1 className="terms-hero-title">
                Unsere
                <span>Nutzungsbedingungen.</span>
              </h1>

              <p className="terms-hero-text">
                Diese Nutzungsbedingungen regeln die Nutzung von
                Momentry by MamaTochterOnTour und unserer
                Community-Funktionen.
              </p>

              <div className="terms-hero-pills">

                <div className="terms-hero-pill">
                  <FiUser />
                  <span>Dein Benutzerkonto</span>
                </div>

                <div className="terms-hero-pill">
                  <FiUsers />
                  <span>Community & Gruppen</span>
                </div>

                <div className="terms-hero-pill">
                  <FiShield />
                  <span>Fair & sicher nutzen</span>
                </div>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="terms-intro">

          <div className="terms-container">

            <AnimatedSection className="terms-intro-grid">

              <div className="terms-intro-left">

                <div className="terms-section-eyebrow">
                  <span className="terms-eyebrow-line" />
                  <span>Momentry</span>
                </div>

                <h2>
                  Reisen teilen.
                  <span>Fair miteinander umgehen.</span>
                </h2>

              </div>

              <div className="terms-intro-right">

                <p>
                  Momentry ist eine Reiseplattform, auf der du
                  Reisen planen, Erinnerungen festhalten,
                  Beiträge und Storys veröffentlichen sowie dich
                  mit anderen Reisenden austauschen kannst.
                </p>

                <p>
                  Damit die Community für alle angenehm und
                  sicher bleibt, gelten für die Nutzung die
                  nachfolgenden Regeln.
                </p>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="terms-content-section">

          <div className="terms-container">

            <div className="terms-card-grid">


              {/* 01 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">01</div>

                <div className="terms-card-icon">
                  <FiFileText />
                </div>

                <h3>Geltungsbereich und Anbieterin</h3>

                <p>
                  Diese Nutzungsbedingungen gelten für die Nutzung
                  von Momentry by MamaTochterOnTour über unsere
                  mobilen Apps, die macOS-App und die Web-App.
                </p>

                <p>
                  Anbieterin von Momentry ist:
                </p>

                <div className="terms-info-box">
                  <strong>Jennifer Weinreich</strong>
                  <span>MamaTochterOnTour</span>
                  <span>Stettiner Straße 41</span>
                  <span>35410 Hungen</span>
                  <span>Deutschland</span>
                  <span>mamatochterontour@outlook.de</span>
                </div>

                <p>
                  Für kostenpflichtige Leistungen, insbesondere
                  Momentry Premium, gelten ergänzend unsere AGB.
                </p>

              </AnimatedSection>


              {/* 02 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">02</div>

                <div className="terms-card-icon">
                  <FiUser />
                </div>

                <h3>Voraussetzungen für die Nutzung</h3>

                <p>
                  Für bestimmte Funktionen von Momentry ist ein
                  Benutzerkonto erforderlich.
                </p>

                <p>
                  Bei der Registrierung müssen die abgefragten
                  Angaben wahrheitsgemäß und aktuell angegeben
                  werden.
                </p>

                <p>
                  Du darfst Momentry nur im Rahmen der geltenden
                  Gesetze und dieser Nutzungsbedingungen
                  verwenden.
                </p>

              </AnimatedSection>


              {/* 03 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">03</div>

                <div className="terms-card-icon">
                  <FiLock />
                </div>

                <h3>Benutzerkonto und Zugangsdaten</h3>

                <p>
                  Dein Benutzerkonto ist für deine persönliche
                  Nutzung bestimmt.
                </p>

                <p>
                  Zugangsdaten dürfen nicht unbefugt an Dritte
                  weitergegeben werden. Du bist dafür
                  verantwortlich, deine Zugangsdaten angemessen
                  vor dem Zugriff Dritter zu schützen.
                </p>

                <p>
                  Wenn du vermutest, dass dein Konto unbefugt
                  genutzt wird, solltest du uns unverzüglich
                  informieren.
                </p>

              </AnimatedSection>


              {/* 04 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">04</div>

                <div className="terms-card-icon">
                  <FiGlobe />
                </div>

                <h3>Funktionen von Momentry</h3>

                <p>
                  Momentry bietet insbesondere Funktionen zur
                  Reiseplanung, zum Festhalten von
                  Reiseerinnerungen und zum Austausch innerhalb
                  der Reise-Community.
                </p>

                <ul>
                  <li>Beiträge und Storys veröffentlichen</li>
                  <li>Reiseinformationen und Erfahrungen teilen</li>
                  <li>Fragen stellen und beantworten</li>
                  <li>Beiträge im Reiseforum veröffentlichen</li>
                  <li>Kommentare und Antworten schreiben</li>
                  <li>Reisegruppen erstellen und nutzen</li>
                  <li>Reisen planen und Erinnerungen festhalten</li>
                  <li>Reisetagebücher erstellen</li>
                  <li>Inhalte speichern und organisieren</li>
                </ul>

                <p>
                  Einzelne Funktionen können je nach Plattform,
                  Version, Benutzerkonto oder gebuchtem
                  Leistungsumfang unterschiedlich verfügbar sein.
                </p>

              </AnimatedSection>


              {/* 05 */}

              <AnimatedSection className="terms-card terms-card-accent">

                <div className="terms-card-number">05</div>

                <div className="terms-card-icon">
                  <FiEdit3 />
                </div>

                <h3>Deine Inhalte</h3>

                <p>
                  Inhalte, die du selbst auf Momentry
                  veröffentlichst oder hochlädst, bleiben
                  grundsätzlich deine Inhalte.
                </p>

                <p>
                  Dazu gehören beispielsweise Texte, Fotos,
                  Videos, Kommentare, Antworten,
                  Reiseerfahrungen, Storys und andere von dir
                  bereitgestellte Inhalte.
                </p>

                <p>
                  Du bist dafür verantwortlich, dass du die
                  notwendigen Rechte an den von dir
                  veröffentlichten Inhalten besitzt und durch
                  ihre Veröffentlichung keine Rechte Dritter
                  verletzt werden.
                </p>

              </AnimatedSection>


              {/* 06 */}

              <AnimatedSection className="terms-card terms-card-accent">

                <div className="terms-card-number">06</div>

                <div className="terms-card-icon">
                  <FiBookOpen />
                </div>

                <h3>Nutzungsrecht an veröffentlichten Inhalten</h3>

                <p>
                  Damit wir deine Inhalte innerhalb von Momentry
                  technisch anzeigen und den jeweiligen
                  Funktionen entsprechend bereitstellen können,
                  räumst du uns für die Dauer ihrer
                  Veröffentlichung ein nicht ausschließliches,
                  räumlich unbeschränktes und für diesen Zweck
                  erforderliches Nutzungsrecht ein.
                </p>

                <p>
                  Dieses Recht umfasst insbesondere die
                  technische Speicherung, Vervielfältigung,
                  Übertragung und Darstellung innerhalb von
                  Momentry.
                </p>

                <p>
                  Wir erwerben dadurch kein Eigentum an deinen
                  Inhalten.
                </p>

              </AnimatedSection>


              {/* 07 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">07</div>

                <div className="terms-card-icon">
                  <FiUsers />
                </div>

                <h3>Community-Regeln</h3>

                <p>
                  Momentry soll ein respektvoller Ort für
                  Reisende sein. Deshalb erwarten wir einen
                  fairen und respektvollen Umgang miteinander.
                </p>

                <div className="terms-rules-grid">

                  <div>
                    <FiCheckCircle />
                    <strong>Respektvoll bleiben</strong>
                    <span>
                      Behandle andere Nutzerinnen und Nutzer
                      respektvoll und sachlich.
                    </span>
                  </div>

                  <div>
                    <FiCheckCircle />
                    <strong>Ehrlich teilen</strong>
                    <span>
                      Gib eigene Erfahrungen und Informationen
                      nicht bewusst falsch oder irreführend
                      wieder.
                    </span>
                  </div>

                  <div>
                    <FiCheckCircle />
                    <strong>Rechte beachten</strong>
                    <span>
                      Veröffentliche nur Inhalte, die du
                      veröffentlichen darfst.
                    </span>
                  </div>

                  <div>
                    <FiCheckCircle />
                    <strong>Privatsphäre schützen</strong>
                    <span>
                      Veröffentliche keine vertraulichen oder
                      personenbezogenen Daten anderer ohne
                      entsprechende Berechtigung.
                    </span>
                  </div>

                </div>

              </AnimatedSection>


              {/* 08 */}

              <AnimatedSection className="terms-card terms-card-wide terms-card-warning">

                <div className="terms-card-number">08</div>

                <div className="terms-card-icon">
                  <FiAlertTriangle />
                </div>

                <h3>Unzulässige Inhalte und Verhaltensweisen</h3>

                <p>
                  Nicht erlaubt sind insbesondere Inhalte oder
                  Verhaltensweisen, die gegen geltendes Recht
                  oder diese Nutzungsbedingungen verstoßen.
                </p>

                <ul>
                  <li>
                    Beleidigungen, Bedrohungen, Belästigungen
                    oder gezieltes Mobbing
                  </li>

                  <li>
                    menschenverachtende, diskriminierende oder
                    volksverhetzende Inhalte
                  </li>

                  <li>
                    rechtswidrige Gewaltinhalte oder Aufrufe zu
                    Straftaten
                  </li>

                  <li>
                    rechtswidrige sexuelle Inhalte oder Inhalte,
                    die Minderjährige gefährden
                  </li>

                  <li>
                    Verletzungen von Urheber-, Marken-,
                    Persönlichkeits- oder sonstigen Rechten
                    Dritter
                  </li>

                  <li>
                    Veröffentlichung personenbezogener oder
                    vertraulicher Daten Dritter ohne
                    Berechtigung
                  </li>

                  <li>
                    betrügerische, bewusst irreführende oder
                    manipulative Inhalte
                  </li>

                  <li>
                    Spam, massenhafte unerwünschte Werbung oder
                    automatisierte missbräuchliche Nutzung
                  </li>

                  <li>
                    Schadsoftware, Manipulationsversuche oder
                    Angriffe auf Momentry oder andere Nutzer
                  </li>

                  <li>
                    Inhalte oder Handlungen, die gegen sonstige
                    gesetzliche Vorschriften verstoßen
                  </li>
                </ul>

              </AnimatedSection>


              {/* 09 */}

              <AnimatedSection className="terms-card">

  <div className="terms-card-number">09</div>

  <div className="terms-card-icon">
    <FiFlag />
  </div>

  <h3>Rechtswidrige Inhalte melden</h3>

  <p>
    Wenn du einen konkreten Inhalt auf Momentry
    für rechtswidrig hältst, kannst du uns diesen
    über die hierfür bereitgestellte elektronische
    Meldefunktion melden.
  </p>

  <p>
    Die Meldung sollte den betroffenen Inhalt
    möglichst eindeutig bezeichnen und nachvollziehbar
    erläutern, weshalb du ihn für rechtswidrig hältst.
    Soweit erforderlich, können weitere Angaben zur
    Prüfung der Meldung abgefragt werden.
  </p>

  <p>
    Wir prüfen eingehende Meldungen sorgfältig und
    entscheiden nach Maßgabe der gesetzlichen
    Vorgaben über gegebenenfalls erforderliche
    Maßnahmen.
  </p>

</AnimatedSection>


              {/* 10 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">10</div>

                <div className="terms-card-icon">
                  <FiShield />
                </div>

                <h3>Moderation und Maßnahmen</h3>

                <p>
                  Wir können Inhalte überprüfen, wenn uns ein
                  möglicher Rechtsverstoß oder Verstoß gegen
                  diese Nutzungsbedingungen bekannt wird.
                </p>

                <p>
                  Abhängig von Art, Schwere und Häufigkeit eines
                  Verstoßes können insbesondere folgende
                  Maßnahmen erfolgen:
                </p>

                <ul>
                  <li>Inhalte entfernen</li>
                  <li>die Sichtbarkeit von Inhalten beschränken</li>
                  <li>bestimmte Funktionen vorübergehend einschränken</li>
                  <li>Verwarnungen aussprechen</li>
                  <li>Benutzerkonten vorübergehend sperren</li>
                  <li>Benutzerkonten dauerhaft sperren</li>
                </ul>

                <p>
                  Maßnahmen werden unter Berücksichtigung der
                  gesetzlichen Vorgaben und des Grundsatzes der
                  Verhältnismäßigkeit getroffen.
                </p>

              </AnimatedSection>


              {/* 11 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">11</div>

                <div className="terms-card-icon">
                  <FiMessageCircle />
                </div>

                <h3>Entscheidungen und Beschwerden</h3>

                <p>
                  Soweit gesetzlich erforderlich, informieren wir
                  dich über wesentliche Entscheidungen, durch die
                  deine Inhalte entfernt, ihre Sichtbarkeit
                  beschränkt oder dein Zugang zu Momentry
                  eingeschränkt wird.
                </p>

                <p>
                  Wenn du der Ansicht bist, dass eine Maßnahme
                  unberechtigt erfolgt ist, kannst du uns über
                  die angegebenen Kontaktmöglichkeiten
                  kontaktieren und eine erneute Prüfung
                  verlangen.
                </p>

                <div className="terms-notice">
                  <FiMail />
                  <p>
                    Kontakt:
                    {" "}
                    <a href="mailto:mamatochterontour@outlook.de">
                      mamatochterontour@outlook.de
                    </a>
                  </p>
                </div>

              </AnimatedSection>


              {/* 12 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">12</div>

                <div className="terms-card-icon">
                  <FiUsers />
                </div>

                <h3>Reisegruppen</h3>

                <p>
                  Nutzerinnen und Nutzer können innerhalb von
                  Momentry Reisegruppen erstellen und ihnen
                  beitreten.
                </p>

                <p>
                  Gruppenmitglieder sind auch innerhalb von
                  Gruppen verpflichtet, diese
                  Nutzungsbedingungen und unsere
                  Community-Regeln einzuhalten.
                </p>

                <p>
                  Gruppenadministratoren erhalten bestimmte
                  Verwaltungsfunktionen. Dadurch werden sie
                  jedoch nicht zu Vertreterinnen oder Vertretern
                  von MamaTochterOnTour.
                </p>

              </AnimatedSection>


              {/* 13 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">13</div>

                <div className="terms-card-icon">
                  <FiGlobe />
                </div>

                <h3>Reiseinformationen anderer Nutzer</h3>

                <p>
                  Beiträge, Antworten, Erfahrungen und sonstige
                  Inhalte innerhalb der Community stammen
                  teilweise von anderen Nutzerinnen und Nutzern.
                </p>

                <p>
                  Wir machen uns solche Inhalte nicht allein
                  dadurch zu eigen, dass sie auf Momentry
                  veröffentlicht werden.
                </p>

                <p>
                  Reiseinformationen können sich ändern. Prüfe
                  deshalb insbesondere sicherheitsrelevante,
                  rechtliche, gesundheitliche, Einreise-,
                  Verkehrs- oder Buchungsinformationen
                  zusätzlich anhand geeigneter offizieller
                  Quellen.
                </p>

              </AnimatedSection>


              {/* 14 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">14</div>

                <div className="terms-card-icon">
                  <FiStar />
                </div>

                <h3>Momentry Premium</h3>

                <p>
                  Bestimmte Funktionen von Momentry können nur
                  im Rahmen von Momentry Premium oder eines
                  anderen kostenpflichtigen Angebots verfügbar
                  sein.
                </p>

                <p>
                  Umfang, Preis, Laufzeit und weitere
                  Bedingungen kostenpflichtiger Leistungen
                  werden vor Abschluss angezeigt.
                </p>

                <p>
                  Für Premium-Abonnements und sonstige
                  kostenpflichtige Leistungen gelten ergänzend
                  unsere AGB.
                </p>

                <Link to="/agb" className="terms-link-button">
                  AGB ansehen
                  <FiFileText />
                </Link>

              </AnimatedSection>


              {/* 15 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">15</div>

                <div className="terms-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>Verfügbarkeit und Änderungen</h3>

                <p>
                  Wir bemühen uns um eine möglichst zuverlässige
                  Verfügbarkeit von Momentry. Eine jederzeit
                  vollständig unterbrechungsfreie Verfügbarkeit
                  kann jedoch technisch nicht garantiert werden.
                </p>

                <p>
                  Wartungen, Sicherheitsmaßnahmen, technische
                  Störungen oder Umstände außerhalb unseres
                  Einflussbereichs können die Nutzung zeitweise
                  einschränken.
                </p>

                <p>
                  Änderungen an dauerhaft bereitgestellten
                  digitalen Funktionen, die über die
                  Aufrechterhaltung der Vertragsmäßigkeit
                  hinausgehen, erfolgen nur aus einem triftigen
                  Grund, ohne zusätzliche Kosten und unter
                  Beachtung der gesetzlichen Informationsrechte.
                </p>

              </AnimatedSection>


              {/* 16 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">16</div>

                <div className="terms-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>Updates</h3>

                <p>
                  Wir können Updates bereitstellen, die für die
                  Sicherheit, Funktionsfähigkeit,
                  Kompatibilität oder Weiterentwicklung von
                  Momentry erforderlich sind.
                </p>

                <p>
                  Du solltest bereitgestellte Updates innerhalb
                  eines angemessenen Zeitraums installieren,
                  soweit dies für deine Plattform erforderlich
                  ist.
                </p>

                <p>
                  Gesetzliche Rechte hinsichtlich erforderlicher
                  Aktualisierungen digitaler Produkte bleiben
                  unberührt.
                </p>

              </AnimatedSection>


              {/* 17 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">17</div>

                <div className="terms-card-icon">
                  <FiTrash2 />
                </div>

                <h3>Kontolöschung und Beendigung</h3>

                <p>
                  Du kannst dein Momentry-Konto über die hierfür
                  bereitgestellte Funktion löschen.
                </p>

                <p>
                  Mit der Kontolöschung endet dein Zugang zu
                  kontobezogenen Funktionen.
                </p>

                <p>
                  Ein bestehendes Premium-Abonnement wird durch
                  die Löschung des Momentry-Kontos nicht
                  automatisch beendet. Ein aktives Abonnement
                  muss zusätzlich über die Plattform
                  beziehungsweise den Zahlungsweg gekündigt
                  werden, über den es abgeschlossen wurde.
                </p>

                <p>
                  Gesetzliche Rechte hinsichtlich der
                  Bereitstellung von von dir erstellten oder
                  bereitgestellten Inhalten nach
                  Vertragsbeendigung bleiben unberührt.
                </p>

              </AnimatedSection>


              {/* 18 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">18</div>

                <div className="terms-card-icon">
                  <FiBookOpen />
                </div>

                <h3>Unsere Inhalte und Kennzeichen</h3>

                <p>
                  Inhalte, Designs, Texte, Grafiken, Marken,
                  Logos und sonstige Bestandteile von Momentry
                  und MamaTochterOnTour können urheber-,
                  marken- oder anderweitig rechtlich geschützt
                  sein.
                </p>

                <p>
                  Eine Nutzung außerhalb der bestimmungsgemäßen
                  Nutzung von Momentry ist nur zulässig, wenn
                  sie gesetzlich erlaubt oder von uns
                  ausdrücklich gestattet wurde.
                </p>

              </AnimatedSection>


              {/* 19 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">19</div>

                <div className="terms-card-icon">
                  <FiShield />
                </div>

                <h3>Haftung</h3>

                <p>
                  Für Schäden haften wir nach den gesetzlichen
                  Vorschriften.
                </p>

                <p>
                  Insbesondere bleiben Ansprüche wegen
                  Verletzung von Leben, Körper oder Gesundheit,
                  wegen Vorsatz oder grober Fahrlässigkeit sowie
                  Ansprüche nach zwingenden gesetzlichen
                  Vorschriften unberührt.
                </p>

                <p>
                  Gesetzliche Mängelrechte bei digitalen
                  Produkten werden durch diese
                  Nutzungsbedingungen nicht eingeschränkt.
                </p>

              </AnimatedSection>


              {/* 20 */}

              <AnimatedSection className="terms-card terms-card-wide">

                <div className="terms-card-number">20</div>

                <div className="terms-card-icon">
                  <FiLock />
                </div>

                <h3>Datenschutz</h3>

                <p>
                  Informationen darüber, welche
                  personenbezogenen Daten bei der Nutzung von
                  Momentry verarbeitet werden, findest du in
                  unserer Datenschutzerklärung.
                </p>

                <Link
                  to="/datenschutz"
                  className="terms-link-button"
                >
                  Datenschutzerklärung ansehen
                  <FiLock />
                </Link>

              </AnimatedSection>


              {/* 21 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">21</div>

                <div className="terms-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>Änderungen dieser Nutzungsbedingungen</h3>

                <p>
                  Wir können diese Nutzungsbedingungen ändern,
                  wenn hierfür ein sachlicher Grund besteht,
                  etwa aufgrund gesetzlicher Änderungen, neuer
                  Funktionen, Sicherheitsanforderungen oder
                  notwendiger Anpassungen unseres Angebots.
                </p>

                <p>
                  Über wesentliche Änderungen informieren wir
                  dich entsprechend den gesetzlichen
                  Anforderungen.
                </p>

              </AnimatedSection>


              {/* 22 */}

              <AnimatedSection className="terms-card">

                <div className="terms-card-number">22</div>

                <div className="terms-card-icon">
                  <FiMail />
                </div>

                <h3>Kontakt und Schlussbestimmungen</h3>

                <p>
                  Wenn du Fragen zu diesen
                  Nutzungsbedingungen, einer Moderationsmaßnahme
                  oder zur Nutzung von Momentry hast, kannst du
                  uns kontaktieren.
                </p>

                <a
                  href="mailto:mamatochterontour@outlook.de"
                  className="terms-mail-link"
                >
                  <FiMail />
                  <span>mamatochterontour@outlook.de</span>
                </a>

                <p>
                  Es gilt deutsches Recht unter Ausschluss des
                  UN-Kaufrechts, soweit dem keine zwingenden
                  Verbraucherschutzvorschriften entgegenstehen.
                </p>

                <p>
                  Zwingende gesetzliche Rechte von
                  Verbraucherinnen und Verbrauchern bleiben
                  unberührt.
                </p>

              </AnimatedSection>

            </div>

          </div>

        </section>


        {/* =====================================================
            LEGAL LINKS
        ===================================================== */}

        <section className="terms-legal">

          <div className="terms-container">

            <AnimatedSection className="terms-legal-card">

              <div>

                <div className="terms-section-eyebrow terms-section-eyebrow-light">
                  <span className="terms-eyebrow-line" />
                  <span>Weitere rechtliche Hinweise</span>
                </div>

                <h2>
                  Alles
                  <span>auf einen Blick.</span>
                </h2>

                <p>
                  Weitere Informationen findest du in unseren
                  AGB, unserer Datenschutzerklärung und unserer
                  Widerrufsbelehrung.
                </p>

              </div>

              <div className="terms-legal-links">

                <Link to="/agb">
                  AGB
                  <FiFileText />
                </Link>

                <Link to="/datenschutz">
                  Datenschutz
                  <FiLock />
                </Link>

                <Link to="/widerruf">
                  Widerruf
                  <FiRefreshCw />
                </Link>

              </div>

            </AnimatedSection>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}