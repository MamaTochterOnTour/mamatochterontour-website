export default function AppFeatures() {


  const features = [

    {
      title:"Entdecken",
      text:"Lass dich von Reisebeiträgen inspirieren, speichere Ideen und entdecke neue Orte."
    },


    {
      title:"Planen",
      text:"Plane deine Reisen mit Packlisten, Countdown, Budget, Notizen und Aufgaben."
    },


    {
      title:"Verbinden",
      text:"Tausche dich aus, finde Mitreisende und werde Teil unserer Reise-Community."
    },


    {
      title:"Erinnern",
      text:"Halte deine Reisen mit Fotos, Videos und digitalen Reisetagebüchern fest."
    }

  ];


  return (

    <section className="app-features">


      <div className="app-feature-grid">


        {features.map((feature)=>(

          <div className="app-feature-card" key={feature.title}>


            <h3>
              {feature.title}
            </h3>


            <p>
              {feature.text}
            </p>


          </div>

        ))}


      </div>


    </section>

  );

}