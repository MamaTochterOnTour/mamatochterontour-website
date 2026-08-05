import { Link } from "react-router-dom";
import "./Footer.css";

import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";

import { FiCreditCard } from "react-icons/fi";

import applePayLogo from "../../../assets/payment-methods/apple-pay.svg";
import paypalLogo from "../../../assets/payment-methods/paypal.png";

import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import { FaPodcast } from "react-icons/fa";

import logo from "../../../assets/images/logo/mamatochterontour-logo.png";

import ComingSoonModal from
  "../comingsoon/ComingSoonModal";

const currentYear = new Date().getFullYear();

function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

    const [
  footerComingSoonType,
  setFooterComingSoonType,
] = useState(null);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    const email = newsletterEmail.trim();

    if (!email) {
      setNewsletterStatus("error");
      setNewsletterMessage("Bitte gib deine E-Mail-Adresse ein.");
      return;
    }

    setNewsletterStatus("loading");
    setNewsletterMessage("");

    try {
      const subscribeToNewsletter = httpsCallable(
        functions,
        "subscribeToNewsletter"
      );

      const result = await subscribeToNewsletter({ email });

      setNewsletterStatus("success");
      setNewsletterMessage(
        result.data?.message ||
          "Bitte bestätige deine Anmeldung über die E-Mail, die wir dir geschickt haben."
      );

      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter-Anmeldung fehlgeschlagen:", error);

      setNewsletterStatus("error");

      if (
  error.code === "functions/invalid-argument" ||
  error.code === "invalid-argument"
) {
        setNewsletterMessage(
          error.message || "Bitte überprüfe deine E-Mail-Adresse."
        );
      } else {
        setNewsletterMessage(
          "Die Anmeldung hat leider nicht funktioniert. Bitte versuche es später erneut."
        );
      }
    }
  };



  return (
  <>
    <footer className="footer">
      <div className="footer__decoration" aria-hidden="true">
        <span className="footer__glow footer__glow--green" />
        <span className="footer__glow footer__glow--soft" />
      </div>

      <div className="footer__container">
        <div className="footer__top">
          {/* Marke und Beschreibung */}
          <div className="footer__brand">

            <div className="footer__newsletter">

  <h3>Newsletter</h3>

  <p>
    Verpasse keine neuen Reiseguides, App-Updates und exklusiven Angebote mehr.
  </p>

  <form
  className="footer__newsletter-form"
  onSubmit={handleNewsletterSubmit}
>
  <label
    htmlFor="footer-newsletter-email"
    className="footer__newsletter-label"
  >
    E-Mail-Adresse
  </label>

  <input
    id="footer-newsletter-email"
    type="email"
    name="email"
    placeholder="E-Mail-Adresse"
    autoComplete="email"
    value={newsletterEmail}
    onChange={(event) => setNewsletterEmail(event.target.value)}
    disabled={newsletterStatus === "loading"}
    required
  />

  <button
    type="submit"
    disabled={newsletterStatus === "loading"}
  >
    {newsletterStatus === "loading"
      ? "Wird angemeldet …"
      : "Anmelden"}
  </button>
</form>

{newsletterMessage && (
  <p
    className={`footer__newsletter-message footer__newsletter-message--${newsletterStatus}`}
    role={newsletterStatus === "error" ? "alert" : "status"}
  >
    {newsletterMessage}
  </p>
)}

</div>

<div className="footer__social-section">
  <span className="footer__column-title">
    Community
  </span>

  <p className="footer__social-text">
    Wir freuen uns, wenn du Teil unserer Community wirst.
  </p>

  <div className="footer__socials">
    <a
      href="https://www.instagram.com/mamatochterontour?igsh=MXkybTVuNnBuNHowaQ%3D%3D&utm_source=qr"
      target="_blank"
      rel="noreferrer"
      aria-label="MamaTochterOnTour auf Instagram öffnen"
    >
      <FaInstagram />
    </a>

    <a
      href="https://www.tiktok.com/@mamatochterontour?_r=1&_t=ZG-98Rr39tktft"
      target="_blank"
      rel="noreferrer"
      aria-label="MamaTochterOnTour auf TikTok öffnen"
    >
      <FaTiktok />
    </a>

    <a
      href="https://youtube.com/@mamatochterontour?si=t6AL4tiShahn9FIH"
      target="_blank"
      rel="noreferrer"
      aria-label="MamaTochterOnTour auf YouTube öffnen"
    >
      <FaYoutube />
    </a>

    <a
      href="https://podimo.com/s/nINWncrW"
      target="_blank"
      rel="noreferrer"
      aria-label="Podcast auf Podimo öffnen"
    >
      <FaPodcast />
    </a>
  </div>
</div>
          </div>

          {/* Navigation */}
          <nav
            className="footer__navigation"
            aria-label="Navigation im Footer"
          >
            {/* Website */}
<div className="footer__column">
  <span className="footer__column-title">
    Website
  </span>

  <Link to="/">Startseite</Link>
  <Link to="/kooperationen">Kooperationen</Link>
  <Link to="/kontakt">Kontakt</Link>
</div>

           {/* Online-Shop */}
<div className="footer__column">
  <span className="footer__column-title">
    Online-Shop
  </span>

  <button
    type="button"
    className="footer__coming-soon-link"
    onClick={() =>
      setFooterComingSoonType("shop")
    }
  >
    Shop-Startseite
  </button>

  <button
    type="button"
    className="footer__coming-soon-link"
    onClick={() =>
      setFooterComingSoonType("shop")
    }
  >
    Reiseguides
  </button>
</div>

            {/* Momentry */}
<div className="footer__column">
  <span className="footer__column-title">
    Momentry
  </span>

  <Link to="/momentry">
    Momentry entdecken
  </Link>

  <button
    type="button"
    className="footer__coming-soon-link"
    onClick={() =>
      setFooterComingSoonType("webapp")
    }
  >
    Web-App öffnen
  </button>

  <a
    href="https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898"
    target="_blank"
    rel="noreferrer"
  >
    App Store
  </a>

  <a
    href="https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch"
    target="_blank"
    rel="noreferrer"
  >
    Google Play
  </a>
</div>

            {/* Rechtliches */}
            <div className="footer__column">
              <span className="footer__column-title">
                Rechtliches
              </span>

              <Link to="/impressum">Impressum</Link>
              <Link to="/datenschutz">Datenschutz</Link>

                <Link to="/" className="footer__logo">
  <img
    src={logo}
    alt="MamaTochterOnTour"
    className="footer__logo-image"
  />
</Link>

            </div>
          </nav>
        </div>

        <section className="footer__payments">

  <span className="footer__column-title">
    Sicher bezahlen
  </span>

  <div className="footer__payments-row">

    <span className="footer__payments-text">
      Im Onlineshop akzeptieren wir
    </span>

    <div className="footer__payment-methods">

      <div className="footer__payment-icon">
        <FiCreditCard />
        <span>Karte</span>
      </div>

      <img
        src={applePayLogo}
        alt="Apple Pay"
      />

      <img
        src={paypalLogo}
        alt="PayPal"
      />

    </div>

  </div>

</section>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p>
            © {currentYear} MamaTochterOnTour. Alle Rechte vorbehalten.
          </p>

          <a
            href="#top"
            className="footer__back-top"
            aria-label="Zurück zum Anfang der Seite"
          >
            Nach oben
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
        </footer>

    <ComingSoonModal
      open={
        footerComingSoonType !== null
      }
      type={
        footerComingSoonType ||
        "shop"
      }
      onClose={() =>
        setFooterComingSoonType(null)
      }
    />
  </>
);
}

export default Footer;