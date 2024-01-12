const mongoose = require('mongoose');
const  config  = require('../config/config.json');

//const db = config.url;

var db = 'mongodb://database_preprod:27017/mean-fatboar-db';
//var mongoURI = 'mongodb://localhost:27017/my-db';
// mongoose.set('useCreateIndex', true)
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log("Could not connect to the database.", err);
});


module.exports = mongoose.connection;