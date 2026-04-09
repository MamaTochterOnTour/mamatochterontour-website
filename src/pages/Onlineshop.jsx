import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/BottomNavigationBar";
import { Link } from "react-router-dom";
import useSEO from "../utils/seo";

function Shop() {

  useSEO({
    title: "Reiseguides & Shop – MamaTochterOnTour",
    description: "Entdecke digitale Reiseguides, echte Reiseerfahrungen und Inspiration im MamaTochterOnTour Shop."
  });
  const shopUrl = "https://mamatochterontour.com";

  return (
    <div>

      <Navbar />

      {/* HERO */}
      <section className="shop-hero">
        <div className="container">

          <h1 className="brand-title">
            Unser Onlineshop
          </h1>

          <div className="highlights">
            <div>🛍️ Shop</div>
            <div>✈️ Reiseguides</div>
            <div>📍 Erfahrungen</div>
            <div>✨ Inspiration</div>
          </div>

          <a
            href={shopUrl}
            target="_blank"
            rel="noreferrer"
            className="shop-cta-button"
          >
            Zum Onlineshop
          </a>

        </div>
      </section>

      {/* CONTENT */}
      <section className="about">
        <div className="container">

          <p className="about-text">
            Reiseguides, echte Erfahrungen & Inspiration für deine Abenteuer
          </p>

          {/* CONTENT BLOCK (modern vertical layout) */}

<div className="shop-story">

  {/* MAIN STORY CARD */}
  <div className="feature-big-card shop-story-main">

    <h3>Unsere Reiseguides</h3>

    <p>
      In unserem Shop findest du digitale Reiseguides, die ausschließlich auf unseren eigenen
      Erlebnissen und Erfahrungen basieren. Jede Route, jeder Tipp und jede Empfehlung
      wurde von uns selbst getestet und mit viel Liebe zum Detail erstellt.
    </p>

    <p>
      Aktuell sind unsere Guides auf Deutsch verfügbar. Bald folgen englische Versionen.
      Unser Shop wächst ständig weiter mit neuen Guides, Tools und Produkten.
    </p>

  </div>

  {/* SECOND BLOCK (lighter / community feel) */}
  <div className="feature-big-card shop-story-secondary">

    <h3>Du reist gerne oder hast Ideen für uns?</h3>

    <p>
      Dann teil deine Reiseerlebnisse, Wünsche oder Inspirationen gerne mit uns.
      Wir lieben den Austausch mit unserer Community und freuen uns über jede Nachricht.
    </p>

    <p>
      Vielleicht wird genau dein Tipp Teil eines unserer nächsten Guides.
    </p>

    <Link to="/kontakt" className="store-btn google">
  Kontakt aufnehmen
</Link>

  </div>

</div>

        </div>
      </section>

      <Footer />

    </div>
  );
}

export default Shop;