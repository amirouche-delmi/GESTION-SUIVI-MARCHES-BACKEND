// Fonction pour gérer les erreurs lors de l'inscription
module.exports.signUpErrors = (err) => {
    let errors = { nom: '', telephone: '', email: '', password: '', role: '' }

    if (err.message.includes("nom")) 
        errors.nom = "Le nom doit faire 3 caractères minimum";
    
    // if (err.message.includes("telephone")) 
    //     errors.telephone = "Le numéro du téléphone doit faire exactement 10";

    if (err.message.includes("email")) 
        errors.email = "Email incorrect"
   
    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit faire 6 caractères minimum"
        
    if (err.message.includes("role")) 
        errors.role = "Role obligatoire"
   
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré"
  
    return errors
};
  
// Fonction pour gérer les erreurs lors de la connexion
module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' , compteValide: ''}

    if (err.message.includes("email")) 
        errors.email = "Email inconnu"
  
    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"
    
    if (err.message.includes('compte'))
        errors.compteValide = "Votre compte n'est pas encore validé"
  
    return errors 
};