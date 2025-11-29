import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./bodyTemporal.css";

export default function PublicacionPopup({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear",
}) {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    contacto: "",
    descripcion: "",
    latitud: "",
    longitud: "",
  });

  const mapaRef = useRef(null);
  const markerRef = useRef(null);




  useEffect(() => {
    if (isOpen && !mapaRef.current) {
      const map = L.map("mapaForm").setView([-34.9205, -57.9536], 13); // Coordenadas por defecto (ej. La Plata)
      mapaRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setForm((prev) => ({ ...prev, latitud: lat, longitud: lng }));
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = L.marker([lat, lng]).addTo(map);
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleBuscarDireccion = async () => {
    if (!form.direccion.trim()) {
      Swal.fire("Ingrese una dirección", "", "warning");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          form.direccion
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        mapaRef.current.setView([lat, lon], 15);
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = L.marker([lat, lon]).addTo(mapaRef.current);

        setForm({ ...form, latitud: lat, longitud: lon });

        Swal.fire({
          icon: "success",
          title: "Ubicación encontrada 🗺️",
          text: "Marcador agregado en el mapa.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("No se encontró la dirección 😕", "", "error");
      }
    } catch (err) {
      Swal.fire("Error al buscar dirección", err.message, "error");
    }
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.direccion) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa al menos el nombre y la dirección 🐶",
      });
      return;
    }

    if (onSubmit) onSubmit(form);
    Swal.fire({
      icon: "success",
      title:
        modo === "crear"
          ? "Publicación enviada 🐾"
          : "Publicación actualizada ✏️",
      showConfirmButton: false,
      timer: 1500,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content contpopup">
        <span className="cerrar" onClick={onClose}>
          &times;
        </span>

        <h2>{modo === "crear" ? "Nueva publicación" : "Editar publicación"}</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div
            id="mapaForm"
            style={{ height: "200px", borderRadius: "8px" }}
          ></div>

          <div className="mb-3">
            <label className="form-label">Nombre de la mascota</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre de la mascota"
              required
            />
          </div>

          <div className="mb-3 direccion">
            <input
              type="text"
              id="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección completa, con ciudad"
              required
            />
            <button type="button" onClick={handleBuscarDireccion}>
              Buscar dirección
            </button>
          </div>

          <input type="hidden" id="latitud" value={form.latitud} />
          <input type="hidden" id="longitud" value={form.longitud} />

          <div className="mb-3">
            <label className="form-label">Contacto</label>
            <input
              type="text"
              className="form-control"
              id="contacto"
              value={form.contacto}
              onChange={handleChange}
              placeholder="Contacto"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows="3"
              placeholder="Descripción"
            ></textarea>
          </div>

          <div className="botones">
            {modo === "crear" ? (
              <span className="fakebutton btn-primary" onClick={handleSubmit}>
                Enviar Datos
              </span>
            ) : (
              <span className="btn btn-primary" onClick={handleSubmit}>
                Actualizar Datos
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
