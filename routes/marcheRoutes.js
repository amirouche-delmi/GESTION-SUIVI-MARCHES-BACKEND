const router = require('express').Router();
const marcheController = require('../controllers/marcheController');

router.post('/', marcheController.createMarche); 
router.get('/', marcheController.getAllMarche);
router.get('/:id', marcheController.getMarcheInfo); 
router.put('/:id', marcheController.updateMarche);
router.delete('/:id', marcheController.deleteMarche);

module.exports = router;