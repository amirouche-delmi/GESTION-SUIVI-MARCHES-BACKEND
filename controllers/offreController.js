const ObjectID = require('mongoose').Types.ObjectId
const MarcheModel = require('../models/MarcheModel');
const OffreModel = require('../models/OffreModel');
const SoumissionnaireModel = require('../models/SoumissionnaireModel');

module.exports.createOffre = async (req, res) => {
    try {
        const { 
            marcheID, 
            dmID,
            nomSoumissionnaire, 
            emailSoumissionnaire, 
            telephoneSoumissionnaire, 
            statutSoumissionnaire,
            detailsProposition, 
            } = req.body
        
        if (!ObjectID.isValid(marcheID))
            return res.status(400).json({ error: "Invalid marcheID " + marcheID })

        let soumissionnaire = await SoumissionnaireModel.findOne({ email: emailSoumissionnaire });
        
        if (!soumissionnaire) {
            soumissionnaire = await SoumissionnaireModel.create({
                nom : nomSoumissionnaire,
                email : emailSoumissionnaire,
                telephone: telephoneSoumissionnaire,
                statut: statutSoumissionnaire
            });
        }
        let offre = await OffreModel.findOne({ soumissionnaireID: soumissionnaire._id, marcheID});
        if(!offre) {
            offre = await OffreModel.create({ dmID, soumissionnaireID : soumissionnaire._id, marcheID, detailsProposition })
            
            const updatedMarche = await MarcheModel.findOneAndUpdate(
                { _id: marcheID },
                {
                    $set: { 
                        etape: 6
                    }
                },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            res.status(201).json({ offreID: offre._id })
        } else {
            res.status(400).json({ offreID: offre._id })
        }
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllOffre = async (req, res) => {
    try {
        const offres = await OffreModel.find().sort({ createdAt: -1 })
        res.status(200).json(offres)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getOffreInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const offre = await OffreModel.findById(req.params.id)

        if (!offre)
            return res.status(404).json({ error: "Offre not found" })

        res.status(200).json(offre)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateOffre = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const offre = await OffreModel.findById(req.params.id)

        if (!offre)
            return res.status(404).json({ error: "Offre not found" })

        const updatedOffre = await OffreModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    detailsProposition: req.body.detailsProposition || offre.detailsProposition,
                    noteObtenue: req.body.noteObtenue || offre.noteObtenue,
                    resultatEvaluation: req.body.resultatEvaluation || offre.resultatEvaluation,
                    motif: req.body.motif || offre.motif,
                    membresCommission: req.body.membresCommission || offre.membresCommission,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedOffre)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteOffre = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
            
        const offre = await OffreModel.findById(req.params.id)

        if (!offre)
            return res.status(404).json({ error: "Offre not found" })
        
        const soumissionnaireCount = await OffreModel.countDocuments({ soumissionnaireID: offre.soumissionnaireID });
        if (soumissionnaireCount === 1) {
            await SoumissionnaireModel.deleteOne({ _id: offre.soumissionnaireID });
        }

        await OffreModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
