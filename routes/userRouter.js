//to do
var express = require('express')
var router = express.Router();
var db = require('./../Database/database')

var DataGame_2 = db.get('user').value();
router.get('/create', function(request, response) {
    console.log(DataGame_2.GameData[0]);
    response.render('users/create', {
        question: DataGame_2.GameData[0]
    });


})

module.exports = router;