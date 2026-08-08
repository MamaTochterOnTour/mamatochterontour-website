import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  loginShopUserWithApple,
  loginShopUserWithEmail,
  loginShopUserWithGoogle,
} from "../services/shopAuthService";

import {
  ensureSocialShopUserProfile,
} from "../services/shopUserService";

import { useShopAuth } from "../context/ShopAuthContext";

import "../styles/ShopLogin.css";

import appleLogo from "../../../assets/auth/apple.png";
import googleLogo from "../../../assets/auth/google.png";

function ShopLogin() {
  const { isLoggedIn } = useShopAuth();

  const location = useLocation();

  const redirectTo =
    location.state?.from ||
    "/shop/konto";

  const [email, setEmail] =
    useState(
      location.state?.email || ""
    );

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * Wenn bereits eingeloggt:
   * zurück zum Kundenkonto bzw.
   * zur ursprünglich gewünschten Seite.
   */
  if (isLoggedIn) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  async function handleEmailLogin(
    event
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await loginShopUserWithEmail(
        email,
        password
      );
    } catch (err) {
      console.error(
        "E-MAIL LOGIN FEHLER:",
        err
      );

      console.error(
        "E-Mail Code:",
        err?.code
      );

      console.error(
        "E-Mail Message:",
        err?.message
      );

      setError(
        err?.message ||
          "Die Anmeldung hat nicht funktioniert."
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

      await ensureSocialShopUserProfile(
        user
      );
    } catch (err) {
      console.error(
        "GOOGLE LOGIN FEHLER:",
        err
      );

      console.error(
        "Google Code:",
        err?.code
      );

      console.error(
        "Google Message:",
        err?.message
      );

      setError(
        err?.message ||
          "Die Anmeldung mit Google hat nicht funktioniert."
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

      await ensureSocialShopUserProfile(
        user
      );
    } catch (err) {
      console.error(
        "APPLE LOGIN FEHLER:",
        err
      );

      console.error(
        "Apple Code:",
        err?.code
      );

      console.error(
        "Apple Message:",
        err?.message
      );

      setError(
        err?.message ||
          "Die Anmeldung mit Apple hat nicht funktioniert."
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
          Melde dich mit deinem bestehenden
          Konto an. Dein Kundenkonto
          funktioniert sowohl in unserer
          Reise-App als auch im Online-Shop.
        </p>

        <button
  type="button"
  className="shop-social-image-button"
  onClick={handleGoogleLogin}
  disabled={loading}
  aria-label="Mit Google anmelden"
>
  <img
    src={googleLogo}
    alt="Mit Google anmelden"
  />
</button>

<button
  type="button"
  className="shop-social-image-button"
  onClick={handleAppleLogin}
  disabled={loading}
  aria-label="Mit Apple anmelden"
>
  <img
    src={appleLogo}
    alt="Mit Apple anmelden"
  />
</button>

        <div className="shop-login-divider">
          <span>oder</span>
        </div>

        <form
          onSubmit={handleEmailLogin}
        >
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Passwort"
            autoComplete="current-password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            required
          />

          {error && (
            <p
              className="shop-login-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
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
          <span>
            Noch kein Kundenkonto?
          </span>

          <Link to="/shop/registrieren">
            Jetzt registrieren
          </Link>
        </div>

      </div>
    </main>
  );
}

export default ShopLogin;