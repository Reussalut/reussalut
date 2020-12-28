const express = require('express')
const router = new express.Router()
const Test = require('../models/test')
const auth = require('../middleware/auth')

router.post('/tests', auth, async (req, res) => {
    // const test = new Test(req.body)
    const test = new Test({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await test.save()
        res.redirect('/tests')
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/tests', async (req, res) => {
    try {
        const tests = await Test.find({})
        res.send(tests)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tests/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const test = await Test.findById(_id)

        if (!test) {
            return res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tests/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['question', 'answer1', 'answer2', 'answer3', 'answer4', 'solution']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!test) {
            return res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tests/:id', auth, async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id)

        if (!test) {
            res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router