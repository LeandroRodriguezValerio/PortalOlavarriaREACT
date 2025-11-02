import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OffcanvasExample from "./components/navbarOffCanvas";
import Footer from "./components/footer";
import CardsContainer from "./components/cardContainer";
import PublicacionPopup from "./components/bodyTemporal";
import Publicacion from "./components/publicacion/publicacion";
import Perfil from "./components/perfil/perfil.jsx";
import CarouselInicio from "./components/Carousel/Carousel.jsx";
import Ayuda from "./components/Ayuda/Ayuda.jsx";
export default function App() {
  return (
    <>
    <CarouselInicio />
       {/* <OffcanvasExample />
       <Publicacion />
       <div className="main-content">
        <div className="container">
          <CardsContainer />
         
        </div>
      </div>
      <PublicacionPopup />
      <Footer /> */}

      {/* <Perfil /> */}
      <Ayuda />
    </>
  );
}
