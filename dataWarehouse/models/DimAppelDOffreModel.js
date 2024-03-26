const mongoose = require('mongoose')

const dimAppelDOffreSchema = new mongoose.Schema({
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

const DimAppelDOffreModel = mongoose.model('dim-appel-d-offre', dimAppelDOffreSchema)

module.exports = DimAppelDOffreModel;
