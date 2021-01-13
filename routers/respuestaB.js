const express = require('express')
const router = new express.Router()
const Respuesta = require('../models/respuestaB')

router.post('/respuestasB', async (req, res) => {
    const respuesta = new Respuesta(req.body)

    try {
        await respuesta.save()
        res.status(201).send(respuesta)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/respuestasB', async (req, res) => {
    try {
        const respuestas = await Respuesta.find({})
        res.send(respuestas)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/respuestasB/:id', async (req, res) => {
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

router.patch('/respuestasB/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['titleReply', 'bodyReply']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const respuesta = await Respuesta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!respuesta) {
            return res.status(404).send()
        }

        res.send(respuesta)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/respuestasB/:id', async (req, res) => {
    try {
        const respuesta = await Respuesta.findByIdAndDelete(req.params.id)

        if (!respuesta) {
            res.status(404).send()
        }

        res.send(respuesta)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router