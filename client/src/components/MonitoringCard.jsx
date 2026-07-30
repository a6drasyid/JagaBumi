import { motion } from "framer-motion";

export default function MonitoringCard({
  icon: Icon,
  title,
  value,
  unit,
  color,
  iconBg,
  iconBorder,
  iconColor,
  status,
  category,
}) {
  const statusColor =
    value === "AMAN"
      ? "text-emerald-400"
      : value === "WASPADA"
        ? "text-yellow-400"
        : value === "BAHAYA"
          ? "text-red-500"
          : "text-white";

  const categoryStyle = ["RENDAH", "KERING", "LANDAI"].includes(category)
    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
    : ["SEDANG", "LEMBAB", "MIRING"].includes(category)
      ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
      : ["TINGGI", "BASAH", "CURAM"].includes(category)
        ? "bg-red-500/10 border border-red-500/20 text-red-500"
        : "bg-white/10 text-white";
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.3 }}
      className="glass-card  relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
    >
      {/* Live */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full animate-pulse ${color ?? "bg-gray-400"}`} />
        <span className="text-xs text-gray-400">LIVE</span>
      </div>

      <div
        className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${iconBg} ${iconBorder}`}
      >
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>

      <p className="text-gray-400">{title}</p>

      <h2 className="mt-3 flex items-center justify-between">
        <div className="flex items-end gap-2">
          {value !== undefined && value !== null ? (
            <>
              <span
                className={`text-5xl font-bold ${
                  title === "Status Sistem" ? statusColor : "text-white"
                }`}
              >
                {value}
              </span>
              {unit && <span className="text-lg text-gray-500">{unit}</span>}
            </>
          ) : (
            <>
              <div className="h-10 w-24 rounded-lg bg-white/10 animate-pulse"></div>
              {unit && <span className="text-lg text-gray-500">{unit}</span>}
            </>
          )}
        </div>

        {category && (
          <div className={`inline-flex rounded-full px-4 py-2 text-sm ${categoryStyle}`}>
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </div>
        )}
      </h2>

      <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-gray-400">
        {status ?? "Menunggu data..."}
      </div>
    </motion.div>
  );
}
