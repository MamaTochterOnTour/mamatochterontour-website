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

    // Optionaler Fallback (bleibt einfach auf Seite)
    setTimeout(() => {
      console.log("App nicht geöffnet");
    }, 1200);
  };

  return (
    <div style={styles.container}>
      
      <h2 style={styles.title}>✨ Schau dir diesen Beitrag an</h2>

      {/* OPEN APP BUTTON */}
      <button onClick={openApp} style={styles.openButton}>
        🚀 In der App öffnen
      </button>

      {/* DOWNLOAD TEXT */}
      <p style={styles.subtext}>
        Noch nicht installiert? Lade dir die App kostenlos herunter:
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
        💡 Nach der Installation einfach diesen Link erneut öffnen.
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
    padding: "16px 24px",
    background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    color: "white",
    borderRadius: "14px",
    border: "none",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
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