import { motion } from "framer-motion";

export default function StepCard({ icon: Icon, title, description }) {
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

        flex
        h-full
        w-full
        min-w-0

        flex-col

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
          ICON
      ================================================= */}
      <div
        className="
          mb-3

          flex
          h-9
          w-9
          shrink-0

          items-center
          justify-center

          rounded-lg

          border
          border-emerald-500/20

          bg-emerald-500/10

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
      "
      >
        <Icon
          className="
            h-[18px]
            w-[18px]
            shrink-0

            text-emerald-400

            min-[375px]:h-5
            min-[375px]:w-5

            sm:h-6
            sm:w-6

            lg:h-7
            lg:w-7

            xl:h-8
            xl:w-8
          "
        />
      </div>

      {/* =================================================
          TITLE
      ================================================= */}
      <h3
        className="
          min-w-0

          break-words

          text-[12px]
          font-semibold
          leading-4

          text-white

          min-[375px]:text-[13px]

          sm:text-base
          sm:leading-5

          lg:text-lg
          lg:leading-6
        "
      >
        {title}
      </h3>

      {/* =================================================
          DESCRIPTION
      ================================================= */}
      <p
        className="
          mt-1.5

          min-w-0

          break-words

          text-[9px]
          leading-[1.45]

          text-gray-400

          min-[375px]:text-[10px]

          sm:mt-2
          sm:text-xs
          sm:leading-5

          lg:text-sm
          lg:leading-6
        "
      >
        {description}
      </p>
    </motion.div>
  );
}
