const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { senderEmail, recipient, subject, body } = req.body;

    try {
        // Configurer le transporteur SMTP
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, // Utilisez votre adresse e-mail configurée
                pass: process.env.EMAIL_PASSWORD // Utilisez votre mot de passe
            }
        });

        // Définir les options de l'e-mail
        const mailOptions = {
            from: senderEmail, // Adresse e-mail de l'émetteur
            to: recipient, // Adresse e-mail du destinataire
            subject: subject, // Sujet de l'e-mail
            text: body // Corps de l'e-mail
        };

        // Envoyer l'e-mail
        await transporter.sendMail(mailOptions);

        // Envoyer une réponse indiquant que l'e-mail a été envoyé avec succès
        res.status(200).send('Email envoyé avec succès!');
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le statut d'erreur et le message d'erreur
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
    }
});

module.exports = router;
