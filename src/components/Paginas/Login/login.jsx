import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
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
      console.log("Attempting login with:", formValues);
      const BASE_URL = "http://localhost:3000/auth/login";
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });

      // manejar errores más informativos
      if (!response.ok) {
        let errMsg = response.statusText;
        try {
          const errJson = await response.json();
          errMsg = errJson.message || errJson.error || JSON.stringify(errJson);
        } catch {
          const txt = await response.text().catch(() => null);
          if (txt) errMsg = txt;
        }
        console.warn("Login failed:", response.status, errMsg);
        return Swal.fire({ icon: "error", title: "Error", text: errMsg || "Credenciales inválidas" });
      }

      const data = await response.json();
      const token = data.access_token ?? data.token ?? null;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.warn("No token in login response:", data);
        return Swal.fire({ icon: "error", title: "Error", text: "Token no recibido del servidor" });
      }

      const usuario = data.user ?? data.usuario ?? null;
      if (usuario) localStorage.setItem("user", JSON.stringify(usuario));

      Swal.fire({ icon: "success", title: "Bienvenido", text: usuario ? (usuario.nombre ?? "") : "" });
      navigate("/perfil");
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Ocurrió un error durante el inicio de sesión" });
    }
  };

  return (
    <button onClick={handleLogin} className="NavLink">
      Iniciar Sesión
    </button>
  );
}

