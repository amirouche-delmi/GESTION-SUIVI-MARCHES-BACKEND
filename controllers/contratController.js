const ObjectID = require('mongoose').Types.ObjectId
const ContratModel = require('../models/ContratModel');
const MarcheModel = require('../models/MarcheModel');

module.exports.createContrat = async (req, res) => {
    try {
        const { marcheID, dmID, delaiRealisation, cout, statut, observation, signePar } = req.body

        if (!ObjectID.isValid(marcheID))
            return res.status(400).json({ error: "Invalid marcheID " + marcheID })
        if (!ObjectID.isValid(dmID))
            return res.status(400).json({ error: "Invalid dmID " + dmID })

        const contrat = await ContratModel.create({ dmID, delaiRealisation, cout, statut, observation, signePar })

        const updatedMarche = await MarcheModel.findOneAndUpdate(
            { _id: marcheID },
            {
                $set: { 
                    contratID: contrat._id,
                    etape: 9
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        
        res.status(201).json({ contratID: contrat._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllContrat = async (req, res) => {
    try {
        const contrats = await ContratModel.find().sort({ createdAt: -1 })
        res.status(200).json(contrats)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }   
};

module.exports.getContratInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        const contrat = await ContratModel.findById(req.params.id)

        if (!contrat)
            return res.status(404).json({ error: "Contrat not found" })

        res.status(200).json(contrat)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateContrat = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        if (req.body.attributionMarcheID && !ObjectID.isValid(req.body.attributionMarcheID))
            return res.status(400).json({ error: "Invalid attributionMarcheID " + req.body.attributionMarcheID })

        const contrat = await ContratModel.findById(req.params.id)  

        if (!contrat)
            return res.status(404).json({ error: "Contrat not found" })

        const updatedContrat = await ContratModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    attributionMarcheID: req.body.attributionMarcheID || contrat.attributionMarcheID,
                    delaiRealisation: req.body.delaiRealisation || contrat.delaiRealisation,
                    cout: req.body.cout || contrat.cout,
                    statut: req.body.statut || contrat.statut,
                    observation: req.body.observation || contrat.observation,
                    signePar: req.body.signePar || contrat.signePar
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedContrat)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteContrat = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const contrat = await ContratModel.findById(req.params.id)

        if (!contrat)
            return res.status(404).json({ error: "Contrat not found" })

        await ContratModel.deleteOne({ _id: contrat._id })   

        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
