import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import './MapaMarcadores.css';

export default function MapaMarcadores() {
    const controlRef = useRef(null);
    const overlaysRef = useRef({});
    const mapRef = useRef(null);
    useEffect(() => {
        // Inicializar el mapa
        const map = L.map('map').setView([-36.8937, -60.3161], 13);
                mapRef.current = map; // guardar instancia
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // forzar cálculo de tamaño tras render:
        setTimeout(() => { try { map.invalidateSize(); } catch (e) {} }, 200);

        // icono usado en marcadores
        const miIcono = L.icon({
            iconUrl: '/IMG/marcadoranimal.png',
            iconSize: [40, 40],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Geolocalización del usuario (opcional)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    map.setView([lat, lng], 15);
                    L.marker([lat, lng], { icon: miIcono }).addTo(map)
                        .bindPopup("Tu ubicación actual")
                        .openPopup();
                },
                function (error) {
                    console.warn("No se pudo obtener tu ubicación: " + error.message);
                }
            );
        } else {
            console.warn("Tu navegador no soporta geolocalización.");
        }

        // Marcador opcional de Olavarría
        // L.marker([-36.8937, -60.3161], { icon: miIcono }).addTo(map)
        //     .bindPopup('Ubicación de Olavarría');

        // definir fuentes GeoJSON (ajustar rutas si es necesario)
        const sources = [
            {
                name: "Farmacias",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:farmacias&maxFeatures=10000&outputFormat=application/json",
                popupFn: f => `${f.properties.nombre || ''}<br>${f.properties.direccion || ''}<br>${f.properties.telefono || ''}`
            },
            {
                name: "Bibliotecas",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:bibliotecas&maxFeatures=10000&outputFormat=application/json",
                popupFn: f => `${f.properties.nombre || ''}<br>${f.properties.calle_barr || ''} ${f.properties.numero_cas || ''}<br>${f.properties.telefono || ''}`
            },
            {
                name: "Centros de Salud",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:centros_de_salud&maxFeatures=10000&outputFormat=application/json",
                popupFn: f => `${f.properties.centro || ''}<br>${f.properties.direccion || ''}<br>${f.properties.telefono || ''}`
            },
            {
                name: "Centro atención primaria (CAPS)",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:atencion_primaria&maxFeatures=10000&outputFormat=application/json",
                popupFn: f => `${f.properties.nombre || ''}<br>${f.properties.direccion || ''}<br>${f.properties.telefono || ''}`

            },
            {
                name: "Linea 500",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_500&maxFeatures=10000&outputFormat=application/json"
            },
            {
                name: "Linea 501",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_501&maxFeatures=10000&outputFormat=application/json"
            },
            {
                name: "Linea 502",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_502&maxFeatures=10000&outputFormat=application/json"
            },
            {
                name: "Linea 503",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_503&maxFeatures=10000&outputFormat=application/json"
            },
            {
                name: "Linea 504",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_504&maxFeatures=10000&outputFormat=application/json"
            },
            {
                name: "Linea 505",
                url: "https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_505&maxFeatures=10000&outputFormat=application/json"
            }            
        ];

        const overlays = {};

        sources.forEach(src => {
            const layerGroup = L.layerGroup();
            overlaysRef.current[src.name] = layerGroup;

            fetch(src.url)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(geojson => {
                    L.geoJSON(geojson, {
                        style: src.styleFn,
                        pointToLayer: (feature, latlng) => {
                            // usar icono para puntos
                            return L.marker(latlng,); // puedes personalizar el icono según feature si quieres { icon: miIcono } despues de latlng
                        },
                        onEachFeature: (feature, layer) => {
                            if (src.popupFn) {
                                try {
                                    layer.bindPopup(src.popupFn(feature));
                                } catch (e) {
                                    console.warn(`Error bindPopup ${src.name}:`, e);
                                }
                            }
                        }
                    }).addTo(layerGroup);

                    // añadir por defecto al mapa (cambiar si no se quiere)
                    // layerGroup.addTo(map);
                    // layerGroup.addTo(src.name);
                })
                .catch(err => console.error(`Error cargando ${src.name}:`, err));

            overlays[src.name] = layerGroup;


        });

        // Añadir control de capas si hay overlays
        if (Object.keys(overlays).length > 0) {
            controlRef.current = L.control.layers(overlays, null, { collapsed: false }).addTo(map);
        }
  // manejar resize para que el mapa sea responsive
        const handleResize = () => {
            setTimeout(() => { try { mapRef.current && mapRef.current.invalidateSize(); } catch (e) {} }, 120);
        };
        window.addEventListener('resize', handleResize);

        // limpiar al desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
            try { if (controlRef.current) controlRef.current.remove(); } catch { }
            Object.values(overlaysRef.current).forEach(lg => {
                try { lg.remove(); } catch { }
            });
            overlaysRef.current = {};
            try { map.remove(); } catch { }
        };
    }, []);

    return (
         <div className="mapa-titulo">
            <>
                <div id="map" style={{ height: '300px', width: '800px' }}></div>
              
            </>
        </div>
     );
}