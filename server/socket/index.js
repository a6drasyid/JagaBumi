let io;

function init(server) {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  console.log("✅ Socket.IO Ready");

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket belum diinisialisasi.");
  }

  return io;
}

module.exports = {
  init,
  getIO,
};
