const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: "./config.env"});
let mongo = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(mongo,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log(`Database Connected successful @ ` + mongo)
})
.catch(err => {
    console.log(`Error! ${err}`)
})

module.exports = mongoose;