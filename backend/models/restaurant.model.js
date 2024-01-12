const mongoose = require('mongoose');


const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        index: {
            type: Number,
        },
        adress: {
            type: String,
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
    }
);

exports.RestaurantSchema = RestaurantSchema;

Restaurant = mongoose.model('Restaurant', RestaurantSchema );
 exports.Restaurant = Restaurant;