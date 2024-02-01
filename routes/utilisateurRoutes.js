const router = require('express').Router()
const authController = require('../controllers/authController')
const utilisateurController = require('../controllers/utilisateurController')

// Routes d'authentification 
router.post("/register", authController.signUp) // Route pour l'inscription
router.post('/login', authController.signIn)    // Route pour la connexion
router.get('/logout', authController.logout)    // Route pour la déconnexion

// Routes des utilisateurs dans la base de données
router.get('/', utilisateurController.getAllUtilisateur)    // Route pour récupérer tous les utilisateurs
router.get('/:id', utilisateurController.getUtilisateurInfo) // Route pour récupérer les informations d'un utilisateur par ID
router.put('/:id', utilisateurController.updateUtilisateur) // Route pour mettre à jour les informations d'un utilisateur par ID
router.delete('/:id', utilisateurController.deleteUtilisateur) // Route pour supprimer un utilisateur par ID

module.exports = router; // Exporte le routeur pour être utilisé ailleurs dans l'application
