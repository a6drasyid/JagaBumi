const db = require("../config/database");

const Sensor = {
  // =====================================
  // DATA TERBARU
  // =====================================
  getLatest(date, callback) {
    const sql = `
    SELECT
      rain_tip,
      rain,
      rain_fuzzy,
      soil,
      soil_fuzzy,
      tilt,
      tilt_fuzzy,
      fuzzy_value,
      status,
      created_at
    FROM sensor_data
    WHERE DATE(created_at) = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

    db.query(sql, [date], callback);
  },

  // =====================================
  // RIWAYAT DATA
  // =====================================
  getHistory(range, callback) {
    let sql = "";

    switch (range) {
      // =====================================
      // 1 JAM (RAW DATA)
      // =====================================
      case "1h":
        sql = `
          SELECT
    created_at,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status
          FROM sensor_data
          WHERE created_at >= NOW() - INTERVAL 1 HOUR
          ORDER BY created_at ASC
        `;
        break;

      case "1d":
        sql = `
    SELECT
    created_at,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status
    FROM sensor_data
    WHERE created_at >= NOW() - INTERVAL 1 DAY
    ORDER BY created_at ASC
  `;
        break;

      // =====================================
      // DEFAULT
      // =====================================
      default:
        sql = `
          SELECT
    created_at,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status
          FROM sensor_data
          WHERE created_at >= NOW() - INTERVAL 1 HOUR
          ORDER BY created_at ASC
        `;
    }

    db.query(sql, callback);
  },

  getHistoryByDate(start, end, callback) {
    const sql = `
    SELECT
    created_at,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status
    FROM sensor_data
    WHERE DATE(created_at) BETWEEN ? AND ?
    ORDER BY created_at ASC
  `;

    db.query(sql, [start, end], callback);
  },
  // =====================================
  // TIMELINE STATUS
  // =====================================
  getTimeline(callback) {
    const sql = `
   SELECT
    id,
    created_at,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status
FROM sensor_data
ORDER BY created_at DESC
LIMIT 20
  `;

    db.query(sql, callback);
  },

  // =====================================
  // TIMELINE BERDASARKAN TANGGAL
  // =====================================
  getTimelineByDate(start, end, callback) {
    const sql = `
    SELECT
      id,
      created_at,
      rain,
      rain_fuzzy,
      soil,
      soil_fuzzy,
      tilt,
      tilt_fuzzy,
      fuzzy_value,
      status
    FROM sensor_data
    WHERE DATE(created_at) BETWEEN ? AND ?
    ORDER BY created_at DESC
  `;

    db.query(sql, [start, end], callback);
  },

  // =====================================
  // STATUS TERAKHIR
  // =====================================
  getLastStatus(callback) {
    const sql = `
      SELECT status
      FROM sensor_data
      ORDER BY created_at DESC
      LIMIT 1
    `;

    db.query(sql, callback);
  },

  // =====================================
  // STATUS TERAKHIR (PROMISE)
  // =====================================
  getLastStatusAsync() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT status
        FROM sensor_data
        ORDER BY created_at DESC
        LIMIT 1
      `;

      db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  },

  // =====================================
  // SIMPAN DATA SENSOR
  // =====================================
  create(data, callback) {
    const sql = `
      INSERT INTO sensor_data
(
    rain_tip,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status,
    created_at
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.rain_tip,

        data.rain,
        data.rain_fuzzy,

        data.soil,
        data.soil_fuzzy,

        data.tilt,
        data.tilt_fuzzy,

        data.fuzzy_value,
        data.status,

        data.created_at,
      ],
      callback
    );
  },

  // =====================================
  // SIMPAN DATA SENSOR (PROMISE)
  // =====================================
  createAsync(data) {
    return new Promise((resolve, reject) => {
      const sql = `
      INSERT INTO sensor_data
(
    rain_tip,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status,
    created_at
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      db.query(
        sql,
        [
          data.rain_tip,

          data.rain,
          data.rain_fuzzy,

          data.soil,
          data.soil_fuzzy,

          data.tilt,
          data.tilt_fuzzy,

          data.fuzzy_value,
          data.status,

          data.created_at,
        ],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        }
      );
    });
  },

  // =====================================
  // EXPORT DATA
  // =====================================
  getExportData(start, end, callback) {
    let sql = `
    SELECT
    created_at,
    rain,
    rain_fuzzy,
    soil,
    soil_fuzzy,
    tilt,
    tilt_fuzzy,
    fuzzy_value,
    status
FROM sensor_data
  `;

    const params = [];

    if (start && end) {
      sql += `
      WHERE DATE(created_at) BETWEEN ? AND ?
    `;

      params.push(start, end);
    }

    sql += `
    ORDER BY created_at ASC
  `;

    db.query(sql, params, callback);
  },
};

module.exports = Sensor;
