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

module.exports = RespuestaB