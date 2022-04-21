const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    pName:{
        type:String,
        minlength:1,
        maxlength:50,
        required:true
    },
    pDesc:{
        type:String,
        minlength:1,
        maxlength:200,
        required:true
    },
    pPrice:{
        type:Number,
        min:1,
        max:1000000,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('products',productSchema)