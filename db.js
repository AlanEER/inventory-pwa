let db;

const request = indexedDB.open("InventarioDB", 1);

// CREATE DATABASE

request.onupgradeneeded = event => {

    db = event.target.result;

    const store = db.createObjectStore("productos", {
        keyPath: "id",
        autoIncrement: true
    });

};

// DATABASE READY

request.onsuccess = event => {

    db = event.target.result;

    console.log("IndexedDB ready");

    mostrarProductos();

};

// SAVE PRODUCT

function guardarProducto(nombre, cantidad){

    const transaction = db.transaction(["productos"], "readwrite");

    const store = transaction.objectStore("productos");

    const producto = {
        nombre,
        cantidad
    };

    store.add(producto);

    transaction.oncomplete = () => {

        console.log("Product saved");

        mostrarProductos();

    };

}

// SHOW PRODUCTS

function mostrarProductos(){

    const lista = document.getElementById("lista-productos");

    lista.innerHTML = "";

    const transaction = db.transaction(["productos"], "readonly");

    const store = transaction.objectStore("productos");

    const cursor = store.openCursor();

    cursor.onsuccess = event => {

        const c = event.target.result;

        if(c){

            const li = document.createElement("li");

            li.textContent = `${c.value.nombre} - Quantity: ${c.value.cantidad}`;

            lista.appendChild(li);

            c.continue();

        }

    };

}