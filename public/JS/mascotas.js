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
   
    var direccion = document.getElementById("direccionMascotas").value;
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
                if (window.marcadorEventoMascotas) {
                    mapaForm.removeLayer(window.marcadorEventoMascotas);
                }
                window.marcadorEventoMascotas = L.marker([lat, lon]).addTo(mapaForm)
                    .bindPopup("Ubicación seleccionada").openPopup();
                // Guarda lat/lon en campos ocultos si quieres usarlos al guardar el evento
                document.getElementById("latitudEventoMascotas").value = lat;
                document.getElementById("longitudEventoMascotas").value = lon;
            } else {
                alert("Dirección no encontrada");
            }
        })
        .catch(() => alert("Error buscando la dirección"));
}
function borrarMarcadorForm() {
    if (window.marcadorEventoMascotas) {
        mapaForm.removeLayer(window.marcadorEventoMascotas);
        window.marcadorEventoMascotas = null; // Limpiar la variable del marcador
        document.getElementById("latitudEventoMascotas").value = "";
        document.getElementById("longitudEventoMascotas").value = "";
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
//     var respuesta = await fetch('../DATA/mascotasPerdidas.json');
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
  var nombre = document.getElementById("InputNameMascotas").value;
  var contacto = document.getElementById("InputContactoMascotas").value;
  var descripcion = document.getElementById("InputDatosMascotas").value;
  var direccion = document.getElementById("direccionMascotas").value;
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
Swal.fire({
  title: "Exito!",
  text: "Posteo Completado!",
  icon: "success"
});
  return true;
}
function ReadData() {
  console.log("ReadData");
  let listaEventoMascotas;
  if (localStorage.getItem("listaEventoMascotas") == null) {
    listaEventoMascotas = [];
  } else {
    listaEventoMascotas = JSON.parse(localStorage.getItem("listaEventoMascotas"));
  }
  var html = "";
  // Elimina todos los marcadores anteriores del mapa
  if (window.marcadores && window.marcadores.length > 0) {
    window.marcadores.forEach(m => {
      if (m) map.removeLayer(m);
    });
  }
  window.marcadores = []; // Vacía el array de marcadores
  listaEventoMascotas.forEach((element, index) => {
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
            <span class="botonEliminar btn btn-danger" onclick="DeleteData(${index})">Eliminar Publicacion</span>
            <span class="botonEliminar btn btn-warning" onclick="publicar(); EditData(${index})">Editar Publicacion</span>
            <img src="../IMG/images.jpg" alt="Perro Perdido">
            <div class="card-body ">
                <h6>${element.nombre}</h6>
                <h5>Contacto: ${element.contacto}</h5>
                <h5>Direccion: ${element.direccion}</h5>
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
    var nombre = document.getElementById("InputNameMascotas").value;
    var contacto = document.getElementById("InputContactoMascotas").value;
    var descripcion = document.getElementById("InputDatosMascotas").value;
      var latitud = document.getElementById("latitudEventoMascotas").value;
var longitud = document.getElementById("longitudEventoMascotas").value;
var direccion = document.getElementById("direccionMascotas").value;
    let listaEventoMascotas;
    if (localStorage.getItem("listaEventoMascotas") == null) {
      listaEventoMascotas = [];
    } else {
      listaEventoMascotas = JSON.parse(localStorage.getItem("listaEventoMascotas"));
    }
    let evento = {
      nombre: nombre,
      contacto: contacto,
      descripcion: descripcion,
       latitud: latitud,
    longitud: longitud,
    direccion: direccion
    };
    listaEventoMascotas.push(evento);
    localStorage.setItem("listaEventoMascotas", JSON.stringify(listaEventoMascotas));
    ReadData();
    cerrarPublicacion();
    document.getElementById("InputNameMascotas").value = "";
    document.getElementById("InputContactoMascotas").value = "";
    document.getElementById("InputDatosMascotas").value = "";
    document.getElementById("latitudEventoMascotas").value = "";
    document.getElementById("longitudEventoMascotas").value = "";
  document.getElementById("direccionMascotas").value = "";
     mapaForm.removeLayer(window.marcadorEvento); // Elimina el marcador anterior si existe
}
}
function DeleteData(index) {
  Swal.fire({
  title: "Esta seguro de eliminar?",
  text: "Atención, no se puede revertir!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085D6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sí, elimínalo!"
}).then((result) => {
  if (result.isConfirmed) {
  let listaEventoMascotas;
  if (localStorage.getItem("listaEventoMascotas") == null) {
    listaEventoMascotas = [];
  } else {
    listaEventoMascotas = JSON.parse(localStorage.getItem("listaEventoMascotas"));
  }
  listaEventoMascotas.splice(index, 1);
  localStorage.setItem("listaEventoMascotas", JSON.stringify(listaEventoMascotas));
  ReadData();
  Swal.fire({
      title: "Eliminado!",
      text: "Tu posteo ha sido eliminado.",
      icon: "success"
    });
  }
});}
function EditData(index) {
  document.getElementById('btnAddMascotas').style.display = 'none';
  document.getElementById('btnUpdateMascotas').style.display = 'block';
  var listaEventoMascotas;
  if (localStorage.getItem("listaEventoMascotas") == null) {
    listaEventoMascotas = [];
  } else {
    listaEventoMascotas = JSON.parse(localStorage.getItem("listaEventoMascotas"));
  }
  document.getElementById("InputNameMascotas").value = listaEventoMascotas[index].nombre;
  document.getElementById("InputContactoMascotas").value = listaEventoMascotas[index].contacto;
  document.getElementById("InputDatosMascotas").value = listaEventoMascotas[index].descripcion;
 // listaEventoMascotas[index].direccion;
  document.getElementById("direccionMascotas").value = listaEventoMascotas[index].direccion;
    document.getElementById("latitudEventoMascotas").value = listaEventoMascotas[index].latitud;
    document.getElementById("longitudEventoMascotas").value = listaEventoMascotas[index].longitud;
  document.getElementById('btnUpdateMascotas').onclick = function () {
    if (validarFormulario() == true) {
      listaEventoMascotas[index].nombre = document.getElementById("InputNameMascotas").value;
      listaEventoMascotas[index].contacto = document.getElementById("InputContactoMascotas").value;
      listaEventoMascotas[index].descripcion = document.getElementById("InputDatosMascotas").value;
      listaEventoMascotas[index].direccion = document.getElementById("direccionMascotas").value;
            listaEventoMascotas[index].latitud = document.getElementById("latitudEventoMascotas").value;
            listaEventoMascotas[index].longitud = document.getElementById("longitudEventoMascotas").value;
      localStorage.setItem("listaEventoMascotas", JSON.stringify(listaEventoMascotas));
      ReadData();
      cerrarPublicacion();
      
      document.getElementById("InputNameMascotas").value = "";
      document.getElementById("InputContactoMascotas").value = "";
      document.getElementById("InputDatosMascotas").value = "";
      document.getElementById("direccionMascotas").value = "";
            document.getElementById("latitudEventoMascotas").value = "";
            document.getElementById("longitudEventoMascotas").value = "";
      document.getElementById('btnAddMascotas').style.display = 'block';
      document.getElementById('btnUpdateMascotas').style.display = 'none';
       L.removeLayer(window.marcadorEventoMascotas); // Elimina el marcador anterior si existe
      
      
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