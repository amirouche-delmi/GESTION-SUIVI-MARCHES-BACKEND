const ObjectID = require('mongoose').Types.ObjectId
const SoumissionnaireModel = require('../models/SoumissionnaireModel')

module.exports.createSoumissionnaire = async (req, res) => {
    try {
        const { appelDOffreID, nom, resultatEvaluation, motifRejet, membresCommission } = req.body
        
        if (!ObjectID.isValid(appelDOffreID))
            return res.status(400).json({ error: "Invalid appelDOffreID " + appelDOffreID })
        
        const soumissionnaire = await SoumissionnaireModel.create({ appelDOffreID, nom, resultatEvaluation, motifRejet, membresCommission })
        
        res.status(201).json({ soumissionnaireID: soumissionnaire._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllSoumissionnaire = async (req, res) => {
    try {
        const soumissionnaires = await SoumissionnaireModel.find().sort({ createdAt: -1 })
        res.status(200).json(soumissionnaires)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getSoumissionnaireInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const soumissionnaire = await SoumissionnaireModel.findById(req.params.id)

        if (!soumissionnaire)
            return res.status(404).json({ error: "Soumissionnaire not found" })

        res.status(200).json(soumissionnaire)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateSoumissionnaire = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        if (req.body.appelDOffreID && !ObjectID.isValid(req.body.appelDOffreID))
            return res.status(400).json({ error: "Invalid appelDOffreID " + req.body.appelDOffreID })

        const soumissionnaire = await SoumissionnaireModel.findById(req.params.id)

        if (!soumissionnaire)
            return res.status(404).json({ error: "Soumissionnaire not found" })

        const updatedSoumissionnaire = await SoumissionnaireModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    appelDOffreID: req.body.appelDOffreID || soumissionnaire.appelDOffreID,
                    nom: req.body.nom || soumissionnaire.nom,
                    resultatEvaluation: req.body.resultatEvaluation || soumissionnaire.resultatEvaluation,
                    motifRejet: req.body.motifRejet || soumissionnaire.motifRejet,
                    membresCommission: req.body.membresCommission || soumissionnaire.membresCommission,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedSoumissionnaire)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteSoumissionnaire = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
            
        const soumissionnaire = await SoumissionnaireModel.findById(req.params.id)

        if (!soumissionnaire)
            return res.status(404).json({ error: "Soumissionnaire not found" })

        await SoumissionnaireModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
