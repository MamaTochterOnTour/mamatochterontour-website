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

const {
  getStorage,
} = require("firebase-admin/storage");

const crypto = require("crypto");
const path = require("path");
const PDFDocument = require("pdfkit");

const Stripe = require("stripe");
const shopProducts = require("./shopProducts");

const BREVO_API_KEY = defineSecret("BREVO_API_KEY");

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");

const STRIPE_WEBHOOK_SECRET =
  defineSecret("STRIPE_WEBHOOK_SECRET");

/*
 * Newsletter-Listen
 *
 * 9 = wartet noch auf Double-Opt-In
 * 6 = bestätigte Newsletter-Abonnenten
 */
const NEWSLETTER_TEMP_LIST_ID = 9;
const NEWSLETTER_CONFIRMED_LIST_ID = 6;

const ORDER_EMAIL_SENDER = {
  name: "MamaTochterOnTour",
  email: "mamatochterontour@outlook.de",
};

const ORDER_EMAIL_TEMPLATE_ID = 3;

const INTERNAL_INVOICE_EMAIL =
  "mamatochterontour@outlook.de";

initializeApp();

const db = getFirestore();

const INVOICE_TAX_RATE = 0.19;

const BUSINESS_DETAILS = {
  name: "Jennifer Weinreich",
  brand: "MamaTochterOnTour",
  street: "Stettiner Straße 41",
  postalCode: "35410",
  city: "Hungen",
  country: "Deutschland",
  vatId: "DE441919331",
};

const INVOICE_LOGO_PATH = path.join(
  __dirname,
  "assets",
  "mamatochterontour-logo.png"
);

function calculateInvoiceTax(
  grossInCents,
  taxRate = INVOICE_TAX_RATE
) {
  const gross =
    Number(grossInCents || 0);

  /*
 * Berechnung aus einem Bruttopreis:
 *
 * Netto = Brutto / (1 + Steuersatz)
 */
  const net = Math.round(
    gross / (1 + taxRate)
  );

  const tax =
    gross - net;

  return {
    grossInCents: gross,
    netInCents: net,
    taxInCents: tax,
  };
}

function createInvoicePdf({
  invoiceNumber,
  invoiceDate,
  orderNumber,
  customerName,
  customerEmail,
  billingAddress,
  products,
  subtotalInCents,
  discountInCents,
  totalInCents,
  currency,
  discountLabel,
  paymentMethod,
}) {
  return new Promise(
    (resolve, reject) => {
      try {
        const doc =
          new PDFDocument({
            size: "A4",

            margins: {
              top: 48,
              right: 48,
              bottom: 70,
              left: 48,
            },

            bufferPages: true,

            info: {
              Title:
                `Rechnung ${invoiceNumber}`,

              Author:
                "MamaTochterOnTour",

              Subject:
                `Rechnung zur Bestellung ${orderNumber}`,
            },
          });

        const chunks = [];

        doc.on(
          "data",
          (chunk) => {
            chunks.push(chunk);
          }
        );

        doc.on(
          "end",
          () => {
            resolve(
              Buffer.concat(chunks)
            );
          }
        );

        doc.on(
          "error",
          reject
        );

        /*
         * =========================================
         * FARBEN
         * =========================================
         */

        const COLORS = {
          darkGreen: "#153c31",
          mediumGreen: "#3f6557",
          softGreen: "#e8f0eb",
          lightGreen: "#9bc7ae",

          purple: "#71508f",
          softPurple: "#f2edf5",

          cream: "#f6f3ee",
          creamDark: "#ebe5dc",

          text: "#1d2923",
          muted: "#69736e",
          mutedLight: "#87918c",

          border: "#dde4df",
          white: "#ffffff",
        };

        /*
         * =========================================
         * ALLGEMEINE WERTE
         * =========================================
         */

        const left =
          doc.page.margins.left;

        const right =
          doc.page.width -
          doc.page.margins.right;

        const pageWidth =
          right - left;

        const bottomContentY =
          doc.page.height - 105;

        /*
         * =========================================
         * DATUM
         * =========================================
         */

        const parsedInvoiceDate =
          invoiceDate
            ? new Date(invoiceDate)
            : new Date();

        const effectiveInvoiceDate =
          Number.isNaN(
            parsedInvoiceDate.getTime()
          )
            ? new Date()
            : parsedInvoiceDate;

        const formattedInvoiceDate =
          new Intl.DateTimeFormat(
            "de-DE",
            {
              timeZone:
                "Europe/Berlin",

              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          ).format(
            effectiveInvoiceDate
          );

        /*
         * =========================================
         * HILFSFUNKTION:
         * KLEINE ÜBERSCHRIFT
         * =========================================
         */

        function drawEyebrow(
          text,
          x,
          y,
          color =
            COLORS.purple
        ) {
          doc
            .font(
              "Helvetica-Bold"
            )
            .fontSize(7.5)
            .fillColor(color)
            .text(
              String(
                text || ""
              ).toUpperCase(),
              x,
              y,
              {
                characterSpacing: 1.2,
              }
            );
        }

        /*
         * =========================================
         * HILFSFUNKTION:
         * SEITENKOPF FÜR FOLGESEITEN
         * =========================================
         */

        function drawContinuationHeader() {
          doc
            .font(
              "Helvetica-Bold"
            )
            .fontSize(15)
            .fillColor(
              COLORS.darkGreen
            )
            .text(
              "MamaTochterOnTour",
              left,
              48
            );

          doc
            .font(
              "Helvetica"
            )
            .fontSize(8)
            .fillColor(
              COLORS.muted
            )
            .text(
              `Rechnung ${invoiceNumber}`,
              left,
              69
            );

          doc
            .moveTo(
              left,
              91
            )
            .lineTo(
              right,
              91
            )
            .strokeColor(
              COLORS.border
            )
            .lineWidth(0.7)
            .stroke();

          return 112;
        }

        /*
         * =========================================
         * HILFSFUNKTION:
         * NEUE SEITE
         * =========================================
         */

        function addNewPage() {
          doc.addPage();

          return (
            drawContinuationHeader()
          );
        }

        /*
         * =========================================
         * HERO / HEADER
         * =========================================
         */

        const heroHeight = 120;

        doc
          .roundedRect(
            left,
            48,
            pageWidth,
            heroHeight,
            18
          )
          .fill(
            COLORS.darkGreen
          );

        /*
 * Logo
 */

doc.image(
  INVOICE_LOGO_PATH,
  left + 20,
  55,
  {
    fit: [125, 75],
    align: "left",
    valign: "center",
  }
);

/*
 * Rechnungstitel
 */

doc
  .font(
    "Helvetica-Bold"
  )
  .fontSize(27)
  .fillColor(
    COLORS.white
  )
  .text(
    "Rechnung",
    left + 160,
72,
    {
      width: 180,
    }
  );

/*
 * Rechnungsnummer
 */

doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(
    "#d8e2dc"
  )
  .text(
    `Rechnungsnummer ${invoiceNumber}`,
    left + 160,
108,
    {
      width: 220,
    }
  );

/*
 * Rechnungsdatum rechts
 */

doc
  .font(
    "Helvetica-Bold"
  )
  .fontSize(8)
  .fillColor(
    COLORS.lightGreen
  )
  .text(
    "RECHNUNGSDATUM",
    right - 125,
72,
    {
      width: 101,
      align: "right",
      characterSpacing: 0.8,
    }
  );

doc
  .font(
    "Helvetica-Bold"
  )
  .fontSize(10)
  .fillColor(
    COLORS.white
  )
  .text(
    formattedInvoiceDate,
    right - 125,
90,
    {
      width: 101,
      align: "right",
    }
  );

        /*
         * =========================================
         * ABSENDERZEILE
         * =========================================
         */

        let currentY = 190;

        drawEyebrow(
          "Rechnungsempfänger",
          left,
          currentY
        );

        currentY += 19;

        /*
         * =========================================
         * KUNDENADRESSE + RECHNUNGSDATEN
         * =========================================
         */

        const gap = 18;

        const cardWidth =
          (
            pageWidth -
            gap
          ) / 2;

        const addressCardX =
          left;

        const dataCardX =
          left +
          cardWidth +
          gap;

        const cardsY =
          currentY;

        const cardsHeight =
  112;

        doc
          .roundedRect(
            addressCardX,
            cardsY,
            cardWidth,
            cardsHeight,
            14
          )
          .fill(
            COLORS.cream
          );

        doc
          .roundedRect(
            dataCardX,
            cardsY,
            cardWidth,
            cardsHeight,
            14
          )
          .fill(
            COLORS.softGreen
          );

        /*
         * Kundenadresse
         */

        let addressY =
          cardsY + 18;

        doc
          .font(
            "Helvetica-Bold"
          )
          .fontSize(10.5)
          .fillColor(
            COLORS.darkGreen
          );

        if (customerName) {
          doc.text(
            customerName,
            addressCardX + 18,
            addressY,
            {
              width:
                cardWidth - 36,
            }
          );

          addressY += 19;
        }

        doc
          .font(
            "Helvetica"
          )
          .fontSize(9)
          .fillColor(
            COLORS.text
          );

        if (
          billingAddress?.line1
        ) {
          doc.text(
            billingAddress.line1,
            addressCardX + 18,
            addressY,
            {
              width:
                cardWidth - 36,
            }
          );

          addressY += 15;
        }

        if (
          billingAddress?.line2
        ) {
          doc.text(
            billingAddress.line2,
            addressCardX + 18,
            addressY,
            {
              width:
                cardWidth - 36,
            }
          );

          addressY += 15;
        }

        const customerCityLine = [
          billingAddress
            ?.postalCode,
          billingAddress
            ?.city,
        ]
          .filter(Boolean)
          .join(" ");

        if (customerCityLine) {
          doc.text(
            customerCityLine,
            addressCardX + 18,
            addressY,
            {
              width:
                cardWidth - 36,
            }
          );

          addressY += 15;
        }

        const countryName =
          getCountryName(
            billingAddress
              ?.country
          );

        if (countryName) {
          doc.text(
            countryName,
            addressCardX + 18,
            addressY,
            {
              width:
                cardWidth - 36,
            }
          );

          addressY += 18;
        }

        if (customerEmail) {
          doc
            .font(
              "Helvetica"
            )
            .fontSize(7.5)
            .fillColor(
              COLORS.muted
            )
            .text(
              customerEmail,
              addressCardX + 18,
              addressY,
              {
                width:
                  cardWidth - 36,
              }
            );
        }

        /*
         * Rechnungsdaten rechts
         */

        let dataY =
          cardsY + 18;

        function drawInvoiceInfo(
          label,
          value
        ) {
          doc
            .font(
              "Helvetica"
            )
            .fontSize(7)
            .fillColor(
              COLORS.muted
            )
            .text(
              String(
                label || ""
              ).toUpperCase(),
              dataCardX + 18,
              dataY,
              {
                width: 92,
                characterSpacing:
                  0.6,
              }
            );

          doc
            .font(
              "Helvetica-Bold"
            )
            .fontSize(8.5)
            .fillColor(
              COLORS.darkGreen
            )
            .text(
              value || "—",
              dataCardX + 112,
              dataY,
              {
                width:
                  cardWidth -
                  130,
                align: "right",
              }
            );

          dataY += 18;
        }

        drawInvoiceInfo(
          "Rechnungsnr.",
          invoiceNumber
        );

        drawInvoiceInfo(
          "Bestellnr.",
          orderNumber
        );

        drawInvoiceInfo(
          "Rechnungsdatum",
          formattedInvoiceDate
        );

        drawInvoiceInfo(
          "Leistungsdatum",
          formattedInvoiceDate
        );

        drawInvoiceInfo(
          "Zahlungsart",
          paymentMethod ||
            "Online-Zahlung"
        );

        /*
         * =========================================
         * PRODUKTE
         * =========================================
         */

        currentY =
  cardsY +
  cardsHeight +
  22;

        drawEyebrow(
          "Bestellübersicht",
          left,
          currentY
        );

        currentY += 17;

        doc
          .font(
            "Helvetica-Bold"
          )
          .fontSize(20)
          .fillColor(
            COLORS.darkGreen
          )
          .text(
            "Deine Reiseguides",
            left,
            currentY
          );

        currentY += 28;

        /*
         * Tabellen-Spalten
         */

        const titleWidth = 275;
        const quantityWidth = 50;
        const taxWidth = 58;
        const priceWidth =
          pageWidth -
          titleWidth -
          quantityWidth -
          taxWidth;

        const titleX =
          left;

        const quantityX =
          titleX +
          titleWidth;

        const taxX =
          quantityX +
          quantityWidth;

        const priceX =
          taxX +
          taxWidth;

        function drawTableHeader(
          y
        ) {
          doc
            .roundedRect(
              left,
              y,
              pageWidth,
              28,
              8
            )
            .fill(
              COLORS.darkGreen
            );

          doc
            .font(
              "Helvetica-Bold"
            )
            .fontSize(7.5)
            .fillColor(
              COLORS.white
            );

          doc.text(
            "ARTIKEL",
            titleX + 12,
            y + 10,
            {
              width:
                titleWidth - 18,
            }
          );

          doc.text(
            "MENGE",
            quantityX,
            y + 10,
            {
              width:
                quantityWidth,
              align: "center",
            }
          );

          doc.text(
            "UST.",
            taxX,
            y + 10,
            {
              width:
                taxWidth,
              align: "center",
            }
          );

          doc.text(
            "BRUTTO",
            priceX,
            y + 10,
            {
              width:
                priceWidth - 10,
              align: "right",
            }
          );

          return y + 34;
        }

        currentY =
          drawTableHeader(
            currentY
          );

        /*
         * =========================================
         * PRODUKTZEILEN
         * =========================================
         */

        products.forEach(
          (
            product,
            index
          ) => {
            const productTitle =
              product.title ||
              "Digitaler Reiseguide";

            doc
              .font(
                "Helvetica-Bold"
              )
              .fontSize(9);

            const titleHeight =
              doc.heightOfString(
                productTitle,
                {
                  width:
                    titleWidth -
                    24,
                }
              );

            const rowHeight =
  Math.max(
    44,
    titleHeight + 27
  );

            if (
              currentY +
                rowHeight >
              bottomContentY
            ) {
              currentY =
                addNewPage();

              currentY =
                drawTableHeader(
                  currentY
                );
            }

            if (
              index % 2 === 1
            ) {
              doc
                .rect(
                  left,
                  currentY - 5,
                  pageWidth,
                  rowHeight
                )
                .fill(
                  "#faf9f7"
                );
            }

            doc
              .font(
                "Helvetica-Bold"
              )
              .fontSize(9)
              .fillColor(
                COLORS.text
              )
              .text(
                productTitle,
                titleX + 10,
                currentY + 3,
                {
                  width:
                    titleWidth -
                    20,
                }
              );

            doc
              .font(
                "Helvetica"
              )
              .fontSize(7.5)
              .fillColor(
                COLORS.muted
              )
              .text(
                "Digitaler Reiseguide · PDF",
                titleX + 10,
                currentY +
                  8 +
                  titleHeight,
                {
                  width:
                    titleWidth -
                    20,
                }
              );

            doc
              .font(
                "Helvetica"
              )
              .fontSize(8.5)
              .fillColor(
                COLORS.text
              )
              .text(
                "1",
                quantityX,
                currentY + 5,
                {
                  width:
                    quantityWidth,
                  align: "center",
                }
              );

            doc.text(
              `${Math.round(
                INVOICE_TAX_RATE *
                  100
              )} %`,
              taxX,
              currentY + 5,
              {
                width:
                  taxWidth,
                align: "center",
              }
            );

            doc
              .font(
                "Helvetica-Bold"
              )
              .fontSize(8.5)
              .fillColor(
                COLORS.darkGreen
              )
              .text(
                formatMoney(
                  product
                    .priceInCents,
                  currency
                ),
                priceX,
                currentY + 5,
                {
                  width:
                    priceWidth -
                    10,
                  align: "right",
                }
              );

            doc
              .moveTo(
                left,
                currentY +
                  rowHeight -
                  6
              )
              .lineTo(
                right,
                currentY +
                  rowHeight -
                  6
              )
              .strokeColor(
                COLORS.border
              )
              .lineWidth(0.5)
              .stroke();

            currentY +=
              rowHeight;
          }
        );

        /*
         * =========================================
         * SUMMEN
         * =========================================
         */

        const tax =
          calculateInvoiceTax(
            totalInCents
          );

        const summaryHeight =
  Number(
    discountInCents
  ) > 0
    ? 120
    : 104;

        if (
  currentY +
    summaryHeight +
    30 >
  bottomContentY
) {
  currentY =
    addNewPage();
} else {
  currentY += 14;
}

        const summaryWidth =
          258;

        const summaryX =
          right -
          summaryWidth;

        drawEyebrow(
          "Gesamt",
          summaryX,
          currentY
        );

        currentY += 16;

        doc
          .roundedRect(
            summaryX,
            currentY,
            summaryWidth,
            summaryHeight,
            14
          )
          .fill(
            COLORS.cream
          );

        let summaryY =
  currentY + 14;

        function drawSummaryRow(
          label,
          value,
          {
            bold = false,
            accent = false,
          } = {}
        ) {
          doc
            .font(
              bold
                ? "Helvetica-Bold"
                : "Helvetica"
            )
            .fontSize(
              bold ? 10 : 8.5
            )
            .fillColor(
              accent
                ? COLORS.mediumGreen
                : COLORS.muted
            )
            .text(
              label,
              summaryX + 18,
              summaryY,
              {
                width: 130,
              }
            );

          doc
            .font(
              bold
                ? "Helvetica-Bold"
                : "Helvetica"
            )
            .fontSize(
              bold ? 11 : 8.5
            )
            .fillColor(
              bold
                ? COLORS.darkGreen
                : accent
                ? COLORS.mediumGreen
                : COLORS.text
            )
            .text(
              value,
              summaryX + 148,
              summaryY,
              {
                width: 92,
                align: "right",
              }
            );

          summaryY +=
  bold ? 21 : 17;
        }

        drawSummaryRow(
          "Zwischensumme",
          formatMoney(
            subtotalInCents,
            currency
          )
        );

        if (
          Number(
            discountInCents
          ) > 0
        ) {
          drawSummaryRow(
            discountLabel ||
              "Rabatt",
            `− ${formatMoney(
              discountInCents,
              currency
            )}`,
            {
              accent: true,
            }
          );
        }

        drawSummaryRow(
          "Nettobetrag",
          formatMoney(
            tax.netInCents,
            currency
          )
        );

        drawSummaryRow(
          `${Math.round(
            INVOICE_TAX_RATE *
              100
          )} % Umsatzsteuer`,
          formatMoney(
            tax.taxInCents,
            currency
          )
        );

        doc
          .moveTo(
            summaryX + 18,
            summaryY + 1
          )
          .lineTo(
            summaryX +
              summaryWidth -
              18,
            summaryY + 1
          )
          .strokeColor(
            COLORS.creamDark
          )
          .lineWidth(0.7)
          .stroke();

        summaryY += 8;

        drawSummaryRow(
          "Gesamtbetrag",
          formatMoney(
            totalInCents,
            currency
          ),
          {
            bold: true,
          }
        );

        currentY +=
  summaryHeight +
  14;

        /*
         * =========================================
         * ZAHLUNGSSTATUS
         * =========================================
         */

        if (
  currentY + 62 >
  bottomContentY
) {
          currentY =
            addNewPage();
        }

        doc
          .roundedRect(
  left,
  currentY,
  pageWidth,
  58,
  14
)
          .fill(
            COLORS.softGreen
          );

        /*
         * Status-Kreis
         */

        doc
          .circle(
  left + 25,
  currentY + 22,
  9
)
          .fill(
            COLORS.mediumGreen
          );

        doc
          .font(
            "Helvetica-Bold"
          )
          .fontSize(10)
          .fillColor(
            COLORS.white
          )
          .text(
            "✓",
            left + 19,
currentY + 16,
            {
              width: 12,
              align: "center",
            }
          );

        doc
          .font(
            "Helvetica-Bold"
          )
          .fontSize(10.5)
          .fillColor(
            COLORS.darkGreen
          )
          .text(
            "Zahlungsstatus: Bezahlt",
            left + 44,
            currentY + 12
          );

        doc
          .font(
            "Helvetica"
          )
          .fontSize(8.5)
          .fillColor(
            COLORS.muted
          )
          .text(
            "Vielen Dank. Der Rechnungsbetrag wurde bereits vollständig beglichen.",
            left + 44,
            currentY + 28,
            {
              width:
                pageWidth -
                64,
            }
          );

        doc
          .font(
            "Helvetica"
          )
          .fontSize(7.5)
          .fillColor(
            COLORS.mutedLight
          )
          .text(
            `Im Gesamtbetrag sind ${Math.round(
              INVOICE_TAX_RATE *
                100
            )} % gesetzliche Umsatzsteuer enthalten.`,
            left + 44,
            currentY + 42,
            {
              width:
                pageWidth -
                64,
            }
          );

        /*
         * =========================================
         * FOOTER AUF ALLEN SEITEN
         * =========================================
         */

        const pageRange =
          doc.bufferedPageRange();

        for (
          let pageIndex = 0;
          pageIndex <
          pageRange.count;
          pageIndex++
        ) {
          doc.switchToPage(
            pageIndex
          );

          const footerY =
  doc.page.height -
  doc.page.margins.bottom -
  52;

          doc
            .moveTo(
              left,
              footerY
            )
            .lineTo(
              right,
              footerY
            )
            .strokeColor(
              COLORS.border
            )
            .lineWidth(0.6)
            .stroke();

          doc
            .font(
              "Helvetica"
            )
            .fontSize(6.8)
            .fillColor(
              COLORS.muted
            )
            .text(
              `${BUSINESS_DETAILS.name} · ${BUSINESS_DETAILS.brand} · ${BUSINESS_DETAILS.street} · ${BUSINESS_DETAILS.postalCode} ${BUSINESS_DETAILS.city} · ${BUSINESS_DETAILS.country}`,
              left,
              footerY + 11,
              {
                width:
                  pageWidth,
                align:
                  "center",
              }
            );

          doc
            .font(
              "Helvetica"
            )
            .fontSize(6.8)
            .fillColor(
              COLORS.muted
            )
            .text(
              `USt-IdNr.: ${BUSINESS_DETAILS.vatId} · mamatochterontour@outlook.de`,
              left,
              footerY + 23,
              {
                width:
                  pageWidth,
                align:
                  "center",
              }
            );

          doc
            .font(
              "Helvetica"
            )
            .fontSize(6.5)
            .fillColor(
              COLORS.mutedLight
            )
            .text(
              `Seite ${
                pageIndex + 1
              } von ${
                pageRange.count
              }`,
              left,
              footerY + 38,
              {
                width:
                  pageWidth,
                align:
                  "center",
              }
            );
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    }
  );
}

async function saveInvoicePdfToStorage({
  invoicePdfBuffer,
  invoiceNumber,
  invoiceDate,
}) {
  if (!invoicePdfBuffer) {
    throw new Error(
      "Für die Rechnung fehlt der PDF-Inhalt."
    );
  }

  if (!invoiceNumber) {
    throw new Error(
      "Für die Rechnung fehlt die Rechnungsnummer."
    );
  }

  const parsedInvoiceDate =
    invoiceDate
      ? new Date(invoiceDate)
      : new Date();

  const invoiceYear =
    Number.isNaN(
      parsedInvoiceDate.getTime()
    )
      ? new Date().getFullYear()
      : parsedInvoiceDate.getFullYear();

  const storagePath =
    `invoices/${invoiceYear}/${invoiceNumber}.pdf`;

  const bucket =
    getStorage().bucket();

  const file =
    bucket.file(storagePath);

  await file.save(
    invoicePdfBuffer,
    {
      resumable: false,

      metadata: {
        contentType:
          "application/pdf",

        cacheControl:
          "private, max-age=0, no-transform",

        metadata: {
          invoiceNumber,
        },
      },
    }
  );

  return {
    storagePath,
    bucketName:
      bucket.name,
  };
}

function getStripeCountryCode(country) {
  const normalizedCountry =
    String(country || "")
      .trim()
      .toUpperCase();

  if (!normalizedCountry) {
    return "";
  }

  /*
   * Falls bereits ein ISO-Ländercode
   * gespeichert wurde.
   */
  if (
    /^[A-Z]{2}$/.test(
      normalizedCountry
    )
  ) {
    return normalizedCountry;
  }

  const countryMap = {
    DEUTSCHLAND: "DE",
    GERMANY: "DE",

    ÖSTERREICH: "AT",
    OESTERREICH: "AT",
    AUSTRIA: "AT",

    SCHWEIZ: "CH",
    SWITZERLAND: "CH",

    FRANKREICH: "FR",
    FRANCE: "FR",

    ITALIEN: "IT",
    ITALY: "IT",

    SPANIEN: "ES",
    SPAIN: "ES",

    NIEDERLANDE: "NL",
    NETHERLANDS: "NL",

    BELGIEN: "BE",
    BELGIUM: "BE",

    LUXEMBURG: "LU",
    LUXEMBOURG: "LU",

    DÄNEMARK: "DK",
    DAENEMARK: "DK",
    DENMARK: "DK",

    SCHWEDEN: "SE",
    SWEDEN: "SE",

    NORWEGEN: "NO",
    NORWAY: "NO",

    FINNLAND: "FI",
    FINLAND: "FI",

    PORTUGAL: "PT",

    POLEN: "PL",
    POLAND: "PL",

    TSCHECHIEN: "CZ",
    CZECHIA: "CZ",

    VEREINIGTES_KÖNIGREICH: "GB",
    VEREINIGTES_KOENIGREICH: "GB",
    "UNITED KINGDOM": "GB",
    UK: "GB",
  };

  return (
    countryMap[
      normalizedCountry
        .replace(/\s+/g, "_")
    ] ||
    countryMap[
      normalizedCountry
    ] ||
    ""
  );
}

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
    const rawEmail =
      request.data?.email;

    if (
      typeof rawEmail !== "string"
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Bitte gib eine gültige E-Mail-Adresse ein."
      );
    }

    const email =
      rawEmail
        .trim()
        .toLowerCase();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email) ||
      email.length > 254
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Bitte gib eine gültige E-Mail-Adresse ein."
      );
    }

    try {
      /*
       * =========================================
       * 1. KONTAKT BEI BREVO PRÜFEN
       * =========================================
       */

      const existingContactResponse =
        await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",

            headers: {
              accept:
                "application/json",

              "api-key":
                BREVO_API_KEY.value(),
            },
          }
        );

      let existingContact = null;

      if (
        existingContactResponse.ok
      ) {
        existingContact =
          await existingContactResponse.json();

        const existingListIds =
          Array.isArray(
            existingContact.listIds
          )
            ? existingContact.listIds
            : [];

        /*
         * =========================================
         * 2. BEREITS BESTÄTIGTER NEWSLETTER
         * =========================================
         *
         * Liste 6 ist die einzige Liste,
         * die für "bereits angemeldet"
         * entscheidend ist.
         */

        if (
          existingListIds.includes(
            NEWSLETTER_CONFIRMED_LIST_ID
          )
        ) {
          return {
            success: true,

            alreadySubscribed: true,

            message:
              "Du bist bereits für unseren Newsletter angemeldet. 💚",
          };
        }
      } else if (
        existingContactResponse.status !==
        404
      ) {
        const contactErrorText =
          await existingContactResponse.text();

        logger.error(
          "Brevo contact lookup failed",
          {
            status:
              existingContactResponse.status,

            response:
              contactErrorText,

            email,
          }
        );

        throw new Error(
          "Kontakt konnte bei Brevo nicht geprüft werden."
        );
      }

      /*
       * =========================================
       * 3. NOCH NICHT BESTÄTIGT
       * =========================================
       *
       * Person ist NICHT in Liste 6.
       *
       * Jetzt darf sie in die temporäre
       * Liste 9 aufgenommen werden.
       */

      const existingListIds =
        Array.isArray(
          existingContact?.listIds
        )
          ? existingContact.listIds
          : [];

      /*
       * Falls Kontakt schon in Liste 9 steckt,
       * bedeutet das:
       * Anmeldung wurde bereits begonnen,
       * aber noch nicht bestätigt.
       *
       * Wir müssen ihn nicht erneut anlegen.
       */
      if (
        existingListIds.includes(
          NEWSLETTER_TEMP_LIST_ID
        )
      ) {
        return {
          success: true,

          alreadySubscribed: false,

          pendingConfirmation: true,

          message:
            "Deine Anmeldung wartet noch auf deine Bestätigung. Bitte prüfe dein E-Mail-Postfach sowie deinen Spam- oder Junk-Ordner.",
        };
      }

      let brevoResponse;

if (existingContact) {
  /*
   * Kontakt existiert bereits bei Brevo,
   * ist aber noch nicht in Liste 9.
   *
   * Deshalb explizit zur Liste 9 hinzufügen.
   * Dadurch wird auch der Brevo-Trigger
   * "Kontakt zu Liste hinzugefügt" sauber ausgelöst.
   */
  brevoResponse =
    await fetch(
      `https://api.brevo.com/v3/contacts/lists/${NEWSLETTER_TEMP_LIST_ID}/contacts/add`,
      {
        method: "POST",

        headers: {
          accept:
            "application/json",

          "content-type":
            "application/json",

          "api-key":
            BREVO_API_KEY.value(),
        },

        body: JSON.stringify({
          emails: [email],
        }),
      }
    );
} else {
  /*
   * Komplett neuer Kontakt:
   * direkt erstellen und Liste 9 zuweisen.
   */
  brevoResponse =
    await fetch(
      "https://api.brevo.com/v3/contacts",
      {
        method: "POST",

        headers: {
          accept:
            "application/json",

          "content-type":
            "application/json",

          "api-key":
            BREVO_API_KEY.value(),
        },

        body: JSON.stringify({
          email,

          listIds: [
            NEWSLETTER_TEMP_LIST_ID,
          ],
        }),
      }
    );
}

      if (
        brevoResponse.ok
      ) {
        return {
          success: true,

          alreadySubscribed: false,

          pendingConfirmation: true,

          message:
            "Fast geschafft! Bitte bestätige deine Anmeldung über die E-Mail, die wir dir gerade geschickt haben. Falls du sie nicht findest, schau bitte auch in deinem Spam- oder Junk-Ordner nach.",
        };
      }

      const brevoErrorText =
        await brevoResponse.text();

      logger.error(
        "Brevo newsletter subscription failed",
        {
          status:
            brevoResponse.status,

          response:
            brevoErrorText,

          email,
        }
      );

      throw new HttpsError(
        "internal",
        "Die Anmeldung konnte gerade nicht abgeschlossen werden. Bitte versuche es später erneut."
      );
    } catch (error) {
      if (
        error instanceof HttpsError
      ) {
        throw error;
      }

      logger.error(
        "Unexpected newsletter subscription error",
        error
      );

      throw new HttpsError(
        "internal",
        "Die Anmeldung konnte gerade nicht abgeschlossen werden. Bitte versuche es später erneut."
      );
    }
  }
);

exports.unsubscribeFromNewsletter = onCall(
  {
    region: "europe-west1",
    secrets: [BREVO_API_KEY],
  },
  async (request) => {
    const rawEmail =
      request.data?.email;

    if (
      typeof rawEmail !== "string"
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Die E-Mail-Adresse fehlt."
      );
    }

    const email =
      rawEmail
        .trim()
        .toLowerCase();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email) ||
      email.length > 254
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Die E-Mail-Adresse ist ungültig."
      );
    }

    try {
      /*
       * Kontakt laden.
       */
      const contactResponse =
        await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",

            headers: {
              accept:
                "application/json",

              "api-key":
                BREVO_API_KEY.value(),
            },
          }
        );

      /*
       * Kontakt existiert gar nicht.
       *
       * Für den User behandeln wir das
       * trotzdem als erfolgreich abgemeldet.
       */
      if (
        contactResponse.status === 404
      ) {
        return {
          success: true,

          message:
            "Du wurdest erfolgreich vom Newsletter abgemeldet.",
        };
      }

      if (!contactResponse.ok) {
        const responseText =
          await contactResponse.text();

        logger.error(
          "Brevo contact lookup for unsubscribe failed",
          {
            email,

            status:
              contactResponse.status,

            response:
              responseText,
          }
        );

        throw new Error(
          "Kontakt konnte nicht geprüft werden."
        );
      }

      const contact =
        await contactResponse.json();

      const listIds =
        Array.isArray(
          contact.listIds
        )
          ? contact.listIds
          : [];

      /*
       * Weder Liste 6 noch Liste 9?
       * Dann ist die Person bei uns
       * sowieso nicht mehr angemeldet.
       */
      if (
        !listIds.includes(
          NEWSLETTER_CONFIRMED_LIST_ID
        ) &&
        !listIds.includes(
          NEWSLETTER_TEMP_LIST_ID
        )
      ) {
        return {
          success: true,

          message:
            "Du wurdest erfolgreich vom Newsletter abgemeldet.",
        };
      }

      /*
       * =========================================
       * AUS NEWSLETTER-LISTEN ENTFERNEN
       * =========================================
       *
       * Liste 6:
       * bestätigter Newsletter
       *
       * Liste 9:
       * eventuell noch offene Anmeldung
       */

      const updateResponse =
        await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(
            email
          )}`,
          {
            method: "PUT",

            headers: {
              accept:
                "application/json",

              "content-type":
                "application/json",

              "api-key":
                BREVO_API_KEY.value(),
            },

            body: JSON.stringify({
              unlinkListIds: [
                NEWSLETTER_CONFIRMED_LIST_ID,
                NEWSLETTER_TEMP_LIST_ID,
              ],
            }),
          }
        );

      if (!updateResponse.ok) {
        const responseText =
          await updateResponse.text();

        logger.error(
          "Brevo newsletter unsubscribe failed",
          {
            email,

            status:
              updateResponse.status,

            response:
              responseText,
          }
        );

        throw new Error(
          "Kontakt konnte nicht aus der Newsletter-Liste entfernt werden."
        );
      }

      return {
        success: true,

        message:
          "Du wurdest erfolgreich vom Newsletter abgemeldet.",
      };
    } catch (error) {
      if (
        error instanceof HttpsError
      ) {
        throw error;
      }

      logger.error(
        "Unexpected newsletter unsubscribe error",
        {
          email,

          error:
            error?.message ||
            String(error),
        }
      );

      throw new HttpsError(
        "internal",
        "Die Abmeldung konnte gerade nicht durchgeführt werden. Bitte versuche es später erneut."
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

  const legalTermsAccepted =
  request.data?.legalTermsAccepted === true;

const legalTermsAcceptedAt =
  String(
    request.data?.legalTermsAcceptedAt || ""
  ).trim();

const digitalContentConsent =
  request.data?.digitalContentConsent === true;

const digitalContentConsentAt =
  String(
    request.data?.digitalContentConsentAt || ""
  ).trim();

if (!legalTermsAccepted) {
  throw new HttpsError(
    "failed-precondition",
    "Bitte akzeptiere die AGB und bestätige, dass du die Widerrufsbelehrung zur Kenntnis genommen hast."
  );
}

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

/*
 * =========================================
 * STRIPE CUSTOMER FÜR KUNDENKONTO
 * =========================================
 *
 * Gast:
 * → normaler Stripe Checkout
 *
 * Kundenkonto:
 * → vorhandenen Stripe Customer verwenden
 * → oder beim ersten Kauf einen erstellen
 * → gespeicherte Adresse aus shopUsers laden
 */

let stripeCustomerId = "";
let hasCompleteSavedAddress = false;

if (
  checkoutMode === "account"
) {
  const userId =
    request.auth.uid;

  /*
   * Öffentliche/allgemeine Profildaten:
   * Users/{uid}
   */
  const userReference =
    db
      .collection("Users")
      .doc(userId);

  /*
   * Private Shop-Daten:
   * shopUsers/{uid}
   */
  const shopUserReference =
    db
      .collection("shopUsers")
      .doc(userId);

  const [
    userSnapshot,
    shopUserSnapshot,
  ] = await Promise.all([
    userReference.get(),
    shopUserReference.get(),
  ]);

  const userData =
    userSnapshot.exists
      ? userSnapshot.data()
      : {};

  const shopUserData =
    shopUserSnapshot.exists
      ? shopUserSnapshot.data()
      : {};

  const savedAddress =
    shopUserData?.address || {};

  const firstName =
    String(
      userData?.firstName || ""
    ).trim();

  const lastName =
    String(
      userData?.lastName || ""
    ).trim();

  const customerName = [
    firstName,
    lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const street =
    String(
      savedAddress?.street || ""
    ).trim();

  const houseNumber =
    String(
      savedAddress
        ?.houseNumber || ""
    ).trim();

  const postalCode =
    String(
      savedAddress
        ?.postalCode || ""
    ).trim();

  const city =
    String(
      savedAddress?.city || ""
    ).trim();

  const countryCode =
    getStripeCountryCode(
      savedAddress?.country
    );

  /*
   * Straße und Hausnummer werden
   * für Stripe zusammengeführt.
   */
  const addressLine1 = [
    street,
    houseNumber,
  ]
    .filter(Boolean)
    .join(" ");

  /*
   * Nur tatsächlich vorhandene
   * Adressfelder an Stripe senden.
   */
  const stripeAddress = {};

  if (addressLine1) {
    stripeAddress.line1 =
      addressLine1;
  }

  if (postalCode) {
    stripeAddress.postal_code =
      postalCode;
  }

  if (city) {
    stripeAddress.city =
      city;
  }

  if (countryCode) {
    stripeAddress.country =
      countryCode;
  }

  hasCompleteSavedAddress =
  Boolean(
    addressLine1 &&
    postalCode &&
    city &&
    countryCode
  );

  /*
   * Bereits gespeicherte Stripe-ID
   * aus shopUsers/{uid}.
   */
  const savedStripeCustomerId =
    String(
      shopUserData
        ?.stripeCustomerId || ""
    ).trim();

  let stripeCustomer = null;

  /*
   * =========================================
   * EXISTIERENDEN CUSTOMER LADEN
   * =========================================
   */

  if (
    savedStripeCustomerId
  ) {
    try {
      const existingCustomer =
        await stripe.customers.retrieve(
          savedStripeCustomerId
        );

      if (
        existingCustomer &&
        !existingCustomer.deleted
      ) {
        stripeCustomer =
          existingCustomer;
      }
    } catch (error) {
      /*
       * Falls der Customer z. B. im
       * Stripe-Dashboard gelöscht wurde,
       * erstellen wir weiter unten
       * automatisch einen neuen.
       */
      logger.warn(
        "Saved Stripe customer could not be loaded",
        {
          userId,

          stripeCustomerId:
            savedStripeCustomerId,

          error:
            error?.message ||
            String(error),
        }
      );
    }
  }

  /*
   * =========================================
   * CUSTOMER ERSTELLEN
   * =========================================
   */

  if (!stripeCustomer) {
    const customerData = {
      email:
        checkoutEmail,

      metadata: {
        firebaseUid:
          userId,

        source:
          "mamatochterontour-shop",
      },
    };

    if (customerName) {
      customerData.name =
        customerName;
    }

    if (hasCompleteSavedAddress) {
  customerData.address =
    stripeAddress;
}

    stripeCustomer =
      await stripe.customers.create(
        customerData
      );

    stripeCustomerId =
      stripeCustomer.id;

    /*
     * Stripe Customer-ID dauerhaft
     * beim Shop-Benutzer speichern.
     */
    await shopUserReference.set(
      {
        stripeCustomerId,

        stripeCustomerCreatedAt:
          FieldValue
            .serverTimestamp(),

        updatedAt:
          FieldValue
            .serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  } else {
    /*
     * =========================================
     * CUSTOMER AKTUALISIEREN
     * =========================================
     *
     * Das Kundenkonto ist unsere
     * Standardquelle für Name,
     * E-Mail und Adresse.
     */

    stripeCustomerId =
      stripeCustomer.id;

    const customerUpdate = {
      email:
        checkoutEmail,

      metadata: {
        firebaseUid:
          userId,

        source:
          "mamatochterontour-shop",
      },
    };

    if (customerName) {
      customerUpdate.name =
        customerName;
    }

    if (hasCompleteSavedAddress) {
  customerUpdate.address =
    stripeAddress;
}

    await stripe.customers.update(
      stripeCustomerId,
      customerUpdate
    );

    /*
     * Sicherheitshalber die ID erneut
     * in Firestore hinterlegen.
     */
    await shopUserReference.set(
      {
        stripeCustomerId,

        updatedAt:
          FieldValue
            .serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  }
}

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

  const checkoutSessionData = {
  mode: "payment",

  line_items:
    lineItems,

  discounts:
    stripeDiscounts,

  success_url:
  "https://www.mamatochterontour.de/shop/checkout-erfolgreich" +
  "?session_id={CHECKOUT_SESSION_ID}",

cancel_url:
  "https://www.mamatochterontour.de/shop/warenkorb",

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

    stripeCustomerId:
  checkoutMode === "account"
    ? stripeCustomerId
    : "",

    legalTermsAccepted:
  "true",

legalTermsAcceptedAt:
  legalTermsAcceptedAt ||
  new Date().toISOString(),

digitalContentConsent:
  "true",

digitalContentConsentAt:
  digitalContentConsentAt ||
  new Date().toISOString(),
  },
};

/*
 * =========================================
 * CUSTOMER JE NACH CHECKOUT-MODUS
 * =========================================
 */

if (
  checkoutMode === "account" &&
  stripeCustomerId
) {
  /*
   * Bestehenden Stripe Customer verwenden.
   */
  checkoutSessionData.customer =
    stripeCustomerId;

  /*
   * Rechnungsadresse IMMER anzeigen.
   *
   * Wenn bereits Daten beim Stripe Customer
   * vorhanden sind, kann Stripe sie übernehmen.
   * Der Kunde kann sie im Checkout trotzdem
   * prüfen bzw. ändern.
   */
  checkoutSessionData.billing_address_collection =
    "required";

  /*
   * Änderungen aus dem Checkout wieder
   * am Stripe Customer speichern.
   */
  checkoutSessionData.customer_update = {
    address: "auto",
    name: "auto",
  };

  checkoutSessionData.name_collection = {
    individual: {
      enabled: true,
      optional: false,
    },
  };
} else {
  /*
   * Gast:
   * wie bisher komplette Rechnungsdaten
   * im Stripe Checkout erfassen.
   */
  checkoutSessionData.customer_creation =
    "always";

  checkoutSessionData.customer_email =
    checkoutEmail;

  checkoutSessionData.billing_address_collection =
    "required";

  checkoutSessionData.name_collection = {
    individual: {
      enabled: true,
      optional: false,
    },
  };
}

const session =
  await stripe.checkout.sessions.create(
    checkoutSessionData
  );

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
  invoicePdfBuffer,
  invoiceNumber,
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
  sender:
    ORDER_EMAIL_SENDER,

  to: [
    {
      email:
        recipientEmail,

      name:
        recipientName ||
        recipientEmail,
    },
  ],

  replyTo: {
    name:
      "MamaTochterOnTour",

    email:
      "mamatochterontour@outlook.de",
  },

  templateId:
    ORDER_EMAIL_TEMPLATE_ID,

  params:
    templateParams,

  attachment:
    invoicePdfBuffer
      ? [
          {
            name:
              `Rechnung-${invoiceNumber}.pdf`,

            content:
              invoicePdfBuffer.toString(
                "base64"
              ),
          },
        ]
      : [],

  tags: [
    "onlineshop",
    "bestellbestaetigung",
    "rechnung",
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

async function sendInternalInvoiceEmail({
  invoicePdfBuffer,
  invoiceNumber,
  orderNumber,
  customerName,
  customerEmail,
  totalInCents,
  currency,
}) {
  if (
    !invoicePdfBuffer ||
    !invoiceNumber
  ) {
    throw new Error(
      "Die interne Rechnungs-E-Mail kann ohne Rechnung nicht versendet werden."
    );
  }

  const customerDisplayName =
    customerName ||
    customerEmail ||
    "Unbekannter Kunde";

  const brevoResponse =
    await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept:
            "application/json",

          "content-type":
            "application/json",

          "api-key":
            BREVO_API_KEY.value(),
        },

        body: JSON.stringify({
          sender:
            ORDER_EMAIL_SENDER,

          to: [
            {
              email:
                INTERNAL_INVOICE_EMAIL,

              name:
                "MamaTochterOnTour",
            },
          ],

          replyTo: {
            name:
              "MamaTochterOnTour",

            email:
              "mamatochterontour@outlook.de",
          },

          subject:
            `Neue Rechnung ${invoiceNumber}`,

          htmlContent: `
            <html>
              <body
                style="
                  font-family: Arial, sans-serif;
                  color: #1d2923;
                  line-height: 1.6;
                "
              >
                <h2>
                  Neue Onlineshop-Rechnung
                </h2>

                <p>
                  Eine neue Bestellung wurde erfolgreich bezahlt.
                </p>

                <p>
                  <strong>Rechnungsnummer:</strong>
                  ${invoiceNumber}
                  <br>

                  <strong>Bestellnummer:</strong>
                  ${orderNumber}
                  <br>

                  <strong>Kunde:</strong>
                  ${customerDisplayName}
                  <br>

                  <strong>E-Mail:</strong>
                  ${customerEmail}
                  <br>

                  <strong>Gesamtbetrag:</strong>
                  ${formatMoney(
                    totalInCents,
                    currency
                  )}
                </p>

                <p>
                  Die zugehörige Rechnung befindet sich als PDF im Anhang.
                </p>
              </body>
            </html>
          `,

          attachment: [
            {
              name:
                `Rechnung-${invoiceNumber}.pdf`,

              content:
                invoicePdfBuffer.toString(
                  "base64"
                ),
            },
          ],

          tags: [
            "onlineshop",
            "rechnung",
            "intern",
          ],
        }),
      }
    );

  const responseText =
    await brevoResponse.text();

  if (!brevoResponse.ok) {
    logger.error(
      "Brevo internal invoice email failed",
      {
        status:
          brevoResponse.status,

        response:
          responseText,

        invoiceNumber,

        orderNumber,
      }
    );

    throw new Error(
      "Interne Rechnungs-E-Mail konnte nicht versendet werden."
    );
  }

  try {
    return responseText
      ? JSON.parse(
          responseText
        )
      : null;
  } catch {
    return null;
  }
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

const legalTermsAccepted =
  session.metadata?.legalTermsAccepted ===
  "true";

const legalTermsAcceptedAt = String(
  session.metadata?.legalTermsAcceptedAt ||
    ""
).trim();

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
let invoiceNumber = null;
let invoiceDate = null;

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
  const existingOrder =
    orderSnapshot.data();

  effectiveOrderNumber =
    existingOrder?.orderNumber;

  invoiceNumber =
    existingOrder?.invoiceNumber;

  invoiceDate =
    existingOrder?.invoiceDate;

  if (!effectiveOrderNumber) {
    throw new Error(
      "Die vorhandene Bestellung besitzt keine Bestellnummer."
    );
  }

  if (!invoiceNumber) {
    throw new Error(
      "Die vorhandene Bestellung besitzt keine Rechnungsnummer."
    );
  }

  if (!invoiceDate) {
    throw new Error(
      "Die vorhandene Bestellung besitzt kein Rechnungsdatum."
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

const savedOrderYear =
  Number(
    counterData.orderYear
  ) || 0;

const savedOrderNumber =
  Number(
    counterData.orderNumber
  ) || 0;

const savedInvoiceYear =
  Number(
    counterData.invoiceYear
  ) || 0;

const savedInvoiceNumber =
  Number(
    counterData.invoiceNumber
  ) || 0;

const nextOrderNumber =
  savedOrderYear === currentYear
    ? savedOrderNumber + 1
    : 1;

const nextInvoiceNumber =
  savedInvoiceYear === currentYear
    ? savedInvoiceNumber + 1
    : 1;

effectiveOrderNumber =
  `MTT-B-${currentYear}-${String(
    nextOrderNumber
  ).padStart(6, "0")}`;

invoiceNumber =
  `MTT-R-${currentYear}-${String(
    nextInvoiceNumber
  ).padStart(6, "0")}`;

  invoiceDate =
  new Date(
    session.created * 1000
  ).toISOString();

        transaction.set(
  counterReference,
  {
    orderYear:
      currentYear,

    orderNumber:
      nextOrderNumber,

    invoiceYear:
      currentYear,

    invoiceNumber:
      nextInvoiceNumber,

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

            invoiceNumber,

invoiceDate,

invoiceTaxRate:
  INVOICE_TAX_RATE * 100,

  invoiceStoragePath:
  "",

invoiceStorageBucket:
  "",

invoiceStored:
  false,

internalInvoiceEmailStatus:
  "pending",

internalInvoiceEmailSent:
  false,

            stripeSessionId:
  session.id,

stripeCustomerId:
  String(
    session.customer ||
    session.metadata
      ?.stripeCustomerId ||
    ""
  ),

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

            legalTermsAccepted,

legalTermsAcceptedAt,

legalTermsAcceptedText:
  "Ich akzeptiere die AGB und habe die Widerrufsbelehrung zur Kenntnis genommen.",

            digitalContentConsent,

            digitalContentConsentAt,

            digitalContentConsentText:
              "Ich stimme ausdrücklich zu, dass MamaTochterOnTour vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrags beginnt. Mir ist bekannt, dass ich mit Beginn der Bereitstellung der digitalen Reiseguides mein Widerrufsrecht verliere.",

            stripeEventId:
              event.id,

            stripePaymentIntentId:
              session.payment_intent ||
              "",

            stripeCustomerId:
  String(
    session.customer ||
    session.metadata
      ?.stripeCustomerId ||
    ""
  ),

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

            legalTermsAccepted,

legalTermsAcceptedAt,

legalTermsAcceptedText:
  "Ich akzeptiere die AGB und habe die Widerrufsbelehrung zur Kenntnis genommen.",

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

  if (!invoiceNumber) {
  throw new Error(
    "Für die Bestellung konnte keine Rechnungsnummer erstellt werden."
  );
}

if (!invoiceDate) {
  throw new Error(
    "Für die Bestellung konnte kein Rechnungsdatum erstellt werden."
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

  legalTermsAcceptedText:
  "Ich akzeptiere die AGB und habe die Widerrufsbelehrung zur Kenntnis genommen.",

legalTermsAcceptedAt:
  formatConsentDate(
    legalTermsAcceptedAt
  ),

digitalContentConsentText:
  "Ich stimme ausdrücklich zu, dass MamaTochterOnTour vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrags beginnt. Mir ist bekannt, dass ich mit Beginn der Bereitstellung der digitalen Reiseguides mein Widerrufsrecht verliere.",

digitalContentConsentAt:
  formatConsentDate(
    digitalContentConsentAt
  ),

invoiceNotice:
  `Deine Rechnung ${invoiceNumber} findest du als PDF im Anhang dieser E-Mail.`,

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

const invoicePdfBuffer =
  await createInvoicePdf({
    invoiceNumber,

    invoiceDate,

    orderNumber,

    customerName,

    customerEmail:
      email,

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

    products,

    subtotalInCents,

    discountInCents,

    totalInCents,

    currency,

    discountLabel,

    paymentMethod,
  });

  const invoiceStorage =
  await saveInvoicePdfToStorage({
    invoicePdfBuffer,

    invoiceNumber,

    invoiceDate,
  });

await orderReference.update({
  invoiceStoragePath:
    invoiceStorage.storagePath,

  invoiceStorageBucket:
    invoiceStorage.bucketName,

  invoiceStored:
    true,

  invoiceStoredAt:
    FieldValue.serverTimestamp(),

  updatedAt:
    FieldValue.serverTimestamp(),
});

const brevoResult =
  await sendOrderConfirmationEmail({
    recipientEmail:
      email,

    recipientName:
      customerName,

    templateParams,

    invoicePdfBuffer,

    invoiceNumber,
  });

await orderReference.update({
  confirmationEmailStatus:
    "sent",

  confirmationEmailSent:
    true,

  confirmationEmailSentAt:
    FieldValue.serverTimestamp(),

  confirmationEmailTemplateId:
    ORDER_EMAIL_TEMPLATE_ID,

  confirmationEmailMessageId:
    brevoResult?.messageId ||
    "",

  invoiceNumber,

  invoiceStatus:
    "issued",

  invoiceSent:
    true,

  invoiceSentAt:
    FieldValue.serverTimestamp(),

  updatedAt:
    FieldValue.serverTimestamp(),
});

await orderReference.update({
  internalInvoiceEmailStatus:
    "sending",

  updatedAt:
    FieldValue.serverTimestamp(),
});

const internalInvoiceEmailResult =
  await sendInternalInvoiceEmail({
    invoicePdfBuffer,

    invoiceNumber,

    orderNumber,

    customerName,

    customerEmail:
      email,

    totalInCents,

    currency,
  });

await orderReference.update({
  internalInvoiceEmailStatus:
    "sent",

  internalInvoiceEmailSent:
    true,

  internalInvoiceEmailSentAt:
    FieldValue.serverTimestamp(),

  internalInvoiceEmailMessageId:
    internalInvoiceEmailResult
      ?.messageId || "",

  updatedAt:
    FieldValue.serverTimestamp(),
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

exports.getInvoiceDownloadUrl = onCall(
  {
    region: "europe-west1",
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError(
        "unauthenticated",
        "Bitte melde dich mit deinem Kundenkonto an."
      );
    }

    const orderId = String(
      request.data?.orderId || ""
    ).trim();

    if (!orderId) {
      throw new HttpsError(
        "invalid-argument",
        "Die Bestellung fehlt."
      );
    }

    const userId =
      request.auth.uid;

    /*
     * Die Purchase-ID ist bei dir die
     * Stripe-Session-ID und gleichzeitig
     * die ID in shopOrders.
     */
    const orderReference =
      db
        .collection("shopOrders")
        .doc(orderId);

    const orderSnapshot =
      await orderReference.get();

    if (!orderSnapshot.exists) {
      throw new HttpsError(
        "not-found",
        "Die Bestellung wurde nicht gefunden."
      );
    }

    const orderData =
      orderSnapshot.data();

    /*
     * Ganz wichtig:
     * Nur der Besitzer dieser Bestellung
     * darf die Rechnung abrufen.
     */
    if (
      orderData.checkoutMode !==
        "account" ||
      orderData.userId !==
        userId
    ) {
      throw new HttpsError(
        "permission-denied",
        "Du hast keinen Zugriff auf diese Rechnung."
      );
    }

    const invoiceStoragePath =
      String(
        orderData.invoiceStoragePath ||
          ""
      ).trim();

    if (
      !orderData.invoiceStored ||
      !invoiceStoragePath
    ) {
      throw new HttpsError(
        "not-found",
        "Für diese Bestellung ist noch keine Rechnung verfügbar."
      );
    }

    try {
      const bucket =
        orderData.invoiceStorageBucket
          ? getStorage().bucket(
              orderData.invoiceStorageBucket
            )
          : getStorage().bucket();

      const file =
        bucket.file(
          invoiceStoragePath
        );

      const [exists] =
        await file.exists();

      if (!exists) {
        throw new HttpsError(
          "not-found",
          "Die Rechnungsdatei wurde nicht gefunden."
        );
      }

      /*
       * Link ist nur 15 Minuten gültig.
       */
      const [downloadUrl] =
        await file.getSignedUrl({
          version: "v4",
          action: "read",
          expires:
            Date.now() +
            15 * 60 * 1000,
          responseDisposition:
            `attachment; filename="Rechnung-${orderData.invoiceNumber || "MamaTochterOnTour"}.pdf"`,
        });

      return {
        success: true,

        downloadUrl,

        invoiceNumber:
          orderData.invoiceNumber ||
          "",
      };
    } catch (error) {
      if (
        error instanceof
        HttpsError
      ) {
        throw error;
      }

      logger.error(
        "Invoice download failed",
        {
          orderId,
          userId,
          error:
            error?.message ||
            String(error),
        }
      );

      throw new HttpsError(
        "internal",
        "Die Rechnung konnte gerade nicht geladen werden."
      );
    }
  }
);
