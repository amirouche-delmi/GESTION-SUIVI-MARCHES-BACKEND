const UtilisateurModel = require('../models/UtilisateurModel')
const jwt = require('jsonwebtoken')

module.exports.checkUtilisateur = (req, res ,next) => {
    const token = req.cookies.jwt
    
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.utilisateur = null
                res.cookie('jwt', '', { maxAge: 1})
                next()
            } else {
                let utilisateur = await UtilisateurModel.findById(decodedToken.utilisateurID)
                res.locals.utilisateur = utilisateur
                next()
            }
        })
    } else {
        res.locals.utilisateur = null
        next()
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
            } else {
                console.log(decodedToken.utilisateurID)
                next()
            }
        })
    } else {
        console.log('No token')
    }
}; 
