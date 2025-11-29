import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from '../Paginas/Login/login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NavbarOffCanvas.css'
function OffcanvasExample() {
  return (
    <>
      {[ 'lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mi-navbar-personalizado ">
          
          <Container fluid>
            
          <Container fluid className='w-25 ml-3'>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> 
            <Navbar.Brand href="#" >
              <img
              src="src/assets/IMG/LogoPO.png"
              width="30"
              height="30"
              className="d-inline-block  align-top"
              alt="React Bootstrap logo"
            />
            </Navbar.Brand>
          </Container>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className={`fondoOffcanvas${expand}`}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Portal Olavarria
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <NavLink to="/" className='NavLink'>Inicio</NavLink>
                  <NavLink to="mascotas" className='NavLink'>Mascotas</NavLink>
                  {/* iniciarsesion */}
                   <Login/> 
                 
                  <NavLink to="registro" className='NavLink'>Registrarse</NavLink>
                  <NavLink to="ayuda" className='NavLink'>Ayuda</NavLink>
                  <NavLink to="perfil" className='NavLink miPerfilNav'>Mi perfil </NavLink>
{/*                   
                  <NavDropdown
                    title="Menu"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item className='NavLink' > 
                       <NavLink to="perfil" className='NavLink miPerfilNav'>Mi perfil </NavLink>

                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action8">
                      Configuración
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action9">
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
           
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;