import SensorCard from "../components/SensorCard";

import rain from "../assets/rain-gauge.png";
import soil from "../assets/fc28.png";
import tilt from "../assets/mpu6050.png";

export default function SensorSection() {
  return (
    <section id="sensor" className="py-32 bg-gradient-to-b from-[#050505] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <p className="uppercase tracking-widest text-emerald-400">Hardware</p>

          <h2 className="text-5xl font-bold mt-4">Sensor yang Digunakan</h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto">
            Sistem memanfaatkan tiga sensor utama untuk memantau kondisi lingkungan secara real-time
            sebelum diproses menggunakan metode Fuzzy Mamdani.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <SensorCard
            image={rain}
            title="Rain Gauge"
            description="Mengukur intensitas curah hujan secara otomatis dan mengirimkan data ke ESP32."
            specs="Output Pulse • Real-time • Outdoor"
          />

          <SensorCard
            image={soil}
            title="FC-28 Soil Moisture Sensor"
            description="Mengukur kelembaban tanah sebagai indikator tingkat kejenuhan air pada lereng."
            specs="0–100% Moisture • Analog Output"
          />

          <SensorCard
            image={tilt}
            title="MPU6050 Tilt Sensor"
            description="Mendeteksi perubahan sudut atau kemiringan lereng untuk mengidentifikasi potensi pergerakan tanah."
            specs="Accelerometer + Gyroscope • I2C"
          />
        </div>
      </div>
    </section>
  );
}
