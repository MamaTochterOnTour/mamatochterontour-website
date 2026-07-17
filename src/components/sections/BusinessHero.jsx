import heroImage from "../../assets/images/home/hero.jpg";

export default function BusinessHero(){

  return (

    <section className="business-hero">

      <div className="business-hero-container">

        <div className="business-hero-text">

          <p className="business-label">
            Kooperationen
          </p>

          <h1>
            Gemeinsam
            <br />
            Reisen erlebbar machen.
          </h1>

          <p className="business-description">

            Wir verbinden Reiseinspiration,
            authentische Erlebnisse und eine
            engagierte Community.

          </p>

          <a
            href="/kontakt"
            className="business-button"
          >
            Kontakt aufnehmen
          </a>

        </div>


        <div className="business-hero-image">

          <img
            src={heroImage}
            alt="MamaTochterOnTour"
          />

        </div>

      </div>

    </section>

  );

}