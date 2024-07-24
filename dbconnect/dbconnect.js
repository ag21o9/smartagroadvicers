var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/agrisure';
const connectdb = async function(){
    const connection = await mongoose.connect(mongoDB);
    console.log("connection established with", connection.connection.name);
    console.log("connection established on", connection.connection.host);
} 
    
module.exports = connectdb;
