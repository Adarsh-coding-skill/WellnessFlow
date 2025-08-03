const dontenv = require('dotenv');
const app = require('./app');
dontenv.config();



app.listen(process.env.PORT,() =>{
    console.log(`🚀 Server running at port ${process.env.PORT}`)
})