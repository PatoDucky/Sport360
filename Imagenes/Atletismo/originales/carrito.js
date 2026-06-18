// =====================
//  CARRITO - Sport360
// =====================

// Obtener carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    const carrito = obtenerCarrito();

    // Si ya existe, aumenta cantidad
    const existe = carrito.find(p => p.nombre === nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    guardarCarrito(carrito);

    // Confirmación visual
    alert("✅ " + nombre + " agregado al carrito");
}

// Quitar producto del carrito
function quitarDelCarrito(nombre) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.nombre !== nombre);
    guardarCarrito(carrito);
    mostrarCarrito(); // refresca la tabla
}

// Cambiar cantidad
function cambiarCantidad(nombre, cantidad) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad = parseInt(cantidad);
        if (producto.cantidad <= 0) {
            quitarDelCarrito(nombre);
            return;
        }
    }
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Mostrar carrito en carrito.html
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const tbody = document.getElementById("carrito-items");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" align="center"><h3>El carrito está vacío</h3></td></tr>`;
        actualizarTotales(0, 0, 0, 0);
        return;
    }

    let subtotal = 0;

    carrito.forEach(p => {
        const precioNum = parseFloat(p.precio.toString().replace(/[^0-9.]/g, ""));
        const total = precioNum * p.cantidad;
        subtotal += total;

        tbody.innerHTML += `
            <tr>
                <td align="center"><img src="${p.imagen}" height="80"></td>
                <td>${p.nombre}</td>
                <td>$${precioNum.toLocaleString("es-MX")} MXN</td>
                <td align="center">
                    <input type="number" min="1" value="${p.cantidad}" 
                        style="width:50px; text-align:center;"
                        onchange="cambiarCantidad('${p.nombre}', this.value)">
                </td>
                <td align="center">
                    <button class="boton" onclick="quitarDelCarrito('${p.nombre}')">🗑 Quitar</button>
                </td>
            </tr>
        `;
    });

    const envio = subtotal > 0 ? 150 : 0;
    const iva = subtotal * 0.16;
    const total = subtotal + envio + iva;
    actualizarTotales(carrito.reduce((a, p) => a + p.cantidad, 0), subtotal, envio, iva, total);
}

function actualizarTotales(totalProductos, subtotal, envio, iva, total) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("res-productos", totalProductos + " artículos");
    set("res-subtotal",  "$" + subtotal.toLocaleString("es-MX") + " MXN");
    set("res-envio",     "$" + envio.toLocaleString("es-MX") + " MXN");
    set("res-iva",       "$" + iva.toFixed(2) + " MXN");
    set("res-total",     "Total: $" + (total || 0).toFixed(2) + " MXN");
}
