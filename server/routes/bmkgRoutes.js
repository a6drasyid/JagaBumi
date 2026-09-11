const express = require("express");
const router = express.Router();

const {
  getWeather,
  getForecast,
} = require("../controllers/bmkgController");

// Cuaca saat ini
router.get("/", getWeather);

// Prakiraan 24 jam
router.get("/forecast", getForecast);

module.exports = router;