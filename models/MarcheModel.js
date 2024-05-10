const mongoose = require('mongoose')

const marcheSchema = new mongoose.Schema({
    dmID: { 
        type: String, 
        required: true,
        trim: true
    },
    ceoID: { 
        type: String, 
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
    etape: { 
        type: Number, 
        default: 1,
    },
    besoinID: { 
        type: String, 
        trim: true
    },
    validationPrealableID: { 
        type: String, 
        trim: true
    },
    cahierDesChargesID: { 
        type: String, 
        trim: true
    },
    appelDOffreID: { 
        type: String, 
        trim: true
    },
    attributionMarcheID: { 
        type: String, 
        trim: true
    },
    contratID: { 
        type: String, 
        trim: true
    }         
},
{
    timestamps: true
})

const MarcheModel = mongoose.model('marche', marcheSchema)

module.exports = MarcheModel

