import "../App.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/BottomNavigationBar";
import useSEO from "../utils/seo";

function Contact() {

  useSEO({
    title: "Kontakt – MamaTochterOnTour",
    description: "Kontaktiere MamaTochterOnTour für Kooperationen, Fragen oder Reiseanfragen. Wir freuen uns auf deine Nachricht."
  });
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.name || !formData.message) {
      setError("Bitte alle Felder ausfüllen (*) sind Pflichtfelder.");
      return;
    }

    const mailtoLink = `mailto:mamatochterontour@outlook.de?subject=Kontakt von ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0ANachricht:%0D%0A${formData.message}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>

      <Navbar />

      {/* HERO */}
      <section className="shop-hero">
        <div className="container">

          <h1 className="brand-title">
            Kontakt aufnehmen
          </h1>

          <p className="about-text">
            Schreib uns – wir freuen uns auf deine Nachricht 💌
          </p>

        </div>
      </section>

      {/* FORM SECTION */}
      <section className="about">
  <div className="container">

    {/* ERROR */}
    {error && (
      <div className="feature-big-card" style={{ borderLeft: "4px solid #ff4d4d" }}>
        <p>{error}</p>
      </div>
    )}

    {/* FORM CARD */}
    <div className="feature-big-card">

      <form className="contact-form" onSubmit={handleSubmit}>

        {/* EMAIL */}
        <div className="form-group">
          <label>
            E-Mail <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Deine E-Mail-Adresse"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* NAME */}
        <div className="form-group">
          <label>
            Name <span>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Dein Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* MESSAGE */}
        <div className="form-group">
          <label>
            Nachricht <span>*</span>
          </label>
          <textarea
            name="message"
            placeholder="Deine Nachricht"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {/* DISCLAIMER */}
        <p className="app-note">
          * Alle Felder müssen ausgefüllt werden
        </p>

        {/* BUTTON */}
        <button type="submit" className="shop-cta-button">
          Senden
        </button>

      </form>

    </div>

  </div>
</section>

      <Footer />

    </div>
  );
}

export default Contact;