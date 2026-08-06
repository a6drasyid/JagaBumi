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
        : status === "BAHAYA"
          ? "bg-red-500/20 text-red-400 border border-red-500/30"
          : "bg-gray-500/20 text-gray-400 border border-gray-500/30";

  // =====================================================
  // TIMELINE DOT
  // =====================================================
  const dotColor =
    status === "AMAN"
      ? "bg-emerald-400"
      : status === "WASPADA"
        ? "bg-yellow-400"
        : status === "BAHAYA"
          ? "bg-red-500"
          : "bg-gray-400";

  return (
    <div
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
          w-px

          bg-white/10

          min-[375px]:left-[8px]

          sm:left-[10px]
          sm:w-[2px]

          lg:left-[14px]
        "
      />

      {/* =================================================
          TIMELINE DOT
      ================================================= */}
      <div
        className={`
          absolute
          left-[2px]
          top-2

          h-3
          w-3

          rounded-full

          border-2
          border-[#050505]

          min-[375px]:h-3.5
          min-[375px]:w-3.5

          sm:left-[3px]
          sm:h-4
          sm:w-4

          lg:left-0
          lg:h-7
          lg:w-7
          lg:border-4

          ${dotColor}
        `}
      />

      {/* =================================================
          MAIN CARD
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

          p-3

          shadow-xl

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
            min-w-0

            flex-col

            gap-3

            sm:gap-4

            md:flex-row
            md:items-center
            md:justify-between
        "
        >
          {/* DATE / TIME */}
          <div
            className="
              flex
              min-w-0
              items-center

              gap-2

              sm:gap-3
          "
          >
            <Clock3
              className="
                h-4
                w-4
                shrink-0

                text-emerald-400

                sm:h-5
                sm:w-5
              "
            />

            <span
              className="
                min-w-0
                break-words

                text-[10px]
                font-medium
                leading-4
                text-gray-300

                min-[375px]:text-[11px]

                sm:text-sm
                sm:leading-5

                lg:text-base
              "
            >
              {time}
            </span>
          </div>

          {/* STATUS */}
          <span
            className={`
              inline-flex
              w-fit
              shrink-0

              items-center
              justify-center

              rounded-full

              px-2.5
              py-1

              text-[8px]
              font-semibold
              leading-none

              min-[375px]:px-3
              min-[375px]:text-[9px]

              sm:px-4
              sm:py-2
              sm:text-sm

              ${badge}
            `}
          >
            {status}
          </span>
        </div>

        {/* =================================================
            SENSOR DATA

            MOBILE  : 2 KOLOM
            TABLET  : 2 KOLOM
            DESKTOP : 4 KOLOM
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

            lg:mt-8

            xl:grid-cols-4
            xl:gap-5
          "
        >
          {/* =================================================
              CURAH HUJAN
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

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

                  sm:h-6
                  sm:w-6
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

                    sm:text-xs
                  "
                >
                  Curah Hujan
                </p>

                <h4
                  className="
                    mt-1

                    truncate

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:text-lg
                  "
                >
                  {rain}

                  <span
                    className="
                      ml-1

                      text-[8px]
                      font-normal
                      text-gray-400

                      min-[375px]:text-[9px]

                      sm:text-sm
                    "
                  >
                    mm
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* =================================================
              KELEMBABAN TANAH
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

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

                  sm:h-6
                  sm:w-6
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

                    sm:text-xs
                  "
                >
                  Kelembaban
                </p>

                <h4
                  className="
                    mt-1

                    truncate

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:text-lg
                  "
                >
                  {soil}

                  <span
                    className="
                      ml-1

                      text-[8px]
                      font-normal
                      text-gray-400

                      min-[375px]:text-[9px]

                      sm:text-sm
                    "
                  >
                    %
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* =================================================
              KEMIRINGAN
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

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

                  sm:h-6
                  sm:w-6
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

                    sm:text-xs
                  "
                >
                  Kemiringan
                </p>

                <h4
                  className="
                    mt-1

                    truncate

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:text-lg
                  "
                >
                  {tilt}

                  <span
                    className="
                      ml-1

                      text-[8px]
                      font-normal
                      text-gray-400

                      min-[375px]:text-[9px]

                      sm:text-sm
                    "
                  >
                    °
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* =================================================
              NILAI FUZZY
          ================================================= */}
          <div
            className="
              min-w-0

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-2.5

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

                  sm:h-6
                  sm:w-6
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

                    sm:text-xs
                  "
                >
                  Nilai Fuzzy
                </p>

                <h4
                  className="
                    mt-1

                    truncate

                    text-sm
                    font-bold
                    text-white

                    min-[375px]:text-base

                    sm:text-lg
                  "
                >
                  {fuzzy}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
