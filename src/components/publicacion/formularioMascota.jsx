
import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function FormularioMascota({ onPublicar }) {
    const mapaFormRef = useRef(null);
    const mapaInstance = useRef(null);
    const marcadorRef = useRef(null);

    const [form, setForm] = useState({
        nombre: "",
        contacto: "",
        descripcion: "",
        direccion: "",
        latitud: "",
        longitud: "",
    });

    // Inicializa el mapa del formulario
    useEffect(() => {
        if (mapaFormRef.current && !mapaInstance.current) {
            mapaInstance.current = L.map(mapaFormRef.current).setView([-36.89384, -60.32319], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapaInstance.current);

            // Geolocalización del usuario
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        mapaInstance.current.setView([lat, lng], 15);
                        L.marker([lat, lng]).addTo(mapaInstance.current)
                            .bindPopup("Tu ubicación actual")
                            .openPopup();
                    },
                    () => { }
                );
            }

            // Click en el mapa para seleccionar ubicación
            mapaInstance.current.on("click", function (e) {
                const { lat, lng } = e.latlng;
                setForm((prev) => ({
                    ...prev,
                    latitud: lat,
                    longitud: lng,
                }));
                if (marcadorRef.current) {
                    mapaInstance.current.removeLayer(marcadorRef.current);
                }
                marcadorRef.current = L.marker([lat, lng]).addTo(mapaInstance.current)
                    .bindPopup("Ubicación seleccionada").openPopup();
            });
        }
        return () => {
            if (mapaInstance.current) {
                mapaInstance.current.remove();
                mapaInstance.current = null;
            }
        };
    }, []);

    // Buscar dirección con Nominatim
    const buscarDireccion = async () => {
        if (!form.direccion) {
            alert("Ingrese una dirección");
            return;
        }
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.direccion)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setForm((prev) => ({
                ...prev,
                latitud: lat,
                longitud: lon,
            }));
            if (marcadorRef.current) {
                mapaInstance.current.removeLayer(marcadorRef.current);
            }
            marcadorRef.current = L.marker([lat, lon]).addTo(mapaInstance.current)
                .bindPopup("Ubicación seleccionada").openPopup();
            mapaInstance.current.setView([lat, lon], 16);
        } else {
            alert("Dirección no encontrada");
        }
    };

    // Borrar marcador y coordenadas
    const borrarMarcador = () => {
        if (marcadorRef.current) {
            mapaInstance.current.removeLayer(marcadorRef.current);
            marcadorRef.current = null;
            setForm((prev) => ({
                ...prev,
                latitud: "",
                longitud: "",
            }));
        }
    };

    // Validar y guardar publicación
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre || !form.contacto || !form.descripcion || !form.direccion) {
            alert("Todos los campos son obligatorios");
            return;
        }
        if (!form.latitud || !form.longitud) {
            alert("Seleccione la ubicación en el mapa o busque una dirección");
            return;
        }
        // Guardar en localStorage
        const lista = JSON.parse(localStorage.getItem("listaEventoMascotas") || "[]");
        lista.push(form);
        localStorage.setItem("listaEventoMascotas", JSON.stringify(lista));
        if (onPublicar) onPublicar(form); // callback opcional
        alert("¡Publicación agregada!");
        setForm({
            nombre: "",
            contacto: "",
            descripcion: "",
            direccion: "",
            latitud: "",
            longitud: "",
        });
        borrarMarcador();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <h3>Agregar Mascota Perdida</h3>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
            />
            <input
                type="text"
                name="contacto"
                placeholder="Contacto"
                value={form.contacto}
                onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                required
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                required
            />
            <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                required
            />
            <button type="button" onClick={buscarDireccion}>Buscar dirección</button>
            <button type="button" onClick={borrarMarcador}>Borrar marcador</button>
            <div
                ref={mapaFormRef}
                id="mapaForm"
                style={{ height: "300px", width: "100%", margin: "1rem 0" }}
            ></div>
            <input
                type="hidden"
                name="latitud"
                value={form.latitud}
                readOnly
            />
            <input
                type="hidden"
                name="longitud"
                value={form.longitud}
                readOnly
            />
            <button type="submit">Publicar</button>
        </form>
    );
}

