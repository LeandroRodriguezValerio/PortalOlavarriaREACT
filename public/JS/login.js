function validarFormulario(event) {
    event.preventDefault();

    const pass = document.getElementById("password");
    const repeat = document.getElementById("repeatPassword");

    pass.style.border = "";
    repeat.style.border = "";

    if (pass.value !== repeat.value) {
        alert("Las contraseñas no coinciden.");
        pass.style.border = "2px solid red";
        repeat.style.border = "2px solid red";
        pass.value = "";
        repeat.value = "";
        return false;
    }

    const mensaje = document.getElementById("mensaje-exito");
    mensaje.classList.add("mostrar");

    // Redirigir después de 2 segundos
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);

    return false; 
}


function confirmarCancelacion() {
    const confirmar = confirm("¿Estás seguro que quieres salir sin registrarte?");
    if (confirmar) {
        window.location.href = "../index.html";
    return true;
    } else {
        return false;
    }
}

function cerrarMensaje() {
    const mensaje =
        document.getElementById("mensaje-exito");
    mensaje.classList.remove("mostrar")
}

document.getElementById("telefono").addEventListener("input", function (e) {
    let valor = e.target.value.replace(/[^0-9]/g, ""); // Solo números

    // if (valor.length > 4) {
    //     valor = valor.slice(0, 4) + "-" + valor.slice(4, 10);
    // }

    e.target.value = valor;
});

function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";

    // Cambiar el ícono
    if (isHidden) {
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    } else {
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    }
}

