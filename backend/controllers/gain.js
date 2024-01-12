const { Ticket } = require('../models/ticket.model');
const { User } = require('../models/user.model');



//consulter les gains
exports.gain = async (req, res, next) => {

    try {
        
        // génère une exception
        if (!req.query.id) { throw new Error(`Identifiant utilisateur introuvable`) }
        if (!req.body.code) { throw new Error(`Code introuvable`) }
        if (isNaN(req.body.code)) { throw new Error(`Votre code n'est pas un chiffre`) }
        if (req.body.code.toString().length != 10) { throw new Error(`Votre code est différent de 10 chiffres`) }

        
        User.findById(req.query.id)
            .then((user) => {

                Ticket.findOne({ code: req.body.code })
                    .then((ticket) => {
                        if (ticket) {
                            if (ticket.isUsed === false) {

                                ticket.isUsed = true;
                                ticket.date_used = new Date();

                                ticket.save()
                                    .then((ticket) => {
                                        user.isGain = true;
                                        user.gains.push(ticket);
                                        user.save()
                                            .then(() => res.status(200).send(ticket))
                                            .catch(() => res.status(500).json({ success: false, message: `Erreur dans le serveur` }))
                                    })
                                    .catch(() => res.status(500).json({ success: false, message: `Erreur dans le serveur` }))

                            } else { res.status(400).json({ success: false, message: `Le code a déjà été utilisé` }) }
                        } else { res.status(400).json({ success: false, message: `Le code est erroné` }) }

                    })
                    .catch(() => res.status(500).json({ success: false, message: `Erreur dans le serveur` }));

            })
            .catch(() => res.status(404).json({ success: false, message: `Utilisateur non trouvé` }))

    }
    catch (err) { res.status(400).json({ success: false, message: err.message }) }
};
