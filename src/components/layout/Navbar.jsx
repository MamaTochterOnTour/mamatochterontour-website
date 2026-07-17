import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "App", path: "/reiseapp" },
    { name: "Shop", path: "/shop" },
    { name: "Über uns", path: "/ueber-uns" },
    { name: "Business", path: "/business" },
    { name: "Kontakt", path: "/kontakt" },
  ];


  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* MOBILE HAMBURGER */}

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(true)}
        >
          <span className="hamburger-icon">
  ☰
</span>
        </button>



        {/* DESKTOP NAVIGATION */}

        <nav className="navbar-links">

          {links.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              className={({isActive}) =>
                isActive ? "active" : ""
              }
            >

              {link.name}

            </NavLink>

          ))}

        </nav>



        {/* APP BUTTON */}

        <a
          href="/app"
          className="app-link"
        >
          App öffnen →
        </a>



        {/* MOBILE MENU */}

        <div
          className={
            menuOpen
              ? "mobile-menu open"
              : "mobile-menu"
          }
        >


          <button
            className="menu-close"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>



          <nav className="mobile-links">

            {links.map((link)=>(

              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({isActive}) =>
                  isActive ? "active" : ""
                }
              >

                {link.name}

              </NavLink>

            ))}



            <a
              href="/app"
              className="mobile-app-button"
            >
              Web-App öffnen →
            </a>


          </nav>


        </div>



        {/* OVERLAY */}

        {menuOpen && (

          <div
            className="menu-overlay"
            onClick={() => setMenuOpen(false)}
          />

        )}



      </div>

    </header>

  );
}