import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  LayersControl,
  useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



// corregir iconos por defecto (si usas Marker sin icon)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// componente pequeño para marcar la ubicación del usuario (opcional)
function UserLocationMarker() {
  const [pos, setPos] = useState(null);
  useMapEvents({
    locationfound(e) {
      setPos(e.latlng);
    },
  });
  useEffect(() => {
    // pedir ubicación una vez
    try { navigator.geolocation && navigator.geolocation.getCurrentPosition(() => { }, () => { }); } catch { }
  }, []);
  return pos ? (
    <Marker position={pos} >
      <Popup>Tu ubicación</Popup>
    </Marker>
  ) : null;
}

export default function Mapa() {
  const [sourcesData, setSourcesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const sources = [
    {
      name: 'Farmacias',
      url:
        'https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:farmacias&maxFeatures=10000&outputFormat=application/json',
      popupFn: (f) =>
        `${f.properties.nombre || ''}<br>${f.properties.direccion || ''}<br>${f.properties.telefono || ''}`,
    },
    {
      name: 'Bibliotecas',
      url:
        'https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:bibliotecas&maxFeatures=10000&outputFormat=application/json',
      popupFn: (f) =>
        `${f.properties.nombre || ''}<br>${f.properties.calle_barr || ''} ${f.properties.numero_cas || ''}<br>${f.properties.telefono || ''}`,
    },
    {
      name: 'Centros de Salud',
      url:
        'https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:centros_de_salud&maxFeatures=10000&outputFormat=application/json',
      popupFn: (f) =>
        `${f.properties.centro || ''}<br>${f.properties.direccion || ''}<br>${f.properties.telefono || ''}`,
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
      name: 'Linea 503',
      url:
        'https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_503&maxFeatures=10000&outputFormat=application/json',
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

  useEffect(() => {
    let mounted = true;
    // cargar todas las fuentes en paralelo
    Promise.all(
      sources.map((s) =>
        fetch(s.url)
          .then((res) => {
            if (!res.ok) throw new Error(`${s.name} HTTP ${res.status}`);
            return res.json();
          })
          .then((json) => ({ ...s, data: json }))
          .catch((err) => {
            console.error('Error cargando', s.name, err);
            return { ...s, data: null, error: true };
          })
      )
    ).then((results) => {
      if (!mounted) return;
      setSourcesData(results);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Cargando capas del mapa...</div>;

  return (
    <MapContainer
      center={[-36.8937, -60.3161]}
      zoom={13}
      style={{ height: '60vh', width: '100%' }}
      whenCreated={(map) => {
        // opcional: pedir ubicación del navegador para que leaflet dispare locationfound
        try { map.locate({ setView: false }); } catch { }
        setTimeout(() => { try { map.invalidateSize(); } catch { } }, 200);
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Opcional: marcador de usuario */}
      <UserLocationMarker />

      <LayersControl position="topright" collapsed>
        {/* Para que aparezcan radios (selección única) usamos BaseLayer */}
        {sourcesData.map((src, i) => (
          <LayersControl.BaseLayer
            key={src.name}
            name={src.name}
            checked={false}
          >
            {/* Si no hay datos, renderiza un fragment vacío */}
            {src.data ? (
              <GeoJSON
                data={src.data}
                // style para geometrías tipo LineString/Polygon
                style={src.styleFn}
                // puntos a marcadores con icono
                pointToLayer={(feature, latlng) =>
                  L.marker(latlng,)
                }
                // bindPopup por feature usando popupFn si existe
                onEachFeature={(feature, layer) => {
                  if (src.popupFn) {
                    try {
                      layer.bindPopup(src.popupFn(feature));
                    } catch { }
                  }
                }}
              />
            ) : (
              <></>
            )}
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>
    </MapContainer>
  );
}