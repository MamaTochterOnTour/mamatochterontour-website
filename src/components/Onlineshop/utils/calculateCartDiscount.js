function toCents(value) {
  return Math.round(Number(value || 0) * 100);
}

function fromCents(value) {
  return Number((value / 100).toFixed(2));
}

function createCandidate({
  type,
  label,
  percent,
  amountInCents,
  priority,
  description,
}) {
  return {
    type,
    label,
    percent,
    amount: fromCents(amountInCents),
    amountInCents,
    priority,
    description,
  };
}

export function calculateCartDiscount({
  cartItems,
  couponPercent = 0,
}) {
  const uniqueItems = Array.from(
    new Map(
      cartItems.map((item) => [
        String(item.id),
        item,
      ])
    ).values()
  );

  const subtotalInCents = uniqueItems.reduce(
    (total, item) =>
      total + toCents(item.price),
    0
  );

  /*
   * 1. Mengenrabatt
   * Nur Produkte mit discountGroup === "quantity".
   */
  const quantityItems = uniqueItems.filter(
    (item) =>
      item.discountGroup === "quantity"
  );

  const quantitySubtotalInCents =
    quantityItems.reduce(
      (total, item) =>
        total + toCents(item.price),
      0
    );

  let quantityPercent = 0;

  if (quantityItems.length >= 5) {
    quantityPercent = 15;
  } else if (quantityItems.length >= 3) {
    quantityPercent = 10;
  }

  const quantityDiscountInCents =
    Math.round(
      quantitySubtotalInCents *
        (quantityPercent / 100)
    );

  /*
   * 2. Bundle-Rabatt
   * Ein AIDA-Guide plus ein Kreuzfahrt-Guide.
   *
   * Falls mehrere Kreuzfahrt-Guides im Warenkorb
   * liegen, verwenden wir für das Bundle den
   * teuersten Kreuzfahrt-Guide. Das ergibt für
   * den Kunden die höchste Ersparnis.
   */
  const aidaItems = uniqueItems.filter(
    (item) => item.discountGroup === "aida"
  );

  const cruiseItems = uniqueItems.filter(
    (item) => item.discountGroup === "cruise"
  );

  const mostExpensiveAida = [...aidaItems].sort(
    (a, b) =>
      Number(b.price) - Number(a.price)
  )[0];

  const mostExpensiveCruise =
    [...cruiseItems].sort(
      (a, b) =>
        Number(b.price) - Number(a.price)
    )[0];

  const bundleComplete = Boolean(
    mostExpensiveAida &&
      mostExpensiveCruise
  );

  const bundleSubtotalInCents =
    bundleComplete
      ? toCents(mostExpensiveAida.price) +
        toCents(mostExpensiveCruise.price)
      : 0;

  const bundleDiscountInCents =
    Math.round(
      bundleSubtotalInCents * 0.1
    );

  /*
   * 3. Willkommens- oder Rabattcode
   * Gilt hier auf die gesamte Zwischensumme.
   */
  const normalizedCouponPercent =
    Math.max(
      0,
      Number(couponPercent) || 0
    );

  const couponDiscountInCents =
    Math.round(
      subtotalInCents *
        (normalizedCouponPercent / 100)
    );

  /*
   * Alle verfügbaren Rabatte werden separat
   * berechnet. Anschließend wird nur der höchste
   * Rabatt ausgewählt.
   */
  const candidates = [];

  if (quantityDiscountInCents > 0) {
    candidates.push(
      createCandidate({
        type: "quantity",
        label: "Mengenrabatt",
        percent: quantityPercent,
        amountInCents:
          quantityDiscountInCents,

        /*
         * Bei identischer Ersparnis gewinnt der
         * automatische Rabatt. Dadurch bleibt ein
         * Rabattcode für eine spätere Bestellung
         * erhalten.
         */
        priority: 3,

        description:
          `${quantityPercent} % Rabatt auf ${quantityItems.length} mengenrabattfähige Reiseguides`,
      })
    );
  }

  if (bundleDiscountInCents > 0) {
    candidates.push(
      createCandidate({
        type: "bundle",
        label: "AIDA-Kreuzfahrt-Bundle",
        percent: 10,
        amountInCents:
          bundleDiscountInCents,
        priority: 2,
        description:
          "10 % Rabatt auf den AIDA-Guide und einen Kreuzfahrt-Guide",
      })
    );
  }

  if (couponDiscountInCents > 0) {
    candidates.push(
      createCandidate({
        type: "coupon",
        label: "Willkommensrabatt",
        percent:
          normalizedCouponPercent,
        amountInCents:
          couponDiscountInCents,
        priority: 1,
        description:
          `${normalizedCouponPercent} % Rabatt auf deine Bestellung`,
      })
    );
  }

  const sortedCandidates = [...candidates].sort(
    (a, b) => {
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
    }
  );

  const appliedDiscount =
    sortedCandidates[0] || {
      type: "none",
      label: "Kein Rabatt",
      percent: 0,
      amount: 0,
      amountInCents: 0,
      description: "",
    };

  const totalInCents = Math.max(
    0,
    subtotalInCents -
      appliedDiscount.amountInCents
  );

  /*
   * Text für den Mengenrabatt-Fortschritt.
   */
  let quantityProgress = null;

  if (quantityItems.length < 3) {
    const missing = 3 - quantityItems.length;

    quantityProgress = {
      current: quantityItems.length,
      target: 3,
      percent:
        (quantityItems.length / 3) * 100,
      message:
        missing === 1
          ? "Noch 1 mengenrabattfähiger Guide bis zu 10 % Rabatt."
          : `Noch ${missing} mengenrabattfähige Guides bis zu 10 % Rabatt.`,
    };
  } else if (quantityItems.length < 5) {
    const missing = 5 - quantityItems.length;

    quantityProgress = {
      current: quantityItems.length,
      target: 5,
      percent:
        (quantityItems.length / 5) * 100,
      message:
        missing === 1
          ? "Noch 1 mengenrabattfähiger Guide bis zu 15 % Rabatt."
          : `Noch ${missing} mengenrabattfähige Guides bis zu 15 % Rabatt.`,
    };
  } else {
    quantityProgress = {
      current: quantityItems.length,
      target: 5,
      percent: 100,
      message:
        "Du hast die höchste Mengenrabatt-Stufe erreicht.",
    };
  }

  /*
   * Status des AIDA-Kreuzfahrt-Bundles.
   */
  let bundleProgress = null;

  if (
    aidaItems.length > 0 &&
    cruiseItems.length === 0
  ) {
    bundleProgress = {
      status: "missing-cruise",
      message:
        "Ergänze einen Kreuzfahrt-Guide und sichere dir 10 % Bundle-Rabatt.",
    };
  } else if (
    cruiseItems.length > 0 &&
    aidaItems.length === 0
  ) {
    bundleProgress = {
      status: "missing-aida",
      message:
        "Ergänze den AIDA-Guide und sichere dir 10 % Bundle-Rabatt.",
    };
  } else if (bundleComplete) {
    bundleProgress = {
      status: "complete",
      message:
        "Dein AIDA-Kreuzfahrt-Bundle ist vollständig.",
    };
  }

  return {
    subtotal: fromCents(
      subtotalInCents
    ),
    total: fromCents(totalInCents),

    appliedDiscount,
    candidates,

    quantityItems,
    quantityProgress,

    bundleProgress,
    bundleComplete,

    mostExpensiveAida,
    mostExpensiveCruise,
  };
}