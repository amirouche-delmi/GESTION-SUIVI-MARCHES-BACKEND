const ObjectID = require('mongoose').Types.ObjectId
const CahierDesChargesModel = require('../models/CahierDesChargesModel')
const fs = require('fs')

module.exports.createCahierDesCharges = async (req, res) => {
    try {
        const { besoinID, intitule, descriptionSuccincte, dateFinalisation, validePar, Participants } = req.body

        if (!ObjectID.isValid(besoinID))
            return res.status(400).json({ error: "Invalid BesoinID " + besoinID })

        if (!req.file)
            return res.status(400).json({ error: "The CahierDesCharges file is not included" })
        else if (req.file.mimetype !== "application/pdf")
            return res.status(400).json({ error: "File format incompatible. Please upload a PDF file." })
    
        const cahierDesCharges = await CahierDesChargesModel.create({ besoinID, intitule, descriptionSuccincte, dateFinalisation, validePar, Participants, exemplaireNumerique: "The link will be added" })

        let fileName = cahierDesCharges._id + ".pdf"

        await fs.promises.writeFile(
            `${__dirname}/../uploads/cahierDesCharges/${fileName}`,
            req.file.buffer
        )

        await CahierDesChargesModel.findOneAndUpdate(
            { _id: cahierDesCharges._id },
            { $set: { exemplaireNumerique: `uploads/cahierDesCharges/${fileName}` } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
 
        res.status(201).json({ cahierDesChargesID: cahierDesCharges._id })
    }  catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllCahierDesCharges = async (req, res) => {
    try {
        const cahiersDesCharges = await CahierDesChargesModel.find().sort({ createdAt: -1 })
        res.status(200).json(cahiersDesCharges)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getCahierDesChargesInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const cahierDesCharges = await CahierDesChargesModel.findById(req.params.id)

        if (!cahierDesCharges) 
            return res.status(404).json({ error: "CahierDesCharges not found" })

        res.status(200).json(cahierDesCharges)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateCahierDesCharges = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        if (!ObjectID.isValid(req.body.besoinID))
            return res.status(400).json({ error: "Invalid BesoinID " + req.body.besoinID })

        if (req.file && req.file.mimetype !== "application/pdf") 
            return res.status(400).json({ error: "File format incompatible. Please upload a PDF file." })

        const cahierDesCharges = await CahierDesChargesModel.findById(req.params.id)
        
        if (!cahierDesCharges)
            return res.status(404).json({ error: "CahierDesCharges not found" })

        if (req.file) {
            await fs.promises.writeFile(
                `${__dirname}/../uploads/cahierDesCharges/${cahierDesCharges._id}.pdf`,
                req.file.buffer
            )
        }        

        const updatedCahierDesCharges = await CahierDesChargesModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    besoinID: req.body.besoinID || cahierDesCharges.besoinID,
                    intitule: req.body.intitule || cahierDesCharges.intitule,
                    descriptionSuccincte: req.body.descriptionSuccincte || cahierDesCharges.descriptionSuccincte,
                    dateFinalisation: req.body.dateFinalisation || cahierDesCharges.dateFinalisation,
                    validePar: req.body.validePar || cahierDesCharges.validePar,
                    Participants: req.body.Participants || cahierDesCharges.Participants,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedCahierDesCharges)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteCahierDesCharges = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const cahierDesCharges = await CahierDesChargesModel.findById(req.params.id)

        if (!cahierDesCharges)
            return res.status(404).json({ error: "CahierDesCharges not found" })

        const filePath = `${__dirname}/../uploads/cahierDesCharges/${cahierDesCharges._id}.pdf`
        
        fs.unlink(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Error while deleting the file", 
                    error: err 
                })
            } else {
                await CahierDesChargesModel.deleteOne({ _id: cahierDesCharges._id })
                res.status(200).json({ message: "Successfully deleted" })
            }
        })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
