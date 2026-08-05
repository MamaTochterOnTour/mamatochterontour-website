import { Navigate, useLocation } from "react-router-dom";
import { useShopAuth } from "../context/ShopAuthContext";

function ShopProtectedRoute({ children }) {
  const {
    isLoggedIn,
    loading,
    profileError,
  } = useShopAuth();

  const location = useLocation();

  /*
   * Solange Firebase Authentication und das Benutzerprofil
   * noch geprüft werden, zeigen wir einen Ladezustand.
   */
  if (loading) {
    return (
      <div
        className="shop-auth-loading"
        role="status"
        aria-live="polite"
      >
        <div
          className="shop-auth-loading__spinner"
          aria-hidden="true"
        />

        <p>Dein Kundenkonto wird geladen …</p>
      </div>
    );
  }

  /*
   * Falls beim Laden des Firestore-Profils ein Fehler auftritt,
   * verhindern wir nicht automatisch den Zugriff.
   *
   * Der Nutzer ist weiterhin über Firebase eingeloggt.
   * Auf der Kontoseite können wir dann später eine passende
   * Fehlermeldung anzeigen.
   */
  if (profileError) {
    console.error(
      "Das Shop-Benutzerprofil konnte nicht vollständig geladen werden:",
      profileError
    );
  }

  /*
   * Nicht eingeloggte Nutzer werden zur Login-Seite geschickt.
   *
   * Die ursprünglich gewünschte Seite speichern wir unter
   * location.state.from. Nach dem Login können wir den Nutzer
   * dadurch wieder genau dorthin zurückleiten.
   */
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/shop/login"
        replace
        state={{
          from: location.pathname + location.search,
        }}
      />
    );
  }

  return children;
}

export default ShopProtectedRoute;