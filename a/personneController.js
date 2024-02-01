const ObjectID = require('mongoose').Types.ObjectId;
const PersonneModel = require("./PersonneModel");

module.exports.createPersonne = async (req, res) => {
    const { nom, prenom, email, telephone, estEmploye, fonction } = req.body;

    try {
        const personne = await PersonneModel.create({ nom, prenom, email, telephone, estEmploye, fonction });
        res.status(201).json({ personne: personne._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.getAllPersonne = async (req, res) => {
    const personnes = await PersonneModel.find();
    res.status(200).json(personnes);
};

module.exports.getPersonneInfo = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send('ID unknown: ' + req.params.id);

        const personne = await PersonneModel.findById(req.params.id);

        if (!personne) {
            return res.status(404).send('personne not found');
        }

        res.send(personne);
    } 
    catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.updatePersonne = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send('ID unknown: ' + req.params.id);

        const personne = await PersonneModel.findById(req.params.id).exec();

        const updatedPersonne = await PersonneModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    nom: req.body.nom || personne.nom,
                    prenom: req.body.prenom || personne.prenom,
                    adresse: req.body.adresse || personne.adresse,
                    telephone: req.body.telephone || personne.telephone,
                    estEmploye: req.body.estEmploye || personne.estEmploye,
                    fonction: req.body.fonction || personne.fonction
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.send(updatedPersonne);
    } 
    catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.deletePersonne = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await PersonneModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
    } 
    catch (err) {
        return res.status(500).json({ message: err });
    }
};


