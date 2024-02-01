const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');

const utilisateurRoutes = require('./routes/utilisateurRoutes')
const { checkUtilisateur, requireAuth } = require('./middleware/authMiddleware')
const besoinRoutes = require('./routes/besoinRoutes')
const validationPrealableRoutes = require('./routes/validationPrealableRoutes')
const cahierDesChargesRoutes = require('./routes/cahierDesChargesRoutes')
const appelDOffreRoutes = require('./routes/appelDOffreRoutes')
const soumissionnaireRoutes = require('./routes/soumissionnaireRoutes')
const attributionMarcheRoutes = require('./routes/attributionMarcheRoutes')
const contratRoutes = require('./routes/contratRoutes')

require('dotenv').config()
require('./config/dbConnection')

const app = express()

const corsOptions = {
    // origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use(cors(corsOptions));
// app.use(cors({origin: process.env.CLIENT_URL}))

// Utilisation des middlewares
app.use(bodyParser.json()) // Middleware pour analyser les corps de requête au format JSON
app.use(bodyParser.urlencoded({ extended: true })) // Middleware pour analyser les corps de requête au format URL-encoded
app.use(cookieParser()) // Middleware pour analyser les cookies

// Middleware pour vérifier l'utilisateur à chaque requête
app.get('*', checkUtilisateur)

// Route pour récupérer l'ID de l'utilisateur à partir du jeton JWT
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.utilisateur._id)
})

app.use('/api/utilisateur', utilisateurRoutes)
app.use('/api/besoin', besoinRoutes)
app.use('/api/validation-prealable', validationPrealableRoutes)
app.use('/api/cahier-des-charges', cahierDesChargesRoutes)
app.use('/api/appel-d-offre', appelDOffreRoutes)
app.use('/api/soumissionnaire', soumissionnaireRoutes)
app.use('/api/attribution-marche', attributionMarcheRoutes) 
app.use('/api/contrat', contratRoutes)

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
