
import React from "react";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:3000/usuarios/login";
export default function Login() {
  const handleLogin = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Iniciar Sesión",
      html: `
        <input id="email" class="swal2-input" placeholder="Email">
        <input id="contrasenia" type="password" class="swal2-input" placeholder="Contraseña">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          email: document.getElementById("email").value,
          contrasenia: document.getElementById("contrasenia").value,
        };
      },
    });

    if (!formValues) return;

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formValues.email,
          contrasenia: formValues.contrasenia,
        }),
      });
      console.log(formValues);

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Bienvenido",
          text: `Hola ${data.usuario.nombre} ${data.usuario.apellido}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales Incorrectas",
          text: "Email o contraseña inválidos",
        });
      }

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Bienvenido",
          text: `Hola ${response.data.usuario.nombre} ${response.data.usuario.apellido}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales Incorrectas",
          text: "Email o contraseña inválidos",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "No se pudo conectar con la base de datos",
      });
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="NavLink"
    >
      Iniciar Sesión
    </button>
  );
}
