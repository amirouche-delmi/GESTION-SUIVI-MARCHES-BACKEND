const router = require('express').Router();
const contratController = require('../controllers/contratController');

router.post('/', contratController.createContrat); 
router.get('/', contratController.getAllContrat);
router.get('/:id', contratController.getContratInfo); 
router.put('/:id', contratController.updateContrat);
router.delete('/:id', contratController.deleteContrat);

module.exports = router;