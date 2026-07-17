import logo from "../../assets/images/logo.png";


export default function ShopHero(){

  return (

    <section className="shop-hero">


      <div className="shop-hero-container">


        <div className="shop-hero-text">


          <p className="shop-label">
            Unsere Reiseguides
          </p>


          <h1>
            Deine Reise.
            <br />
            Perfekt vorbereitet.
          </h1>


          <p className="shop-description">

            Entdecke unsere digitalen Reiseguides
            mit persönlichen Empfehlungen,
            Highlights und hilfreichen Tipps für
            deine nächste Reise.

          </p>


          <a
            href="#"
            className="shop-button"
          >
            Zum Online-Shop
          </a>


        </div>



        <div className="shop-hero-image">


          <img
            src={logo}
            alt="MamaTochterOnTour"
          />


        </div>


      </div>


    </section>

  );

}