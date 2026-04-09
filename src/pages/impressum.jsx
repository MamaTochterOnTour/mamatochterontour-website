import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/BottomNavigationBar";
import useSEO from "../utils/seo";

function Impressum() {

  useSEO({
    title: "Impressum – MamaTochterOnTour",
    description: "Impressum und rechtliche Angaben von MamaTochterOnTour gemäß §5 TMG."
  });

  return (
    <div>
      <Navbar />

      <section className="legal-section">
        <div className="container">

          <h1 className="section-title">Impressum</h1>

          <div className="legal-content">

            <h2>Angaben gemäß § 5 TMG</h2>

            <p>
              MamaTochterOnTour<br />
              Jenny Weinreich<br />
              Stettiner STraße 41<br />
              35410 Hungen<br />
              Deutschland
            </p>

            <h2>Kontakt</h2>

            <p>
              E-Mail: mamatochterontour@outlook.de
            </p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>

            <p>
              Jenny Weinreich<br />
              Stettiner STraße 41<br />
              35410 Hungen<br />
              Deutschland
            </p>

            <h2>Haftung für Inhalte</h2>

            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>

            <h2>Haftung für Links</h2>

            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>

            <h2>Urheberrecht</h2>

            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              Beiträge Dritter sind als solche gekennzeichnet.
            </p>

          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Impressum;