// CSR
// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js")
        .then(reg => {
            console.log("Service Worker registered");
        })
        .catch(err => {
            console.log("SW error:", err);
        })
    })
}

// ONLINE / OFFLINE STATUS

const statusDiv = document.getElementById("status-online");

function actualizarEstado() {
    if (navigator.onLine) {
        statusDiv.textContent = "Online";
        statusDiv.className = "status online";
    } else {
        statusDiv.textContent = "Offline Mode";
        statusDiv.className = "status offline";
    }
}

window.addEventListener("load", actualizarEstado);
window.addEventListener("online", actualizarEstado);
window.addEventListener("offline", actualizarEstado);


// window.addEventListener("online", () => {
//     statusDiv.textContent = "Online";
//     statusDiv.className = "status online";
// });

// window.addEventListener("offline", () => {
//     statusDiv.textContent = "Offline Mode";
//     statusDiv.className = "status offline";
// });

// FORM

const form = document.getElementById("form-producto");

form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-producto").value;
    const cantidad = document.getElementById("cantidad-producto").value;

    guardarProducto(nombre, cantidad);
    form.reset();
})

//FORMULARIO DE REGISTRO DE USUARIOS 