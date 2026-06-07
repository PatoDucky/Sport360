const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    correo_electronico: String,
    usuario: String,
    password: String
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);