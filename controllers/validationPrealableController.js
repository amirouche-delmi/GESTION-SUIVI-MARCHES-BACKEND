const ObjectID = require('mongoose').Types.ObjectId
const MarcheModel = require('../models/MarcheModel');
const ValidationPrealableModel = require('../models/ValidationPrealableModel')

module.exports.createValidationPrealable = async (req, res) => {
    try {
        const { marcheID, dmID, dateValidation, reservesRemarques, validePar } = req.body
    
        if (!ObjectID.isValid(marcheID))
            return res.status(400).json({ error: "Invalid marcheID " + marcheID })
    
        const validationPrealable = await ValidationPrealableModel.create({ dmID, dateValidation, reservesRemarques, validePar })

        const updatedMarche = await MarcheModel.findOneAndUpdate(
            { _id: marcheID },
            {
                $set: { 
                    validationPrealableID: validationPrealable._id,
                    etape: 3
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        
        res.status(201).json({ validationPrealableID: validationPrealable._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllValidationPrealable = async (req, res) => {
    try {
        const validationPrealable = await ValidationPrealableModel.find().sort({ createdAt: -1 })
        res.status(200).json(validationPrealable)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getValidationPrealableInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const validationPrealable = await ValidationPrealableModel.findById(req.params.id)

        if (!validationPrealable)
            return res.status(404).json({ error: "ValidationPrealable not found" })

        res.status(200).json(validationPrealable)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateValidationPrealable = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        if (req.body.besoinID && !ObjectID.isValid(req.body.besoinID))
            return res.status(400).json({ error: "Invalid BesoinID " + req.body.besoinID })

        const validationPrealable = await ValidationPrealableModel.findById(req.params.id)

        if (!validationPrealable)
            return res.status(404).json({ error: "ValidationPrealable not found" })

        const updatedValidationPrealable = await ValidationPrealableModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    besoinID: req.body.besoinID || validationPrealable.besoinID,
                    dateValidation: req.body.dateValidation || validationPrealable.dateValidation,
                    reservesRemarques: req.body.reservesRemarques || validationPrealable.reservesRemarques,
                    validePar: req.body.validePar || validationPrealable.validePar
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedValidationPrealable)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteValidationPrealable = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

            const validationPrealable = await ValidationPrealableModel.findById(req.params.id)

            if (!validationPrealable)
                return res.status(404).json({ error: "ValidationPrealable not found" })

        await ValidationPrealableModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
