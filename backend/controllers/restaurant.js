const { Restaurant } = require('../models/restaurant.model');

//get all users
exports.getAllRestaurants = async (req, res, next) => {

  Restaurant.find({}).then((data) => { res.status(200).json(data) })
                     .catch(() => { res.status(500).json({ success: false, message: 'Erreur dans le serveur' }) })
};



//post user 
exports.postAllRestaurants = async (req, res, next) => {
  const ticket = new Restaurant({
    index: req.body.index,
    name: req.body.name,
    adress: req.body.adress,
    longitude: req.body.longitude,
    latitude: req.body.latitude
  });
  ticket.save().then( () => { res.status(201).json({ success: true, message: 'Restaurant ajouté avec succès!'})})
               .catch( (error) => { res.status(400).send( error )});
};

