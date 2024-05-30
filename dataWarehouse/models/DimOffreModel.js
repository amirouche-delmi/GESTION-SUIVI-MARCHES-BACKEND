const mongoose = require('mongoose')

const dimOffreSchema = new mongoose.Schema({
    offreID: {
        type: String
    },
    marcheID: {
        type: String
    },
    nomSoumissionnaire: { 
        type: String, 
        required: true,
        minlength: 3,
        trim: true
    },
    emailSoumissionnaire: { 
        type: String, 
        required: true,
        lowercase: true, 
        trim: true
    },
    telephoneSoumissionnaire: { 
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    statutSoumissionnaire: { 
        type: String, 
        required: true,
        trim: true
    },
    detailsProposition: { 
        type: String, 
        required: true,
        trim: true 
    },       
    criteres: {
        type: [{
            nom: {type: String}, 
            note: {type: Number}, 
            poids: {type: Number}, 
        }]
    },
    noteObtenue: { 
        type: Number, 
        required: true
    },
    resultatEvaluation: { 
        type: String, 
        required: true,
        enum: ['Accepte', 'Rejete']
    },
    motif: { 
        type: String, 
        required: true,
        trim: true 
    },      
});

const DimOffreModel = mongoose.model('dim-offre', dimOffreSchema)

module.exports = DimOffreModel
