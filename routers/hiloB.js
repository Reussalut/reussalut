const express = require('express');
const router = new express.Router();
const HiloB = require('../models/hiloB');

router.post('/hilosB', async (req, res) => {
    const hilo = new HiloB(req.body)

    try {
        await hilo.save()
        res.status(201).send(hilo)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/hilosB', async (req, res) => {
    try {
        const hilos = await HiloB.find({})
        res.send(hilos)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/hilosB/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const hilo = await HiloB.findById(_id)

        if (!hilo) {
            return res.status(404).send()
        }

        res.send(hilo)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/hilosB/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['idAuthor','disease','titleThread','bodyThread']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const hilo = await Hilo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!hilo) {
            return res.status(404).send()
        }

        res.send(hilo)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/hilosB/:id', async (req, res) => {
    try {
        const hilo = await Hilo.findByIdAndDelete(req.params.id)

        if (!hilo) {
            res.status(404).send()
        }

        res.send(hilo)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router