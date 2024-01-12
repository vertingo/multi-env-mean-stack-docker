const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact')
const authorize = require('../middleware/authorize');
const Role = require('../lib/role')


//ajout de contact 
router.post('/', contactController.addContact );

//get notification
router.get('/notification',  contactController.notificationContact );

//get contact not closed 
router.get('/open',  contactController.getnotclosedContact );

//get contact  closed 
router.get('/closed',  contactController.getclosedContact );

//response contact 
router.post('/response',  contactController.ResponseContact );

//close contact 
router.patch('/close',  contactController.CloseContact );






module.exports = router; 