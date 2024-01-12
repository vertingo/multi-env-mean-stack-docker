const { Ticket } = require('../models/ticket.model');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const Role = require('../lib/role')



//get user by id
exports.getUserById = async (req, res, next) => {

  User.findById(req.params.id, { password: 0, resetLink: 0, __v: 0 })
    .then((user) => { res.status(200).json(user) })
    .catch(() => { res.status(404).json({ success: false, message: `Utilisateur non trouvé` }) })
};


//delete user by id
exports.deleteUserById = async (req, res, next) => {

  User.deleteOne({_id: req.params.id})
    .then(() => { res.status(200).json({ success: true, message: `Utilisateur supprimé avec succès!` })})
    .catch( () => { res.status(400).json({ success: false, message: `Utilisateur non trouvé` }) });
};


//patch user by id
exports.patchUserById = async (req, res, next) => {

  if (req.body.email || req.body.password || req.body.phonenumber || req.body.adress) {

    User.findOne({ _id: req.params.id })
      .then(user => {


        if (req.body.email) {

          User.findOne({ email: req.body.email })
            .then((user_db) => {

              if (user_db) {

                if (user_db._id !== user._id) { res.status(200).json({ success: true, message: 'adresse mail exist' })}
              }
              else {
                user.email = req.body.email
              }
            })
            .catch((err) => res.status(300).json({ success: false, message: err.message }))
        }


        if (req.body.password && req.body.newpassword) {

          bcrypt.compare(req.body.password, user.password)
            .then(valid => {

              if (!valid) { return res.status(401).json({ success: false, message: 'mot de passe incorrect' }); }

              bcrypt.hash(req.body.newpassword, 12)
                .then(hash => {
                  user.password = hash
                })
                .catch(() => res.status(400).json({ success: false, message: 'erreur dans le password' }));
            })
            .catch(error => res.status(500).json({ error }))
        }

        if (req.body.adress) {
          if (typeof req.body.adress === "string") {
            user.adress = req.body.adress
          } else {
            res.status(400).json({ success: false, message: 'erreur dans le adresse' })
          }
        }

        if (req.body.phonenumber) {
          user.phonenumber = req.body.phonenumber
        }

        user.save()
          .then(() => { res.status(200).json({ success: true, message: ' changé avec success' }) })
          .catch((err) => res.status(500).json({ success: false, message: err.message }))
      })

      .catch(() => res.status(404).json({ success: false, message: 'utilisateur non trouvé' }));

    // else {
    //   res.status(400).json({ success: false, message: 'mot de passe introuvable' });
    // }

  } else {
    res.status(400).json({ success: false, message: 'Aucun attribut envoyé' });
  }
};




//get all users
exports.getAllUsers = async (req, res, next) => {

  var page = parseInt(req.query.page) || 1;
  var limit = parseInt(req.query.limit) || 10;
  console.log(req.query)
  if (req.query) {
    var query = {role : Role.Client}
    if (req.query.lastname) { query.lastname = { $regex: req.query.lastname } }
    if (req.query.firstname) { query.firstname = { $regex: req.query.firstname } }
    if (req.query.adress) { query.adress = { $regex: req.query.adress } }
    if (req.query.email) { query.email = req.query.email }
    if (req.query.startregister && req.query.endregister) { query.register_date = { "$gte": req.query.startregister, "$lt": req.query.endregister } }
  }

  await User.find(query, { password: 0, resetLink: 0, __v: 0 })
    .sort({ register_date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json(err);
      }
      User.countDocuments(query).exec((count_error, count) => {
        if (err) {
          return res.status(404).json(count_error);
        }
        return res.status(200).json({
          success: true,
          page: page,
          page_size: doc.length,
          total: count,
          users: doc
        });
      });
    });
};






