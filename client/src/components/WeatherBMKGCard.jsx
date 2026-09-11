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
// KONVERSI ARAH ANGIN BMKG KE BAHASA INDONESIA
// =====================================================
const convertWindDirection = (direction = "") => {
  const directions = {
    N: "Utara",
    NNE: "Utara Timur Laut",
    NE: "Timur Laut",
    ENE: "Timur Timur Laut",

    E: "Timur",
    ESE: "Timur Tenggara",
    SE: "Tenggara",
    SSE: "Selatan Tenggara",

    S: "Selatan",
    SSW: "Selatan Barat Daya",
    SW: "Barat Daya",
    WSW: "Barat Barat Daya",

    W: "Barat",
    WNW: "Barat Barat Laut",
    NW: "Barat Laut",
    NNW: "Utara Barat Laut",
  };

  return directions[direction] || direction || "Tidak diketahui";
};

// =====================================================
// ICON CUACA
// =====================================================
function WeatherIcon({ weather }) {
  const text = (weather || "").toLowerCase();

  if (text.includes("hujan")) {
    return <CloudRain className="h-9 w-9 text-sky-400 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />;
  }

  if (text.includes("berawan") || text.includes("kabut")) {
    return <Cloud className="h-9 w-9 text-gray-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />;
  }

  return <Sun className="h-9 w-9 text-yellow-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />;
}

// =====================================================
// STATUS BMKG
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

  if (weather.includes("ringan") || weather.includes("sedang")) {
    return {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      message:
        "Masih terdapat potensi hujan. Pantau kondisi lereng dan sistem peringatan dini secara berkala.",
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
// ITEM INFORMASI
// =====================================================
function InfoItem({ icon, label, value }) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        px-4 py-3
      "
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-medium text-gray-400">{label}</p>

          <p className="mt-0.5 text-sm font-semibold text-white sm:text-base">
            {value}
          </p>
        </div>
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
      <div className="glass-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
        <div className="animate-pulse space-y-5">
          <div className="h-3 w-44 rounded-full bg-white/10" />
          <div className="h-9 w-72 rounded-xl bg-white/10" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const warning = getWarning(weather?.weather);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
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
        p-6
        backdrop-blur-xl
        shadow-2xl

        lg:p-8
      "
    >
      {/* Glow kiri */}
      <div className="pointer-events-none absolute -left-28 -top-24 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Glow kanan */}
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[260px] w-[260px] rounded-full bg-green-400/10 blur-[120px]" />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 sm:text-xs">
              BMKG • Prakiraan Cuaca
            </p>

            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Kondisi Cuaca Pusuk Sembalun
            </h3>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Pusuk Sembalun, Lombok Timur, NTB</span>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Update BMKG •{" "}
              {weather?.localTime
                ? new Date(weather.localTime).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <WeatherIcon weather={weather?.weather} />
          </div>
        </div>

        {/* SUHU */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-base text-gray-400">Kondisi saat ini</p>

            <h2 className="mt-2 text-6xl font-bold leading-none tracking-tight text-white lg:text-7xl">
              {weather?.temperature ?? "--"}°
            </h2>

            <p className="mt-3 text-2xl font-semibold text-emerald-300">
              {weather?.weather || "Tidak tersedia"}
            </p>
          </div>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
            BMKG Live
          </div>
        </div>

        {/* GRID INFORMASI */}
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
            label="Kecepatan angin"
            value={`${weather?.windSpeed ?? "--"} km/jam`}
          />

          <InfoItem
            icon={<CloudRain size={18} />}
            label="Arah angin"
            value={convertWindDirection(weather?.windDirection)}
          />
        </div>

        {/* ALERT */}
        <div
          className={`mt-8 rounded-2xl border p-4 ${warning.border} ${warning.bg}`}
        >
          <div className="flex items-start gap-3">
            <TriangleAlert className={`mt-1 h-5 w-5 ${warning.color}`} />

            <div>
              <p className={`text-sm font-semibold ${warning.color}`}>
                Rekomendasi BMKG
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-300">
                {warning.message}
              </p>

              {error && (
                <p className="mt-2 text-xs text-yellow-300">
                  Data BMKG tidak dapat diperbarui. Menampilkan data terakhir yang tersedia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}