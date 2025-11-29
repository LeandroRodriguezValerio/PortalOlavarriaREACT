import Carousel from 'react-bootstrap/Carousel';
import Portal_Olavarria_1 from '../../../assets/IMG/Portal_Olavarria_1.png';
import Portal_Olavarria_2 from '../../../assets/IMG/Portal_Olavarria_2.png';
import Portal_Olavarria_3 from '../../../assets/IMG/Portal_Olavarria_3.png';
import Portal_Olavarria_4 from '../../../assets/IMG/Portal_Olavarria_4.png';

function CarouselInicio() {
  return (
 <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Portal_Olavarria_1}
      alt="First slide"
    />
    <Carousel.Caption>
      {/* <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Portal_Olavarria_2}
      alt="Second slide"
    />
    <Carousel.Caption>
      {/* <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Portal_Olavarria_3}
      alt="Third slide"
    />
    <Carousel.Caption>
      {/* <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>

     <Carousel.Item>
    <img
      className="d-block w-100"
      src={Portal_Olavarria_4}
      alt="First slide"
    />
    <Carousel.Caption>
      {/* <h3>Four slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  );
}

export default CarouselInicio;