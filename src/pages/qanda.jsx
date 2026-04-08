import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/BottomNavigationBar";
import "../App.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Wer steckt hinter MamaTochterOnTour?",
      answer:
        "Wir sind ein Mama-Tochter-Duo aus Köln und lieben es, gemeinsam die Welt zu entdecken. Meine Mama hat mich mit 18 bekommen – heute sind wir 21 und 39 Jahre alt, also genau 18 Jahre auseinander. Mittlerweile begleitet uns das Reisen schon unser ganzes Leben. Wir haben viele Orte gesehen, doch unser Herz hängt besonders an Mallorca – deshalb sind wir auch aktuell auf Mallorca unterwegs zwischen Sonne, Meer und neuen Abenteuern."
    },
    {
      question: "Was macht euch besonders?",
      answer:
        "Besonders an uns ist, dass wir nichts inszenieren, sondern echte Momente zeigen. Wir reisen nicht perfekt geplant durch eine Hochglanzwelt, sondern so, wie es wirklich ist – spontan, emotional und manchmal auch chaotisch. Genau das macht uns ehrlich und nahbar."
    },
    {
      question: "Wie sehen eure Reisen aus?",
      answer:
        "Unsere Reisen sind sehr vielseitig und richten sich selten nach einem festen Schema. Wir lieben die Abwechslung – ob Kreuzfahrten, Rundreisen, Städtereisen oder auch kurze Auszeiten am Meer, wie zum Beispiel ein spontaner Trip nach Holland. Dabei waren wir bereits an vielen verschiedenen Orten unterwegs – unter anderem in Dubai, in der Karibik, in Norwegen, im Mittelmeerraum und auch in den USA. Jede Reiseart hat für uns ihren eigenen Reiz, aber am Ende geht es uns immer um das Gleiche: neue Eindrücke, besondere Momente und echte Erlebnisse, egal wohin es geht. Meistens sind wir sehr spontan unterwegs und planen nur selten lange im Voraus. Oft entscheiden wir erst wenige Tage vorher, wohin es geht und wann es losgeht. Das Einzige, was etwas mehr Vorlauf braucht, sind größere Reisen wie in die USA, vor allem wegen Visa und organisatorischen Dingen. Aber auch dort gilt: Die Reise ist nicht komplett durchgetaktet. Selbst in den USA steht das Erleben im Vordergrund, und wir entscheiden oft spontan von Tag zu Tag, was wir unternehmen."
    },
    {
      question: "Welche Inhalte erstellt ihr?",
      answer:
        "Wir erstellen vielfältigen Social-Media-Content rund um unsere Reisen und unseren Alltag unterwegs. Dazu gehören vor allem TikTok-Vlogs, Instagram-Storys, in denen wir unsere Community direkt mitnehmen, sowie Reiseeinblicke, persönliche Eindrücke von unterwegs und authentische Empfehlungen zu Orten, Hotels, Aktivitäten und Erlebnissen. Ab und zu produzieren wir auch YouTube-Videos, in denen wir unsere Reisen etwas ausführlicher dokumentieren und mehr Einblicke hinter die Kulissen geben. Zusätzlich haben wir einen Podcast namens 'Abgelegt & Abgehoben – Reisen mit Mama und Katha', in dem wir über unsere Reisen, spontane Erlebnisse und persönliche Gedanken rund ums Unterwegssein sprechen. Unser Fokus liegt immer darauf, echte Momente zu zeigen und unsere Erfahrungen so zu teilen, dass sie inspirieren und anderen bei der eigenen Reiseplanung helfen können."
    },
    {
      question: "Was ist eure Mission hinter eurem Content, eurer App und eurem Onlineshop?",
      answer:
        "Unsere Mission ist es, Menschen zu inspirieren, selbst die Welt zu entdecken und besondere Momente bewusster zu erleben. Wir möchten zeigen, dass Reisen nicht perfekt oder durchgeplant sein muss, sondern vor allem echt und emotional ist. Mit unserem Content, unserer App und unserem Onlineshop schaffen wir eine Verbindung aus Inspiration, persönlichen Erfahrungen und praktischen Tools, die das Reisen einfacher und greifbarer machen. Dabei steht für uns immer im Mittelpunkt, eine ehrliche und nahbare Community aufzubauen, die nicht nur zuschaut, sondern selbst Lust bekommt, loszuziehen und eigene Erinnerungen zu schaffen."
    },
    {
      question: "Was ist „Momentry by MamaTochterOnTour“?",
      answer: "Momentry by MamaTochterOnTour ist unsere eigene Reise-App, die wir selbst entwickelt und programmiert haben. Sie ist als persönlicher Reisebegleiter für unterwegs gedacht und vereint Inspiration, Planung und echte Reiseerfahrungen an einem Ort. Die App ist wie eine Mischung aus Reise-Inspiration und digitalem Reisetagebuch – mit dem Ziel, Reisen einfacher, strukturierter und gleichzeitig inspirierender zu machen. Zu den Funktionen gehören unter anderem Reiseideen und Empfehlungen, persönliche Notizen und Reiseplanung sowie Inhalte aus unseren eigenen Erlebnissen. So entsteht eine Kombination aus echten Erfahrungen und praktischen Tools für unterwegs. Die App ist sowohl für iOS als auch für Android verfügbar. Unser Fokus liegt darauf, eine App geschaffen zu haben, die nicht nur informiert, sondern Lust macht, selbst zu reisen und eigene Momente festzuhalten."
    },
    {
      question: "Wer kann Partner in eurer App werden?",
      answer:
        "Partner in unserer App können grundsätzlich Unternehmen aus der Reise- und Lifestyle-Branche werden, die zu unseren Inhalten und unserer Community passen. Dazu gehören zum Beispiel Ausfluganbieter, Hotels und Unterkünfte, Autovermietungen, Reiseveranstalter oder auch andere touristische Services und Marken, die Reisen für unsere Nutzer noch erlebbarer machen. Wichtig ist uns dabei vor allem, dass die Zusammenarbeit authentisch ist und einen echten Mehrwert für unsere Community bietet."
    },
    {
      question: "Was verkauft ihr in eurem Onlineshop?",
      answer:
        "In unserem Onlineshop verkaufen wir digitale Reiseguides mit persönlichen Empfehlungen zu verschiedenen Reisezielen. Diese enthalten von uns selbst gesammelte Erfahrungen, Tipps zu besonderen Orten, Kulinarik-Empfehlungen sowie echte Insider-Tipps abseits der klassischen Touristenrouten. Unser Ziel ist es, Reiseinspiration und praktischen Mehrwert zu verbinden, damit jeder seine Reisen einfacher planen und gleichzeitig besondere Orte entdecken kann."
    },
    {
  question: "Wie kann ich euch kontaktieren?",
  answer: (
    <>
      Du kannst uns jederzeit über unser Kontaktformular auf der Website erreichen oder uns direkt per E-Mail schreiben. Unsere E-Mail-Adresse lautet:{' '}
      <a href="mailto:mamatochterontour@outlook.de" className="faq-mail">
        mamatochterontour@outlook.de
      </a>
      . Alternativ kannst du uns auch über unsere Social-Media-Kanäle auf Instagram oder TikTok kontaktieren – dort sind wir ebenfalls aktiv und antworten in der Regel schnell.
    </>
  )
}
  ];

  return (
    <div>

      <Navbar />

      {/* HERO */}
      <section className="shop-hero">
        <div className="container">

          <h1 className="brand-title">
            Fragen & Antworten
          </h1>

        </div>
      </section>

      {/* FAQ */}
      <section className="about">
  <div className="container">

    <div className="faq-cards">

      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-card ${openIndex === index ? "open" : ""}`}
        >

          {/* QUESTION BUTTON */}
          <button
            className="faq-card-question"
            onClick={() => toggle(index)}
          >
            <span>{faq.question}</span>

            <span className="faq-icon">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {/* ANSWER */}
          <div className="faq-card-answer">
            <p>{faq.answer}</p>
          </div>

        </div>
      ))}

    </div>

  </div>
</section>

      <Footer />

    </div>
  );
}

export default FAQ;