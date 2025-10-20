import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Navbar } from './components/navbar.jsx'
import Publicacion from './components/publicacion/publicacion.jsx'
import FormularioMascota from './components/publicacion/formularioMascota.jsx'
import MapaMarcadores from './components/mapaInformativo/MapaMarcadores.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <App />
    {/* <Publicacion /> */}
    <FormularioMascota />
    <MapaMarcadores />
  </StrictMode>,
)
