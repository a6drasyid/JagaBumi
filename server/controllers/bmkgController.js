const {
  getBMKGWeather,
  getBMKGForecast24H,
} = require("../services/bmkgService");

// ===============================
// CUACA TERKINI
// ===============================
exports.getWeather = async (req, res) => {
  try {
    const data = await getBMKGWeather();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("BMKG ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data BMKG.",
    });
  }
};

// ===============================
// PRAKIRAAN 24 JAM
// ===============================
exports.getForecast = async (req, res) => {
  try {
    const data = await getBMKGForecast24H();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil prakiraan BMKG.",
    });
  }
};