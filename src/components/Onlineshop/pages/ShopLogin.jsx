import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import {
  loginShopUserWithApple,
  loginShopUserWithEmail,
  loginShopUserWithGoogle,
  getShopAuthErrorMessage,
} from "../services/shopAuthService";

import {
  ensureSocialShopUserProfile,
} from "../services/shopUserService";

import { useShopAuth } from "../context/ShopAuthContext";

import "../styles/ShopLogin.css";

function ShopLogin() {
  const { isLoggedIn } = useShopAuth();

  const location = useLocation();

  const redirectTo =
    location.state?.from || "/shop/konto";

  const [email, setEmail] = useState(
  location.state?.email || ""
);
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleEmailLogin(e) {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    await loginShopUserWithEmail(email, password);
  } catch (err) {
    console.error("E-MAIL LOGIN FEHLER:", err);
    console.error("E-Mail Code:", err?.code);
    console.error("E-Mail Message:", err?.message);

    setError(
      `${err?.code || "Unbekannter Fehler"}\n${
        err?.message || "Keine Fehlermeldung vorhanden"
      }`
    );
  } finally {
    setLoading(false);
  }
}

  async function handleGoogleLogin() {
  setLoading(true);
  setError("");

  try {
    const { user } =
      await loginShopUserWithGoogle();

    await ensureSocialShopUserProfile(user);
  } catch (err) {
    console.error("GOOGLE LOGIN FEHLER:", err);
    console.error("Google Code:", err?.code);
    console.error("Google Message:", err?.message);

    setError(
      `${err?.code || "Unbekannter Fehler"}\n${
        err?.message || "Keine Fehlermeldung vorhanden"
      }`
    );
  } finally {
    setLoading(false);
  }
}

async function handleAppleLogin() {
  setLoading(true);
  setError("");

  try {
    const { user } =
      await loginShopUserWithApple();

    await ensureSocialShopUserProfile(user);
  } catch (err) {
    console.error("APPLE LOGIN FEHLER:", err);
    console.error("Apple Code:", err?.code);
    console.error("Apple Message:", err?.message);

    setError(
      `${err?.code || "Unbekannter Fehler"}\n${
        err?.message || "Keine Fehlermeldung vorhanden"
      }`
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="shop-login-page">

      <div className="shop-login-card">

        <p className="shop-login-eyebrow">
          Kundenkonto
        </p>

        <h1>
          Willkommen zurück
        </h1>

        <p className="shop-login-description">
          Melde dich mit deinem bestehenden Konto an.
          Dein Kundenkonto funktioniert sowohl in unserer
          Reise-App als auch im Online-Shop.
        </p>

        <button
          className="shop-social-button"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Mit Google anmelden
        </button>

        <button
          className="shop-social-button"
          onClick={handleAppleLogin}
          disabled={loading}
        >
          Mit Apple anmelden
        </button>

        <div className="shop-login-divider">
          <span>oder</span>
        </div>

        <form onSubmit={handleEmailLogin}>

          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="shop-login-error">
              {error}
            </p>
          )}

          <button
            className="shop-login-button"
            disabled={loading}
          >
            {loading
              ? "Anmeldung läuft..."
              : "Anmelden"}
          </button>

        </form>

        <Link
          to="/shop/passwort-vergessen"
          className="shop-forgot-password"
        >
          Passwort vergessen?
        </Link>

        <div className="shop-register-link">

          Noch kein Kundenkonto?

          <Link to="/shop/registrieren">
            Jetzt registrieren
          </Link>

        </div>

      </div>

    </main>
  );
}

export default ShopLogin;