const mongoose = require('mongoose');

const respuestaBSchema = new mongoose.Schema({
    titleReply: {
        type: String,
        trim: true,
        required: true
    },
    bodyReply: {
        type: String,
        trim: true,
        required: true
    },
    idAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UsuarioB'
    }
}, { timestamps: true })

const RespuestaB = mongoose.model('RespuestaB', respuestaBSchema)

const hiloBSchema = new mongoose.Schema({
    disease: {
        type: String,
        required: true
    },
    titleThread: {
        type: String,
        required: true
    },
    bodyThread: {
        type: String,
        required: true
    },
    respuestas: [ respuestaBSchema],
    idAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UsuarioB'
    }

}, { timestamps: true })

const HiloB = mongoose.model('HiloB', hiloBSchema);

module.exports = HiloB;