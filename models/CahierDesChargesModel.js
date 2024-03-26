const mongoose = require('mongoose')

const cahierDesChargesSchema = new mongoose.Schema({
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
    descriptionSuccincte: { 
        type: String, 
        required: true,
        trim: true
    }, 
    dateFinalisation: { 
        type: Date,
        required: true
    },
    validePar: { 
        type: String,
        required: true, 
        trim: true
    },
    participants: { 
        type: [String], 
        required: true,
        trim: true       
    },
    exemplaireNumerique: { 
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
})

const CahierDesChargesModel = mongoose.model('cahier-des-charges', cahierDesChargesSchema)

module.exports = CahierDesChargesModel
