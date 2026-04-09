import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/BottomNavigationBar";
import { Link } from "react-router-dom";
import useSEO from "../utils/seo";

function Kooperationen() {

  useSEO({
    title: "Kooperationen & Events – MamaTochterOnTour",
    description: "Kooperationen, Eventanfragen und Partnerschaften im Reise- und Lifestyle-Bereich mit MamaTochterOnTour."
  });
  return (
    <div>

      <Navbar />

      {/* HERO */}
      <section className="shop-hero">
        <div className="container">

          <h1 className="brand-title">
            Kooperationen & Events
          </h1>

        </div>
      </section>

      {/* INTRO */}
      <section className="about">
        <div className="container">

          <p className="about-text">
            Wir freuen uns über Kooperationen, Eventanfragen und kreative Projekte im Bereich Reisen und Lifestyle.

            <br /><br />

            Unser Ziel ist es, authentisch zu bleiben und gemeinsam Inhalte zu schaffen, die inspirieren, Mehrwert bieten und besondere Momente erlebbar machen.
          </p>

        </div>
      </section>

      {/* MEDIA KIT */}
      <section className="about">
        <div className="container">

          <div className="feature-big-card">

            <h3 className="center-text">Media Kit</h3>

<p className="center-text">
  Alle wichtigen Informationen über unsere Reichweite, Zielgruppe und
  Kooperationsmöglichkeiten findest du in unserem Media Kit.
</p>

            <a
              href="/media-kit.pdf"
              download
              className="shop-cta-button"
            >
              Media Kit herunterladen
            </a>

          </div>

        </div>
      </section>

      {/* KOOPERATIONEN */}
      <section className="about">
        <div className="container">

          <h2 className="app-hero-title" style={{ fontSize: "1.6rem", marginBottom: "20px" }}>
            Möglichkeiten der Zusammenarbeit
          </h2>

          <div className="features-3col">

            {/* BOX 1 */}
            <div className="feature-big-card">

              <h3>🤝 Kooperationen & Events</h3>

              <p>
                Wir setzen gemeinsame Kampagnen um, produzieren Social Media Content
                und realisieren authentische Markenauftritte im Reise- und Lifestyle-Bereich.
                Ebenso freuen wir uns über Eventeinladungen, die wir kreativ und nahbar begleiten.
              </p>

            </div>

            {/* BOX 2 */}
            <div className="feature-big-card">

              <h3>📱 App & Partnerintegration</h3>

              <p>
                Wir suchen Partner aus der Reisebranche, die in unsere Reise-App
                „Momentry by MamaTochterOnTour“ integriert werden möchten. 
                Dazu zählen zum Beispiel Ausfluganbieter, Autovermietungen, Reiseveranstalter und weitere passende Marken aus dem Reiseumfeld.
              </p>

            </div>

            {/* BOX 3 */}
            <div className="feature-big-card">

              <h3>📍 Reisebegleitung</h3>

              <p>
                Wir freuen uns über Film- oder Fernsehteams, die uns auf unseren eigenen Reisen begleiten
                und unsere Erlebnisse authentisch, nahbar und hochwertig dokumentieren möchten.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* WHY US */}
      <section className="about">
        <div className="container">

          <h2 className="app-hero-title" style={{ fontSize: "1.6rem", marginBottom: "20px" }}>
            Warum mit uns arbeiten?
          </h2>

          <p className="about-text">
            Wir erreichen eine reisefreudige Community aus Menschen, die echte Erlebnisse, Inspiration und praktische Reisetipps suchen.

            <br /><br />

            Unsere Inhalte entstehen unterwegs – ehrlich, nahbar und visuell hochwertig. Dadurch entsteht Vertrauen und eine starke Bindung zu unserer Community.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="about">
        <div className="container">

          <div className="cta-card">

            <p className="app-hero-title" style={{ fontSize: "1.3rem" }}>
              Interesse an einer Zusammenarbeit oder einem Event?
            </p>

            <Link to="/kontakt" className="shop-cta-button">
  Kontakt aufnehmen
</Link>

          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}

export default Kooperationen;