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
// KONVERSI ARAH ANGIN BMKG KE BAHASA INDONESIA
// Menggunakan 16 arah mata angin (tanpa singkatan)
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

  return directions[direction] || "Tidak Diketahui";
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

  console.log("🌍 Mengambil data BMKG...");

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      Accept: "application/json",
      "User-Agent": "JagaBumi/1.0",
    },
  });

  const json = response.data;

  if (!json.data || json.data.length === 0) {
    throw new Error("Data BMKG kosong.");
  }

  const lokasi = json.lokasi || {};
  const prakiraan = json.data[0].cuaca[0][0];

  cache = {
    // ===========================
    // INFORMASI LOKASI
    // ===========================
    location: lokasi.desa || "Pusuk Sembalun",
    district: lokasi.kecamatan || "Sembalun",
    regency: lokasi.kotkab || "Lombok Timur",
    province: lokasi.provinsi || "Nusa Tenggara Barat",

    // ===========================
    // DATA CUACA BMKG
    // ===========================
    weather: prakiraan.weather_desc || "Tidak tersedia",
    temperature: Number(prakiraan.t) || 0,
    humidity: Number(prakiraan.hu) || 0,
    windSpeed: Number(prakiraan.ws) || 0,

    // Tidak menggunakan singkatan lagi
    windDirection: convertWindDirection(prakiraan.wd_to),

    localTime: prakiraan.local_datetime || new Date().toISOString(),
    icon: prakiraan.image || "",
  };

  cacheTime = Date.now();

  console.log("✅ Data BMKG berhasil diperbarui");

  return cache;
}

module.exports = {
  getBMKGWeather,
};