const mongoose = require('mongoose')

const attributionMarcheSchema = new mongoose.Schema({
    dmID: { 
        type: String, 
        required: true,
        trim: true
    },
    commentaire: { 
        type: String, 
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
