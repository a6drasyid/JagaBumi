import { motion } from "framer-motion";

export default function FloatingGlow() {
  return (
    <>
      <motion.div
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="fixed
        top-32
        right-32
        w-40
        h-40
        bg-emerald-500/20
        blur-3xl
        rounded-full
        -z-40"
      />

      <motion.div
        animate={{
          y: [0, 60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
        }}
        className="fixed
        bottom-40
        left-20
        w-56
        h-56
        bg-cyan-400/10
        blur-3xl
        rounded-full
        -z-40"
      />
    </>
  );
}
