const mongoose = require('mongoose')

const contratSchema = new mongoose.Schema({
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
