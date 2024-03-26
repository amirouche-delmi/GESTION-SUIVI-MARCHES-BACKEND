const router = require('express').Router()

const BesoinModel = require('../models/BesoinModel');
const ValidationPrealableModel = require('../models/ValidationPrealableModel');
const CahierDesChargesModel = require('../models/CahierDesChargesModel');
const DimBesoinModel = require('./models/DimBesoinModel');

const AppelDOffreModel = require('../models/AppelDOffreModel');
const DimAppelDOffreModel = require('./models/DimAppelDOffreModel');

const SoumissionnaireModel = require('../models/SoumissionnaireModel');
const OffreModel = require('../models/OffreModel');
const DimOffreModel = require('./models/DimOffreModel');

const ContratModel = require('../models/ContratModel');
const DimContratModel = require('./models/DimContrat');


router.post('/', async (req, res) => {
    try {
        await DimBesoinModel.deleteMany();

        const besoins = await BesoinModel.find();
        const validations = await ValidationPrealableModel.find();
        const cahiers = await CahierDesChargesModel.find();

        const dimBesoinData = besoins.map(besoin => {
            const validation = validations.find(v => v.besoinID == besoin._id);
            const cahier = cahiers.find(c => c.besoinID == besoin._id);

            return {
                _id: besoin._id,
                intitule: besoin.intitule,
                description: besoin.description,
                dateExpression: besoin.dateExpression,
                objectifs: besoin.objectifs,
                estimationCout: besoin.estimationCout,
                exprimePar: besoin.exprimePar,
                dateValidation: validation ? validation.dateValidation : null,
                validePar: validation ? validation.validePar : [],
                lienCahierDesDharges: cahier ? cahier.exemplaireNumerique : null
            };
        });

        await DimBesoinModel.insertMany(dimBesoinData);

        // ---------------------------------------------------------------------------

        await DimAppelDOffreModel.deleteMany();

        const appels = await AppelDOffreModel.find().select("-besoinID");

        await DimAppelDOffreModel.insertMany(appels);

        // --------------------------------------------------------------------------

        await DimOffreModel.deleteMany();

        const offres = await OffreModel.find();
        const soumissionnaires = await SoumissionnaireModel.find();

        const DimOffreData = offres.map(offre => {
            const soumissionnaire = soumissionnaires.find(s => s._id == offre.soumissionnaireID);
            if (soumissionnaire) {
                return {
                    _id: offre._id,
                    nomSoumissionnaire: soumissionnaire.nom,
                    emailSoumissionnaire: soumissionnaire.email,
                    telephoneSoumissionnaire: soumissionnaire.telephone,
                    statutSoumissionnaire: soumissionnaire.statut,
                    detailsProposition: offre.detailsProposition,
                    noteObtenue: offre.noteObtenue,
                    resultatEvaluation: offre.resultatEvaluation,
                    motif: offre.motif,
                    membresCommission: offre.membresCommission
                };
            }
            return null;
        })

        await DimOffreModel.insertMany(DimOffreData);

        // ---------------------------------------------------------------------

        await DimContratModel.deleteMany();

        const contrats = await ContratModel.find().select("-attributionMarcheID");

        await DimContratModel.insertMany(contrats);

        res.status(201).json(contrats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 