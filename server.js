const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// configuracion del server
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// modelo 
const Usuario = require("./catalogo/Models/usuarios");

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/sport360")
.then(() => {
    console.log("MongoDB conectado");
})
.catch((err) => {
    console.log("Error MongoDB:", err);
});

// crea al ussuario
app.post("/api/usuarios", async (req, res) => {
    try {
        // 1. Extraemos los datos usando los nombres EXACTOS que envía el frontend
        const { email, usuario, password } = req.body;
        // 2. Validación: Asegurar que no manden campos vacíos
        if (!email || !usuario || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        // 3. Crear el nuevo documento con el modelo de Mongoose
        const nuevoUsuario = new Usuario({
            email: email, 
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
// 
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
 