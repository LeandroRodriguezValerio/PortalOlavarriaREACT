import perroperdido from '../../../assets/IMG/perroperdido.jpg';
import './perfil.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Perfil() {

    
  const handleLogout = () => {
    // Remove the token from storage to log the user out
    localStorage.removeItem('token');
    navigate('/login');
  };




    return (


        <section id="perfil-usuario" className='perfil-container'>
            <div className="perfil-contenedor">
                <div className="perfil-info">
                    <img src={perroperdido} alt="Foto de perfil" className="perfil-foto"/>
                        <h2 className="perfil-nombre">Juan Pérez</h2>
                        <p className="perfil-email">juanperez@email.com</p>
                        <p className="perfil-ubicacion">Olavarría, Buenos Aires</p>
                        <button>Editar perfil</button>
                </div>

                <div className="perfil-publicaciones">
                    <h3>Mis publicaciones</h3>
                    <div id="lista-publicaciones">
                        <div id="publicacion1">
                            <h4>Perro perdido</h4>
                            <p>Descripción: Mi perro se perdió cerca del parque. Es un labrador marrón.</p>
                            <p>Fecha: 2025-01-15</p>
                            <button className="btn-editar" >Editar</button>
                            <button className="btn-eliminar" >Eliminar</button>
                        </div>
                        <div id="publicacion2">
                            <h4>Gato encontrado</h4>
                            <p>Descripción: Encontré un gato gris en la calle. Tiene collar rojo y es muy amigable.</p>
                            <p>Fecha: 2025-01-20</p>
                            <button className="btn-editar">Editar</button>
                            <button className="btn-eliminar" >Eliminar</button>
                        </div>

                        <button onClick={handleLogout}>Log Out</button>
                        {/* <!-- JS insertará las publicaciones acá --> */}

                        {/* Aca hay que poner las card del usuario */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Perfil;