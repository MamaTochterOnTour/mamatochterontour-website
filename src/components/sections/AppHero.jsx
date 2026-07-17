import appIcon from "../../assets/images/app/app-icon.png";


export default function AppHero() {

  return (

    <section className="app-hero">


      <div className="app-hero-container">


        <div className="app-hero-text">


          <p className="app-label">
            Unsere Reise-App
          </p>


          <h1>
            Deine Reisen.
            <br />
            Deine Erinnerungen.
            <br />
            Deine Community.
          </h1>


          <p className="app-description">
            Entdecke Reiseinspiration,
            plane deine Abenteuer und halte
            deine schönsten Momente digital fest.
          </p>


          <div className="app-buttons">


            <a
              href="/app"
              className="app-button"
            >
              Web-App öffnen
            </a>


          </div>


        </div>



        <div className="app-hero-image">


          <img
            src={appIcon}
            alt="Momentry App"
          />


        </div>


      </div>


    </section>

  );

}