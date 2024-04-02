const mongoose = require('mongoose')

const besoinSchema = new mongoose.Schema({
    dmID: { 
        type: String, 
        required: true,
        trim: true
    },
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
    }       
},
{
    timestamps: true
})

const BesoinModel = mongoose.model('besoin', besoinSchema)

module.exports = BesoinModel
