export default function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">


        <div className="footer-brand">

          <h3>
            MamaTochterOnTour
          </h3>

          <p>
            Echte Reisen, besondere Momente
            und unsere eigene Reise-App.
            <br /><br />
            Wir teilen unsere Abenteuer und
            inspirieren andere, die Welt zu entdecken.
          </p>

        </div>



        <div className="footer-column">

          <h4>
            Entdecken
          </h4>

          <a href="/">
            Startseite
          </a>

          <a href="/reiseapp">
            Unsere App
          </a>

          <a href="/shop">
            Reiseguides
          </a>

          <a href="/ueber-uns">
            Über uns
          </a>

        </div>



        <div className="footer-column">

          <h4>
            Zusammenarbeit
          </h4>

          <a href="/business">
            Kooperationen
          </a>

          <a href="/kontakt">
            Kontakt
          </a>

          <a href="#">
            Events
          </a>

          <a href="#">
            Film & TV
          </a>

        </div>



        <div className="footer-column">

          <h4>
            Social Media
          </h4>

          <a href="#">
            Instagram
          </a>

          <a href="#">
            TikTok
          </a>

          <a href="#">
            YouTube
          </a>

        </div>


      </div>


      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} MamaTochterOnTour
        </span>


        <div>

          <a href="/impressum">
            Impressum
          </a>

          <a href="/datenschutz">
            Datenschutz
          </a>

        </div>

      </div>


    </footer>
  );
}