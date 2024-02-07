const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true,
        minlength: 3,
        trim: true
    },
    prenom: { 
        type: String, 
        required: true,
        minlength: 3,
        trim: true 
    },
    telephone: { 
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 10,
        trim: true 
    },
    email: { 
        type: String, 
        required: true,
        validate: [isEmail],
        lowercase: true, 
        unique: true, 
        trim: true
    },
    password: { 
        type: String, 
        minlength: 6, 
        required: true
    },
    role: { 
        type: String, 
        required: true,
        enum: ['Admin', 'Gestionnaire', 'Observateur']
    },
    valide: { 
        type: Boolean,
        require: true, 
        default: false 
    }
},
{
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
