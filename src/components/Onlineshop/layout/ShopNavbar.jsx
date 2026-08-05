import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiChevronDown,
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./ShopNavbar.css";

import useFavorites from "../hooks/useFavorites";
import useCart from "../hooks/useCart";

const guideLinks = [
  {
    label: "Alle Reiseguides",
    to: "/shop/reiseguides",
  },
  {
    label: "Beliebte Reiseguides",
    to: "/shop/reiseguides?sort=popular",
  },
  {
    label: "Kreuzfahrt-Guides",
    to: "/shop/reiseguides?category=kreuzfahrten",
  },
  {
    label: "Städte-Guides",
    to: "/shop/reiseguides?category=staedte",
  },
  {
    label: "Insel-Guides",
    to: "/shop/reiseguides?category=inseln",
  },
  {
    label: "Kurztrips",
    to: "/shop/reiseguides?category=kurztrips",
  },
];

const destinationLinks = [
  {
    label: "Spanien",
    to: "/shop/reiseguides?destination=spanien",
  },
  {
    label: "Italien",
    to: "/shop/reiseguides?destination=italien",
  },
  {
    label: "Frankreich",
    to: "/shop/reiseguides?destination=frankreich",
  },
  {
    label: "Österreich",
    to: "/shop/reiseguides?destination=oesterreich",
  },
  {
    label: "Deutschland",
    to: "/shop/reiseguides?destination=deutschland",
  },
  {
    label: "Vereinigtes Königreich",
    to: "/shop/reiseguides?destination=vereinigtes-koenigreich",
  },
];

function ShopNavbar() {
  const { favoriteCount } = useFavorites();
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] =
    useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileGuidesOpen, setMobileGuidesOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    announcementIndex,
    setAnnouncementIndex,
  ] = useState(0);

  const [mobileSearchOpen, setMobileSearchOpen] =
  useState(false);

  const announcements = useMemo(
    () => [
      {
        id: "newsletter",
        text: "Newsletter abonnieren und 10 % auf deine erste Bestellung sichern",
        active: true,
      },
      {
        id: "download",
        text: "Sofort nach dem Kauf verfügbar",
        active: true,
      },
      {
        id: "tested",
        text: "Von uns persönlich getestet und zusammengestellt",
        active: true,
      },
      {
        id: "payment",
        text: "Sichere und unkomplizierte Zahlung",
        active: true,
      },
    ],
    []
  );

  const activeAnnouncements =
    announcements.filter(
      (announcement) => announcement.active
    );

  useEffect(() => {
    if (activeAnnouncements.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setAnnouncementIndex(
        (currentIndex) =>
          (currentIndex + 1) %
          activeAnnouncements.length
      );
    }, 4000);

    return () =>
      window.clearInterval(interval);
  }, [activeAnnouncements.length]);

  useEffect(() => {
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setOpenDropdown(null);
      setMobileMenuOpen(false);
      setMobileGuidesOpen(false);
      setMobileSearchOpen(false);
    }
  };

  window.addEventListener(
    "keydown",
    handleEscape
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleEscape
    );
}, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearchTerm =
      searchTerm.trim();

    if (!trimmedSearchTerm) {
      return;
    }

    navigate(
      `/shop/reiseguides?search=${encodeURIComponent(
        trimmedSearchTerm
      )}`
    );

    setSearchTerm("");
    closeAllMenus();
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((currentDropdown) =>
      currentDropdown === dropdownName
        ? null
        : dropdownName
    );
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const closeAllMenus = () => {
  setOpenDropdown(null);
  setMobileMenuOpen(false);
  setMobileGuidesOpen(false);
  setMobileSearchOpen(false);
};

const openMobileSearch = () => {
  setMobileSearchOpen(true);

  setMobileMenuOpen(false);
  setMobileGuidesOpen(false);
  setOpenDropdown(null);
};

const closeMobileSearch = () => {
  setMobileSearchOpen(false);
  setSearchTerm("");
};

  const toggleMobileMenu = () => {
  setMobileSearchOpen(false);

  setMobileMenuOpen((current) => {
    const nextValue = !current;

    if (!nextValue) {
      setMobileGuidesOpen(false);
    }

    return nextValue;
  });

  setOpenDropdown(null);
};

  return (
    <header
      className={`shop-navbar ${
        mobileMenuOpen
          ? "shop-navbar--mobile-open"
          : ""
      }`}
    >
      {/* Rotierende Infoleiste */}
      <div className="shop-announcement-bar">
        <div className="shop-announcement-bar__content">
          <span
            className="shop-announcement-bar__dot"
            aria-hidden="true"
          />

          <span
            key={
              activeAnnouncements[
                announcementIndex
              ]?.id
            }
          >
            {
              activeAnnouncements[
                announcementIndex
              ]?.text
            }
          </span>
        </div>
      </div>

      {/* Hauptnavigation */}
      <div className="shop-navbar__main">
        <div className="shop-navbar__container">
  {mobileSearchOpen ? (
    <form
      className="shop-navbar__inline-mobile-search"
      onSubmit={handleSearchSubmit}
    >
      <FiSearch aria-hidden="true" />

      <input
        type="search"
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
        placeholder="Reiseguide suchen"
        aria-label="Reiseguide suchen"
        autoFocus
      />

      <button
        type="button"
        className="shop-navbar__inline-search-close"
        onClick={closeMobileSearch}
        aria-label="Suche schließen"
      >
        <FiX aria-hidden="true" />
      </button>
    </form>
  ) : (
    <>
      <Link
        to="/shop"
        className="shop-navbar__logo"
        onClick={closeAllMenus}
      >
        <span className="shop-navbar__logo-main">
          MamaTochterOnTour
        </span>
      </Link>

      {/* Desktop-Navigation */}
      <nav
        className="shop-navbar__navigation"
        aria-label="Online-Shop Navigation"
      >
        <Link
          to="/shop"
          className="shop-navbar__nav-link"
          onClick={closeDropdown}
        >
          Home
        </Link>

        <div className="shop-navbar__dropdown">
          <button
            type="button"
            className={`shop-navbar__nav-link shop-navbar__dropdown-button ${
              openDropdown === "guides"
                ? "is-active"
                : ""
            }`}
            aria-expanded={
              openDropdown === "guides"
            }
            aria-controls="shop-guides-dropdown"
            onClick={() =>
              toggleDropdown("guides")
            }
          >
            Reiseguides

            <FiChevronDown
              className="shop-navbar__chevron"
              aria-hidden="true"
            />
          </button>

          {openDropdown === "guides" && (
            <div
              id="shop-guides-dropdown"
              className="shop-navbar__dropdown-menu shop-navbar__dropdown-menu--mega"
            >
              <div className="shop-navbar__dropdown-column">
                <span className="shop-navbar__dropdown-label">
                  Reiseguides
                </span>

                {guideLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeDropdown}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="shop-navbar__dropdown-column">
                <span className="shop-navbar__dropdown-label">
                  Reiseziele
                </span>

                {destinationLinks.map(
                  (link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeDropdown}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="shop-navbar__actions">
        <form
          className="shop-navbar__search shop-navbar__search--desktop"
          onSubmit={handleSearchSubmit}
        >
          <FiSearch aria-hidden="true" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Reiseguide suchen"
            aria-label="Reiseguide suchen"
          />
        </form>

        {/* Neue mobile Lupe */}
        <button
          type="button"
          className="shop-navbar__icon-button shop-navbar__mobile-search-toggle"
          onClick={openMobileSearch}
          aria-label="Reiseguide suchen"
          title="Suche"
        >
          <FiSearch aria-hidden="true" />
        </button>

        <Link
          to="/shop/favoriten"
          className="shop-navbar__icon-button shop-navbar__favorites"
          aria-label={
            favoriteCount > 0
              ? `Favoriten öffnen, ${favoriteCount} gespeichert`
              : "Favoriten öffnen"
          }
          title="Favoriten"
          onClick={closeAllMenus}
        >
          <FiHeart aria-hidden="true" />

          {favoriteCount > 0 && (
            <span className="shop-navbar__favorite-count">
              {favoriteCount > 99
                ? "99+"
                : favoriteCount}
            </span>
          )}
        </Link>

        <Link
          to="/shop/konto"
          className="shop-navbar__icon-button shop-navbar__account"
          aria-label="Kundenkonto öffnen"
          title="Kundenkonto"
          onClick={closeAllMenus}
        >
          <FiUser aria-hidden="true" />
        </Link>

        <Link
          to="/shop/warenkorb"
          className="shop-navbar__icon-button shop-navbar__cart"
          aria-label={
            cartCount > 0
              ? `Warenkorb öffnen, ${cartCount} Artikel`
              : "Warenkorb öffnen"
          }
          title="Warenkorb"
          onClick={closeAllMenus}
        >
          <FiShoppingBag aria-hidden="true" />

          {cartCount > 0 && (
            <span className="shop-navbar__cart-count">
              {cartCount > 99
                ? "99+"
                : cartCount}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="shop-navbar__mobile-toggle"
          aria-label={
            mobileMenuOpen
              ? "Shop-Menü schließen"
              : "Shop-Menü öffnen"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="shop-mobile-menu"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <FiX aria-hidden="true" />
          ) : (
            <FiMenu aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  )}
</div>

        {/* Tablet- und Handy-Menü */}
        <div
          id="shop-mobile-menu"
          className="shop-navbar__mobile-menu"
          aria-hidden={!mobileMenuOpen}
        >
          <div className="shop-navbar__mobile-menu-inner">

            <nav
              className="shop-navbar__mobile-navigation"
              aria-label="Mobile Online-Shop Navigation"
            >
              <Link
                to="/shop"
                className="shop-navbar__mobile-link"
                onClick={closeAllMenus}
              >
                Home
              </Link>

              <div className="shop-navbar__mobile-guides">
                <button
                  type="button"
                  className={`shop-navbar__mobile-link shop-navbar__mobile-guides-button ${
                    mobileGuidesOpen
                      ? "is-active"
                      : ""
                  }`}
                  aria-expanded={
                    mobileGuidesOpen
                  }
                  onClick={() =>
                    setMobileGuidesOpen(
                      (current) => !current
                    )
                  }
                >
                  <span>Reiseguides</span>

                  <FiChevronDown
                    aria-hidden="true"
                  />
                </button>

                <div className="shop-navbar__mobile-guides-panel">
                  <div className="shop-navbar__mobile-guides-inner">
                    <div className="shop-navbar__mobile-column">
                      <span className="shop-navbar__mobile-label">
                        Reiseguides
                      </span>

                      {guideLinks.map(
                        (link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={
                              closeAllMenus
                            }
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </div>

                    <div className="shop-navbar__mobile-column">
                      <span className="shop-navbar__mobile-label">
                        Reiseziele
                      </span>

                      {destinationLinks.map(
                        (link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={
                              closeAllMenus
                            }
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShopNavbar;