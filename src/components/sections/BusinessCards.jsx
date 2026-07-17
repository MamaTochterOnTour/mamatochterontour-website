export default function BusinessCards(){


const cards = [

{
title:"Destinationen",
text:"Wir unterstützen Regionen und Orte dabei, ihre Reiseangebote authentisch zu präsentieren."
},

{
title:"Unternehmen",
text:"Gemeinsame Projekte, Produktempfehlungen und kreative Kooperationen."
},

{
title:"Reisepartner",
text:"Zusammen schaffen wir besondere Erlebnisse für Reisende."
}

];


return (

<section className="business-cards">


<div className="business-card-grid">


{cards.map((card)=>(

<div 
className="business-card"
key={card.title}
>

<h3>
{card.title}
</h3>


<p>
{card.text}
</p>


</div>

))}


</div>


</section>

);

}