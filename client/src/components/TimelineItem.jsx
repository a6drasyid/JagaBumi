import { motion } from "framer-motion";

import { BrainCircuit, Clock3, CloudRain, Droplets, Mountain } from "lucide-react";

export default function TimelineItem({ time, rain, soil, tilt, fuzzy, status }) {
  // =====================================================
  // STATUS BADGE
  // =====================================================
  const badge =
    status === "AMAN"
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : status === "WASPADA"
        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        : "bg-red-500/20 text-red-400 border border-red-500/30";

  // =====================================================
  // TIMELINE DOT
  // =====================================================
  const dotColor =
    status === "AMAN"
      ? "bg-emerald-400 shadow-emerald-500/50"
      : status === "WASPADA"
        ? "bg-yellow-400 shadow-yellow-500/50"
        : "bg-red-500 shadow-red-500/50";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative

        w-full
        min-w-0

        pb-6
        pl-7

        min-[375px]:pl-8

        sm:pb-8
        sm:pl-10

        lg:pb-10
        lg:pl-12
      "
    >
      {/* =================================================
          TIMELINE LINE
      ================================================= */}
      <div
        className="
          absolute

          left-[7px]
          top-0

          h-full
          w-[2px]

          bg-white/10

          min-[375px]:left-[8px]

          sm:left-[10px]

          lg:left-[14px]
        "
      />

      {/* =================================================
          TIMELINE DOT
      ================================================= */}
      <div
        className={`
          absolute

          left-0
          top-2

          h-4
          w-4

          rounded-full

          border-[3px]
          border-[#050505]

          shadow-lg

          min-[375px]:h-[18px]
          min-[375px]:w-[18px]

          sm:h-5
          sm:w-5

          lg:h-7
          lg:w-7
          lg:border-4

          ${dotColor}
        `}
      />

      {/* =================================================
          CARD
      ================================================= */}
      <div
        className="
          glass-card

          w-full
          min-w-0

          overflow-hidden

          rounded-2xl

          border
          border-white/10

          bg-white/5
          backdrop-blur-xl

          p-3

          shadow-xl

          transition-all
          duration-300

          hover:shadow-emerald-500/10

          min-[375px]:p-3.5

          sm:rounded-3xl
          sm:p-5

          lg:p-7
      "
      >
        {/* =================================================
            HEADER
        ================================================= */}
        <div
          className="
            flex
            w-full
            min-w-0

            flex-col

            gap-2.5

            sm:gap-3

            md:flex-row
            md:items-center
            md:justify-between

            lg:gap-4
          "
        >
          {/* =================================================
              TIME
          ================================================= */}
          <div
            className="
              flex
              min-w-0

              items-start

              gap-2

              sm:items-center
              sm:gap-2.5

              lg:gap-3
            "
          >
            <Clock3
              className="
                mt-[1px]

                h-3.5
                w-3.5
                shrink-0

                text-emerald-400

                min-[375px]:h-4
                min-[375px]:w-4

                sm:mt-0

                lg:h-5
                lg:w-5
              "
            />

            <span
              className="
                min-w-0

                break-words

                text-[9px]
                font-medium
                leading-4

                text-gray-300

                min-[360px]:text-[10px]

                min-[375px]:text-[11px]

                sm:text-xs
                sm:leading-5

                lg:text-base
              "
            >
              {time}
            </span>
          </div>

          {/* =================================================
              STATUS
          ================================================= */}
          <span
            className={`
              inline-flex
              w-fit
              shrink-0

              items-center
              justify-center

              rounded-full

              px-2
              py-1

              text-[8px]
              font-semibold
              leading-none

              min-[375px]:px-2.5
              min-[375px]:text-[9px]

              sm:px-3
              sm:py-1.5
              sm:text-xs

              lg:px-4
              lg:py-2
              lg:text-sm

              ${badge}
            `}
          >
            {status}
          </span>
        </div>

        {/* =================================================
            SENSOR DATA

            MOBILE  : 2 kolom
            TABLET  : 2 kolom
            DESKTOP : tetap 4 kolom pada XL
        ================================================= */}
        <div
          className="
            mt-4

            grid
            grid-cols-2

            gap-2

            min-[375px]:gap-2.5

            sm:mt-6
            sm:gap-4

            md:grid-cols-2

            lg:mt-8
            lg:gap-5

            xl:grid-cols-4
          "
        >
          {/* =================================================
              RAIN
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

              transition

              hover:bg-white/10

              min-[375px]:p-3

              sm:rounded-2xl
              sm:p-4
            "
          >
            <div
              className="
                flex
                min-w-0

                items-center

                gap-2

                sm:gap-3
              "
            >
              <CloudRain
                className="
                  h-4
                  w-4
                  shrink-0

                  text-blue-400

                  min-[375px]:h-[18px]
                  min-[375px]:w-[18px]

                  sm:h-5
                  sm:w-5

                  lg:h-6
                  lg:w-6
                "
              />

              <div className="min-w-0">
                <p
                  className="
                    truncate

                    text-[7px]
                    uppercase
                    tracking-wide

                    text-gray-500

                    min-[375px]:text-[8px]

                    sm:text-[10px]

                    lg:text-xs
                  "
                >
                  Curah Hujan
                </p>

                <h4
                  className="
                    mt-0.5

                    whitespace-nowrap

                    text-sm
                    font-bold

                    text-white

                    min-[375px]:text-base

                    sm:mt-1

                    lg:text-lg
                  "
                >
                  {rain}

                  <span
                    className="
                      ml-0.5

                      text-[8px]
                      font-normal
                      text-gray-400

                      min-[375px]:text-[9px]

                      sm:ml-1
                      sm:text-xs

                      lg:text-sm
                    "
                  >
                    mm
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* =================================================
              SOIL
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

              transition

              hover:bg-white/10

              min-[375px]:p-3

              sm:rounded-2xl
              sm:p-4
            "
          >
            <div
              className="
                flex
                min-w-0

                items-center

                gap-2

                sm:gap-3
              "
            >
              <Droplets
                className="
                  h-4
                  w-4
                  shrink-0

                  text-emerald-400

                  min-[375px]:h-[18px]
                  min-[375px]:w-[18px]

                  sm:h-5
                  sm:w-5

                  lg:h-6
                  lg:w-6
                "
              />

              <div className="min-w-0">
                <p
                  className="
                    truncate

                    text-[7px]
                    uppercase
                    tracking-wide

                    text-gray-500

                    min-[375px]:text-[8px]

                    sm:text-[10px]

                    lg:text-xs
                  "
                >
                  Kelembaban
                </p>

                <h4
                  className="
                    mt-0.5

                    whitespace-nowrap

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:mt-1

                    lg:text-lg
                  "
                >
                  {soil}

                  <span
                    className="
                      ml-0.5

                      text-[8px]
                      font-normal
                      text-gray-400

                      min-[375px]:text-[9px]

                      sm:ml-1
                      sm:text-xs

                      lg:text-sm
                    "
                  >
                    %
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* =================================================
              TILT
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

              transition

              hover:bg-white/10

              min-[375px]:p-3

              sm:rounded-2xl
              sm:p-4
            "
          >
            <div
              className="
                flex
                min-w-0

                items-center

                gap-2

                sm:gap-3
              "
            >
              <Mountain
                className="
                  h-4
                  w-4
                  shrink-0

                  text-orange-400

                  min-[375px]:h-[18px]
                  min-[375px]:w-[18px]

                  sm:h-5
                  sm:w-5

                  lg:h-6
                  lg:w-6
                "
              />

              <div className="min-w-0">
                <p
                  className="
                    truncate

                    text-[7px]
                    uppercase
                    tracking-wide

                    text-gray-500

                    min-[375px]:text-[8px]

                    sm:text-[10px]

                    lg:text-xs
                  "
                >
                  Kemiringan
                </p>

                <h4
                  className="
                    mt-0.5

                    whitespace-nowrap

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:mt-1

                    lg:text-lg
                  "
                >
                  {tilt}

                  <span
                    className="
                      ml-0.5

                      text-[8px]
                      font-normal
                      text-gray-400

                      min-[375px]:text-[9px]

                      sm:ml-1
                      sm:text-xs

                      lg:text-sm
                    "
                  >
                    °
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* =================================================
              FUZZY
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

              transition

              hover:bg-white/10

              min-[375px]:p-3

              sm:rounded-2xl
              sm:p-4
            "
          >
            <div
              className="
                flex
                min-w-0

                items-center

                gap-2

                sm:gap-3
              "
            >
              <BrainCircuit
                className="
                  h-4
                  w-4
                  shrink-0

                  text-violet-400

                  min-[375px]:h-[18px]
                  min-[375px]:w-[18px]

                  sm:h-5
                  sm:w-5

                  lg:h-6
                  lg:w-6
                "
              />

              <div className="min-w-0">
                <p
                  className="
                    truncate

                    text-[7px]
                    uppercase
                    tracking-wide

                    text-gray-500

                    min-[375px]:text-[8px]

                    sm:text-[10px]

                    lg:text-xs
                  "
                >
                  Nilai Fuzzy
                </p>

                <h4
                  className="
                    mt-0.5

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:mt-1

                    lg:text-lg
                  "
                >
                  {fuzzy}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
