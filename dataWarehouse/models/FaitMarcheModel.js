
// --------------- Le modele de la table fait-marche ---------------
const mongoose = require('mongoose')

const faitMarcheSchema = new mongoose.Schema({
    marcheID: { type: String },
    intitule: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    appelDOffreID: { type: String },
    contratID: { type: String },
    tempsID: { type: String },

    delaiSoumissionOffres: { type: Number }, 
    nombreOffresSoumises: { type: Number }, 
    coutMoyenneOffres: { type: Number }, 
    noteMoyenneOffres: { type: Number }, 
    montantMarche: { type: Number }, 

});

const FaitMarcheModel = mongoose.model('fait-marche', faitMarcheSchema)

module.exports = FaitMarcheModel

