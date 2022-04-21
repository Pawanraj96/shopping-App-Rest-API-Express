// This is authorizing the role for user and admin

// In router we need to authenticate
const jwt = require('jsonwebtoken')
//authorize user and admin
const authorizeUserAndAdmin = (req, res, next) => {
    console.log(req.headers.authorization);                        // In headers only we will get token from front end while requesting.
    if (req.headers['authorization']) {                              // only if user or admin we are verifying the token
        const token = req.headers['authorization'].split(' ')[1]   // token will come in string we need to split and take only second value i.e;token first value is bearer.
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        console.log(payload);
        //checking the role 
        if (payload.role === 'user' || payload.role === 'admin') {
            next()
        } else {
            res.status(401).json({
                error: true,
                message: "Authorization failed",
                data: null
            })
        }
    } else {
        res.status(401).json({
            error: true,
            message: "Not authorized",
            data: null
        })
    }

}

//authorize only admin
const authorizeAdmin = (req, res, next) => {
    console.log(req.headers.authorization);
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        if (payload.role === "admin") {
            next()
        } else {
            res.status(401).json({
                error: true,
                message: "Authorization failed",
                data: null
            })
        }
    } else {
        res.status(401).json({
            error: true,
            message: "Not authorized",
            data: null
        })
    }
}

module.exports = {
    authorizeUserAndAdmin, authorizeAdmin
}