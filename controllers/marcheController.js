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
                    description: req.body.description || marche.description
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

module.exports.deleteMarcheLogic = async (marche) => {
    try {
        const handleDelete = async (type, model, filter) => {
            try {
                if (type === 'deleteOne') {
                    await model.deleteOne(filter);
                } else if (type === 'deleteMany') {
                    await model.deleteMany(filter);
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la suppression :", error);
            }
        };
        
        await handleDelete('deleteOne', BesoinModel, { _id: marche.besoinID });
        await handleDelete('deleteOne', ValidationPrealableModel, { _id: marche.validationPrealableID });
        await handleDelete('deleteOne', CahierDesChargesModel, { _id: marche.cahierDesChargesID });
        await handleDelete('deleteOne', AppelDOffreModel, { _id: marche.appelDOffreID });
        
        const offres = await OffreModel.find({ marcheID: marche._id });
        for (const offre of offres) {
            const soumissionnaireCount = await OffreModel.countDocuments({ soumissionnaireID: offre.soumissionnaireID });
    
            if (soumissionnaireCount === 1) {
                await handleDelete('deleteOne', SoumissionnaireModel, { _id: offre.soumissionnaireID });
            }
    
            await handleDelete('deleteOne', OffreModel, { _id: offre._id });
        }
    
        await handleDelete('deleteOne', AttributionMarcheModel, { _id: marche.attributionMarcheID });
        await handleDelete('deleteOne', ContratModel, { _id: marche.contratID });
        await handleDelete('deleteOne', MarcheModel, { _id: marche._id });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression :", error);
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



