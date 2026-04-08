import "../App.css";
import Navbar from "../components/Navbar";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Footer from "../components/BottomNavigationBar";
import { useState } from "react";

function AppPage() {

  const [activeIndex, setActiveIndex] = useState(0);

const images = [
  "/screens/App1.png",
  "/screens/App2.png",
  "/screens/App3.png",
  "/screens/App4.png",
  "/screens/App5.png",
  "/screens/App6.png",
];
  return (
    <div>

      <Navbar />

      {/* 🔥 HERO (GLEICH WIE HOME) */}
      <section className="shop-hero">
        <div className="container">

          <h1 className="brand-title">
            Momentry – deine Reise, deine Momente
          </h1>

          <div className="highlights">
            <div>📱 Reise-App</div>
            <div>🧳 Reisen planen</div>
            <div>📖 Tagebuch schreiben</div>
            <div>🌍 Inspiration</div>
          </div>

        </div>
      </section>

      {/* DOWNLOAD + FEATURES */}
<section className="about">
  <div className="container">

    {/* TEXT */}
    <p className="about-text">
      Die App für alle, die ihre Reisen nicht nur erleben,
      sondern festhalten, teilen und planen wollen.
    </p>

    {/* BUTTONS */}
    <div className="store-buttons hero-store-buttons">

      <a
        href="https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898"
        target="_blank"
        rel="noreferrer"
        className="store-btn apple"
      >
        <FaApple />
        <span>App Store</span>
      </a>

      <a
        href="https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch"
        target="_blank"
        rel="noreferrer"
        className="store-btn google"
      >
        <FaGooglePlay />
        <span>Google Play</span>
      </a>

    </div>

    {/* FEATURES */}
    <div className="features-3col">

      <div className="feature-big-card">
        <h3>🌍 Erleben & Teilen</h3>
        <p>
          Teile deine Reisen, entdecke neue Orte und vernetze dich mit anderen Reisenden.
        </p>
      </div>

      <div className="feature-big-card">
        <h3>🧳 Planen & Organisieren</h3>
        <p>
          Packlisten, Budgetplaner, Notizen und dein persönliches Reisetagebuch.
        </p>
      </div>

      <div className="feature-big-card">
        <h3>✈️ Inspiration & Inhalte</h3>
        <p>
          Reiseguides, echte Erfahrungen und neue Ideen für deine nächsten Trips.
        </p>
      </div>

    </div>

  </div>
</section>

<div className="app-carousel">

  <div
    className="carousel-track"
    style={{
      transform: `translateX(-${activeIndex * 100}%)`,
    }}
  >
    {images.map((img, i) => (
      <img key={i} src={img} alt={`Preview ${i + 1}`} />
    ))}
  </div>

  {/* DOTS */}
  <div className="carousel-dots">
    {images.map((_, i) => (
      <div
        key={i}
        className={`dot ${i === activeIndex ? "active" : ""}`}
        onClick={() => setActiveIndex(i)}
      />
    ))}
  </div>

</div>

      {/* NOTE */}
      <p className="app-note">
        Du kannst Momentry kostenlos nutzen. Für zusätzliche Funktionen gibt es optionale Premium-Features.
      </p>

      <Footer />

    </div>
  );
}

export default AppPage;