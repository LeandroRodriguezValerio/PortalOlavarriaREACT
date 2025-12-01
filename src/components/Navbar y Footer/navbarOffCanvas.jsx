import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import Login from '../Paginas/Login/login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NavbarOffCanvas.css';

function OffcanvasExample() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" className="mi-navbar-personalizado">
        <Container fluid>

          <Container fluid className='w-25 ml-3'>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={handleShow}
            />
            <Navbar.Brand href="#">
              <img
                src="src/assets/IMG/LogoPO.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Container>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Portal Olavarría
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <NavLink to="/" className='NavLink'>Inicio</NavLink>
                <NavLink to="mascotas" className='NavLink'>Mascotas</NavLink>

                {/* ⬇ Ahora Login recibe closeOffcanvas */}
                <Login closeOffcanvas={handleClose} />

                <NavLink to="registro" className='NavLink'>Registrarse</NavLink>
                <NavLink to="ayuda" className='NavLink'>Ayuda</NavLink>
                <NavLink to="perfil" className='NavLink miPerfilNav'>Mi perfil</NavLink>

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;