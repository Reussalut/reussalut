const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
    idThread: {
        type: Number,
        required: true
    },
    idAuthor: {
        type: Number,
        required: true
    },
    titleRespuesta: {
        type: String,
        required: true
    },
    bodyRespuesta: {
        type: String,
        required: true
    }

},{timestamps: true})

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

module.exports = Respuesta;