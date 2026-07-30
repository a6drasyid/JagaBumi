import StatCard from "../components/StatCard";

export default function StatisticsSection() {
  return (
    <section className="py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <p className="uppercase tracking-widest text-emerald-400">Statistik</p>

          <h2 className="text-5xl font-bold mt-4">Performa Sistem</h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Gambaran singkat performa sistem monitoring berbasis IoT dan metode Fuzzy Mamdani.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Data Sensor"
            end={1000}
            suffix="+"
            description="Data pembacaan sensor yang telah direkam."
          />

          <StatCard
            title="Akurasi Sistem"
            end={99}
            suffix="%"
            description="Tingkat akurasi hasil klasifikasi Fuzzy Mamdani."
          />

          <StatCard
            title="Monitoring"
            end={24}
            suffix="/7"
            description="Pemantauan kondisi lereng tanpa henti."
          />

          <StatCard
            title="Sensor Aktif"
            end={3}
            suffix=""
            description="Rain Gauge, FC-28, dan MPU6050."
          />
        </div>
      </div>
    </section>
  );
}
