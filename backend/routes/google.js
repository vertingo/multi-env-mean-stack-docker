const express = require('express');
const router = express.Router();
const { Email } = require('../models/email.model');
const { User } = require('../models/user.model');
const nodemailer = require('nodemailer');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

router.use(passport.initialize());
// router.use(passport.session());


passport.serializeUser(function (user, done) {
  done(null, user);
});


passport.deserializeUser(function (user, done) {
  done(null, user);
});


// passport.use(new GoogleStrategy({
//     clientID: "931209872114-5glro42kjofspf239h7n7tq21f6ntgqq.apps.googleusercontent.com",
//     clientSecret: "sBiZm-fvgtCVVF3db7naVEwn",
//     callbackURL: "http://localhost:4000/api/auth/google/callback"
//   },

//      async  (accessToken, refreshToken, profile, done) => {


//       console.log(profile.emails[0].value)

//        return done(null, profile);

//  var email = profile.emails[0].value
// const user =  await User.findOne({email: email})


// if (user) {
//   console.log(user)
//   user.username = accessToken;


//   user.save().then(()=>{
//     return done(null, user);
//   })
// }else{

// console.log('creation of user')
// make a new record
// let user = await new User({
//   googleId: profile.id,
//   email: profile.emails[0].value,
//   accessToken : accessToken,
//   refreshToken : refreshToken
// }).save()
// done(null, user);
// }





// console.log('acces token ',accessToken);
// console.log('refresh token ',refreshToken);
//  console.log('prfile ',profile.emails[0].value);
// console.log('done ',done);


//   }
// ));










passport.use(new GoogleStrategy({
  clientID: "931209872114-5glro42kjofspf239h7n7tq21f6ntgqq.apps.googleusercontent.com",
  clientSecret: "sBiZm-fvgtCVVF3db7naVEwn",
  callbackURL: "http://localhost:4000/api/auth/google/callback"
},
  function (request, accessToken, refreshToken, profile, done) {

    
    User.findOne({ email: profile.emails[0].value })
      .then(
        (user) => {
          if (user) {
            //if we already have a record with the given profile ID
            done(null, user);
            console.log('profile', user)
            
          } else {
            //if not, create a new user 
            // new User({
            //   googleId: profile.id,
            // }).save().then((newUser) => {
            //   done(null, newUser)
            // }
            // )
            console.log('done')
            done(null, newUser)
          }
        }
      )
      .catch()
    // User.findOne({ email: profile.emails[0].value }, function(err, user) {
    //   if(err) {
    //     console.log(err);  // handle errors!
    //   }
    //   if (!err && user !== null) {
    //     console.log(user)
    //     done(null, user);
    //   } else {
    //     console.log('fqsdffqef')
    // user = new User({
    //   oauthID: profile.id,
    //   name: profile.displayName,
    //   created: Date.now()
    // });
    // user.save(function(err) {
    //   if(err) {
    //     console.log(err);  // handle errors!
    //   } else {
    //     console.log("saving user ...");
    //     done(null, user);
    //   }
    // });
    //   }
    // });
  }
));





router.get('/', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

// router.get('/callback', passport.authenticate('google') )



router.get('/callback',  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // res.redirect('/good')
    // console.log("success");
    // // Successful authentication, redirect home.
     res.status(200).json('ds');
  });


//failed auth google 
router.get('/failed', async (req, res) => { res.status(404).send('erreur authentification') })



//get all users
router.get('/good', async (req, res) => {

  res.status(200).send('welcome mr ');
})







module.exports = router; 