import { useEffect, useState } from "react";
import "./CookieConsent.css";

import {
  enableGoogleAnalytics,
  disableGoogleAnalytics,
} from "../../../utils/analytics";

const CONSENT_KEY = "mtt_cookie_consent";

function isLegalPage() {
  if (typeof window === "undefined") {
    return false;
  }

  const pathname = window.location.pathname;

  return (
    pathname === "/datenschutz" ||
    pathname === "/impressum"
  );
}

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const handleConsentState = () => {
      const savedConsent = localStorage.getItem(CONSENT_KEY);

      /*
       * Datenschutz und Impressum müssen auch
       * ohne vorherige Cookie-Auswahl erreichbar sein.
       */
      if (isLegalPage()) {
        setShowBanner(false);
        setShowSettings(false);

        /*
         * Falls bereits eine Entscheidung gespeichert
         * wurde, wenden wir sie trotzdem an.
         */
        if (savedConsent) {
          try {
            const consent = JSON.parse(savedConsent);
            const analytics = Boolean(consent.analytics);

            setAnalyticsAllowed(analytics);

            if (analytics) {
              enableGoogleAnalytics();
            } else {
              disableGoogleAnalytics();
            }
          } catch {
            localStorage.removeItem(CONSENT_KEY);
            disableGoogleAnalytics();
          }
        } else {
          disableGoogleAnalytics();
        }

        return;
      }

      /*
       * Noch keine Entscheidung:
       * Analytics bleibt aus und Banner erscheint.
       */
      if (!savedConsent) {
        setAnalyticsAllowed(false);
        setShowSettings(false);
        setShowBanner(true);

        disableGoogleAnalytics();

        return;
      }

      /*
       * Bereits gespeicherte Entscheidung laden.
       */
      try {
        const consent = JSON.parse(savedConsent);

        const analytics = Boolean(consent.analytics);

        setAnalyticsAllowed(analytics);

        if (analytics) {
          enableGoogleAnalytics();
        } else {
          disableGoogleAnalytics();
        }

        setShowBanner(false);
        setShowSettings(false);
      } catch {
        localStorage.removeItem(CONSENT_KEY);

        setAnalyticsAllowed(false);
        setShowSettings(false);
        setShowBanner(true);

        disableGoogleAnalytics();
      }
    };

    /*
     * Cookie-Einstellungen über den Footer öffnen.
     */
    const handleOpenCookieSettings = () => {
      const savedConsent = localStorage.getItem(CONSENT_KEY);

      if (savedConsent) {
        try {
          const consent = JSON.parse(savedConsent);

          setAnalyticsAllowed(
            Boolean(consent.analytics)
          );
        } catch {
          setAnalyticsAllowed(false);
        }
      } else {
        setAnalyticsAllowed(false);
      }

      setShowSettings(true);
      setShowBanner(true);
    };

    handleConsentState();

    window.addEventListener(
      "mtt-open-cookie-settings",
      handleOpenCookieSettings
    );

    window.addEventListener(
      "popstate",
      handleConsentState
    );

    window.addEventListener(
      "mtt-route-changed",
      handleConsentState
    );

    return () => {
      window.removeEventListener(
        "mtt-open-cookie-settings",
        handleOpenCookieSettings
      );

      window.removeEventListener(
        "popstate",
        handleConsentState
      );

      window.removeEventListener(
        "mtt-route-changed",
        handleConsentState
      );
    };
  }, []);

  const saveConsent = (analytics) => {
    const consent = {
      necessary: true,
      analytics,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify(consent)
    );

    setAnalyticsAllowed(analytics);

    /*
     * Hier wird die tatsächliche Analytics-Auswahl
     * angewendet.
     */
    if (analytics) {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }

    setShowBanner(false);
    setShowSettings(false);

    window.dispatchEvent(
      new CustomEvent("mtt-consent-changed", {
        detail: consent,
      })
    );
  };

  const acceptAll = () => {
    saveConsent(true);
  };

  const acceptNecessary = () => {
    saveConsent(false);
  };

  const saveSettings = () => {
    saveConsent(analyticsAllowed);
  };

  const openLegalPage = (path) => {
    setShowBanner(false);
    setShowSettings(false);

    window.location.href = path;
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div
        className="cookie-consent__backdrop"
        aria-hidden="true"
      />

      <section
        className="cookie-consent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        {!showSettings ? (
          <>
            <div className="cookie-consent__eyebrow">
              Deine Privatsphäre
            </div>

            <h2
              id="cookie-consent-title"
              className="cookie-consent__title"
            >
              Cookies & Datenschutz
            </h2>

            <p className="cookie-consent__text">
              Wir verwenden notwendige Technologien,
              damit unsere Website und der Onlineshop
              zuverlässig funktionieren. Mit deiner
              Zustimmung dürfen wir außerdem Google
              Analytics verwenden, um zu verstehen,
              wie unsere Website genutzt wird und sie
              weiter zu verbessern.
            </p>

            <p className="cookie-consent__hint">
              Du entscheidest selbst. Deine Auswahl
              kannst du später jederzeit ändern.
            </p>

            <div className="cookie-consent__buttons">
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--primary"
                onClick={acceptAll}
              >
                Alle akzeptieren
              </button>

              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={acceptNecessary}
              >
                Nur notwendige
              </button>

              <button
                type="button"
                className="cookie-consent__settings-link"
                onClick={() => setShowSettings(true)}
              >
                Einstellungen
              </button>
            </div>

            <div className="cookie-consent__links">
              <button
                type="button"
                className="cookie-consent__legal-link"
                onClick={() =>
                  openLegalPage("/datenschutz")
                }
              >
                Datenschutz
              </button>

              <span aria-hidden="true">·</span>

              <button
                type="button"
                className="cookie-consent__legal-link"
                onClick={() =>
                  openLegalPage("/impressum")
                }
              >
                Impressum
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="cookie-consent__back"
              onClick={() => setShowSettings(false)}
            >
              ← Zurück
            </button>

            <div className="cookie-consent__eyebrow">
              Cookie-Einstellungen
            </div>

            <h2
              id="cookie-consent-title"
              className="cookie-consent__title"
            >
              Deine Auswahl
            </h2>

            <div className="cookie-consent__category">
              <div className="cookie-consent__category-content">
                <div className="cookie-consent__category-title">
                  Notwendig
                </div>

                <p>
                  Diese Technologien werden benötigt,
                  damit grundlegende Funktionen wie
                  Anmeldung, Warenkorb und Checkout
                  funktionieren.
                </p>
              </div>

              <div className="cookie-consent__always-active">
                Immer aktiv
              </div>
            </div>

            <div className="cookie-consent__category">
              <div className="cookie-consent__category-content">
                <div className="cookie-consent__category-title">
                  Analyse
                </div>

                <p>
                  Google Analytics hilft uns zu verstehen,
                  wie unsere Website und unser Shop genutzt
                  werden. Diese Daten verwenden wir zur
                  Verbesserung unseres Angebots.
                </p>
              </div>

              <label className="cookie-consent__switch">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(event) =>
                    setAnalyticsAllowed(
                      event.target.checked
                    )
                  }
                  aria-label="Analyse-Cookies erlauben"
                />

                <span className="cookie-consent__slider" />
              </label>
            </div>

            <div className="cookie-consent__buttons">
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--primary"
                onClick={saveSettings}
              >
                Auswahl speichern
              </button>

              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={acceptAll}
              >
                Alle akzeptieren
              </button>
            </div>

            <div className="cookie-consent__links">
              <button
                type="button"
                className="cookie-consent__legal-link"
                onClick={() =>
                  openLegalPage("/datenschutz")
                }
              >
                Datenschutz
              </button>

              <span aria-hidden="true">·</span>

              <button
                type="button"
                className="cookie-consent__legal-link"
                onClick={() =>
                  openLegalPage("/impressum")
                }
              >
                Impressum
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default CookieConsent;