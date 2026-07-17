export default function FeatureCards() {


  const cards = [

    {
      title:"Unsere Reise-App",
      text:"Alle Reiseerlebnisse an einem Ort. Erinnerungen festhalten, teilen und wieder erleben.",
      link:"/reiseapp"
    },


    {
      title:"Unsere Reiseguides",
      text:"Unsere persönlichen Tipps, Empfehlungen und Inspiration für eure nächsten Abenteuer.",
      link:"/shop"
    },


    {
      title:"Kooperationen",
      text:"Gemeinsam besondere Geschichten erzählen – für Marken, Events und kreative Projekte.",
      link:"/business"
    }

  ];



  return (

    <section className="feature-section">


      <div className="feature-container">


        {cards.map((card) => (

          <div className="feature-card" key={card.title}>


            <h3>
              {card.title}
            </h3>


            <p>
              {card.text}
            </p>


            <a href={card.link}>
              Mehr erfahren →
            </a>


          </div>

        ))}


      </div>


    </section>

  );

}