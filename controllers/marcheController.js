const ObjectID = require('mongoose').Types.ObjectId
const MarcheModel = require('../models/MarcheModel')
const BesoinModel = require('../models/BesoinModel')
const ValidationPrealableModel = require('../models/ValidationPrealableModel')
const CahierDesChargesModel = require('../models/CahierDesChargesModel')
const AppelDOffreModel = require('../models/AppelDOffreModel')
const SoumissionnaireModel = require('../models/SoumissionnaireModel')
const OffreModel = require('../models/OffreModel')
const AttributionMarcheModel = require('../models/AttributionMarcheModel')
const ContratModel = require('../models/ContratModel')
const { deleteMarcheLogic } = require('../utils/deleteMarcheUtils')

module.exports.createMarche = async (req, res) => {
    try {
        const { dmID, intitule, description } = req.body

        if (!ObjectID.isValid(dmID))
            return res.status(400).json({ error: "Invalid dmID " +  dmID})
    
        const marche = await MarcheModel.create({ dmID, intitule, description })
        
        res.status(201).json({ marcheID: marche._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllMarche = async (req, res) => {
    try {
        const marches = await MarcheModel.find().sort({ createdAt: -1 })
        res.status(200).json(marches)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getMarcheInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const marche = await MarcheModel.findById(req.params.id)

        if (!marche)
            return res.status(404).json({ error: "Marche not found" })

        res.status(200).json(marche)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateMarche = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const marche = await MarcheModel.findById(req.params.id)

        if (!marche)
            return res.status(404).json({ error: "Marche not found" })

        const updatedMarche = await MarcheModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    intitule: req.body.intitule || marche.intitule,
                    description: req.body.description || marche.description,
                    etape: req.body.etape || marche.etape
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedMarche)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteMarche = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const marche = await MarcheModel.findById(req.params.id)

        if (!marche)
            return res.status(404).json({ error: "Marche not found" })
        
        await deleteMarcheLogic(marche);

        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};



