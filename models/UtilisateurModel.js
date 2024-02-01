const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const utilisateurSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true,
        trim: true
    },
    prenom: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true,
        validate: [isEmail],
        lowercase: true, 
        unique: true, 
        trim: true
    },
    telephone: { 
        type: String, 
        required: true,
        trim: true 
    },
    motDePasse: { 
        type: String, 
        required: true,
        minlength: 6 
    },
    role: { 
        type: String, 
        required: true,
        enum: ['Admin', 'Gestionnaire', 'Observateur']
    }
},
{
    timestamps: true
})

const UtilisateurModel = mongoose.model('utilisateur', utilisateurSchema)

module.exports = UtilisateurModel
