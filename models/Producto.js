const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    perteneceA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    },
    foto: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Producto', ProductosSchema);