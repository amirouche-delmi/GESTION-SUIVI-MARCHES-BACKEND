const AppelDOffreModel = require("../models/AppelDOffreModel");
const AttributionMarcheModel = require("../models/AttributionMarcheModel");
const BesoinModel = require("../models/BesoinModel");
const CahierDesChargesModel = require("../models/CahierDesChargesModel");
const ContratModel = require("../models/ContratModel");
const MarcheModel = require("../models/MarcheModel");
const OffreModel = require("../models/OffreModel");
const SoumissionnaireModel = require("../models/SoumissionnaireModel");
const ValidationPrealableModel = require("../models/ValidationPrealableModel");

module.exports.deleteMarcheLogic = async (marche) => {
    try {
        const handleDelete = async (type, model, filter) => {
            try {
                if (type === 'deleteOne') {
                    await model.deleteOne(filter);
                } else if (type === 'deleteMany') {
                    await model.deleteMany(filter);
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la suppression :", error);
            }
        };

        await handleDelete('deleteOne', BesoinModel, { _id: marche.besoinID });
        await handleDelete('deleteOne', ValidationPrealableModel, { _id: marche.validationPrealableID });
        await handleDelete('deleteOne', CahierDesChargesModel, { _id: marche.cahierDesChargesID });
        await handleDelete('deleteOne', AppelDOffreModel, { _id: marche.appelDOffreID });
        
        const offres = await OffreModel.find({ marcheID: marche._id });
        for (const offre of offres) {
            const soumissionnaireCount = await OffreModel.countDocuments({ soumissionnaireID: offre.soumissionnaireID });
    
            if (soumissionnaireCount === 1) {
                await handleDelete('deleteOne', SoumissionnaireModel, { _id: offre.soumissionnaireID });
            }
    
            await handleDelete('deleteOne', OffreModel, { _id: offre._id });
        }
    
        await handleDelete('deleteOne', AttributionMarcheModel, { _id: marche.attributionMarcheID });
        await handleDelete('deleteOne', ContratModel, { _id: marche.contratID });
        await handleDelete('deleteOne', MarcheModel, { _id: marche._id });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression :", error);
    }        
};