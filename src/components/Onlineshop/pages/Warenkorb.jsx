import { Link } from "react-router-dom";

import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";

import {
  FiArrowRight,
  FiCheck,
  FiLock,
  FiShoppingBag,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";

import useCart from "../hooks/useCart";

import "../styles/Warenkorb.css";

import { useShopAuth } from "../context/ShopAuthContext";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  calculateCartDiscount,
} from "../utils/calculateCartDiscount";

function Warenkorb() {
  const {
    isLoggedIn,
    currentUser,
  } = useShopAuth();

  const [checkoutMode, setCheckoutMode] =
    useState(() =>
      isLoggedIn ? "account" : "guest"
    );

  useEffect(() => {
    if (isLoggedIn) {
      setCheckoutMode("account");
    }
  }, [isLoggedIn]);

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    removeFromCart,
    clearCart,
  } = useCart();

  const [clearConfirmationOpen, setClearConfirmationOpen] =
    useState(false);

    const [checkoutEmail, setCheckoutEmail] =
  useState("");

    const [checkoutStatus, setCheckoutStatus] =
  useState("idle");

const [checkoutError, setCheckoutError] =
  useState("");

const [
  digitalContentConsent,
  setDigitalContentConsent,
] = useState(false);

const [
  consentError,
  setConsentError,
] = useState("");

  const [couponCode, setCouponCode] =
  useState("");

const [couponStatus, setCouponStatus] =
  useState("idle");

const [couponMessage, setCouponMessage] =
  useState("");

const [
  validatedCouponPercent,
  setValidatedCouponPercent,
] = useState(0);

    const discountResult = useMemo(
  () =>
    calculateCartDiscount({
      cartItems,
      couponPercent:
        validatedCouponPercent,
    }),
  [
    cartItems,
    validatedCouponPercent,
  ]
);

const {
  appliedDiscount,
  quantityProgress,
  bundleProgress,
  candidates,
} = discountResult;

const discountAmount =
  appliedDiscount.amount;

const total =
  discountResult.total;

const formattedSubtotal =
  cartSubtotal.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });

const formattedDiscount =
  discountAmount.toLocaleString(
    "de-DE",
    {
      style: "currency",
      currency: "EUR",
    }
  );

const formattedTotal =
  total.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });

const couponCandidate =
  candidates.find(
    (candidate) =>
      candidate.type === "coupon"
  );

const couponIsApplied =
  appliedDiscount.type === "coupon";

const anotherDiscountIsBetter =
  validatedCouponPercent > 0 &&
  !couponIsApplied &&
  appliedDiscount.type !== "none";
  
  const effectiveCheckoutEmail =
  checkoutMode === "account" && isLoggedIn
    ? currentUser?.email || ""
    : checkoutEmail;

  function handleClearCart() {
    clearCart();
    setClearConfirmationOpen(false);
  }

  async function handleApplyCoupon() {
  const email =
  effectiveCheckoutEmail.trim().toLowerCase();

  if (
  checkoutMode === "account" &&
  !isLoggedIn
) {
  setCouponStatus("error");
  setCouponMessage(
    "Bitte melde dich zuerst mit deinem Kundenkonto an."
  );
  return;
}

  const code = couponCode.trim().toUpperCase();

  setCouponMessage("");
  setCouponStatus("loading");
  setValidatedCouponPercent(0);

  if (!email) {
    setCouponStatus("error");
    setCouponMessage(
      "Bitte gib zuerst deine E-Mail-Adresse ein."
    );
    return;
  }

  if (!code) {
    setCouponStatus("error");
    setCouponMessage(
      "Bitte gib einen Rabattcode ein."
    );
    return;
  }

  try {
    const validateCoupon = httpsCallable(
      functions,
      "validateCoupon"
    );

    const result = await validateCoupon({
      email,
      code,
    });

    if (!result.data?.valid) {
      setCouponStatus("error");
      setCouponMessage(
        result.data?.message ||
          "Der Rabattcode ist nicht gültig."
      );
      return;
    }

    const validatedPercent =
  Number(
    result.data.discountPercent
  ) || 0;

setValidatedCouponPercent(
  validatedPercent
);

    setCouponStatus("success");
setCouponMessage(
  `Dein Rabattcode über ${validatedPercent} % wurde erfolgreich geprüft. Wir wenden automatisch den höchsten verfügbaren Rabatt an.`
);
  } catch (error) {
    console.error(
      "Rabattcode konnte nicht geprüft werden:",
      error
    );

    setCouponStatus("error");
    setCouponMessage(
      "Der Rabattcode konnte gerade nicht geprüft werden."
    );
  }
}

  async function handleCheckout() {
  if (cartItems.length === 0) {
    return;
  }

  setCheckoutError("");

  setConsentError("");

if (!digitalContentConsent) {
  setCheckoutStatus("error");

  setConsentError(
    "Bitte bestätige die sofortige Bereitstellung der digitalen Reiseguides."
  );

  return;
}

  if (
    checkoutMode === "account" &&
    !isLoggedIn
  ) {
    setCheckoutStatus("error");
    setCheckoutError(
      "Bitte melde dich zuerst mit deinem Kundenkonto an."
    );
    return;
  }

  const normalizedEmail =
    effectiveCheckoutEmail
      .trim()
      .toLowerCase();

  if (!normalizedEmail) {
    setCheckoutStatus("error");
    setCheckoutError(
      "Bitte gib deine E-Mail-Adresse ein."
    );
    return;
  }

  setCheckoutStatus("loading");

  try {
    const createCheckoutSession =
      httpsCallable(
        functions,
        "createCheckoutSession"
      );

    const productIds = cartItems.map(
      (product) => String(product.id)
    );

    const result =
  await createCheckoutSession({
    productIds,

    email: normalizedEmail,

    checkoutMode,

    couponCode:
      validatedCouponPercent > 0
        ? couponCode
            .trim()
            .toUpperCase()
        : "",

    digitalContentConsent,

    digitalContentConsentAt:
      new Date().toISOString(),
  });

    const checkoutUrl =
      result.data?.checkoutUrl;

    if (!checkoutUrl) {
      throw new Error(
        "Stripe hat keine Checkout-URL zurückgegeben."
      );
    }

    window.location.assign(checkoutUrl);
  } catch (error) {
    console.error(
      "Stripe Checkout konnte nicht gestartet werden:",
      error
    );

    setCheckoutStatus("error");
    setCheckoutError(
      "Der Bezahlvorgang konnte nicht gestartet werden. Bitte versuche es erneut."
    );
  }
}

  return (
    <>
      <ShopNavbar />

      <main className="cart-page">
        <section className="cart-hero">
          <span className="cart-hero__icon">
            <FiShoppingCart aria-hidden="true" />
          </span>

          <h1>Dein Warenkorb</h1>

          <p>
            Hier findest du alle Reiseguides, die du
            für deinen nächsten Reisemoment ausgewählt
            hast.
          </p>

          {cartCount > 0 && (
            <span className="cart-hero__count">
              {cartCount}{" "}
              {cartCount === 1
                ? "Produkt im Warenkorb"
                : "Produkte im Warenkorb"}
            </span>
          )}
        </section>

        <section className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon">
                <FiShoppingBag aria-hidden="true" />
              </span>

              <h2>Dein Warenkorb ist noch leer</h2>

              <p>
                Entdecke unsere Reiseguides und füge
                deine Favoriten deinem Warenkorb hinzu.
              </p>

              <Link
                to="/shop/reiseguides"
                className="cart-empty__button"
              >
                Reiseguides entdecken

                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-main">
                <div className="cart-main__header">
                  <div>
                    <span>Deine Auswahl</span>

                    <h2>
                      {cartCount}{" "}
                      {cartCount === 1
                        ? "Reiseguide"
                        : "Reiseguides"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="cart-clear-button"
                    onClick={() =>
                      setClearConfirmationOpen(true)
                    }
                  >
                    <FiTrash2 aria-hidden="true" />

                    Warenkorb leeren
                  </button>
                </div>

                {quantityProgress && (
  <div className="cart-discount-progress">
    <div className="cart-discount-progress__top">
      <div>
        <span>Mengenrabatt</span>

        <strong>
          10 % ab 3 · 15 % ab 5 Guides
        </strong>
      </div>

      <span>
        {quantityProgress.current}/
        {quantityProgress.target}
      </span>
    </div>

    <div
      className="cart-discount-progress__bar"
      aria-hidden="true"
    >
      <span
        style={{
          width: `${Math.min(
            100,
            quantityProgress.percent
          )}%`,
        }}
      />
    </div>

    <p>
      {quantityProgress.message}
    </p>

    <small>
      AIDA- und Kreuzfahrt-Guides zählen
      nicht zum Mengenrabatt.
    </small>
  </div>
)}

{bundleProgress && (
  <div
    className={`cart-bundle-hint cart-bundle-hint--${bundleProgress.status}`}
  >
    <span className="cart-bundle-hint__icon">
      {bundleProgress.status ===
      "complete"
        ? "✓"
        : "+"}
    </span>

    <div>
      <strong>
        {bundleProgress.status ===
        "complete"
          ? "Bundle vollständig"
          : "AIDA-Kreuzfahrt-Bundle"}
      </strong>

      <p>
        {bundleProgress.message}
      </p>

      {bundleProgress.status !==
        "complete" && (
        <Link to="/shop/reiseguides">
          Passenden Guide entdecken
          <FiArrowRight
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  </div>
)}

                <div className="cart-items">
                  {cartItems.map((product) => (
                    <article
                      key={product.id}
                      className="cart-item"
                    >
                      <Link
                        to={`/shop/reiseguides/${product.slug}`}
                        className="cart-item__image"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                        />
                      </Link>

                      <div className="cart-item__content">
                        <div className="cart-item__top">
                          <div>
                            <span className="cart-item__type">
                              Digitaler Reiseguide
                            </span>

                            <h3>
                              <Link
                                to={`/shop/reiseguides/${product.slug}`}
                              >
                                {product.title}
                              </Link>
                            </h3>
                          </div>

                          <strong className="cart-item__price">
                            {Number(
                              product.price
                            ).toLocaleString(
                              "de-DE",
                              {
                                style: "currency",
                                currency: "EUR",
                              }
                            )}
                          </strong>
                        </div>

                        {product.shortDescription && (
                          <p className="cart-item__description">
                            {product.shortDescription}
                          </p>
                        )}

                        <div className="cart-item__bottom">
                          <span className="cart-item__delivery">
                            <FiCheck
                              aria-hidden="true"
                            />

                            Nach dem Kauf digital
                            verfügbar
                          </span>

                          <button
                            type="button"
                            className="cart-item__remove"
                            onClick={() =>
                              removeFromCart(product.id)
                            }
                            aria-label={`${product.title} aus dem Warenkorb entfernen`}
                          >
                            <FiTrash2
                              aria-hidden="true"
                            />

                            Entfernen
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <Link
                  to="/shop/reiseguides"
                  className="cart-continue-shopping"
                >
                  Weitere Reiseguides entdecken
                </Link>
              </div>

              <aside className="cart-summary">
                <p className="cart-summary__eyebrow">
                  Zusammenfassung
                </p>

                <h2>Deine Bestellung</h2>

                <div className="cart-checkout-mode">

  <h3>Wie möchtest du bestellen?</h3>

  <label className="cart-checkout-option">
    <input
      type="radio"
      name="checkout-mode"
      checked={checkoutMode === "guest"}
      onChange={() => {
  setCheckoutMode("guest");
  setValidatedCouponPercent(0);
  setCouponStatus("idle");
  setCouponMessage("");
}}
    />

    <div>
      <strong>Als Gast bestellen</strong>

      <p>
        Schnell bestellen – ohne Kundenkonto.
      </p>
    </div>
  </label>

  <label className="cart-checkout-option">
    <input
      type="radio"
      name="checkout-mode"
      checked={checkoutMode === "account"}
      onChange={() => {
  setCheckoutMode("account");
  setValidatedCouponPercent(0);
  setCouponStatus("idle");
  setCouponMessage("");
}}
    />

    <div>
      <strong>Mit Kundenkonto</strong>

      <p>
        Deine Reiseguides bleiben dauerhaft
        in deinem Konto gespeichert.
      </p>
    </div>
  </label>

</div>

{checkoutMode === "account" &&
 !isLoggedIn && (

  <div className="cart-login-box">

    <Link
      to="/shop/login"
      state={{
        from: "/shop/warenkorb",
        email: checkoutEmail,
      }}
      className="cart-login-button"
    >
      Anmelden
    </Link>

    <p>
      Noch kein Konto?

      <Link
        to="/shop/registrieren"
        state={{
          from: "/shop/warenkorb",
        }}
      >
        Jetzt registrieren
      </Link>
    </p>

  </div>

)}

{checkoutMode === "account" &&
 isLoggedIn && (

<div className="cart-account-ok">
  <span className="cart-account-ok__icon">
    <FiCheck aria-hidden="true" />
  </span>

  <div>
    <strong>Du bist angemeldet</strong>

    <p>
  Bestellung als{" "}
  <strong>{currentUser?.email}</strong>.
  Deine Reiseguides werden deinem
  Kundenkonto hinzugefügt.
</p>
  </div>
</div>

)}

                <div className="cart-summary__rows">
                  <div className="cart-summary__row">
                    <span>
                      Zwischensumme
                    </span>

                    <strong>
                      {formattedSubtotal}
                    </strong>
                  </div>

                  <div className="cart-summary__row">
                    <span>
                      Versand
                    </span>

                    <strong>
                      Kostenlos
                    </strong>
                  </div>
                </div>
{checkoutMode === "guest" && (
                <div className="cart-customer-email">
  <label htmlFor="checkout-email">
    E-Mail-Adresse
  </label>

  <input
    id="checkout-email"
    type="email"
    placeholder="Deine E-Mail-Adresse"
    autoComplete="email"
    value={checkoutEmail}
    onChange={(event) => {
      setCheckoutEmail(event.target.value);

      if (validatedCouponPercent > 0) {
        setValidatedCouponPercent(0);
        setCouponStatus("idle");
        setCouponMessage(
          "Bitte prüfe den Rabattcode für die neue E-Mail-Adresse erneut."
        );
      }
    }}
  />
</div>
)}

                <div className="cart-coupon">

  <span className="cart-coupon__title">
    Rabattcode
  </span>

  <div className="cart-coupon__wrapper">

    <input
      id="coupon"
      type="text"
      placeholder="Rabattcode eingeben"
      value={couponCode}
      onChange={(event) => {
  setCouponCode(
    event.target.value.toUpperCase()
  );

  if (validatedCouponPercent > 0) {
    setValidatedCouponPercent(0);
    setCouponStatus("idle");
    setCouponMessage("");
  }
}}
    />

    <button
  type="button"
  className="cart-coupon__apply"
  onClick={handleApplyCoupon}
  disabled={couponStatus === "loading"}
  aria-label="Rabattcode anwenden"
>
  <FiCheck aria-hidden="true" />
</button>

  </div>

  {couponMessage && (
    <p
      className={`cart-coupon__message cart-coupon__message--${couponStatus}`}
    >
      {couponMessage}
    </p>
  )}

</div>

                <div className="cart-price-summary">
  <div className="cart-price-summary__row">
    <span>Gesamtbetrag</span>

    <strong>{formattedSubtotal}</strong>
  </div>

  {appliedDiscount.type !== "none" && (
  <div className="cart-price-summary__row cart-price-summary__row--discount">
    <div className="cart-price-summary__discount-copy">
      <span>
        {appliedDiscount.label}
      </span>

      <small>
        {appliedDiscount.description}
      </small>
    </div>

    <strong>
      -{formattedDiscount}
    </strong>
  </div>
)}

{appliedDiscount.type !== "none" && (
  <p className="cart-best-discount-note">
    Es wurde automatisch der Rabatt
    ausgewählt, mit dem du am meisten
    sparst.
  </p>
)}

{anotherDiscountIsBetter && (
  <div className="cart-coupon-comparison">
    <strong>
      Dein bester Rabatt wurde
      automatisch gewählt.
    </strong>

    <p>
      Der {appliedDiscount.label} spart
      dir{" "}
      {appliedDiscount.amount.toLocaleString(
        "de-DE",
        {
          style: "currency",
          currency: "EUR",
        }
      )}
      .

      {couponCandidate && (
        <>
          {" "}
          Dein Rabattcode hätte dir{" "}
          {couponCandidate.amount.toLocaleString(
            "de-DE",
            {
              style: "currency",
              currency: "EUR",
            }
          )}{" "}
          gespart und bleibt für eine
          spätere Bestellung verfügbar.
        </>
      )}
    </p>
  </div>
)}

<p className="cart-coupon__rule">
  Rabattcodes, Bundle- und Mengenrabatte
  sind nicht miteinander kombinierbar.
  Es wird automatisch der höchste
  verfügbare Rabatt angewendet.
</p>

  <div className="cart-price-summary__divider" />

  <div className="cart-price-summary__total">
    <div>
      <span>Zu zahlen</span>

      <small>
        inklusive gesetzlicher Umsatzsteuer
      </small>
    </div>

    <strong>{formattedTotal}</strong>
  </div>
</div>


<div className="cart-digital-consent">
  <label className="cart-digital-consent__label">
    <input
      type="checkbox"
      checked={digitalContentConsent}
      onChange={(event) => {
        const checked =
          event.target.checked;

        setDigitalContentConsent(
          checked
        );

        if (checked) {
          setConsentError("");
        }
      }}
    />

    <span className="cart-digital-consent__checkmark">
      <FiCheck aria-hidden="true" />
    </span>

    <span className="cart-digital-consent__text">
  Ich stimme ausdrücklich zu, dass meine
  digitalen Reiseguides direkt nach dem Kauf
  bereitgestellt werden. Mir ist bekannt,
  dass ich dadurch mein Widerrufsrecht
  verliere, sobald die Bereitstellung beginnt.
</span>
  </label>

  {consentError && (
    <p
      className="cart-digital-consent__error"
      role="alert"
    >
      {consentError}
    </p>
  )}
</div>

                <button
  type="button"
  className="cart-checkout-button"
  onClick={handleCheckout}
  disabled={checkoutStatus === "loading"}
>
  {checkoutStatus === "loading"
    ? "Checkout wird geöffnet …"
    : "Zur Kasse"}

  <FiArrowRight aria-hidden="true" />
</button>

{checkoutError && (
  <p
    className="cart-checkout-error"
    role="alert"
  >
    {checkoutError}
  </p>
)}

                <div className="cart-summary__security">
                  <FiLock aria-hidden="true" />

                  <span>
                    Sicherer und verschlüsselter
                    Bestellvorgang
                  </span>
                </div>

                <div className="cart-summary__information">
                  <h3>Digitale Reiseguides</h3>

                  <p>
  {checkoutMode === "account"
    ? "Deine gekauften Reiseguides werden nach erfolgreicher Zahlung in deinem Kundenkonto bereitgestellt."
    : "Deine gekauften Reiseguides erhältst du nach erfolgreicher Zahlung direkt und zusätzlich per E-Mail."}
</p>
                </div>
              </aside>
            </div>
          )}
        </section>

        {clearConfirmationOpen && (
          <div
            className="cart-dialog-backdrop"
            role="presentation"
            onMouseDown={() =>
              setClearConfirmationOpen(false)
            }
          >
            <div
              className="cart-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-clear-title"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >
              <span className="cart-dialog__icon">
                <FiTrash2 aria-hidden="true" />
              </span>

              <h2 id="cart-clear-title">
                Warenkorb leeren?
              </h2>

              <p>
                Möchtest du wirklich alle Produkte aus
                deinem Warenkorb entfernen?
              </p>

              <div className="cart-dialog__actions">
                <button
                  type="button"
                  className="cart-dialog__cancel"
                  onClick={() =>
                    setClearConfirmationOpen(false)
                  }
                >
                  Abbrechen
                </button>

                <button
                  type="button"
                  className="cart-dialog__confirm"
                  onClick={handleClearCart}
                >
                  Warenkorb leeren
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Warenkorb;