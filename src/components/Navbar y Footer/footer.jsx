import { StrictMode } from 'react'
import React from 'react'
import './footer.css'

export default function Footer() {

   return <footer className="footer">
        <div className="footer-container">
            <div className="footer-column">
                <h4>Eventos</h4>
                <ul>
                    <li><a href="#">Mascotas perdidas</a></li>
                    <li><a href="#">Salud</a></li>
                    <li><a href="#">Transporte</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#">...</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Sobre nosotros</h4>
                <ul>
                    <li><a href="#">Quienes somos</a></li>
                    <li><a href="#">Clientes</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Reclamos</a></li>
                    <li><a href="#">Informacion</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Terminos y condiciones</a></li>
                    <li><a href="#">Politica privada</a></li>
                    <li><a href="#">Terminos legales</a></li>
                    <li><a href="#">Licencia de autor</a></li>
                </ul>
            </div>
            <div className="footer-column subscribe">
                <h4>Contactanos</h4>
                <p>Contactanos para recibir mas informacion</p>
                <form className="subscribe-form">
                    <input type="email" placeholder="Ingrese su e-mail" />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>

        <div className="footer-bottom">
            <p>© 2025 FALLTECH.</p>
            <div className="social-icons">
                <a href="#"><img src="https://img.icons8.com/ios/20/000000/facebook-new.png" alt="Facebook" /></a>
                <a href="#"><img src="https://img.icons8.com/ios/20/000000/twitterx--v2.png" alt="X" /></a>
                <a href="#"><img src="https://img.icons8.com/ios/20/000000/instagram-new.png" alt="Instagram" /></a>
            </div>
        </div>
    </footer>
}