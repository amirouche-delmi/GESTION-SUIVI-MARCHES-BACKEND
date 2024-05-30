const router = require('express').Router()

const AppelDOffreModel = require('../models/AppelDOffreModel');
const DimAppelDOffreModel = require('./models/DimAppelDOffreModel');

const SoumissionnaireModel = require('../models/SoumissionnaireModel');
const OffreModel = require('../models/OffreModel');
const DimOffreModel = require('./models/DimOffreModel');

const ContratModel = require('../models/ContratModel');
const DimContratModel = require('./models/DimContrat');

const DimTempsModel = require('./models/DimTempsModel');

const MarcheModel = require('../models/MarcheModel');
const FaitMarcheModel = require('./models/FaitMarcheModel');
const { findTempsID, calculerDelaiSoumissionOffres, calculerMoyenneCoutPropose, calculerNoteMoyenneOffres } = require('./utils/utils');


router.get('/', async (req, res) => {
    try {

        await DimTempsModel.deleteMany();
        await DimAppelDOffreModel.deleteMany();
        await DimOffreModel.deleteMany();
        await DimContratModel.deleteMany();
        await FaitMarcheModel.deleteMany();

        // --------------- Le remplissage de la table dim-temps ---------------
        const fillDimTemps = async () => {
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
                
            } catch (error) {
                console.error('Error inserting dates : ', error);
            }
        };
        fillDimTemps();
   
        const marches = await MarcheModel.find();

        await Promise.all(marches.map(async (marche) => {
            let NewAppel, offres, NewContrat;

            // ----------------------------------------------------------
            if (marche.etape >= 5) {
                const appel = await AppelDOffreModel.findById(marche.appelDOffreID);
        
                const newAppel = {
                    appelDOffreID: appel._id,
                    dateLancement: appel.dateLancement,
                    dateCloture: appel.dateCloture,
                    mediasUtilises: appel.mediasUtilises
                };

                NewAppel = await DimAppelDOffreModel.create(newAppel);
            } 

            // --------------------------------------------------
            if (marche.etape >= 6) {
                offres = await OffreModel.find({marcheID: marche._id});
            if (marche.etape >= 8) {
                await Promise.all(offres.map(async (offre) => {
                    const soumissionnaire = await SoumissionnaireModel.findById(offre.soumissionnaireID);
                    
                    const newOffre = {
                        offreID : offre._id,
                        marcheID: marche._id,
                        nomSoumissionnaire: soumissionnaire.nom,
                        emailSoumissionnaire: soumissionnaire.email,
                        telephoneSoumissionnaire: soumissionnaire.telephone,
                        statutSoumissionnaire: soumissionnaire.statut,
                        detailsProposition: offre.detailsProposition,
                        criteres: offre.criteres,
                        noteObtenue: offre.noteObtenue,
                        resultatEvaluation: offre.resultatEvaluation,
                        motif: offre.motif,
                    };
        
                    await DimOffreModel.create(newOffre);
                }))
            }}
            
            // --------------- Le remplissage de la table dim-contrat ---------------
            if (marche.etape >= 9) {
                const contrat = await ContratModel.findById(marche.contratID);
     
                const newContrat = {
                    contratID: contrat._id,
                    delaiRealisation: contrat.delaiRealisation,
                    cout: contrat.cout,
                    statut: contrat.statut
                };
    
                NewContrat = await DimContratModel.create(newContrat);
            }

            // --------------- Le remplissage de la table fait-marche ---------------
            const tempsID = await findTempsID(marche.createdAt);
            const delaiSoumissionOffres = marche.etape >= 5 ? await calculerDelaiSoumissionOffres(NewAppel.dateCloture, NewAppel.dateLancement) : 0
            const nombreOffresSoumises = marche.etape >= 6 ? offres.length : 0
            const coutMoyenneOffres = marche.etape >= 6 ? calculerMoyenneCoutPropose(offres) : 0
            const noteMoyenneOffres = marche.etape >= 7 ? calculerNoteMoyenneOffres(offres) : 0
            const montantMarche = marche.etape >= 9 ? NewContrat.cout : 0
     
            const newMarche = {
                marcheID: marche._id,
                intitule: marche.intitule,
                description: marche.description,

                appelDOffreID: marche.etape >= 5 ? NewAppel.appelDOffreID : "",
                contratID: marche.etape >= 9 ? NewContrat.contratID : "",
                tempsID,

                delaiSoumissionOffres,
                nombreOffresSoumises,
                coutMoyenneOffres,
                noteMoyenneOffres,
                montantMarche
            };

            await FaitMarcheModel.create(newMarche);
            
        }));
        
        console.log('DataWarehouse filled successfully');
        return res.status(200).json({ message: "DataWarehouse filled successfully" })
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
});

module.exports = router; 