//=====================================================
// SOIL MOISTURE SENSOR
//=====================================================

// Jumlah sampel pembacaan ADC untuk mengurangi noise
const byte sampleCount = 10;

void readSoil()
{
  long total = 0;

  // Membaca nilai ADC sebanyak 10 kali
  for (byte i = 0; i < sampleCount; i++)
  {
    total += analogRead(SOIL_PIN);
    delayMicroseconds(500);
  }

  // Menghitung nilai rata-rata ADC
  soilADC = total / sampleCount;

  // Mengubah nilai ADC menjadi persentase kelembapan tanah (0–100%)
  soilPercent = map(soilADC,
                    SOIL_DRY,
                    SOIL_WET,
                    0,
                    100);

  // Membatasi hasil agar tetap berada pada rentang 0–100%
  soilPercent = constrain(soilPercent, 0, 100);
}