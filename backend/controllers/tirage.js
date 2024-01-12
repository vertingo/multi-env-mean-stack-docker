
const { Tirage } = require('../models/tirage.model');
const { User } = require('../models/user.model');
const moment = require('moment');
moment().format();



// date de tirage au sort
exports.postDateTirage = async (req, res, next) => {

    const tirage = new Tirage({
        tirage_date: req.body.date,
    });

    const valid_date = moment(req.body.date, moment.ISO_8601, true).isValid();

    if (req.body.date) {
        if (valid_date === true) {
            exist_tirage = await Tirage.countDocuments();
            if (exist_tirage === 0) {
                tirage.save().then(
                    () => {
                        res.status(201).json({
                            success: true,
                            date: req.body.date,
                            message: `Date enregistré avec succès`
                        });
                    }
                ).catch((err) => { res.status(500).json({ success: false, message: err.message }) });
            } else {
                res.status(400).json({ success: false, message: `La date est déjà  définie` });
            }

        } else {
            res.status(400).json({ success: false, message: `Date invalide` });
        }
    }
    else {
        res.status(400).json({ success: false, message: `Date introuvable` });
    }

};


//tirage au sort 
exports.getTirage = async (req, res, next) => {

    db_tirage = await Tirage.findOne()
    date_now = new Date();

    if (db_tirage !== null) {

        if (db_tirage.isExecuted === false) {

            if (db_tirage.tirage_date && date_now.getFullYear() === new Date(db_tirage.tirage_date).getFullYear()
                && date_now.getMonth() === new Date(db_tirage.tirage_date).getMonth()
                && date_now.getDate() === new Date(db_tirage.tirage_date).getDate()) {

                // exec tirage au sort
                User.countDocuments({ isActive: true }).exec(function (err, count) {
                    if (count !== 0) {
                        var random = Math.floor(Math.random() * count);

                        User.findOne().skip(random).exec(
                            function (err, result) {

                                db_tirage.nb_users = count;
                                db_tirage.random_user = random;
                                db_tirage.isExecuted = true;
                                db_tirage.executed_date = new Date();
                                db_tirage.winner = result;

                                db_tirage.save().then(
                                    () => {
                                        res.status(200).json({
                                            success: true,
                                            db_tirage
                                        });
                                    }
                                ).catch(
                                    (error) => {
                                        res.status(400).json({
                                            error
                                        });
                                    }
                                );
                            });
                    } else {
                        res.json({
                            success: false,
                            count: "users not exists",

                        })
                    }
                })

            } else {
                res.json({
                    success: false,
                    message: 'La date choisi ne correspond pas a la date du tirage au sort',
                })
            }

        } else {
            res.json({
                success: false,
                message: "Le tirage a été déja effectué",
            })
        }
    }
    else {
        res.json({
            success: false,
            message: "La date n'est pas encore choisi",
        })
    }
};




//get winner of tirage
exports.getWinnerTirage = async (req, res, next) => {

    count_tirage = await Tirage.countDocuments();
    tirage = await Tirage.findOne();

    if (count_tirage === 0) {

        res.status(404).json({
            success: false,
            message: `le tirage au sort n'est pas encore effectué`
        });
    }
    else {
        res.status(200).json(tirage);
    }
};