const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const Role = require('../lib/role')
const RestaurantController = require('../controllers/restaurant');




//get all restaurants
router.get("/",  RestaurantController.getAllRestaurants);

//post restaurants
router.post("/",  RestaurantController.postAllRestaurants);



module.exports = router; 