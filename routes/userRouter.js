//to do
var express = require('express')
var router = express.Router();
var db = require('./../Database/database')

var DataGame_2 = db.get('user').value();
router.get('/create', function(request, response) {
    response.render('users/create', {

        question: {
            name: "nguyentiep",
            user: [{ pass: " 1234", acc: "Abc" }, { pass: "abc", acc: "123" }]
        }

    })
})

module.exports = router;