const app = require('express').Router()
const { check, validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
app.get('/', (req, res) => {
    // res.render('signup.ejs', { errors: [], isLoggedIn: false, oldInputs: { fname: '', lname: '', email: '', password: '', rePassword: '' } })
    res.render('signin.ejs', { isLoggedIn: false, isTrue: true, isEmail })

})

app.post('/handleSignUp',
    check('fname').matches(/[A-Z][a-z]*/),
    check('lname').matches(/[A-Z][a-z]*/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    check('rePassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false
        }
        return true;
    }),

    async(req, res) => {

        const { fname, lname, email, password, rePassword } = req.body

        const errors = validationResult(req)
        console.log(errors.array());
        if (errors.isEmpty()) {
            const user = await userModel.findOne({ email })

            if (user == null) {
                bcrypt.hash(password, 7, async(err, hash) => {
                    console.log(hash);
                    await userModel.insertMany({ fname, lname, email, password: hash })
                    res.redirect('/')
                });

            } else {
                res.render('signup.ejs', { isLoggedIn: false, errors: [{ param: 'exists' }], oldInputs: { fname, lname, email, password, rePassword } })


            }
            console.log(user);
        } else {
            res.render('signup.ejs', { isLoggedIn: false, errors: errors.array(), oldInputs: { fname, lname, email, password, rePassword } })

        }
    });


module.exports = app