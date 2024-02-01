const ObjectID = require('mongoose').Types.ObjectId
const AttributionMarcheModel = require('../models/AttributionMarcheModel')
const fs = require('fs')

module.exports.createAttributionMarche = async (req, res) => {
    try {
        const { soumissionnaireID, motifSelection } = req.body

        if (!ObjectID.isValid(soumissionnaireID))
            return res.status(400).json({ error: "Invalid soumissionnaireID " + soumissionnaireID })

        if (!req.file) 
            return res.status(400).json({ error: "The PVCommission file is not included" })
        else if (req.file.mimetype !== "application/pdf")
            return res.status(400).json({ error: "File format incompatible. Please upload a PDF file." })
    
        const attributionMarche = await AttributionMarcheModel .create({ soumissionnaireID, motifSelection, PVCommission: "The link will be added" })
        
        let fileName = attributionMarche._id + ".pdf"
    
        await fs.promises.writeFile(
            `${__dirname}/../uploads/attributionMarche/${fileName}`,
            req.file.buffer
        )
    
        await AttributionMarcheModel.findOneAndUpdate(
            { _id: attributionMarche._id },
            { $set: { PVCommission: `uploads/attributionMarche/${fileName}` } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        
        res.status(201).json({ attributionMarcheID: attributionMarche._id })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.getAllAttributionMarche = async (req, res) => {
    try {
        const attributionMarches = await AttributionMarcheModel.find().sort({ createdAt: -1 })
        res.status(200).json(attributionMarches)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }   
};

module.exports.getAttributionMarcheInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        const attributionMarche = await AttributionMarcheModel.findById(req.params.id)

        if (!attributionMarche)
            return res.status(404).json({ error: "AttributionMarche not found" })

        res.status(200).json(attributionMarche)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateAttributionMarche = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })
        
        if (req.body.soumissionnaireID && !ObjectID.isValid(req.body.soumissionnaireID))
            return res.status(400).json({ error: "Invalid soumissionnaireID " + req.body.soumissionnaireID })

        if (req.file && req.file.mimetype !== "application/pdf") 
            return res.status(400).json({ error: "File format incompatible. Please upload a PDF file." })
        
        const attributionMarche = await AttributionMarcheModel.findById(req.params.id)  

        if (!attributionMarche)
            return res.status(404).json({ error: "AttributionMarche not found" })

        if (req.file) {
            await fs.promises.writeFile(
                `${__dirname}/../uploads/attributionMarche/${attributionMarche._id}.pdf`,
                req.file.buffer
            )
        }

        const updatedAttributionMarche = await AttributionMarcheModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { 
                    soumissionnaireID: req.body.soumissionnaireID || attributionMarche.soumissionnaireID,
                    motifSelection: req.body.motifSelection || attributionMarche.motifSelection,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        return res.status(200).json(updatedAttributionMarche)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteAttributionMarche = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const attributionMarche = await AttributionMarcheModel.findById(req.params.id)

        if (!attributionMarche)
            return res.status(404).json({ error: "AttributionMarche not found" })

        const filePath = `${__dirname}/../uploads/attributionMarche/${attributionMarche._id}.pdf`
        
        fs.unlink(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Error while deleting the file", 
                    error: err 
                })
            } else {
                await AttributionMarcheModel.deleteOne({ _id: attributionMarche._id })             
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
