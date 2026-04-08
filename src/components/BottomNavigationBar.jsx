import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-links">
          <Link to="/impressum" className="footer-link">Impressum</Link>
          <Link to="/datenschutz" className="footer-link">Datenschutz</Link>
        </div>

        <div className="footer-copy">
          © 2026 MamaTochterOnTour. Alle Rechte vorbehalten.
        </div>

      </div>
    </footer>
  );
}

export default Footer;