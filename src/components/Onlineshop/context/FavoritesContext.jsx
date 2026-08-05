import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../../firebase";

import {
  addFavoriteToFirestore,
  removeFavoriteFromFirestore,
  subscribeToFavorites,
} from "../services/favoritesService";

export const FavoritesContext = createContext(null);

const LOCAL_STORAGE_KEY = "mamaTochterOnTourShopFavorites";

function readLocalFavorites() {
  try {
    const storedFavorites = window.localStorage.getItem(
      LOCAL_STORAGE_KEY
    );

    if (!storedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(storedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return [
      ...new Set(
        parsedFavorites
          .filter(
            (productId) =>
              productId !== null &&
              productId !== undefined
          )
          .map(String)
      ),
    ];
  } catch (error) {
    console.error(
      "Lokale Favoriten konnten nicht gelesen werden:",
      error
    );

    return [];
  }
}

function saveLocalFavorites(favoriteIds) {
  try {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(favoriteIds)
    );
  } catch (error) {
    console.error(
      "Lokale Favoriten konnten nicht gespeichert werden:",
      error
    );
  }
}

function clearLocalFavorites() {
  try {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error(
      "Lokale Favoriten konnten nicht gelöscht werden:",
      error
    );
  }
}

export function FavoritesProvider({ children }) {

  
  const [currentUser, setCurrentUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [favoritesLoading, setFavoritesLoading] =
    useState(true);
  const [favoritesError, setFavoritesError] =
    useState(null);

  /*
   * Firebase-Loginstatus beobachten.
   */
  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setAuthLoading(false);
      }
    );

    return unsubscribeFromAuth;
  }, []);

  /*
   * Favoriten passend zum Loginstatus laden.
   *
   * Eingeloggt:
   * - lokale Favoriten nach Firestore übertragen
   * - Firestore-Favoriten in Echtzeit beobachten
   *
   * Ausgeloggt:
   * - Favoriten aus localStorage laden
   */
  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    setFavoritesError(null);

    if (!currentUser) {
      setFavoriteIds(readLocalFavorites());
      setFavoritesLoading(false);

      return undefined;
    }

    setFavoritesLoading(true);

    let isEffectActive = true;
    let unsubscribeFromFavorites = () => {};

    const connectFavorites = async () => {
      try {
        const localFavoriteIds = readLocalFavorites();

        /*
         * Favoriten, die vor dem Login lokal gespeichert wurden,
         * werden in Firestore übernommen.
         */
        if (localFavoriteIds.length > 0) {
          await Promise.all(
            localFavoriteIds.map((productId) =>
              addFavoriteToFirestore(
                currentUser.uid,
                productId
              )
            )
          );

          clearLocalFavorites();
        }

        if (!isEffectActive) {
          return;
        }

        unsubscribeFromFavorites = subscribeToFavorites(
          currentUser.uid,
          (firestoreFavoriteIds) => {
            if (!isEffectActive) {
              return;
            }

            setFavoriteIds(firestoreFavoriteIds);
            setFavoritesLoading(false);
          },
          (error) => {
            if (!isEffectActive) {
              return;
            }

            setFavoritesError(error);
            setFavoritesLoading(false);
          }
        );
      } catch (error) {
        console.error(
          "Favoriten konnten nicht verbunden werden:",
          error
        );

        if (isEffectActive) {
          setFavoritesError(error);
          setFavoritesLoading(false);
        }
      }
    };

    connectFavorites();

    return () => {
      isEffectActive = false;
      unsubscribeFromFavorites();
    };
  }, [authLoading, currentUser]);

  const isFavorite = useCallback(
    (productId) =>
      favoriteIds.includes(String(productId)),
    [favoriteIds]
  );

  const addFavorite = useCallback(
    async (productId) => {
      const normalizedProductId = String(productId);

      if (currentUser) {
        await addFavoriteToFirestore(
          currentUser.uid,
          normalizedProductId
        );

        return;
      }

      setFavoriteIds((currentFavoriteIds) => {
        if (
          currentFavoriteIds.includes(normalizedProductId)
        ) {
          return currentFavoriteIds;
        }

        const updatedFavoriteIds = [
          ...currentFavoriteIds,
          normalizedProductId,
        ];

        saveLocalFavorites(updatedFavoriteIds);

        return updatedFavoriteIds;
      });
    },
    [currentUser]
  );

  const removeFavorite = useCallback(
    async (productId) => {
      const normalizedProductId = String(productId);

      if (currentUser) {
        await removeFavoriteFromFirestore(
          currentUser.uid,
          normalizedProductId
        );

        return;
      }

      setFavoriteIds((currentFavoriteIds) => {
        const updatedFavoriteIds =
          currentFavoriteIds.filter(
            (favoriteId) =>
              favoriteId !== normalizedProductId
          );

        saveLocalFavorites(updatedFavoriteIds);

        return updatedFavoriteIds;
      });
    },
    [currentUser]
  );

  const removeFavorites = useCallback(
  async (productIds) => {
    const normalizedIds = productIds.map(String);

    if (currentUser) {
      await Promise.all(
        normalizedIds.map((productId) =>
          removeFavoriteFromFirestore(
            currentUser.uid,
            productId
          )
        )
      );

      return;
    }

    setFavoriteIds((currentFavoriteIds) => {
      const updatedFavoriteIds =
        currentFavoriteIds.filter(
          (favoriteId) =>
            !normalizedIds.includes(favoriteId)
        );

      saveLocalFavorites(updatedFavoriteIds);

      return updatedFavoriteIds;
    });
  },
  [currentUser]
);

  const toggleFavorite = useCallback(
    async (productId) => {
      try {
        setFavoritesError(null);

        if (isFavorite(productId)) {
          await removeFavorite(productId);
        } else {
          await addFavorite(productId);
        }
      } catch (error) {
        console.error(
          "Favoritenstatus konnte nicht geändert werden:",
          error
        );

        setFavoritesError(error);
      }
    },
    [addFavorite, isFavorite, removeFavorite]
  );

  const contextValue = useMemo(
    () => ({
      favoriteIds,
      favoriteCount: favoriteIds.length,
      favoritesLoading:
        authLoading || favoritesLoading,
      favoritesError,
      isFavorite,
      addFavorite,
      removeFavorite,
      removeFavorites,
      toggleFavorite,
      isLoggedIn: Boolean(currentUser),
    }),
    [
      addFavorite,
      authLoading,
      currentUser,
      favoriteIds,
      favoritesError,
      favoritesLoading,
      isFavorite,
      removeFavorite,
      removeFavorites,
      toggleFavorite,
    ]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}