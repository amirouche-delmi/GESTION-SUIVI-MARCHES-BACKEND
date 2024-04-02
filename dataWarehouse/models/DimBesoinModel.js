const mongoose = require('mongoose')

const dimBesoinSchema = new mongoose.Schema({
    intitule: { 
        type: String, 
    },
    description: { 
        type: String, 
    },
    dateExpression: { 
        type: String
    },
    objectifs: { 
        type: String, 
    },
    estimationCout: { 
        type: Number, 
    },
    exprimePar: { 
        type: String,
    },
    dateValidation: { 
        type: String
    },
    validePar: { 
        type: [String],
    },
    lienCahierDesCharges: { 
        type: String,
    },
    dateCreation: {
        type: String
    }     
})

const DimBesoinModel = mongoose.model('dim-besoin', dimBesoinSchema)

module.exports = DimBesoinModel
