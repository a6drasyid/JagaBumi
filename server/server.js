require("dotenv").config();

require("./config/database");

const express = require("express");
const cors = require("cors");

const http = require("http");
const socket = require("./socket");

const sensorRoutes = require("./routes/sensorRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/sensor", sensorRoutes);
app.use("/api/export", exportRoutes);

socket.init(server);

// Route sederhana untuk pengecekan
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Sistem Peringatan Dini Longsor berjalan 🚀",
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
