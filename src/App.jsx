import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OffcanvasExample from "./components/navbarOffCanvas";
import Footer from "./components/footer";
import CardsContainer from "./components/cardContainer";
import PublicacionPopup from "./components/bodyTemporal";
import MapaMarcadores from "./components/mapaInformativo/MapaMarcadores";
import MapaInicio from "./components/mapaInformativo/MapaInicio";
import Formulario from "./components/formulario";

export default function App() {
  return (
    <>
       <OffcanvasExample />
       <MapaInicio />
      <div className="main-content">
        <div className="container">
          <Formulario />
          <CardsContainer />
        </div>
      </div>
      <PublicacionPopup />
      
      <Footer />
    </>
  );
}
