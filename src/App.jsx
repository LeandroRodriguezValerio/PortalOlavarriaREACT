import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OffcanvasExample from "./components/Navbar y Footer/navbarOffCanvas.jsx";
import Footer from "./components/Navbar y Footer/footer.jsx";
import CardsContainer from "./components/cardContainer";
import PublicacionPopup from "./components/bodyTemporal";
import Publicacion from "./components/publicacion/publicacion";
import Perfil from "./components/perfil/perfil.jsx";
import CarouselInicio from "./components/Carousel/Carousel.jsx";
import Ayuda from "./components/Ayuda/Ayuda.jsx";
import MapaMarcadores from "./components/mapaInformativo/MapaMarcadores";
import MapaInicio from "./components/mapaInformativo/MapaInicio";
import Formulario from "./components/publicacion/formulario.jsx";
import Registro from "./components/registro/Registro.jsx";
export default function App() {
  return (
    <>
      <OffcanvasExample />
      <CarouselInicio />
      {/* <Publicacion /> */}

      <MapaInicio />
      <div className="main-content">
        <div className="container">
          <Formulario />
          <CardsContainer />
        </div>
      </div>
      <PublicacionPopup />
      <Perfil />
      {/* <Registro/> */}
      <Ayuda />
      <Footer />
    </>
  );
}
