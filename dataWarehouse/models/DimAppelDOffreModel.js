const mongoose = require('mongoose')

const dimAppelDOffreSchema = new mongoose.Schema({
    dateLancement: { 
        type: String
    },
    dateCloture: { 
        type: String
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
    },
    dateCreation: {
        type: String
    }       
})

const DimAppelDOffreModel = mongoose.model('dim-appel-d-offre', dimAppelDOffreSchema)

module.exports = DimAppelDOffreModel;
