  
import Swal from "sweetalert2";
import { useState } from "react";
import "./Registro.css";

const API_URL = "http://localhost:3000/auth/register"; // tu endpoint backend

export default function Registro({onPublicar}) {
  const initialForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [form, setForm] = useState(initialForm);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validarFormulario = async (e) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      setForm({ ...form, password: "", repeatPassword: "" });
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al guardar en la base de datos");
      }

      const data = await res.json();
      setForm(initialForm);
      if (onPublicar) onPublicar(data);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso! ",
        text: "Tu usuario se registro correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar en la base de datos 😞",
      });
      return;
    }


    setMensaje("Registro realizado con éxito");
    setTimeout(() => {
      window.location.href = "/"; 
    }, 2000);
  };

  const confirmarCancelacion = () => {
    const confirmar = confirm("¿Estás seguro que quieres salir sin registrarte?");
    if (confirmar) {
      window.location.href = "/";
    }
  };

  return (
    <main className="registro-page">
      <form className="formlogin" onSubmit={validarFormulario}>
        <h2>Registro de usuario</h2>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          pattern="[a-z A-Z]{3,}"
          placeholder="Escriba su nombre"
          required
          value={form.nombre}
          onChange={handleChange}
        />

        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          pattern="[a-z A-Z]{3,}"
          placeholder="Escriba su apellido"
          required
          value={form.apellido}
          onChange={handleChange}
        />
       
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="falltech@gmail.com"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Escriba su contraseña"
          required
          minLength="6"
          value={form.password}
          onChange={handleChange}
        />

        <label>Repetir contraseña</label>
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repita su contraseña"
          required
          value={form.repeatPassword}
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
        <button
          type="button"
          className="cancel-button"
          onClick={confirmarCancelacion}
        >
          Cancelar
        </button>
      </form>

      {mensaje && (
        <div id="mensaje-exito" className="mostrar" onClick={() => setMensaje("")}>
          {mensaje} (Clic para cerrar)
        </div>
      )}
    </main>
  );
}