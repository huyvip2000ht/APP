var express = require('express')
var router = express.Router();
var db = require('./../Database/database')

var lesson = [
    { id: "1", question: [1, 2, 8, 5, 6], product: "cream" },
    { id: "2", question: [1, 2, 8, 5, 6], product: "cream" },
    { id: "3", question: [1, 2, 8, 5, 6], product: "cream" },
]

router.get('/MarketScreen', function(request, response) {
    response.render('Screen/MarketScreen', {
        questions: { id: "1", question: [1, 2, 8, 5, 6], product: "Ice-Cream" }
    });
})
router.get('/UFOScreen', function(request, response) {
    response.render('Screen/UFOScreen');
})

module.exports = router;