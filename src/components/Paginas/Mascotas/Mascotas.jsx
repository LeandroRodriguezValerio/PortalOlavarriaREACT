import imagen from '../../../assets/IMG/Portal_Olavarria_2.png';
import Publicacion from './publicacion.jsx';


export default function Mascotas() {
  return (
   <>
    <img src={imagen} alt="Mascotas Perdidas" style={{ width: '100%', height: 'auto' }} />
    <Publicacion />
    
   </>
  );
}