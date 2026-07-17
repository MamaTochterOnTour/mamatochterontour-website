import heroImage from "../../assets/images/home/hero.jpg";

export default function Hero() {

  return (
    <section className="hero">


      <div className="hero-container">


        <div className="hero-content">


          <h1>
            Reisen.
            <br />
            Erinnerungen.
            <br />
            Momente.
          </h1>


          <p>
            Wir sind MamaTochterOnTour und verbinden
            echte Reiseerlebnisse mit unserer eigenen
            Reise-App und digitalen Reiseguides.
          </p>


          <div className="hero-buttons">

            <a href="/reiseapp">
              Unsere App entdecken
            </a>


            <a href="/shop">
              Reiseguides ansehen
            </a>

          </div>


        </div>



        <div className="hero-image">

          <img 
  src={heroImage}
  alt="MamaTochterOnTour auf Reisen"
/>

        </div>


      </div>


    </section>
  );
}