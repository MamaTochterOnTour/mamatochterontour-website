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

        </div>



        <div className="footer-column">

  <h4>
    Social Media
  </h4>


  <a
    href="https://www.instagram.com/mamatochterontour"
    target="_blank"
    rel="noopener noreferrer"
  >
    Instagram
  </a>


  <a
    href="https://www.tiktok.com/@mamatochterontour"
    target="_blank"
    rel="noopener noreferrer"
  >
    TikTok
  </a>


  <a
    href="https://youtube.com/@mamatochterontour?si=j9jcrCVpttqMsJUf"
    target="_blank"
    rel="noopener noreferrer"
  >
    YouTube
  </a>


  <a
    href="https://open.spotify.com/show/291wzQv8KAKkD8t8c4y4UP?si=hoAoIn7FRBqTc0B1exnQeA&utm_source=copy-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    Podcast
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