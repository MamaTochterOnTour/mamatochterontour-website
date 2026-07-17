export default function ContactForm(){

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
            hallo@mamatochterontour.de
          </p>


        </div>



        <form className="contact-form">


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