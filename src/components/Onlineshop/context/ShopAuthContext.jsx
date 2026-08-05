import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "../../../firebase";

const ShopAuthContext = createContext(null);

export function ShopAuthProvider({ children }) {
  // Benutzer aus Firebase Authentication
  const [currentUser, setCurrentUser] = useState(null);

  // Profildaten aus Firestore: Users/{uid}
  const [shopUser, setShopUser] = useState(null);

  // Zeigt, ob ein Firestore-Dokument vorhanden ist
  const [profileExists, setProfileExists] = useState(false);

  // Getrennte Ladezustände für Auth und Firestore
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let unsubscribeFromProfile = null;

    const unsubscribeFromAuth = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // Alten Firestore-Listener entfernen, falls der Benutzer wechselt
        if (unsubscribeFromProfile) {
          unsubscribeFromProfile();
          unsubscribeFromProfile = null;
        }

        setCurrentUser(firebaseUser);
        setAuthLoading(false);
        setProfileError(null);

        // Niemand ist eingeloggt
        if (!firebaseUser) {
          setShopUser(null);
          setProfileExists(false);
          setProfileLoading(false);
          return;
        }

        setProfileLoading(true);

        const userDocumentReference = doc(
          db,
          "Users",
          firebaseUser.uid
        );

        /*
         * Echtzeit-Listener für das Benutzerprofil.
         * Änderungen aus der App oder dem Shop werden dadurch
         * automatisch im Context aktualisiert.
         */
        unsubscribeFromProfile = onSnapshot(
          userDocumentReference,
          (snapshot) => {
            if (snapshot.exists()) {
              setShopUser({
                uid: snapshot.id,
                ...snapshot.data(),
              });

              setProfileExists(true);
            } else {
              /*
               * Der Firebase-Auth-Benutzer existiert,
               * aber noch kein Dokument unter Users/{uid}.
               */
              setShopUser(null);
              setProfileExists(false);
            }

            setProfileLoading(false);
            setProfileError(null);
          },
          (error) => {
            console.error(
              "Fehler beim Laden des Shop-Benutzerprofils:",
              error
            );

            setShopUser(null);
            setProfileExists(false);
            setProfileLoading(false);
            setProfileError(error);
          }
        );
      },
      (error) => {
        console.error(
          "Fehler beim Prüfen des Login-Status:",
          error
        );

        setCurrentUser(null);
        setShopUser(null);
        setProfileExists(false);
        setAuthLoading(false);
        setProfileLoading(false);
        setProfileError(error);
      }
    );

    return () => {
      unsubscribeFromAuth();

      if (unsubscribeFromProfile) {
        unsubscribeFromProfile();
      }
    };
  }, []);

  /*
   * Der gesamte Auth-Bereich lädt, solange entweder Firebase Auth
   * oder das Firestore-Profil noch geprüft wird.
   */
  const loading = authLoading || profileLoading;

  const value = useMemo(
    () => ({
      currentUser,
      shopUser,

      isLoggedIn: Boolean(currentUser),
      profileExists,

      loading,
      authLoading,
      profileLoading,

      profileError,
    }),
    [
      currentUser,
      shopUser,
      profileExists,
      loading,
      authLoading,
      profileLoading,
      profileError,
    ]
  );

  return (
    <ShopAuthContext.Provider value={value}>
      {children}
    </ShopAuthContext.Provider>
  );
}

export function useShopAuth() {
  const context = useContext(ShopAuthContext);

  if (!context) {
    throw new Error(
      "useShopAuth muss innerhalb des ShopAuthProvider verwendet werden."
    );
  }

  return context;
}

export default ShopAuthContext;