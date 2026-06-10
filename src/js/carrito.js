function agregarAlCarrito(nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpieza de ruta: eliminamos los puntos y barras innecesarios
    let rutaLimpia = imagen.replace(/\.\.\//g, '');
    
    // Forzamos que la ruta siempre inicie desde la carpeta Imagenes/
    if (!rutaLimpia.startsWith('Imagenes/')) {
        rutaLimpia = 'Imagenes/' + rutaLimpia;
    }

    let idUnico = nombre.replace(/\s+/g, '-').toLowerCase();
    let productoExistente = carrito.find(item => item.id === idUnico);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: idUnico,
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: rutaLimpia,
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`¡${nombre} se agregó al carrito! 🛒`);
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let tablaBody = document.getElementById('carrito-items');
    if (!tablaBody) return; // Evita error si no estamos en la página del carrito
    
    tablaBody.innerHTML = "";

    if (carrito.length === 0) {
        tablaBody.innerHTML = `<tr><td colspan="5" align="center"><h3>Tu carrito está vacío.</h3></td></tr>`;
    }

    let subtotalGeneral = 0;
    carrito.forEach((producto, index) => {
        subtotalGeneral += (producto.precio * producto.cantidad);
        tablaBody.innerHTML += `
            <tr>
                <td align="center"><img src="${producto.imagen}" height="80" alt="Imagen"></td>
                <td><b>${producto.nombre}</b></td>
                <td align="center">$${producto.precio.toFixed(2)}</td>
                <td align="center">
                    <input type="number" min="1" value="${producto.cantidad}" 
                           onchange="cambiarCantidad(${index}, this.value)" style="width: 50px;">
                </td>
                <td align="center">
                    <button onclick="eliminarProducto(${index})" style="color:red; cursor:pointer;">Eliminar</button>
                </td>
            </tr>
        `;
    });
    actualizarResumen(subtotalGeneral);
}

function actualizarResumen(subtotal) {
    let iva = subtotal * 0.16;
    let total = subtotal + iva;
    if(document.getElementById('res-subtotal')) document.getElementById('res-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    if(document.getElementById('res-iva')) document.getElementById('res-iva').innerText = `$${iva.toFixed(2)}`;
    if(document.getElementById('res-total')) document.getElementById('res-total').innerText = `$${total.toFixed(2)}`;
}

function cambiarCantidad(index, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito[index].cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}