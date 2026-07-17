import { NavLink } from "react-router-dom";

export default function Navbar() {

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

        <nav className="navbar-links">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {link.name}
            </NavLink>
          ))}

        </nav>


        <a
  href="/app"
  className="app-link"
>
  App öffnen →
</a>


      </div>

    </header>
  );
}