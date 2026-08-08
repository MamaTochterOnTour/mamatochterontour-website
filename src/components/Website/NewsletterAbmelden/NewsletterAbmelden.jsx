import {
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  httpsCallable,
} from "firebase/functions";

import {
  FiCheck,
  FiLoader,
  FiMail,
  FiArrowLeft,
} from "react-icons/fi";

import {
  functions,
} from "../../../firebase";

import ShopNavbar from "../../Onlineshop/layout/ShopNavbar";
import Footer from "../layout/Footer";

import "./NewsletterAbmelden.css";

function NewsletterAbmelden() {
  const [searchParams] =
    useSearchParams();

  const email = useMemo(
    () =>
      String(
        searchParams.get("email") || ""
      )
        .trim()
        .toLowerCase(),
    [searchParams]
  );

  const [
    status,
    setStatus,
  ] = useState("idle");

  const [
    message,
    setMessage,
  ] = useState("");

  const emailIsValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  async function handleUnsubscribe() {
    if (!emailIsValid) {
      setStatus("error");

      setMessage(
        "Der Abmeldelink ist leider ungültig. Bitte öffne den Link erneut über deine Newsletter-E-Mail."
      );

      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const unsubscribeFromNewsletter =
        httpsCallable(
          functions,
          "unsubscribeFromNewsletter"
        );

      const result =
        await unsubscribeFromNewsletter({
          email,
        });

      setStatus("success");

      setMessage(
        result.data?.message ||
          "Du wurdest erfolgreich vom Newsletter abgemeldet."
      );
    } catch (error) {
      console.error(
        "Newsletter-Abmeldung fehlgeschlagen:",
        error
      );

      setStatus("error");

      setMessage(
        error?.message ||
          "Die Abmeldung konnte gerade nicht durchgeführt werden. Bitte versuche es später erneut."
      );
    }
  }

  return (
    <>
      <ShopNavbar />

      <main className="newsletter-unsubscribe-page">
        <div className="newsletter-unsubscribe-decoration">
          <span className="newsletter-unsubscribe-glow newsletter-unsubscribe-glow--one" />
          <span className="newsletter-unsubscribe-glow newsletter-unsubscribe-glow--two" />
        </div>

        <section className="newsletter-unsubscribe-card">
          {status === "success" ? (
            <>
              <span className="newsletter-unsubscribe-icon newsletter-unsubscribe-icon--success">
                <FiCheck
                  aria-hidden="true"
                />
              </span>

              <p className="newsletter-unsubscribe-eyebrow">
                Newsletter
              </p>

              <h1>
                Du bist abgemeldet
              </h1>

              <p className="newsletter-unsubscribe-intro">
                Schade, dass du gehst. Du
                erhältst ab jetzt keine
                Newsletter von
                MamaTochterOnTour mehr.
              </p>

              {message && (
                <div className="newsletter-unsubscribe-message newsletter-unsubscribe-message--success">
                  {message}
                </div>
              )}

              <p className="newsletter-unsubscribe-small">
                Falls du es dir irgendwann
                anders überlegst, kannst du
                dich jederzeit wieder über
                unsere Website anmelden.
              </p>

              <Link
                to="/"
                className="newsletter-unsubscribe-home"
              >
                <FiArrowLeft
                  aria-hidden="true"
                />

                Zurück zur Website
              </Link>
            </>
          ) : (
            <>
              <span className="newsletter-unsubscribe-icon">
                <FiMail
                  aria-hidden="true"
                />
              </span>

              <p className="newsletter-unsubscribe-eyebrow">
                Newsletter
              </p>

              <h1>
                Newsletter abbestellen
              </h1>

              <p className="newsletter-unsubscribe-intro">
                Du möchtest keine weiteren
                Reiseinspirationen,
                Neuigkeiten und Angebote von
                MamaTochterOnTour erhalten?
              </p>

              {emailIsValid ? (
                <div className="newsletter-unsubscribe-email">
                  <span>
                    Abmeldung für
                  </span>

                  <strong>
                    {email}
                  </strong>
                </div>
              ) : (
                <div className="newsletter-unsubscribe-message newsletter-unsubscribe-message--error">
                  Dieser Abmeldelink enthält
                  keine gültige E-Mail-Adresse.
                </div>
              )}

              <p className="newsletter-unsubscribe-note">
                Wenn du auf „Newsletter
                abbestellen“ klickst, wirst du
                aus unserem Newsletter-Verteiler
                entfernt.
              </p>

              <button
                type="button"
                className="newsletter-unsubscribe-button"
                onClick={
                  handleUnsubscribe
                }
                disabled={
                  status === "loading" ||
                  !emailIsValid
                }
              >
                {status === "loading" ? (
                  <>
                    <FiLoader
                      className="newsletter-unsubscribe-spinner"
                      aria-hidden="true"
                    />

                    Wird abgemeldet …
                  </>
                ) : (
                  "Newsletter abbestellen"
                )}
              </button>

              {status === "error" &&
                message && (
                  <div className="newsletter-unsubscribe-message newsletter-unsubscribe-message--error">
                    {message}
                  </div>
                )}

              <Link
                to="/"
                className="newsletter-unsubscribe-cancel"
              >
                Doch angemeldet bleiben
              </Link>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default NewsletterAbmelden;