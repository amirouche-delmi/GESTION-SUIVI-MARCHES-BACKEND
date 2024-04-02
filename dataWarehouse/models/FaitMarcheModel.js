const mongoose = require('mongoose')

const faitMarcheSchema = new mongoose.Schema({
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
    besoinID: { 
        type: String, 
        trim: true
    },
    appelDOffreID: { 
        type: String, 
        trim: true
    },
    offreID: { 
        type: String, 
        trim: true
    },
    contratID: { 
        type: String, 
        trim: true
    },
    dateCreation: {
        type: String
    }         
})

const FaitMarcheModel = mongoose.model('fait-marche', faitMarcheSchema)

module.exports = FaitMarcheModel

