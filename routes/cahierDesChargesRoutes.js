const router = require('express').Router();
const cahierDesChargesController = require('../controllers/cahierDesChargesController');
const multer = require("multer")
const upload = multer()

router.post('/', upload.single('file'), cahierDesChargesController.createCahierDesCharges); 
router.get('/', cahierDesChargesController.getAllCahierDesCharges);
router.get('/:id', cahierDesChargesController.getCahierDesChargesInfo); 
router.put('/:id', upload.single('file'), cahierDesChargesController.updateCahierDesCharges);
router.delete('/:id', cahierDesChargesController.deleteCahierDesCharges);

module.exports = router;