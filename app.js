const express = require('express');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
var app = express()

const db = require("./Database/database")
const userRoute = require('./routes/userRouter')
const ScreenRoute = require('./routes/ScreenRouter')
const AuthRoute = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

const port = 3000;

app.set('view engine', 'ejs')
app.set('views', './views')
app.set(express.static('public'))


app.use('/users', userRoute)
app.use('/screen', ScreenRoute)

app.use('/public', express.static('./public'))
app.use('/', AuthRoute);

app.listen(port, function() {
    console.log("Server is listening port " + port);

})