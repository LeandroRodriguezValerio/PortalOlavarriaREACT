
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

export default function Publicacion() {
    useEffect(() => {
        // Inicializar el mapa
        const map = L.map('map').setView([-36.8937, -60.3161], 13); // Coordenadas de Olavarría
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    // Centrar el mapa en la ubicación del usuario
                    map.setView([lat, lng], 15);
                    // Agregar marcador en la ubicación del usuario
                    L.marker([lat, lng], { icon: miIcono }).addTo(map)
                        .bindPopup("Tu ubicación actual")
                        .openPopup();
                },
                function (error) {
                    alert("No se pudo obtener tu ubicación: " + error.message);
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
        // Agregar un marcador (opcional)
        L.marker([-36.8937, -60.3161]).addTo(map)
            .bindPopup('Ubicación de Olavarría')
            .openPopup();

        // Cargar marcadores de la base de datos
        const listadoMascotas = fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => {
                data.forEach(mascota => {
                    L.marker([mascota.lat, mascota.lng], { icon: miIcono }).addTo(map)
                        .bindPopup(`<b>${mascota.nombre}</b><br>${mascota.descripcion}`);
                });
            })
            .catch(error => console.error('Error al cargar las mascotas:', error));

        // Limpiar el mapa al desmontar el componente
        return () => {
            map.remove();
        }
    }, []);



    return (
        <div className="mapa-titulo">
           <>
           {/* <img src={imagen} alt="Mascota" /> */}     
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
           </>
        </div>
    )
}