const db = require("../config/database");

exports.getStatistics = (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS totalData,
      MIN(created_at) AS firstData,
      MAX(created_at) AS lastData
    FROM sensor_data
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil statistik.",
      });
    }

    const stats = result[0];

    let monitoringDays = 0;

    if (stats.firstData) {
      const start = new Date(stats.firstData);
      const now = new Date();

      monitoringDays = Math.max(
        1,
        Math.ceil((now - start) / (1000 * 60 * 60 * 24))
      );
    }

    res.json({
      success: true,
      data: {
        totalData: stats.totalData,
        accuracy: 99,
        monitoringDays,
        activeSensors: 3,
      },
    });
  });
};