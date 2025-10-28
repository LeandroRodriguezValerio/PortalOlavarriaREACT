import React from "react";
import "./cards.css";
import imgDefault from "../assets/IMG/perroperdido.jpg";

export default function Card({ element = {}, index, onDelete, onEdit }) {
  const { nombre, contacto, direccion, descripcion } = element || {};

  return (
    <div className="card" id={`contCard${index}`}>
      <img
        src={ imgDefault}
        alt={nombre || "Mascota"}
        className="card-img"
      />

      <div className="card-body">
        <h3 className="card-title">{nombre || "Sin nombre"}</h3>
        <p className="card-text">
          <strong>Contacto:</strong> {contacto || "No especificado"}
          <br />
          <strong>Dirección:</strong> {direccion || "No indicada"}
        </p>
        <p className="card-desc">{descripcion || "Sin descripción"}</p>

        <div className="card-buttons">
          <button className="btn btn-warning" onClick={onEdit}>
            ✏️ Editar
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
