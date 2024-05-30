const mongoose = require('mongoose');

const dimAppelDOffreSchema = new mongoose.Schema({
    appelDOffreID: {
        type: String
    },
    dateLancement: {
        type: Date,
        required: true
    },
    dateCloture: {
        type: Date,
        required: true
    },
    mediasUtilises: {
        type: [String],
        required: true
    },
});

const DimAppelDOffreModel = mongoose.model('dim-appel-d-offre', dimAppelDOffreSchema);

module.exports = DimAppelDOffreModel;
