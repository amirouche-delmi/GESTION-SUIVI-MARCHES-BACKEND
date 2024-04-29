const ObjectID = require('mongoose').Types.ObjectId
const MarcheModel = require('../models/MarcheModel');
const UserModel = require('../models/UserModel');
const { deleteMarcheLogic } = require('../utils/deleteMarcheUtils');

module.exports.getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password").sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    } 
};

module.exports.getUserInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const user = await UserModel.findById(req.params.id).select("-password")

        if (!user)
            return res.status(404).json({ error: "User not found" })

        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const user = await UserModel.findById(req.params.id)
        
        if (!user)
            return res.status(404).json({ error: "User not found" })

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    nom: req.body.nom || user.nom,
                    email: req.body.email || user.email,
                    telephone: req.body.telephone || user.telephone,
                    adresse: req.body.adresse || user.adresse,
                    valide: req.body.valide,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true, select: "-password" }
        )

        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).json({ error: "Invalid ID " + req.params.id })

        const user = await UserModel.findById(req.params.id)
        
        if (!user)
            return res.status(404).json({ error: "User not found" })

        // Récupérer tous les marchés créés par cet utilisateur
        const marches = await MarcheModel.find({ dmID: req.params.id });

        // Supprimer tous les marchés créés par cet utilisateur
        await Promise.all(marches.map(async (marche) => {
            await deleteMarcheLogic(marche);
        }));        

        await UserModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
