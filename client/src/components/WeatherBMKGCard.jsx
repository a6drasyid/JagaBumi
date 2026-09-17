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
// EMOJI PRAKIRAAN 24 JAM
// ======================================================
const weatherEmoji = (weather) => {
  const condition = (weather || "").toLowerCase();

  if (condition.includes("cerah berawan")) return "🌤️";
  if (condition.includes("cerah")) return "☀️";
  if (condition.includes("kabut")) return "🌫️";
  if (condition.includes("petir")) return "⛈️";
  if (condition.includes("hujan")) return "🌧️";
  if (condition.includes("berawan")) return "☁️";

  return "☁️";
};

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
              <div key={index} className="h-20 rounded-2xl bg-white/10" />
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

  // ======================================================
  // PRAKIRAAN BMKG 24 JAM (DATA API BMKG)
  // ======================================================
// ======================================================
// UBAH DATA BMKG MENJADI 24 JAM (PER JAM)
// ======================================================
const forecast24h = (() => {
  const data = weather?.forecast24h || [];
  const hourly = [];

  data.forEach((item) => {
    // item.time format "08.00"
    const [hour] = String(item.time || "00.00")
      .split(".")
      .map(Number);

    for (let i = 0; i < 3; i++) {
      const nextHour = (hour + i) % 24;

      hourly.push({
        time: `${String(nextHour).padStart(2, "0")}.00`,
        weather: item.weather,
        temp: item.temp,
        humidity: item.humidity,
        windSpeed: item.windSpeed,
        windDirection: item.windDirection,
      });
    }
  });

  // Selalu tampilkan maksimal 24 jam
  return hourly.slice(0, 24);
})();

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
          <div className="flex items-center gap-5">
            <h2 className="text-6xl font-bold leading-none tracking-tight text-white lg:text-7xl">
              {temperature}°
            </h2>

            <div>
              <p className="text-sm text-gray-400">Kondisi saat ini</p>

              <p className="mt-1 text-2xl font-semibold text-white">
                {condition}
              </p>

              <p className="mt-2 text-sm font-medium text-emerald-400">
                Data langsung dari BMKG
              </p>
            </div>
          </div>

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

{/* ================= PRAKIRAAN CUACA 24 JAM ================= */}
<div className="mt-8 border-t border-white/10 pt-6">
  <div className="mb-5 flex items-center justify-between">
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
        BMKG • PRAKIRAAN CUACA 24 JAM
      </p>

      <h4 className="mt-1 text-lg font-semibold text-white">
        Prakiraan Cuaca Per Jam
      </h4>

      <p className="mt-1 text-xs text-gray-500">
        Geser ke kanan untuk melihat prakiraan 24 jam berikutnya.
      </p>
    </div>

    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
      24 Jam
    </span>
  </div>

  {/* Horizontal Scroll */}
  <div
    className="
      weather-scroll flex gap-3 pb-4 snap-x snap-mandatory
    "
  >
    {forecast24h.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.015 }}
        className="
          snap-start
          shrink-0

          w-[108px]
          rounded-2xl
          border border-white/10
          bg-white/[0.05]
          backdrop-blur-xl

          p-3
          text-center

          transition-all duration-300
          hover:border-emerald-400/30
          hover:bg-emerald-500/[0.06]
        "
      >
        {/* Jam */}
        <p className="text-[11px] font-medium text-gray-400">
          {item.time}
        </p>

        {/* Icon */}
        <div className="my-3 text-[32px]">
          {weatherEmoji(item.weather)}
        </div>

        {/* Kondisi */}
        <p className="min-h-[30px] text-[11px] font-medium leading-4 text-white">
          {item.weather}
        </p>

        {/* Suhu */}
        <p className="mt-3 text-lg font-bold text-emerald-300">
          {item.temp}°
        </p>

        {/* Kelembapan */}
        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-sky-300">
          <Droplets size={11} />
          <span>{item.humidity}%</span>
        </div>

        {/* Angin */}
        <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-gray-400">
          <Wind size={11} />
          <span>{item.windSpeed}</span>
        </div>
      </motion.div>
    ))}
  </div>

  <p className="mt-3 text-center text-xs text-gray-500">
    Prakiraan cuaca BMKG untuk 24 jam ke depan di wilayah Sembalun, Lombok Timur.
  </p>
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