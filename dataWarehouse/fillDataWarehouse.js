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
const DimTempsModel = require('./models/DimTempsModel');
const FaitMarcheModel = require('./models/FaitMarcheModel');
const MarcheModel = require('../models/MarcheModel');


router.get('/', async (req, res) => {
    try {

        await DimTempsModel.deleteMany();
        await DimBesoinModel.deleteMany();
        await DimAppelDOffreModel.deleteMany();
        await DimOffreModel.deleteMany();
        await DimContratModel.deleteMany();
        await FaitMarcheModel.deleteMany();

        const fillDimTempsTable = async () => {
            try {
                const startDate = new Date('2023-01-01');
                const endDate = new Date();
                
                const addDays = (date, days) => {
                    const result = new Date(date);
                    result.setDate(result.getDate() + days);
                    return result;
                };
                
                const datesToInsert = [];
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    datesToInsert.push({ date: currentDate });
                    currentDate = addDays(currentDate, 1);
                }
                
                await DimTempsModel.insertMany(datesToInsert);
                
                console.log('Dates inserted successfully');
            } catch (error) {
                console.error('Error inserting dates:', error);
            }
        };
        fillDimTempsTable();

        const findDimTempsId = async (date) => {
            try {
                const formattedDate = new Date(date);
                formattedDate.setHours(0, 0, 0, 0);
        
                const dimTemps = await DimTempsModel.findOne({ date: { $gte: formattedDate, $lt: new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000) } });
                return dimTemps ? dimTemps._id : null;
            } catch (error) {
                console.error('Error finding DimTempsId:', error);
                return null;
            }
        };
        
        const marches = await MarcheModel.find();

        await Promise.all(marches.map(async (marche) => {
            let NewBesoin, NewAppel, NewOffre, NewContrat;

            // ----------------------------------------------------------
            if (marche.etape >= 4) {
                const besoin = await BesoinModel.findById(marche.besoinID);
                const validation = await ValidationPrealableModel.findById(marche.validationPrealableID);
                const cahier = await CahierDesChargesModel.findById(marche.cahierDesChargesID);
    
                const dateExpressionBesoinId = await findDimTempsId(besoin.dateExpression);
                const dateValidationBesoinId = await findDimTempsId(validation.dateValidation);
                const dateCreationBesoinId = await findDimTempsId(besoin.createdAt);
     
                const newBesoin = {
                    intitule: besoin.intitule,
                    description: besoin.description,
                    dateExpression: dateExpressionBesoinId,
                    objectifs: besoin.objectifs,
                    estimationCout: besoin.estimationCout,
                    exprimePar: besoin.exprimePar,
                    dateValidation: dateValidationBesoinId,
                    validePar: validation.validePar,
                    lienCahierDesDharges: cahier.exemplaireNumerique,
                    dateCreation: dateCreationBesoinId
                };
    
                NewBesoin = await DimBesoinModel.create(newBesoin);
            }

            // -----------------------------------------------------
            if (marche.etape >= 5) {
                const appel = await AppelDOffreModel.findById(marche.appelDOffreID);

                const dateLancementAppelId = await findDimTempsId(appel.dateLancement);
                const dateClotureAppelId = await findDimTempsId(appel.dateCloture);
                const dateCreationAppelId = await findDimTempsId(appel.createdAt);
        
                const newAppel = {
                    dateLancement: dateLancementAppelId,
                    dateCloture: dateClotureAppelId,
                    mediasUtilises: appel.mediasUtilises,
                    redacteurs: appel.redacteurs,
                    dateCreation: dateCreationAppelId
                };

                NewAppel = await DimAppelDOffreModel.create(newAppel);
            } 

            // --------------------------------------------------
            if (marche.etape >= 8) {
                const soumissionnaire = await SoumissionnaireModel.findById(marche.soumissionnaireID);
                const offre = await OffreModel.findById(marche.offreID);
    
                const dateCreationOffreId = await findDimTempsId(offre.createdAt);
     
                const newOffre = {
                    nomSoumissionnaire: soumissionnaire.nom,
                    emailSoumissionnaire: soumissionnaire.email,
                    telephoneSoumissionnaire: soumissionnaire.telephone,
                    statutSoumissionnaire: soumissionnaire.statut,
                    detailsProposition: offre.detailsProposition,
                    noteObtenue: offre.noteObtenue,
                    resultatEvaluation: offre.resultatEvaluation,
                    motif: offre.motif,
                    membresCommission: offre.membresCommission,
                    dateCreation: dateCreationOffreId
                };
    
                NewOffre = await DimOffreModel.create(newOffre);
            }
            
            // --------------------------------------------------
            if (marche.etape >= 9) {
                const contrat = await ContratModel.findById(marche.contratID);
    
                const dateCreationContratId = await findDimTempsId(contrat.createdAt);
     
                const newContrat = {
                    delaiRealisation: contrat.delaiRealisation,
                    cout: contrat.cout,
                    statut: contrat.statut,
                    observation: contrat.observation,
                    signePar: contrat.signePar,
                    dateCreation: dateCreationContratId
                };
    
                NewContrat = await DimContratModel.create(newContrat);
            }

            // ------------------------------------------------
            const dateCreationMarcheId = await findDimTempsId(marche.createdAt);
     
            const newMarche = {
                intitule: marche.intitule,
                description: marche.description,
                besoinID: marche.etape >= 4 ? NewBesoin._id : "",
                appelDOffreID: marche.etape >= 5 ? NewAppel._id : "",
                offreID: marche.etape >= 8 ? NewOffre._id : "",
                contratID: marche.etape >= 9 ? NewContrat._id : "",
                dateCreation: dateCreationMarcheId
            };

            await FaitMarcheModel.create(newMarche);
        }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 