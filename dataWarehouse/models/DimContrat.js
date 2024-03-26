const mongoose = require('mongoose')

const dimContratSchema = new mongoose.Schema({
    delaiRealisation: { 
        type: String, 
        required: true,
        trim: true
    },
    cout: { 
        type: Number, 
        required: true,
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

const DimContratModel = mongoose.model('dim-contrat', dimContratSchema)

module.exports = DimContratModel
