import SensorCard from "../components/SensorCard";

import soil from "../assets/fc28.png";
import tilt from "../assets/mpu6050.png";
import rain from "../assets/rain-gauge.png";

export default function SensorSection() {
  return (
    <section
      id="sensor"
      className="
        w-full
        max-w-full
        overflow-hidden

        bg-gradient-to-b
        from-[#050505]
        to-[#0F172A]

        py-14
        sm:py-16
        md:py-20
        lg:py-32
      "
    >
      {/* =================================================
          CONTAINER
      ================================================= */}
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
          {/* LABEL */}
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
            Hardware
          </p>

          {/* TITLE */}
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
            Sensor yang Digunakan
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto
              mt-3
              max-w-3xl

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
            Sistem memanfaatkan tiga sensor utama untuk memantau kondisi lingkungan secara real-time
            sebelum diproses menggunakan metode Fuzzy Mamdani.
          </p>
        </div>

        {/* =================================================
            SENSOR GRID

            MOBILE  : 1 kolom
            TABLET  : 2 kolom
            DESKTOP : 3 kolom seperti sebelumnya
        ================================================= */}
        <div
          className="
            grid
            w-full
            min-w-0

            grid-cols-1

            gap-4

            sm:gap-5

            md:grid-cols-2
            md:gap-6

            lg:grid-cols-3
            lg:gap-8
          "
        >
          {/* =================================================
              RAIN GAUGE
          ================================================= */}
          <div className="w-full min-w-0">
            <SensorCard
              image={rain}
              title="Rain Gauge"
              description="Mengukur intensitas curah hujan secara otomatis dan mengirimkan data ke ESP32."
              specs="Output Pulse • Real-time • Outdoor"
            />
          </div>

          {/* =================================================
              FC-28
          ================================================= */}
          <div className="w-full min-w-0">
            <SensorCard
              image={soil}
              title="FC-28 Soil Moisture Sensor"
              description="Mengukur kelembaban tanah sebagai indikator tingkat kejenuhan air pada lereng."
              specs="0–100% Moisture • Analog Output"
            />
          </div>

          {/* =================================================
              MPU6050
          ================================================= */}
          <div
            className="
              w-full
              min-w-0

              md:col-span-2
              md:mx-auto
              md:max-w-[calc(50%-0.75rem)]

              lg:col-span-1
              lg:max-w-none
            "
          >
            <SensorCard
              image={tilt}
              title="MPU6050 Tilt Sensor"
              description="Mendeteksi perubahan sudut atau kemiringan lereng untuk mengidentifikasi potensi pergerakan tanah."
              specs="Accelerometer + Gyroscope • I2C"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
