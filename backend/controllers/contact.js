const { Contact } = require('../models/contact.model');
const nodemailer = require('nodemailer');
const  config  = require('../config/config.json');





//post contact
exports.addContact = async (req, res, next) => {

    try {

        // génère une exception
        if (!req.body.email) { throw new Error('Adresse email introuvable') }
        if (!validator.isEmail(req.body.email)) { throw new Error('Adresse email invalide') }

        const contact = new Contact({
            lastname: req.body.lastname,
            email: req.body.email,
            message: req.body.message,
            is_closed: false
        });

        contact.save()
            .then(() => { res.status(201).json({ success: true, message: 'Votre message a été envoyé avec success' }) })
            .catch((error) => { res.status(500).json(error.message) });
    }
    catch (err) { res.status(400).json({ success: false, message: err.message }) }
};



//get how many notification 
exports.notificationContact = async (req, res, next) => {

    Contact.countDocuments({ is_closed: false })
        .then(
            (notif) => {
                res.status(200).json({ success: true, notification: notif });
            }
        ).catch(
            () => { res.status(500).json({ success: false, message: 'Erreur dans le serveur' }) }
        )
}


// get contact not closed
exports.getnotclosedContact = async (req, res, next) => {

    Contact.find({ is_closed: false })
        .then((contact) => { res.status(200).json(contact) })
        .catch(() => { res.status(500).json({ success: false, message: 'Erreur dans le serveur' }) })
}



// get contact closed
exports.getclosedContact = async (req, res, next) => {

    Contact.find({ is_closed: true })
        .then((contact) => { res.status(200).json(contact) })
        .catch(() => { res.status(500).json({ success: false, message: 'Erreur dans le serveur' }) })
}





//response contact 
exports.ResponseContact = async (req, res, next) => {

    if (req.query.id) {
        if (req.body.text) {

            Contact.findOne({ _id: req.query.id })
                .then((item) => {

                    if (item.is_closed === false) {

                        var smtpTransport = nodemailer.createTransport({
                            host: config.email.host,
                            port: config.email.port,
                            secure: true,
                            auth: { user: config.email.user, pass: config.email.pass },
                            tls: { rejectUnauthorized: false }, // do not fail on invalid certs 
                        });

                        var mailOptions = {
                            to: item.email,
                            from: config.email.email,
                            subject: `Réponse  à votre message`,
                            text: req.body.text
                        };

                        item.is_closed = true
                        item.response = req.body.text
                        item.response_date = new Date()

                        item.save().then(() => {

                            smtpTransport.sendMail(mailOptions)
                                .then(() => {
                                    res.status(200).json({ success: true, message: `Votre réponse a été envoyer avec success` })
                                })
                                .catch((e) => res.status(500).json({ success: false, message: `${e}` }))

                        }).catch((e) => res.status(500).json({ success: false, message: `${e}` }))
                    } else {
                        res.status(400).json({ success: false, message: `Le Message a été fermer` })
                    }
                }
                )
                .catch((e) => res.status(404).json({ success: false, message: `Message non trouvé` }))

        } else {
            res.status(400).json({ success: false, message: `Le message est obligatoire` })
        }
    } else {
        res.status(400).json({ success: false, message: `Identifiant du message non trouvé` })
    }
}






//colse contact
exports.CloseContact = async (req, res, next) => {

    if (req.query.id) {

        if (req.body.is_closed) {
            Contact.findOne({ _id: req.query.id })
                .then((item) => {
                    if (item.is_closed === false) {

                        item.is_closed = req.body.is_closed
                        item.response_date = new Date()

                        item.save().then(() => {
                            res.status(200).json({ success: true, message: `Le message a été fermer avec success` })

                        }).catch((e) => res.status(500).json({ success: false, message: `${e}` }))

                    } else {
                        res.status(400).json({ success: false, message: `Le Message a été fermer` })
                    }
                }
                )
                .catch((e) => res.status(404).json({ success: false, message: `Message non trouvé` }))
        }
        else {
            res.status(400).json({ success: false, message: `Body non trouvé` })
        }
    } else {
        res.status(400).json({ success: false, message: `Identifiant du message non trouvé` })
    }


}


