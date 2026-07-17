export default function AboutValues(){


const values = [

{
title:"Authentische Reisen",
text:"Wir teilen echte Erfahrungen und persönliche Empfehlungen."
},

{
title:"Gemeinsame Erlebnisse",
text:"Reisen verbinden Menschen und schaffen Erinnerungen."
},

{
title:"Inspiration & Community",
text:"Wir möchten Reisende zusammenbringen und inspirieren."
}

];


return (

<section className="about-values">


<div className="about-values-grid">


{values.map((value)=>(

<div 
className="about-value-card"
key={value.title}
>


<h3>
{value.title}
</h3>


<p>
{value.text}
</p>


</div>


))}


</div>


</section>

);

}