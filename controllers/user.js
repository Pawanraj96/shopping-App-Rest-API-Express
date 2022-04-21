// All bussiness logic are written here
const user = require('../models/user.js')               //here user is a collection name
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//register
const userRegistration = async (req, res, next) => {
    // console.log(req.body);
    const { fname, lname, email, password, role } = req.body
    //checking whether email is already present or not.
    try {
        const emailExist = await user.findOne({ email: email })
        if (emailExist) {
            res.json({
                error: true,
                message: "Email Already exists",
                data: null
            })
        } else {
            //encrypting the password
            const saltRounds = 10
            //salting
            const salt = await bcrypt.genSalt(saltRounds)
            console.log(salt);
            //hasing
            const hashedPassword = await bcrypt.hash(password, salt)     // hash takes two parameter one first password is which password we need to encrypt and second is salt
            console.log(hashedPassword);
            await user.insertMany({
                fname,
                lname,
                email,
                password: hashedPassword, //here we need to pass like this
                role
            })
            res.status(200).json({                      // sending response as json object
                error: false,
                message: 'Registration successful',
                data: {
                    fname,
                    lname,
                    email,
                    password: hashedPassword,
                    role
                }
            })
        }
    } catch (err) {
        next(err)        // error function is present in index.js
    }

}
//login
const userLogin = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body
    try {
        const userData = await user.findOne({ email })  // checking whether email is present or not
        console.log(userData);
        if (userData) {
            const { fname, lname, email, role } = userData       // we want only fname,lname,email,role so we are destructuring only that one.
            // bycrypt compare
            const isPasswordMatched = await bcrypt.compare(password, userData.password)
            console.log(isPasswordMatched);
            if (isPasswordMatched) {     // from userdata we are checking the password
                //creating token when login successul
                // let a="azeem"
                const payload = { fname, email, role }
                // const payload = a

                const token = jwt.sign(payload, process.env.SECRET_KEY, )   //{ expiresIn: '24h' } we can pass as third parameter.   // this line we are creating token4
                res.status(200).json({
                    error: false,
                    message: 'Login succussfull',
                    data: {
                        fname,
                        lname,
                        email,
                        role,
                        token
                    }
                })
            } else {
                res.status(403).json({
                    error: true,
                    message: 'Invalid password',
                    data: null
                })
            }
        } else {
            res.status(401).json({
                error: true,
                message: 'Email not exists',
                data: null
            })
        }
    } catch (err) {
        next(err)
    }
}


module.exports = { userRegistration, userLogin }