import {
  useState,
} from "react";

import {
  NavLink,
  Link,
} from "react-router-dom";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./Navbar.css";

function Navbar() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const navLinkClass = ({
    isActive,
  }) =>
    isActive
      ? "navbar-link navbar-link-active"
      : "navbar-link";

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
  <>
    <header
      className={`navbar ${
        menuOpen
          ? "navbar--open"
          : ""
      }`}
    >
      <div className="navbar-main">
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          MamaTochterOnTour
        </Link>

        <nav
          className="navbar-navigation"
          aria-label="Hauptnavigation"
        >
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/momentry"
            className={navLinkClass}
          >
            Momentry
          </NavLink>

          <NavLink
            to="/kooperationen"
            className={navLinkClass}
          >
            Kooperationen
          </NavLink>

          <NavLink
            to="/kontakt"
            className={navLinkClass}
          >
            Kontakt
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link
            to="/shop"
            className="shop-button"
            onClick={closeMenu}
          >
            Reiseguides entdecken
          </Link>

          <a
  href="/app/"
  className="app-button"
  onClick={closeMenu}
>
  Web-App öffnen
</a>
        </div>

        <button
          type="button"
          className="navbar-menu-button"
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current
            )
          }
          aria-label={
            menuOpen
              ? "Navigation schließen"
              : "Navigation öffnen"
          }
          aria-expanded={
            menuOpen
          }
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <FiX
              aria-hidden="true"
            />
          ) : (
            <FiMenu
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="navbar-mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="navbar-mobile-menu__inner">
          <nav
            className="navbar-mobile-navigation"
            aria-label="Mobile Hauptnavigation"
          >
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>

            <NavLink
              to="/momentry"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Momentry
            </NavLink>

            <NavLink
              to="/kooperationen"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Kooperationen
            </NavLink>

            <NavLink
              to="/kontakt"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Kontakt
            </NavLink>
          </nav>

          <div className="navbar-mobile-actions">
            <Link
              to="/shop"
              className="shop-button"
              onClick={closeMenu}
            >
              Reiseguides entdecken
            </Link>

            <a
  href="/app/"
  className="app-button"
  onClick={closeMenu}
>
  Web-App öffnen
</a>
          </div>
        </div>
      </div>

        </header>
  </>
);
}

export default Navbar;