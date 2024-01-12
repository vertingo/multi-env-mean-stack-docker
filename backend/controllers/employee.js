const { Ticket } = require('../models/ticket.model');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const Role = require('../lib/role')
var validator = require('validator');



// ajout employé
exports.postEmployee = async (req, res, next) => {

  try {

      // génère une exception
      if (!req.body.firstname) { throw new Error('Nom introuvable') }
      if (!req.body.lastname) { throw new Error('Prénom introuvable') }
      if (!req.body.password) { throw new Error('Mot de passe introuvable') }
      if (!req.body.email) { throw new Error('Adresse email introuvable') }
      if (!req.body.birthday) { throw new Error('Date de naissance introuvable') }
      if (!req.body.phonenumber) { throw new Error('Numéro de téléphone introuvable') }
      if (!validator.isEmail(req.body.email)) { throw new Error('Adresse email invalide') }
      if (isNaN(Date.parse(req.body.birthday)) || (Date.parse(req.body.birthday)) > 1073692800000) { throw new Error('Date de naissance invalide') }


      const user = await User.findOne({ email: req.body.email }, { email: 1 })

      if (user) {
          res.status(400).json({ success: false, message: 'Adresse email existe déja veuillez renseigner une autre adresse email' })
      } else {

          bcrypt.hash(req.body.password, 12)
              .then(hash => {
                  const user = new User({
                      firstname: req.body.firstname,
                      lastname: req.body.lastname,
                      email: req.body.email,
                      role: Role.Employee,
                      birthday: req.body.birthday,
                      phonenumber: req.body.phonenumber,
                      isActive: true,
                      password: hash
                  });

                  user.save()
                      .then(() => {
                          res.status(201).json({ success: true,  message: 'Employé ajouté avec succès'})
                      })
                      .catch((err) => res.status(500).json({ success: false,  message: 'Erreur dans le serveur' }))
              })
              .catch(() => res.status(400).json({ success: false, message: 'Erreur dans le mot de passe' }));
      }
  }
  catch (err) {
      res.status(500).json({ success: false, message: err.message })
  }

};







//get employee by id
exports.getEmployeeById = async (req, res) => {

    User.findById(req.params.id, {password:0, __v:0})
    .then( (employee) => {

    res.status(200).send(employee);
    })
    .catch(() => {
      res.status(404).send({
        success: false,
        message: 'user not found'
      }
      );
    })
};




//delete employee by id
exports.deleteEmployeeById = async (req, res) => {

const employee = await User.findByIdAndRemove(req.params.id);
  if (!employee) return res.status(404).json('employee not found');
  res.status(200).json('user deleted successfully!');
  
};




//patch user by id
exports.patchUserById = async (req, res, next) => {

    const user = await User.findById(req.params.id);
    const phonenumber = req.body.phonenumber;
    const password = req.body.password
    const adresse = req.body.adresse;
  
    if (phonenumber) { user.phonenumber = phonenumber }
    if (password) { user.password = password }
    if (adresse) { user.adresse = adresse }
  
    await user.save() // on sauvegarde les modifications
  
    res.json(user)
};




//get all employees
 exports.getAllEmployees = async (req, res, next) => {

    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 5;
  
    if (req.query) {
      var query = {role: Role.Employee}
      if (req.query.lastname) { query.lastname = { $regex: req.query.lastname } }
      if (req.query.firstname) { query.firstname = { $regex: req.query.firstname } }
      if (req.query.email) { query.email = { $regex: req.query.email } }
    }
  
    await User.find(query, {password:0, resetLink:0, __v:0})
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
            employees: doc
          });
        });
      });
 };






