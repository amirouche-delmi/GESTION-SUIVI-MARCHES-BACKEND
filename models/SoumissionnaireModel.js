const mongoose = require('mongoose')

const soumissionnaireSchema = new mongoose.Schema({
    appelDOffreID: { 
        type: String, 
        required: true,
        trim: true
    },
    nom: { 
        type: String, 
        required: true,
        trim: true 
    },
    resultatEvaluation: { 
        type: String, 
        required: true,
        trim: true
    },
    motifRejet: { 
        type: String, 
        required: true,
        trim: true 
    },
    membresCommission: { 
        type: [String], 
        required: true,
        trim: true
    }      
},
{
    timestamps: true
})

const SoumissionnaireModel = mongoose.model('soumissionnaire', soumissionnaireSchema)

module.exports = SoumissionnaireModel
