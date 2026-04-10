import { useParams } from "react-router-dom";

export default function PostPage() {
  const { postId } = useParams();

  const appStoreLink =
    "https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898";

  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch";

  const openApp = () => {
    const deepLink = `mamatochter://p/${postId}`;

    // Versuch App zu öffnen
    window.location.href = deepLink;

    // Fallback: wenn App nicht installiert → bleib auf Seite
    setTimeout(() => {
      console.log("App nicht geöffnet → bleibe auf Webseite");
    }, 1200);
  };

  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>📲 Beitrag in der App öffnen</h2>

      {/* 🔥 1. OPEN APP BUTTON */}
      <button onClick={openApp} style={styles.openButton}>
        📲 In der App öffnen
      </button>

      {/* INFO TEXT */}
      <p style={styles.text}>
        Dieser Beitrag ist nur in der App vollständig verfügbar.
      </p>

      <p style={styles.subtext}>
        Falls du die App noch nicht hast, lade sie dir hier herunter:
      </p>

      {/* STORE BUTTONS */}
      <div style={styles.buttonContainer}>
        <a href={appStoreLink} style={styles.buttonIOS}>
          📲 iOS App herunterladen
        </a>

        <a href={playStoreLink} style={styles.buttonAndroid}>
          🤖 Android App herunterladen
        </a>
      </div>

      {/* RETURN INFO */}
      <p style={styles.returnText}>
        Nach der Installation kommst du hierher zurück und öffnest den Link erneut.
      </p>

      <p style={styles.postId}>Post-ID: {postId}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    textAlign: "center",
    fontFamily: "sans-serif",
  },

  title: {
    fontSize: "22px",
    marginBottom: "20px",
  },

  openButton: {
    padding: "14px 20px",
    backgroundColor: "#6c5ce7",
    color: "white",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
  },

  text: {
    fontSize: "16px",
    marginBottom: "10px",
    maxWidth: "400px",
  },

  subtext: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  buttonIOS: {
    padding: "12px 20px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
  },

  buttonAndroid: {
    padding: "12px 20px",
    backgroundColor: "#3ddc84",
    color: "black",
    borderRadius: "10px",
    textDecoration: "none",
  },

  returnText: {
    marginTop: "25px",
    fontSize: "13px",
    color: "#777",
  },

  postId: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#aaa",
  },
};