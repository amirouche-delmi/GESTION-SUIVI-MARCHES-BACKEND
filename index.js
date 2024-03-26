const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');

const userRoutes = require('./routes/userRoutes')
const { checkUser, requireAuth } = require('./middleware/authMiddleware')
const marcheRoutes = require('./routes/marcheRoutes')
const besoinRoutes = require('./routes/besoinRoutes')
const validationPrealableRoutes = require('./routes/validationPrealableRoutes')
const cahierDesChargesRoutes = require('./routes/cahierDesChargesRoutes')
const appelDOffreRoutes = require('./routes/appelDOffreRoutes')
const soumissionnaireRoutes = require('./routes/soumissionnaireRoutes')
const offreRoutes = require('./routes/offreRoutes')
const attributionMarcheRoutes = require('./routes/attributionMarcheRoutes')
const contratRoutes = require('./routes/contratRoutes');
const roomRoutes = require('./routes/roomRoutes');
const fillDataWarehouse = require('./dataWarehouse/fillDataWarehouse');
const email = require('./email/email');

require('dotenv').config()
require('./config/dbConnection')

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use(cors(corsOptions));

// Utilisation des middlewares
app.use(bodyParser.json()) // Middleware pour analyser les corps de requête au format JSON
app.use(bodyParser.urlencoded({ extended: true })) // Middleware pour analyser les corps de requête au format URL-encoded
app.use(cookieParser()) // Middleware pour analyser les cookies

// Middleware pour vérifier l'utilisateur à chaque requête
app.get('*', checkUser)

// Route pour récupérer l'ID de l'utilisateur à partir du jeton JWT
app.get('/jwtid', requireAuth, (req, res) => {
        res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes)
app.use('/api/marche', marcheRoutes)
app.use('/api/besoin', besoinRoutes)
app.use('/api/validation-prealable', validationPrealableRoutes)
app.use('/api/cahier-des-charges', cahierDesChargesRoutes)
app.use('/api/appel-d-offre', appelDOffreRoutes)
app.use('/api/soumissionnaire', soumissionnaireRoutes)
app.use('/api/offre', offreRoutes)
app.use('/api/attribution-marche', attributionMarcheRoutes) 
app.use('/api/contrat', contratRoutes)
app.use('/api/room', roomRoutes)

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/fill-data-warehouse', fillDataWarehouse)

app.use('/api/email', email)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
