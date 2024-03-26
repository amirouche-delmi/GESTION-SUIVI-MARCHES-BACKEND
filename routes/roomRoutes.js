const router = require('express').Router();
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom); 
router.post('/message', roomController.addMessageToRoom); 
router.delete('/message/:id', roomController.deleteMessage);

module.exports = router;