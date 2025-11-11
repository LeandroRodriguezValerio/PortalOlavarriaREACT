import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbarOffCanvas.css'
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
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Portal Olavarria
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Inicio</Nav.Link>
                  {/* <Nav.Link href="#action2">Eventos</Nav.Link> */}
                  <Nav.Link href="#action3">Mascotas</Nav.Link>
                  <Nav.Link href="#action4">Ayuda</Nav.Link>
                  <Nav.Link href="#action5">Iniciar sesión</Nav.Link>
                  <Nav.Link href="#action6">Registrarse</Nav.Link>
                  <NavDropdown
                    title="Menu"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action7">Mi perfil</NavDropdown.Item>
                    <NavDropdown.Item href="#action8">
                      Configuración
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action9">
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                  
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