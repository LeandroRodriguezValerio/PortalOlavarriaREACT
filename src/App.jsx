import Navbar from './components/navbar.jsx';
import Registro from "./components/Registro.jsx";
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/registro" element={<Registro />} />
      </Routes>
     
    </>
  );
}

export default App
