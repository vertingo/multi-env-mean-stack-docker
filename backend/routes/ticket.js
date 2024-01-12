const express = require('express');
const router = express.Router();
const StatistiqueController = require('../controllers/statistique');



//get statistique
router.get("/stats",  StatistiqueController.getStatistique);







module.exports = router; 