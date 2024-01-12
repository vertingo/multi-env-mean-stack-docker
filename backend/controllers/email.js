const { Email } = require('../models/email.model');
const { User } = require('../models/user.model');
const nodemailer = require('nodemailer');
const config = require('../config/config.json');



// post email 
exports.sendEmail = async (req, res, next) => {

    if (req.query) {
        var query = {}
        // if (req.query.lastname) { query.lastname = req.query.lastname }
        // if (req.query.firstname) { query.firstname = req.query.firstname }
        if (req.query.email) { query.email = req.query.email }
        if (req.query.isactive) { query.isActive = req.query.isactive }
        if (req.query.isgain) { query.isGain = req.query.isgain }
    }

    const email = new Email({
        title: req.body.title,
        subject: req.body.subject,
        text: req.body.text,
        description: req.body.description
    });

    if (req.body.title && req.body.subject && req.body.text) {

        const user_db = await User.find(query, { email: 1 })
        const user_db_email = user_db.map(x => x.email)


        var smtpTransport = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: true,
            auth: { user: config.email.user, pass: config.email.pass },
            tls: { rejectUnauthorized: false }
        });

        var mailOptions = {
            to: user_db_email,
            from: config.email.user,
            subject: req.body.subject,
            text: req.body.text
        };

        email.save().then(() => {

            smtpTransport.sendMail(mailOptions)
                .then(() => res.status(200).json(email))
                .catch((e) => res.status(500).json({ success: false, message: `${e}` }))
        }).catch(() => res.status(500).json({ success: false, message: `Erreur dans le serveur` }))
    } else {
        res.status(400).json({ success: false, message: `Veuillez renseigner le titre et l'objet et le contexte du mail` })
    }


};




// get email 
exports.getEmail = async (req, res, next) => {

    Email.find({})
    .then((email) => { res.status(200).json(email) })
    .catch( () => { res.status(500).json({success: false, message: 'erreur dans le serveur'}) })

}