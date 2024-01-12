const express = require('express');
const router = express.Router();
const { Email } = require('../models/email.model');
const { User } = require('../models/user.model');
const nodemailer = require('nodemailer');

const passport = require('passport');
const  FacebookStrategy  = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "858430034656858",
    clientSecret: "fa4dc01a464dcea3b51d4ff538b79490",
    callbackURL: "http://localhost:4000/api/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
   try{
    console.log('acces token ',accessToken);
    console.log('refresh token ',refreshToken);
    console.log('prfile ',profile);
    console.log('done ',done);
}  catch(error){
   console.log(error)
}
    
  }
));


router.get('/', passport.authenticate('facebook' ) );
router.get('/callback',  passport.authenticate('facebook',
 { successRedirect: '/profile',
  failureRedirect: '/'}
  ));


module.exports = router; 