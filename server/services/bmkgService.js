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

const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

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

  // Cerah
  if (text.includes("clear sky")) return "Cerah";
  if (text === "clear") return "Cerah";
  if (text.includes("cerah")) return "Cerah";

  // Cerah Berawan
  if (text.includes("partly cloudy")) return "Cerah Berawan";
  if (text.includes("partly")) return "Cerah Berawan";
  if (text.includes("cerah berawan")) return "Cerah Berawan";

  // Berawan
  if (text.includes("mostly cloudy")) return "Berawan Tebal";
  if (text.includes("overcast")) return "Berawan Tebal";
  if (text.includes("cloudy")) return "Berawan";
  if (text.includes("berawan")) return "Berawan";

  // Kabut
  if (text.includes("fog")) return "Kabut Tebal";
  if (text.includes("mist")) return "Kabut";
  if (text.includes("haze")) return "Kabut";
  if (text.includes("smoke")) return "Kabut";
  if (text.includes("kabut")) return "Kabut";

  // Hujan
  if (text.includes("light rain")) return "Hujan Ringan";
  if (text.includes("moderate rain")) return "Hujan Sedang";
  if (text.includes("heavy rain")) return "Hujan Lebat";
  if (text.includes("very heavy rain")) return "Hujan Sangat Lebat";
  if (text.includes("rain")) return "Hujan";

  // Petir
  if (text.includes("thunderstorm")) return "Hujan Disertai Petir";
  if (text.includes("storm")) return "Hujan Disertai Petir";

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
  const prakiraan = json.data[0]?.cuaca?.[0]?.[0];

  if (!prakiraan) {
    throw new Error("Prakiraan cuaca BMKG tidak ditemukan.");
  }

  cache = {
    // =====================================
    // LOKASI
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

    // Tidak memakai singkatan (NE, SW, dll)
    windDirection: convertWindDirection(prakiraan.wd_to),

    localTime: prakiraan.local_datetime,
    icon: prakiraan.image || "",
  };

  cacheTime = Date.now();

  console.log("✅ Data BMKG berhasil diperbarui");

  return cache;
}

module.exports = {
  getBMKGWeather,
};