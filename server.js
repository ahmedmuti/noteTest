const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const port = 3000
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
var store = new MongoDBStore({
    uri: 'mongodb+srv://ahmedmuti:ahmedmuti@route.3dpk6.mongodb.net/test',
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(require('./routes/signup.routes'))
app.use(require('./routes/signin.routes'))
app.use(require('./routes/home.routes'))


mongoose.connect('mongodb+srv://ahmedmuti:ahmedmuti@route.3dpk6.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(port, () => console.log(`Example app listening on port port!`))