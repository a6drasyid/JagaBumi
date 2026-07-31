//=====================================================
// MPU6050
//=====================================================

float pitchFiltered = 0;
float rollFiltered = 0;

const float alpha = 0.65;

bool mpuAvailable = false;

void initMPU()
{
    if (!mpu.begin())
    {
        Serial.println("MPU6050 tidak ditemukan!");
        Serial.println("Sistem berjalan tanpa MPU6050.");

        mpuAvailable = false;
        return;
    }

    mpuAvailable = true;

    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
    mpu.setGyroRange(MPU6050_RANGE_500_DEG);
    mpu.setFilterBandwidth(MPU6050_BAND_94_HZ);

    Serial.println("MPU6050 Ready");
}

void readMPU()
{
    // Jika sensor tidak terdeteksi, nilai pitch dan roll diatur menjadi 0
    if (!mpuAvailable)
    {
        pitch = 0;
        roll = 0;
        return;
    }

    // Membaca data akselerometer, giroskop, dan suhu
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);

    // Mengambil nilai percepatan pada sumbu X, Y, dan Z
    float ax = a.acceleration.x;
    float ay = a.acceleration.y;
    float az = a.acceleration.z;

    // Menghitung sudut pitch dan roll dari data akselerometer
    float newPitch =
        atan2(ax, sqrt(ay * ay + az * az)) * 180.0 / PI;

    float newRoll =
        atan2(ay, sqrt(ax * ax + az * az)) * 180.0 / PI;

    // Menghaluskan nilai pitch menggunakan filter
    pitchFiltered =
        alpha * pitchFiltered +
        (1.0 - alpha) * newPitch;

    // Menghaluskan nilai roll menggunakan filter
    rollFiltered =
        alpha * rollFiltered +
        (1.0 - alpha) * newRoll;

    // Menyimpan hasil akhir
    pitch = pitchFiltered;
    roll = rollFiltered;
}