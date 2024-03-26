const UserModel = require('../models/UserModel')
const { signUpErrors, signInErrors } = require('../utils/errorsUtils')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// l'inscription
module.exports.signUp = async (req, res) => {
    const { nom, email, password, role } = req.body
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    try {
        const user = await UserModel.create({ nom, email, password: hashedPassword, role })

        console.log(user);

        res.status(201).json({ userID: user._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(200).json({ errors })
    }
};

// la connexion
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                if (user.valide !== false) {
                    const maxAge = 3 * 24 * 60 * 60 * 1000; // Durée maximale du cookie JWT : 3 jours
                    const token = jwt.sign({ userID: user._id }, process.env.TOKEN_SECRET, { expiresIn: maxAge }) // create token
                    res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge, sameSite: 'None' })
                    return res.status(200).json({ userID: user._id })
                }
                throw Error('compte invalide')
            }
            throw Error('password incorrect')
        }
        throw Error('email incorrect')
        
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({ errors });
    }
};
  
module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
