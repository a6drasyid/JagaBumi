const { getBMKGWeather } = require("../services/bmkgService");

exports.getWeather = async (req, res) => {
  try {
    const weather = await getBMKGWeather();

    res.status(200).json({
      success: true,
      data: weather,
    });
  } catch (error) {
    console.error("❌ BMKG Controller:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data BMKG.",
    });
  }
};