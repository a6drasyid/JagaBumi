const axios = require("axios");

// =====================================================
// KODE WILAYAH BMKG
// Desa Sembalun Bumbung (Pusuk Sembalun), Lombok Timur
// =====================================================
const ADM4 = "52.03.08.2005";

// =====================================================
// CACHE BMKG (30 MENIT)
// =====================================================
let cache = null;
let cacheTime = 0;

const CACHE_DURATION = 30 * 60 * 1000;

// =====================================================
// KONVERSI ARAH ANGIN KE BAHASA INDONESIA
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

  return directions[direction] || "Tidak diketahui";
}

// =====================================================
// KONVERSI KETERANGAN CUACA BMKG KE BAHASA INDONESIA
// =====================================================
function convertWeatherDescription(weather = "") {
  const text = weather.toLowerCase().trim();

  // ===== CERAH =====
  if (
    text === "cerah" ||
    text.includes("clear sky") ||
    text.includes("clear")
  ) {
    return "Cerah";
  }

  // ===== CERAH BERAWAN =====
  if (
    text.includes("cerah berawan") ||
    text.includes("partly cloudy") ||
    text.includes("partly_cloudy")
  ) {
    return "Cerah Berawan";
  }

  // ===== BERAWAN TEBAL =====
  if (
    text.includes("berawan tebal") ||
    text.includes("mostly cloudy") ||
    text.includes("overcast")
  ) {
    return "Berawan Tebal";
  }

  // ===== BERAWAN =====
  if (
    text === "berawan" ||
    text.includes("cloudy")
  ) {
    return "Berawan";
  }

  // ===== KABUT / UDARA KABUR =====
  if (
    text.includes("udara kabur") ||
    text.includes("kabut") ||
    text.includes("mist") ||
    text.includes("haze") ||
    text.includes("smoke")
  ) {
    return "Kabut";
  }

  if (text.includes("fog")) {
    return "Kabut Tebal";
  }

  // ===== HUJAN =====
  if (
    text.includes("hujan disertai petir") ||
    text.includes("thunderstorm") ||
    text.includes("storm") ||
    text.includes("petir")
  ) {
    return "Hujan Disertai Petir";
  }

  if (
    text.includes("hujan sangat lebat") ||
    text.includes("very heavy rain")
  ) {
    return "Hujan Sangat Lebat";
  }

  if (
    text.includes("hujan lebat") ||
    text.includes("heavy rain")
  ) {
    return "Hujan Lebat";
  }

  if (
    text.includes("hujan sedang") ||
    text.includes("moderate rain")
  ) {
    return "Hujan Sedang";
  }

  if (
    text.includes("hujan ringan") ||
    text.includes("light rain")
  ) {
    return "Hujan Ringan";
  }

  if (text.includes("rain") || text.includes("hujan")) {
    return "Hujan";
  }

  // Default
  return weather || "Tidak diketahui";
}

// =====================================================
// AMBIL DATA BMKG
// =====================================================
async function getBMKGWeather() {
  // Gunakan cache jika masih berlaku
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
  const prakiraan = json.data?.[0]?.cuaca?.[0]?.[0];

  if (!prakiraan) {
    throw new Error("Prakiraan cuaca BMKG tidak ditemukan.");
  }

  cache = {
    // =====================================
    // INFORMASI LOKASI
    // =====================================
    location: lokasi.desa || "Pusuk Sembalun",
    district: lokasi.kecamatan || "Sembalun",
    regency: lokasi.kotkab || "Lombok Timur",
    province: lokasi.provinsi || "Nusa Tenggara Barat",

    // =====================================
    // DATA CUACA
    // =====================================
    weather: convertWeatherDescription(prakiraan.weather_desc),

    temperature: Number(prakiraan.t ?? 0),
    humidity: Number(prakiraan.hu ?? 0),
    windSpeed: Number(prakiraan.ws ?? 0),

    // Arah angin tanpa singkatan
    windDirection: convertWindDirection(prakiraan.wd_to),

    localTime: prakiraan.local_datetime,
    icon: prakiraan.image || "",
  };

  cacheTime = Date.now();

  console.log("✅ BMKG berhasil diperbarui:", cache.weather);

  return cache;
}

module.exports = {
  getBMKGWeather,
};