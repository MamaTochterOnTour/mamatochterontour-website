import { useEffect } from "react";
import {
  FiArrowRight,
  FiBookOpen,
  FiX,
  FiZap,
} from "react-icons/fi";

import "./ComingSoonModal.css";

const modalContent = {
  shop: {
    eyebrow: "Reiseguides",
    title: "Unsere Reiseguides erscheinen bald.",
    text:
      "Wir arbeiten gerade daran, unseren Online-Shop und alle Reiseguides für dich fertigzustellen. Schon bald kannst du hier unsere persönlichen Tipps, Erfahrungen und Empfehlungen entdecken.",
    buttonText: "Verstanden",
    icon: FiBookOpen,
  },

  webapp: {
    eyebrow: "Momentry Web-App",
    title: "Die Web-App erscheint bald.",
    text:
      "Wir arbeiten gerade an den letzten Funktionen der Momentry Web-App. Bis dahin kannst du Momentry by MamaTochterOnTour bereits über den App Store und Google Play entdecken.",
    buttonText: "Verstanden",
    icon: FiZap,
  },
};

function ComingSoonModal({
  open,
  type = "shop",
  onClose,
}) {
  const content =
    modalContent[type] || modalContent.shop;

  const Icon = content.icon;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="coming-soon-modal"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="coming-soon-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        aria-describedby="coming-soon-description"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className="coming-soon-modal__close"
          onClick={onClose}
          aria-label="Fenster schließen"
        >
          <FiX aria-hidden="true" />
        </button>

        <div className="coming-soon-modal__decoration">
          <span />
          <span />
        </div>

        <span className="coming-soon-modal__icon">
          <Icon aria-hidden="true" />
        </span>

        <span className="coming-soon-modal__eyebrow">
          {content.eyebrow}
        </span>

        <h2 id="coming-soon-title">
          {content.title}
        </h2>

        <p id="coming-soon-description">
          {content.text}
        </p>

        <button
          type="button"
          className="coming-soon-modal__button"
          onClick={onClose}
        >
          {content.buttonText}

          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default ComingSoonModal;