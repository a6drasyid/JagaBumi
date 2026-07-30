import { motion } from "framer-motion";

export default function StepCard({ icon, title, description }) {
  const Icon = icon;

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{ duration: 0.3 }}
      className="relative min-w-[220px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-xl"
    >
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
          <Icon className="h-8 w-8 text-emerald-400" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </motion.div>
  );
}
