import { Link } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";

import shopProducts from "../../../data/Onlineshop/shopProducts";
import useFavorites from "../hooks/useFavorites";
import useCart from "../hooks/useCart";

import "../styles/Favoriten.css";

function Favoriten() {
  const {
    favoriteIds,
    favoritesLoading,
    favoritesError,
    removeFavorite,
  } = useFavorites();

  const {
  addToCart,
  removeFromCart,
  isInCart,
} = useCart();

  const favoriteProducts = favoriteIds
    .map((favoriteId) =>
      shopProducts.find(
        (product) =>
          String(product.id) === String(favoriteId)
      )
    )
    .filter(Boolean);

  return (
    <>
      <ShopNavbar />

      <main className="favorites-page">
        <section className="favorites-hero">
          <span className="favorites-hero__icon">
            <FiHeart aria-hidden="true" />
          </span>

          <h1>Deine Favoriten</h1>

          <p>
            Hier findest du alle Reiseguides, die du für später
            gespeichert hast.
          </p>

        </section>

        <section className="favorites-content">
          {favoritesLoading && (
            <div className="favorites-status">
              <p>Favoriten werden geladen …</p>
            </div>
          )}

          {!favoritesLoading && favoritesError && (
            <div className="favorites-status favorites-status--error">
              <h2>Favoriten konnten nicht geladen werden</h2>

              <p>
                Bitte lade die Seite neu und versuche es noch
                einmal.
              </p>
            </div>
          )}

          {!favoritesLoading &&
            !favoritesError &&
            favoriteProducts.length === 0 && (
              <div className="favorites-empty">
                <span className="favorites-empty__icon">
                  <FiHeart aria-hidden="true" />
                </span>

                <h2>Noch keine Reiseguides gespeichert</h2>

                <p>
                  Tippe bei einem Reiseguide auf das Herz, um ihn
                  hier für später zu speichern.
                </p>

                <Link
                  to="/shop/reiseguides"
                  className="favorites-empty__button"
                >
                  Reiseguides entdecken
                </Link>
              </div>
            )}

          {!favoritesLoading &&
            !favoritesError &&
            favoriteProducts.length > 0 && (
              <div className="favorites-grid">
                {favoriteProducts.map((product) => (
                  <Link
  key={product.id}
  to={`/shop/reiseguides/${product.slug}`}
  className="favorite-card"
>
                    <div className="favorite-card__image">
  <img
    src={product.imageUrl}
    alt={product.title}
  />
</div>

                    <div className="favorite-card__content">
                      <h2>{product.title}</h2>

                      {product.shortDescription && (
                        <p>{product.shortDescription}</p>
                      )}

                      <strong>
                        {product.price.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </strong>

                      <div className="favorite-card__actions">
                       
                       <button
  type="button"
  className={`favorite-card__cart ${
    isInCart(product.id)
      ? "is-in-cart"
      : ""
  }`}
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
    ? "Im Warenkorb"
    : "In den Warenkorb"}
</button>

                        <button
                          type="button"
                          className="favorite-card__remove"
                          onClick={(event) => {
  event.preventDefault();
  event.stopPropagation();
  removeFavorite(product.id);
}}
                          aria-label={`${product.title} aus den Favoriten entfernen`}
                          title="Aus Favoriten entfernen"
                        >
                          <FiTrash2 aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Favoriten;