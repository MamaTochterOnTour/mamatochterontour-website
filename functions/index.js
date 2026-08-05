const {
  onCall,
  onRequest,
  HttpsError,
} = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { logger } = require("firebase-functions");

const {initializeApp} = require("firebase-admin/app");
const {
  getFirestore,
  FieldValue,
} = require("firebase-admin/firestore");
const crypto = require("crypto");

const Stripe = require("stripe");
const shopProducts = require("./shopProducts");

const BREVO_API_KEY = defineSecret("BREVO_API_KEY");

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");

const STRIPE_WEBHOOK_SECRET =
  defineSecret("STRIPE_WEBHOOK_SECRET");

/*
 * WICHTIG:
 * Hier die tatsächliche numerische ID der Brevo-Liste
 * NEWSLETTER_TEMP eintragen.
 */
const NEWSLETTER_TEMP_LIST_ID = 9;

const ORDER_EMAIL_SENDER = {
  name: "MamaTochterOnTour",
  email: "mamatochterontour@outlook.de",
};

const ORDER_EMAIL_TEMPLATE_ID = 3;

initializeApp();

const db = getFirestore();

function createCouponRedemptionId(email, code) {
  return crypto
    .createHash("sha256")
    .update(`${email}:${code}`)
    .digest("hex");
}

exports.subscribeToNewsletter = onCall(
  {
    region: "europe-west1",
    secrets: [BREVO_API_KEY],
  },
  async (request) => {
    const rawEmail = request.data?.email;

    if (typeof rawEmail !== "string") {
      throw new HttpsError(
        "invalid-argument",
        "Bitte gib eine gültige E-Mail-Adresse ein."
      );
    }

    const email = rawEmail.trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || email.length > 254) {
      throw new HttpsError(
        "invalid-argument",
        "Bitte gib eine gültige E-Mail-Adresse ein."
      );
    }

    try {
      const brevoResponse = await fetch(
        "https://api.brevo.com/v3/contacts",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": BREVO_API_KEY.value(),
          },
          body: JSON.stringify({
            email,
            listIds: [NEWSLETTER_TEMP_LIST_ID],
            updateEnabled: true,
          }),
        }
      );

      /*
       * Brevo antwortet bei einer erfolgreichen Erstellung
       * beziehungsweise Aktualisierung unter anderem mit 201 oder 204.
       */
      if (brevoResponse.ok) {
        return {
          success: true,
          message:
            "Fast geschafft! Bitte bestätige deine Anmeldung über die E-Mail, die wir dir gerade geschickt haben.",
        };
      }

      const brevoErrorText = await brevoResponse.text();

      logger.error("Brevo newsletter subscription failed", {
        status: brevoResponse.status,
        response: brevoErrorText,
      });

      throw new HttpsError(
        "internal",
        "Die Anmeldung konnte gerade nicht abgeschlossen werden. Bitte versuche es später erneut."
      );
    } catch (error) {
      if (error instanceof HttpsError) {
        throw error;
      }

      logger.error("Unexpected newsletter subscription error", error);

      throw new HttpsError(
        "internal",
        "Die Anmeldung konnte gerade nicht abgeschlossen werden. Bitte versuche es später erneut."
      );
    }
  }
);

exports.validateCoupon = onCall(
  {
    region: "europe-west1",
    secrets: [BREVO_API_KEY],
  },
  async (request) => {
    const email = String(
      request.data?.email || ""
    )
      .trim()
      .toLowerCase();

    const code = String(
      request.data?.code || ""
    )
      .trim()
      .toUpperCase();

    if (!email || !code) {
      throw new HttpsError(
        "invalid-argument",
        "E-Mail und Gutscheincode fehlen."
      );
    }

    if (code !== "WILLKOMMEN10") {
      return {
        valid: false,
        message: "Ungültiger Rabattcode.",
      };
    }

    try {
      const response = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
        {
          headers: {
            accept: "application/json",
            "api-key": BREVO_API_KEY.value(),
          },
        }
      );

      if (!response.ok) {
        return {
          valid: false,
          message:
            "Diese E-Mail ist nicht für den Newsletter registriert.",
        };
      }

      const contact = await response.json();

      const listIds = Array.isArray(contact.listIds)
        ? contact.listIds
        : [];

      if (!listIds.includes(6)) {
        return {
          valid: false,
          message:
            "Dieser Rabattcode ist nur für bestätigte Newsletter-Abonnenten gültig.",
        };
      }

      const redemptionId =
        createCouponRedemptionId(
          email,
          code
        );

      const redemptionReference = db
        .collection("couponRedemptions")
        .doc(redemptionId);

      const redemptionSnapshot =
        await redemptionReference.get();

      if (
        redemptionSnapshot.exists &&
        redemptionSnapshot.data()?.status ===
          "redeemed"
      ) {
        return {
          valid: false,
          message:
            "Dieser Rabattcode wurde mit dieser E-Mail-Adresse bereits eingelöst.",
        };
      }

      return {
        valid: true,
        discountPercent: 10,
        message:
          "Dein Rabatt von 10 % wurde angewendet.",
      };
    } catch (error) {
      logger.error(
        "Coupon validation failed",
        error
      );

      throw new HttpsError(
        "internal",
        "Rabattcode konnte nicht geprüft werden."
      );
    }
  }
);

function calculateServerDiscount({
  products,
  couponPercent = 0,
}) {
  const subtotalInCents =
    products.reduce(
      (total, product) =>
        total +
        Number(
          product.priceInCents || 0
        ),
      0
    );

  /*
   * Mengenrabatt:
   * Nur Produkte der Gruppe "quantity".
   */
  const quantityProducts =
    products.filter(
      (product) =>
        product.discountGroup ===
        "quantity"
    );

  const quantitySubtotalInCents =
    quantityProducts.reduce(
      (total, product) =>
        total +
        Number(
          product.priceInCents || 0
        ),
      0
    );

  let quantityPercent = 0;

  if (
    quantityProducts.length >= 5
  ) {
    quantityPercent = 15;
  } else if (
    quantityProducts.length >= 3
  ) {
    quantityPercent = 10;
  }

  const quantityDiscountInCents =
    Math.round(
      quantitySubtotalInCents *
        (quantityPercent / 100)
    );

  /*
   * Bundle:
   * Ein AIDA-Guide plus der teuerste
   * Kreuzfahrt-Guide.
   */
  const aidaProducts =
    products.filter(
      (product) =>
        product.discountGroup ===
        "aida"
    );

  const cruiseProducts =
    products.filter(
      (product) =>
        product.discountGroup ===
        "cruise"
    );

  const mostExpensiveAida =
    [...aidaProducts].sort(
      (a, b) =>
        Number(b.priceInCents) -
        Number(a.priceInCents)
    )[0];

  const mostExpensiveCruise =
    [...cruiseProducts].sort(
      (a, b) =>
        Number(b.priceInCents) -
        Number(a.priceInCents)
    )[0];

  const bundleComplete = Boolean(
    mostExpensiveAida &&
      mostExpensiveCruise
  );

  const bundleSubtotalInCents =
    bundleComplete
      ? Number(
          mostExpensiveAida
            .priceInCents
        ) +
        Number(
          mostExpensiveCruise
            .priceInCents
        )
      : 0;

  const bundleDiscountInCents =
    Math.round(
      bundleSubtotalInCents * 0.1
    );

  /*
   * Newsletter-Gutschein:
   * Gilt auf die komplette Bestellung.
   */
  const couponDiscountInCents =
    Math.round(
      subtotalInCents *
        (
          Math.max(
            0,
            Number(couponPercent) || 0
          ) / 100
        )
    );

  const candidates = [];

  if (
    quantityDiscountInCents > 0
  ) {
    candidates.push({
      type: "quantity",
      label: "Mengenrabatt",
      percent: quantityPercent,
      amountInCents:
        quantityDiscountInCents,
      priority: 3,
    });
  }

  if (
    bundleDiscountInCents > 0
  ) {
    candidates.push({
      type: "bundle",
      label:
        "Kreuzfahrt-Bundle",
      percent: 10,
      amountInCents:
        bundleDiscountInCents,
      priority: 2,
    });
  }

  if (
    couponDiscountInCents > 0
  ) {
    candidates.push({
      type: "coupon",
      label:
        "Willkommensrabatt",
      percent:
        Number(couponPercent) || 0,
      amountInCents:
        couponDiscountInCents,
      priority: 1,
    });
  }

  candidates.sort((a, b) => {
    if (
      b.amountInCents !==
      a.amountInCents
    ) {
      return (
        b.amountInCents -
        a.amountInCents
      );
    }

    return b.priority - a.priority;
  });

  const appliedDiscount =
    candidates[0] || {
      type: "none",
      label: "",
      percent: 0,
      amountInCents: 0,
    };

  return {
    subtotalInCents,
    appliedDiscount,
  };
}

exports.createCheckoutSession = onCall(
  
  {
    region: "europe-west1",
    secrets: [
      STRIPE_SECRET_KEY,
      BREVO_API_KEY,
    ],
  },
  async (request) => {
  const rawProductIds =
    request.data?.productIds;

  const digitalContentConsent =
  request.data?.digitalContentConsent === true;

const digitalContentConsentAt =
  String(
    request.data?.digitalContentConsentAt || ""
  ).trim();

if (!digitalContentConsent) {
  throw new HttpsError(
    "failed-precondition",
    "Bitte bestätige die sofortige Bereitstellung der digitalen Reiseguides."
  );
}

    if (
  !Array.isArray(rawProductIds) ||
  rawProductIds.length === 0
) {
  throw new HttpsError(
    "invalid-argument",
    "Der Warenkorb ist leer."
  );
}

  const rawCheckoutMode =
    request.data?.checkoutMode;

  const checkoutMode =
    rawCheckoutMode === "account"
      ? "account"
      : "guest";

  if (
    checkoutMode === "account" &&
    !request.auth?.uid
  ) {
    throw new HttpsError(
      "unauthenticated",
      "Bitte melde dich zuerst mit deinem Kundenkonto an."
    );
  }

  const email = String(
  request.data?.email || ""
)
  .trim()
  .toLowerCase();

const authenticatedEmail = String(
  request.auth?.token?.email || ""
)
  .trim()
  .toLowerCase();

const checkoutEmail =
  checkoutMode === "account"
    ? authenticatedEmail
    : email;

    const checkoutEmailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (
  !checkoutEmailPattern.test(
    checkoutEmail
  ) ||
  checkoutEmail.length > 254
) {
  throw new HttpsError(
    "invalid-argument",
    "Für die Bestellung fehlt eine gültige E-Mail-Adresse."
  );
}

const couponCode = String(
  request.data?.couponCode || ""
)
  .trim()
  .toUpperCase();

    /*
     * Doppelte Produkt-IDs entfernen.
     * Bei digitalen Reiseguides wird jedes Produkt
     * maximal einmal gekauft.
     */
    const productIds = [
      ...new Set(
        rawProductIds.map((productId) =>
          String(productId)
        )
      ),
    ];

    if (productIds.length > 50) {
      throw new HttpsError(
        "invalid-argument",
        "Der Warenkorb enthält zu viele Produkte."
      );
    }

    const selectedProducts = productIds.map(
      (productId) => {
        const product = shopProducts[productId];

        if (!product) {
          throw new HttpsError(
            "invalid-argument",
            `Das Produkt ${productId} ist nicht verfügbar.`
          );
        }

        return {
          id: productId,
          ...product,
        };
      }
    );

    const stripe = new Stripe(
  STRIPE_SECRET_KEY.value()
);

    let verifiedCouponPercent = 0;

if (
  couponCode === "WILLKOMMEN10"
) {
  const response = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(checkoutEmail)}`,
    {
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY.value(),
      },
    }
  );

  if (!response.ok) {
    throw new HttpsError(
      "permission-denied",
      "Dieser Rabattcode ist ungültig."
    );
  }

  const contact = await response.json();

const contactListIds = Array.isArray(
  contact.listIds
)
  ? contact.listIds
  : [];

if (!contactListIds.includes(6)) {
  throw new HttpsError(
    "permission-denied",
    "Dieser Rabattcode ist ungültig."
  );
}

  const redemptionId =
  createCouponRedemptionId(
    checkoutEmail,
    couponCode
  );

  const redemption =
    await db
      .collection(
        "couponRedemptions"
      )
      .doc(redemptionId)
      .get();

  if (
  redemption.exists &&
  redemption.data()?.status ===
    "redeemed"
) {
  throw new HttpsError(
    "permission-denied",
    "Dieser Rabattcode wurde bereits verwendet."
  );
}

verifiedCouponPercent = 10;
}

const {
  subtotalInCents:
    calculatedSubtotalInCents,
  appliedDiscount,
} = calculateServerDiscount({
  products:
    selectedProducts,
  couponPercent:
    verifiedCouponPercent,
});

let stripeDiscounts = [];
let createdStripeCouponId = "";

const lineItems = selectedProducts.map(
  (product) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: product.title,
        description:
          "Digitaler Reiseguide als PDF",
      },
      unit_amount:
        product.priceInCents,
    },
    quantity: 1,
  })
);

try {
  if (
    appliedDiscount.amountInCents > 0
  ) {
    const stripeCoupon =
      await stripe.coupons.create({
        amount_off:
          appliedDiscount
            .amountInCents,

        currency: "eur",

        duration: "once",

        name:
          appliedDiscount.label,

        max_redemptions: 1,

        metadata: {
          discountType:
            appliedDiscount.type,

          discountPercent:
            String(
              appliedDiscount.percent
            ),

          checkoutEmail,

          productIds:
            productIds.join(","),
        },
      });

    createdStripeCouponId =
      stripeCoupon.id;

    stripeDiscounts = [
      {
        coupon:
          stripeCoupon.id,
      },
    ];
  }

  const session =
    await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      discounts: stripeDiscounts,

      customer_creation: "always",

      customer_email: checkoutEmail,

      billing_address_collection:
        "required",

      name_collection: {
        individual: {
          enabled: true,
          optional: false,
        },
      },

      success_url:
        "http://localhost:5173/shop/checkout-erfolgreich" +
        "?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "http://localhost:5173/shop/warenkorb",

      metadata: {
        productIds:
          productIds.join(","),

        checkoutEmail,

        checkoutMode,

        couponCode:
          appliedDiscount.type ===
            "coupon"
            ? couponCode
            : "",

        discountType:
          appliedDiscount.type,

        discountLabel:
          appliedDiscount.label ||
          "",

        discountPercent:
          String(
            appliedDiscount.percent ||
              0
          ),

        discountAmountInCents:
          String(
            appliedDiscount
              .amountInCents || 0
          ),

        calculatedSubtotalInCents:
          String(
            calculatedSubtotalInCents
          ),

        stripeCouponId:
          createdStripeCouponId,

        userId:
          checkoutMode === "account"
            ? request.auth.uid
            : "",

        digitalContentConsent:
          "true",

        digitalContentConsentAt:
          digitalContentConsentAt ||
          new Date().toISOString(),
      },
    });

  if (!session.url) {
    throw new Error(
      "Stripe hat keine Checkout-URL zurückgegeben."
    );
  }

  return {
    success: true,
    checkoutUrl: session.url,
  };
} catch (error) {
  logger.error(
    "Stripe checkout session creation failed",
    error
  );

  throw new HttpsError(
    "internal",
    "Der Bezahlvorgang konnte nicht gestartet werden."
  );
}
  }
);

function formatMoney(
  amountInCents,
  currency = "eur"
) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency:
      String(currency || "eur").toUpperCase(),
  }).format(
    Number(amountInCents || 0) / 100
  );
}

function formatOrderDate(timestampInSeconds) {
  const timestamp =
    Number(timestampInSeconds) || 0;

  const date = timestamp > 0
    ? new Date(timestamp * 1000)
    : new Date();

  return new Intl.DateTimeFormat(
    "de-DE",
    {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).format(date);
}

function formatConsentDate(isoDate) {
  const parsedDate = new Date(isoDate);

  if (
    !isoDate ||
    Number.isNaN(parsedDate.getTime())
  ) {
    return "Im Rahmen des Bestellvorgangs";
  }

  return new Intl.DateTimeFormat(
    "de-DE",
    {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(parsedDate);
}

function getFirstName(customerName) {
  const normalizedName = String(
    customerName || ""
  ).trim();

  if (!normalizedName) {
    return "Reisefan";
  }

  return normalizedName.split(/\s+/)[0];
}

function getCountryName(countryCode) {
  const normalizedCountry = String(
    countryCode || ""
  )
    .trim()
    .toUpperCase();

  if (!normalizedCountry) {
    return "";
  }

  try {
    const regionNames =
      new Intl.DisplayNames(
        ["de"],
        {
          type: "region",
        }
      );

    return (
      regionNames.of(normalizedCountry) ||
      normalizedCountry
    );
  } catch {
    return normalizedCountry;
  }
}

function getPaymentMethodLabel() {
  return "Online-Zahlung";
}

function getShopProduct(productId) {
  /*
   * Unterstützt sowohl:
   *
   * {
   *   "produkt-id": {...}
   * }
   *
   * als auch:
   *
   * [
   *   { id: "produkt-id", ... }
   * ]
   */
  if (Array.isArray(shopProducts)) {
    return shopProducts.find(
      (product) =>
        String(product.id) ===
        String(productId)
    );
  }

  return shopProducts[
    String(productId)
  ] || null;
}

function getProductPriceInCents(product) {
  if (
    Number.isFinite(
      Number(product?.priceInCents)
    )
  ) {
    return Number(product.priceInCents);
  }

  return Math.round(
    Number(product?.price || 0) * 100
  );
}

async function sendOrderConfirmationEmail({
  recipientEmail,
  recipientName,
  templateParams,
}) {
  const brevoResponse = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",

      headers: {
        accept: "application/json",
        "content-type":
          "application/json",
        "api-key":
          BREVO_API_KEY.value(),
      },

      body: JSON.stringify({
        sender: ORDER_EMAIL_SENDER,

        to: [
          {
            email: recipientEmail,
            name:
              recipientName ||
              recipientEmail,
          },
        ],

        replyTo: {
          name: "MamaTochterOnTour",
          email:
            "mamatochterontour@outlook.de",
        },

        templateId:
          ORDER_EMAIL_TEMPLATE_ID,

        params: templateParams,

        tags: [
          "onlineshop",
          "bestellbestaetigung",
        ],
      }),
    }
  );

  const responseText =
    await brevoResponse.text();

  if (!brevoResponse.ok) {
    logger.error(
      "Brevo order confirmation failed",
      {
        status:
          brevoResponse.status,

        response:
          responseText,

        recipientEmail,

        templateId:
          ORDER_EMAIL_TEMPLATE_ID,
      }
    );

    throw new Error(
      "Bestellbestätigung konnte nicht versendet werden."
    );
  }

  let responseData = null;

  try {
    responseData =
      responseText
        ? JSON.parse(responseText)
        : null;
  } catch {
    responseData = null;
  }

  return responseData;
}

exports.stripeWebhook = onRequest(
  {
    region: "europe-west1",
    secrets: [
      STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET,
      BREVO_API_KEY,
    ],
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response
        .status(405)
        .send("Method not allowed");

      return;
    }

    const signature =
      request.headers["stripe-signature"];

    if (!signature) {
      response
        .status(400)
        .send("Stripe signature fehlt.");

      return;
    }

    const stripe = new Stripe(
      STRIPE_SECRET_KEY.value()
    );

    let event;

    try {
      event =
        stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          STRIPE_WEBHOOK_SECRET.value()
        );
    } catch (error) {
      logger.error(
        "Stripe webhook signature verification failed",
        error
      );

      response
        .status(400)
        .send(
          "Webhook-Signatur ungültig."
        );

      return;
    }

    if (
      event.type !==
      "checkout.session.completed"
    ) {
      response.status(200).json({
        received: true,
      });

      return;
    }

    const session =
      event.data.object;

    const paymentIsSuccessful =
      session.payment_status ===
        "paid" ||
      session.payment_status ===
        "no_payment_required";

    if (!paymentIsSuccessful) {
      response.status(200).json({
        received: true,
        processed: false,
        reason:
          "payment_not_successful",
      });

      return;
    }

    const couponCode = String(
      session.metadata?.couponCode ||
        ""
    )
      .trim()
      .toUpperCase();

    const appliedDiscountType =
  String(
    session.metadata
      ?.discountType || "none"
  ).trim();

    const email = String(
      session.customer_details?.email ||
        session.customer_email ||
        session.metadata?.checkoutEmail ||
        ""
    )
      .trim()
      .toLowerCase();

    const checkoutMode = String(
      session.metadata?.checkoutMode ||
        "guest"
    );

    const userId = String(
      session.metadata?.userId || ""
    ).trim();

    const productIds = String(
      session.metadata?.productIds || ""
    )
      .split(",")
      .map((productId) =>
        productId.trim()
      )
      .filter(Boolean);

    if (!email) {
      logger.error(
        "Order has no customer email",
        {
          stripeSessionId:
            session.id,
        }
      );

      response
        .status(500)
        .send(
          "Für die Bestellung fehlt eine E-Mail-Adresse."
        );

      return;
    }

    const customerName = String(
  session.customer_details?.individual_name ||
    session.customer_details?.name ||
    ""
).trim();

const billingAddress =
  session.customer_details?.address || {};

const digitalContentConsent =
  session.metadata?.digitalContentConsent ===
  "true";

const digitalContentConsentAt = String(
  session.metadata?.digitalContentConsentAt ||
    ""
).trim();

    if (productIds.length === 0) {
      logger.error(
        "Order has no products",
        {
          stripeSessionId:
            session.id,
        }
      );

      response
        .status(500)
        .send(
          "Für die Bestellung fehlen Produkte."
        );

      return;
    }

    const products = productIds.map(
      (productId) => {
        const product =
          getShopProduct(productId);

        if (!product) {
          throw new Error(
            `Produkt ${productId} wurde nicht gefunden.`
          );
        }

        return {
  id: productId,

  title:
    product.title ||
    "Digitaler Reiseguide",

  priceInCents:
    getProductPriceInCents(
      product
    ),

  format:
    product.format || "PDF",

  imageUrl:
    product.imageUrl || "",

  pdfUrl:
    product.pdfUrl || "",
};
      }
    );

    const missingDownload =
      products.find(
        (product) =>
          !product.pdfUrl
      );

    if (missingDownload) {
      logger.error(
        "Product has no PDF URL",
        {
          productId:
            missingDownload.id,
          stripeSessionId:
            session.id,
        }
      );

      response
        .status(500)
        .send(
          "Für einen Reiseguide fehlt der Downloadlink."
        );

      return;
    }

    const subtotalInCents =
      Number(
        session.amount_subtotal
      ) ||
      products.reduce(
        (sum, product) =>
          sum +
          product.priceInCents,
        0
      );

    const totalInCents =
      Number(
        session.amount_total
      ) || 0;

    const discountInCents =
      Number(
        session.total_details
          ?.amount_discount
      ) ||
      Math.max(
        0,
        subtotalInCents -
          totalInCents
      );

    const currency =
      session.currency || "eur";

    const orderReference = db
  .collection("shopOrders")
  .doc(session.id);

try {
  /*
   * 1. Bestellung und Kaufdaten
   *    idempotent speichern.
   */

  let orderNumber = null;

  const counterReference = db
    .collection("shopSystem")
    .doc("counters");

  orderNumber = await db.runTransaction(
    async (transaction) => {
      const orderSnapshot =
        await transaction.get(
          orderReference
        );

      /*
       * Falls die Bestellung bereits gespeichert
       * wurde, verwenden wir ihre vorhandene
       * Bestellnummer.
       */
      let effectiveOrderNumber;
      let orderAlreadyExists =
        orderSnapshot.exists;

      if (orderAlreadyExists) {
        effectiveOrderNumber =
          orderSnapshot.data()
            ?.orderNumber;

        if (!effectiveOrderNumber) {
          throw new Error(
            "Die vorhandene Bestellung besitzt keine Bestellnummer."
          );
        }
      } else {
        /*
         * Nur bei einer neuen Bestellung muss
         * der fortlaufende Zähler gelesen und
         * erhöht werden.
         */
        const counterSnapshot =
          await transaction.get(
            counterReference
          );

        const currentYear =
          new Date().getFullYear();

        const counterData =
          counterSnapshot.exists
            ? counterSnapshot.data()
            : {};

        const savedYear =
          Number(
            counterData.orderYear
          ) || 0;

        const savedNumber =
          Number(
            counterData.orderNumber
          ) || 0;

        const nextNumber =
          savedYear === currentYear
            ? savedNumber + 1
            : 1;

        effectiveOrderNumber =
          `MTT-B-${currentYear}-${String(
            nextNumber
          ).padStart(6, "0")}`;

        transaction.set(
          counterReference,
          {
            orderYear:
              currentYear,

            orderNumber:
              nextNumber,

            updatedAt:
              FieldValue
                .serverTimestamp(),
          },
          {
            merge: true,
          }
        );

        transaction.set(
          orderReference,
          {
            orderNumber:
              effectiveOrderNumber,

            stripeSessionId:
              session.id,

            customerName,

            billingAddress: {
              line1:
                billingAddress.line1 ||
                "",

              line2:
                billingAddress.line2 ||
                "",

              postalCode:
                billingAddress.postal_code ||
                "",

              city:
                billingAddress.city ||
                "",

              state:
                billingAddress.state ||
                "",

              country:
                billingAddress.country ||
                "",
            },

            digitalContentConsent,

            digitalContentConsentAt,

            digitalContentConsentText:
              "Ich stimme ausdrücklich zu, dass MamaTochterOnTour vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrags beginnt. Mir ist bekannt, dass ich mit Beginn der Bereitstellung der digitalen Reiseguides mein Widerrufsrecht verliere.",

            stripeEventId:
              event.id,

            stripePaymentIntentId:
              session.payment_intent ||
              "",

            checkoutMode,

            userId:
              checkoutMode ===
                "account"
                ? userId
                : "",

            customerEmail:
              email,

            productIds,

            products,

            amountSubtotal:
              subtotalInCents,

            amountDiscount:
              discountInCents,

            amountTotal:
              totalInCents,

            currency,

            couponCode,

            discountType:
  appliedDiscountType,

discountLabel:
  String(
    session.metadata
      ?.discountLabel || ""
  ),

discountPercent:
  Number(
    session.metadata
      ?.discountPercent || 0
  ),

stripeCouponId:
  String(
    session.metadata
      ?.stripeCouponId || ""
  ),

            paymentStatus:
              session.payment_status,

            confirmationEmailStatus:
              "pending",

            confirmationEmailSent:
              false,

            confirmationEmailAttemptCount:
              0,

            createdAt:
              FieldValue
                .serverTimestamp(),

            updatedAt:
              FieldValue
                .serverTimestamp(),
          }
        );
      }

      /*
       * Newsletter-Gutschein als eingelöst
       * markieren.
       */
      if (
  appliedDiscountType ===
    "coupon" &&
  couponCode ===
    "WILLKOMMEN10" &&
  email
) {
        const redemptionId =
          createCouponRedemptionId(
            email,
            couponCode
          );

        const redemptionReference =
          db
            .collection(
              "couponRedemptions"
            )
            .doc(redemptionId);

        transaction.set(
          redemptionReference,
          {
            status: "redeemed",

            couponCode,

            email,

            stripeSessionId:
              session.id,

            orderNumber:
              effectiveOrderNumber,

            redeemedAt:
              FieldValue
                .serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      }

      /*
       * Kauf beim Benutzerkonto speichern.
       */
      if (
        checkoutMode ===
          "account" &&
        userId
      ) {
        const userReference = db
          .collection("shopUsers")
          .doc(userId);

        const purchaseReference =
          userReference
            .collection(
              "purchases"
            )
            .doc(session.id);

        transaction.set(
          purchaseReference,
          {
            orderNumber:
              effectiveOrderNumber,

            stripeSessionId:
              session.id,

            customerName,

            billingAddress: {
              line1:
                billingAddress.line1 ||
                "",

              line2:
                billingAddress.line2 ||
                "",

              postalCode:
                billingAddress.postal_code ||
                "",

              city:
                billingAddress.city ||
                "",

              state:
                billingAddress.state ||
                "",

              country:
                billingAddress.country ||
                "",
            },

            digitalContentConsent,

            digitalContentConsentAt,

            digitalContentConsentText:
              "Ich stimme ausdrücklich zu, dass MamaTochterOnTour vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrags beginnt. Mir ist bekannt, dass ich mit Beginn der Bereitstellung der digitalen Reiseguides mein Widerrufsrecht verliere.",

            productIds,

            customerEmail:
              email,

            amountSubtotal:
              subtotalInCents,

            amountDiscount:
              discountInCents,

            discountType:
  appliedDiscountType,

discountLabel:
  String(
    session.metadata
      ?.discountLabel || ""
  ),

discountPercent:
  Number(
    session.metadata
      ?.discountPercent || 0
  ),

stripeCouponId:
  String(
    session.metadata
      ?.stripeCouponId || ""
  ),

couponCode,

            amountTotal:
              totalInCents,

            currency,

            paymentStatus:
              session.payment_status,

            purchasedAt:
              FieldValue
                .serverTimestamp(),
          },
          {
            merge: true,
          }
        );

        transaction.set(
          userReference,
          {
            purchasedGuideIds:
              FieldValue.arrayUnion(
                ...productIds
              ),

            updatedAt:
              FieldValue
                .serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      }

      /*
       * Stripe-Ereignis protokollieren.
       */
      const eventReference = db
        .collection(
          "stripeWebhookEvents"
        )
        .doc(event.id);

      transaction.set(
        eventReference,
        {
          eventType:
            event.type,

          stripeSessionId:
            session.id,

          orderNumber:
            effectiveOrderNumber,

          processedAt:
            FieldValue
              .serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      return effectiveOrderNumber;
    }
  );

  if (!orderNumber) {
    throw new Error(
      "Für die Bestellung konnte keine Bestellnummer erstellt werden."
    );
  }
      

      /*
       * 2. Exklusiv den E-Mail-Versand
       *    für diese Function reservieren.
       */
      const shouldSendEmail =
        await db.runTransaction(
          async (transaction) => {
            const orderSnapshot =
              await transaction.get(
                orderReference
              );

            if (
              !orderSnapshot.exists
            ) {
              throw new Error(
                "Bestellung wurde nicht gespeichert."
              );
            }

            const orderData =
              orderSnapshot.data();

            if (
              orderData
                .confirmationEmailSent ===
              true
            ) {
              return false;
            }

            const emailStatus =
  orderData
    .confirmationEmailStatus;

const emailUpdatedAt =
  orderData
    .confirmationEmailUpdatedAt
    ?.toDate?.();

const sendingStartedRecently =
  emailStatus === "sending" &&
  emailUpdatedAt instanceof Date &&
  Date.now() -
    emailUpdatedAt.getTime() <
    10 * 60 * 1000;

if (sendingStartedRecently) {
  return false;
}

           transaction.update(
  orderReference,
  {
    confirmationEmailStatus:
      "sending",

    confirmationEmailError:
      null,

    confirmationEmailAttemptCount:
      FieldValue.increment(1),

    confirmationEmailUpdatedAt:
      FieldValue
        .serverTimestamp(),

    updatedAt:
      FieldValue
        .serverTimestamp(),
  }
);
            return true;
          }
        );

      if (shouldSendEmail) {
        try {
          const formattedProducts =
  products.map((product) => ({
    title:
      product.title,

    format:
      product.format || "PDF",

    price:
      formatMoney(
        product.priceInCents,
        currency
      ),

    imageUrl:
      product.imageUrl || "",

    downloadUrl:
      product.pdfUrl,
  }));

const firstName =
  getFirstName(customerName);

const paymentMethod =
  getPaymentMethodLabel();

const discountLabel =
  String(
    session.metadata
      ?.discountLabel || ""
  ).trim();

const templateParams = {
  firstName,

  customerName:
    customerName ||
    firstName,

  customerEmail:
    email,

  orderNumber,

  orderDate:
    formatOrderDate(
      session.created
    ),

  paymentMethod,

  products:
    formattedProducts,

  subtotal:
    formatMoney(
      subtotalInCents,
      currency
    ),

  hasDiscount:
    discountInCents > 0,

  discount:
    formatMoney(
      discountInCents,
      currency
    ),

  discountLabel,

  total:
    formatMoney(
      totalInCents,
      currency
    ),

  billingLine1:
    billingAddress.line1 || "",

  billingLine2:
    billingAddress.line2 || "",

  billingPostalCode:
    billingAddress.postal_code ||
    "",

  billingCity:
    billingAddress.city || "",

  billingCountry:
    getCountryName(
      billingAddress.country
    ),

  digitalContentConsentAt:
    formatConsentDate(
      digitalContentConsentAt
    ),

  invoiceNotice:
    "Deine Rechnung wird dir nach der Erstellung separat zur Verfügung gestellt.",

  /*
   * Hier unbedingt deine echten
   * Unternehmensangaben einsetzen.
   */
  businessName:
    "Jennifer Weinreich",

  businessAddress:
    "Stettiner Straße 41",

  businessPostalCode:
    "35410",

  businessCity:
    "Hungen",

  currentYear:
    String(
      new Date().getFullYear()
    ),
};

const brevoResult =
  await sendOrderConfirmationEmail({
    recipientEmail:
      email,

    recipientName:
      customerName,

    templateParams,
  });

          await orderReference.update({
            confirmationEmailStatus:
              "sent",

            confirmationEmailSent:
              true,

            confirmationEmailSentAt:
              FieldValue
                .serverTimestamp(),

            confirmationEmailTemplateId:
              ORDER_EMAIL_TEMPLATE_ID,

            confirmationEmailMessageId:
              brevoResult?.messageId ||
              "",

            updatedAt:
              FieldValue
                .serverTimestamp(),
          });
        } catch (emailError) {
          await orderReference.update({
            confirmationEmailStatus:
              "failed",

            confirmationEmailSent:
              false,

            confirmationEmailError:
              String(
                emailError?.message ||
                  emailError
              ),

            confirmationEmailUpdatedAt:
              FieldValue
                .serverTimestamp(),

            updatedAt:
              FieldValue
                .serverTimestamp(),
          });

          throw emailError;
        }
      }

      response.status(200).json({
        received: true,
        processed: true,
        orderNumber,
        confirmationEmail:
          shouldSendEmail
            ? "sent"
            : "already_processed",
      });
    } catch (error) {
      logger.error(
        "Stripe webhook processing failed",
        {
          error:
            error?.message ||
            String(error),

          stripeSessionId:
            session.id,

          stripeEventId:
            event.id,
        }
      );

      /*
       * Stripe darf den Webhook später
       * erneut zustellen, wenn Speicherung
       * oder E-Mail-Versand fehlschlagen.
       */
      response
        .status(500)
        .send(
          "Webhook konnte nicht verarbeitet werden."
        );
    }
  }
);

exports.getCheckoutSession = onCall(
  {
    region: "europe-west1",
    secrets: [STRIPE_SECRET_KEY],
  },
  async (request) => {
    const sessionId = String(
      request.data?.sessionId || ""
    ).trim();

    if (
      !sessionId ||
      !sessionId.startsWith("cs_")
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Die Checkout-Session ist ungültig."
      );
    }

    try {
      const stripe = new Stripe(
        STRIPE_SECRET_KEY.value()
      );

      const session =
        await stripe.checkout.sessions.retrieve(
          sessionId
        );

      const paymentIsSuccessful =
        session.payment_status === "paid" ||
        session.payment_status ===
          "no_payment_required";

      if (!paymentIsSuccessful) {
        return {
          paid: false,
          paymentStatus:
            session.payment_status || "unpaid",
        };
      }

      const productIds = String(
        session.metadata?.productIds || ""
      )
        .split(",")
        .map((productId) => productId.trim())
        .filter(Boolean);

      const customerEmail =
        session.customer_details?.email ||
        session.customer_email ||
        session.metadata?.checkoutEmail ||
        "";

      return {
        paid: true,
        sessionId: session.id,
        customerEmail,
        amountTotal: session.amount_total || 0,
        currency: session.currency || "eur",
        productIds,
        couponCode:
          session.metadata?.couponCode || "",

          checkoutMode:
  session.metadata?.checkoutMode ||
  "guest",

userId:
  session.metadata?.userId ||
  "",
      };
    } catch (error) {
      logger.error(
        "Checkout session retrieval failed",
        error
      );

      if (
        error?.type ===
        "StripeInvalidRequestError"
      ) {
        throw new HttpsError(
          "not-found",
          "Die Bestellung wurde nicht gefunden."
        );
      }

      throw new HttpsError(
        "internal",
        "Die Bestellung konnte gerade nicht geprüft werden."
      );
    }
  }
);