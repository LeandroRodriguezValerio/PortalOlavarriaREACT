import React from 'react';
import img from '../assets/IMG/perro1.jpg';
import './cards.css'; 

const BASE_URL = 'http://localhost:3000/api/posts';



export function Cardsaaa({element, index}) {

    return (
        <div className="card" id="contCard${index}">
            <span className="botonEliminar btn btn-danger" onClick="DeleteData(${index})">Eliminar Publicacion</span>
            <span className="botonEliminar btn btn-warning" onClick="publicar(); EditData(${index})">Editar Publicacion</span>
            <img src= {img}  alt="Perro Perdido"/>
            <div className="card-body ">
                <h6>${element.nombre}</h6>
                <h5>Contacto: ${element.contacto}</h5>
                <h5>Direccion: ${element.direccion}</h5>
                <p>${element.descripcion}</p>
                
            </div>
            </div>
    );
}
export default Cards;

