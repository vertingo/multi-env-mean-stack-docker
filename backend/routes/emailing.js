const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/email');




//post email 
router.post("/send",  EmailController.sendEmail);

//get email 
router.get("/",  EmailController.getEmail);







module.exports = router; 