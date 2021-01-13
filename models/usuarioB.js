const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const validator= require('validator');

const usuarioSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no válido')
            }
        }
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }, 
    // Con esto controlamos si el usuario usará el nombre real
    //  o el nickname
    tipoPrivacidad: {
        type: String,
        default: true,
    },
    tipoCuenta: {
        type: String, 
        required: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
},{timestamps: true}) 


// Este metodo no enseña la contraseña y el tokens al los usuarios.
usuarioSchema.methods.toJSON = function () {
    const usuario = this
    const usuarioObject = usuario.toObject()
 
    delete usuarioObject.password
    delete usuarioObject.tokens

    return usuarioObject
}

usuarioSchema.methods.generateAuthToken = async function () {
    const usuario = this
    const token = await jsonwebtoken.sign({ _id: usuario._id.toString() }, process.env.JWT_KEY, { expiresIn: '7 days' })

    usuario.tokens = usuario.tokens.concat({ token })
    await usuario.save()

    return token
}

usuarioSchema.statics.findUsuarioByCredentials = async (email, password) => {
    const usuario = await Usuario.findOne({ email: email })
    if (!usuario) {
        throw new Error('Email o password no válidos')
    }

    const isOk = await bcrypt.compare(password, usuario.password)

    if (!isOk) {
        throw new Error('Email o password no válidos')
    }
    return usuario
}

usuarioSchema.pre('save', async function (next) {
    const usuario = this
    if (usuario.isModified('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 8)
    }
    next()
})

const Usuario = mongoose.model('UsuarioB', usuarioSchema)

module.exports = Usuario;