import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/BottomNavigationBar";
import useSEO from "../utils/seo";

function Datenschutz() {
  
  useSEO({
    title: "Datenschutzerklärung – MamaTochterOnTour",
    description: "Informationen zur Verarbeitung personenbezogener Daten auf MamaTochterOnTour gemäß DSGVO."
  });

  return (
    <div>
      <Navbar />

      <section className="legal-section">
        <div className="container">

          <h1 className="section-title legal-title">
  Datenschutzerklärung
</h1>

          <div className="legal-content">

            <h2>1. Datenschutz auf einen Blick</h2>

            <p>
              Der Schutz deiner persönlichen Daten ist uns sehr wichtig.
              Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend
              der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h2>2. Verantwortliche Stelle</h2>

            <p>
              MamaTochterOnTour<br />
              Jenny Weinreich<br />
              Stettiner Straße 41<br />
              35410 Hungen<br />
              E-Mail: mamatochterontour@outlook.de
            </p>

            <h2>3. Erhebung und Speicherung personenbezogener Daten</h2>

            <p>
              Beim Besuch dieser Website werden keine personenbezogenen Daten automatisch gespeichert,
              außer den Daten, die dein Browser übermittelt, um die Website korrekt anzuzeigen.
            </p>

            <p>
              Wenn du uns per E-Mail kontaktierst, speichern wir deine Angaben (E-Mail-Adresse,
              Name und Nachricht), um deine Anfrage zu bearbeiten.
            </p>

            <h2>4. Zweck der Datenverarbeitung</h2>

            <p>
              Die von dir übermittelten Daten werden ausschließlich zur Bearbeitung deiner Anfrage verwendet
              und nicht ohne deine Einwilligung weitergegeben.
            </p>

            <h2>5. Rechtsgrundlage</h2>

            <p>
              Die Verarbeitung deiner Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
              (Vertrag oder vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Kommunikation).
            </p>

            <h2>6. Speicherung der Daten</h2>

            <p>
              Wir speichern personenbezogene Daten nur so lange, wie es für die Bearbeitung deiner Anfrage notwendig ist.
              Danach werden sie gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>

            <h2>7. Deine Rechte</h2>

            <p>
              Du hast jederzeit das Recht auf:
            </p>

            <ul>
              <li>Auskunft über deine gespeicherten Daten</li>
              <li>Berichtigung falscher Daten</li>
              <li>Löschung deiner Daten</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
            </ul>

            <h2>8. Kontakt für Datenschutzanfragen</h2>

            <p>
              Bei Fragen zum Datenschutz kannst du uns jederzeit kontaktieren:<br />
              E-Mail: mamatochterontour@outlook.de
            </p>

          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Datenschutz;