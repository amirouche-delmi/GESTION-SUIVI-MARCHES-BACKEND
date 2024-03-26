const mongoose = require('mongoose')

const dimBesoinSchema = new mongoose.Schema({
    intitule: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true 
    },
    dateExpression: { 
        type: Date, 
        required: true,
    },
    objectifs: { 
        type: String, 
        required: true,
        trim: true 
    },
    estimationCout: { 
        type: Number, 
        required: true,
    },
    exprimePar: { 
        type: String,
        required: true, 
        trim: true
    },
    dateValidation: { 
        type: Date, 
        required: true, 
    },
    validePar: { 
        type: [String], 
        required: true,
        trim: true
    },
    lienCahierDesDharges: { 
        type: String,
        required: true,
        trim: true
    }     
},
{
    timestamps: true
})

const DimBesoinModel = mongoose.model('dim-besoin', dimBesoinSchema)

module.exports = DimBesoinModel
