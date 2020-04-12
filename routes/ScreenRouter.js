var express = require('express')
var router = express.Router();
var db = require('./../Database/database')
var DataGame_1 = db.get('Game').find({ id: 1 }).value();
var DataGame_2 = db.get('Game').find({ id: 2 }).value();

router.get('/MarketScreen', function(request, response) {
    response.render('Screen/MarketScreen', {
        data: DataGame_1.GameData
    });
})
router.get('/UFOScreen', function(request, response) {
    response.render('Screen/UFOScreen', {});
})

module.exports = router;