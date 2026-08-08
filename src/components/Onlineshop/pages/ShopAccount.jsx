import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  updateProfile,
} from "firebase/auth";

import {
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiEdit3,
  FiFileText,
  FiGift,
  FiLoader,
  FiLock,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiPackage,
  FiSave,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import {
  Navigate,
} from "react-router-dom";

import {
  auth,
  db,
  functions,
} from "../../../firebase";

import {
  httpsCallable,
} from "firebase/functions";

import {
  useShopAuth,
} from "../context/ShopAuthContext";

import {
  logoutShopUser,
  sendShopPasswordReset,
} from "../services/shopAuthService";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";

import shopProducts from "../../../data/Onlineshop/shopProducts";

import "../styles/ShopAccount.css";

function getTimestampDate(value) {
  if (!value) {
    return null;
  }

  if (
    typeof value?.toDate === "function"
  ) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  const parsedDate =
    new Date(value);

  return Number.isNaN(
    parsedDate.getTime()
  )
    ? null
    : parsedDate;
}

function formatDate(value) {
  const date =
    getTimestampDate(value);

  if (!date) {
    return "Datum nicht verfügbar";
  }

  return new Intl.DateTimeFormat(
    "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).format(date);
}

function formatMoney(
  amountInCents,
  currency = "eur"
) {
  return new Intl.NumberFormat(
    "de-DE",
    {
      style: "currency",
      currency:
        String(currency || "eur")
          .toUpperCase(),
    }
  ).format(
    Number(amountInCents || 0) / 100
  );
}

function normalizeText(value) {
  return String(value || "").trim();
}

function getFirstExistingValue(
  object,
  keys,
  fallback = ""
) {
  for (const key of keys) {
    const value = object?.[key];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return fallback;
}

function ShopAccount() {
  const {
  loading,
  isLoggedIn,
  currentUser,
  shopUser,
  shopCustomer,
} = useShopAuth();

  const [
    purchases,
    setPurchases,
  ] = useState([]);

  const [
    purchasesLoading,
    setPurchasesLoading,
  ] = useState(true);

  const [
    purchasesError,
    setPurchasesError,
  ] = useState("");

  const [
    expandedOrderId,
    setExpandedOrderId,
  ] = useState(null);

  const [
  invoiceLoadingId,
  setInvoiceLoadingId,
] = useState(null);

const [
  invoiceErrorId,
  setInvoiceErrorId,
] = useState(null);

const [
  invoiceErrorMessage,
  setInvoiceErrorMessage,
] = useState("");

  const [
    profileForm,
    setProfileForm,
  ] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "Deutschland",
  });

  const [
    profileStatus,
    setProfileStatus,
  ] = useState("idle");

  const [
    profileMessage,
    setProfileMessage,
  ] = useState("");

  const [
    passwordStatus,
    setPasswordStatus,
  ] = useState("idle");

  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");

  const [
    logoutLoading,
    setLogoutLoading,
  ] = useState(false);

  /*
   * Profilformular aus dem bestehenden
   * Dokument Users/{uid} befüllen.
   */
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setProfileForm({
      firstName:
        getFirstExistingValue(
          shopUser,
          [
            "firstName",
            "firstname",
            "vorname",
          ],
          currentUser.displayName
            ?.split(" ")[0] || ""
        ),

      lastName:
        getFirstExistingValue(
          shopUser,
          [
            "lastName",
            "lastname",
            "nachname",
          ],
          currentUser.displayName
            ?.split(" ")
            .slice(1)
            .join(" ") || ""
        ),

      phone:
        getFirstExistingValue(
          shopUser,
          [
            "phone",
            "phoneNumber",
            "telefon",
          ]
        ),

      street:
  getFirstExistingValue(
    shopCustomer?.address,
    [
      "street",
      "streetName",
      "strasse",
    ]
  ),

      houseNumber:
  getFirstExistingValue(
    shopCustomer?.address,
    [
      "houseNumber",
      "streetNumber",
      "hausnummer",
    ]
  ),

postalCode:
  getFirstExistingValue(
    shopCustomer?.address,
    [
      "postalCode",
      "zipCode",
      "plz",
    ]
  ),

city:
  getFirstExistingValue(
    shopCustomer?.address,
    [
      "city",
      "ort",
    ]
  ),

country:
  getFirstExistingValue(
    shopCustomer?.address,
    [
      "country",
      "land",
    ],
    "Deutschland"
  ),
    });
  }, [
  currentUser,
  shopUser,
  shopCustomer,
]);

  /*
   * Bestellungen in Echtzeit aus:
   *
   * shopUsers/{uid}/purchases
   */
  useEffect(() => {
    if (!currentUser?.uid) {
      setPurchases([]);
      setPurchasesLoading(false);
      return undefined;
    }

    setPurchasesLoading(true);
    setPurchasesError("");

    const purchasesReference =
      collection(
        db,
        "shopUsers",
        currentUser.uid,
        "purchases"
      );

    const purchasesQuery =
      query(
        purchasesReference,
        orderBy(
          "purchasedAt",
          "desc"
        )
      );

    const unsubscribe =
      onSnapshot(
        purchasesQuery,
        (snapshot) => {
          const loadedPurchases =
            snapshot.docs.map(
              (purchaseDocument) => ({
                id:
                  purchaseDocument.id,

                ...purchaseDocument.data(),
              })
            );

          setPurchases(
            loadedPurchases
          );

          setPurchasesLoading(false);
          setPurchasesError("");
        },
        (error) => {
          console.error(
            "Bestellungen konnten nicht geladen werden:",
            error
          );

          setPurchases([]);
          setPurchasesLoading(false);

          setPurchasesError(
            "Deine Bestellungen konnten gerade nicht geladen werden."
          );
        }
      );

    return unsubscribe;
  }, [currentUser?.uid]);

  /*
   * Alle gekauften Produkt-IDs aus allen
   * Bestellungen zusammenführen.
   */
  const purchasedProductIds =
    useMemo(() => {
      const ids = new Set();

      purchases.forEach(
        (purchase) => {
          const productIds =
            Array.isArray(
              purchase.productIds
            )
              ? purchase.productIds
              : [];

          productIds.forEach(
            (productId) => {
              ids.add(
                String(productId)
              );
            }
          );
        }
      );

      return Array.from(ids);
    }, [purchases]);

  /*
   * Produktdaten aus der normalen
   * Frontend-Produktdatei laden.
   */
  const purchasedGuides =
    useMemo(() => {
      return purchasedProductIds
        .map((productId) =>
          shopProducts.find(
            (product) =>
              String(product.id) ===
              String(productId)
          )
        )
        .filter(Boolean);
    }, [purchasedProductIds]);

  const firstName =
    normalizeText(
      profileForm.firstName
    ) ||
    currentUser?.displayName
      ?.split(" ")[0] ||
    "";

  const displayName =
    firstName || "Reisefan";

  function handleProfileChange(
    event
  ) {
    const {
      name,
      value,
    } = event.target;

    setProfileForm(
      (currentForm) => ({
        ...currentForm,
        [name]: value,
      })
    );

    setProfileStatus("idle");
    setProfileMessage("");
  }

  async function handleSaveProfile(
    event
  ) {
    event.preventDefault();

    if (!currentUser?.uid) {
      return;
    }

    const firstNameValue =
      normalizeText(
        profileForm.firstName
      );

    const lastNameValue =
      normalizeText(
        profileForm.lastName
      );

    if (!firstNameValue) {
      setProfileStatus("error");

      setProfileMessage(
        "Bitte gib deinen Vornamen ein."
      );

      return;
    }

    try {
      setProfileStatus("loading");
      setProfileMessage("");

      const profileData = {
  firstName:
    firstNameValue,

  lastName:
    lastNameValue,

  email:
    currentUser.email || "",

  updatedAt:
    serverTimestamp(),
};

const shopCustomerData = {
  address: {
    street:
      normalizeText(
        profileForm.street
      ),

    houseNumber:
      normalizeText(
        profileForm.houseNumber
      ),

    postalCode:
      normalizeText(
        profileForm.postalCode
      ),

    city:
      normalizeText(
        profileForm.city
      ),

    country:
      normalizeText(
        profileForm.country
      ),
  },

  updatedAt:
    serverTimestamp(),
};

      /*
       * Bestehende Profildaten bleiben erhalten.
       */
      await setDoc(
        doc(
          db,
          "Users",
          currentUser.uid
        ),
        profileData,
        {
          merge: true,
        }
      );

      await setDoc(
  doc(
    db,
    "shopUsers",
    currentUser.uid
  ),
  shopCustomerData,
  {
    merge: true,
  }
);

      const completeDisplayName = [
        firstNameValue,
        lastNameValue,
      ]
        .filter(Boolean)
        .join(" ");

      if (
        auth.currentUser &&
        completeDisplayName
      ) {
        await updateProfile(
          auth.currentUser,
          {
            displayName:
              completeDisplayName,
          }
        );
      }

      setProfileStatus("success");

      setProfileMessage(
        "Deine Kontodaten wurden gespeichert."
      );
    } catch (error) {
      console.error(
        "Kontodaten konnten nicht gespeichert werden:",
        error
      );

      setProfileStatus("error");

      setProfileMessage(
        "Deine Kontodaten konnten gerade nicht gespeichert werden."
      );
    }
  }

  async function handlePasswordReset() {
    const email =
      currentUser?.email;

    if (!email) {
      setPasswordStatus("error");

      setPasswordMessage(
        "Für dieses Kundenkonto ist keine E-Mail-Adresse hinterlegt."
      );

      return;
    }

    try {
      setPasswordStatus("loading");
      setPasswordMessage("");

      await sendShopPasswordReset(
        email
      );

      setPasswordStatus("success");

      setPasswordMessage(
        `Wir haben eine E-Mail zum Ändern deines Passworts an ${email} geschickt.`
      );
    } catch (error) {
      console.error(
        "Passwort-Mail konnte nicht versendet werden:",
        error
      );

      setPasswordStatus("error");

      setPasswordMessage(
        "Die E-Mail zum Ändern des Passworts konnte gerade nicht versendet werden."
      );
    }
  }

  async function handleOpenInvoice(
  orderId
) {
  if (!orderId) {
    return;
  }

  try {
    setInvoiceLoadingId(
      orderId
    );

    setInvoiceErrorId(null);
    setInvoiceErrorMessage("");

    const getInvoiceDownloadUrl =
      httpsCallable(
        functions,
        "getInvoiceDownloadUrl"
      );

    const result =
      await getInvoiceDownloadUrl({
        orderId,
      });

    const downloadUrl =
      result.data?.downloadUrl;

    if (!downloadUrl) {
      throw new Error(
        "Es wurde kein Rechnungslink zurückgegeben."
      );
    }

    /*
     * Rechnung öffnen / herunterladen.
     */
    window.location.href =
      downloadUrl;
  } catch (error) {
    console.error(
      "Rechnung konnte nicht geöffnet werden:",
      error
    );

    setInvoiceErrorId(
      orderId
    );

    setInvoiceErrorMessage(
      error?.message ||
        "Die Rechnung konnte gerade nicht geöffnet werden."
    );
  } finally {
    setInvoiceLoadingId(null);
  }
}

  async function handleLogout() {
    try {
      setLogoutLoading(true);

      await logoutShopUser();
    } catch (error) {
      console.error(
        "Fehler beim Abmelden:",
        error
      );

      setLogoutLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <ShopNavbar />

        <main className="shop-account-loading">
          <span className="shop-account-loader" />

          <p>
            Kundenkonto wird geladen …
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/shop/login"
        replace
        state={{
          from: "/shop/konto",
        }}
      />
    );
  }

  return (
    <>
      <ShopNavbar />

      <main className="shop-account-page">
        <section className="shop-account-hero">
          <span className="shop-account-hero__circle shop-account-hero__circle--one" />
          <span className="shop-account-hero__circle shop-account-hero__circle--two" />

          <div className="shop-account-container">
            <div className="shop-account-hero__content">
             

              <div>
                <p className="shop-account-eyebrow">
                  Dein Kundenkonto
                </p>

                <h1>
                  Hallo {displayName}!
                </h1>

                <p className="shop-account-intro">
                  Hier findest du deine gekauften
                  Reiseguides, deine Bestellungen und
                  alle wichtigen Einstellungen für
                  dein Kundenkonto.
                </p>
              </div>
            </div>

            <div className="shop-account-overview">
              <article className="shop-account-overview-card">
                <span className="shop-account-overview-card__icon">
                  <FiBookOpen aria-hidden="true" />
                </span>

                <div>
                  <strong>
                    {purchasedGuides.length}
                  </strong>

                  <span>
                    {purchasedGuides.length === 1
                      ? "Reiseguide"
                      : "Reiseguides"}
                  </span>
                </div>
              </article>

              <article className="shop-account-overview-card">
                <span className="shop-account-overview-card__icon">
                  <FiPackage aria-hidden="true" />
                </span>

                <div>
                  <strong>
                    {purchases.length}
                  </strong>

                  <span>
                    {purchases.length === 1
                      ? "Bestellung"
                      : "Bestellungen"}
                  </span>
                </div>
              </article>

              <article className="shop-account-overview-card">
  <span className="shop-account-overview-card__icon">
    <FiGift aria-hidden="true" />
  </span>

  <div>
    <strong>
      Bald
    </strong>

    <span>Punkteprogramm</span>
  </div>
</article>
            </div>
          </div>
        </section>

        <div className="shop-account-content">
          <div className="shop-account-container">
            <section
              className="shop-account-section"
              id="reiseguides"
            >
              <div className="shop-account-section__header">
                <div>
                  <p className="shop-account-section__eyebrow">
                    Deine Bibliothek
                  </p>

                  <h2>
                    Meine Reiseguides
                  </h2>

                  <p>
                    Alle Reiseguides, die du mit diesem
                    Kundenkonto gekauft hast.
                  </p>
                </div>

                <span className="shop-account-section__header-icon">
                  <FiBookOpen aria-hidden="true" />
                </span>
              </div>

              {purchasesLoading ? (
                <div className="shop-account-state">
                  <FiLoader
                    className="shop-account-state__spinner"
                    aria-hidden="true"
                  />

                  <p>
                    Deine Reiseguides werden geladen …
                  </p>
                </div>
              ) : purchasedGuides.length > 0 ? (
                <div className="shop-account-guides">
                  {purchasedGuides.map(
                    (product) => (
                      <article
                        key={product.id}
                        className="shop-account-guide"
                      >
                        <a
                          href={product.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shop-account-guide__image-link"
                          aria-label={`${product.title} öffnen`}
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="shop-account-guide__image"
                          />
                        </a>

                        <div className="shop-account-guide__content">
                          <span className="shop-account-guide__format">
                            Digitaler Reiseguide ·{" "}
                            {product.format ||
                              "PDF"}
                          </span>

                          <h3>
                            {product.title}
                          </h3>

                          <a
                            href={product.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shop-account-guide__button"
                          >
                            <FiDownload aria-hidden="true" />

                            PDF öffnen
                          </a>
                        </div>
                      </article>
                    )
                  )}
                </div>
              ) : (
                <div className="shop-account-empty">
                  <span className="shop-account-empty__icon">
                    <FiBookOpen aria-hidden="true" />
                  </span>

                  <h3>
                    Noch keine Reiseguides
                  </h3>

                  <p>
                    Sobald du mit deinem Kundenkonto
                    einen Reiseguide kaufst, erscheint
                    er hier automatisch.
                  </p>
                </div>
              )}
            </section>

            <section
              className="shop-account-section"
              id="bestellungen"
            >
              <div className="shop-account-section__header">
                <div>
                  <p className="shop-account-section__eyebrow">
                    Deine Käufe
                  </p>

                  <h2>
                    Bestellungen & Rechnungen
                  </h2>

                  <p>
                    Hier kannst du deine bisherigen
                    Bestellungen und später auch deine
                    Rechnungen erneut aufrufen.
                  </p>
                </div>

                <span className="shop-account-section__header-icon">
                  <FiFileText aria-hidden="true" />
                </span>
              </div>

              {purchasesLoading ? (
                <div className="shop-account-state">
                  <FiLoader
                    className="shop-account-state__spinner"
                    aria-hidden="true"
                  />

                  <p>
                    Deine Bestellungen werden geladen …
                  </p>
                </div>
              ) : purchasesError ? (
                <div className="shop-account-message shop-account-message--error">
                  {purchasesError}
                </div>
              ) : purchases.length > 0 ? (
                <div className="shop-account-orders">
                  {purchases.map(
                    (purchase) => {
                      const isExpanded =
                        expandedOrderId ===
                        purchase.id;

                      const orderProductIds =
                        Array.isArray(
                          purchase.productIds
                        )
                          ? purchase.productIds
                          : [];

                      const orderProducts =
                        orderProductIds
                          .map(
                            (productId) =>
                              shopProducts.find(
                                (product) =>
                                  String(
                                    product.id
                                  ) ===
                                  String(
                                    productId
                                  )
                              )
                          )
                          .filter(Boolean);

                      const invoiceIsLoading =
  invoiceLoadingId ===
  purchase.id;

const invoiceHasError =
  invoiceErrorId ===
  purchase.id;

                      return (
                        <article
                          key={purchase.id}
                          className="shop-account-order"
                        >
                          <button
                            type="button"
                            className="shop-account-order__summary"
                            onClick={() =>
                              setExpandedOrderId(
                                isExpanded
                                  ? null
                                  : purchase.id
                              )
                            }
                            aria-expanded={
                              isExpanded
                            }
                          >
                            <span className="shop-account-order__icon">
                              <FiPackage aria-hidden="true" />
                            </span>

                            <span className="shop-account-order__main">
                              <strong>
                                {purchase.orderNumber ||
                                  "Bestellung"}
                              </strong>

                              <span>
                                {formatDate(
                                  purchase.purchasedAt
                                )}
                                {" · "}
                                {orderProductIds.length}{" "}
                                {orderProductIds.length ===
                                1
                                  ? "Reiseguide"
                                  : "Reiseguides"}
                              </span>
                            </span>

                            <span className="shop-account-order__amount">
                              {formatMoney(
                                purchase.amountTotal,
                                purchase.currency
                              )}
                            </span>

                            <span className="shop-account-order__toggle">
                              {isExpanded ? (
                                <FiChevronUp aria-hidden="true" />
                              ) : (
                                <FiChevronDown aria-hidden="true" />
                              )}
                            </span>
                          </button>

                          {isExpanded && (
                            <div className="shop-account-order__details">
                              <div className="shop-account-order__status-row">
                                <div>
                                  <span>
                                    Zahlungsstatus
                                  </span>

                                  <strong className="shop-account-order__paid">
                                    <FiCheck aria-hidden="true" />

                                    Bezahlt
                                  </strong>
                                </div>

                                <div>
                                  <span>
                                    Gesamtbetrag
                                  </span>

                                  <strong>
                                    {formatMoney(
                                      purchase.amountTotal,
                                      purchase.currency
                                    )}
                                  </strong>
                                </div>

                                {Number(
                                  purchase.amountDiscount
                                ) > 0 && (
                                  <div>
                                    <span>
                                      Rabatt
                                    </span>

                                    <strong>
                                      -
                                      {formatMoney(
                                        purchase.amountDiscount,
                                        purchase.currency
                                      )}
                                    </strong>
                                  </div>
                                )}
                              </div>

                              {orderProducts.length >
                                0 && (
                                <div className="shop-account-order__products">
                                  <h3>
                                    Enthaltene Reiseguides
                                  </h3>

                                  <div>
                                    {orderProducts.map(
                                      (product) => (
                                        <a
                                          key={
                                            product.id
                                          }
                                          href={
                                            product.pdfUrl
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="shop-account-order-product"
                                        >
                                          <img
                                            src={
                                              product.imageUrl
                                            }
                                            alt={
                                              product.title
                                            }
                                          />

                                          <span>
                                            <strong>
                                              {
                                                product.title
                                              }
                                            </strong>

                                            <small>
                                              PDF öffnen
                                            </small>
                                          </span>
                                        </a>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="shop-account-order__invoice">
  <div>
    <FiFileText
      aria-hidden="true"
    />

    <span>
      <strong>
        Rechnung
      </strong>

      <small>
        Deine Rechnung zu dieser
        Bestellung steht als PDF
        zum Download bereit.
      </small>
    </span>
  </div>

  <button
    type="button"
    className="shop-account-order__invoice-button"
    onClick={() =>
      handleOpenInvoice(
        purchase.id
      )
    }
    disabled={
      invoiceIsLoading
    }
  >
    {invoiceIsLoading ? (
      <FiLoader
        className="shop-account-button-spinner"
        aria-hidden="true"
      />
    ) : (
      <FiDownload
        aria-hidden="true"
      />
    )}

    {invoiceIsLoading
      ? "Wird geladen …"
      : "Rechnung herunterladen"}
  </button>
</div>

{invoiceHasError && (
  <div className="shop-account-invoice-error">
    {invoiceErrorMessage}
  </div>
)}
                            </div>
                          )}
                        </article>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="shop-account-empty">
                  <span className="shop-account-empty__icon">
                    <FiPackage aria-hidden="true" />
                  </span>

                  <h3>
                    Noch keine Bestellungen
                  </h3>

                  <p>
                    Deine zukünftigen Bestellungen
                    erscheinen hier automatisch.
                  </p>
                </div>
              )}
            </section>

            <section
  className="shop-account-section"
  id="punkteprogramm"
>
  <div className="shop-account-section__header">
    <div>
      <p className="shop-account-section__eyebrow">
        Deine Vorteile
      </p>

      <h2>
        Punkteprogramm
      </h2>

      <p>
        Wir arbeiten gerade an unserem
        Punkteprogramm für den Onlineshop.
      </p>
    </div>

    <span className="shop-account-section__header-icon">
      <FiGift aria-hidden="true" />
    </span>
  </div>

  <div className="shop-account-points">
    <div className="shop-account-points__top">
      <div>
        <span>
          Demnächst verfügbar
        </span>

        <strong>
          Deine Einkäufe zählen schon mit
        </strong>
      </div>

      <span className="shop-account-points__badge">
        In Vorbereitung
      </span>
    </div>

    <p>
      Unser Punkteprogramm befindet sich
      aktuell noch im Aufbau. Wenn du bereits
      mit deinem Kundenkonto Reiseguides kaufst,
      gehen deine Bestellungen aber nicht
      verloren.
    </p>

    <div className="shop-account-points__notice">
      Sobald das Punkteprogramm startet,
      berücksichtigen wir deine bisherigen
      Bestellungen mit diesem Kundenkonto.
      Du kannst also schon jetzt einkaufen
      und später von deinen gesammelten
      Vorteilen profitieren.
    </div>
  </div>
</section>

            <section
              className="shop-account-section"
              id="einstellungen"
            >
              <div className="shop-account-section__header">
                <div>
                  <p className="shop-account-section__eyebrow">
                    Deine persönlichen Daten
                  </p>

                  <h2>
                    Kontoeinstellungen
                  </h2>

                  <p>
                    Bearbeite deine Profildaten direkt
                    hier und speichere deine Änderungen.
                  </p>
                </div>

                <span className="shop-account-section__header-icon">
                  <FiSettings aria-hidden="true" />
                </span>
              </div>

              <form
                className="shop-account-profile-form"
                onSubmit={
                  handleSaveProfile
                }
              >
                <div className="shop-account-form-group">
                  <div className="shop-account-form-heading">
                    <span>
                      <FiUser aria-hidden="true" />
                    </span>

                    <div>
                      <h3>
                        Persönliche Daten
                      </h3>

                      <p>
                        Diese Angaben werden in deinem
                        Kundenprofil gespeichert.
                      </p>
                    </div>
                  </div>

                  <div className="shop-account-form-grid">
                    <label className="shop-account-field">
                      <span>Vorname</span>

                      <div>
                        <FiEdit3 aria-hidden="true" />

                        <input
                          type="text"
                          name="firstName"
                          autoComplete="given-name"
                          value={
                            profileForm.firstName
                          }
                          onChange={
                            handleProfileChange
                          }
                          required
                        />
                      </div>
                    </label>

                    <label className="shop-account-field">
                      <span>Nachname</span>

                      <div>
                        <FiEdit3 aria-hidden="true" />

                        <input
                          type="text"
                          name="lastName"
                          autoComplete="family-name"
                          value={
                            profileForm.lastName
                          }
                          onChange={
                            handleProfileChange
                          }
                        />
                      </div>
                    </label>

                    <label className="shop-account-field shop-account-field--full">
                      <span>E-Mail-Adresse</span>

                      <div className="shop-account-field__readonly">
                        <FiMail aria-hidden="true" />

                        <input
                          type="email"
                          value={
                            currentUser?.email ||
                            ""
                          }
                          readOnly
                        />
                      </div>

                      <small>
                        Die Login-E-Mail kann aus
                        Sicherheitsgründen nicht direkt
                        in diesem Formular geändert werden.
                      </small>
                    </label>

                  </div>
                </div>

                <div className="shop-account-form-group">
                  <div className="shop-account-form-heading">
                    <span>
                      <FiMapPin aria-hidden="true" />
                    </span>

                    <div>
                      <h3>
                        Anschrift
                      </h3>

                      <p>
                        Die Anschrift kann später
                        automatisch für Rechnungen
                        verwendet werden.
                      </p>
                    </div>
                  </div>

                  <div className="shop-account-form-grid">
                    <label className="shop-account-field shop-account-field--street">
                      <span>Straße</span>

                      <div>
                        <FiMapPin aria-hidden="true" />

                        <input
                          type="text"
                          name="street"
                          autoComplete="address-line1"
                          value={
                            profileForm.street
                          }
                          onChange={
                            handleProfileChange
                          }
                        />
                      </div>
                    </label>

                    <label className="shop-account-field shop-account-field--number">
                      <span>
                        Hausnummer
                      </span>

                      <div>
                        <input
                          type="text"
                          name="houseNumber"
                          value={
                            profileForm.houseNumber
                          }
                          onChange={
                            handleProfileChange
                          }
                        />
                      </div>
                    </label>

                    <label className="shop-account-field shop-account-field--postal">
                      <span>Postleitzahl</span>

                      <div>
                        <input
                          type="text"
                          name="postalCode"
                          autoComplete="postal-code"
                          value={
                            profileForm.postalCode
                          }
                          onChange={
                            handleProfileChange
                          }
                        />
                      </div>
                    </label>

                    <label className="shop-account-field shop-account-field--city">
                      <span>Ort</span>

                      <div>
                        <FiMapPin aria-hidden="true" />

                        <input
                          type="text"
                          name="city"
                          autoComplete="address-level2"
                          value={
                            profileForm.city
                          }
                          onChange={
                            handleProfileChange
                          }
                        />
                      </div>
                    </label>

                    <label className="shop-account-field shop-account-field--full">
                      <span>Land</span>

                      <div>
                        <FiMapPin aria-hidden="true" />

                        <input
                          type="text"
                          name="country"
                          autoComplete="country-name"
                          value={
                            profileForm.country
                          }
                          onChange={
                            handleProfileChange
                          }
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {profileMessage && (
                  <div
                    className={`shop-account-message shop-account-message--${profileStatus}`}
                    role={
                      profileStatus ===
                      "error"
                        ? "alert"
                        : "status"
                    }
                  >
                    {profileStatus ===
                      "success" && (
                      <FiCheck aria-hidden="true" />
                    )}

                    {profileMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="shop-account-save-button"
                  disabled={
                    profileStatus ===
                    "loading"
                  }
                >
                  {profileStatus ===
                  "loading" ? (
                    <FiLoader
                      className="shop-account-button-spinner"
                      aria-hidden="true"
                    />
                  ) : (
                    <FiSave aria-hidden="true" />
                  )}

                  {profileStatus ===
                  "loading"
                    ? "Änderungen werden gespeichert …"
                    : "Änderungen speichern"}
                </button>
              </form>

              <div className="shop-account-security">
                <div className="shop-account-security__content">
                  <span className="shop-account-security__icon">
                    <FiLock aria-hidden="true" />
                  </span>

                  <div>
                    <h3>
                      Passwort ändern
                    </h3>

                    <p>
                      Wir senden dir eine sichere
                      E-Mail, über die du ein neues
                      Passwort festlegen kannst.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="shop-account-secondary-button"
                  onClick={
                    handlePasswordReset
                  }
                  disabled={
                    passwordStatus ===
                    "loading"
                  }
                >
                  <FiMail aria-hidden="true" />

                  {passwordStatus ===
                  "loading"
                    ? "E-Mail wird gesendet …"
                    : "Passwort-Mail senden"}
                </button>
              </div>

              {passwordMessage && (
                <div
                  className={`shop-account-message shop-account-message--${passwordStatus}`}
                  role={
                    passwordStatus ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                >
                  {passwordMessage}
                </div>
              )}
            </section>

            <section className="shop-account-logout-section">
              <div>
                <p className="shop-account-section__eyebrow">
                  Sitzung beenden
                </p>

                <h2>
                  Vom Kundenkonto abmelden
                </h2>

                <p>
                  Deine gekauften Reiseguides und
                  Bestellungen bleiben weiterhin in
                  deinem Kundenkonto gespeichert.
                </p>
              </div>

              <button
                type="button"
                className="shop-account-logout-button"
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                <FiLogOut aria-hidden="true" />

                {logoutLoading
                  ? "Abmeldung läuft …"
                  : "Abmelden"}
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ShopAccount;