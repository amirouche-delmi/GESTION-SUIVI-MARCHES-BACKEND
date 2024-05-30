const router = require('express').Router()
const DimAppelDOffreModel = require('./models/DimAppelDOffreModel');

router.get('/', async (req, res) => {
    try {
        const appels = await DimAppelDOffreModel.find()
        res.status(200).json(appels)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
});

module.exports = router; 