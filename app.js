const express = require('express')
const app = express();

const port = 8080;
const nameApp = "Math Learning"

app.set('view engine', 'pug')
app.set('views', './views')
app.set(express.static('public'))

app.get('/', function(request, response) {
    response.render('index');
})

app.listen(port, function() {
    console.log("Server is listening port " + port);

})