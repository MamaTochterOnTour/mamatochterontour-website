import { useMemo } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";
import shopProducts from "../../../data/Onlineshop/shopProducts";

import { FiHeart } from "react-icons/fi";

import useFavorites from "../hooks/useFavorites";

import "../styles/Reiseguides.css";

import useCart from "../hooks/useCart";

const categories = [
  {
    value: "all",
    label: "Alle Reiseguides",
  },
  {
    value: "kreuzfahrten",
    label: "Kreuzfahrt-Guides",
  },
  {
    value: "staedte",
    label: "Städte-Guides",
  },
  {
    value: "inseln",
    label: "Insel-Guides",
  },
  {
    value: "kurztrips",
    label: "Kurztrips",
  },
];

const destinations = [
  {
    value: "all",
    label: "Alle Reiseziele",
  },
  {
    value: "spanien",
    label: "Spanien",
  },
  {
    value: "italien",
    label: "Italien",
  },
  {
    value: "frankreich",
    label: "Frankreich",
  },
  {
    value: "oesterreich",
    label: "Österreich",
  },
  {
    value: "deutschland",
    label: "Deutschland",
  },
  {
    value: "vereinigtes-koenigreich",
    label: "Vereinigtes Königreich",
  },
];

function Reiseguides() {

    const {
    isFavorite,
    toggleFavorite,
    favoritesLoading,
  } = useFavorites();

  const {
  addToCart,
  removeFromCart,
  isInCart,
} = useCart();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const selectedCategory =
    searchParams.get("category") || "all";

  const selectedDestination =
    searchParams.get("destination") || "all";

  const selectedSort =
    searchParams.get("sort") || "default";

  const searchTerm =
    searchParams.get("search")?.trim().toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    let products = [...shopProducts];

    /*
     * Kategorie filtern
     */
    if (selectedCategory !== "all") {
      products = products.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    /*
     * Reiseziel filtern
     */
    if (selectedDestination !== "all") {
      products = products.filter(
        (product) =>
          product.destination === selectedDestination
      );
    }

    /*
     * Suchbegriff aus der Navbar übernehmen
     */
    if (searchTerm) {
      products = products.filter((product) => {
        const searchableContent = [
          product.title,
          product.subtitle,
          product.category,
          product.categoryLabel,
          product.destination,
          product.destinationLabel,
        ]
          .join(" ")
          .toLowerCase();

        return searchableContent.includes(searchTerm);
      });
    }

    /*
     * Manuell ausgewählte beliebte Produkte
     */
    if (selectedSort === "popular") {
      products = products
        .filter((product) => product.popular)
        .sort(
          (productA, productB) =>
            (productA.popularRank ?? 999) -
            (productB.popularRank ?? 999)
        );
    }

    /*
     * Preis aufsteigend
     */
    if (selectedSort === "price-ascending") {
      products.sort(
        (productA, productB) =>
          productA.price - productB.price
      );
    }

    /*
     * Preis absteigend
     */
    if (selectedSort === "price-descending") {
      products.sort(
        (productA, productB) =>
          productB.price - productA.price
      );
    }

    /*
     * Alphabetische Sortierung
     */
    if (selectedSort === "alphabetical") {
      products.sort((productA, productB) =>
        productA.title.localeCompare(
          productB.title,
          "de"
        )
      );
    }

    return products;
  }, [
    searchTerm,
    selectedCategory,
    selectedDestination,
    selectedSort,
  ]);


  const getPageTitle = () => {
    if (searchTerm) {
      return `Suchergebnisse für „${searchTerm}“`;
    }

    if (selectedSort === "popular") {
      return "Beliebte Reiseguides";
    }

    if (selectedCategory !== "all") {
      const category = categories.find(
        (item) =>
          item.value === selectedCategory
      );

      return category?.label || "Reiseguides";
    }

    if (selectedDestination !== "all") {
      const destination = destinations.find(
        (item) =>
          item.value === selectedDestination
      );

      return `Reiseguides für ${
        destination?.label || ""
      }`;
    }

    return "Alle Reiseguides";
  };

  return (
    <>
      <ShopNavbar />

      <main className="travel-guides-page">
        {/* Hero-Bereich */}
        <section className="travel-guides-hero">
  <div className="travel-guides-hero__top">

    <div>
      <h1>{getPageTitle()}</h1>

      <p>
        Entdecke unsere digitalen Reiseguides mit persönlichen
        Empfehlungen, besonderen Orten und hilfreichen Tipps.
        Jeder Guide wurde von uns persönlich getestet und mit
        viel Liebe selbst erstellt.
      </p>
    </div>


  </div>
</section>

        {/* Ergebnisübersicht */}
        <section className="travel-guides-results">

          {filteredProducts.length > 0 ? (
            <div className="travel-guides-grid">
              {filteredProducts.map((product) => (
  <Link
    key={product.id}
    to={`/shop/reiseguides/${product.slug}`}
    className="travel-guide-card"
  >
    <div className="travel-guide-card__image">
      <img
        src={product.imageUrl}
        alt={product.title}
      />
    </div>

    <div className="travel-guide-card__content">
      <h2>{product.title}</h2>

      <strong className="travel-guide-card__price">
        {product.price.toLocaleString("de-DE", {
          style: "currency",
          currency: "EUR",
        })}
      </strong>

      <div
        className="guide-card__actions"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          className="guide-card__cart"
          onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();

  if (isInCart(product.id)) {
    removeFromCart(product.id);
  } else {
    addToCart(product);
  }
}}
        >
          {isInCart(product.id)
            ? "✓ Im Warenkorb"
            : "In den Warenkorb"}
        </button>

        <button
          className={`travel-guide-card__favorite ${
            isFavorite(product.id)
              ? "is-favorite"
              : ""
          }`}
          onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleFavorite(product.id);
}}
        >
          <FiHeart
  fill={isFavorite(product.id) ? "currentColor" : "none"}
/>
        </button>
      </div>
    </div>
  </Link>
))}
            </div>
          ) : (
            <div className="travel-guides-empty">
              <span>Keine passenden Reiseguides gefunden</span>

            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Reiseguides;