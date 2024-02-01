const router = require('express').Router();
const besoinController = require('../controllers/besoinController');

router.post('/', besoinController.createBesoin); 
router.get('/', besoinController.getAllBesoin);
router.get('/:id', besoinController.getBesoinInfo); 
router.put('/:id', besoinController.updateBesoin);
router.delete('/:id', besoinController.deleteBesoin);

module.exports = router;