const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController.js');
const auth = require('../middlewares/auth.js');


router.get('/getAllPlayers/:userID', playerController.getAllPlayers);

router.get('/buyPlayer', playerController.buyPlayer);

router.get('/getMoney/:userId', playerController.getMoney);

router.post('/saveFormation', playerController.saveFormation);
router.post('/loadFormation', playerController.loadFormation);
router.get('/getPlayerById/:playerId', playerController.getPlayerById);


module.exports = router;
