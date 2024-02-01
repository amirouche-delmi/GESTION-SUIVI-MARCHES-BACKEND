const ObjectID = require('mongoose').Types.ObjectId
const UtilisateurModel = require('../models/UtilisateurModel')

module.exports.getAllUtilisateur = async (req, res) => {
    try {
        const utilisateurs = await UtilisateurModel.find().select("-motDePasse").sort({ createdAt: -1 })
        res.status(200).json(utilisateurs)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    } 
};

module.exports.getUtilisateurInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const utilisateur = await UtilisateurModel.findById(req.params.id).select("-motDePasse")

        if (!utilisateur)
            return res.status(404).json({ error: "Utilisateur not found" })

        res.status(200).json(utilisateur)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateUtilisateur = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const utilisateur = await UtilisateurModel.findById(req.params.id)
        
        if (!utilisateur)
            return res.status(404).json({ error: "Utilisateur not found" })

        const updatedUtilisateur = await UtilisateurModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    nom: req.body.nom || utilisateur.nom,
                    prenom: req.body.prenom || utilisateur.prenom,
                    adresse: req.body.adresse || utilisateur.adresse,
                    telephone: req.body.telephone || utilisateur.telephone,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true, select: "-motDePasse" }
        )

        return res.status(200).json(updatedUtilisateur)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteUtilisateur = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const utilisateur = await UtilisateurModel.findById(req.params.id)
        
        if (!utilisateur)
            return res.status(404).json({ error: "Utilisateur not found" })

        await UtilisateurModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
