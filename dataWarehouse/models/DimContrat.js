const mongoose = require('mongoose')

const dimContratSchema = new mongoose.Schema({
    contratID: {
        type: String
    },
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
        enum: ["En cours", "Terminé", "Annulé"]  
    }     
});

const DimContratModel = mongoose.model('dim-contrat', dimContratSchema)

module.exports = DimContratModel
