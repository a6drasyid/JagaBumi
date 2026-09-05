import StatCard from "../components/StatCard";
import useStatistics from "../hooks/useStatistics";

export default function StatisticsSection() {
  const { stats, loading } = useStatistics();

  return (
    <section
      id="statistik"
      className="
        relative
        w-full
        max-w-full
        overflow-hidden
        bg-transparent

        py-14
        sm:py-16
        md:py-20
        lg:py-32
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-3
          min-[375px]:px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* HEADER */}
        <div
          className="
            mx-auto
            mb-8
            max-w-4xl
            text-center

            sm:mb-10
            md:mb-12
            lg:mb-20
          "
        >
          <p className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-medium">
            Statistik
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Performa Sistem
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto leading-7">
            Statistik sistem diperbarui secara otomatis berdasarkan data sensor
            yang tersimpan pada database JagaBumi.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-5
            lg:grid-cols-4
            lg:gap-8
          "
        >
          <StatCard
            title="Data Sensor"
            end={loading ? 0 : stats.totalData}
            suffix="+"
            description="Total data pembacaan sensor yang tersimpan pada database."
          />

          <StatCard
            title="Akurasi Sistem"
            end={stats.accuracy}
            suffix="%"
            description="Tingkat akurasi klasifikasi metode Fuzzy Mamdani."
          />

          <StatCard
            title="Monitoring Aktif"
            end={loading ? 0 : stats.monitoringDays}
            suffix=" Hari"
            description="Lama sistem melakukan monitoring secara berkelanjutan."
          />

          <StatCard
            title="Sensor Aktif"
            end={stats.activeSensors}
            suffix=""
            description="Rain Gauge, FC-28 Soil Moisture, dan MPU6050."
          />
        </div>
      </div>
    </section>
  );
}