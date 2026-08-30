const GA_MEASUREMENT_ID = "G-0RR2Y8KE1J";

let analyticsLoaded = false;

function createGtag() {
  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
}

export function loadGoogleAnalytics() {
  if (typeof window === "undefined") {
    return;
  }

  if (
    analyticsLoaded ||
    document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`
    )
  ) {
    return;
  }

  createGtag();

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const script = document.createElement("script");

  script.async = true;
  script.src =
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  document.head.appendChild(script);

  window.gtag("js", new Date());

  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  analyticsLoaded = true;
}

export function disableGoogleAnalytics() {
  if (typeof window === "undefined") {
    return;
  }

  createGtag();

  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  deleteGoogleAnalyticsCookies();
}

export function enableGoogleAnalytics() {
  if (typeof window === "undefined") {
    return;
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  loadGoogleAnalytics();

  createGtag();

  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function deleteGoogleAnalyticsCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const cookieName = cookie
      .split("=")[0]
      .trim();

    if (
      cookieName === "_ga" ||
      cookieName.startsWith("_ga_")
    ) {
      document.cookie =
        `${cookieName}=; Max-Age=0; path=/`;

      document.cookie =
        `${cookieName}=; Max-Age=0; path=/; domain=${window.location.hostname}`;

      document.cookie =
        `${cookieName}=; Max-Age=0; path=/; domain=.${window.location.hostname}`;
    }
  });
}

export function trackPageView(path) {
  if (
    typeof window === "undefined" ||
    !analyticsLoaded ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
}

export function trackEvent(eventName, parameters = {}) {
  if (
    typeof window === "undefined" ||
    !analyticsLoaded ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag(
    "event",
    eventName,
    parameters
  );
}