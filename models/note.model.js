const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
    title: String,
    desc: String,
    userID: { type: mongoose.Schema.Types.ObjectId }
})

module.exports = mongoose.model('note', noteSchema)