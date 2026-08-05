import { db } from "../../../firebase";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

/**
 * Erstellt nach einer E-Mail-Registrierung:
 *
 * 1. das gemeinsame Profil für die Reise-App
 *    unter Users/{uid}
 *
 * 2. das zusätzliche Shop-Profil
 *    unter shopUsers/{uid}
 */
export async function createShopUserProfileWithEmail(
  user,
  additionalData = {}
) {
  if (!user?.uid) {
    throw new Error(
      "Für das Benutzerprofil fehlt eine gültige UID."
    );
  }

  const appUserRef = doc(
    db,
    "Users",
    user.uid
  );

  const shopUserRef = doc(
    db,
    "shopUsers",
    user.uid
  );

  const profileData = {
    uid: user.uid,
    email:
      additionalData.email ||
      user.email ||
      "",
    firstName:
      additionalData.firstName || "",
    lastName:
      additionalData.lastName || "",
    username:
      additionalData.username || "",
    displayName:
      additionalData.displayName ||
      user.displayName ||
      "",
    photoURL: user.photoURL || "",
    provider: "email",
    updatedAt: serverTimestamp(),
  };

  const batch = writeBatch(db);

  /*
   * merge: true schützt bereits vorhandene Felder.
   * Das ist wichtig, falls die App unter Users/{uid}
   * später zusätzliche Daten speichert.
   */
  batch.set(
    appUserRef,
    {
      ...profileData,
      createdAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );

  batch.set(
    shopUserRef,
    {
      ...profileData,
      createdAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );

  await batch.commit();

  return {
    appUserRef,
    shopUserRef,
  };
}

/**
 * Erstellt bei Google-/Apple-Login automatisch ein Profil,
 * falls noch keines existiert.
 */
export async function ensureSocialShopUserProfile(user) {
  const userRef = doc(db, "shopUsers", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider:
        user.providerData?.[0]?.providerId?.replace(".com", "") || "social",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return userRef;
}

/**
 * Lädt das Profil eines Shop-Benutzers.
 */
export async function getShopUserProfile(uid) {
  const userRef = doc(db, "shopUsers", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

/**
 * Aktualisiert das Profil.
 */
export async function updateShopUserProfile(uid, data) {
  const userRef = doc(db, "shopUsers", uid);

  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deutsche Fehlermeldungen.
 */
export function getShopUserErrorMessage(error) {
  switch (error?.code) {
    case "permission-denied":
      return "Du hast keine Berechtigung.";

    case "not-found":
      return "Benutzerprofil wurde nicht gefunden.";

    case "unavailable":
      return "Firestore ist momentan nicht erreichbar.";

    default:
      console.error(error);
      return "Beim Speichern des Benutzerprofils ist ein Fehler aufgetreten.";
  }
}