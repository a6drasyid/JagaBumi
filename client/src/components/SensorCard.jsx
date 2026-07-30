import { motion } from "framer-motion";

export default function SensorCard({ image, title, description, specs }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{title}</h3>

        <p className="mt-4 text-gray-400 leading-relaxed">{description}</p>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-emerald-400 font-semibold">Spesifikasi</p>

          <p className="text-gray-300 mt-2">{specs}</p>
        </div>
      </div>
    </motion.div>
  );
}
