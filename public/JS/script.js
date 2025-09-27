// Crear el mapa y centrarlo

var map = L.map('map').setView([-36.89384, -60.32319], 13); // Buenos Aires como ejemplo

// Cargar los tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
      //alert("No se pudo obtener tu ubicación: " + error.message);
    }
  );
} else {
  alert("Tu navegador no soporta geolocalización.");
}

var miIcono = L.icon({
  iconUrl: './IMG/marcadoranimal.png', // URL del ícono
  iconSize: [50, 50], // tamaño del ícono
  iconAnchor: [16, 32], // punto del ícono que se alinea con la coordenada
  popupAnchor: [0, -32] // punto desde donde se abre el popup respecto al icono

});

// Evento para agregar marcador al hacer clic
//  map.on('click', function(e) {
//   var lat = e.latlng.lat;
//   var lng = e.latlng.lng;

//   L.marker([lat, lng], { icon: miIcono }).addTo(map)
//     .bindPopup("Marcador en:<br>Lat: " + lat.toFixed(5) + "<br>Lng: " + lng.toFixed(5))
//     .openPopup();
// });

async function obtenerFarmacias() {
  try {
    const respuesta = await fetch('./DATA/farmacias.json');
    const datos = await respuesta.json();
    L.geoJSON(datos, {
      style: function (feature) {
        return { color: feature.properties.color };
      }
    }).bindPopup(function (layer) {
      return layer.feature.properties.nombre + "<br>" + layer.feature.properties.direccion + "<br>" + layer.feature.properties.telefono;
    }).addTo(farmacias);
    console.log('Farmacias:', datos);

  } catch (error) {
    console.error('Error al obtener las farmacias:', error);
  }
}
obtenerFarmacias();

var farmacias = L.layerGroup();

// marcadores bibliotecas


async function obtenerBibliotecas() {
  try {
    const respuesta = await fetch('https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:bibliotecas&maxFeatures=10000&outputFormat=application/json');
    const datos = await respuesta.json();
    L.geoJSON(datos, {
      style: function (feature) {
        return { color: feature.properties.color };
      }
    }).bindPopup(function (layer) {
      return layer.feature.properties.nombre + "<br>" + layer.feature.properties.calle_barr + " " + layer.feature.properties.numero_cas + "<br>" + layer.feature.properties.telefono;
    }).addTo(bibliotecas);
    console.log('Bibliotecas:', datos);

  } catch (error) {
    console.error('Error al obtener las bibliotecas:', error);
  }
}
obtenerBibliotecas();

var bibliotecas = L.layerGroup();

//Linea 500
async function obtenerColectivo() {
  try {
    const respuesta = await fetch('./Data/linea_500.json');
    const datos = await respuesta.json();
    L.geoJSON(datos).addTo(linea);
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los colectivos:', error);
  }
}
obtenerColectivo();

var linea = L.layerGroup();



//Linea 501
async function obtenerColectivo1() {
  try {
    const respuesta = await fetch('./Data/linea_501.json');
    const datos = await respuesta.json();
    L.geoJSON(datos).addTo(linea1);
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los colectivos:', error);
  }
}
obtenerColectivo1();

var linea1 = L.layerGroup();

//Linea 502
async function obtenerColectivo2() {
  try {
    const respuesta = await fetch('./Data/linea_502.json');
    const datos = await respuesta.json();
    L.geoJSON(datos).addTo(linea2);
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los colectivos:', error);
  }
}
obtenerColectivo2();

var linea2 = L.layerGroup();

//Linea 503
async function obtenerColectivo3() {
  try {
    const respuesta = await fetch('https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_503&maxFeatures=10000&outputFormat=application/json');
    const datos = await respuesta.json();
    L.geoJSON(datos).addTo(linea3);
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los colectivos:', error);
  }
}
obtenerColectivo3();

var linea3 = L.layerGroup();

//Linea 504
async function obtenerColectivo4() {
  try {
    const respuesta = await fetch('https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_504&maxFeatures=10000&outputFormat=application/json');
    const datos = await respuesta.json();
    L.geoJSON(datos).addTo(linea4);
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los colectivos:', error);
  }
}
obtenerColectivo4();

var linea4 = L.layerGroup();

//Linea 505
async function obtenerColectivo5() {
  try {
    const respuesta = await fetch('https://mapas.olavarria.gov.ar/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=ide:linea_505&maxFeatures=10000&outputFormat=application/json');
    const datos = await respuesta.json();
    L.geoJSON(datos).addTo(linea5);
    console.log(datos)
  } catch (error) {
    console.error('Error al obtener los colectivos:', error);
  }
}
obtenerColectivo5();

var linea5 = L.layerGroup();

//Marcadores museo
var museos = L.layerGroup();
var museo1 = L.marker([-36.8941116, -60.3224411]).addTo(museos).bindPopup("Teatro Municipal");
var museo2 = L.marker([-36.8943041, -60.3220179]).addTo(museos).bindPopup("Museo Dámaso Arce");
var museo3 = L.marker([-36.8976502, -60.2960117]).addTo(museos).bindPopup("Museo de las Ciencias “Ing. Rita Toniutti”");
var museo4 = L.marker([-36.894612, -60.316231]).addTo(museos).bindPopup("Museo Municipal Hermanos Emiliozzi");
var museo5 = L.marker([-36.8894587, -60.3254663]).addTo(museos).bindPopup("Centro Cultural San José");
var museo6 = L.marker([-36.9859007, -60.2815959]).addTo(museos).bindPopup("Museo de los Pueblos");
//museos.addTo(map);
//L.control.layers({}, {'Museos': museos}).addTo(map);
//Marcadores Centros de salud
var salud = L.layerGroup();
var salud1 = L.marker([-36.885337, -60.311841]).addTo(salud).bindPopup("HOSPITAL MUNICIPAL 'HECTOR CURA'<br> Dirección: RIVADAVIA 4057 <br>Teléfono: 440800");
var salud2 = L.marker([-36.880961, -60.17873]).addTo(salud).bindPopup("CENTRO MUNICIPAL DE SALUD NRO 19 COLONIA HINOJO <br> Dirección DE LOS FUNDADORES 1206 <br>Teléfono 491515");
var salud3 = L.marker([36.927937, -60.31813]).addTo(salud).bindPopup("CAPS N°27 CIC <br> DirecciónCALLE 113 BIS 601 <br>Teléfono 452474");
var salud4 = L.marker([-36.894623, -60.341551]).addTo(salud).bindPopup("CAPS N°7 Independencia <br> Dirección AYACUCHO Y PUEYRREDON <br> Teléfono 420794");
var salud5 = L.marker([-36.950342, -60.254374]).addTo(salud).bindPopup("CAPS N°20 AOMA  <br> DirecciónGENERAL PAZ 11422 <br> Teléfono 450130");
var salud6 = L.marker([-36.893486, -60.299593]).addTo(salud).bindPopup("CAPS N°5 Hipólito Irigoyen <br> Dirección FAL 4124 <br> Teléfono 420646");
var salud7 = L.marker([-36.907669, -60.314784]).addTo(salud).bindPopup(" CAPS N°11 Obrero <br> Dirección DEL VALLE 4291 <br> Teléfono 425473");
var salud8 = L.marker([-36.882933, -60.339148]).addTo(salud).bindPopup(" CAPS N°18 Alberdi <br> Dirección ALBERDI Y CNEL SUAREZ <br> Teléfono 456306");
var salud9 = L.marker([-36.877648, -60.291628]).addTo(salud).bindPopup("CAPS N°23 Belén <br> Dirección EMILIOZZI 5936 <br> Teléfono 422535");
var salud10 = L.marker([-36.919881, -60.303916]).addTo(salud).bindPopup("CAPS N°22 Villa Maylin <br> Dirección MENDOZA Y BALCARCE <br> Teléfono");
var salud11 = L.marker([-36.920977, -60.319268]).addTo(salud).bindPopup("CAPS N°12 CECO <br> Dirección BARRIO CECO CASA 500 <br> Teléfono 451945");
var salud12 = L.marker([-36.845871, -60.234872]).addTo(salud).bindPopup("CAPS N°4 Sierra Chica <br> Dirección SBARDOLINI E/MARELLI <br> Teléfono 422229");
var salud13 = L.marker([-36.948855, -60.111457]).addTo(salud).bindPopup("CENTRO MUNICIPAL DE SALUD NRO 09 COLONIA SAN MIGUEL <br> Dirección SAN MARTIN E/25 DE MAYO <br> Teléfono 15201422");
var salud14 = L.marker([-36.983305, -60.278656]).addTo(salud).bindPopup("CENTRO MUNICIPAL DE SALUD NRO 21 LOMA NEGRA <br> Dirección 1 DE MAYO 1458 <br> Teléfono 493291");
var salud15 = L.marker([-36.534411, -60.885152]).addTo(salud).bindPopup("CENTRO MUNICIPAL DE SALUD NRO 13 BLANCA GRANDE <br> Dirección CALLE 5 E/CALLE 6 <br> Teléfono 02314426170");
var salud16 = L.marker([-36.651743, -61.086255]).addTo(salud).bindPopup("CENTRO MUNICIPAL DE SALUD NRO 14 RECALDE <br> Dirección ZANARDI Y CALLE 12 <br> Teléfono 02314499120");
var salud17 = L.marker([-37.126874, -60.416889]).addTo(salud).bindPopup("CENTRO MUNICIPAL DE SALUD NRO 15 SANTA LUISA <br> Dirección: <br> C/45 PLANTA URBANA <br> Teléfono:495522");
var salud18 = L.marker([-36.913239, -60.293971]).addTo(salud).bindPopup("CAPS N°16 Villa Magdalena Dirección CORDOBA 3082 Teléfono 429119");
var salud19 = L.marker([-36.912322, -60.327725]).addTo(salud).bindPopup("CAPS N°8 10 De Junio <br> Dirección GIOVANELLI 3867 <br> Teléfono 424415");
var salud20 = L.marker([-36.907566, -60.333249]).addTo(salud).bindPopup("CAPS N°17 Damaso Arce <br> Dirección 25 DE MAYO 1135 <br> Teléfono 430023");
var salud21 = L.marker([-36.904549, -60.297846]).addTo(salud).bindPopup("CAPS N°25 ACUPO <br> Dirección CALLE 101 BIS 3502 <br> Teléfono 421351");
var salud22 = L.marker([-36.897825, -60.309086]).addTo(salud).bindPopup("CAPS N°3 Amorosa  <br> Dirección DEAN FUNES 3303 <br> Teléfono 421067");
var salud23 = L.marker([-36.879905, -60.327802]).addTo(salud).bindPopup("CAPS N°2 Sarmiento <br> Dirección ROQUE SAENZ PEÑA 1450 <br> Teléfono 455696");
var salud24 = L.marker([-36.870475, -60.324277]).addTo(salud).bindPopup("CAPS N°26 Lourdes  <br> Dirección GRIMALDI 894 <br> Teléfono 455200");
var salud25 = L.marker([-36.87417, -60.333182]).addTo(salud).bindPopup("CAPS N°6 12 de Octubre <br> Dirección HIPOLITO IRIGOYEN Y 13 <br> Teléfono 456553");
L.control.layers({ 'Centros de Salud': salud, 'Museos': museos, 'Farmacias': farmacias, 'Bibliotecas': bibliotecas, 'Linea 500': linea, 'Linea 501': linea1, 'Linea 502': linea2, 'Linea 503': linea3, 'Linea 504': linea4, 'Linea 505': linea5 }).addTo(map);






// // CARROUSEL 
// let slideIndex = 1;
// showSlides(slideIndex);

let slideIndex = 0;
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) { slideIndex = 1 }
//   if (n < 1) { slideIndex = slides.length }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }

// MENÚ HAMBURGUESA
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('navbarToggle');
  const links = document.getElementById('navbarLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }
});



// Remueve la clase 'borrar' de cada botón
function borrar() {
  const botones = document.querySelectorAll('.botonEliminar');
  botones.forEach(boton => {
    boton.classList.remove('borrar');
  });
}


//Inicio de Sesion popup
function abrirPopup() {
  document.getElementById("popupLogin").style.display = "block";
  const botonLogin = document.getElementById("botonLogin");
  if (botonLogin) {
    setTimeout(() => {
      botonLogin.textContent = "Mi Perfil";
      botonLogin.href = "./HTML/perfil.html";
    }
      , 1000);
  }
}


function cerrarPopup() {
  document.getElementById("popupLogin").style.display = "none";
}


//funcion abrir popup de publicacion
function publicar() {
  const botonLogin = document.getElementById("botonLogin");
  if (botonLogin.textContent === "Mi Perfil") {
    document.getElementById("popupPublicacion").style.display = "block";
  } else {
    abrirPopup()
  }
}
//cerrar popup de publicacion
function cerrarPublicacion() {
  document.getElementById("popupPublicacion").style.display = "none";
}

