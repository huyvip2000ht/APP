//to do
var express = require('express')
var router = express.Router();
const authModel = require('./../model/authModel')
router.get('/', authModel.home);
router.get('/create', authModel.CreateGet)
router.get('/login', authModel.loginGet)
router.post('/login', authModel.loginPost)
router.post('/create', authModel.createPost);
router.post('/', authModel.logout)

module.exports = router;