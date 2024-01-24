const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
// const config = require('./config/db.config');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/ticket');
const emailsRoutes = require('./routes/emailing');
const authGoogle = require('./routes/google');
const authFacebook = require('./routes/facebook');
const tirageRoutes = require('./routes/tirage');
const contactRoutes = require('./routes/contact');
const restaurantRoutes = require('./routes/restaurant');

const redis = require('./utils/redis');
const Logger = require('./logging')

//metrics
const makeApiMiddleware = require("api-express-exporter"); 
//const apiMetrics = require('prometheus-api-metrics');
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true, includePath: true});


const app = express();

Logger.error('hello world', 'Nan c est juste pour tester les logs')

app.use(metricsMiddleware);
//app.use(apiMetrics()); 


//metrics
app.use(makeApiMiddleware()); 

app.get("/api", (req, res) => {
    res.status(200).send("Api Works.");
  });

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 
//   }

//Définition des CORS Middleware 
app.use(function(req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Accept,Authorization,Origin"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });



// parse requests  body params
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//simple route
app.use('/api/users', userRoutes );
app.use('/api/employees', employeeRoutes );
app.use('/api/tickets', ticketRoutes );
app.use('/api/auth',  authRoutes );
app.use('/api/emails',  emailsRoutes );
app.use('/api/auth/google',  authGoogle );
app.use('/api/auth/facebook',  authFacebook );
app.use('/api/tirage',  tirageRoutes );
app.use('/api/contact',  contactRoutes );
app.use('/api/restaurants',  restaurantRoutes );

//connexion database
require('./lib/db');


//listen for requests 
const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Api listen on port ${PORT}.`);
});
