
import { useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.mamatochterontour.de";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

// Entfernt nur die SEO-Tags, die beim Build
// bereits in die HTML-Datei geschrieben wurden.
function removePrebuiltSeoTags() {
  const selectors = [
    "title",
    'meta[name="description"]',
    'meta[name="robots"]',
    'meta[property^="og:"]',
    'meta[name^="twitter:"]',
    'link[rel="canonical"]',
  ];

  document.head
    .querySelectorAll(selectors.join(","))
    .forEach((element) => {
      // Bereits von React Helmet verwaltete Tags
      // dürfen nicht entfernt werden.
      if (!element.hasAttribute("data-rh")) {
        element.remove();
      }
    });
}

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
}) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    removePrebuiltSeoTags();
    setReady(true);
  }, []);

  const canonicalUrl = new URL(path, SITE_URL).href;
  const imageUrl = new URL(image, SITE_URL).href;

  if (!ready) {
    return null;
  }

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MamaTochterOnTour" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
