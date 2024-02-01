const UtilisateurModel = require('../models/UtilisateurModel')
const { signUpErrors, signInErrors } = require('../utils/errorsUtils')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// l'inscription
module.exports.signUp = async (req, res) => {
    const { nom, prenom, email, telephone, motDePasse, role } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedMotDePasse = await bcrypt.hash(motDePasse, salt)
    
    try {
        const utilisateur = await UtilisateurModel.create({ nom, prenom, email, telephone, motDePasse: hashedMotDePasse, role })

        res.status(201).json({ utilisateurID: utilisateur._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(500).json({ errors })
    }
};

// la connexion
module.exports.signIn = async (req, res) => {
    const { email, motDePasse } = req.body
    
    try {
        const utilisateur = await UtilisateurModel.findOne({ email })
        if (utilisateur) {
            const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse)
            if (isMatch) {
                const maxAge = 3 * 24 * 60 * 60 * 1000; // Durée maximale du cookie JWT : 3 jours
                const token = jwt.sign({ utilisateurID: utilisateur._id }, process.env.TOKEN_SECRET, { expiresIn: maxAge }) // create token
                res.cookie("jwt", token, { httpOnly: true, maxAge })
                return res.status(200).json({ utilisateurID: utilisateur._id })
            }
            throw Error('Mot de passe incorrect')
        }
        throw Error('Email incorrect')
        
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({ errors });
    }
};
  
module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
