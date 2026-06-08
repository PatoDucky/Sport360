const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    email: String,
    usuario: String,
    password: String
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);