const mongoose = require('mongoose')
const { isEmail } = require('validator')

const soumissionnaireSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true,
        minlength: 3,
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
        minlength: 10,
        maxlength: 10,
        trim: true 
    },
    statut: { 
        type: String, 
        required: true,
        trim: true
    }      
},
{
    timestamps: true
})

const SoumissionnaireModel = mongoose.model('soumissionnaire', soumissionnaireSchema)

module.exports = SoumissionnaireModel
