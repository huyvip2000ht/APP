//to do
var express = require('express')
var router = express.Router();

router.get('/create', function(request, response) {
    response.render('users/create');
})

module.exports = router;