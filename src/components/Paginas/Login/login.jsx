import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login({ closeOffcanvas }) {

  const navigate = useNavigate();

  const handleLogin = async () => {

    // 🔥 Cerrar el Offcanvas antes de mostrar el SweetAlert
    if (closeOffcanvas) closeOffcanvas();

    // Esperar un poco a que desaparezca el backdrop del Offcanvas
    await new Promise(res => setTimeout(res, 200));

    const { value: formValues } = await Swal.fire({
      title: "Iniciar Sesión",
      html: `
        <input id="email" class="swal2-input" placeholder="Email">
        <input id="password" type="password" class="swal2-input" placeholder="Contraseña">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      cancelButtonText: "Cancelar",
      preConfirm: () => ({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    if (!formValues) return;

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        let errMsg = "Credenciales inválidas";
        try {
          const errJson = await response.json();
          errMsg = errJson.message || errJson.error || JSON.stringify(errJson);
        } catch {}
        return Swal.fire({ icon: "error", title: "Error", text: errMsg });
      }

      const data = await response.json();
      const token = data.access_token;
      if (token) localStorage.setItem("token", token);

      const usuario = data.user ?? data.usuario ?? null;
      if (usuario) localStorage.setItem("user", JSON.stringify(usuario));

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: usuario?.nombre ?? "",
      });

      navigate("/perfil");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error durante el inicio de sesión",
      });
    }
  };

  return (
    <button onClick={handleLogin} className="NavLink">
      Iniciar Sesión
    </button>
  );
}