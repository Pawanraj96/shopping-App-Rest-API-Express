const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true
    },
    lname:{
        type:String,
        minlength:0,
        maxlength:10,
        required:true
    },
    email:{
        type:String,
        minlength:7,
        maxlength:20,
        required:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:200,
        required:true
    },
    role:{
        type:String,
        minlength:3,
        maxlength:10,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user',userSchema)