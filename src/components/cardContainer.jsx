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
console.log(posts);


  
  // ✅ PUT - editar publicación
  // const editPost = async (id, post) => {
  //   const { value: nuevoNombre, value: contacto , value:descripcion, value:direccion, value:lat, value:lng} = await Swal.fire({
  //     title: "Editar publicación",
  //     input: "text",
  //     html: `
  //     <input id="nombre" class="swal2-input" placeholder="Nombre" value="${post.nombre || ""}">
  //     <input id="contacto" class="swal2-input" placeholder="Contacto" value="${post.contacto || ""}">
  //     <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción">${post.descripcion || ""}</textarea>
  //     <input id="direccion" class="swal2-input" placeholder="Dirección" value="${post.direccion || ""}">
  //     <input id="lat" class="swal2-input" placeholder="Latitud" value="${post.lat || ""}">
  //     <input id="lng" class="swal2-input" placeholder="Longitud" value="${post.lng || ""}">
  //   `,
  //     showCancelButton: true,
  //     confirmButtonText: "Guardar cambios",
  //     cancelButtonText: "Cancelar",
      
  //   });

  //   if (!nuevoNombre) return;

  //   try {
  //     const res = await fetch(`${BASE_URL}/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ...post, nombre: nuevoNombre }),
  //     });

  //     const data = await res.json();
  //     setPosts(posts.map((p) => (p.id === id ? data : p)));

  //     Swal.fire({
  //       icon: "success",
  //       title: "Actualizado",
  //       text: "La publicación fue editada correctamente ✏️",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "No se pudo editar la publicación 😔",
  //     });
  //   }
  // };

  // ✅ PUT - editar publicación
const editPost = async (post_id, post) => {
  
console.log(post_id);
  const { value: formValues } = await Swal.fire({
    title: "Editar publicación ✏️",
    html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre" value="${post.nombre || ""}">
      <input id="contacto" class="swal2-input" placeholder="Contacto" value="${post.contacto || ""}">
      <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción">${post.descripcion || ""}</textarea>
    
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar cambios",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      return {
        nombre: document.getElementById("nombre").value.trim(),
        contacto: document.getElementById("contacto").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        
      };
    },
    didOpen: () => {
      const textarea = document.getElementById("descripcion");
      textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    },
  });

  if (!formValues) return;

  try {
    const res = await fetch(`${BASE_URL}/${post_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, ...formValues }),
    });

    const data = await res.json();
    setPosts(posts.map((p) => (p.post_id === post_id ? data : p)));

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
  const deletePost = async (post_id) => {
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
      await fetch(`${BASE_URL}/${post_id}`, { method: "DELETE" });
      setPosts(posts.filter((p) => p.post_id !== post_id));

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

    // ✅ PUT - editar publicación
  const reportPost = async (id, post) => {
    const { value: nuevoNombre } = await Swal.fire({
      title: "Reportar publicación",
      input: "text",
      inputLabel: "Describe el problema",
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
        text: "La publicación fue reportada correctamente ✏️",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se reporto la publicación 😔",
      });
    }
  };

  


  if (loading) return <p>Cargando publicaciones...</p>;

  return (
    <div className="cards-container">
      
      
      {posts.length > 0 ? (
        posts
          .filter((p) => p) // evita errores si hay elementos undefined
          .map((post, index) => (
            <Card
              key={post.post_id || index}
              element={post}
              index={index}
              onDelete={() => deletePost(post.post_id)}
              onEdit={() => editPost(post.post_id, post)}
              onReport={() => reportPost(post.post_id, post)}
             
            />
            
          )) 
      ) : (
        <p>No hay publicaciones aún 🐾</p>
      )}
      
    </div>
  );
}
