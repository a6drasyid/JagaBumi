const express = require("express");
const router = express.Router();

const sensorController = require("../controllers/sensorController");

// GET data sensor terbaru
router.get("/latest", sensorController.getLatest);

// GET riwayat sensor
router.get("/history", sensorController.getHistory);

router.get("/timeline", sensorController.getTimeline);

// POST data sensor dari ESP32
router.post("/", sensorController.create);

module.exports = router;
