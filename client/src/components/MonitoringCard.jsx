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
  // =====================================================
  // STATUS COLOR
  // =====================================================
  const statusColor =
    value === "AMAN"
      ? "text-emerald-400"
      : value === "WASPADA"
        ? "text-yellow-400"
        : value === "BAHAYA"
          ? "text-red-500"
          : "text-white";

  // =====================================================
  // CATEGORY STYLE
  // =====================================================
  const categoryStyle = ["RENDAH", "KERING", "NORMAL"].includes(category)
    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
    : ["SEDANG", "LEMBAB", "SIGNIFICANT"].includes(category)
      ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
      : ["TINGGI", "BASAH", "EXTREME"].includes(category)
        ? "bg-red-500/10 border border-red-500/20 text-red-500"
        : "bg-white/10 border border-white/10 text-white";

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        glass-card
        relative
        h-full
        w-full
        min-w-0
        overflow-hidden

        rounded-2xl
        border
        border-white/10

        bg-white/5
        backdrop-blur-xl

        p-3
        shadow-2xl

        min-[375px]:p-3.5

        sm:rounded-3xl
        sm:p-5

        lg:p-6
        xl:p-7
      "
    >
      {/* =================================================
          LIVE
      ================================================= */}
      <div
        className="
          absolute
          right-2.5
          top-2.5

          flex
          items-center
          gap-1

          min-[375px]:right-3
          min-[375px]:top-3

          sm:right-4
          sm:top-4
          sm:gap-1.5

          lg:right-5
          lg:top-5
        "
      >
        <div
          className={`
            h-1.5
            w-1.5
            shrink-0
            animate-pulse
            rounded-full

            min-[375px]:h-2
            min-[375px]:w-2

            sm:h-2.5
            sm:w-2.5

            lg:h-3
            lg:w-3

            ${color ?? "bg-gray-400"}
          `}
        />

        <span
          className="
            text-[7px]
            font-medium
            text-gray-400

            min-[375px]:text-[8px]
            sm:text-[10px]
            lg:text-xs
          "
        >
          LIVE
        </span>
      </div>

      {/* =================================================
          ICON
      ================================================= */}
      <div
        className={`
          mb-3

          flex
          h-9
          w-9
          shrink-0

          items-center
          justify-center

          rounded-lg
          border

          min-[375px]:h-10
          min-[375px]:w-10
          min-[375px]:rounded-xl

          sm:mb-4
          sm:h-12
          sm:w-12

          lg:mb-5
          lg:h-14
          lg:w-14
          lg:rounded-2xl

          xl:mb-6
          xl:h-16
          xl:w-16

          ${iconBg}
          ${iconBorder}
        `}
      >
        <Icon
          className={`
            h-[18px]
            w-[18px]

            min-[375px]:h-5
            min-[375px]:w-5

            sm:h-6
            sm:w-6

            lg:h-7
            lg:w-7

            xl:h-8
            xl:w-8

            ${iconColor}
          `}
        />
      </div>

      {/* =================================================
          TITLE
      ================================================= */}
      <p
        className="
          min-w-0

          text-[10px]
          leading-4
          text-gray-400

          min-[375px]:text-[11px]

          sm:text-sm
          sm:leading-5

          lg:text-base
        "
      >
        {title}
      </p>

      {/* =================================================
          VALUE + CATEGORY

          Semua ukuran:
          ANGKA -------- KATEGORI
      ================================================= */}
      <div
        className="
          mt-2.5

          flex
          w-full
          min-w-0

          items-end
          justify-between

          gap-1.5

          min-[375px]:gap-2

          sm:mt-3
          sm:gap-3
        "
      >
        {/* =================================================
            VALUE
        ================================================= */}
        <div
          className="
            flex
            min-w-0
            flex-1

            items-end

            gap-0.5

            min-[375px]:gap-1

            sm:gap-1.5

            lg:gap-2
          "
        >
          {value !== undefined && value !== null ? (
            <>
              <span
                className={`
                  min-w-0

                  text-[1.7rem]
                  font-bold
                  leading-none
                  tracking-tight

                  min-[360px]:text-[1.85rem]
                  min-[375px]:text-[2rem]
                  min-[390px]:text-[2.15rem]

                  sm:text-[2.5rem]

                  lg:text-4xl

                  xl:text-5xl

                  ${title === "Status Sistem" ? statusColor : "text-white"}
                `}
              >
                {value}
              </span>

              {/* UNIT */}
              {unit && (
                <span
                  className="
                    mb-[2px]
                    shrink-0

                    text-[10px]
                    font-medium
                    leading-none
                    text-gray-500

                    min-[375px]:text-xs

                    sm:mb-1
                    sm:text-sm

                    lg:text-base

                    xl:text-lg
                  "
                >
                  {unit}
                </span>
              )}
            </>
          ) : (
            <>
              {/* LOADING */}
              <div
                className="
                  h-8
                  w-14

                  animate-pulse

                  rounded-md
                  bg-white/10

                  min-[375px]:h-9
                  min-[375px]:w-16

                  sm:h-10
                  sm:w-20

                  lg:w-24
                "
              />

              {unit && (
                <span
                  className="
                    shrink-0

                    text-[10px]
                    text-gray-500

                    sm:text-sm

                    lg:text-base
                  "
                >
                  {unit}
                </span>
              )}
            </>
          )}
        </div>

        {/* =================================================
            CATEGORY
            Selalu di kanan angka
        ================================================= */}
        {category && (
          <div
            className={`
              inline-flex
              max-w-[44%]
              shrink-0

              items-center
              justify-center

              rounded-full

              px-2
              py-1.5

              text-[8px]
              font-medium
              leading-none

              min-[360px]:px-2.5
              min-[360px]:text-[9px]

              min-[390px]:px-3
              min-[390px]:text-[10px]

              sm:max-w-none
              sm:px-3
              sm:py-1.5
              sm:text-[10px]

              lg:px-3.5
              lg:text-xs

              xl:px-4
              xl:py-2
              xl:text-sm

              ${categoryStyle}
            `}
          >
            <span className="truncate">
              {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </span>
          </div>
        )}
      </div>

      {/* =================================================
          STATUS / LAST UPDATE
      ================================================= */}
      <div
        className="
          mt-3
          w-full
          min-w-0

          sm:mt-4

          lg:mt-5

          xl:mt-6
        "
      >
        <div
          className="
            inline-flex
            max-w-full

            items-center

            rounded-full

            bg-white/10

            px-2
            py-1

            text-[8px]
            leading-4
            text-gray-400

            min-[375px]:text-[9px]

            sm:px-3
            sm:py-1.5
            sm:text-[10px]

            lg:text-xs

            xl:px-4
            xl:py-2
            xl:text-sm
          "
        >
          <span className="min-w-0 break-words">{status ?? "Menunggu data..."}</span>
        </div>
      </div>
    </motion.div>
  );
}
