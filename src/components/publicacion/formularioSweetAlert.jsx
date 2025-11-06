import { useState } from "react";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function FormularioMascotaSweetAlert({ onPublicar }) {
  const [lista, setLista] = useState(
    JSON.parse(localStorage.getItem("listaEventoMascotas") || "[]")
  );

  const crearPublicacion = async () => {
    let mapa, marcador;

    const { value: formValues } = await Swal.fire({
      title: "🐾 Nueva mascota perdida",
      width: 600,
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <input id="contacto" class="swal2-input" placeholder="Contacto">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
        <input id="direccion" class="swal2-input" placeholder="Dirección">
        <button id="buscarBtn" class="swal2-confirm swal2-styled" style="margin-top:5px; background-color:#3085d6;">Buscar dirección</button>
        <div id="mapaForm" style="height:300px; margin-top:10px; border-radius:10px;"></div>
      `,
      didOpen: () => {
        // Inicializar mapa
        mapa = L.map("mapaForm").setView([-36.89384, -60.32319], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapa);

        // Geolocalización automática
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.late;
            const lon = pos.coords.lnge;
            mapa.setView([lat, lon], 15);
            L.marker([lat, lon]).addTo(mapa).bindPopup("Tu ubicación actual");
          });
        }

        // Click en el mapa
        mapa.on("click", (e) => {
          const { lat, lng } = e.latlng;
          if (marcador) mapa.removeLayer(marcador);
          marcador = L.marker([lat, lng]).addTo(mapa);
          mapa.lat = lat;
          mapa.lng = lng;
        });

        // Botón buscar dirección
        document.getElementById("buscarBtn").addEventListener("click", async () => {
          const dir = document.getElementById("direccion").value.trim();
          if (!dir) {
            Swal.showValidationMessage("Ingrese una dirección primero");
            return;
          }
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            dir
          )}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            mapa.setView([lat, lon], 16);
            if (marcador) mapa.removeLayer(marcador);
            marcador = L.marker([lat, lon]).addTo(mapa);
            mapa.lat = lat;
            mapa.lng = lon;
          } else {
            Swal.fire({
              icon: "warning",
              title: "No se encontró la dirección",
              text: "Prueba con una ubicación más precisa.",
            });
          }
        });
      },
      preConfirm: () => {
        const nombre = document.getElementById("nombre").value.trim();
        const contacto = document.getElementById("contacto").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const direccion = document.getElementById("direccion").value.trim();

        if (!nombre || !contacto || !descripcion || !direccion) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }
        if (!mapa.lat || !mapa.lng) {
          Swal.showValidationMessage("Seleccione una ubicación en el mapa");
          return false;
        }

        return {
          nombre,
          contacto,
          descripcion,
          direccion,
          lat: mapa.lat,
          lng: mapa.lng,
        };
      },
      confirmButtonText: "Publicar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
    });
           
    if (!formValues) return;

    // Guardar en localStorage
    const nuevaLista = [...lista, formValues];
    localStorage.setItem("listaEventoMascotas", JSON.stringify(nuevaLista));
    setLista(nuevaLista);
    if (onPublicar) onPublicar(formValues);

    Swal.fire({
      icon: "success",
      title: "¡Publicación agregada! 🐶",
      text: "La mascota se publicó correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });
     console.log(formValues);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <button
        className="btn btn-success"
        style={{ padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
        onClick={crearPublicacion}
      >
        ➕ Agregar mascota perdida
      </button>
    </div>
  );
}