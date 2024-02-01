const router = require('express').Router();
const attributionMarcheController = require('../controllers/attributionMarcheController');
const multer = require("multer")
const upload = multer()

router.post('/', upload.single('file'), attributionMarcheController.createAttributionMarche); 
router.get('/', attributionMarcheController.getAllAttributionMarche);
router.get('/:id', attributionMarcheController.getAttributionMarcheInfo); 
router.put('/:id', upload.single('file'), attributionMarcheController.updateAttributionMarche);
router.delete('/:id', attributionMarcheController.deleteAttributionMarche);

module.exports = router;