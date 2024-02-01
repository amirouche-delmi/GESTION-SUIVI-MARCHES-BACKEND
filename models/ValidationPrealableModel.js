const mongoose = require('mongoose')

const validationPrealableSchema = new mongoose.Schema({
    besoinID: { 
        type: String, 
        required: true,
        trim: true
    },
    dateValidation: { 
        type: Date, 
        required: true, 
    },
    reservesRemarques: { 
        type: String, 
        required: true,
        trim: true 
    },
    validePar: { 
        type: [String], 
        required: true,
        trim: true
    }     
},
{
    timestamps: true
})

const ValidationPrealableModel = mongoose.model('validation-prealable', validationPrealableSchema)

module.exports = ValidationPrealableModel
