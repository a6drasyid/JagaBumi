import StatCard from "../components/StatCard";

export default function StatisticsSection() {
  return (
    <section
      className="
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
          min-w-0

          px-3
          min-[375px]:px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}
        <div
          className="
            mx-auto
            mb-8
            w-full
            max-w-4xl
            text-center

            sm:mb-10
            md:mb-12
            lg:mb-20
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-emerald-400

              min-[375px]:text-[11px]

              sm:text-xs
              sm:tracking-[0.22em]

              lg:text-base
              lg:tracking-widest
            "
          >
            Statistik
          </p>

          <h2
            className="
              mt-2.5

              break-words

              text-[1.75rem]
              font-bold
              leading-[1.15]
              tracking-tight
              text-white

              min-[375px]:text-3xl

              sm:mt-3
              sm:text-4xl

              lg:mt-4
              lg:text-5xl
            "
          >
            Performa Sistem
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl

              text-xs
              leading-5
              text-gray-400

              min-[375px]:text-sm
              min-[375px]:leading-6

              sm:mt-4
              sm:text-base
              sm:leading-7

              lg:mt-5
            "
          >
            Gambaran singkat performa sistem monitoring berbasis IoT dan metode Fuzzy Mamdani.
          </p>
        </div>

        {/* =================================================
            STATISTICS GRID

            MOBILE  : 2 kolom
            TABLET  : 2 kolom
            DESKTOP : 4 kolom

            items-stretch memastikan tinggi card sama
        ================================================= */}
        <div
          className="
            grid
            w-full
            min-w-0

            grid-cols-2
            items-stretch

            gap-2

            min-[375px]:gap-3

            sm:gap-4

            md:grid-cols-2
            md:gap-6

            lg:grid-cols-4
            lg:gap-8
          "
        >
          <div className="h-full min-w-0">
            <StatCard
              title="Data Sensor"
              end={1000}
              suffix="+"
              description="Data pembacaan sensor yang telah direkam."
            />
          </div>

          <div className="h-full min-w-0">
            <StatCard
              title="Akurasi Sistem"
              end={99}
              suffix="%"
              description="Tingkat akurasi hasil klasifikasi Fuzzy Mamdani."
            />
          </div>

          <div className="h-full min-w-0">
            <StatCard
              title="Monitoring"
              end={24}
              suffix="/7"
              description="Pemantauan kondisi lereng tanpa henti."
            />
          </div>

          <div className="h-full min-w-0">
            <StatCard
              title="Sensor Aktif"
              end={3}
              suffix=""
              description="Rain Gauge, FC-28, dan MPU6050."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
