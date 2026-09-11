import { motion } from "framer-motion";
import {
  CloudRain,
  Cloud,
  Sun,
  Wind,
  Droplets,
  ThermometerSun,
  MapPin,
  TriangleAlert,
} from "lucide-react";

import useBMKG from "../hooks/useBMKG";

// =====================================================
// ICON CUACA
// =====================================================
function WeatherIcon({ condition }) {
  const weather = (condition || "").toLowerCase();

  if (weather.includes("hujan")) {
    return <CloudRain className="h-8 w-8 text-sky-400 sm:h-10 sm:w-10" />;
  }

  if (weather.includes("berawan")) {
    return <Cloud className="h-8 w-8 text-gray-300 sm:h-10 sm:w-10" />;
  }

  return <Sun className="h-8 w-8 text-yellow-300 sm:h-10 sm:w-10" />;
}

// =====================================================
// STATUS PERINGATAN BMKG
// =====================================================
const getWarning = (condition = "") => {
  const weather = condition.toLowerCase();

  if (weather.includes("lebat")) {
    return {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      message:
        "Potensi hujan lebat. Tingkatkan kewaspadaan terhadap risiko longsor pada kawasan lereng.",
    };
  }

  if (weather.includes("sedang") || weather.includes("ringan")) {
    return {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      message:
        "Potensi hujan masih ada. Pantau kondisi lereng dan sistem peringatan dini secara berkala.",
    };
  }

  return {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    message:
      "Cuaca relatif aman berdasarkan prakiraan BMKG saat ini. Monitoring tetap dilakukan secara real-time.",
  };
};

// =====================================================
// CARD INFORMASI
// =====================================================
function InfoItem({ icon, label, value }) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        px-4 py-3
      "
    >
      <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-gray-500

            sm:text-[11px]
          "
        >
          {label}
        </p>

        <p
          className="
            truncate
            text-sm
            font-semibold
            text-white

            sm:text-base
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function WeatherBMKGCard() {
  const { weather, loading, error } = useBMKG();

  if (loading) {
    return (
      <div
        className="
          glass-card
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-5 sm:p-6 lg:p-7
          shadow-2xl
        "
      >
        <div className="animate-pulse space-y-5">
          <div className="h-3 w-40 rounded-full bg-white/10" />
          <div className="h-10 w-56 rounded-xl bg-white/10" />

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-white/10"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const warning = getWarning(weather?.weather);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="
        glass-card
        relative
        overflow-hidden

        rounded-3xl
        border border-white/10

        bg-white/5
        backdrop-blur-xl

        p-5
        sm:p-6
        lg:p-7

        shadow-2xl
      "
    >
      {/* Glow kiri atas */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-[360px]
          w-[360px]
          rounded-full
          bg-emerald-500/12
          blur-[140px]
        "
      />

      {/* Glow kanan bawah */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -right-24
          h-[320px]
          w-[320px]
          rounded-full
          bg-green-400/10
          blur-[140px]
        "
      />

      <div className="relative z-10">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-emerald-400

                sm:text-xs
                lg:text-sm
              "
            >
              BMKG • PRAKIRAAN CUACA
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-bold
                tracking-tight
                text-white

                sm:text-3xl
                lg:text-4xl
              "
            >
              Kondisi Cuaca Pusuk Sembalun
            </h3>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400 sm:text-base">
              <MapPin className="h-4 w-4 text-emerald-400" />
              Pusuk Sembalun, Lombok Timur, NTB
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Update BMKG • {weather?.localTime || "--"}
            </p>
          </div>

          <div
            className="
              flex h-16 w-16 items-center justify-center

              rounded-2xl
              border border-white/10

              bg-white/5
              backdrop-blur-xl
            "
          >
            <WeatherIcon condition={weather?.weather} />
          </div>
        </div>

        {/* ================================================= */}
        {/* SUHU */}
        {/* ================================================= */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-gray-400 sm:text-base">
              Kondisi Saat Ini
            </p>

            <h2
              className="
                mt-2
                text-5xl
                font-bold
                leading-none
                tracking-tight
                text-white

                sm:text-6xl
                lg:text-7xl
              "
            >
              {weather?.temperature ?? "--"}°
            </h2>

            <p
              className="
                mt-3
                text-lg
                font-semibold
                text-emerald-300

                sm:text-xl
              "
            >
              {weather?.weather || "Tidak tersedia"}
            </p>
          </div>

          <div
            className={`
              rounded-full
              border
              px-4 py-2

              text-xs
              font-medium
              uppercase
              tracking-wide

              ${warning.bg}
              ${warning.border}
              ${warning.color}
            `}
          >
            BMKG LIVE
          </div>
        </div>

        {/* ================================================= */}
        {/* GRID INFORMASI */}
        {/* ================================================= */}
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <InfoItem
            icon={<ThermometerSun size={18} />}
            label="Suhu"
            value={`${weather?.temperature ?? "--"}°C`}
          />

          <InfoItem
            icon={<Droplets size={18} />}
            label="Kelembapan"
            value={`${weather?.humidity ?? "--"}%`}
          />

          <InfoItem
            icon={<Wind size={18} />}
            label="Kecepatan Angin"
            value={`${weather?.windSpeed ?? "--"} km/jam`}
          />

          <InfoItem
            icon={<CloudRain size={18} />}
            label="Arah Angin"
            value={weather?.windDirection ?? "--"}
          />
        </div>

        {/* ================================================= */}
        {/* REKOMENDASI BMKG */}
        {/* ================================================= */}
        <div
          className={`
            mt-8
            rounded-2xl
            border
            p-4

            ${warning.border}
            ${warning.bg}
          `}
        >
          <div className="flex items-start gap-3">
            <TriangleAlert
              className={`mt-0.5 h-5 w-5 shrink-0 ${warning.color}`}
            />

            <div>
              <p className={`text-sm font-semibold ${warning.color}`}>
                Rekomendasi BMKG
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-300">
                {warning.message}
              </p>

              {error && (
                <p className="mt-2 text-xs text-yellow-300">
                  Data BMKG sementara tidak dapat diperbarui. Menampilkan data terakhir yang tersedia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}