import { motion } from "framer-motion";
import { Activity, ArrowDown, ArrowRight, Radio, ShieldCheck } from "lucide-react";

import heroImage from "../assets/hero.png";

export default function Hero() {
  // =====================================================
  // SCROLL KE MONITORING
  // =====================================================
  const scrollToMonitoring = () => {
    const section = document.getElementById("monitoring");

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =====================================================
  // SCROLL KE SISTEM
  // =====================================================
  const scrollToSystem = () => {
    const section = document.getElementById("system");

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="hero"
      className="
        relative
        isolate

        flex
        min-h-[100svh]

        w-full
        max-w-full

        items-center

        overflow-hidden

        bg-[#050505]
      "
    >
      {/* =================================================
          BACKGROUND IMAGE
      ================================================= */}
      <div
        className="
          pointer-events-none

          absolute
          inset-0
          -z-30

          h-full
          min-h-full

          w-full

          overflow-hidden
        "
        aria-hidden="true"
      >
        <img
          src={heroImage}
          alt=""
          draggable="false"
          className="
            absolute
            inset-0

            block

            h-full
            min-h-full

            w-full
            min-w-full
            max-w-none

            select-none

            object-cover
            object-center
          "
        />
      </div>

      {/* =================================================
          BLACK OVERLAY
      ================================================= */}
      <div
        className="
          pointer-events-none

          absolute
          inset-0
          -z-20

          bg-black/20
        "
        aria-hidden="true"
      />

      {/* =================================================
          VERTICAL BLACK GRADIENT
      ================================================= */}
      <div
        className="
          pointer-events-none

          absolute
          inset-0
          -z-10

          bg-gradient-to-b
          from-black/30
          via-black/45
          to-[#050505]
        "
        aria-hidden="true"
      />

      {/* =================================================
          SIDE BLACK GRADIENT
      ================================================= */}
      <div
        className="
          pointer-events-none

          absolute
          inset-0
          -z-[5]

          bg-gradient-to-r
          from-black/20
          via-transparent
          to-black/20
        "
        aria-hidden="true"
      />

      {/* =================================================
          CONTENT CONTAINER
      ================================================= */}
      <div
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-[100svh]

          w-full
          max-w-7xl
          min-w-0

          items-center
          justify-center

          px-4

          pb-24
          pt-24

          sm:px-6
          sm:pb-28
          sm:pt-28

          md:pb-28
          md:pt-28

          lg:px-8
          lg:pb-28
          lg:pt-32
        "
      >
        <div
          className="
            mx-auto

            flex

            w-full
            max-w-5xl
            min-w-0

            flex-col

            items-center

            text-center
          "
        >
          {/* =================================================
              STATUS BADGE
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mb-5

              inline-flex
              max-w-full

              items-center
              justify-center

              gap-2

              rounded-full

              border
              border-white/10

              bg-black/20

              px-3
              py-2

              shadow-[0_8px_30px_rgba(0,0,0,0.15)]

              backdrop-blur-md

              sm:mb-6
              sm:px-4
            "
          >
            {/* STATUS DOT */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="
                  absolute
                  inline-flex

                  h-full
                  w-full

                  animate-ping

                  rounded-full

                  bg-emerald-400

                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex

                  h-2
                  w-2

                  rounded-full

                  bg-emerald-400
                "
              />
            </span>

            <span
              className="
                truncate

                text-[9px]
                font-medium
                uppercase

                tracking-[0.15em]

                text-white/80

                min-[375px]:text-[10px]

                sm:text-xs
                sm:tracking-[0.2em]
              "
            >
              Sistem Monitoring Aktif
            </span>

            <Radio
              className="
                hidden

                h-3.5
                w-3.5
                shrink-0

                text-emerald-400

                min-[375px]:block
              "
            />
          </motion.div>

          {/* =================================================
              HEADING

              Leading dan tracking dibuat lebih lega.
          ================================================= */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
            }}
            className="
              w-full
              max-w-5xl

              break-words

              text-[1.9rem]
              font-bold

              leading-[1.22]
              tracking-[-0.015em]

              text-white

              min-[360px]:text-[2.1rem]
              min-[360px]:leading-[1.22]

              min-[390px]:text-[2.3rem]

              sm:text-5xl
              sm:leading-[1.18]
              sm:tracking-[-0.02em]

              md:text-6xl
              md:leading-[1.16]

              lg:text-7xl
              lg:leading-[1.13]

              xl:text-[4.75rem]
              xl:leading-[1.12]
            "
          >
            Sistem Peringatan Dini
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-emerald-400">Longsor Berbasis IoT</span>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.16,
            }}
            className="
              mx-auto

              mt-6

              w-full
              max-w-[340px]

              break-words

              text-sm
              leading-7

              text-gray-300

              sm:mt-7
              sm:max-w-xl
              sm:text-base
              sm:leading-8

              md:max-w-2xl

              lg:text-lg
              lg:leading-8
            "
          >
            Monitoring kondisi lereng secara real-time menggunakan sensor IoT dan metode Fuzzy
            Mamdani untuk mendukung mitigasi bencana longsor.
          </motion.p>

          {/* =================================================
              FEATURE INFO
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.22,
            }}
            className="
              mt-6

              flex
              max-w-full
              flex-wrap

              items-center
              justify-center

              gap-x-4
              gap-y-2.5

              text-[10px]
              text-gray-300/80

              sm:mt-7
              sm:gap-x-6
              sm:gap-y-3
              sm:text-xs
            "
          >
            {/* REAL-TIME */}
            <div className="flex items-center gap-1.5">
              <Activity
                className="
                  h-3.5
                  w-3.5
                  shrink-0

                  text-emerald-400
                "
              />

              <span>Real-time</span>
            </div>

            {/* FUZZY MAMDANI */}
            <div className="flex items-center gap-1.5">
              <ShieldCheck
                className="
                  h-3.5
                  w-3.5
                  shrink-0

                  text-emerald-400
                "
              />

              <span>Fuzzy Mamdani</span>
            </div>

            {/* IOT */}
            <div className="flex items-center gap-1.5">
              <Radio
                className="
                  h-3.5
                  w-3.5
                  shrink-0

                  text-emerald-400
                "
              />

              <span>IoT Monitoring</span>
            </div>
          </motion.div>

          {/* =================================================
              ACTION BUTTONS

              MOBILE:
              - Kedua tombol sama panjang.
              - Maksimal 250px agar tidak terlalu lebar.

              TABLET / DESKTOP:
              - Kedua tombol tepat 190px.
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.28,
            }}
            className="
              mt-8

              flex

              w-full
              max-w-[250px]

              flex-col

              items-center
              justify-center

              gap-3

              sm:mt-10
              sm:max-w-none
              sm:flex-row
              sm:gap-3
            "
          >
            {/* =================================================
                MONITORING BUTTON
            ================================================= */}
            <button
              type="button"
              onClick={scrollToMonitoring}
              className="
                group

                inline-flex

                min-h-11
                w-full

                items-center
                justify-center

                gap-2

                rounded-full

                bg-emerald-400

                px-4
                py-2.5

                text-sm
                font-semibold

                text-[#03130c]

                shadow-[0_8px_30px_rgba(0,0,0,0.2)]

                transition-all
                duration-300

                hover:bg-emerald-300

                active:scale-[0.98]

                sm:h-12
                sm:w-[190px]
                sm:flex-none
              "
            >
              <span className="whitespace-nowrap">Monitoring Real-time</span>

              <ArrowRight
                className="
                  h-4
                  w-4
                  shrink-0

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </button>

            {/* =================================================
                SYSTEM BUTTON
            ================================================= */}
            <button
              type="button"
              onClick={scrollToSystem}
              className="
                group

                inline-flex

                min-h-11
                w-full

                items-center
                justify-center

                gap-2

                rounded-full

                border
                border-white/15

                bg-black/20

                px-4
                py-2.5

                text-sm
                font-medium

                text-white

                shadow-[0_8px_30px_rgba(0,0,0,0.15)]

                backdrop-blur-md

                transition-all
                duration-300

                hover:border-white/30
                hover:bg-black/30

                active:scale-[0.98]

                sm:h-12
                sm:w-[190px]
                sm:flex-none
              "
            >
              <span className="whitespace-nowrap">Pelajari Sistem</span>

              <ArrowDown
                className="
                  h-4
                  w-4
                  shrink-0

                  text-gray-300

                  transition-transform
                  duration-300

                  group-hover:translate-y-0.5
                "
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}
      <motion.button
        type="button"
        onClick={scrollToMonitoring}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
        className="
          absolute

          bottom-4
          left-1/2
          z-20

          flex

          -translate-x-1/2

          flex-col
          items-center

          sm:bottom-6

          lg:bottom-7
        "
        aria-label="Scroll ke data monitoring"
      >
        <span
          className="
            whitespace-nowrap

            text-[8px]
            font-medium
            uppercase

            tracking-[0.28em]

            text-gray-400

            sm:text-[9px]
            sm:tracking-[0.32em]
          "
        >
          Scroll untuk data
        </span>

        <div
          className="
            relative

            mt-3

            h-9
            w-px

            overflow-hidden

            bg-white/15

            sm:h-11
          "
        >
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-0
              top-0

              h-1/2
              w-full

              bg-gradient-to-b
              from-transparent
              via-white/80
              to-transparent
            "
          />
        </div>
      </motion.button>
    </section>
  );
}
