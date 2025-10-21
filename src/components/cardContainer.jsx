import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Card from "./card";
import "./cards.css";

const BASE_URL = "http://localhost:3000/posts";

export default function CardsContainer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET - traer publicaciones de la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []); // Evita errores si la API no devuelve un array
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las publicaciones 😢",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ POST - crear nueva publicación (formulario con SweetAlert2)
  const createPost = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Nueva publicación 🐾",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre de la mascota">
        <input id="contacto" class="swal2-input" placeholder="Contacto">
        <input id="direccion" class="swal2-input" placeholder="Dirección">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Publicar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          nombre: document.getElementById("nombre").value.trim(),
          contacto: document.getElementById("contacto").value.trim(),
          direccion: document.getElementById("direccion").value.trim(),
          descripcion: document.getElementById("descripcion").value.trim(),
        };
      },
    });

    if (!formValues) return;

    if (!formValues.nombre || !formValues.contacto) {
      return Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completá al menos el nombre y contacto 🐶",
      });
    }

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      setPosts([...posts, data]);

      Swal.fire({
        icon: "success",
        title: "¡Publicación creada!",
        text: "Tu publicación fue agregada correctamente 🐾",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la publicación 😢",
      });
    }
  };

  // ✅ PUT - editar publicación
  const editPost = async (id, post) => {
    const { value: nuevoNombre } = await Swal.fire({
      title: "Editar publicación",
      input: "text",
      inputLabel: "Nuevo nombre de la mascota",
      inputValue: post.nombre,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
    });

    if (!nuevoNombre) return;

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, nombre: nuevoNombre }),
      });

      const data = await res.json();
      setPosts(posts.map((p) => (p.id === id ? data : p)));

      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "La publicación fue editada correctamente ✏️",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo editar la publicación 😔",
      });
    }
  };

  // ✅ DELETE - eliminar publicación
  const deletePost = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar publicación?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      setPosts(posts.filter((p) => p.id !== id));

      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La publicación fue eliminada correctamente 🗑️",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la publicación 😞",
      });
    }
  };

  if (loading) return <p>Cargando publicaciones...</p>;

  return (
    <div className="cards-container">
      <button className="btn btn-success" onClick={createPost}>
        ➕ Nueva publicación
      </button>

      {posts.length > 0 ? (
        posts
          .filter((p) => p) // evita errores si hay elementos undefined
          .map((post, index) => (
            <Card
              key={post.id || index}
              element={post}
              index={index}
              onDelete={() => deletePost(post.id)}
              onEdit={() => editPost(post.id, post)}
            />
          ))
      ) : (
        <p>No hay publicaciones aún 🐾</p>
      )}
    </div>
  );
}
