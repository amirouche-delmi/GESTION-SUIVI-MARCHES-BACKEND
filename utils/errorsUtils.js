// Fonction pour gérer les erreurs lors de l'inscription
module.exports.signUpErrors = (err) => {
    let errors = { email: "", password: "" }
  
    if (err.message.includes("email")) 
        errors.email = "Email incorrect"
  
    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit faire 6 caractères minimum"
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré"
  
    return errors
};
  
// Fonction pour gérer les erreurs lors de la connexion
module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email")) 
        errors.email = "Email inconnu"
  
    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"
  
    return errors 
};