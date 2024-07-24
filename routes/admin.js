const express = require('express')
const userModel = require('../models/userModel');
const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const router = express.Router();

const issign = async function (req,res,next){
    if(req.cookies['token']){
        res.send('already signedin goto main');
    }
    else{
        next();
    }
}


router.post('/signup',issign,asynchandler(async (req,res)=>{

    const {username,password,phoneNumber,region} = req.body;
    const data = await userModel.findOne({username});
    if(data){
        res.send("Data already Exists");
    }
    else{
        const user = await userModel.create({
            username,
            password,
            phoneNumber,
            region
        });
        res.json(user);
    }
}))

router.post('/login',issign, asynchandler(async (req,res)=>{
    const {username, password} = req.body;
    const data = await userModel.findOne({username})

    if(data && data.password==password){
        const token = jwt.sign({
            data
        },"alpha");
        // res.send(token);
        res.cookie("token", token);
        res.send("Login Successfull");
    }
    else{
        res.send("Invalid Credentials");
    }
}))

router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.send("logout successfull");
})

module.exports = router;