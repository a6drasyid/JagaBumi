//=====================================================
// RAIN GAUGE
//=====================================================

// Interrupt Service Routine (ISR)
// Dipanggil setiap kali Rain Gauge menghasilkan satu pulsa (tip)
void IRAM_ATTR rainISR()
{
  unsigned long now = micros();

  // Debounce selama 250 ms untuk menghindari pembacaan ganda
  if (now - lastRainInterrupt > 250000)
  {
    rainTip++;                  // Menambah jumlah tip
    lastRainInterrupt = now;    // Menyimpan waktu interrupt terakhir
  }
}

// Inisialisasi pin Rain Gauge dan mengaktifkan interrupt
void initRainGauge()
{
  pinMode(RAIN_PIN, INPUT_PULLUP);

  attachInterrupt(
      digitalPinToInterrupt(RAIN_PIN),
      rainISR,
      FALLING);
}

// Menghitung curah hujan berdasarkan jumlah tip
void readRain()
{
  noInterrupts();           // Menonaktifkan interrupt sementara
  long tip = rainTip;       // Menyalin jumlah tip
  interrupts();             // Mengaktifkan kembali interrupt

  // Mengubah jumlah tip menjadi curah hujan (mm)
  rainMM = tip * MM_PER_TIP;
}