const mongoose = require('mongoose')

const contratSchema = new mongoose.Schema({
    dmID: { 
        type: String, 
        required: true,
        trim: true
    },
    attributionMarcheID: { 
        type: String, 
        required: true,
        trim: true
    },
    delaiRealisation: { 
        type: String, 
        required: true,
        trim: true
    },
    cout: { 
        type: Number, 
        required: true
    },
    statut: { 
        type: String, 
        required: true,
        enum: ["actif", "terminé", "annulé"]
    },
    observation: { 
        type: String, 
        required: true,
        trim: true 
    },
    signePar: { 
        type: [String],
        required: true, 
        trim: true
    }       
},
{
    timestamps: true
})

const ContratModel = mongoose.model('contrat', contratSchema)

module.exports = ContratModel
