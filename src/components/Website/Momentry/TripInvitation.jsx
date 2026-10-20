
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppCheckToken } from "../../../firebase";
import Footer from "../layout/Footer";
import "./TripInvitation.css";

const APP_STORE =
  "https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898";

const GOOGLE_PLAY =
  "https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch";

function TripInvitation() {
  const { token } = useParams();

  const [tripName, setTripName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const validToken = /^[a-f0-9]{64}$/.test(token || "");

  useEffect(() => {
    if (!validToken) {
      setError("Dieser Einladungslink ist ungültig.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError("");
    setTripName("");

    async function loadInvitation() {
      try {
        const appCheckToken = await getAppCheckToken();

        const response = await fetch(
          "https://europe-west1-reiseapp-mamatocherontour.cloudfunctions.net/previewTripInvitationPublic",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Firebase-AppCheck": appCheckToken,
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          const messages = {
            "invalid-link": "Dieser Einladungslink ist ungültig.",
            expired: "Diese Einladung ist abgelaufen.",
            used: "Diese Einladung wurde bereits verwendet.",
            revoked: "Diese Einladung wurde widerrufen.",
            unavailable: "Diese Einladung ist nicht mehr verfügbar.",
          };

          throw new Error(
            messages[data.error] ||
              "Die Einladung konnte nicht geladen werden."
          );
        }

        if (!cancelled) {
          setTripName(data.tripName);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Die Einladung konnte nicht geladen werden."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInvitation();

    return () => {
      cancelled = true;
    };
  }, [token, validToken]);

  const appUrl = `https://${
    window.location.hostname === "www.mamatochterontour.de"
      ? "mamatochterontour.de"
      : "www.mamatochterontour.de"
  }/app/trip/invite/${token}`;

  return (
    <div className="trip-invite-page">
      <main className="trip-invite-main">
        <div className="trip-invite-container">
          <header className="trip-invite-header">
            <img
              src="/app/favicon.png"
              alt="Momentry App-Icon"
              className="trip-invite-logo"
            />

            <div className="trip-invite-brand">
              <span className="trip-invite-brand-name">
                Momentry
              </span>
              <span className="trip-invite-brand-subtitle">
                by MamaTochterOnTour
              </span>
            </div>
          </header>

          <section className="trip-invite-card">
            <div className="trip-invite-card-top">
              <span className="trip-invite-label">
                EINE PERSÖNLICHE EINLADUNG
              </span>

              <span
                className="trip-invite-envelope"
                aria-hidden="true"
              >
                ✉
              </span>
            </div>

            <h1 className="trip-invite-title">
              Dein nächstes Abenteuer wartet.
            </h1>

            <p className="trip-invite-description">
              Du wurdest eingeladen, eine Reise gemeinsam
              auf Momentry zu planen.
            </p>

            {loading ? (
              <div
                className="trip-invite-status"
                role="status"
              >
                <span className="trip-invite-spinner" />
                Deine Einladung wird geladen …
              </div>
            ) : error ? (
              <div
                className="trip-invite-error"
                role="alert"
              >
                <span
                  className="trip-invite-error-icon"
                  aria-hidden="true"
                >
                  !
                </span>

                <div>
                  <strong>Einladung nicht verfügbar</strong>
                  <p>{error}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="trip-invite-trip">
                  <span className="trip-invite-trip-label">
                    DEINE REISE
                  </span>

                  <h2 className="trip-invite-trip-name">
                    {tripName}
                  </h2>

                  <p className="trip-invite-trip-description">
                    Gemeinsam planen und Erinnerungen schaffen.
                  </p>
                </div>

                <a
                  href={appUrl}
                  className="trip-invite-primary-button"
                >
                  <span>Einladung öffnen</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <p className="trip-invite-download-hint">
                  Du hast Momentry noch nicht installiert?
                </p>

                <div className="trip-invite-store-links">
                  <a
                    href={APP_STORE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    App Store ↗
                  </a>

                  <a
                    href={GOOGLE_PLAY}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Play ↗
                  </a>
                </div>
              </>
            )}
          </section>

          <p className="trip-invite-bottom-text">
            Gemeinsam planen. Erinnerungen schaffen.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TripInvitation;
