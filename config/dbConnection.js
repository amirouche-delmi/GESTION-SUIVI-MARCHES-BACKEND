const mongoose = require('mongoose')

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@gestion-suivi-marches.lctzovu.mongodb.net/gestion-suivi-marches", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDB");
            mongoose.set('strictQuery', false);
        }) 
    .catch((err) => console.log("Failed to connect to MongoDB", err))

