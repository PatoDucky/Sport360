const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre:   { type: String, required: true },
    precio:   { type: Number, required: true },
    imagen:   { type: String },
    cantidad: { type: Number, default: 1 }
});

const carritoSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true, unique: true },
    productos: [productoSchema]
});

module.exports = mongoose.model("Carrito", carritoSchema);
