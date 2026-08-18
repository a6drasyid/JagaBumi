const express = require("express");

const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

// =====================================
// KIRIM PENGADUAN
// =====================================

router.post("/", feedbackController.send);

module.exports = router;
