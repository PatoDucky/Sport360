const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ========== MODELOS ==========
const Usuario = require("./catalogo/Models/usuarios");
const Carrito = require("./catalogo/Models/carrito");

// ========== CONEXIÓN MONGODB ==========
mongoose.connect("mongodb://localhost:27017/sport360")
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.log("Error MongoDB:", err));


// ========== RUTA: CREAR CUENTA ==========
app.post("/api/usuarios", async (req, res) => {
    try {
        const { email, usuario, password } = req.body;

        if (!email || !usuario || !password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
        }

        const nuevoUsuario = new Usuario({ email, usuario, password });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario creado correctamente" });

    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: "El correo electrónico ya está registrado." });
        }
        res.status(500).json({ mensaje: "Hubo un error en el servidor al crear la cuenta." });
    }
});


// ========== RUTA: LOGIN ==========
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: "Email y contraseña son obligatorios." });
        }

        const usuario = await Usuario.findOne({ email, password });

        if (!usuario) {
            return res.status(401).json({ mensaje: "Email o contraseña incorrectos." });
        }

        res.status(200).json({
            mensaje: "Login exitoso",
            usuario: {
                id: usuario._id,
                email: usuario.email,
                nombre: usuario.usuario
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor." });
    }
});


// ========== RUTA: OBTENER CARRITO ==========
app.get("/api/carrito/:usuarioId", async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId });
        res.status(200).json(carrito || { productos: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener el carrito." });
    }
});


// ========== RUTA: AGREGAR AL CARRITO ==========
app.post("/api/carrito", async (req, res) => {
    try {
        const { usuarioId, nombre, precio, imagen } = req.body;

        if (!usuarioId || !nombre || !precio) {
            return res.status(400).json({ mensaje: "Faltan datos del producto." });
        }

        let carrito = await Carrito.findOne({ usuarioId });

        if (!carrito) {
            // Crear carrito nuevo para el usuario
            carrito = new Carrito({
                usuarioId,
                productos: [{ nombre, precio, imagen, cantidad: 1 }]
            });
        } else {
            // Si ya existe el producto, aumentar cantidad
            const existe = carrito.productos.find(p => p.nombre === nombre);
            if (existe) {
                existe.cantidad++;
            } else {
                carrito.productos.push({ nombre, precio, imagen, cantidad: 1 });
            }
        }

        await carrito.save();
        res.status(200).json({ mensaje: "Producto agregado al carrito.", carrito });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al agregar al carrito." });
    }
});


// ========== RUTA: QUITAR DEL CARRITO ==========
app.delete("/api/carrito", async (req, res) => {
    try {
        const { usuarioId, nombre } = req.body;

        const carrito = await Carrito.findOne({ usuarioId });
        if (!carrito) return res.status(404).json({ mensaje: "Carrito no encontrado." });

        carrito.productos = carrito.productos.filter(p => p.nombre !== nombre);
        await carrito.save();

        res.status(200).json({ mensaje: "Producto eliminado.", carrito });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar del carrito." });
    }
});


// ========== RUTA: ACTUALIZAR CANTIDAD ==========
app.put("/api/carrito", async (req, res) => {
    try {
        const { usuarioId, nombre, cantidad } = req.body;

        const carrito = await Carrito.findOne({ usuarioId });
        if (!carrito) return res.status(404).json({ mensaje: "Carrito no encontrado." });

        const producto = carrito.productos.find(p => p.nombre === nombre);
        if (producto) {
            if (cantidad <= 0) {
                carrito.productos = carrito.productos.filter(p => p.nombre !== nombre);
            } else {
                producto.cantidad = cantidad;
            }
        }

        await carrito.save();
        res.status(200).json({ mensaje: "Cantidad actualizada.", carrito });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar cantidad." });
    }
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
