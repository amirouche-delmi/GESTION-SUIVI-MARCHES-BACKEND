const router = require('express').Router();
const soumissionnaireController = require('../controllers/soumissionnaireController');

router.post('/', soumissionnaireController.createSoumissionnaire); 
router.get('/', soumissionnaireController.getAllSoumissionnaire);
router.get('/:id', soumissionnaireController.getSoumissionnaireInfo); 
router.put('/:id', soumissionnaireController.updateSoumissionnaire);
router.delete('/:id', soumissionnaireController.deleteSoumissionnaire);

module.exports = router;