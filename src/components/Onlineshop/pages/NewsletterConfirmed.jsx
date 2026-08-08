import { Link } from "react-router-dom";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";

import "../styles/NewsletterConfirmed.css";

function NewsletterConfirmed() {
  return (
    <>
      <ShopNavbar />

      <main className="newsletter-confirmed">
        <div className="newsletter-confirmed__card">

          <div className="newsletter-confirmed__icon">
            ✓
          </div>

          <span className="newsletter-confirmed__eyebrow">
            Anmeldung erfolgreich
          </span>

          <h1>
            Willkommen bei MamaTochterOnTour!
          </h1>

          <p>
            Vielen Dank für deine Anmeldung zum Newsletter.
            Du bist jetzt offiziell Teil unserer Community.
          </p>

          <div className="newsletter-confirmed__benefits">

            <div>
              ✈️ Updates zu neuen Reiseguides
            </div>

            <div>
              🎁 Exklusive Rabatte & Aktionen
            </div>

            <div>
              📱 Infos rund um App-Updates
            </div>

          </div>

          <div className="newsletter-confirmed__mail">

            <p>
  Deinen persönlichen Willkommensgutschein
  für deine Onlineshop-Bestellung erhältst du
  in wenigen Minuten per E-Mail. Falls du
  sie nicht findest, schau bitte auch in
  deinem Spam- oder Junk-Ordner nach.
</p>

          </div>

          <Link
            to="/shop"
            className="newsletter-confirmed__button"
          >
            Zum Onlineshop
          </Link>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default NewsletterConfirmed;