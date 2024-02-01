const router = require('express').Router();
const validationPrealableController = require('../controllers/validationPrealableController');

router.post('/', validationPrealableController.createValidationPrealable); 
router.get('/', validationPrealableController.getAllValidationPrealable);
router.get('/:id', validationPrealableController.getValidationPrealableInfo); 
router.put('/:id', validationPrealableController.updateValidationPrealable);
router.delete('/:id', validationPrealableController.deleteValidationPrealable);

module.exports = router;