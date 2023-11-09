const express = require('express');
const router = express.Router();
const PlayController = require('../controllers/PlayController.js');

router.get('/getTeams/:league', PlayController.getTeams);
router.get('/getLeagues', PlayController.getLeagues);
router.post('/playSingle/:team/:userId', PlayController.playSingleMatch);
router.post('/playOnline',PlayController.playOnlineMatch);





module.exports = router;
