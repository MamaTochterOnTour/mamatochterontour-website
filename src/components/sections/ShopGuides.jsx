export default function ShopGuides(){

  const guides = [

    {
      title:"Kreuzfahrt-Guides",
      text:"Komplette Reisebegleiter mit Häfen, Ausflügen und unseren Empfehlungen."
    },

    {
      title:"Orts-Guides",
      text:"Entdecke besondere Orte mit unseren Tipps und Highlights."
    },

    {
      title:"Digitale Reiseplanung",
      text:"Praktische Informationen, Inspiration und Vorbereitung an einem Ort."
    }

  ];


  return (

    <section className="shop-guides">


      <div className="shop-guide-grid">


        {guides.map((guide)=>(

          <div 
            className="shop-guide-card"
            key={guide.title}
          >

            <h3>
              {guide.title}
            </h3>


            <p>
              {guide.text}
            </p>


          </div>

        ))}


      </div>


    </section>

  );

}