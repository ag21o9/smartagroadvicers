const express = require('express');
const cookies = require('cookie-parser');
const connectdb = require('./dbconnect/dbconnect.js');
const dotenv = require('dotenv').config();
const app = express();

// Connecting with the USer Database of Agrisure
connectdb();
const port = process.env.PORT||3000;


app.use(cookies());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',require('./routes/main.js'));
app.use('/',require('./routes/admin.js'));

app.use(express.static('public'));

app.set('view engine','ejs');


app.use((err,req,res,next)=>{
    res.send(err)
});

app.listen(port,()=>{
    console.log("app listening on port " + port);
})