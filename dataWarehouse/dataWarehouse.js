const router = require('express').Router()
const FaitMarcheModel = require('./models/FaitMarcheModel');
const ObjectID = require('mongoose').Types.ObjectId

router.get('/', async (req, res) => {
    try {
        const marches = await FaitMarcheModel.find()
        res.status(200).json(marches)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const marche = await FaitMarcheModel.find({marcheID: req.params.id})   

        if (!marche)
            return res.status(404).json({ error: "marche not found" })

        res.status(200).json(marche)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
});

module.exports = router; 