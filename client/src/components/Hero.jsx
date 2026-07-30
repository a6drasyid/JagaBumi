import { motion } from "framer-motion";
import heroImage from "../assets/hero.png";
import { getLenis } from "../hooks/useLenis";

export default function Hero() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(section);
    } else {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.img
        src={heroImage}
        alt=""
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Sistem Peringatan Dini Longsor
          <span className="block text-emerald-400">Berbasis IoT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Monitoring kondisi lereng secara real-time menggunakan sensor IoT dan metode Fuzzy Mamdani
          untuk mendukung mitigasi bencana longsor.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center gap-5 flex-wrap"
        >
          <button
            onClick={() => scrollToSection("monitoring")}
            className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 transition duration-300"
          >
            Monitoring Real-time
          </button>

          <button
            onClick={() => scrollToSection("system")}
            className="px-8 py-4 rounded-full border border-white/20 backdrop-blur-md hover:bg-white/10 transition duration-300"
          >
            Pelajari Sistem
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/60">
          Scroll Untuk Data
        </span>

        <motion.div
          animate={{
            scaleY: [1, 1.4, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-16 w-px rounded-full bg-gradient-to-b from-emerald-300 via-emerald-400 to-transparent shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        />
      </motion.div>
    </section>
  );
}
