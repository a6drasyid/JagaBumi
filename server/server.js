require("dotenv").config();

require("./config/database");

const express = require("express");
const cors = require("cors");

const http = require("http");
const socket = require("./socket");

const sensorRoutes = require("./routes/sensorRoutes");
const exportRoutes = require("./routes/exportRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");

const app = express();

const server = http.createServer(app);

// =====================================
// Middleware
// =====================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================================
// API ROUTES
// =====================================

app.use("/api/sensor", sensorRoutes);

app.use("/api/export", exportRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/statistics", statisticsRoutes);

// =====================================
// SOCKET.IO
// =====================================

socket.init(server);

// =====================================
// Route Root
// =====================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Sistem Peringatan Dini Longsor berjalan 🚀",
  });
});

// =====================================
// Route Test
// =====================================

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Railway OK",
  });
});

// =====================================
// START SERVER
// =====================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
