const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Configuración
app.use(cors());
app.use(express.json());

// Modelo
const Usuario = require("./catalogo/Models/Usuarios");

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/sport360")
.then(() => {
    console.log("MongoDB conectado");
})
.catch((err) => {
    console.log("Error MongoDB:", err);
});

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
    try {
        // 1. Extraemos los datos usando los nombres EXACTOS que envía el frontend
        const { correo_electronico, usuario, password } = req.body;

        // 2. Validación: Asegurar que no manden campos vacíos
        if (!correo_electronico || !usuario || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        // 3. Crear el nuevo documento con el modelo de Mongoose
        const nuevoUsuario = new Usuario({
            correo_electronico: correo_electronico, // Ahora sí coinciden
            usuario: usuario,
            password: password
        });

        // 4. Guardar en la base de datos
        await nuevoUsuario.save();

        // 5. Responder éxito
        res.status(201).json({
            mensaje: "Usuario creado correctamente"
        });

    } catch (error) {
        console.error(error);

        // 6. Controlar si el correo ya existe (Error de llave duplicada en MongoDB)
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El correo electrónico ya está registrado."
            });
        }

        // Error general del servidor
        res.status(500).json({
            mensaje: "Hubo un error en el servidor al crear la cuenta."
        });
    }
});