import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import AppPage from "./pages/AppPage";
import Shop from "./pages/Shop";
import Business from "./pages/Business";
import About from "./pages/About";
import Contact from "./pages/Contact";


export default function Router() {

  return (

    <BrowserRouter>

      <Routes>


        <Route element={<Layout />}>


          <Route 
            path="/" 
            element={<Home />} 
          />


          <Route 
            path="/reiseapp" 
            element={<AppPage />} 
          />


          <Route 
            path="/shop" 
            element={<Shop />} 
          />


          <Route 
            path="/business" 
            element={<Business />} 
          />


          <Route 
            path="/ueber-uns" 
            element={<About />} 
          />

          <Route 
  path="/kontakt" 
  element={<Contact />} 
/>


        </Route>


      </Routes>

    </BrowserRouter>

  );

}