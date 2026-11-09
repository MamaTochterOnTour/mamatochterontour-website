
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://www.mamatochterontour.de";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DIST_DIR = path.resolve("dist");

const staticPages = [
  {
    path: "/",
    title: "MamaTochterOnTour – Reiseerlebnisse, Tipps & Reiseguides",
    description:
      "Entdecke die Welt mit uns! Persönliche Reiseerlebnisse, ehrliche Tipps und praktische Reiseguides für dein nächstes Abenteuer.",
  },
  {
    path: "/ueber-uns",
    title: "Über uns – Lerne MamaTochterOnTour kennen",
    description:
      "Lerne MamaTochterOnTour kennen und erfahre mehr über unsere gemeinsamen Reisen und unsere Leidenschaft fürs Entdecken.",
  },
  {
    path: "/momentry",
    title: "Momentry – Reiseplanung, Erinnerungen & Community",
    description:
      "Entdecke Momentry: Plane deine Reisen, halte besondere Erinnerungen fest und tausche dich mit anderen Reisenden aus.",
  },
  {
    path: "/kooperationen",
    title: "Kooperationen mit MamaTochterOnTour",
    description:
      "Erfahre mehr über Kooperationsmöglichkeiten mit MamaTochterOnTour und unsere Zusammenarbeit mit Marken und Unternehmen.",
  },
  {
    path: "/kontakt",
    title: "Kontakt – MamaTochterOnTour",
    description:
      "Du hast Fragen, Anregungen oder möchtest mit uns zusammenarbeiten? Nimm Kontakt mit MamaTochterOnTour auf.",
  },
  {
    path: "/shop",
    title: "Online-Shop – Reiseguides & mehr | MamaTochterOnTour",
    description:
      "Entdecke unseren Online-Shop mit praktischen Reiseguides und digitalen Produkten für deine nächsten Abenteuer.",
  },
  {
    path: "/shop/reiseguides",
    title: "Reiseguides – Tipps für deine nächste Reise",
    description:
      "Entdecke unsere Reiseguides mit persönlichen Erfahrungen, praktischen Tipps und Inspiration für deine nächste Reise.",
  },

  {
    path: "/impressum",
    title: "Impressum – MamaTochterOnTour",
    description:
      "Impressum und rechtliche Anbieterinformationen von MamaTochterOnTour.",
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function makeDescription(text) {
  const normalized = String(text || "")
    .replace(/\s+/g, " ")
    .trim();

  if (normalized.length <= 155) {
    return normalized;
  }

  return `${normalized.slice(0, 152).replace(/\s+\S*$/, "")}…`;
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace("</head>", `  ${replacement}\n</head>`);
}

function createHtml(template, page) {
  const canonical = new URL(page.path, SITE_URL).href;
  const image = new URL(page.image || DEFAULT_IMAGE, SITE_URL).href;

  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = escapeHtml(canonical);
  const imageUrl = escapeHtml(image);

  let html = template;

  html = replaceTag(
    html,
    /<title\b[^>]*>[\s\S]*?<\/title>/i,
    `<title>${title}</title>`
  );

  const metaTags = [
    ["name", "description", description],
    ["name", "robots", "index, follow, max-image-preview:large"],
    ["property", "og:type", "website"],
    ["property", "og:site_name", "MamaTochterOnTour"],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", url],
    ["property", "og:image", imageUrl],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", imageUrl],
  ];

  for (const [attribute, key, content] of metaTags) {
    const pattern = new RegExp(
      `<meta\\s+(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`,
      "i"
    );

    html = replaceTag(
      html,
      pattern,
      `<meta ${attribute}="${key}" content="${content}" />`
    );
  }

  html = replaceTag(
    html,
    /<link\s+(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
   `<link rel="canonical" href="${url}" />`
  );

  return html;
}

async function main() {
  const template = await readFile(
    path.join(DIST_DIR, "index.html"),
    "utf8"
  );

  const productsModule = await import(
    pathToFileURL(
      path.resolve("src/data/Onlineshop/shopProducts.js")
    ).href
  );

  const products = productsModule.default;

  const guidePages = products
    .filter((product) => product.active && product.slug)
    .map((product) => ({
      path: `/shop/reiseguides/${product.slug}`,
      title: `${product.title} – Digitaler Reiseguide | MamaTochterOnTour`,
      description: makeDescription(
        product.seoDescription ||
          product.shortDescription ||
          product.description
      ),
      image: product.imageUrl || DEFAULT_IMAGE,
    }));

  const pages = [...staticPages, ...guidePages];

  for (const page of pages) {
    const html = createHtml(template, page);

    const outputPath =
      page.path === "/"
        ? path.join(DIST_DIR, "index.html")
        : path.join(DIST_DIR, page.path.slice(1), "index.html");

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf8");

    console.log(`SEO erstellt: ${page.path}`);
  }

  
  // Sitemap automatisch aus allen öffentlichen SEO-Seiten erstellen
  const sitemapEntries = pages
    .map((page) => {
      const url = new URL(page.path, SITE_URL).href;

      return `  <url>
    <loc>${escapeHtml(url)}</loc>
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

  await writeFile(
    path.join(DIST_DIR, "sitemap.xml"),
    sitemap,
    "utf8"
  );

  console.log(
    `Fertig! ${pages.length} SEO-Seiten und ${pages.length} Sitemap-URLs wurden erstellt.`
  );
}


main().catch((error) => {
  console.error("SEO-Generierung fehlgeschlagen:", error);
  process.exitCode = 1;
});
