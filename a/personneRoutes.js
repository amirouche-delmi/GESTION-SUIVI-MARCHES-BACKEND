const router = require('express').Router();
const personneController = require('./personneController');

router.post('/', personneController.createPersonne); 
router.get('/', personneController.getAllPersonne);
router.get('/:id', personneController.getPersonneInfo); 
router.put('/:id', personneController.updatePersonne);
router.delete('/:id', personneController.deletePersonne);

module.exports = router;