extern const byte TOTAL_RULE;
extern float rule[];
#ifndef CONFIG_H
#define CONFIG_H

//===========================
// LCD I2C
//===========================
#define LCD_ADDRESS 0x27
#define LCD_COLS 16
#define LCD_ROWS 2

//===========================
// ESP32 PIN
//===========================
#define RAIN_PIN 14
#define SOIL_PIN 34

#define SDA_PIN 21
#define SCL_PIN 22

//===========================
// Rain Gauge
//===========================
const float MM_PER_TIP = 0.30;

//===========================
// Soil Calibration
// Sesuaikan hasil kalibrasi Anda
//===========================
const int SOIL_DRY = 4095;
const int SOIL_WET = 1662;

//===========================
// Scheduler
//===========================
const unsigned long SENSOR_INTERVAL = 20;
const unsigned long LCD_INTERVAL = 1000;
const unsigned long SERIAL_INTERVAL = 1000;

//=====================================================
// BUZZER
//=====================================================

const byte PIN_BUZZER = 27;      // Sesuaikan dengan pin yang digunakan
const bool ENABLE_BUZZER = true;

//=====================================================
// TEST MODE
//=====================================================

// false = menggunakan sensor asli
// true  = menggunakan input manual

const bool TEST_MODE = true;

//=====================================================
// MANUAL INPUT
//=====================================================

float TEST_RAIN = 40;     // mm
int   TEST_SOIL = 90;       // %
float TEST_TILT = 35;     // derajat

//=====================================================
// WIFI
//=====================================================

const char* WIFI_SSID = "V";
const char* WIFI_PASSWORD = "12345678";

//=====================================================
// BACKEND
//=====================================================

// server
const char* SERVER_HOST =
"https://jagabumi.up.railway.app";


//=====================================================
// NTP
//=====================================================

// WITA (NTB) = UTC+8
const char* NTP_SERVER = "pool.ntp.org";

const long GMT_OFFSET_SEC = 8 * 3600;

const int DAYLIGHT_OFFSET_SEC = 0;

//=====================================================
// SEND DATA
//=====================================================

// Kirim data ke server setiap 5 detik
const unsigned long SERVER_INTERVAL = 10000;

#endif