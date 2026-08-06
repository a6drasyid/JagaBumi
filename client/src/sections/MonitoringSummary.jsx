import MonitoringCard from "../components/MonitoringCard";
import useSensor from "../hooks/useSensor";

import { CloudRain, Droplets, Mountain, ShieldAlert } from "lucide-react";

export default function MonitoringSummary() {
  const { sensor, history } = useSensor();

  console.log(sensor);
  console.log(history);

  // =====================================================
  // LAST UPDATE
  // =====================================================
  const lastUpdate = sensor?.created_at
    ? `Last Update ${new Date(sensor.created_at).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })} WITA`
    : "Menunggu data...";

  return (
    <section
      id="monitoring"
      className="
        relative
        w-full
        max-w-full
        overflow-hidden

        bg-gradient-to-b
        from-[#050505]
        to-[#0F172A]

        py-14
        sm:py-16
        md:py-20
        lg:py-24
        xl:py-28
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
            mb-8
            w-full
            min-w-0

            sm:mb-10
            md:mb-12
            lg:mb-14
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-emerald-400

              sm:text-xs
              sm:tracking-[0.22em]

              lg:text-sm
              lg:tracking-widest
            "
          >
            Monitoring
          </p>

          <h2
            className="
              mt-2.5
              w-full
              max-w-4xl

              break-words

              text-[1.75rem]
              font-bold
              leading-[1.15]
              tracking-tight
              text-white

              min-[375px]:text-3xl

              sm:mt-3
              sm:text-4xl

              lg:text-5xl
            "
          >
            Kondisi Lereng Secara Real-time
          </h2>

          <p
            className="
              mt-3
              w-full
              max-w-3xl

              text-sm
              leading-6
              text-gray-400

              sm:mt-4
              sm:text-base
              sm:leading-7

              lg:mt-5
            "
          >
            Data berikut berasal dari sensor IoT yang dipasang pada area penelitian dan diperbarui
            secara langsung.
          </p>
        </div>

        {/* =================================================
            MONITORING CARDS
        ================================================= */}
        <div
          className="
            grid
            w-full
            min-w-0

            grid-cols-2

            gap-2.5
            min-[375px]:gap-3

            sm:gap-4
            md:gap-5
            lg:gap-6

            xl:grid-cols-4
          "
        >
          {/* CURAH HUJAN */}
          <div className="h-full min-w-0">
            <MonitoringCard
              icon={CloudRain}
              title="Curah Hujan"
              value={sensor?.rain}
              unit="mm"
              category={sensor?.rain_fuzzy}
              color="bg-blue-500"
              iconBg="bg-blue-500/10"
              iconBorder="border-blue-500/20"
              iconColor="text-blue-400"
              status={lastUpdate}
            />
          </div>

          {/* KELEMBABAN TANAH */}
          <div className="h-full min-w-0">
            <MonitoringCard
              icon={Droplets}
              title="Kelembaban Tanah"
              value={sensor?.soil}
              unit="%"
              category={sensor?.soil_fuzzy}
              color="bg-emerald-500"
              iconBg="bg-emerald-500/10"
              iconBorder="border-emerald-500/20"
              iconColor="text-emerald-400"
              status={lastUpdate}
            />
          </div>

          {/* KEMIRINGAN LERENG */}
          <div className="h-full min-w-0">
            <MonitoringCard
              icon={Mountain}
              title="Kemiringan"
              value={sensor?.tilt}
              unit="°"
              category={sensor?.tilt_fuzzy}
              color="bg-orange-400"
              iconBg="bg-orange-500/10"
              iconBorder="border-orange-500/20"
              iconColor="text-orange-400"
              status={lastUpdate}
            />
          </div>

          {/* STATUS SISTEM */}
          <div className="h-full min-w-0">
            <MonitoringCard
              icon={ShieldAlert}
              title="Status Sistem"
              value={sensor?.status}
              unit=""
              iconBg={
                sensor?.status === "AMAN"
                  ? "bg-emerald-500/10"
                  : sensor?.status === "WASPADA"
                    ? "bg-yellow-500/10"
                    : "bg-red-500/10"
              }
              iconBorder={
                sensor?.status === "AMAN"
                  ? "border-emerald-500/20"
                  : sensor?.status === "WASPADA"
                    ? "border-yellow-500/20"
                    : "border-red-500/20"
              }
              iconColor={
                sensor?.status === "AMAN"
                  ? "text-emerald-400"
                  : sensor?.status === "WASPADA"
                    ? "text-yellow-400"
                    : "text-red-400"
              }
              status={sensor ? `Indeks Risiko ${sensor.fuzzy_value}%` : "Menunggu data..."}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
