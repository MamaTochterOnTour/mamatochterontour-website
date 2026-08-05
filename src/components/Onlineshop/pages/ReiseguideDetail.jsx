import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";

import {
  FiEdit2,
  FiHeart,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import ShopNavbar from "../layout/ShopNavbar";
import Footer from "../../Website/layout/Footer";

import shopProducts from "../../../data/Onlineshop/shopProducts";

import useFavorites from "../hooks/useFavorites";
import useCart from "../hooks/useCart";

/*
 * Passe diesen Import bei dir gegebenenfalls an.
 * Entscheidend ist, dass deine Firebase-Datei
 * `db` und `auth` exportiert.
 */
import {
  auth,
  db,
} from "../../../firebase";

import "../styles/ReiseguideDetail.css";

function ReiseguideDetail() {
  const { slug } = useParams();

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

  const product = useMemo(
    () =>
      shopProducts.find(
        (guide) => guide.slug === slug
      ),
    [slug]
  );

  /*
   * Bewertung
   */
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [selectedRating, setSelectedRating] =
    useState(0);

  const [hoveredRating, setHoveredRating] =
    useState(0);

  const [reviewText, setReviewText] =
    useState("");

  const [reviewName, setReviewName] =
    useState("");

  const [reviewLoading, setReviewLoading] =
    useState(false);

  const [reviewMessage, setReviewMessage] =
    useState("");

    const [userProfiles, setUserProfiles] = useState({});

const [editingReviewId, setEditingReviewId] =
  useState(null);

const [editingRating, setEditingRating] =
  useState(0);

const [editingHoveredRating, setEditingHoveredRating] =
  useState(0);

const [editingText, setEditingText] =
  useState("");

const [reviewActionLoading, setReviewActionLoading] =
  useState(null);

const [currentTime, setCurrentTime] =
  useState(Date.now());

  /*
   * Firebase-Loginstatus beobachten
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);

        if (user?.displayName) {
          setReviewName(user.displayName);
        }
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
  const interval = window.setInterval(() => {
    setCurrentTime(Date.now());
  }, 60_000);

  return () => {
    window.clearInterval(interval);
  };
}, []);

  /*
   * Bewertungen dieses Produkts laden
   */
  useEffect(() => {
    if (!product?.id) {
      return undefined;
    }

    const reviewsReference = collection(
      db,
      "products",
      String(product.id),
      "reviews"
    );

    const reviewsQuery = query(
      reviewsReference,
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const loadedReviews =
          snapshot.docs.map((reviewDocument) => ({
            id: reviewDocument.id,
            ...reviewDocument.data(),
          }));

        setReviews(loadedReviews);
      },
      (error) => {
        console.error(
          "Bewertungen konnten nicht geladen werden:",
          error
        );
      }
    );

    return unsubscribe;
  }, [product?.id]);

  useEffect(() => {
  const loadUserProfiles = async () => {
    const userIds = [
      ...new Set(
        reviews
          .map((review) => review.userId)
          .filter(Boolean)
      ),
    ];

    const missingUserIds = userIds.filter(
      (userId) => !userProfiles[userId]
    );

    if (missingUserIds.length === 0) {
      return;
    }

    try {
      const profileEntries = await Promise.all(
        missingUserIds.map(async (userId) => {
          const userReference = doc(
            db,
            "Users",
            userId
          );

          const userSnapshot = await getDoc(
            userReference
          );

          if (!userSnapshot.exists()) {
            return [
              userId,
              {
                profilePicture: null,
              },
            ];
          }

          const userData = userSnapshot.data();

          return [
            userId,
            {
              profilePicture:
                userData.profilePicture || null,
            },
          ];
        })
      );

      setUserProfiles((currentProfiles) => ({
        ...currentProfiles,
        ...Object.fromEntries(profileEntries),
      }));
    } catch (error) {
      console.error(
        "Profilbilder konnten nicht geladen werden:",
        error
      );
    }
  };

  loadUserProfiles();
}, [reviews, userProfiles]);

const isGuestUser =
  !currentUser || currentUser.isAnonymous;

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) =>
        sum + Number(review.rating || 0),
      0
    );

    return total / reviews.length;
  }, [reviews]);

  const handleCartClick = () => {
    if (!product) {
      return;
    }

    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleReviewSubmit = async (event) => {
  event.preventDefault();

  setReviewMessage("");

  if (selectedRating < 1) {
    setReviewMessage(
      "Bitte wähle mindestens einen Stern aus."
    );
    return;
  }

  if (
    (!currentUser || currentUser.isAnonymous) &&
    !reviewName.trim()
  ) {
    setReviewMessage(
      "Bitte gib einen Namen oder ein Kürzel an."
    );
    return;
  }

  try {
    setReviewLoading(true);

    let reviewUser = currentUser;

    /*
     * Nicht angemeldete Person anonym bei Firebase
     * anmelden. Dadurch erhält auch ein Gast eine UID.
     */
    if (!reviewUser) {
      const anonymousCredential =
        await signInAnonymously(auth);

      reviewUser = anonymousCredential.user;
    }

    const reviewsReference = collection(
      db,
      "products",
      String(product.id),
      "reviews"
    );

    const registeredUser =
      !reviewUser.isAnonymous;

    await addDoc(reviewsReference, {
      productId: String(product.id),
      productSlug: product.slug,
      productTitle: product.title,

      rating: selectedRating,
      text: reviewText.trim(),

      /*
       * Auch Gäste besitzen nun intern eine UID.
       */
      userId: reviewUser.uid,

      userType: registeredUser
        ? "registered"
        : "guest",

      authorName: registeredUser
        ? reviewUser.displayName ||
          reviewUser.email ||
          "Nutzer"
        : reviewName.trim() || "Gast",

      authorEmail: registeredUser
        ? reviewUser.email ?? null
        : null,

      createdAt: serverTimestamp(),
      updatedAt: null,
    });

    setSelectedRating(0);
    setHoveredRating(0);
    setReviewText("");

    /*
     * Den Gastnamen nicht unbedingt löschen:
     * So kann derselbe Gast leichter erneut bewerten.
     */
    if (registeredUser) {
      setReviewName(
        reviewUser.displayName || ""
      );
    }

    setReviewMessage(
      "Vielen Dank! Deine Bewertung wurde gespeichert."
    );
  } catch (error) {
    console.error(
      "Bewertung konnte nicht gespeichert werden:",
      error
    );

    setReviewMessage(
      "Deine Bewertung konnte leider nicht gespeichert werden."
    );
  } finally {
    setReviewLoading(false);
  }
};

const isOwnReview = (review) => {
  return Boolean(
    currentUser?.uid &&
    review.userId === currentUser.uid
  );
};

const startEditingReview = (review) => {
  if (!isOwnReview(review)) {
    return;
  }

  setEditingReviewId(review.id);
  setEditingRating(
    Number(review.rating || 0)
  );
  setEditingHoveredRating(0);
  setEditingText(review.text || "");
  setReviewMessage("");
};

const cancelEditingReview = () => {
  setEditingReviewId(null);
  setEditingRating(0);
  setEditingHoveredRating(0);
  setEditingText("");
};

const handleUpdateReview = async (review) => {
  if (!isOwnReview(review)) {
    setReviewMessage(
      "Du kannst nur deine eigene Bewertung bearbeiten."
    );
    return;
  }

  if (editingRating < 1) {
    setReviewMessage(
      "Bitte wähle mindestens einen Stern aus."
    );
    return;
  }

  try {
    setReviewActionLoading(review.id);
    setReviewMessage("");

    const reviewReference = doc(
      db,
      "products",
      String(product.id),
      "reviews",
      review.id
    );

    await updateDoc(reviewReference, {
      rating: editingRating,
      text: editingText.trim(),
      updatedAt: serverTimestamp(),
    });

    cancelEditingReview();

    setReviewMessage(
      "Deine Bewertung wurde aktualisiert."
    );
  } catch (error) {
    console.error(
      "Bewertung konnte nicht aktualisiert werden:",
      error
    );

    setReviewMessage(
      "Deine Bewertung konnte nicht aktualisiert werden."
    );
  } finally {
    setReviewActionLoading(null);
  }
};

const handleDeleteReview = async (review) => {
  if (!isOwnReview(review)) {
    setReviewMessage(
      "Du kannst nur deine eigene Bewertung löschen."
    );
    return;
  }

  const shouldDelete = window.confirm(
    "Möchtest du deine Bewertung wirklich löschen?"
  );

  if (!shouldDelete) {
    return;
  }

  try {
    setReviewActionLoading(review.id);
    setReviewMessage("");

    const reviewReference = doc(
      db,
      "products",
      String(product.id),
      "reviews",
      review.id
    );

    await deleteDoc(reviewReference);

    if (editingReviewId === review.id) {
      cancelEditingReview();
    }

    setReviewMessage(
      "Deine Bewertung wurde gelöscht."
    );
  } catch (error) {
    console.error(
      "Bewertung konnte nicht gelöscht werden:",
      error
    );

    setReviewMessage(
      "Deine Bewertung konnte nicht gelöscht werden."
    );
  } finally {
    setReviewActionLoading(null);
  }
};

const getReviewDate = (timestamp) => {
  if (!timestamp?.toDate) {
    return null;
  }

  return timestamp.toDate();
};

const formatRelativeTime = (timestamp) => {
  const reviewDate = getReviewDate(timestamp);

  if (!reviewDate) {
    return "Gerade eben";
  }

  const differenceInSeconds = Math.round(
    (reviewDate.getTime() - currentTime) /
      1000
  );

  const absoluteSeconds = Math.abs(
    differenceInSeconds
  );

  const formatter = new Intl.RelativeTimeFormat(
    "de",
    {
      numeric: "always",
    }
  );

  if (absoluteSeconds < 60) {
    return formatter.format(
      differenceInSeconds,
      "second"
    );
  }

  const differenceInMinutes = Math.round(
    differenceInSeconds / 60
  );

  if (Math.abs(differenceInMinutes) < 60) {
    return formatter.format(
      differenceInMinutes,
      "minute"
    );
  }

  const differenceInHours = Math.round(
    differenceInMinutes / 60
  );

  if (Math.abs(differenceInHours) < 24) {
    return formatter.format(
      differenceInHours,
      "hour"
    );
  }

  const differenceInDays = Math.round(
    differenceInHours / 24
  );

  if (Math.abs(differenceInDays) < 7) {
    return formatter.format(
      differenceInDays,
      "day"
    );
  }

  const differenceInWeeks = Math.round(
    differenceInDays / 7
  );

  if (Math.abs(differenceInWeeks) < 5) {
    return formatter.format(
      differenceInWeeks,
      "week"
    );
  }

  const differenceInMonths = Math.round(
    differenceInDays / 30
  );

  if (Math.abs(differenceInMonths) < 12) {
    return formatter.format(
      differenceInMonths,
      "month"
    );
  }

  const differenceInYears = Math.round(
    differenceInDays / 365
  );

  return formatter.format(
    differenceInYears,
    "year"
  );
};

const formatExactDate = (timestamp) => {
  const reviewDate = getReviewDate(timestamp);

  if (!reviewDate) {
    return "";
  }

  return reviewDate.toLocaleDateString(
    "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
};

  if (!product) {
    return (
      <>
        <ShopNavbar />

        <main className="guide-detail-page">
          <div className="guide-detail-not-found">
            <h1>Reiseguide nicht gefunden</h1>

            <Link to="/shop/reiseguides">
              Zurück zu allen Reiseguides
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const productIsFavorite =
    isFavorite(product.id);

  const productIsInCart =
    isInCart(product.id);

  return (
    <>
      <ShopNavbar />

      <main className="guide-detail-page">
        {/* Produktbereich */}
        <section className="guide-detail">
          <div className="guide-detail__image">
            <img
              src={product.imageUrl}
              alt={product.title}
            />
          </div>

          <div className="guide-detail__content">
            <span className="guide-detail__category">
              {product.categoryLabel}
            </span>

            <h1>{product.title}</h1>

            <div className="guide-detail__rating-summary">
              <div
                className="guide-detail__rating-stars"
                aria-label={
                  reviews.length > 0
                    ? `${averageRating.toFixed(
                        1
                      )} von 5 Sternen`
                    : "Noch keine Bewertungen"
                }
              >
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <FiStar
                      key={star}
                      fill={
                        star <=
                        Math.round(averageRating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  )
                )}
              </div>

              <span>
                {reviews.length > 0
                  ? `${averageRating.toFixed(
                      1
                    )} · ${
                      reviews.length
                    } ${
                      reviews.length === 1
                        ? "Bewertung"
                        : "Bewertungen"
                    }`
                  : "Noch keine Bewertungen"}
              </span>
            </div>

            <div className="guide-detail__price">
              {product.price.toLocaleString(
                "de-DE",
                {
                  style: "currency",
                  currency: "EUR",
                }
              )}
            </div>

            <p className="guide-detail__description">
              {product.shortDescription}
            </p>

            <ul className="guide-detail__features">
              {product.features?.map(
                (feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">
                      ✓
                    </span>

                    {feature}
                  </li>
                )
              )}
            </ul>

            <div className="guide-detail__buttons">
              <button
                type="button"
                className={`buy-button ${
                  productIsInCart
                    ? "is-in-cart"
                    : ""
                }`}
                onClick={handleCartClick}
              >
                {productIsInCart
                  ? "✓ Im Warenkorb"
                  : "In den Warenkorb"}
              </button>

              <button
                type="button"
                className={`wishlist-button ${
                  productIsFavorite
                    ? "is-favorite"
                    : ""
                }`}
                onClick={() =>
                  toggleFavorite(product.id)
                }
                disabled={favoritesLoading}
                aria-pressed={
                  productIsFavorite
                }
              >
                <FiHeart
                  aria-hidden="true"
                  fill={
                    productIsFavorite
                      ? "currentColor"
                      : "none"
                  }
                />

                {productIsFavorite
                  ? "Aus Wunschliste entfernen"
                  : "Zur Wunschliste hinzufügen"}
              </button>
            </div>

            <div className="guide-detail__trust">
              <div>
                <strong>
                  Sofort verfügbar
                </strong>

                <span>
                  Digitaler Download nach dem
                  Kauf
                </span>
              </div>

              <div>
                <strong>
                  Persönlich erstellt
                </strong>

                <span>
                  Unsere eigenen Tipps und
                  Erfahrungen
                </span>
              </div>

              <div>
                <strong>
                  Flexibel nutzbar
                </strong>

                <span>
                  Auf Smartphone, Tablet und
                  Laptop
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="guide-product-description">
  <span className="guide-section-eyebrow">
    Über diesen Reiseguide
  </span>


  <div className="guide-product-description__text">
    <p>
      {product.description || "Für diesen Guide wurde noch keine Beschreibung hinterlegt."}
    </p>
  </div>
</section>

        {/* Bewertung abgeben */}
        <section className="guide-reviews-section">
          <div className="guide-reviews-heading">
            <div>
              <span className="guide-section-eyebrow">
                Deine Erfahrung
              </span>

              <h2>
                Reiseguide bewerten
              </h2>

              <p>
                Teile deine Erfahrung mit
                anderen Reisenden. Du kannst
                eine Sternebewertung und einen
                persönlichen Text hinterlassen.
              </p>
            </div>

            <div className="guide-reviews-overview">
              <strong>
                {reviews.length > 0
                  ? averageRating.toFixed(1)
                  : "–"}
              </strong>

              <div>
                <div className="guide-reviews-overview__stars">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FiStar
                        key={star}
                        fill={
                          star <=
                          Math.round(
                            averageRating
                          )
                            ? "currentColor"
                            : "none"
                        }
                      />
                    )
                  )}
                </div>

                <span>
                  {reviews.length}{" "}
                  {reviews.length === 1
                    ? "Bewertung"
                    : "Bewertungen"}
                </span>
              </div>
            </div>
          </div>

          <form
            className="guide-review-form"
            onSubmit={handleReviewSubmit}
          >
            <div className="guide-review-form__group">
              <label>
                Deine Sternebewertung
              </label>

              <div
                className="guide-review-stars"
                onMouseLeave={() =>
                  setHoveredRating(0)
                }
              >
                {[1, 2, 3, 4, 5].map(
                  (star) => {
                    const isActive =
                      star <=
                      (hoveredRating ||
                        selectedRating);

                    return (
                      <button
                        key={star}
                        type="button"
                        className={
                          isActive
                            ? "is-active"
                            : ""
                        }
                        onMouseEnter={() =>
                          setHoveredRating(
                            star
                          )
                        }
                        onFocus={() =>
                          setHoveredRating(
                            star
                          )
                        }
                        onBlur={() =>
                          setHoveredRating(0)
                        }
                        onClick={() =>
                          setSelectedRating(
                            star
                          )
                        }
                        aria-label={`${star} ${
                          star === 1
                            ? "Stern"
                            : "Sterne"
                        } vergeben`}
                      >
                        <FiStar
                          fill={
                            isActive
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {isGuestUser && (
              <div className="guide-review-form__group">
                <label htmlFor="review-name">
                  Dein Name oder Kürzel
                </label>

                <input
                  id="review-name"
                  type="text"
                  value={reviewName}
                  onChange={(event) =>
                    setReviewName(
                      event.target.value
                    )
                  }
                  maxLength={40}
                  placeholder="Zum Beispiel Katharina"
                />

                <small>
                  Deine Bewertung wird als
                  Gast gespeichert.
                </small>
              </div>
            )}

            {currentUser && !currentUser.isAnonymous && (
              <div className="guide-review-form__user">
                Du bewertest als{" "}
                <strong>
                  {currentUser.displayName ||
                    currentUser.email ||
                    "angemeldeter Nutzer"}
                </strong>
              </div>
            )}

            <div className="guide-review-form__group">
              <label htmlFor="review-text">
  Deine Bewertung{" "}
  <span className="optional-label">
    (optional)
  </span>
</label>

              <textarea
                id="review-text"
                value={reviewText}
                onChange={(event) =>
                  setReviewText(
                    event.target.value
                  )
                }
                rows={6}
                maxLength={1000}
                placeholder="Was hat dir an diesem Reiseguide besonders gut gefallen?"
              />

              <div className="guide-review-form__counter">
                {reviewText.length}/1000
              </div>
            </div>

            {reviewMessage && (
              <p className="guide-review-form__message">
                {reviewMessage}
              </p>
            )}

            <button
              type="submit"
              className="guide-review-submit"
              disabled={reviewLoading}
            >
              {reviewLoading
                ? "Bewertung wird gespeichert …"
                : "Bewertung abschicken"}
            </button>
          </form>

          {/* Vorhandene Bewertungen */}
          <div className="guide-review-list">
            <div className="guide-review-list__heading">
              <h2>
                Alle Bewertungen
              </h2>

              <span>
                {reviews.length}
              </span>
            </div>

            {reviews.length > 0 ? (
              <div className="guide-review-list__items">
                {reviews.map((review) => (
                  <article
  key={review.id}
  className="guide-review-card"
>
  <div className="guide-review-card__top">
    <div className="guide-review-card__author">
      <div className="guide-review-card__avatar">
        {userProfiles[
          review.userId
        ]?.profilePicture ? (
          <img
            src={
              userProfiles[review.userId]
                .profilePicture
            }
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>
            {(review.authorName || "Gast")
              .charAt(0)
              .toUpperCase()}
          </span>
        )}
      </div>

      <div>
        <strong>
          {review.authorName || "Gast"}
        </strong>

        <span>
          {review.userType === "registered"
            ? "Verifizierter Account"
            : "Gastbewertung"}
        </span>
      </div>
    </div>

    <div className="guide-review-card__meta">
      <time
        dateTime={
          getReviewDate(
            review.createdAt
          )?.toISOString() || undefined
        }
        title={formatExactDate(
          review.createdAt
        )}
      >
        {formatRelativeTime(
          review.createdAt
        )}

        {formatExactDate(
          review.createdAt
        ) && (
          <>
            {" "}
            •{" "}
            {formatExactDate(
              review.createdAt
            )}
          </>
        )}

        {review.updatedAt && (
          <span className="guide-review-card__edited">
            {" "}
            • bearbeitet
          </span>
        )}
      </time>

      {isOwnReview(review) && (
        <div className="guide-review-card__actions">
          {editingReviewId ===
          review.id ? (
            <button
              type="button"
              className="review-action-button"
              onClick={
                cancelEditingReview
              }
              aria-label="Bearbeitung abbrechen"
              title="Abbrechen"
            >
              <FiX />
            </button>
          ) : (
            <>
              <button
                type="button"
                className="review-action-button"
                onClick={() =>
                  startEditingReview(
                    review
                  )
                }
                aria-label="Bewertung bearbeiten"
                title="Bewertung bearbeiten"
              >
                <FiEdit2 />
              </button>

              <button
                type="button"
                className="review-action-button is-delete"
                onClick={() =>
                  handleDeleteReview(
                    review
                  )
                }
                disabled={
                  reviewActionLoading ===
                  review.id
                }
                aria-label="Bewertung löschen"
                title="Bewertung löschen"
              >
                <FiTrash2 />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </div>

  {editingReviewId === review.id ? (
    <div className="guide-review-edit">
      <div
        className="guide-review-stars guide-review-edit__stars"
        onMouseLeave={() =>
          setEditingHoveredRating(0)
        }
      >
        {[1, 2, 3, 4, 5].map(
          (star) => {
            const isActive =
              star <=
              (editingHoveredRating ||
                editingRating);

            return (
              <button
                key={star}
                type="button"
                className={
                  isActive
                    ? "is-active"
                    : ""
                }
                onMouseEnter={() =>
                  setEditingHoveredRating(
                    star
                  )
                }
                onFocus={() =>
                  setEditingHoveredRating(
                    star
                  )
                }
                onBlur={() =>
                  setEditingHoveredRating(
                    0
                  )
                }
                onClick={() =>
                  setEditingRating(star)
                }
                aria-label={`${star} ${
                  star === 1
                    ? "Stern"
                    : "Sterne"
                } vergeben`}
              >
                <FiStar
                  fill={
                    isActive
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            );
          }
        )}
      </div>

      <textarea
        value={editingText}
        onChange={(event) =>
          setEditingText(
            event.target.value
          )
        }
        rows={5}
        maxLength={1000}
        placeholder="Dein Bewertungstext – freiwillig"
      />

      <div className="guide-review-edit__footer">
        <span>
          {editingText.length}/1000
        </span>

        <div>
          <button
            type="button"
            className="guide-review-edit__cancel"
            onClick={
              cancelEditingReview
            }
          >
            Abbrechen
          </button>

          <button
            type="button"
            className="guide-review-edit__save"
            onClick={() =>
              handleUpdateReview(review)
            }
            disabled={
              reviewActionLoading ===
              review.id
            }
          >
            {reviewActionLoading ===
            review.id
              ? "Wird gespeichert …"
              : "Änderungen speichern"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="guide-review-card__stars">
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <FiStar
              key={star}
              fill={
                star <= review.rating
                  ? "currentColor"
                  : "none"
              }
            />
          )
        )}
      </div>

      {review.text && (
        <p>{review.text}</p>
      )}
    </>
  )}
</article>
                ))}
              </div>
            ) : (
              <div className="guide-review-empty">
                <FiStar />

                <h3>
                  Noch keine Bewertungen
                </h3>

                <p>
                  Sei die erste Person, die
                  diesen Reiseguide bewertet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ReiseguideDetail;