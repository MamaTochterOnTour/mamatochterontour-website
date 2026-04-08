import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ReiseApp from "./pages/ReiseApp";
import Contact from "./pages/Kontakt";

import Impressum from "./pages/impressum";
import Datenschutz from "./pages/Datenschutz"; // 👈 neu
import Shop from "./pages/Onlineshop";
import Kooperationen from "./pages/Kooperationen";
import FAQ from "./pages/qanda";

function App() {
  return (
    <Routes>
      {/* MAIN PAGES */}
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<ReiseApp />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/kooperationen" element={<Kooperationen />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/kontakt" element={<Contact />} />

      {/* LEGAL PAGES */}
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
    </Routes>
  );
}

export default App;