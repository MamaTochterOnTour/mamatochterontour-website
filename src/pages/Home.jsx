import "../App.css";

import foto1 from "../assets/foto1.jpg";
import foto2 from "../assets/foto2.jpg";
import foto3 from "../assets/foto3.jpg";
import foto4 from "../assets/foto4.jpg";

import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/BottomNavigationBar";

function Home() {
  return (
    <div>

      <Navbar />

      {/* 🔥 HERO (wie Shop & Kontakt) */}
      <section className="shop-hero">
        <div className="container">

          <h1 className="brand-title">
  Mama & Tochter unterwegs in der Welt ✈️
</h1>

<div className="highlights">
  <div>👩‍👧 Mama & Tochter Duo</div>
  <div>✈️ Reisen</div>
  <div>🌴 Mallorca Lifestyle</div>
  <div>📱 Apps</div>
  <div>✨ Echte Momente</div>
</div>

        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about">
        <div className="container">

       <p className="about-text">
  Wir sind Jenny & Katharina – ein Mama-Tochter-Duo mit Fernweh ✈️

  <br /><br />

  Wir kommen aus Köln und sind aktuell auf Mallorca unterwegs – irgendwo zwischen Alltag, Reisen und dem Gefühl, dass Zuhause weniger ein Ort als ein Lebensgefühl ist.

  <br /><br />

  Für uns bedeutet Reisen Freiheit: neue Orte entdecken, gutes Essen genießen und besondere Momente sammeln – egal ob auf Kreuzfahrten, Fernreisen, Wochenendtrips oder kleinen Auszeiten am Meer.

  <br /><br />

  Mit <strong>MamaTochterOnTour</strong> entwickeln wir Apps, erstellen Reiseguides und teilen unsere Abenteuer mit euch – um das Reisen einfacher, schöner und inspirierender zu machen.

</p>



          {/* IMAGE GRID */}
          <div className="image-grid">
            <img src={foto1} alt="Reise 1" />
            <img src={foto2} alt="Reise 2" />
            <img src={foto3} alt="Reise 3" />
            <img src={foto4} alt="Reise 4" />
          </div>

          {/* SOCIAL */}
          <div className="social-section">

  <section className="cta">
    <h2>Begleitet uns auf unseren Reisen 🌍</h2>
    <p>Folgt uns auf Social Media für tägliche Updates.</p>
  </section>

  <div className="social-icons">

    <a
      href="https://www.tiktok.com/@mamatochterontour"
      target="_blank"
      rel="noreferrer"
    >
      <FaTiktok />
    </a>

    <a
      href="https://www.instagram.com/mamatochterontour"
      target="_blank"
      rel="noreferrer"
    >
      <FaInstagram />
    </a>

    <a
      href="https://youtube.com/@mamatochterontour"
      target="_blank"
      rel="noreferrer"
    >
      <FaYoutube />
    </a>

  </div>

</div>

        </div>
      </section>

      <Footer />

    </div>
  );
}

export default Home;