import { useParams } from "react-router-dom";

export default function PostPage() {
  const { postId } = useParams();

  const appStoreLink =
    "https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898";

  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch";

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📱 App erforderlich</h2>

      <p style={styles.text}>
        Du hast die App „Momentry by MamaTochterOnTour“ nicht installiert.
        <br />
        Dieser Beitrag kann nur in der App angezeigt werden.
      </p>

      <p style={styles.subtext}>
        Installiere die App, um diesen Post vollständig zu sehen.
      </p>

      <div style={styles.buttonContainer}>
        <a href={appStoreLink} style={styles.buttonIOS}>
          📲 iOS App herunterladen
        </a>

        <a href={playStoreLink} style={styles.buttonAndroid}>
          🤖 Android App herunterladen
        </a>
      </div>

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
    fontSize: "24px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
    maxWidth: "400px",
  },
  subtext: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "30px",
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
  postId: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#aaa",
  },
};