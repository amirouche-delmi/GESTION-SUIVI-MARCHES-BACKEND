const mongoose = require('mongoose')

const dimTempsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    }       
})

const DimTempsModel = mongoose.model('dim-temps', dimTempsSchema)

module.exports = DimTempsModel
