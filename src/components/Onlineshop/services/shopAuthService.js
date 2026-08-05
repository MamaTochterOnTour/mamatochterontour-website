import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  OAuthProvider,
} from "firebase/auth";

import { auth } from "../../../firebase";

/**
 * Registrierung mit E-Mail und Passwort
 */
export async function registerShopUserWithEmail(
  email,
  password
) {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

/**
 * Anmeldung mit E-Mail und Passwort
 */
export async function loginShopUserWithEmail(
  email,
  password
) {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

/**
 * Anmeldung über Google
 */
export async function loginShopUserWithGoogle() {
  const provider = new GoogleAuthProvider();

  const userCredential = await signInWithPopup(
    auth,
    provider
  );

  return userCredential.user;
}

export async function loginShopUserWithApple() {
  const provider = new OAuthProvider("apple.com");

  provider.addScope("email");
  provider.addScope("name");

  const userCredential = await signInWithPopup(
    auth,
    provider
  );

  return userCredential.user;
}

/**
 * Abmelden
 */
export async function logoutShopUser() {
  await signOut(auth);
}

/**
 * Passwort-zurücksetzen-Mail versenden
 */
export async function sendShopPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Verständliche deutsche Fehlermeldungen
 */
export function getShopAuthErrorMessage(error) {
  const errorCode = error?.code;

  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Für diese E-Mail-Adresse besteht bereits ein Konto.";

    case "auth/invalid-email":
      return "Bitte gib eine gültige E-Mail-Adresse ein.";

    case "auth/password-does-not-meet-requirements":
  return "Das Passwort erfüllt die Sicherheitsanforderungen nicht. Verwende ein stärkeres Passwort.";

case "auth/operation-not-allowed":
  return "Die Registrierung mit E-Mail und Passwort ist momentan nicht aktiviert.";

case "auth/admin-restricted-operation":
  return "Die Registrierung ist momentan nicht freigegeben.";

case "auth/internal-error":
  return "Firebase konnte die Registrierung gerade nicht abschließen. Bitte versuche es erneut.";

    case "auth/weak-password":
      return "Das Passwort ist zu schwach. Verwende mindestens sechs Zeichen.";

    case "auth/missing-password":
      return "Bitte gib ein Passwort ein.";

    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-Mail-Adresse oder Passwort ist nicht korrekt.";

    case "auth/user-disabled":
      return "Dieses Benutzerkonto wurde deaktiviert.";

    case "auth/too-many-requests":
      return "Zu viele Anmeldeversuche. Bitte versuche es später erneut.";

    case "auth/popup-closed-by-user":
      return "Die Google-Anmeldung wurde abgebrochen.";

    case "auth/popup-blocked":
      return "Das Anmeldefenster wurde vom Browser blockiert.";

    case "auth/network-request-failed":
      return "Es besteht gerade keine Verbindung. Bitte prüfe deine Internetverbindung.";

    default:
      console.error("Unbekannter Firebase-Auth-Fehler:", error);

      return "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.";
  }
}