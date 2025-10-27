import { useState } from "react";
import "./registro.css";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    dni: "",
    nacimiento: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "telefono" && /[^0-9]/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const validarFormulario = (e) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      setForm({ ...form, password: "", repeatPassword: "" });
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

        <label>Teléfono</label>
        <input
          type="tel"
          name="telefono"
          pattern="[0-9]{8,}"
          placeholder="2284123456"
          required
          value={form.telefono}
          onChange={handleChange}
        />

        <label>DNI</label>
        <input
          type="text"
          name="dni"
          pattern="[0-9]{7,}"
          placeholder="01234567"
          required
          value={form.dni}
          onChange={handleChange}
        />

        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="nacimiento"
          required
          value={form.nacimiento}
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