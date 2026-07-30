import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Emerald */}
      <motion.div
        animate={{
          x: [-120, 180, -60, -120],
          y: [-80, 140, -120, -80],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        top-[-15%]
        left-[-10%]
        h-[900px]
        w-[900px]
        rounded-full
        bg-emerald-500/20
        blur-[180px]"
      />

      {/* Cyan */}
      <motion.div
        animate={{
          x: [100, -180, 120, 100],
          y: [60, -120, 80, 60],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        bottom-[-20%]
        right-[-10%]
        h-[850px]
        w-[850px]
        rounded-full
        bg-cyan-500/15
        blur-[220px]"
      />

      {/* Blue */}
      <motion.div
        animate={{
          x: [0, 180, -100, 0],
          y: [120, -80, 60, 120],
          scale: [1, 1.25, 1, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute
        left-1/2
        top-1/3
        h-[700px]
        w-[700px]
        -translate-x-1/2
        rounded-full
        bg-sky-500/10
        blur-[200px]"
      />

      {/* Purple */}
      <motion.div
        animate={{
          x: [-150, 150, -150],
          y: [100, -120, 100],
          rotate: [0, 25, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute
        bottom-0
        left-1/3
        h-[600px]
        w-[600px]
        rounded-full
        bg-violet-500/10
        blur-[220px]"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,5,.45)_70%,rgba(5,5,5,.95)_100%)]" />
    </div>
  );
}
