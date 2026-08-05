import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";

const getFavoritesCollection = (userId) =>
  collection(db, "shopUsers", userId, "favorites");

const getFavoriteDocument = (userId, productId) =>
  doc(
    db,
    "shopUsers",
    userId,
    "favorites",
    String(productId)
  );

/**
 * Speichert einen Favoriten.
 *
 * Als Dokument-ID verwenden wir die Produkt-ID. Dadurch kann dasselbe
 * Produkt nicht mehrfach als Favorit gespeichert werden.
 */
export async function addFavoriteToFirestore(userId, productId) {
  if (!userId || productId === undefined || productId === null) {
    throw new Error(
      "Für das Speichern eines Favoriten fehlen userId oder productId."
    );
  }

  const favoriteReference = getFavoriteDocument(
    userId,
    productId
  );

  await setDoc(favoriteReference, {
    productId: String(productId),
    createdAt: serverTimestamp(),
  });
}

/**
 * Löscht einen Favoriten.
 */
export async function removeFavoriteFromFirestore(
  userId,
  productId
) {
  if (!userId || productId === undefined || productId === null) {
    throw new Error(
      "Für das Löschen eines Favoriten fehlen userId oder productId."
    );
  }

  const favoriteReference = getFavoriteDocument(
    userId,
    productId
  );

  await deleteDoc(favoriteReference);
}

/**
 * Hört in Echtzeit auf alle Favoriten eines Nutzers.
 *
 * Die Funktion gibt die unsubscribe-Funktion von Firestore zurück.
 */
export function subscribeToFavorites(
  userId,
  onFavoritesChange,
  onError
) {
  if (!userId) {
    return () => {};
  }

  const favoritesReference = getFavoritesCollection(userId);

  return onSnapshot(
    favoritesReference,
    (snapshot) => {
      const favoriteIds = snapshot.docs.map((favoriteDocument) => {
        const favoriteData = favoriteDocument.data();

        return String(
          favoriteData.productId ?? favoriteDocument.id
        );
      });

      onFavoritesChange(favoriteIds);
    },
    (error) => {
      console.error(
        "Favoriten konnten nicht geladen werden:",
        error
      );

      onError?.(error);
    }
  );
}