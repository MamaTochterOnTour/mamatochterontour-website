export default function ContactForm(){

  function handleSubmit(e){

    e.preventDefault();


    const form = e.target;


    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;


    const subject = `Kontaktanfrage von ${name}`;


    const body = 
`Name: ${name}

E-Mail: ${email}

Nachricht:

${message}`;


    window.location.href =
      `mailto:mamatochterontour@outlook.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  }


  return (

    <section className="contact-section">


      <div className="contact-container">


        <div className="contact-info">


          <h2>
            Kontakt aufnehmen
          </h2>


          <p>
            Wir melden uns schnellstmöglich
            bei dir zurück.
          </p>


          <p>
            E-Mail:
            <br />
            mamatochterontour@outlook.de
          </p>


        </div>



        <form 
          className="contact-form"
          onSubmit={handleSubmit}
        >


          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            required
          />



          <label>
            E-Mail
          </label>

          <input
            type="email"
            name="email"
            required
          />



          <label>
            Nachricht
          </label>


          <textarea
            name="message"
            rows="6"
            required
          />



          <button type="submit">
            Nachricht senden
          </button>


        </form>


      </div>


    </section>

  );

}