// Crear el mapa y centrarlo
var map = L.map('map').setView([-36.89384, -60.32319], 13);
document.addEventListener("DOMContentLoaded", ReadData());
var marcadores = []; // Array para almacenar los marcadores
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
      alert("No se pudo obtener tu ubicación: " + error.message);
    }
  );
} else {
  alert("Tu navegador no soporta geolocalización.");
}
//mapa formulario
//Mapa del formulario para ubicacion
var mapaForm = L.map('mapaForm').setView([-36.89384, -60.32319], 13); // Buenos Aires como ejemplo
// Cargar los tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapaForm);
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            // Centrar el mapa en la ubicación del usuario
            map.setView([lat, lng], 15);
            // Agregar marcador en la ubicación del usuario
            L.marker([lat, lng]).addTo(mapaForm)
                .bindPopup("Tu ubicación actual")
                .openPopup();
        },
        function (error) {
           console.log("No se pudo obtener tu ubicación: " + error.message);
        }
    );
} else {
    alert("Tu navegador no soporta geolocalización.");
}
function buscarDireccion() {
   
    var direccion = document.getElementById("direccion").value;
    console.log("Buscar dirección:", direccion);
    if (!direccion) {
        alert("Ingrese una dirección");
        return;
    }
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                // Centra el mapa y agrega el marcador
                mapaForm.setView([lat, lon], 16);
                // Elimina marcador anterior si existe
                if (window.marcadorEvento) {
                    mapaForm.removeLayer(window.marcadorEvento);
                }
                window.marcadorEvento = L.marker([lat, lon]).addTo(mapaForm)
                    .bindPopup("Ubicación seleccionada").openPopup();
                // Guarda lat/lon en campos ocultos si quieres usarlos al guardar el evento
                document.getElementById("latitudEvento").value = lat;
                document.getElementById("longitudEvento").value = lon;
            } else {
                alert("Dirección no encontrada");
            }
        })
        .catch(() => alert("Error buscando la dirección"));
}
function borrarMarcadorForm() {
    if (window.marcadorEvento) {
        mapaForm.removeLayer(window.marcadorEvento);
        window.marcadorEvento = null; // Limpiar la variable del marcador
        document.getElementById("latitudEvento").value = "";
        document.getElementById("longitudEvento").value = "";
    }
}
// var miIcono = L.icon({
//   iconUrl: '../IMG/marcadoranimal.png', // URL del ícono
//   iconSize: [50, 50], // tamaño del ícono
//   iconAnchor: [16, 32], // punto del ícono que se alinea con la coordenada
//   popupAnchor: [0, -32] // punto desde donde se abre el popup respecto al icono
// });
// // Evento para agregar marcador al hacer clic
// map.on('click', function (e) {
//   var lat = e.latlng.lat;
//   var lng = e.latlng.lng;
//   L.marker([lat, lng], { icon: miIcono }).addTo(map)
//     .bindPopup(mascotaPerdida + "se perdio en" + lat.toFixed(5) + "<br>Lng: " + lng.toFixed(5))
//     .openPopup();
// });
// async function obtenerPerros() {
//   try {
//     var respuesta = await fetch('../DATA/eventos.json'); // Asegúrate de que la ruta sea correcta
//     var datos = await respuesta.json();
//     L.geoJSON(datos, {
//       style: function (feature) {
//         return { color: feature.properties.color };
//       }
//     }).bindPopup(function (layer) {
//       return layer.feature.properties.nombre + "<br>" + layer.feature.properties.datos + "<br>" + layer.feature.properties.telefono;
//     }).addTo(map);
//     console.log('Perros:', datos);
//   } catch (error) {
//     console.error('Error al obtener los perros:', error);
//   }
// }
// obtenerPerros();
// CARROUSEL 
let slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
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
// Selecciona todos los botones con la clase 'botonEliminar'
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
      botonLogin.href = "../HTML/perfil.html";
    }
      , 1000);
  }
}
function cerrarPopup() {
  document.getElementById("popupLogin").style.display = "none";
}
// Funcion para Publicar
function validarFormulario() {
  var nombre = document.getElementById("InputName").value;
  var contacto = document.getElementById("InputContacto").value;
  var descripcion = document.getElementById("InputDatos").value;
  var direccion = document.getElementById("direccion").value;
  if (nombre === "") {
    alert("Nombre es requerido.");
    return false;
  }
  if (contacto === "") {
    alert("Contacto es requerido.");
    return false;
  }
  if (descripcion === "") {
    alert("Descripción es requerida.");
    return false;
  }
   if (direccion === "") {
        alert("Dirección es requerida.");
        return false;
    }
  return true;
}
function ReadData() {
  console.log("ReadData");
  let listaEvento;
  if (localStorage.getItem("listaEvento") == null) {
    listaEvento = [];
  } else {
    listaEvento = JSON.parse(localStorage.getItem("listaEvento"));
  }
  var html = "";
  // Elimina todos los marcadores anteriores del mapa
  if (window.marcadores && window.marcadores.length > 0) {
    window.marcadores.forEach(m => {
      if (m) map.removeLayer(m);
    });
  }
  window.marcadores = []; // Vacía el array de marcadores
  listaEvento.forEach((element, index) => {
    var lat = element.latitud 
    var lon = element.longitud 
    // Agregar marcador al mapa
    var lat = element.latitud;
    var lon = element.longitud;
    if (!isNaN(lat) && !isNaN(lon)) {
      let marcador = L.marker([lat, lon]).addTo(map)
        .bindPopup(`Evento: ${element.nombre}<br>Contacto: ${element.contacto}<br>Descripción: ${element.descripcion}`);
      window.marcadores.push(marcador);
    } else {
      window.marcadores.push(null);
    }
    
    html +=
      //          <tr>
      //             <td>${element.nombre}</td>
      //             <td>${element.contacto}</td>
      //             <td>${element.descripcion}</td>
      //             <td><span class="btn btn-danger" onclick="DeleteData(${index})">Eliminar Evento</span></td>
      //             <td><span class="btn btn-warning" onclick="EditData(${index})">Editar Evento</span></td>
      //         </tr>
      `
        <div class="card" id="contCard${index}">
            <span class="botonEliminar btn btn-danger" onclick="DeleteData(${index})">Eliminar Evento</span>
            <span class="botonEliminar btn btn-warning" onclick="publicar(); EditData(${index})">Editar Evento</span>
            <img src="../IMG/evento3.png" alt="Perro Perdido">
            <div class="card-body ">
                <h6>${element.nombre}</h6>
                <h5>${element.contacto}</h5>
                <p>${element.descripcion}</p>
                
            </div>
            </div>
                `;
  });
  document.querySelector("#containerCards").innerHTML = html;
}
document.addEventListener("DOMContentLoaded", ReadData());
function AddData() {
  if (validarFormulario() == true) {
    var nombre = document.getElementById("InputName").value;
    var contacto = document.getElementById("InputContacto").value;
    var descripcion = document.getElementById("InputDatos").value;
      var latitud = document.getElementById("latitudEvento").value;
var longitud = document.getElementById("longitudEvento").value;
var direccion = document.getElementById("direccion").value;
    let listaEvento;
    if (localStorage.getItem("listaEvento") == null) {
      listaEvento = [];
    } else {
      listaEvento = JSON.parse(localStorage.getItem("listaEvento"));
    }
    let evento = {
      nombre: nombre,
      contacto: contacto,
      descripcion: descripcion,
       latitud: latitud,
    longitud: longitud,
    direccion: direccion
    };
    listaEvento.push(evento);
    localStorage.setItem("listaEvento", JSON.stringify(listaEvento));
    ReadData();
    cerrarPublicacion();
    document.getElementById("InputName").value = "";
    document.getElementById("InputContacto").value = "";
    document.getElementById("InputDatos").value = "";
    document.getElementById("latitudEvento").value = "";
    document.getElementById("longitudEvento").value = "";
  document.getElementById("direccion").value = "";
     mapaForm.removeLayer(window.marcadorEvento); // Elimina el marcador anterior si existe
}
}
function DeleteData(index) {
  let listaEvento;
  if (localStorage.getItem("listaEvento") == null) {
    listaEvento = [];
  } else {
    listaEvento = JSON.parse(localStorage.getItem("listaEvento"));
  }
  listaEvento.splice(index, 1);
  localStorage.setItem("listaEvento", JSON.stringify(listaEvento));
  ReadData();
}
function EditData(index) {
  document.getElementById('btnAdd').style.display = 'none';
  document.getElementById('btnUpdate').style.display = 'block';
  var listaEvento;
  if (localStorage.getItem("listaEvento") == null) {
    listaEvento = [];
  } else {
    listaEvento = JSON.parse(localStorage.getItem("listaEvento"));
  }
  document.getElementById("InputName").value = listaEvento[index].nombre;
  document.getElementById("InputContacto").value = listaEvento[index].contacto;
  document.getElementById("InputDatos").value = listaEvento[index].descripcion;
 // listaEvento[index].direccion;
  document.getElementById("direccion").value = listaEvento[index].direccion;
    document.getElementById("latitudEvento").value = listaEvento[index].latitud;
    document.getElementById("longitudEvento").value = listaEvento[index].longitud;
  document.getElementById('btnUpdate').onclick = function () {
    if (validarFormulario() == true) {
      listaEvento[index].nombre = document.getElementById("InputName").value;
      listaEvento[index].contacto = document.getElementById("InputContacto").value;
      listaEvento[index].descripcion = document.getElementById("InputDatos").value;
      listaEvento[index].direccion = document.getElementById("direccion").value;
            listaEvento[index].latitud = document.getElementById("latitudEvento").value;
            listaEvento[index].longitud = document.getElementById("longitudEvento").value;
      localStorage.setItem("listaEvento", JSON.stringify(listaEvento));
      ReadData();
      cerrarPublicacion();
      document.getElementById("InputName").value = "";
      document.getElementById("InputContacto").value = "";
      document.getElementById("InputDatos").value = "";
      document.getElementById("direccion").value = "";
            document.getElementById("latitudEvento").value = "";
            document.getElementById("longitudEvento").value = "";
      document.getElementById('btnAdd').style.display = 'block';
      document.getElementById('btnUpdate').style.display = 'none';
       L.removeLayer(window.marcadorEvento); // Elimina el marcador anterior si existe
      
    }
   
  };
  
}
//el popup de publicación
//Inicio de Sesion popup
function abrirPopup() {
  document.getElementById("popupLogin").style.display = "block";
  const botonLogin = document.getElementById("botonLogin");
  if (botonLogin) {
    setTimeout(() => {
      botonLogin.textContent = "Mi Perfil";
      botonLogin.href = "../HTML/perfil.html";
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