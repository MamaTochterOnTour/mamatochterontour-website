import { Link } from "react-router-dom";
import "../styles/OnlineShop.css";
import Footer from "../../Website/layout/Footer";
import ShopNavbar from "../layout/ShopNavbar";

import shopProducts from "../../../data/Onlineshop/shopProducts";

import { FiHeart } from "react-icons/fi";
import useFavorites from "../hooks/useFavorites";
import useCart from "../hooks/useCart";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function OnlineShop() {

  const bestseller =
  shopProducts.find(
    (product) => product.bestseller
  ) || shopProducts[0];

const {
  addToCart,
  removeFromCart,
  isInCart,
} = useCart();

const popularGuides = shopProducts
  .filter(
    (product) =>
      product.popular &&
      !product.bestseller
  )
  .sort((a, b) => a.popularRank - b.popularRank)
  .slice(0, 4);

const {
  isFavorite,
  toggleFavorite,
  favoritesLoading,
} = useFavorites();

  return (
    <>
    <ShopNavbar />
    <main className="online-shop-page">
      <section className="shop-hero">
        <div className="shop-hero__background" aria-hidden="true">
          <span className="shop-hero__glow shop-hero__glow--one" />
          <span className="shop-hero__glow shop-hero__glow--two" />
        </div>

        <div className="shop-hero__container">
          {/* Linke Seite: Inhalt */}
          <div className="shop-hero__content">
            <span className="shop-hero__eyebrow">
              Digitale Reiseguides
            </span>

            <h1 className="shop-hero__title">
              Reiseguides, die deinen Urlaub{" "}
              <span>noch schöner machen.</span>
            </h1>

            <p className="shop-hero__description">
              Persönliche Tipps, versteckte Orte und ehrliche Erfahrungen – gesammelt auf unseren eigenen Reisen und von uns als Mama-Tochter-Duo in übersichtlichen Reiseguides für dich zusammengestellt.
            </p>

            <div className="shop-hero__actions">
              <Link
                to="/shop/reiseguides"
                className="shop-hero__button shop-hero__button--primary"
              >
                Reiseguides entdecken
                <span aria-hidden="true">→</span>
              </Link>

              
            </div>

            <div className="shop-hero__benefits">
              <div className="shop-hero__benefit">
                <span className="shop-hero__check" aria-hidden="true">
                  ✓
                </span>
                Persönlich zusammengestellt
              </div>

              <div className="shop-hero__benefit">
                <span className="shop-hero__check" aria-hidden="true">
                  ✓
                </span>
                Sofort verfügbar
              </div>
            </div>
          </div>

          {/* Rechte Seite: später echtes Produktbild */}
          <div className="shop-hero__visual">
            <div className="shop-hero__visual-decoration shop-hero__visual-decoration--one" />
            <div className="shop-hero__visual-decoration shop-hero__visual-decoration--two" />

            <div className="shop-hero__product-card">


              <div className="shop-hero__image-wrapper">
  <Link
  to={`/shop/reiseguides/${bestseller.slug}`}
>
  <img
    src={bestseller.imageUrl}
    alt={bestseller.title}
    className="shop-hero__product-image"
  />
</Link>
</div>

<div className="shop-hero__product-badge">
  ⭐ Bestseller
</div>

<div className="shop-hero__product-info">

    <span className="shop-hero__product-category">
        {bestseller.categoryLabel}
    </span>

    <h2>{bestseller.title}</h2>

    <span className="shop-hero__product-price">
        {bestseller.price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
        })}
    </span>

    <div className="shop-hero__actions-row">

    <button
  className="shop-cart-button"
  onClick={() => {
    if (isInCart(bestseller.id)) {
      removeFromCart(bestseller.id);
    } else {
      addToCart(bestseller);
    }
  }}
>
  {isInCart(bestseller.id)
    ? "✓ Im Warenkorb"
    : "In den Warenkorb"}
</button>

    <button
        type="button"
        className={`travel-guide-card__favorite ${
            isFavorite(bestseller.id) ? "is-favorite" : ""
        }`}
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(bestseller.id);
        }}
        disabled={favoritesLoading}
        aria-pressed={isFavorite(bestseller.id)}
    >
        <FiHeart
            fill={
                isFavorite(bestseller.id)
                    ? "currentColor"
                    : "none"
            }
        />
    </button>

</div>

</div>
            </div>

          </div>
        </div>

      </section>
      <section className="popular-guides" id="beliebte-guides">
  <div className="popular-guides__container">

    <div className="popular-guides__header">

      <h2>Weitere beliebte Reiseguides</h2>

      <p>
        Entdecke weitere Reiseguides mit persönlichen Erfahrungen,
        Insider-Tipps und Empfehlungen aus unseren eigenen Reisen.
      </p>
    </div>


   {/* Desktop und Tablet: normales Grid */}
<div className="popular-guides__grid popular-guides__grid--desktop">
  {popularGuides.map((product) => (
    <Link
      key={product.id}
      to={`/shop/reiseguides/${product.slug}`}
      className="guide-card"
    >
      <img
        src={product.imageUrl}
        alt={product.title}
      />

      <div className="guide-card__content">
        <span className="guide-card__category">
          {product.categoryLabel}
        </span>

        <h3>{product.title}</h3>

        <span className="guide-card__price">
          {product.price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </span>

        <div className="guide-card__actions">
          <button
            type="button"
            className="guide-card__cart"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

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
            type="button"
            className={`travel-guide-card__favorite ${
              isFavorite(product.id)
                ? "is-favorite"
                : ""
            }`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              toggleFavorite(product.id);
            }}
            disabled={favoritesLoading}
            aria-label={
              isFavorite(product.id)
                ? `${product.title} aus Favoriten entfernen`
                : `${product.title} zu Favoriten hinzufügen`
            }
            aria-pressed={isFavorite(product.id)}
          >
            <FiHeart
              aria-hidden="true"
              fill={
                isFavorite(product.id)
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>
      </div>
    </Link>
  ))}
</div>

{/* Handy: Swiper mit einem Guide pro Ansicht */}
<div className="popular-guides__mobile-slider">
  <Swiper
    modules={[Pagination]}
    slidesPerView={1}
    spaceBetween={16}
    pagination={{
      clickable: true,
    }}
    className="popular-guides__swiper"
  >
    {popularGuides.map((product) => (
      <SwiperSlide key={product.id}>
        <Link
          to={`/shop/reiseguides/${product.slug}`}
          className="guide-card"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
          />

          <div className="guide-card__content">
            <span className="guide-card__category">
              {product.categoryLabel}
            </span>

            <h3>{product.title}</h3>

            <span className="guide-card__price">
              {product.price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </span>

            <div className="guide-card__actions">
              <button
                type="button"
                className="guide-card__cart"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

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
                type="button"
                className={`travel-guide-card__favorite ${
                  isFavorite(product.id)
                    ? "is-favorite"
                    : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  toggleFavorite(product.id);
                }}
                disabled={favoritesLoading}
                aria-label={
                  isFavorite(product.id)
                    ? `${product.title} aus Favoriten entfernen`
                    : `${product.title} zu Favoriten hinzufügen`
                }
                aria-pressed={isFavorite(product.id)}
              >
                <FiHeart
                  aria-hidden="true"
                  fill={
                    isFavorite(product.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    </div>

    <div className="popular-guides__button">
      <Link
        to="/shop/reiseguides"
        className="shop-hero__button shop-hero__button--primary"
      >
        Alle Reiseguides entdecken
      </Link>
    </div>

</section>

    </main>
    <Footer />
    </>
  );
}

export default OnlineShop;