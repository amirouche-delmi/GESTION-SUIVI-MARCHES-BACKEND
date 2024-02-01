const mongoose = require('mongoose')

const attributionMarcheSchema = new mongoose.Schema({
    soumissionnaireID: { 
        type: String,    
        required: true,
        trim: true
    },
    motifSelection: { 
        type: String, 
        required: true,
        trim: true 
    },
    PVCommission: { 
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
})

const AttributionMarcheModel = mongoose.model('attribution-marche', attributionMarcheSchema)

module.exports = AttributionMarcheModel
