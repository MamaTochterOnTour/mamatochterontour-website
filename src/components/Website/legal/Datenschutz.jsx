import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiActivity,
  FiBell,
  FiBookOpen,
  FiCheckCircle,
  FiCloud,
  FiCreditCard,
  FiDatabase,
  FiEye,
  FiFileText,
  FiGlobe,
  FiHeart,
  FiImage,
  FiLock,
  FiMail,
  FiMessageCircle,
  FiRefreshCw,
  FiServer,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import "./Datenschutz.css";


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
        amount: 0.08,
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
   DATENSCHUTZ
========================================================= */

export default function Datenschutz() {
  return (
    <>
      <Navbar />

      <main className="datenschutz-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="datenschutz-hero">

          <div className="datenschutz-hero-glow datenschutz-hero-glow-green" />
          <div className="datenschutz-hero-glow datenschutz-hero-glow-purple" />

          <div className="datenschutz-container datenschutz-hero-inner">

            <AnimatedSection className="datenschutz-hero-content">

              <div className="datenschutz-eyebrow datenschutz-eyebrow-light">
                <span className="datenschutz-eyebrow-line" />
                <span>Datenschutz</span>
              </div>

              <h1 className="datenschutz-hero-title">
                Deine Daten.
                <span>Transparent erklärt.</span>
              </h1>

              <p className="datenschutz-hero-text">
                Diese Datenschutzerklärung informiert dich darüber,
                wie wir personenbezogene Daten auf unserer Website,
                in unserem Onlineshop sowie bei der Nutzung von
                Momentry by MamaTochterOnTour als Web-App und
                mobile App verarbeiten.
              </p>

              <div className="datenschutz-hero-pills">

                <div className="datenschutz-hero-pill">
                  <FiShield />
                  <span>DSGVO</span>
                </div>

                <div className="datenschutz-hero-pill">
                  <FiLock />
                  <span>Datenschutz</span>
                </div>

                <div className="datenschutz-hero-pill">
                  <FiGlobe />
                  <span>Website & App</span>
                </div>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="datenschutz-intro">

          <div className="datenschutz-container">

            <AnimatedSection className="datenschutz-intro-grid">

              <div className="datenschutz-intro-left">

                <div className="datenschutz-eyebrow datenschutz-eyebrow-dark">
                  <span className="datenschutz-eyebrow-line" />
                  <span>Datenschutzerklärung</span>
                </div>

                <h2>
                  Was passiert
                  <span>mit deinen Daten?</span>
                </h2>

              </div>

              <div className="datenschutz-intro-right">

                <p>
                  Der Schutz deiner personenbezogenen Daten ist uns
                  wichtig. Wir verarbeiten personenbezogene Daten nur,
                  soweit dies für unsere Angebote erforderlich ist,
                  du eingewilligt hast oder eine andere gesetzliche
                  Grundlage die Verarbeitung erlaubt.
                </p>

                <p>
                  Welche Daten konkret verarbeitet werden, hängt davon
                  ab, welche Funktionen von MamaTochterOnTour und
                  Momentry du nutzt.
                </p>

              </div>

            </AnimatedSection>

          </div>

        </section>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="datenschutz-content-section">

          <div className="datenschutz-container">

            <div className="datenschutz-card-grid">


              {/* 01 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide">

                <div className="datenschutz-card-number">01</div>

                <div className="datenschutz-card-icon">
                  <FiUser />
                </div>

                <h3>Verantwortliche</h3>

                <p>
                  Verantwortliche im Sinne der Datenschutz-Grundverordnung
                  (DSGVO) und sonstiger datenschutzrechtlicher Vorschriften ist:
                </p>

                <div className="datenschutz-address">

                  <strong>MamaTochterOnTour</strong>
                  <span>Jennifer Weinreich</span>
                  <span>Stettiner Straße 41</span>
                  <span>35410 Hungen</span>
                  <span>Deutschland</span>

                  <a href="mailto:mamatochterontour@outlook.de">
                    mamatochterontour@outlook.de
                  </a>

                </div>

                <p>
                  Ein Datenschutzbeauftragter ist derzeit nicht bestellt.
                </p>

              </AnimatedSection>


              {/* 02 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">02</div>

                <div className="datenschutz-card-icon">
                  <FiGlobe />
                </div>

                <h3>Geltungsbereich</h3>

                <p>
                  Diese Datenschutzerklärung gilt für die Website von
                  MamaTochterOnTour, den Onlineshop sowie für
                  Momentry by MamaTochterOnTour.
                </p>

                <p>
                  Momentry wird als Web-App sowie als mobile Anwendung
                  für unterstützte Plattformen, insbesondere iOS und
                  Android, angeboten.
                </p>

                <p>
                  Sie gilt außerdem für damit verbundene Benutzerkonten,
                  Community-Funktionen, Premium-Abonnements,
                  Reiseplanungsfunktionen und digitale Angebote.
                </p>

              </AnimatedSection>


              {/* 03 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">03</div>

                <div className="datenschutz-card-icon">
                  <FiFileText />
                </div>

                <h3>Rechtsgrundlagen</h3>

                <p>
                  Wir verarbeiten personenbezogene Daten insbesondere
                  auf Grundlage von Art. 6 Abs. 1 DSGVO.
                </p>

                <ul>
                  <li>
                    Art. 6 Abs. 1 lit. a DSGVO bei einer von dir
                    erteilten Einwilligung,
                  </li>

                  <li>
                    Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung
                    zur Durchführung eines Vertrags oder vorvertraglicher
                    Maßnahmen erforderlich ist,
                  </li>

                  <li>
                    Art. 6 Abs. 1 lit. c DSGVO, soweit wir gesetzliche
                    Verpflichtungen erfüllen müssen,
                  </li>

                  <li>
                    Art. 6 Abs. 1 lit. f DSGVO, soweit die Verarbeitung
                    zur Wahrung unserer berechtigten Interessen oder
                    der berechtigten Interessen Dritter erforderlich
                    und zulässig ist.
                  </li>
                </ul>

              </AnimatedSection>


              {/* 04 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide datenschutz-card-accent">

                <div className="datenschutz-card-number">04</div>

                <div className="datenschutz-card-icon">
                  <FiServer />
                </div>

                <h3>Hosting und technische Bereitstellung</h3>

                <p>
                  Unsere Website und Web-Angebote werden technisch
                  unter anderem über Vercel bereitgestellt. Im Rahmen
                  des Aufrufs können technisch erforderliche Daten
                  verarbeitet werden.
                </p>

                <p>
                  Hierzu können insbesondere IP-Adresse,
                  Datum und Uhrzeit des Zugriffs, aufgerufene Inhalte,
                  Browserinformationen, Betriebssystem,
                  Geräteinformationen und technische Protokolldaten
                  gehören.
                </p>

                <p>
                  Die Verarbeitung dient der sicheren, stabilen und
                  technisch funktionsfähigen Bereitstellung unserer
                  Angebote.
                </p>

                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                  Unser berechtigtes Interesse besteht in der sicheren
                  und zuverlässigen Bereitstellung unserer digitalen
                  Angebote.
                </p>

                <div className="datenschutz-dark-note">
                  <FiCheckCircle />

                  <p>
                    GitHub verwenden wir für die Verwaltung unseres
                    Quellcodes und als Bestandteil unseres
                    Entwicklungs- und Deployment-Prozesses. Eine
                    Übermittlung von Besucherdaten an GitHub allein
                    aufgrund des Aufrufs unserer Website ist damit
                    nicht beabsichtigt.
                  </p>
                </div>

              </AnimatedSection>


              {/* 05 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">05</div>

                <div className="datenschutz-card-icon">
                  <FiDatabase />
                </div>

                <h3>Lokale Speicherung</h3>

                <p>
                  Unsere Website, unser Onlineshop, die Web-App und
                  die mobile App können Informationen lokal auf deinem
                  Gerät oder in deinem Browser speichern.
                </p>

                <p>
                  Dazu können insbesondere Spracheinstellungen,
                  Warenkorbinhalte, Favoriten, Login- beziehungsweise
                  Sitzungsinformationen und technisch notwendige
                  Einstellungen gehören.
                </p>

                <p>
                  Bei nicht angemeldeten Nutzerinnen und Nutzern können
                  insbesondere Warenkorb und Favoriten lokal gespeichert
                  werden. Nach einer Anmeldung können entsprechende
                  Informationen zusätzlich dem Benutzerkonto zugeordnet
                  und in unserer Datenbank gespeichert werden.
                </p>

                <p>
  Soweit die Speicherung von Informationen in deinem
  Endgerät oder der Zugriff auf bereits gespeicherte
  Informationen unbedingt erforderlich ist, damit wir
  einen von dir ausdrücklich gewünschten digitalen
  Dienst bereitstellen können, erfolgt dies auf Grundlage
  von § 25 Abs. 2 TDDDG. Für nicht unbedingt erforderliche
  Speicherungen oder Zugriffe holen wir vorab deine
  Einwilligung gemäß § 25 Abs. 1 TDDDG ein.
</p>

              </AnimatedSection>


              {/* 06 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">06</div>

                <div className="datenschutz-card-icon">
                  <FiActivity />
                </div>

                <h3>Google Analytics</h3>

                <p>
                  Auf unserer Website und in der Web-App verwenden wir
                  Google Analytics, einen Analysedienst von Google.
                </p>

                <p>
                  Google Analytics ermöglicht uns, die Nutzung unserer
                  digitalen Angebote statistisch auszuwerten und unser
                  Angebot weiterzuentwickeln.
                </p>

                <p>
                  Dabei können insbesondere Informationen über
                  Seitenaufrufe, Interaktionen, ungefähre technische
                  Herkunft, Geräte- und Browserinformationen sowie
                  technische Kennungen verarbeitet werden.
                </p>

                <p>
                  Soweit für den Einsatz von Google Analytics eine
                  Einwilligung erforderlich ist, erfolgt die
                  Verarbeitung auf Grundlage von Art. 6 Abs. 1
                  lit. a DSGVO. Die Einwilligung kann jederzeit mit
                  Wirkung für die Zukunft widerrufen werden.
                </p>

              </AnimatedSection>


              {/* 07 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide">

                <div className="datenschutz-card-number">07</div>

                <div className="datenschutz-card-icon">
                  <FiCloud />
                </div>

                <h3>Firebase und Google Cloud</h3>

                <p>
                  Für Momentry und verschiedene Funktionen unserer
                  digitalen Angebote verwenden wir Dienste der
                  Firebase-Plattform von Google.
                </p>

                <p>
                  Wir verwenden insbesondere Firebase Authentication,
                  Cloud Firestore, Cloud Storage for Firebase,
                  Cloud Functions for Firebase, Firebase Cloud
                  Messaging und Firebase Analytics.
                </p>

                <p>
                  Je nach verwendetem Dienst können dabei
                  Benutzerkennungen, IP-Adressen, Geräteinformationen,
                  technische Kennungen, Authentifizierungsdaten,
                  von dir eingegebene Inhalte und Nutzungsinformationen
                  verarbeitet werden.
                </p>

                <p>
                  Cloud Firestore dient insbesondere der Speicherung
                  strukturierter Daten. Cloud Storage verwenden wir
                  insbesondere für von Nutzerinnen und Nutzern
                  hochgeladene Dateien wie Bilder und Videos.
                  Cloud Functions werden für serverseitige Abläufe
                  verwendet.
                </p>

                <p>
                  Firebase-Dienste können je nach Dienst und
                  Konfiguration Daten innerhalb und außerhalb des
                  Europäischen Wirtschaftsraums verarbeiten.
                </p>

                <p>
  Firebase Authentication wird nach Angaben von Google
  über Rechenzentren in den Vereinigten Staaten
  betrieben. Bei anderen Firebase-Diensten hängt der
  Ort der Verarbeitung unter anderem vom jeweiligen
  Dienst und der von uns gewählten Konfiguration
  beziehungsweise Datenregion ab.
</p>

                <p>
  Die Verarbeitung im Rahmen von Firebase
  Authentication, Cloud Firestore, Cloud Storage und
  Cloud Functions erfolgt insbesondere auf Grundlage
  von Art. 6 Abs. 1 lit. b DSGVO, soweit sie für die
  Bereitstellung deines Benutzerkontos und der von dir
  genutzten Funktionen erforderlich ist. Soweit
  Verarbeitungen der Sicherheit, Stabilität oder
  Missbrauchsprävention dienen, kann die Verarbeitung
  außerdem auf Art. 6 Abs. 1 lit. f DSGVO beruhen.
</p>

<p>
  Soweit Firebase-Dienste zu Analysezwecken eingesetzt
  werden und hierfür eine Einwilligung erforderlich ist,
  erfolgt die Verarbeitung auf Grundlage von Art. 6
  Abs. 1 lit. a DSGVO.
</p>

              </AnimatedSection>


              {/* 08 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">08</div>

                <div className="datenschutz-card-icon">
                  <FiLock />
                </div>

                <h3>Benutzerkonto & Anmeldung</h3>

                <p>
                  Für die Nutzung bestimmter Funktionen kannst
                  beziehungsweise musst du ein Benutzerkonto erstellen.
                  Das Benutzerkonto wird gemeinsam für die damit
                  verbundenen Momentry- und Shop-Funktionen verwendet.
                </p>

                <p>
                  Dabei verarbeiten wir insbesondere Vorname,
                  Nachname, Benutzername, E-Mail-Adresse,
                  Spracheinstellung, Zeitpunkt der Kontoerstellung
                  sowie Informationen zum Premiumstatus.
                </p>

                <p>
                  Bei der Anmeldung mit E-Mail-Adresse und Passwort
                  erfolgt die Authentifizierung über Firebase
                  Authentication. Authentifizierungsdaten werden
                  durch Firebase verarbeitet.
                </p>

                <p>
                  Firebase Authentication kann außerdem IP-Adressen,
                  User-Agent-Informationen und weitere für die
                  Authentifizierung und Missbrauchsprävention
                  erforderliche technische Informationen verarbeiten.
                </p>

                <p>
                  Rechtsgrundlage ist insbesondere Art. 6 Abs. 1
                  lit. b DSGVO.
                </p>

              </AnimatedSection>


              {/* 09 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">09</div>

                <div className="datenschutz-card-icon">
                  <FiUser />
                </div>

                <h3>Google- und Apple-Anmeldung</h3>

                <p>
                  Neben der Anmeldung mit E-Mail-Adresse können wir
                  die Anmeldung über Google und Apple anbieten.
                </p>

                <p>
                  Beim Google-Login werden die für die Anmeldung
                  erforderlichen Kontoinformationen, insbesondere
                  Name und E-Mail-Adresse, von Google an uns
                  übermittelt.
                </p>

                <p>
                  Beim Login mit Apple werden die von Apple im Rahmen
                  der Anmeldung bereitgestellten Daten verarbeitet.
                  Abhängig von den Einstellungen des Apple-Kontos
                  kann hierbei auch eine von Apple bereitgestellte
                  Relay-E-Mail-Adresse verwendet werden.
                </p>

                <p>
                  Die jeweilige Anmeldung erfolgt nur, wenn du die
                  entsprechende Login-Methode selbst auswählst.
                </p>

              </AnimatedSection>


              {/* 10 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">10</div>

                <div className="datenschutz-card-icon">
                  <FiUser />
                </div>

                <h3>Profil und Profildaten</h3>

                <p>
                  Innerhalb von Momentry kannst du dein Profil
                  ausgestalten. Dabei können insbesondere dein
                  Benutzername, Vor- und Nachname, Profilbild und
                  eine von dir freiwillig eingegebene Biografie
                  verarbeitet werden.
                </p>

                <p>
                  Welche Angaben für andere Nutzer sichtbar sind,
                  richtet sich nach der jeweiligen Funktion innerhalb
                  von Momentry.
                </p>

                <p>
                  Freiwillige Profilangaben kannst du grundsätzlich
                  selbst ändern oder entfernen.
                </p>

              </AnimatedSection>


              {/* 11 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">11</div>

                <div className="datenschutz-card-icon">
                  <FiUsers />
                </div>

                <h3>Community und Nutzerinhalte</h3>

                <p>
                  Momentry enthält Community-Funktionen. Nutzerinnen
                  und Nutzer können je nach verfügbarer Funktion
                  unter anderem Beiträge, Stories, Fragen, Antworten,
                  Kommentare, Reisegruppen, Reiseforum-Beiträge und
                  weitere Inhalte erstellen.
                </p>

                <p>
                  Dabei verarbeiten wir die von dir bereitgestellten
                  Texte, Bilder, Videos und sonstigen Inhalte sowie
                  Informationen, die für die Zuordnung zum jeweiligen
                  Benutzerkonto erforderlich sind.
                </p>

                <p>
                  Inhalte, die du in öffentlichen Community-Bereichen
                  veröffentlichst, können für andere Nutzerinnen und
                  Nutzer sichtbar sein.
                </p>

                <p>
                  Rechtsgrundlage ist insbesondere Art. 6 Abs. 1
                  lit. b DSGVO.
                </p>

              </AnimatedSection>


              {/* 12 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide datenschutz-card-private">

                <div className="datenschutz-card-number">12</div>

                <div className="datenschutz-card-icon">
                  <FiLock />
                </div>

                <h3>Private Reiseplanung und Reisetagebücher</h3>

                <p>
                  Deine Reiseplanung und deine persönlichen
                  Reisetagebücher sind private Bereiche deines
                  Benutzerkontos und nicht als öffentliche
                  Community-Inhalte vorgesehen.
                </p>

                <p>
                  In der Reiseplanung kannst du insbesondere Reiseziel
                  und Reisezeitraum hinterlegen sowie Buchungen,
                  Kontakte, Budgets, Aufgaben, Notizen,
                  Tagesplanungen und Packlisten verwalten.
                </p>

                <p>
                  Die dort eingegebenen Informationen können abhängig
                  davon, was du selbst einträgst, auch persönliche
                  Informationen über dich oder andere Personen
                  enthalten.
                </p>

                <p>
                  Kontakte werden von dir manuell eingetragen.
                  Momentry greift hierfür nicht auf das Adressbuch
                  deines Geräts zu.
                </p>

                <div className="datenschutz-private-note">
                  <FiLock />

                  <p>
                    Bitte trage personenbezogene Daten anderer
                    Personen nur ein, wenn du dazu berechtigt bist.
                  </p>
                </div>

              </AnimatedSection>


              {/* 13 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">13</div>

                <div className="datenschutz-card-icon">
                  <FiImage />
                </div>

                <h3>Fotos, Videos & Fotobibliothek</h3>

                <p>
                  In Momentry können Bilder und Videos hochgeladen
                  werden, beispielsweise für Profilbilder, Beiträge,
                  Stories, Reisegruppen, das Reiseforum,
                  Gruppenchats oder Reisetagebücher.
                </p>

                <p>
                  Hierfür kann die mobile App – nach deiner
                  entsprechenden Auswahl beziehungsweise
                  Berechtigung – auf die Fotobibliothek deines
                  Geräts zugreifen.
                </p>

                <p>
                  Ausgewählte Bilder und Videos können in Cloud
                  Storage for Firebase gespeichert und dem jeweiligen
                  Inhalt oder Benutzerkonto zugeordnet werden.
                </p>

                <p>
                  Momentry verwendet derzeit keinen Gerätestandort
                  und greift für die beschriebenen Funktionen nicht
                  auf Kamera oder Mikrofon zu.
                </p>

              </AnimatedSection>


              {/* 14 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">14</div>

                <div className="datenschutz-card-icon">
                  <FiBell />
                </div>

                <h3>Push-Benachrichtigungen</h3>

                <p>
                  Momentry kann Push-Benachrichtigungen anbieten.
                  Hierfür verwenden wir Firebase Cloud Messaging.
                </p>

                <p>
                  Wenn du Push-Benachrichtigungen erlaubst, wird
                  insbesondere ein technischer Geräte- beziehungsweise
                  FCM-Token verarbeitet, damit Nachrichten dem
                  richtigen Gerät zugestellt werden können.
                </p>

                <p>
                  Push-Benachrichtigungen werden nur entsprechend
                  der von deinem Betriebssystem bereitgestellten
                  Berechtigungen verwendet. Du kannst die Berechtigung
                  jederzeit über die Einstellungen deines Geräts
                  ändern oder entziehen.
                </p>

              </AnimatedSection>


              {/* 15 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">15</div>

                <div className="datenschutz-card-icon">
                  <FiActivity />
                </div>

                <h3>Firebase Analytics</h3>

                <p>
                  In Momentry verwenden wir Firebase Analytics,
                  um die Nutzung der Web-App und mobilen App
                  statistisch auszuwerten und unser Angebot
                  weiterzuentwickeln.
                </p>

                <p>
                  Dabei können insbesondere technische
                  Geräteinformationen, App-Interaktionen,
                  Nutzungsereignisse und technische Kennungen
                  verarbeitet werden.
                </p>

                <p>
                  Soweit hierfür eine Einwilligung erforderlich ist,
                  erfolgt die Verarbeitung auf Grundlage von
                  Art. 6 Abs. 1 lit. a DSGVO. Eine erteilte
                  Einwilligung kann mit Wirkung für die Zukunft
                  widerrufen werden.
                </p>

              </AnimatedSection>


              {/* 16 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide">

                <div className="datenschutz-card-number">16</div>

                <div className="datenschutz-card-icon">
                  <FiCreditCard />
                </div>

                <h3>Momentry Premium & RevenueCat</h3>

                <p>
                  Für die technische Verwaltung und Zuordnung von
                  Premium-Abonnements verwenden wir RevenueCat.
                </p>

                <p>
                  Dabei können insbesondere eine Benutzerkennung,
                  Informationen zur Plattform, zum gewählten
                  Abonnement, zum Kauf beziehungsweise zur
                  Transaktion sowie zum aktuellen Berechtigungs-
                  und Abonnementstatus verarbeitet werden.
                </p>

                <p>
                  Die Verarbeitung ermöglicht insbesondere, den
                  Premiumstatus einem Momentry-Konto zuzuordnen
                  und Premium plattformübergreifend bereitzustellen.
                </p>

                <p>
                  Rechtsgrundlage ist insbesondere Art. 6 Abs. 1
                  lit. b DSGVO, soweit die Verarbeitung zur
                  Bereitstellung des erworbenen Premium-Abonnements
                  erforderlich ist.
                </p>

              </AnimatedSection>


              {/* 17 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">17</div>

                <div className="datenschutz-card-icon">
                  <FiShoppingBag />
                </div>

                <h3>Apple & Google In-App-Käufe</h3>

                <p>
                  Premium-Abonnements können innerhalb der mobilen
                  App über die von Apple beziehungsweise Google
                  bereitgestellten In-App-Kaufsysteme abgeschlossen
                  werden.
                </p>

                <p>
                  Die Zahlungsabwicklung erfolgt dabei über den
                  jeweiligen Plattformanbieter. Wir erhalten nicht
                  deine vollständigen Karten- oder
                  Zahlungsinformationen.
                </p>

                <p>
                  Wir beziehungsweise die zur Verwaltung des
                  Premiumstatus eingesetzten Dienste erhalten jedoch
                  die für die Zuordnung und Bereitstellung des
                  Abonnements erforderlichen Kauf-, Transaktions-
                  und Berechtigungsinformationen.
                </p>

              </AnimatedSection>


              {/* 18 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">18</div>

                <div className="datenschutz-card-icon">
                  <FiCreditCard />
                </div>

                <h3>Stripe & Web-Premium</h3>

                <p>
                  Beim Abschluss eines Premium-Abonnements über
                  unsere Web-App verwenden wir Stripe für die
                  Zahlungsabwicklung.
                </p>

                <p>
                  Im Rahmen der Zahlungsabwicklung können insbesondere
                  Name, E-Mail-Adresse, Rechnungsadresse,
                  Zahlungsinformationen, Transaktionsdaten und
                  technische Informationen verarbeitet werden.
                </p>

                <p>
                  Je nach Verfügbarkeit können über Stripe
                  insbesondere Kartenzahlungen, PayPal und Apple Pay
                  angeboten werden.
                </p>

                <p>
                  Die Verarbeitung erfolgt insbesondere zur
                  Durchführung des Vertrags und der Zahlung gemäß
                  Art. 6 Abs. 1 lit. b DSGVO sowie, soweit erforderlich,
                  zur Erfüllung gesetzlicher Pflichten gemäß
                  Art. 6 Abs. 1 lit. c DSGVO.
                </p>

              </AnimatedSection>


              {/* 19 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide">

                <div className="datenschutz-card-number">19</div>

                <div className="datenschutz-card-icon">
                  <FiShoppingBag />
                </div>

                <h3>Onlineshop & Bestellungen</h3>

                <p>
                  Wenn du in unserem Onlineshop einen digitalen
                  Reiseguide oder ein anderes angebotenes Produkt
                  kaufst, verarbeiten wir die für Bestellung,
                  Vertragsabwicklung, Zahlung und Bereitstellung
                  erforderlichen Daten.
                </p>

                <p>
                  Hierzu gehören insbesondere Name, E-Mail-Adresse,
                  Rechnungsadresse, bestellte Produkte,
                  Bestellinformationen, Zahlungsstatus,
                  Bestell- beziehungsweise Rechnungsnummer und
                  weitere für die Abwicklung erforderliche Daten.
                </p>

                <p>
                  Bestellungen können – soweit angeboten – mit
                  Benutzerkonto oder als Gast durchgeführt werden.
                </p>

                <p>
                  Rechnungen und steuerlich beziehungsweise
                  handelsrechtlich relevante Unterlagen werden
                  entsprechend den gesetzlichen
                  Aufbewahrungspflichten gespeichert.
                </p>

                <p>
                  Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1
                  lit. b und lit. c DSGVO.
                </p>

              </AnimatedSection>


              {/* 20 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">20</div>

                <div className="datenschutz-card-icon">
                  <FiHeart />
                </div>

                <h3>Warenkorb & Favoriten</h3>

                <p>
                  Warenkorbinhalte und Favoriten können lokal in
                  deinem Browser gespeichert werden.
                </p>

                <p>
                  Bei angemeldeten Nutzerinnen und Nutzern können
                  Warenkorb und Favoriten zusätzlich in Cloud
                  Firestore gespeichert und dem Benutzerkonto
                  zugeordnet werden.
                </p>

                <p>
                  Dies ermöglicht insbesondere die geräte- und
                  sitzungsübergreifende Nutzung dieser Funktionen.
                </p>

              </AnimatedSection>


              {/* 21 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">21</div>

                <div className="datenschutz-card-icon">
                  <FiMessageCircle />
                </div>

                <h3>Bewertungen</h3>

                <p>
                  In unserem Onlineshop können Bewertungen abgegeben
                  werden. Dabei verarbeiten wir insbesondere den
                  angezeigten Namen, die Sternebewertung, den
                  Bewertungstext und das Datum.
                </p>

                <p>
                  Bei Bewertungen aus einem Benutzerkonto kann als
                  Anzeigename der dem Konto zugeordnete Display-Name
                  beziehungsweise Vor- und Nachname verwendet werden.
                </p>

                <p>
                  Gastbewertungen können unter einem von der
                  bewertenden Person selbst gewählten Anzeigenamen
                  veröffentlicht werden.
                </p>

                <p>
                  Da eine Gastbewertung keinem Benutzerkonto
                  zugeordnet ist, stehen kontobasierte Funktionen
                  zum nachträglichen Bearbeiten oder Löschen einer
                  Bewertung dort nicht in gleicher Weise zur Verfügung.
                  Gesetzliche Datenschutzrechte bleiben unberührt.
                </p>

              </AnimatedSection>


              {/* 22 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">22</div>

                <div className="datenschutz-card-icon">
                  <FiMail />
                </div>

                <h3>Kontaktaufnahme</h3>

                <p>
                  Wenn du uns kontaktierst, verarbeiten wir die von
                  dir übermittelten Informationen zur Bearbeitung
                  deiner Anfrage.
                </p>

                <p>
                  Unser Kontaktformular enthält insbesondere Felder
                  für Name, E-Mail-Adresse, Thema und Nachricht.
                </p>

                <p>
                  Das Kontaktformular verwendet eine E-Mail-Verknüpfung
                  („mailto“). Die von dir vorbereitete Nachricht wird
                  über dein eigenes E-Mail-Programm beziehungsweise
                  deinen gewählten E-Mail-Dienst an uns versendet.
                </p>

                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
                  soweit deine Anfrage einen Vertrag oder
                  vorvertragliche Maßnahmen betrifft, ansonsten
                  insbesondere Art. 6 Abs. 1 lit. f DSGVO.
                </p>

              </AnimatedSection>


              {/* 23 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide datenschutz-card-newsletter">

                <div className="datenschutz-card-number">23</div>

                <div className="datenschutz-card-icon">
                  <FiMail />
                </div>

                <h3>Newsletter & Brevo</h3>

                <p>
                  Du kannst dich über unsere Website und unseren
                  Onlineshop für unseren Newsletter anmelden.
                  Für den Newsletter verwenden wir Brevo.
                </p>

                <p>
                  Für die Anmeldung verarbeiten wir deine
                  E-Mail-Adresse.
                </p>

                <p>
                  Die Newsletter-Anmeldung erfolgt im
                  Double-Opt-In-Verfahren. Nach der Anmeldung
                  erhältst du zunächst eine Bestätigungs-E-Mail.
                  Erst wenn du den darin enthaltenen
                  Bestätigungslink verwendest, wird deine Anmeldung
                  abgeschlossen.
                </p>

                <p>
                  Der Bestätigungslink ist für einen begrenzten
                  Zeitraum von derzeit 30 Tagen gültig.
                  Nach erfolgreicher Bestätigung kann über Brevo
                  eine Willkommens-E-Mail versendet werden.
                </p>

                <p>
                  Rechtsgrundlage für den Newsletterversand ist
                  deine Einwilligung gemäß Art. 6 Abs. 1 lit. a
                  DSGVO. Du kannst diese Einwilligung jederzeit
                  mit Wirkung für die Zukunft widerrufen,
                  insbesondere über die Abmeldemöglichkeit im
                  Newsletter.
                </p>

                <div className="datenschutz-newsletter-note">
                  <FiCheckCircle />

                  <p>
                    Ein Widerruf der Newsletter-Einwilligung hat
                    keinen Einfluss auf die Rechtmäßigkeit der bis
                    zum Widerruf erfolgten Verarbeitung.
                  </p>
                </div>

              </AnimatedSection>


              {/* 24 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">24</div>

                <div className="datenschutz-card-icon">
                  <FiGlobe />
                </div>

                <h3>Partnerlinks & TUI</h3>

                <p>
                  Auf unserer Website können wir auf Angebote
                  externer Partner verlinken, beispielsweise auf
                  das TUI Reisebüro in Aschaffenburg.
                </p>

                <p>
                  Ein bloßer Link übermittelt grundsätzlich erst
                  dann Daten an die Zielseite, wenn du den Link
                  selbst aufrufst. Ab diesem Zeitpunkt gelten die
                  Datenschutzbestimmungen des jeweiligen externen
                  Anbieters.
                </p>

                <p>
                  Für die Datenverarbeitung auf externen Websites
                  sind grundsätzlich deren jeweilige Betreiber
                  verantwortlich.
                </p>

              </AnimatedSection>


              {/* 25 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">25</div>

                <div className="datenschutz-card-icon">
                  <FiTrash2 />
                </div>

                <h3>Accountlöschung</h3>

                <p>
                  Du kannst dein Momentry-Konto über die hierfür
                  bereitgestellte Funktion löschen.
                </p>

                <p>
                  Bei der Accountlöschung werden die dem Konto
                  zugeordneten Nutzerdaten nach Maßgabe unserer
                  technischen Löschprozesse gelöscht. Dazu gehören
                  insbesondere Profildaten, Reiseplanungen,
                  Reisetagebücher und die dem Konto zugeordneten
                  Nutzerinhalte.
                </p>

                <p>
                  Daten, für die gesetzliche Aufbewahrungspflichten
                  bestehen, insbesondere bestimmte Bestell-,
                  Rechnungs- und Zahlungsunterlagen, werden erst
                  nach Ablauf der jeweiligen gesetzlichen Fristen
                  gelöscht.
                </p>

                <p>
                  Bei eingesetzten technischen Dienstleistern können
                  Daten nach einer Löschung vorübergehend noch in
                  Sicherungs- und Backup-Systemen vorhanden sein,
                  bevor sie im Rahmen der jeweiligen Löschzyklen
                  endgültig entfernt werden.
                </p>

                <div className="datenschutz-delete-note">
                  <FiTrash2 />

                  <p>
  Die Löschung eines Momentry-Kontos beendet ein
  bestehendes Premium-Abonnement nicht automatisch.
  Ein aktives Premium-Abonnement muss zusätzlich über
  die Plattform beziehungsweise den Zahlungsweg
  gekündigt werden, über den es abgeschlossen wurde.
  Dies gilt sowohl für über Apple oder Google
  abgeschlossene Abonnements als auch für über die
  Web-App abgeschlossene Premium-Abonnements.
</p>
                </div>

              </AnimatedSection>


              {/* 26 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">26</div>

                <div className="datenschutz-card-icon">
                  <FiDatabase />
                </div>

                <h3>Speicherdauer</h3>

                <p>
                  Wir speichern personenbezogene Daten grundsätzlich
                  nur so lange, wie sie für den jeweiligen Zweck
                  erforderlich sind oder gesetzliche
                  Aufbewahrungspflichten bestehen.
                </p>

                <p>
                  Daten eines aktiven Benutzerkontos können daher
                  grundsätzlich für die Dauer der Kontonutzung
                  gespeichert werden.
                </p>

                <p>
                  Nach Wegfall des Verarbeitungszwecks werden Daten
                  gelöscht oder gesperrt, sofern keine gesetzlichen
                  Pflichten oder zulässigen Gründe für eine weitere
                  Speicherung bestehen.
                </p>

              </AnimatedSection>


              {/* 27 */}

              <AnimatedSection className="datenschutz-card datenschutz-card-wide">

                <div className="datenschutz-card-number">27</div>

                <div className="datenschutz-card-icon">
                  <FiGlobe />
                </div>

                <h3>Übermittlung in Drittländer</h3>

                <p>
                  Einige der von uns eingesetzten Dienstleister
                  beziehungsweise deren verbundene Unternehmen
                  befinden sich außerhalb Deutschlands oder des
                  Europäischen Wirtschaftsraums.
                </p>

                <p>
                  Im Rahmen der Nutzung insbesondere von Diensten
                  international tätiger Anbieter wie Google,
                  Apple, Stripe oder RevenueCat kann daher eine
                  Verarbeitung personenbezogener Daten in Staaten
                  außerhalb des Europäischen Wirtschaftsraums,
                  einschließlich der USA, nicht ausgeschlossen sein.
                </p>

                <p>
  Soweit personenbezogene Daten in ein Drittland
  übermittelt werden, erfolgt dies unter Beachtung
  der Voraussetzungen der Art. 44 ff. DSGVO. Bei
  Übermittlungen in die USA kann insbesondere ein
  Angemessenheitsbeschluss der Europäischen Kommission
  für nach dem EU-U.S. Data Privacy Framework
  zertifizierte Unternehmen zugrunde gelegt werden.
  Soweit kein einschlägiger Angemessenheitsbeschluss
  besteht, können insbesondere geeignete Garantien wie
  die Standardvertragsklauseln der Europäischen
  Kommission verwendet werden.
</p>

              </AnimatedSection>


              {/* 28 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">28</div>

                <div className="datenschutz-card-icon">
                  <FiShield />
                </div>

                <h3>Datensicherheit</h3>

                <p>
                  Wir treffen angemessene technische und
                  organisatorische Maßnahmen, um personenbezogene
                  Daten vor Verlust, Missbrauch, unberechtigtem
                  Zugriff und unzulässiger Veränderung zu schützen.
                </p>

                <p>
                  Dazu gehören insbesondere technische
                  Zugriffsbeschränkungen, Authentifizierungsverfahren,
                  verschlüsselte Datenübertragung und
                  Zugriffsregelungen innerhalb der eingesetzten
                  Systeme.
                </p>

                <p>
                  Bei Cloud Firestore und Cloud Storage werden
                  Zugriffsregeln verwendet, um den Zugriff auf
                  Daten entsprechend der jeweiligen Funktion und
                  Benutzerberechtigung zu begrenzen.
                </p>

              </AnimatedSection>


              {/* 29 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">29</div>

                <div className="datenschutz-card-icon">
                  <FiEye />
                </div>

                <h3>Deine Datenschutzrechte</h3>

                <p>
                  Dir stehen nach Maßgabe der gesetzlichen
                  Voraussetzungen insbesondere folgende Rechte zu:
                </p>

                <ul>
                  <li>Recht auf Auskunft,</li>
                  <li>Recht auf Berichtigung,</li>
                  <li>Recht auf Löschung,</li>
                  <li>Recht auf Einschränkung der Verarbeitung,</li>
                  <li>Recht auf Datenübertragbarkeit,</li>
                  <li>Recht auf Widerspruch gegen bestimmte Verarbeitungen.</li>
                </ul>

                <p>
                  Zur Ausübung deiner Rechte kannst du dich jederzeit
                  an uns wenden.
                </p>

              </AnimatedSection>


              {/* 30 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">30</div>

                <div className="datenschutz-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>Widerruf von Einwilligungen</h3>

                <p>
                  Soweit eine Verarbeitung auf deiner Einwilligung
                  beruht, kannst du die Einwilligung jederzeit mit
                  Wirkung für die Zukunft widerrufen.
                </p>

                <p>
                  Durch den Widerruf wird die Rechtmäßigkeit der
                  aufgrund der Einwilligung bis zum Widerruf
                  erfolgten Verarbeitung nicht berührt.
                </p>

                <p>
                  Je nach Funktion kannst du Einstellungen direkt
                  innerhalb unserer Angebote, über dein Gerät oder
                  durch Kontaktaufnahme mit uns ändern.
                </p>

              </AnimatedSection>


              {/* 31 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">31</div>

                <div className="datenschutz-card-icon">
                  <FiShield />
                </div>

                <h3>Beschwerderecht</h3>

                <p>
                  Du hast außerdem das Recht, dich bei einer
                  zuständigen Datenschutzaufsichtsbehörde über die
                  Verarbeitung deiner personenbezogenen Daten zu
                  beschweren.
                </p>

                <p>
                  Dieses Recht besteht unbeschadet anderer
                  verwaltungsrechtlicher oder gerichtlicher
                  Rechtsbehelfe.
                </p>

              </AnimatedSection>


              {/* 32 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">32</div>

                <div className="datenschutz-card-icon">
                  <FiUsers />
                </div>

                <h3>Minderjährige</h3>

                <p>
                  Momentry enthält keine speziell für Kinder
                  entwickelten Funktionen.
                </p>

                <p>
                  Wir erheben für die allgemeine Kontonutzung
                  derzeit nicht gezielt das Geburtsdatum.
                </p>

                <p>
                  Für Minderjährige gelten die gesetzlichen
                  Regelungen zur Geschäftsfähigkeit und – soweit
                  eine datenschutzrechtliche Einwilligung erforderlich
                  ist – die hierfür geltenden besonderen gesetzlichen
                  Anforderungen.
                </p>

                <p>
                  Alters- beziehungsweise Inhaltsfreigaben in
                  App-Stores sind von diesen gesetzlichen
                  Voraussetzungen zu unterscheiden.
                </p>

              </AnimatedSection>


              {/* 33 */}

              <AnimatedSection className="datenschutz-card" delay={0.03}>

                <div className="datenschutz-card-number">33</div>

                <div className="datenschutz-card-icon">
                  <FiMail />
                </div>

                <h3>Datenschutzkontakt</h3>

                <p>
                  Wenn du Fragen zur Verarbeitung deiner Daten
                  hast oder deine Datenschutzrechte ausüben
                  möchtest, kannst du uns direkt kontaktieren.
                </p>

                <a
                  href="mailto:mamatochterontour@outlook.de?subject=Datenschutzanfrage"
                  className="datenschutz-mail-button"
                >
                  Datenschutzanfrage senden
                  <FiMail />
                </a>

              </AnimatedSection>


              {/* 34 */}

              <AnimatedSection className="datenschutz-card">

                <div className="datenschutz-card-number">34</div>

                <div className="datenschutz-card-icon">
                  <FiRefreshCw />
                </div>

                <h3>Änderungen dieser Datenschutzerklärung</h3>

                <p>
                  Wir können diese Datenschutzerklärung anpassen,
                  wenn sich unsere Angebote, eingesetzte Dienste,
                  technische Abläufe oder rechtliche Anforderungen
                  ändern.
                </p>

                <p>
                  Es gilt die jeweils aktuelle auf unseren digitalen
                  Angeboten bereitgestellte Fassung.
                </p>

              </AnimatedSection>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section className="datenschutz-contact">

          <div className="datenschutz-contact-glow datenschutz-contact-glow-green" />
          <div className="datenschutz-contact-glow datenschutz-contact-glow-purple" />

          <div className="datenschutz-container">

            <AnimatedSection className="datenschutz-contact-card">

              <div>

                <div className="datenschutz-eyebrow datenschutz-eyebrow-light">
                  <span className="datenschutz-eyebrow-line" />
                  <span>Deine Daten. Deine Rechte.</span>
                </div>

                <h2>
                  Fragen zum
                  <span>Datenschutz?</span>
                </h2>

                <p>
                  Wenn du wissen möchtest, welche Daten wir über
                  dich verarbeiten, eine Berichtigung oder Löschung
                  möchtest oder eine andere Datenschutzfrage hast,
                  kannst du dich direkt an uns wenden.
                </p>

              </div>

              <a
                href="mailto:mamatochterontour@outlook.de?subject=Datenschutzanfrage"
                className="datenschutz-contact-button"
              >
                E-Mail schreiben
                <FiMail />
              </a>

            </AnimatedSection>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}