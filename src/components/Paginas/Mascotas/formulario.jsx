import { useState } from "react";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./formulario.css";
const API_URL = "http://localhost:3000/posts"; // tu endpoint backend

export default function Formulario({ onPublicar }) {
  const [lista, setLista] = useState([]);

const usuario = JSON.parse(localStorage.getItem("user"));
console.log(usuario.usuario_id);



  const crearPublicacion = async () => {
    let mapa, marcador;

    const { value: formValues } = await Swal.fire({
      title: "🐾 Nueva mascota perdida",
      width: 500,
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <div style="text-align:center; margin:6px 0">
          <button id="uploadWidgetBtn" class="swal2-confirm swal2-styled" style="background:#6c5ce7;">Subir foto</button>
          <input display:center type="hidden" id="imagen_url" />
          <div style="margin-top:8px"><img id="previewImg" src="" style="max-width:100%; display:center; border-radius:8px;"/></div>
        </div>
        <input id="contacto" class="swal2-input" placeholder="Contacto">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción" maxlength="125" ></textarea>
        <input id="direccion" class="swal2-input" placeholder="Dirección" >
        <br>
        <button id="buscarBtn" class="swal2-confirm swal2-styled" style="margin-top:5px; background-color:#3085d6;">Buscar dirección</button>
        <div id="mapaForm" style="height:200px; margin-top:10px; border-radius:10px;"></div>
      `,

      didOpen: () => {
        // cargar widget de Cloudinary dinámicamente
        const loadWidget = () => {
          if (window.cloudinary) return; // ya cargado
          const s = document.createElement('script');
          s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
          s.async = true;
          document.body.appendChild(s);
        };
        loadWidget();

        // configurar handler del botón de subir foto
        const uploadBtn = document.getElementById('uploadWidgetBtn');
        if (uploadBtn) {
          uploadBtn.addEventListener('click', () => {
            // REEMPLAZAR con tus credenciales de Cloudinary
            const cloudName = 'dc1wbvw8q';
            const uploadPreset = 'fotomascota';
            if (!window.cloudinary) {
              Swal.fire('Error', 'Widget de Cloudinary no se pudo cargar aún. Intenta de nuevo.', 'error');
              return;
            }
            const widget = window.cloudinary.createUploadWidget(
              {
                cloudName,
                uploadPreset,
                sources: ['local','url','camera','image_search'],
                multiple: false,
                cropping: false,
                showCompletedButton: true,
              },
              (error, result) => {
                if (!error && result && result.event === 'success') {
                  const url = result.info.secure_url;
                  const hidden = document.getElementById('imagen_url');
                  const preview = document.getElementById('previewImg');
                  if (hidden) hidden.value = url;
                  if (preview) {
                    preview.src = url;
                    preview.style.display = 'center';
                  }
                } else if (error) {
                  console.error('Cloudinary error', error);
                }
              }
            );
            widget.open();
          });
        }
        mapa = L.map("mapaForm").setView([-36.9, -60.33], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapa);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.late;
            const lon = pos.coords.longitude;
            mapa.setView([lat, lon], 15);
            L.marker([lat, lon]).addTo(mapa).bindPopup("Tu ubicación actual");
          });
        }

        mapa.on("click", (e) => {
          const { lat, lng } = e.latlng;
          if (marcador) mapa.removeLayer(marcador);
          marcador = L.marker([lat, lng]).addTo(mapa);
          mapa.lat = lat;
          mapa.lng = lng;
        });

        document
          .getElementById("buscarBtn")
          .addEventListener("click", async () => {
            const dir = document.getElementById("direccion").value.trim();
            if (!dir) {
              Swal.showValidationMessage("Ingrese una dirección primero");
              return;
            }
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              dir
            )}`;
            const res = await fetch(url);
            console.log(res);
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
            console.log("LAT LNG " + mapa.lat, mapa.lng);
          });

        const textarea = document.getElementById("descripcion");
        textarea.addEventListener("input", function () {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
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
          usuarioUsuarioId: usuario.usuario_id, // valor fijo por ahora
          imagen_url: document.getElementById('imagen_url')?.value || null,
        };
      },
      confirmButtonText: "Publicar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
    });

    if (!formValues) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      console.log(formValues);
      if (!res.ok) throw new Error("Error al guardar en la base de datos");

      const data = await res.json();
      setLista([...lista, data]);
      if (onPublicar) onPublicar(data);
      // emitir evento global para que otros componentes (cards) actualicen su estado
      try {
        window.dispatchEvent(new CustomEvent('post-created', { detail: data }));
      } catch (e) {
        console.warn('No se pudo emitir evento post-created', e);
      }

      Swal.fire({
        icon: "success",
        title: "¡Publicación agregada! 🐶",
        text: "La mascota se publicó correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar en la base de datos 😞",
      });
    }

  //  console.log(formValues);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <button
        className="btn btn-success"
        style={{ padding: "10px 20px", borderRadius: "8px", cursor: "pointer", marginBottom: "20px" }}
        onClick={crearPublicacion}
      >
        ➕ Agregar mascota perdida
      </button>
    </div>
  );
}
