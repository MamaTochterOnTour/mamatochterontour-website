import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getShopAuthErrorMessage,
  registerShopUserWithEmail,
} from "../services/shopAuthService";

import {
  createShopUserProfileWithEmail,
  getShopUserErrorMessage,
} from "../services/shopUserService";

import { useShopAuth } from "../context/ShopAuthContext";

import "../styles/ShopRegister.css";

function ShopRegister() {
  const { isLoggedIn } = useShopAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.from ||
    location.state?.redirectTo ||
    "/shop/konto";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Bereits eingeloggte Nutzer sollen nicht erneut
   * auf die Registrierungsseite gelangen.
   *
   * Während der laufenden Registrierung verhindern wir
   * die automatische Weiterleitung, damit zuerst das
   * Firestore-Profil vollständig erstellt werden kann.
   */
  if (isLoggedIn && !loading) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function validateForm() {
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const username = formData.username.trim();
    const email = formData.email.trim();

    if (!firstName) {
      return "Bitte gib deinen Vornamen ein.";
    }

    if (!lastName) {
      return "Bitte gib deinen Nachnamen ein.";
    }

    if (!username) {
      return "Bitte wähle einen Username.";
    }

    if (username.length < 3) {
      return "Dein Username muss mindestens 3 Zeichen lang sein.";
    }

    if (/\s/.test(username)) {
      return "Dein Username darf keine Leerzeichen enthalten.";
    }

    if (!email) {
      return "Bitte gib deine E-Mail-Adresse ein.";
    }

    if (!formData.password) {
      return "Bitte wähle ein Passwort.";
    }

    if (formData.password.length < 6) {
      return "Dein Passwort muss mindestens 6 Zeichen lang sein.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Die beiden Passwörter stimmen nicht überein.";
    }

    if (!acceptedTerms) {
      return "Bitte akzeptiere die Datenschutzerklärung.";
    }

    return "";
  }

  async function handleRegister(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const username = formData.username.trim();
    const email = formData.email.trim();
    const displayName = `${firstName} ${lastName}`.trim();

    try {
      /*
       * Schritt 1:
       * Firebase-Auth-Konto erstellen.
       */
      const firebaseUser =
  await registerShopUserWithEmail(
    email,
    formData.password
  );

await createShopUserProfileWithEmail(
  firebaseUser,
  {
    firstName,
    lastName,
    username,
    email: firebaseUser.email || email,
    displayName,
  }
);

      /*
       * Nach erfolgreicher Registrierung direkt
       * zum Kundenkonto oder zur ursprünglich
       * gewünschten Seite weiterleiten.
       */
      navigate(redirectTo, {
        replace: true,
      });
    } catch (registrationError) {
  console.error(
    "REGISTRIERUNGSFEHLER:",
    registrationError
  );

  console.error(
    "FEHLERCODE:",
    registrationError?.code
  );

  console.error(
    "FEHLERMELDUNG:",
    registrationError?.message
  );

  setError(
    `${registrationError?.code || "Unbekannter Fehler"}: ${
      registrationError?.message ||
      "Keine technische Fehlermeldung vorhanden."
    }`
  );

  setLoading(false);
}
  }

  return (
    <main className="shop-register-page">
      <section
        className="shop-register-card"
        aria-labelledby="shop-register-title"
      >
        <p className="shop-register-eyebrow">
          Kundenkonto
        </p>

        <h1 id="shop-register-title">
          Konto erstellen
        </h1>

        <p className="shop-register-description">
          Erstelle dein kostenloses Kundenkonto. Du kannst
          dasselbe Konto anschließend sowohl in unserer
          Reise-App als auch in unserem Online-Shop verwenden.
        </p>

        <form
          className="shop-register-form"
          onSubmit={handleRegister}
          noValidate
        >
          <div className="shop-register-name-fields">
            <div className="shop-register-field">
              <label htmlFor="shop-register-first-name">
                Vorname
              </label>

              <input
                id="shop-register-first-name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                autoComplete="given-name"
                placeholder="Dein Vorname"
                disabled={loading}
                required
              />
            </div>

            <div className="shop-register-field">
              <label htmlFor="shop-register-last-name">
                Nachname
              </label>

              <input
                id="shop-register-last-name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
                placeholder="Dein Nachname"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="shop-register-field">
            <label htmlFor="shop-register-username">
              Username
            </label>

            <input
              id="shop-register-username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="username"
              placeholder="Dein Username"
              disabled={loading}
              minLength={3}
              required
            />

            <p className="shop-register-field-hint">
              Dein Username wird auch in der
              Momentry-Reise-App verwendet.
            </p>
          </div>

          <div className="shop-register-field">
            <label htmlFor="shop-register-email">
              E-Mail-Adresse
            </label>

            <input
              id="shop-register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              placeholder="name@beispiel.de"
              disabled={loading}
              required
            />
          </div>

          <div className="shop-register-field">
            <label htmlFor="shop-register-password">
              Passwort
            </label>

            <input
              id="shop-register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              placeholder="Mindestens 6 Zeichen"
              disabled={loading}
              minLength={6}
              required
            />
          </div>

          <div className="shop-register-field">
            <label htmlFor="shop-register-confirm-password">
              Passwort wiederholen
            </label>

            <input
              id="shop-register-confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
              placeholder="Passwort erneut eingeben"
              disabled={loading}
              minLength={6}
              required
            />
          </div>

          <label className="shop-register-checkbox">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);

                if (error) {
                  setError("");
                }
              }}
              disabled={loading}
            />

            <span>
              Ich habe die{" "}
              <Link to="/datenschutz">
                Datenschutzerklärung
              </Link>{" "}
              gelesen und akzeptiere sie.
            </span>
          </label>

          {error && (
            <div
              className="shop-register-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            className="shop-register-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Konto wird erstellt …"
              : "Kostenlos registrieren"}
          </button>
        </form>

        <div className="shop-register-login">
          <span>Du hast bereits ein Kundenkonto?</span>

          <Link
            to="/shop/login"
            state={{
              from: redirectTo,
            }}
          >
            Jetzt anmelden
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ShopRegister;