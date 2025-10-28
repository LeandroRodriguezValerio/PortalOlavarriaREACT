import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OffcanvasExample from "./components/navbarOffCanvas";
import Footer from "./components/footer";
import CardsContainer from "./components/cardContainer";
import PublicacionPopup from "./components/bodyTemporal";

export default function App() {
  return (
    <>
       <OffcanvasExample />
      <div className="main-content">
        <div className="container">
          <CardsContainer />
        </div>
      </div>
      <PublicacionPopup />
      <Footer />
    </>
  );
}
