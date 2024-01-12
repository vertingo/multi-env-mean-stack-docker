const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth');

//inscription
router.post('/signup', userCtrl.signup);

//connection
router.post('/login', userCtrl.login);

router.put('/forgot-password', userCtrl.forgotPassword);

router.put('/reset-password', userCtrl.resetPassword);


module.exports = router;