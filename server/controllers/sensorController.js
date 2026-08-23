const Sensor = require("../models/sensorModel");
const socket = require("../socket");
const whatsappService = require("../services/whatsappService");

const sensorController = {};

// =========================================
// GET DATA TERBARU
// =========================================
sensorController.getLatest = (req, res) => {
  const { date } = req.query;

  Sensor.getLatest(date, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        rain_tip: 0,
        rain: 0,
        rain_fuzzy: null,
        soil: null,
        soil_fuzzy: null,
        tilt: null,
        tilt_fuzzy: null,
        fuzzy_value: null,
        status: null,
        created_at: null,
      });
    }

    return res.json(result[0]);
  });
};

// =========================================
// GET HISTORY
// =========================================

sensorController.getHistory = (req, res) => {
  const { range = "1h", start, end } = req.query;

  console.log("Range :", range);
  console.log("Start :", start);
  console.log("End :", end);

  // =========================================
  // CUSTOM DATE
  // =========================================

  if (start && end) {
    return Sensor.getHistoryByDate(start, end, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      return res.json(result);
    });
  }

  // =========================================
  // FILTER NORMAL
  // =========================================

  Sensor.getHistory(range, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json(result);
  });
};

// =========================================
// GET TIMELINE
// =========================================

sensorController.getTimeline = (req, res) => {
  const { start, end } = req.query;

  // =====================================
  // CUSTOM DATE
  // =====================================

  if (start && end) {
    return Sensor.getTimelineByDate(start, end, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      const timeline = result
        .reverse()
        .reduce((acc, item) => {
          const last = acc[acc.length - 1];

          if (!last || last.status !== item.status) {
            acc.push(item);
          }

          return acc;
        }, [])
        .reverse();

      return res.json(timeline);
    });
  }

  // =====================================
  // DEFAULT
  // =====================================

  Sensor.getTimeline((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const timeline = result
      .reverse()
      .reduce((acc, item) => {
        const last = acc[acc.length - 1];

        if (!last || last.status !== item.status) {
          acc.push(item);
        }

        return acc;
      }, [])
      .reverse();

    res.json(timeline);
  });
};

// =========================================
// CREATE DATA SENSOR
// =========================================

sensorController.create = async (req, res) => {
  try {
    const {
      rain_tip,

      rain,
      rain_fuzzy,

      soil,
      soil_fuzzy,

      tilt,
      tilt_fuzzy,

      fuzzy_value,
      status,

      created_at,
    } = req.body;

    // =============================
    // VALIDASI
    // =============================

    if (
      rain_tip === undefined ||
      rain === undefined ||
      !rain_fuzzy ||
      soil === undefined ||
      !soil_fuzzy ||
      tilt === undefined ||
      !tilt_fuzzy ||
      fuzzy_value === undefined ||
      !status ||
      !created_at
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua data sensor wajib diisi.",
      });
    }

    const validStatus = ["AMAN", "WASPADA", "BAHAYA"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status tidak valid.",
      });
    }

    // =============================
    // STATUS TERAKHIR DATABASE
    // =============================

    let previousStatus = null;

    const last = await Sensor.getLastStatusAsync();

    if (last.length > 0) {
      previousStatus = last[0].status;
    }

    // =============================
    // WHATSAPP
    // =============================

    if (previousStatus !== status) {
      await whatsappService.sendWhatsApp(
        process.env.FONNTE_TARGET,

        `🚨 *PERINGATAN DINI LONGSOR*
📍 *Lokasi Monitoring*
Pusuk Sembalun
Kabupaten Lombok Timur
Nusa Tenggara Barat
━━━━━━━━━━━━━━━━━━━━━━
⚠️ *STATUS SAAT INI*
${status}
📊 *Data Sensor*
🌧 Curah Hujan      : ${rain} mm (${rain_fuzzy})
🌱 Kelembaban Tanah : ${soil} % (${soil_fuzzy})
📐 Kemiringan: ${tilt}° (${tilt_fuzzy})
━━━━━━━━━━━━━━━━━━━━━━
${
  status === "AMAN"
    ? `🟢 *KONDISI AMAN*
Aktivitas masyarakat dapat berjalan seperti biasa.
Sistem akan terus melakukan pemantauan secara real-time.`
    : status === "WASPADA"
      ? `🟡 *KONDISI WASPADA*
Terjadi peningkatan potensi longsor.
Disarankan:
• Tingkatkan kewaspadaan.
• Pantau informasi terbaru.
• Hindari berada di sekitar lereng curam apabila hujan terus berlangsung.`
      : `🔴 *KONDISI BAHAYA*

Potensi longsor sangat tinggi.
Segera:
• Jauhi area lereng.
• Evakuasi menuju lokasi yang lebih aman.
• Ikuti arahan petugas BPBD atau pihak berwenang.
• Jangan berada di sekitar tebing atau aliran sungai.`
}
━━━━━━━━━━━━━━━━━━━━━━
`
      );

      console.log("================================");
      console.log("STATUS BERUBAH");
      console.log(previousStatus + " -> " + status);
      console.log("WhatsApp Terkirim");
      console.log("================================");
    }

    // =============================
    // SIMPAN DATABASE
    // =============================

    const result = await Sensor.createAsync({
      rain_tip,

      rain,
      rain_fuzzy,

      soil,
      soil_fuzzy,

      tilt,
      tilt_fuzzy,

      fuzzy_value,
      status,

      created_at,
    });

    // =============================
    // SOCKET.IO
    // =============================

    const io = socket.getIO();

    io.emit("sensorUpdate", {
      id: result.insertId,

      rain_tip,

      rain,
      rain_fuzzy,

      soil,
      soil_fuzzy,

      tilt,
      tilt_fuzzy,

      fuzzy_value,

      status,

      created_at: new Date(),
    });

    // =============================
    // RESPONSE
    // =============================

    return res.status(201).json({
      success: true,

      message: "Data sensor berhasil disimpan.",

      id: result.insertId,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,

      message: err.message,
    });
  }
};

module.exports = sensorController;
