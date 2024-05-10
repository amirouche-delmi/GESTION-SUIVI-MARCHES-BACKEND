const mongoose = require('mongoose')

const offreSchema = new mongoose.Schema({
    dmID: { 
        type: String, 
        required: true,
        trim: true
    },
    soumissionnaireID: { 
        type: String, 
        required: true,
        trim: true
    },
    marcheID: { 
        type: String, 
        required: true,
        trim: true
    },
    detailsProposition: { 
        type: String, 
        required: true,
        trim: true 
    },    
    criteres: {
        type: [{
            nom: {type: String}, 
            note: {type: Number}, 
            poids: {type: Number}, 
        }]
    },
    noteObtenue: { 
        type: Number, 
    },
    membresCommission: { 
        type: [String], 
        trim: true
    },
    resultatEvaluation: { 
        type: String, 
        enum: ['Accepte', 'Rejete']
    },
    motif: { 
        type: String, 
        trim: true 
    }     
},
{
    timestamps: true
})

const OffreModel = mongoose.model('offre', offreSchema)

module.exports = OffreModel
