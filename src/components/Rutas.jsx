import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Ayuda from './Paginas/Ayuda/Ayuda.jsx';
import Registro from './Paginas/Registro/Registro.jsx';
import MapaMarcadores from './mapaInformativo/MapaMarcadores.jsx';

export default function Rutas() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define tus rutas aquí */}
                <Route path="/" element={<MapaMarcadores />} />
                <Route path="/about" element={<Ayuda />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </BrowserRouter>
    );
}