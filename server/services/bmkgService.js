const axios = require("axios");

// =====================================================
// BMKG - Desa Sembalun, Kecamatan Sembalun
// Kabupaten Lombok Timur, Nusa Tenggara Barat
// =====================================================
const ADM4 = "52.03.15.2005";

// =====================================================
// CACHE BMKG (30 MENIT)
// =====================================================
let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 30 * 60 * 1000;

// =====================================================
// KONVERSI ARAH ANGIN
// =====================================================
function convertWindDirection(direction = "") {
  const directions = {
    N: "Utara",
    NNE: "Utara Timur Laut",
    NE: "Timur Laut",
    ENE: "Timur Timur Laut",
    E: "Timur",
    ESE: "Timur Tenggara",
    SE: "Tenggara",
    SSE: "Selatan Tenggara",
    S: "Selatan",
    SSW: "Selatan Barat Daya",
    SW: "Barat Daya",
    WSW: "Barat Barat Daya",
    W: "Barat",
    WNW: "Barat Barat Laut",
    NW: "Barat Laut",
    NNW: "Utara Barat Laut",
  };

  return directions[String(direction).toUpperCase()] || direction || "Tidak diketahui";
}

// =====================================================
// KONVERSI DESKRIPSI CUACA BMKG
// =====================================================
function convertWeatherDescription(weather = "") {
  const text = weather.toLowerCase().trim();

  if (text.includes("cerah berawan")) return "Cerah Berawan";
  if (text === "cerah" || text.includes("clear")) return "Cerah";
  if (text.includes("berawan tebal")) return "Berawan Tebal";
  if (text === "berawan" || text.includes("cloudy")) return "Berawan";
  if (text.includes("kabut") || text.includes("mist") || text.includes("fog"))
    return "Kabut";

  if (text.includes("petir")) return "Hujan Disertai Petir";
  if (text.includes("hujan sangat lebat")) return "Hujan Sangat Lebat";
  if (text.includes("hujan lebat")) return "Hujan Lebat";
  if (text.includes("hujan sedang")) return "Hujan Sedang";
  if (text.includes("hujan ringan")) return "Hujan Ringan";
  if (text.includes("hujan")) return "Hujan";

  return weather || "Tidak diketahui";
}

// =====================================================
// AMBIL DATA BMKG
// =====================================================
async function getBMKGWeather() {
  // Gunakan cache
  if (cache && Date.now() - cacheTime < CACHE_DURATION) {
    console.log("📦 BMKG menggunakan cache");
    return cache;
  }

  const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${ADM4}`;

  console.log("🌦️ Mengambil data BMKG...");

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      Accept: "application/json",
      "User-Agent": "JagaBumi/1.0",
    },
  });

  const json = response.data;

  if (!json.data || json.data.length === 0) {
    throw new Error("Data BMKG tidak tersedia.");
  }

  const lokasi = json.lokasi || {};
  const cuacaHariIni = json.data[0].cuaca[0];

  if (!cuacaHariIni || cuacaHariIni.length === 0) {
    throw new Error("Prakiraan cuaca BMKG tidak ditemukan.");
  }

  // ============================================
  // DATA SAAT INI
  // ============================================
  const current = cuacaHariIni[0];

  // ============================================
  // PRAKIRAAN 24 JAM (8 interval × 3 jam)
  // ============================================
  const forecast24h = cuacaHariIni.slice(0, 8).map((item) => ({
    local_datetime: item.local_datetime,
    weather_desc: convertWeatherDescription(item.weather_desc),
    t: Number(item.t ?? 0),
    hu: Number(item.hu ?? 0),
    ws: Number(item.ws ?? 0),
    wd: convertWindDirection(item.wd_to),
    icon: item.image || "",
  }));

  cache = {
    location: lokasi.desa || "Pusuk Sembalun",
    district: lokasi.kecamatan || "Sembalun",
    regency: lokasi.kotkab || "Lombok Timur",
    province: lokasi.provinsi || "Nusa Tenggara Barat",

    current: {
      weather: convertWeatherDescription(current.weather_desc),
      temperature: Number(current.t ?? 0),
      humidity: Number(current.hu ?? 0),
      windSpeed: Number(current.ws ?? 0),
      windDirection: convertWindDirection(current.wd_to),
      localTime: current.local_datetime,
      icon: current.image || "",
    },

    forecast24h,
  };

  cacheTime = Date.now();

  console.log(
    `✅ BMKG berhasil diperbarui (${forecast24h.length} prakiraan / 24 jam)`
  );

  return cache;
}

module.exports = {
  getBMKGWeather,
};