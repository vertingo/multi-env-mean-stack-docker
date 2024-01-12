const express = require('express');
const router = express.Router();
const tirageController = require('../controllers/tirage')
const authorize = require('../middleware/authorize');
const Role = require('../lib/role')



//tirage au sort 
router.get('/', authorize(Role.Admin), tirageController.getTirage );

//date du tirage au sort 
router.post('/date', authorize(Role.Admin), tirageController.postDateTirage );

//gagnant du tirage au sort 
router.get('/winner',  authorize(Role.Admin), tirageController.getWinnerTirage);




module.exports = router; 