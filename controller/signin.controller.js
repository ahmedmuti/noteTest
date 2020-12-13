const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
module.exports.handleSginin = async(req, res) => {

    console.log(req.body);
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user != null) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // res.setHeader('set-cookie', 'ID=' + user._id)
            req.session.userID = user._id
            req.session.name = user.fname
            req.session.isLoggedIn = true
            var hour = 36000000 * 50
            req.session.cookie.maxAge = hour
            res.redirect('/home')
        } else {
            res.render('signin.ejs', { isTrue: false, isEmail: true, isLoggedIn: false })
        }
    } else {
        // res.render('signin.ejs', { isTrue: true, isEmail: false, isLoggedIn: false })
        // req.flash('isEmail', 'false')
        // req.session.isEmail=false
        // req.flash('isEmail', 'false')
        req.flash('myKey', 'amira')
        res.redirect('/signin')

    }


}


module.exports.sginin = (req, res) => {
    var isEmail
    if (req.flash('myKey')[0] == 'amira') {
        isEmail = false
    } else {
        isEmail = true

    }
    res.render('signin.ejs', { isLoggedIn: false, isTrue: true, isEmail })
}