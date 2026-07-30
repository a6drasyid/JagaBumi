import { motion } from "framer-motion";
import useSensor from "../hooks/useSensor";

export default function StatusCard() {
  const { sensor } = useSensor();

  const status = sensor?.status ?? "OFFLINE";
  const fuzzy = sensor?.fuzzy_value ?? 0;
  const lastUpdate = sensor?.created_at
    ? new Date(sensor.created_at).toLocaleString("id-ID")
    : "--";

  const statusColor =
    status === "AMAN"
      ? "text-emerald-400"
      : status === "WASPADA"
        ? "text-yellow-400"
        : status === "BAHAYA"
          ? "text-red-500"
          : "text-gray-400";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className=" glass-card rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 h-full"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${
            status === "AMAN"
              ? "bg-emerald-400"
              : status === "WASPADA"
                ? "bg-yellow-400"
                : status === "BAHAYA"
                  ? "bg-red-500"
                  : "bg-gray-400"
          }`}
        />
        <span className="text-gray-400">LIVE</span>
      </div>

      <h2 className="mt-6 text-gray-400">Status Saat Ini</h2>

      <h1 className={`text-6xl font-bold mt-2 ${statusColor}`}>{status}</h1>

      <div className="mt-10">
        <p className="text-gray-400">Nilai Fuzzy</p>

        <h2 className="text-4xl font-bold">{fuzzy}</h2>
      </div>

      <div className="mt-10">
        <p className="text-gray-400">Indeks Risiko</p>

        <div className="w-full bg-white/10 rounded-full h-4 mt-4">
          <div
            className={`h-4 rounded-full transition-all duration-700 ${
              status === "AMAN"
                ? "bg-emerald-400"
                : status === "WASPADA"
                  ? "bg-yellow-400"
                  : status === "BAHAYA"
                    ? "bg-red-500"
                    : "bg-gray-400"
            }`}
            style={{ width: `${Math.min(fuzzy, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-400">Last Update</p>

        <p className="mt-2">{lastUpdate}</p>
      </div>
    </motion.div>
  );
}
