/* npm init -y npm i express  npm i dotenv npm i mongoose npm i bcrypt npm i corse npm i jsonwebtoken --save*/
/* npm i jest supertest  --save-dev */
const express = require('express')
const cors = require('cors')
const app = express()   // after app use cors middleware
//corse middleware
app.use(cors())
//Dotenv is the library for getting the data from .env file
require('dotenv').config()              // import like this from .env
require('./config/db.js')
const userRoute = require('./routes/user.js') 
const productRoute = require('./routes/products.js')  
const bcrypt = require('bcrypt')

//JSON middleware (Built-In middleware)     
app.use(express.json())     

//builtin body parser middleware
app.use(express.urlencoded({extended:true}))

//Router middleware
app.use('/user',userRoute)          //user
app.use('/products',productRoute)   //products

//sending response in json object
app.get('/test',(req,res,next)=>{
    res.json({
        message:'Test is working',          // if you want response as JSON means use JSON middleware
        data:null                           // we can pass any data also
    })
})

//Error handling middleware (to handle error)
app.use((err,req,res,next)=>{
    res.status(500).json({
        error:true,
        message:err.message,
        data:null
    })
})

module.exports = app