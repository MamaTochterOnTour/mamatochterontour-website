import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostRedirect() {
  const { postId } = useParams();

  useEffect(() => {
    const appLink = `mamatochter://post/${postId}`;

    // Versuch: App öffnen
    window.location.href = appLink;

    // Fallback nach 1.5 Sekunden
    setTimeout(() => {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isIOS) {
        window.location.href =
          "https://apps.apple.com/de/app/momentry-by-mamatochterontour/id6754201898";
      } else {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.mycompany.reisetagebuch";
      }
    }, 1500);
  }, [postId]);

  return <p>Öffne Beitrag...</p>;
}