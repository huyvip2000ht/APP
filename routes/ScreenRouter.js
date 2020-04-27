var express = require('express');
var router = express.Router();
var gameModel = require('./../model/GameModel');


router.get('/MarketScreen', gameModel.getMark);
router.get('/UFOScreen', gameModel.getUFO);
router.get('/win', gameModel.win);
module.exports = router;