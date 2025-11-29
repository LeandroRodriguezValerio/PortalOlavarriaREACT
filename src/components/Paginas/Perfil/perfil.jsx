import perroperdido from '../../../assets/IMG/perroperdido.jpg';
import './perfil.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../../Paginas/Mascotas/formulario.jsx';
import Swal from 'sweetalert2';
import CardsContainerPerfil from './cardContainerPerfil.jsx';
const BASE_URL = "http://localhost:3000/users";

function Perfil() {
  const navigate = useNavigate();

    
//   const handleLogout = () => {
//     // Remove the token from storage to log the user out
//     localStorage.removeItem('token');
//     navigate('/');
//   };

  const handleLogout = () => {
  Swal.fire({
    title: "Cerrar sesión",
    text: "¿Seguro que deseas cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate('/', { replace: true });
    }
  });
};

const usuario = JSON.parse(localStorage.getItem("user"));
console.log(usuario);

// Función para editar el usuario
const editUser = async (usuario) => {
  const { value: formValues } = await Swal.fire({
    title: "Editar perfil ✏️",
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre" value="${usuario.nombre || ""}">
      <input id="apellido" class="swal2-input" placeholder="Apellido" value="${usuario.apellido || ""}">
      <input id="email" class="swal2-input" placeholder="Email" value="${usuario.email || ""}">
    `,
    showCancelButton: true,
    confirmButtonText: "Guardar cambios",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      return {
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        email: document.getElementById("email").value.trim(),
      };
    },
  });

  if (!formValues) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/${usuario.usuario_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // Enviar el DTO directamente (no envuelto)
      body: JSON.stringify(formValues),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => null);
      throw new Error(txt || `Error ${res.status}`);
    }

    // Si el backend devuelve el usuario actualizado, úsalo; si no, hacer fetch adicional
    let data = null;
    const text = await res.text();
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      // fallback: pedir usuario actualizado al backend si PUT no lo retorna
      const meRes = await fetch(`${BASE_URL}/${usuario.usuario_id}`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (meRes.ok) {
        const fresh = await meRes.json();
        localStorage.setItem("user", JSON.stringify(fresh));
      }
    }

    Swal.fire({
      icon: "success",
      title: "Perfil actualizado",
      text: "Los datos fueron guardados correctamente 💾",
      timer: 2000,
      showConfirmButton: false,
    });

    window.location.reload();
  } catch (err) {
    console.error("Edit user error:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el usuario 😞",
    });
  }
};

const deleteUser = async (usuario_id) => {
  const confirm = await Swal.fire({
    title: "¿Eliminar cuenta?",
    text: "Esta acción es permanente. Se eliminarán tus publicaciones también.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar cuenta",
    cancelButtonText: "Cancelar",
  });

  if (!confirm.isConfirmed) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/users/${usuario_id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) throw new Error(`Delete failed ${res.status}`);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({
      icon: "success",
      title: "Cuenta eliminada",
      text: "Tu cuenta fue eliminada correctamente 🗑️",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
  } catch (err) {
    console.error("Delete user error:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar la cuenta 😞",
    });
  }
};






    return (


        <section id="perfil-usuario" className='perfil-container'>
            <div className="perfil-contenedor">
                <div className="perfil-info">
                    <img src={perroperdido} alt="Foto de perfil" className="perfil-foto"/>
                        {/* Nombre completo */}
                            <h2 className="perfil-nombre">
                            {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Invitado"}
                            </h2>

                            {/* Email */}
                            <p className="perfil-email">
                            {usuario ? usuario.email : "Sin email"}
                            </p>

                        
                       
                        <button onClick={() => editUser(usuario)}>Editar perfil ✏️</button>
                        <button onClick={() => deleteUser(usuario.usuario_id)}>Eliminar cuenta 🗑️</button>
                        <Formulario/>
                          <button onClick={handleLogout}>Cerrar Sesion</button>
                </div>
                    
                <div className="perfil-publicaciones">
                    
                    <h3>Mis publicaciones</h3>
                    <div id="lista-publicaciones">
                        <CardsContainerPerfil />

                      
                        {/* <!-- JS insertará las publicaciones acá --> */}

                        {/* Aca hay que poner las card del usuario */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Perfil;