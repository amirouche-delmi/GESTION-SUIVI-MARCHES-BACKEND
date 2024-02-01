const ObjectID = require('mongoose').Types.ObjectId
const AppelDOffreModel = require('../models/AppelDOffreModel')

module.exports.createAppelDOffre = async (req, res) => {
    try {
        const { cahierDesChargesID, dateLancement, mediasUtilises, redacteurs } = req.body
        
        if (!ObjectID.isValid(cahierDesChargesID))
            return res.status(400).json({ error: "Invalid cahierDesChargesID " + cahierDesChargesID })
 
        const appelDOffre = await AppelDOffreModel.create({ cahierDesChargesID, dateLancement, mediasUtilises, redacteurs })
       
        res.status(201).json({ appelDOffreID: appelDOffre._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllAppelDOffre = async (req, res) => {
    try {
        const appelsDOffre = await AppelDOffreModel.find().sort({ createdAt: -1 })
        res.status(200).json(appelsDOffre)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAppelDOffreInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const appelDOffre = await AppelDOffreModel.findById(req.params.id)

        if (!appelDOffre)
            return res.status(404).json({ error: "AppelDOffre not found" })

        res.status(200).json(appelDOffre)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateAppelDOffre = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        if (!ObjectID.isValid(req.body.cahierDesChargesID))
            return res.status(400).json({ error: "Invalid cahierDesChargesID " + req.body.cahierDesChargesID })

        const appelDOffre = await AppelDOffreModel.findById(req.params.id)

        if (!appelDOffre)
            return res.status(404).json({ error: "AppelDOffre not found" })

        const updatedAppelDOffre = await AppelDOffreModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    cahierDesChargesID: req.body.cahierDesChargesID || appelDOffre.cahierDesChargesID,
                    dateLancement: req.body.dateLancement || appelDOffre.dateLancement,
                    mediasUtilises: req.body.mediasUtilises || appelDOffre.mediasUtilises,
                    redacteurs: req.body.redacteurs || appelDOffre.redacteurs
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedAppelDOffre)
    }catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteAppelDOffre = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const appelDOffre = await AppelDOffreModel.findById(req.params.id)

        if (!appelDOffre)
            return res.status(404).json({ error: "AppelDOffre not found" })

        await AppelDOffreModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
