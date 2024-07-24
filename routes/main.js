const express = require("express");
const jwt = require("jsonwebtoken");
const asynchandler = require('express-async-handler');
const router = express.Router();

const issign = async function (req, res, next) {
  if (req.cookies["token"]) {
    const data = jwt.verify(req.cookies["token"], "alpha");
    req.user = data.data;
    next();
  } else {
    res.send("Sign in first");
  }
};

router.get("/", issign, asynchandler(async (req, res) => {
  const apiKey = "e629b5feef9e96dd3c77a70b71b69f3b"; // Replace with your OpenWeatherMap API key
  const city = req.user.region;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const dataraw = await fetch(apiUrl);
  const data = await dataraw.json()

  res.json({
    username: req.user.username,
    phoneNumber: req.user.phoneNumber,
    region: req.user.region,
    weather : {
        name : data.name, 
        temp : data.main.temp,
        humidity : data.main.humidity,
        windspeed: data.wind.speed
    }
  });
}));

module.exports = router;
