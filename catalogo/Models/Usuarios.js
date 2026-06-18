
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


module.exports = mongoose.model("usuario", usuarioSchema);