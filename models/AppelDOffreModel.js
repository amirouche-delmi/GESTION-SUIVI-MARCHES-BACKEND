const mongoose = require('mongoose')

const appelDOffreSchema = new mongoose.Schema({
    dmID: { 
        type: String, 
        required: true,
        trim: true
    },
    dateLancement: { 
        type: Date, 
        required: true,
    },
    dateCloture: { 
        type: Date, 
        required: true,
    },
    mediasUtilises: { 
        type: [String], 
        required: true,
        trim: true 
    },
    redacteurs: {
        type: [String],
        required: true, 
        trim: true
    }       
},
{
    timestamps: true
})

const AppelDOffreModel = mongoose.model('appel-d-offre', appelDOffreSchema)

module.exports = AppelDOffreModel

