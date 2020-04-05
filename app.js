const express = require('express')

const db = require("./Database/database")
const userRoute = require('./routes/userRouter')
const ScreenRoute = require('./routes/ScreenRouter')

const app = express();

const port = 8080;
const nameApp = "Math Learning"

app.set('view engine', 'ejs')
app.set('views', './views')
app.set(express.static('public'))


app.use('/users', userRoute)
app.use('/screen', ScreenRoute)

app.use('/public', express.static('./public'))

app.get('/', function(request, response) {
    response.render('Home');
})

app.listen(port, function() {
    console.log("Server is listening port " + port);

})