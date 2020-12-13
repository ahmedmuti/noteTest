const app = require('express').Router()
const signinController = require('../controller/signin.controller')
app.get('/signin', signinController.sginin)
app.post('/handleSignin', signinController.handleSginin);


module.exports = app