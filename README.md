* Portal Olavarría

Portal Olavarría es una plataforma web informativa para la ciudad de Olavarría, que centraliza distintos servicios comunitarios como eventos, mascotas perdidas, estado del transporte, clima y emergencias.
- Demo o documentación

* Documentación del proyecto

https://docs.google.com/document/d/1tj4o17XZZaah8u4GTJvDGJlt1NlJWQikS4Y-dEEccEE/edit?tab=t.33hq4mcjdl3l

Frontend: React + Vite app en `PortalOlavarriaReact/` (UI, mapas, formularios).

1) Preparar frontend (React + Vite)
  clonar repositorio
  npm install
  npm install react-router-dom 
  npm install sweetalert2
  npm install react-router-dom
  npm install react@rc react-dom@rc leaflet
  npm install react-leaflet@next

- Ejecutar frontend en modo desarrollo:
  npm run dev
  - Vite normalmente expone la app en http://localhost:5173

2) Mapas y assets
- Los iconos y recursos del mapa se esperan en `PortalOlavarriaReact/public/IMG/` o `PortalOlavarria/public/IMG/` según implementación. Confirma rutas (`/IMG/marcadoranimal.png`).
- Si el mapa no se ve, verifica que el contenedor tenga altura en CSS (`.map-container`) y que el frontend invoque `map.invalidateSize()` al montarse.





