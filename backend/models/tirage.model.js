const mongoose = require('mongoose');
const { UserSchema } = require('./user.model');  

const TirageSchema = new mongoose.Schema(
    {
        nb_users: {
            type: Number,
        },
        random_user: {
            type: Number,
        },
        executed_date: {
            type: Date,
        },
        tirage_date: {
            type: Date,
        },
        isExecuted: {
            type: Boolean,
            default: false
        },
        winner:  UserSchema  
    }
);

exports.TirageSchema = TirageSchema;

Tirage = mongoose.model('Tirage', TirageSchema );
 exports.Tirage = Tirage;