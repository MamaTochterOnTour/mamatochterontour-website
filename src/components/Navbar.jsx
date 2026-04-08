import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import "../App.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 👉 einheitliche Klasse für alle Links
  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container navbar-inner">

          {/* HAMBURGER */}
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>

          {/* LOGO */}
          <h2 className="logo">MamaTochterOnTour</h2>

          {/* DESKTOP MENU */}
          <div className="nav-links">
            <NavLink to="/" className={linkClass}>
              Start
            </NavLink>

            <NavLink to="/app" className={linkClass}>
              App
            </NavLink>

            <NavLink to="/shop" className={linkClass}>
              Shop
            </NavLink>

            <NavLink to="/kooperationen" className={linkClass}>
              Kooperationen
            </NavLink>

            <NavLink to="/faq" className={linkClass}>
              Q&A
            </NavLink>

            <NavLink to="/kontakt" className={linkClass}>
              Kontakt
            </NavLink>
          </div>

        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        {/* CLOSE BUTTON */}
        <div className="close" onClick={() => setMenuOpen(false)}>
          ✕
        </div>

        {/* MOBILE LINKS */}
        <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
          Start
        </NavLink>

        <NavLink to="/app" className={linkClass} onClick={() => setMenuOpen(false)}>
          Reise App
        </NavLink>

        <NavLink to="/shop" className={linkClass} onClick={() => setMenuOpen(false)}>
          Shop
        </NavLink>

        <NavLink to="/kooperationen" className={linkClass} onClick={() => setMenuOpen(false)}>
          Kooperationen & Events
        </NavLink>

        <NavLink to="/faq" className={linkClass} onClick={() => setMenuOpen(false)}>
          Q&A
        </NavLink>

        <NavLink to="/kontakt" className={linkClass} onClick={() => setMenuOpen(false)}>
          Kontakt
        </NavLink>

        {/* SOCIAL ICONS */}
        <div className="social-icons" style={{ marginTop: "20px" }}>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <FaTiktok />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;