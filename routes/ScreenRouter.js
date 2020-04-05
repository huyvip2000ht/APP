var express = require('express')
var router = express.Router();

router.get('/MarketScreen', function(request, response) {
    response.render('Screen/MarketScreen');
})

module.exports = router;