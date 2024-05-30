const router = require('express').Router()
const DimOffreModel = require('./models/DimOffreModel');

router.get('/', async (req, res) => {
    try {
        const offres = await DimOffreModel.find()
        res.status(200).json(offres)
    } catch (err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err 
        })
    }
});

module.exports = router; 