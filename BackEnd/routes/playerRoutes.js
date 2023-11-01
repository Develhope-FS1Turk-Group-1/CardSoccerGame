const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController.js');

router.get('/getAllPlayers/:userID', playerController.getAllPlayers);

router.get('/buyPlayer', playerController.buyPlayer);

router.get('/getMoney/:userID', playerController.getMoney);

router.post('/saveFormation', playerController.saveFormation);

module.exports = router;
