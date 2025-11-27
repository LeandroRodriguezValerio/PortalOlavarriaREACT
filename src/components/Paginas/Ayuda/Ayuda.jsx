import Accordion from 'react-bootstrap/Accordion';
import "./Ayuda.css";

function Ayuda() {
  return (
    <div className="ayuda-container">
     <h2>Preguntas Frecuentes</h2>,
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>¿Qué es Portal Olavarría?</Accordion.Header>
        <Accordion.Body>
          Es una plataforma comunitaria donde podés publicar mascotas perdidas, encontradas o en adopción, y
                    acceder a información útil de Olavarría.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>¿Cómo puedo reportar una mascota perdida?</Accordion.Header>
        <Accordion.Body>
         Desde la sección “Mi Perfil”, completá el formulario con los datos de la mascota, foto, dirección
                    donde se perdió y un contacto. La publicación se mostrará en el mapa.
        </Accordion.Body>
      </Accordion.Item>

        <Accordion.Item eventKey="2">
        <Accordion.Header>¿Hay que registrarse para usar el portal?</Accordion.Header>
        <Accordion.Body>
         No es obligatorio. Podés ver la información sin registrarte, pero si querés publicar o comentar,
                    necesitás crear una cuenta gratuita.
        </Accordion.Body>
      </Accordion.Item>
        <Accordion.Item eventKey="3">
        <Accordion.Header>¿Cómo puedo contactar al dueño de una mascota perdida?</Accordion.Header>
        <Accordion.Body>
         En cada publicación de mascota perdida, hay un contacto (teléfono o email) para comunicarte con el dueño.
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
    </div>
  );
}

export default Ayuda;