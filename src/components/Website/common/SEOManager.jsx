
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import shopProducts from "../../../data/Onlineshop/shopProducts";

const DEFAULT_IMAGE = "https://mamatochterontour.de/og-image.jpg";

const seoPages = {
  "/": {
    title: "MamaTochterOnTour – Reiseerlebnisse, Tipps & Reiseguides",
    description:
      "Entdecke die Welt mit uns! Persönliche Reiseerlebnisse, ehrliche Tipps und praktische Reiseguides für dein nächstes Abenteuer.",
  },

  "/ueber-uns": {
    title: "Über uns – Lerne MamaTochterOnTour kennen",
    description:
      "Lerne MamaTochterOnTour kennen und erfahre mehr über unsere gemeinsamen Reisen und unsere Leidenschaft fürs Entdecken.",
  },

  "/momentry": {
    title: "Momentry – Reiseplanung, Erinnerungen & Community",
    description:
      "Entdecke Momentry: Plane deine Reisen, halte besondere Erinnerungen fest und tausche dich mit anderen Reisenden aus.",
  },

  "/kooperationen": {
    title: "Kooperationen mit MamaTochterOnTour",
    description:
      "Erfahre mehr über Kooperationsmöglichkeiten mit MamaTochterOnTour und unsere Zusammenarbeit mit Marken und Unternehmen.",
  },

  "/kontakt": {
    title: "Kontakt – MamaTochterOnTour",
    description:
      "Du hast Fragen, Anregungen oder möchtest mit uns zusammenarbeiten? Nimm Kontakt mit MamaTochterOnTour auf.",
  },

  "/shop": {
    title: "Online-Shop – Reiseguides & mehr | MamaTochterOnTour",
    description:
      "Entdecke unseren Online-Shop mit praktischen Reiseguides und digitalen Produkten für deine nächsten Abenteuer.",
  },

  "/shop/reiseguides": {
    title: "Reiseguides – Tipps für deine nächste Reise",
    description:
      "Entdecke unsere Reiseguides mit persönlichen Erfahrungen, praktischen Tipps und Inspiration für deine nächste Reise.",
  },
};

const noindexPaths = new Set([
  "/shop/login",
  "/shop/registrieren",
  "/shop/passwort-vergessen",
  "/shop/konto",
  "/shop/favoriten",
  "/shop/warenkorb",
  "/shop/checkout-erfolgreich",
  "/newsletter-bestaetigt",
  "/newsletter-abmelden",
]);

function makeDescription(text) {
  const normalized = String(text || "")
    .replace(/\s+/g, " ")
    .trim();

  if (normalized.length <= 155) {
    return normalized;
  }

  return `${normalized.slice(0, 152).replace(/\s+\S*$/, "")}…`;
}

export default function SEOManager() {
  const { pathname } = useLocation();

  const normalizedPath =
    pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  const page = seoPages[normalizedPath];

  if (page) {
    return (
      <SEO
        title={page.title}
        description={page.description}
        path={normalizedPath}
      />
    );
  }

  const guidePrefix = "/shop/reiseguides/";

  if (normalizedPath.startsWith(guidePrefix)) {
    const slug = normalizedPath.slice(guidePrefix.length);

    const product = shopProducts.find(
      (item) => item.slug === slug && item.active
    );

    if (product) {
      return (
        <SEO
          title={`${product.title} – Digitaler Reiseguide | MamaTochterOnTour`}
          description={makeDescription(
            product.seoDescription ||
              product.shortDescription ||
              product.description
          )}
          path={normalizedPath}
          image={product.imageUrl || DEFAULT_IMAGE}
        />
      );
    }
  }

  const isInvitation =
    normalizedPath.startsWith("/invite/") ||
    normalizedPath.startsWith("/app/trip/invite/");

  const noindex =
    noindexPaths.has(normalizedPath) || isInvitation;

  return (
    <SEO
      title="MamaTochterOnTour"
      description="Entdecke MamaTochterOnTour."
      path={normalizedPath}
      noindex={noindex || !page}
    />
  );
}
