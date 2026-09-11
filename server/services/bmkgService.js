const axios = require("axios");

// =====================================================
// KODE WILAYAH BMKG
// Desa Sembalun Bumbung, Kecamatan Sembalun, Lombok Timur
// =====================================================
const ADM4 = "52.03.08.2005";

// =====================================================
// CACHE BMKG (30 MENIT)
// =====================================================
let cacheData = null;
let cacheTimestamp = 0;

const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

// =====================================================
// AMBIL DATA BMKG
// =====================================================
async function getBMKGWeather() {
  // Gunakan cache jika masih berlaku
  if (
    cacheData &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  ) {
    console.log("🌦️ BMKG menggunakan cache");
    return cacheData;
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

  cacheData = {
    location: lokasi.desa || "Pusuk Sembalun",
    district: lokasi.kecamatan || "Sembalun",
    weather: prakiraan.weather_desc,
    temperature: prakiraan.t,
    humidity: prakiraan.hu,
    windSpeed: prakiraan.ws,
    windDirection: prakiraan.wd_to,
    localTime: prakiraan.local_datetime,
    icon: prakiraan.image,
  };

  cacheTimestamp = Date.now();

  console.log("✅ Data BMKG berhasil diperbarui");

  return cacheData;
}

module.exports = {
  getBMKGWeather,
};