import imglogo from '../assets/IMG/LogoPO.png'
import './navbar.css' 




export function  Navbar() {
  return (
   <nav id="mainNavbar" className="navbar-estilosa">
        <div className="navbar-container">
            <button className="navbar-toggle" aria-label="Abrir menú">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className="navbar-links">
                <li><a href="../index.html" className="activo">Inicio</a></li>
                <li><a href="./HTML/eventos.html">Eventos</a></li>
                <li><a href="./HTML/mascotas.html">Mascotas perdidas</a></li>
                <li><a href="./HTML/ayuda.html">Ayuda</a></li>
                <li><a href="#" onClick=" borrar(); abrirPopup();" className="vistaEdicion">Iniciar sesión</a></li>
                <li><a href="./HTML/login.html">Registrarse</a></li>
            </ul>
            <a href="./index.html" className="navbar-logo">
                <img src={imglogo} alt="Logo Portal Olavarría" />
            </a>
        </div>
    </nav>
    )
}
