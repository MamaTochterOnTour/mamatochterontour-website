import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import {
  FiArrowRight,
  FiCheck,
  FiDownload,
  FiLoader,
  FiX,
} from "react-icons/fi";

import { functions } from "../../../firebase";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";

import useCart from "../hooks/useCart";
import useFavorites from "../hooks/useFavorites";

import "../styles/CheckoutSuccess.css";

import shopProducts from "../../../data/Onlineshop/shopProducts";

function CheckoutSuccess() {
  const { clearCart } = useCart();
  const { removeFavorites } = useFavorites();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const purchasedProducts =
  shopProducts.filter((product) =>
    order?.productIds?.includes(product.id)
  );

  const isAccountOrder =
  order?.checkoutMode === "account";

  useEffect(() => {
    async function verifyCheckout() {
      if (!sessionId) {
        setStatus("error");
        setErrorMessage(
          "Die Zahlungsbestätigung konnte nicht gefunden werden."
        );
        return;
      }

      try {
        const getCheckoutSession = httpsCallable(
          functions,
          "getCheckoutSession"
        );

        const result = await getCheckoutSession({
          sessionId,
        });

        if (!result.data?.paid) {
          setStatus("error");
          setErrorMessage(
            "Die Zahlung konnte noch nicht bestätigt werden."
          );
          return;
        }

        setOrder(result.data);

clearCart();

await removeFavorites(
  Array.isArray(result.data.productIds)
    ? result.data.productIds
    : []
);

setStatus("success");
      } catch (error) {
        console.error(
          "Checkout-Session konnte nicht geprüft werden:",
          error
        );

        setStatus("error");
        setErrorMessage(
          "Die Bestellung konnte gerade nicht geladen werden."
        );
      }
    }

    verifyCheckout();
  }, [
  sessionId,
  clearCart,
  removeFavorites,
]);

  return (
    <>
      <ShopNavbar />

      <main className="checkout-success-page">
        <section className="checkout-success-card">
          {status === "loading" && (
            <div className="checkout-success-state">
              <span className="checkout-success-icon checkout-success-icon--loading">
                <FiLoader aria-hidden="true" />
              </span>

              <p className="checkout-success-eyebrow">
                Zahlung wird geprüft
              </p>

              <h1>Einen kurzen Moment …</h1>

              <p className="checkout-success-description">
                Wir bestätigen gerade deine Bestellung.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="checkout-success-state">
              <span className="checkout-success-icon checkout-success-icon--error">
                <FiX aria-hidden="true" />
              </span>

              <p className="checkout-success-eyebrow">
                Zahlung nicht bestätigt
              </p>

              <h1>Da ist etwas schiefgelaufen</h1>

              <p className="checkout-success-description">
                {errorMessage}
              </p>

              <Link
                to="/shop/warenkorb"
                className="checkout-success-button"
              >
                Zurück zum Warenkorb
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          )}

          {status === "success" && (
  <>
    <div className="checkout-success-state">
      <span className="checkout-success-icon checkout-success-icon--success">
        <FiCheck aria-hidden="true" />
      </span>

      <p className="checkout-success-eyebrow">
        Bestellung erfolgreich
      </p>

      <h1>Vielen Dank für deinen Einkauf!</h1>

      {isAccountOrder ? (
        <p className="checkout-success-description">
          Deine Reiseguides wurden deinem Kundenkonto
          hinzugefügt. Du kannst sie jetzt direkt
          herunterladen oder später jederzeit unter{" "}
          <strong>„Meine Reiseguides“</strong>{" "}
          erneut aufrufen.
          <br />
          <br />
          Eine Bestellbestätigung wurde an{" "}
          <strong className="checkout-success-email">
  {order?.customerEmail}
</strong>{" "}
          gesendet.
        </p>
      ) : (
        <p className="checkout-success-description">
          Du kannst deine Reiseguides jetzt direkt
          herunterladen.
          <br />
          <br />
          Außerdem wurde eine Bestellbestätigung an{" "}
          <strong className="checkout-success-email">
  {order?.customerEmail}
</strong>{" "}
          gesendet.
        </p>
      )}

      {order?.amountTotal != null && (
        <div className="checkout-success-summary">
          <span>Bezahlter Gesamtbetrag</span>

          <strong>
            {Number(
              order.amountTotal / 100
            ).toLocaleString("de-DE", {
              style: "currency",
              currency:
                order.currency?.toUpperCase() ||
                "EUR",
            })}
          </strong>
        </div>
      )}
    </div>

    {purchasedProducts.length > 0 ? (
      <section className="checkout-success-downloads">
        <div className="checkout-success-downloads__header">
          <p>Deine Bestellung</p>

          <h2>
            {purchasedProducts.length === 1
              ? "Dein Reiseguide"
              : "Deine Reiseguides"}
          </h2>

          <span>
            {purchasedProducts.length}{" "}
            {purchasedProducts.length === 1
              ? "Guide steht"
              : "Guides stehen"}{" "}
            zum Download bereit
          </span>
        </div>

        <div className="checkout-success-downloads__list">
          {purchasedProducts.map((product) => (
            <article
              key={product.id}
              className="checkout-success-download"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="checkout-success-download__image"
              />

              <div className="checkout-success-download__content">
                <span className="checkout-success-download__format">
                  Digitaler Reiseguide ·{" "}
                  {product.format || "PDF"}
                </span>

                <h3>{product.title}</h3>

                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="checkout-success-download-button"
                >
                  <FiDownload aria-hidden="true" />

                  PDF herunterladen
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : (
      <p
        className="checkout-success-downloads-error"
        role="status"
      >
        Die gekauften Reiseguides konnten gerade nicht
        angezeigt werden. Bitte nutze die Links aus deiner
        Bestellbestätigung.
      </p>
    )}

    <div className="checkout-success-actions">
      {isAccountOrder ? (
        <Link
          to="/shop/konto"
          className="checkout-success-button"
        >
          Zum Kundenkonto
          <FiArrowRight aria-hidden="true" />
        </Link>
      ) : (
        <Link
          to="/shop"
          className="checkout-success-button"
        >
          Zum Onlineshop
          <FiArrowRight aria-hidden="true" />
        </Link>
      )}
    </div>
  </>
)}
          


        </section>
      </main>

      <Footer />
    </>
  );
}

export default CheckoutSuccess;