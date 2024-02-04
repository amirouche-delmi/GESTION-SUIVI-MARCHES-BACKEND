const ObjectID = require('mongoose').Types.ObjectId
const UserModel = require('../models/UserModel')

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
                    prenom: req.body.prenom || user.prenom,
                    adresse: req.body.adresse || user.adresse,
                    telephone: req.body.telephone || user.telephone,
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

        await UserModel.deleteOne({ _id: req.params.id })
        
        res.status(200).json({ message: "Successfully deleted" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
};
