const express = require("express");
const router = express.Router();

const { getWeather } = require("../controllers/bmkgController");

// GET /api/bmkg
router.get("/", getWeather);

module.exports = router;