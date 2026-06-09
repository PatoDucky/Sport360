
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true  // evita emails duplicados
    },
    usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// ✅ El nombre exportado debe ser "Usuario" con mayúscula
module.exports = mongoose.model("Usuario", usuarioSchema);