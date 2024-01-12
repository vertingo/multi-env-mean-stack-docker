const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const nodemailer = require('nodemailer');
var validator = require('validator');
const role = require('../lib/role');



//inscription user
exports.signup = async (req, res, next) => {

    try {

        // génère une exception
        if (!req.body.firstname) { throw new Error('Nom introuvable') }
        if (!req.body.lastname) { throw new Error('Prénom introuvable') }
        if (!req.body.email) { throw new Error('Adresse email introuvable') }
        if (!req.body.birthday) { throw new Error('Date de naissance introuvable') }
        if (!req.body.phonenumber) { throw new Error('Numéro de téléphone introuvable') }
        if (!req.body.adress) { throw new Error('Adresse introuvable') }
        if (!validator.isEmail(req.body.email)) { throw new Error('Adresse email invalide') }
        if (isNaN(Date.parse(req.body.birthday)) || (Date.parse(req.body.birthday)) > 1073692800000) { throw new Error('Date de naissance invalide') }


        const user = await User.findOne({ email: req.body.email }, { email: 1 })

        if (user) {
            res.status(401).json({ success: false, message: 'Adresse email existe déja veuillez renseigner une autre adresse email' })
        } else {

            bcrypt.hash(req.body.password, 12)
                .then(hash => {
                    const user = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        role: role.Client,
                        birthday: req.body.birthday,
                        phonenumber: req.body.phonenumber,
                        adress: req.body.adress,
                        isActive: true,
                        isGain: false,
                        password: hash
                    });

                    user.save()
                        .then(() => {
                            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.secret_key, { expiresIn: '10 h' })
                            res.status(201).json(
                                { success: true, token, expireIn: `${new Date().getTime() + 120000}` })
                        })
                        .catch((err) => res.status(500).json({ success: false, message: err.message }))
                })
                .catch(() => res.status(400).json({ success: false, message: 'Erreur dans le mot de passe' }));
        }

    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }

};




//login User
exports.login = (req, res, next) => {

    try {

        // génère une exception
        if (!req.body.email) { throw new Error('Adresse email introuvable') }
        if (!req.body.password) { throw new Error('Mot de passe introuvable') }
        if (!validator.isEmail(req.body.email)) { throw new Error('Adresse email invalide') }

        User.findOne({ email: req.body.email })
            .then(user => {
                if(!user) 
                {
                    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) { return res.status(401).json({ success: false, message: 'Mot de passe incorrect' }) }
                        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.secret_key, { expiresIn: '10 h' })
                        res.status(200).json(
                            { success: true, token, expireIn: `${new Date().getTime() + 120000}` })
                    })
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }));
    }
    catch (err) { res.status(400).json({ success: false, message: err.message }) }

};



//forgot password
exports.forgotPassword = async (req, res, next) => {

    try {

        // génère une exception
        if (!req.body.email) { throw new Error('Adresse email introuvable') }
        if (!validator.isEmail(req.body.email)) { throw new Error('Adresse email invalide') }

        var smtpTransport = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: true,
            auth: { user: config.email.user, pass: config.email.pass },
            tls: { rejectUnauthorized: false }
        });

        User.findOne({ email: req.body.email })
            .then((user) => {

                if (!user) {
                    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé avec cette adresse email' });
                }

                const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.reset_password_key, { expiresIn: '20m' })

                var mailOptions = {
                    to: req.body.email,
                    from: config.email.user,
                    subject: 'Réinitialisation de votre mot de passe',
                    html: `<h3>Cliquez sur ce lien pour rénisialiser votre mot de passe</h3>
                               <p>${config.reset_password_url}/${token}</p> `
                };

                user.updateOne({ resetLink: token })
                    .then(() => {

                        smtpTransport.sendMail(mailOptions)
                            .then(() => res.status(200).json({ success: true, message: `Un e-mail vous a été envoyé pour réinitialiser votre mot de passe` }))
                            .catch((e) => res.status(500).json({ success: false, message: `${e}` }))
                    })
                    .catch((e) => res.status(400).json({ success: false, message: `Réinitialisation de votre mot de passe a échoué` }))

            })
            .catch(() => res.status(500).json({ success: false, message: 'Erreur dans le serveur' }));
    }
    catch (err) { res.status(400).json({ success: false, message: err.message }) }
};






//reset password
exports.resetPassword = async (req, res, next) => {

    try {

        // génère une exception
        if (!req.body.password) { throw new Error('Nouveau mot de passe introuvable') }
        if (!req.body.resetLink) { throw new Error('Token introuvable') }

        jwt.verify(req.body.resetLink, config.reset_password_key, (error, decodedToken) => {
            if (error) { return res.status(401).json({ success: false, message: error.message }) }

            User.findOne({ resetLink: req.body.resetLink })
                .then((user) => {

                    if (!user) {
                        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé avec ce token' });
                    }

                    bcrypt.hash(req.body.password, 12)
                        .then(hash => {

                            user.updateOne({ resetLink: '', password: hash })
                                .then(() => { res.status(200).json({ success: false, message: 'Votre mot de passe a été changé avec success' }) })
                                .catch((err) => res.status(500).json({ success: false, message: err.message }))
                        })
                        .catch(() => res.status(400).json({ success: false, message: 'Erreur dans le mot de passe' }));
                })
                .catch((e) => res.status(500).json({ success: false, message: `Erreur dans le serveur` }))
        });

    }
    catch (err) { res.status(400).json({ success: false, message: err.message }) }

};
