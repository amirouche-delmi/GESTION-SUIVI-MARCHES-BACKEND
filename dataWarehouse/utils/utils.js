const DimTempsModel = require("../models/DimTempsModel");

module.exports.findTempsID = async (date) => {
    try {
        const formattedDate = new Date(date);
        formattedDate.setHours(0, 0, 0, 0);

        const dimTemps = await DimTempsModel.findOne({ date: { $gte: formattedDate, $lt: new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000) } });
        return dimTemps ? dimTemps._id : null;
    } catch (error) {
        console.error('Error finding DimTempsId:', error);
        return null;
    }
};

module.exports.calculerDelaiSoumissionOffres = async (dateCloture, dateLancement) => {
    const dateClotureObj = new Date(dateCloture);
    const dateLancementObj = new Date(dateLancement);
    
    const differenceEnMillisecondes = dateClotureObj.getTime() - dateLancementObj.getTime();
    
    const differenceEnJours = differenceEnMillisecondes / (1000 * 3600 * 24); // 1000 ms * 60 s * 60 min * 24 h
    
    const delaiSoumissionOffres = differenceEnJours;
    
    return delaiSoumissionOffres;
}

module.exports.calculerMoyenneCoutPropose = (offres) => {
    let sommeCouts = 0;
    let nombreOffresAvecCout = 0;

    offres.forEach(offre => {
        const regex = /Prix Proposé\s*:\s*(\d[\d\s]*)(?:\s*DA)?/g;
        const match = regex.exec(offre.detailsProposition);

        if (match && match[1]) {
            const prixPropose = match[1].replace(/\s/g, ''); // Supprimer les espaces avant la conversion
            const coutPropose = parseFloat(prixPropose);
            sommeCouts += coutPropose;
            nombreOffresAvecCout++;
        }
    });

    const moyenneCoutPropose = nombreOffresAvecCout > 0 ? (sommeCouts / nombreOffresAvecCout).toFixed(2) : 0;
    return moyenneCoutPropose;
}

module.exports.calculerNoteMoyenneOffres = (offres) => {
    let sommeNote = 0;
    let nombreOffresAvecNote = 0;

    offres.forEach(offre => {
        if (offre.noteObtenue) {
            sommeNote += offre.noteObtenue;
            nombreOffresAvecNote++;
        }
    });

    const moyenneCoutPropose = nombreOffresAvecNote > 0 ? (sommeNote / nombreOffresAvecNote).toFixed(2) : 0;
    return moyenneCoutPropose;
}





