const app = require('./app')
const port = process.env.PORT || 2000   // checking the condition whether port is present in .env or else take port as 2000.

app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})