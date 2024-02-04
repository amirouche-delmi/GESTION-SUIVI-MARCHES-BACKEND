const router = require('express').Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

// Routes d'authentification 
router.post("/register", authController.signUp) // Route pour l'inscription
router.post('/login', authController.signIn)    // Route pour la connexion
router.get('/logout', authController.logout)    // Route pour la déconnexion

// Routes des utilisateurs dans la base de données
router.get('/', userController.getAllUser)    
router.get('/:id', userController.getUserInfo) 
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser) 

module.exports = router; 
