const router = require('express').Router();
const offreController = require('../controllers/offreController');

router.post('/', offreController.createOffre); 
router.get('/', offreController.getAllOffre);
router.get('/:id', offreController.getOffreInfo); 
router.put('/:id', offreController.updateOffre);
router.delete('/:id', offreController.deleteOffre);

module.exports = router;