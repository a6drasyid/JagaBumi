import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  CloudFog,
  CloudLightning,
  Wind,
  Droplets,
  ThermometerSun,
  Navigation,
  MapPin,
  Link2,
  ExternalLink,
} from "lucide-react";

import useBMKG from "../hooks/useBMKG";

// ======================================================
// KONVERSI ARAH ANGIN BMKG
// ======================================================
const convertWindDirection = (direction) => {
  if (!direction) return "Tidak tersedia";

  const dir = String(direction).toUpperCase().trim();

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

  return directions[dir] || direction;
};

// ======================================================
// ICON CUACA BMKG
// ======================================================
function WeatherIcon({ weather }) {
  const condition = (weather || "").toLowerCase();

  const iconClass =
    "h-14 w-14 lg:h-16 lg:w-16 transition-all duration-300";

  if (condition.includes("cerah berawan")) {
    return (
      <CloudSun
        className={`${iconClass} text-yellow-300 drop-shadow-[0_0_18px_rgba(253,224,71,0.35)]`}
      />
    );
  }

  if (condition.includes("cerah")) {
    return (
      <Sun
        className={`${iconClass} text-yellow-300 drop-shadow-[0_0_18px_rgba(253,224,71,0.35)]`}
      />
    );
  }

  if (condition.includes("kabut")) {
    return (
      <CloudFog
        className={`${iconClass} text-cyan-300 drop-shadow-[0_0_18px_rgba(103,232,249,0.35)]`}
      />
    );
  }

  if (condition.includes("petir")) {
    return (
      <CloudLightning
        className={`${iconClass} text-violet-300 drop-shadow-[0_0_18px_rgba(196,181,253,0.35)]`}
      />
    );
  }

  if (condition.includes("hujan")) {
    return (
      <CloudRain
        className={`${iconClass} text-sky-400 drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]`}
      />
    );
  }

  if (condition.includes("berawan")) {
    return (
      <Cloud
        className={`${iconClass} text-slate-300 drop-shadow-[0_0_18px_rgba(226,232,240,0.35)]`}
      />
    );
  }

  return <Cloud className={`${iconClass} text-gray-300`} />;
}

// ======================================================
// ITEM INFORMASI
// ======================================================
function InfoItem({ icon, label, value, color }) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        px-4 py-3
        transition-all duration-300
        hover:border-emerald-500/20
      "
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex h-11 w-11 items-center justify-center
            rounded-xl
            ${color}
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-400">{label}</p>

          <p className="mt-1 text-sm font-semibold text-white lg:text-base">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================
export default function WeatherBMKGCard() {
  const { weather, loading, error } = useBMKG();

  if (loading) {
    return (
      <div className="glass-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
        <div className="animate-pulse space-y-6">
          <div className="h-3 w-40 rounded-full bg-white/10" />
          <div className="h-10 w-72 rounded-xl bg-white/10" />

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-20 rounded-2xl bg-white/10"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const temperature = weather?.temperature ?? "--";
  const humidity = weather?.humidity ?? "--";
  const windSpeed = weather?.windSpeed ?? "--";
  const windDirection = weather?.windDirection;
  const condition = weather?.weather ?? "Tidak tersedia";

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
        backdrop-blur-xl
        p-6
        shadow-2xl
        lg:p-8
      "
    >
      {/* Glow Emerald */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-400/10 blur-[120px]" />

      <div className="relative z-10">

        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-400">
              BMKG • Prakiraan Cuaca
            </p>

            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Kondisi Cuaca Pusuk Sembalun
            </h3>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Pusuk Sembalun, Lombok Timur, NTB</span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Update BMKG •{" "}
              {weather?.localTime
                ? new Date(weather.localTime).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "--"}
            </p>
          </div>

          {/* Icon Cuaca (HANYA SATU) */}
          <div
            className="
              flex h-20 w-20 items-center justify-center
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
            "
          >
            <WeatherIcon weather={condition} />
          </div>
        </div>

        {/* ================= SUHU ================= */}
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* KIRI */}
          <div className="flex items-center gap-5">

            <h2 className="text-6xl font-bold leading-none tracking-tight text-white lg:text-7xl">
              {temperature}°
            </h2>

            <div>
              <p className="text-sm text-gray-400">
                Kondisi saat ini
              </p>

              <p className="mt-1 text-2xl font-semibold text-white">
                {condition}
              </p>

              <p className="mt-2 text-sm font-medium text-emerald-400">
                Data langsung dari BMKG
              </p>
            </div>
          </div>

          {/* KANAN */}
          <a
            href="https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-emerald-500/20
              bg-emerald-500/10
              px-4 py-2.5
              text-sm font-medium text-emerald-400
              transition-all duration-300
              hover:bg-emerald-500/20
              hover:border-emerald-400/40
            "
          >
            <Link2 size={16} />
            BMKG Live
            <ExternalLink size={15} />
          </a>
        </div>

        {/* ================= GRID INFO ================= */}
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <InfoItem
            label="Suhu"
            value={`${temperature}°C`}
            color="bg-red-500/10 text-red-400 border border-red-500/20"
            icon={<ThermometerSun size={20} />}
          />

          <InfoItem
            label="Kelembapan"
            value={`${humidity}%`}
            color="bg-sky-500/10 text-sky-400 border border-sky-500/20"
            icon={<Droplets size={20} />}
          />

          <InfoItem
            label="Kecepatan angin"
            value={`${windSpeed} km/jam`}
            color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            icon={<Wind size={20} />}
          />

          <InfoItem
            label="Arah angin"
            value={convertWindDirection(windDirection)}
            color="bg-violet-500/10 text-violet-400 border border-violet-500/20"
            icon={<Navigation size={20} />}
          />

        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
            <p className="text-sm text-yellow-300">
              Gagal memperbarui data BMKG. Menampilkan data terakhir yang tersedia.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}