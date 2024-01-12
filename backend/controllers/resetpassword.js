const { Ticket } = require('../models/ticket.model');
const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');




//get user by id
exports.resetPassword = async (req, res, next) => {

   
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({success: false, message: 'utilisateur non trouvé avec cette adresse email' });
            }
            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.secret_key, { expiresIn: '20m' })
            

            var mailOptions = {
                to: req.body.email,
                from: 'fatboar.burgers@gmail.com',
                subject: 'Activation de compte',
                html: `<h2>Cliquez sur ce lien pour renisialiser votre mot de passe</h2>
                       <p>http://localhost:4000/api/auth/resetpassword/${token}</p> `
            };
           
        })
        .catch(error => res.status(500).json({ error }));

};






 // bcrypt.compare(req.body.password, user.password)
            //     .then(valid => {
            //         if (!valid) { return res.status(401).json({success: false, message: 'mot de passe incorrect' }); }
            //         const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, config.secret_key, { expiresIn: '10 h' })
            //         res.status(200).json(
            //             { success: true, token, expireIn: `${new Date().getTime() + 120000}` })
            //     })
            //     .catch(error => res.status(500).json({ error }))