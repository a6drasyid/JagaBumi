import { motion } from "framer-motion";
import { BrainCircuit, Clock3, CloudRain, Droplets, Mountain } from "lucide-react";

export default function TimelineItem({ time, rain, soil, tilt, fuzzy, status }) {
  const badge =
    status === "AMAN"
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : status === "WASPADA"
        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        : "bg-red-500/20 text-red-400 border border-red-500/30";

  const dotColor =
    status === "AMAN"
      ? "bg-emerald-400 shadow-emerald-500/50"
      : status === "WASPADA"
        ? "bg-yellow-400 shadow-yellow-500/50"
        : "bg-red-500 shadow-red-500/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-12 pb-10"
    >
      {/* Timeline Line */}
      <div className="absolute left-[14px] top-0 h-full w-[2px] bg-white/10"></div>

      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-2 h-7 w-7 rounded-full ${dotColor} shadow-lg border-4 border-[#050505]`}
      ></div>

      {/* Card */}
      <div className="glass-card  rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-xl transition-all duration-300 hover:shadow-emerald-500/10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-emerald-400" />
            <span className="font-medium text-gray-300">{time}</span>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${badge}`}
          >
            {status}
          </span>
        </div>

        {/* Sensor Data */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Rain */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="flex items-center gap-3">
              <CloudRain className="h-6 w-6 text-blue-400" />

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Curah Hujan</p>

                <h4 className="mt-1 text-lg font-bold">
                  {rain}
                  <span className="ml-1 text-sm text-gray-400">mm</span>
                </h4>
              </div>
            </div>
          </div>

          {/* Soil */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="flex items-center gap-3">
              <Droplets className="h-6 w-6 text-emerald-400" />

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Kelembaban</p>

                <h4 className="mt-1 text-lg font-bold">
                  {soil}
                  <span className="ml-1 text-sm text-gray-400">%</span>
                </h4>
              </div>
            </div>
          </div>

          {/* Tilt */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="flex items-center gap-3">
              <Mountain className="h-6 w-6 text-orange-400" />

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Kemiringan</p>

                <h4 className="mt-1 text-lg font-bold">
                  {tilt}
                  <span className="ml-1 text-sm text-gray-400">°</span>
                </h4>
              </div>
            </div>
          </div>

          {/* Fuzzy */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-6 w-6 text-violet-400" />

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Nilai Fuzzy</p>

                <h4 className="mt-1 text-lg font-bold">{fuzzy}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
