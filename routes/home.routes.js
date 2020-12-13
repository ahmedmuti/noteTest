const app = require('express').Router()
const auth = require('../auth/auth')



const noteModel = require('../models/note.model')
app.get('/home', auth, async(req, res) => {

    const note = await noteModel.find({ userID: req.session.userID })

    // res.json(note)
    res.render('index.ejs', { name: req.session.name, isLoggedIn: req.session.isLoggedIn, note })
});


app.post('/addNote', async(req, res) => {
    console.log(req.body);
    const { title, desc } = req.body
    await noteModel.insertMany({ title, desc, userID: req.session.userID })
    res.redirect('/home')
});


app.post('/handleDelete', async(req, res) => {
    console.log(req.body.delete);
    await noteModel.findByIdAndDelete({ _id: req.body.delete })
    res.redirect('/home')
});


app.post('/editNote', async(req, res) => {
    console.log(req.body);
    await noteModel.findByIdAndUpdate({ _id: req.body._id }, { title: req.body.title, desc: req.body.desc })
    res.redirect('/home')
});














app.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        res.redirect('/signin')
    })
});
module.exports = app