const http = require('http');
const dotenv = require('dotenv');
const app = require('./app')
require('./config/dbconnect')

const server = http.createServer(app);
dotenv.config({path: "./config/config.env"});

server.listen(process.env.PORT,
    ()=>console.log("Server started on port " + process.env.port));