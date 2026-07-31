const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  dateStrings: true,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
    return;
  }

  console.log("✅ Database Connected");

  connection.release();
});

module.exports = pool;
