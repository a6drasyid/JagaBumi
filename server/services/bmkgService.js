const axios = require("axios");

// ===========================================
// Kode Wilayah BMKG
// Desa Sembalun Bumbung - Lombok Timur
// ===========================================
const ADM4 = "52.03.08.2005";

// ===========================================
// Cache BMKG
// ===========================================
let cache = null;
let cacheTime = 0;

const CACHE_DURATION = 30 * 60 * 1000;

// ===========================================
// Ambil Data BMKG
// ===========================================
async function getBMKGWeather() {
  if (cache && Date.now() - cacheTime < CACHE_DURATION) {
    console.log("📦 BMKG Cache");
    return cache;
  }

  const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${ADM4}`;

  console.log("🌍 Request BMKG...");

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      Accept: "application/json",
      "User-Agent": "JagaBumi/1.0",
    },
  });

  const result = response.data;

  const lokasi = result.lokasi || {};
  const cuaca = result.data?.[0]?.cuaca?.[0]?.[0];

  if (!cuaca) {
    throw new Error("Data prakiraan BMKG tidak ditemukan.");
  }

  cache = {
    location: lokasi.desa || "Pusuk Sembalun",
    district: lokasi.kecamatan || "Sembalun",
    regency: lokasi.kotkab || "Lombok Timur",
    province: lokasi.provinsi || "Nusa Tenggara Barat",

    weather: cuaca.weather_desc,
    temperature: Number(cuaca.t),
    humidity: Number(cuaca.hu),
    windSpeed: Number(cuaca.ws),
    windDirection: cuaca.wd_to,

    localTime: cuaca.local_datetime,
    icon: cuaca.image,
  };

  cacheTime = Date.now();

  console.log("✅ BMKG Updated");

  return cache;
}

module.exports = {
  getBMKGWeather,
};