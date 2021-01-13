const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Usuario = require('../models/usuarioB')

router.post('/usuariosB', async (req, res) => {
    const usuario = new Usuario(req.body)

    try {
        await usuario.save()
        const token = await usuario.generateAuthToken()
        res.status(201).send({ usuario, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/usuariosB/login', async (req, res) => {
    try {
        const usuario = await Usuario.findUsuarioByCredentials(req.body.email, req.body.password)
        const token = await usuario.generateAuthToken()
        res.send({ usuario, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/usuariosB/logout', auth, async (req, res) => {
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.usuario.save()

        res.send()
    } catch (e) {
        
        res.status(500).send()
    }
})

router.post('/usuariosB/logoutAll', auth, async (req, res) => {
    try {
        req.usuario.tokens = []
        await req.usuario.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/usuariosB/me', auth, async (req, res) => {
    res.send(req.usuario)
})

router.get('/usuariosB/all', auth,async (req, res) => {
    try {
        const usuarios = await Usuario.find({})
        res.send(usuarios)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/usuariosB/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const respuesta = await Respuesta.findById(_id)

        if (!respuesta) {
            return res.status(404).send()
        }

        res.send(respuesta)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/usuariosB/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nickname','nombre','apellido','fechaNacimiento', 'email','password','tipoPrivacidad','tipoCuenta']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.usuario[update] = req.body[update])
        await req.usuario.save()
        res.send(req.usuario)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/usuariosB/me', auth, async (req, res) => {
    try {
        await req.usuario.remove()
        res.send(req.usuario)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router