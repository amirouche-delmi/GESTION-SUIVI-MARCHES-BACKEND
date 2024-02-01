const mongoose = require('mongoose');
const { isEmail } = require('validator');

const personneSchema = new mongoose.Schema({
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
    estEmploye: { 
        type: Boolean, 
        required: true,
        trim: true
    },
    fonction: { 
        type: String, 
        trim: true
    }
},
{
    timestamps: true
});

const PersonneModel = mongoose.model('personne', personneSchema);

module.exports = PersonneModel;
