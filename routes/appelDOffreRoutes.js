const router = require('express').Router();
const appelDOffreController = require('../controllers/appelDOffreController');

router.post('/', appelDOffreController.createAppelDOffre); 
router.get('/', appelDOffreController.getAllAppelDOffre);
router.get('/:id', appelDOffreController.getAppelDOffreInfo); 
router.put('/:id', appelDOffreController.updateAppelDOffre);
router.delete('/:id', appelDOffreController.deleteAppelDOffre);

module.exports = router;