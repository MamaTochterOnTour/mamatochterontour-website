import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import {
  getShopAuthErrorMessage,
  sendShopPasswordReset,
} from "../services/shopAuthService";

import { useShopAuth } from "../context/ShopAuthContext";

import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const { isLoggedIn } = useShopAuth();
  const location = useLocation();

  const redirectTo =
    location.state?.from ||
    location.state?.redirectTo ||
    "/shop/konto";

  const [email, setEmail] = useState(
    location.state?.email || ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /*
   * Bereits eingeloggte Nutzer müssen ihr Passwort
   * nicht über diese Seite zurücksetzen.
   */
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  function validateEmail() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return "Bitte gib deine E-Mail-Adresse ein.";
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return "Bitte gib eine gültige E-Mail-Adresse ein.";
    }

    return "";
  }

  async function handlePasswordReset(event) {
    event.preventDefault();

    const validationError = validateEmail();

    if (validationError) {
      setError(validationError);
      setSuccess(false);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await sendShopPasswordReset(email);

      /*
       * Wir zeigen eine allgemeine Erfolgsmeldung.
       * Dadurch geben wir nicht öffentlich preis,
       * ob zu einer E-Mail-Adresse ein Konto existiert.
       */
      setSuccess(true);
    } catch (resetError) {
      console.error(
        "Fehler beim Zurücksetzen des Passworts:",
        resetError
      );

      setError(
        getShopAuthErrorMessage(resetError)
      );
    } finally {
      setLoading(false);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess(false);
    }
  }

  return (
    <main className="shop-forgot-password-page">
      <section
        className="shop-forgot-password-card"
        aria-labelledby="shop-forgot-password-title"
      >
        <p className="shop-forgot-password-eyebrow">
          Kundenkonto
        </p>

        <h1 id="shop-forgot-password-title">
          Passwort vergessen?
        </h1>

        <p className="shop-forgot-password-description">
          Gib die E-Mail-Adresse ein, mit der du dich in
          unserer Reise-App oder im Online-Shop registriert
          hast. Wir senden dir anschließend einen Link, mit
          dem du ein neues Passwort festlegen kannst.
        </p>

        {success ? (
          <div className="shop-forgot-password-success">
            <div
              className="shop-forgot-password-success-icon"
              aria-hidden="true"
            >
              ✓
            </div>

            <h2>E-Mail wurde versendet</h2>

            <p>
              Falls unter der angegebenen E-Mail-Adresse ein
              Konto besteht, erhältst du in Kürze einen Link
              zum Zurücksetzen deines Passworts.
            </p>

            <p className="shop-forgot-password-hint">
              Überprüfe bitte auch deinen Spam-Ordner.
            </p>

            <Link
              to="/shop/login"
              state={{
                from: redirectTo,
                email: email.trim(),
              }}
              className="shop-forgot-password-back-button"
            >
              Zurück zur Anmeldung
            </Link>

            <button
              type="button"
              className="shop-forgot-password-resend"
              onClick={() => setSuccess(false)}
            >
              Andere E-Mail-Adresse verwenden
            </button>
          </div>
        ) : (
          <>
            <form
              className="shop-forgot-password-form"
              onSubmit={handlePasswordReset}
              noValidate
            >
              <div className="shop-forgot-password-field">
                <label htmlFor="shop-forgot-password-email">
                  E-Mail-Adresse
                </label>

                <input
                  id="shop-forgot-password-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="name@beispiel.de"
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <div
                  className="shop-forgot-password-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <button
                className="shop-forgot-password-submit"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "E-Mail wird versendet …"
                  : "Link zum Zurücksetzen senden"}
              </button>
            </form>

            <div className="shop-forgot-password-login">
              <span>Du erinnerst dich wieder?</span>

              <Link
                to="/shop/login"
                state={{
                  from: redirectTo,
                  email: email.trim(),
                }}
              >
                Zurück zur Anmeldung
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default ForgotPassword;