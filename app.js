const express = require('express')

const userRoute = require('./routes/userRouter')

const app = express();

const port = 8080;
const nameApp = "Math Learning"

app.set('view engine', 'pug')
app.set('views', './views')
app.set(express.static('public'))


app.use('/users', userRoute)

app.get('/', function(request, response) {
    response.render('Home');
})

app.listen(port, function() {
    console.log("Server is listening port " + port);

})