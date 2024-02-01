const ObjectID = require('mongoose').Types.ObjectId
const BesoinModel = require('../models/BesoinModel')

module.exports.createBesoin = async (req, res) => {
    try {
        const { intitule, description, dateExpression, objectifs, estimationCout, exprimePar } = req.body
    
        const besoin = await BesoinModel.create({ intitule, description, dateExpression, objectifs, estimationCout, exprimePar })
        
        res.status(201).json({ besoinID: besoin._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllBesoin = async (req, res) => {
    try {
        const besoins = await BesoinModel.find().sort({ createdAt: -1 })
        res.status(200).json(besoins)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getBesoinInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const besoin = await BesoinModel.findById(req.params.id)

        if (!besoin)
            return res.status(404).json({ error: "Besoin not found" })

        res.status(200).json(besoin)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateBesoin = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const besoin = await BesoinModel.findById(req.params.id)

        if (!besoin)
            return res.status(404).json({ error: "Besoin not found" })

        const updatedBesoin = await BesoinModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    intitule: req.body.intitule || besoin.intitule,
                    description: req.body.description || besoin.description,
                    dateExpression: req.body.dateExpression || besoin.dateExpression,
                    objectifs: req.body.objectifs || besoin.objectifs,
                    estimationCout: req.body.estimationCout || besoin.estimationCout,
                    exprimePar: req.body.exprimePar || besoin.exprimePar
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedBesoin)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteBesoin = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const besoin = await BesoinModel.findById(req.params.id)

        if (!besoin)
            return res.status(404).json({ error: "Besoin not found" })
                
        await BesoinModel.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
