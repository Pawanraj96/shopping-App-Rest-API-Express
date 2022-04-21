// mongoose connection is written here
const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL        // importing url from .env
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log('DB connection successfull');
    }else{
        console.log('DB connection failed');
    }
})