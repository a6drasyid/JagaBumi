require("dotenv").config();
require("./config/database");

const express = require("express");
const cors = require("cors");
const http = require("http");

const socket = require("./socket");

// ===============================
// ROUTES
// ===============================
const sensorRoutes = require("./routes/sensorRoutes");
const exportRoutes = require("./routes/exportRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const bmkgRoutes = require("./routes/bmkgRoutes"); // ✅ BMKG

const app = express();
const server = http.createServer(app);

// ===============================
// CORS
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://jagabumi.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Mengizinkan Postman / ESP32 / request tanpa origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin tidak diizinkan oleh CORS."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ===============================
// API ROUTES
// ===============================
app.use("/api/sensor", sensorRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/statistics", statisticsRoutes);

// 🌦️ BMKG
app.use("/api/bmkg", bmkgRoutes);

// ===============================
// SOCKET.IO
// ===============================
socket.init(server);

// ===============================
// ROOT
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "JagaBumi Backend",
    version: "1.1.0",
    message: "Backend Sistem Peringatan Dini Longsor berjalan 🚀",
  });
});

// ===============================
// HEALTH CHECK (Railway)
// ===============================
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// TEST ROUTE
// ===============================
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Railway OK",
  });
});

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan.",
  });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server.",
  });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log(`📡 API Sensor      : /api/sensor`);
  console.log(`📊 API Statistics  : /api/statistics`);
  console.log(`🌦️ API BMKG        : /api/bmkg`);
});