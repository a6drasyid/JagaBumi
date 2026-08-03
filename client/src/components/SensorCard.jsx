import { motion } from "framer-motion";

export default function SensorCard({ image, title, description, specs }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group

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

        shadow-2xl

        sm:rounded-3xl
      "
    >
      {/* =================================================
          IMAGE
      ================================================= */}
      <div
        className="
          relative

          h-40
          w-full
          min-w-0
          shrink-0

          overflow-hidden

          min-[375px]:h-44

          sm:h-52

          md:h-56

          lg:h-64
        "
      >
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full

            object-cover
            object-center

            transition-transform
            duration-500

            group-hover:scale-110
          "
        />
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col

          p-4

          min-[375px]:p-4

          sm:p-5

          lg:p-6
        "
      >
        {/* =================================================
            TITLE
        ================================================= */}
        <h3
          className="
            min-w-0

            break-words

            text-lg
            font-bold
            leading-tight
            tracking-tight

            text-white

            min-[375px]:text-xl

            sm:text-[1.35rem]

            lg:text-2xl
          "
        >
          {title}
        </h3>

        {/* =================================================
            DESCRIPTION
        ================================================= */}
        <p
          className="
            mt-2.5

            min-w-0

            break-words

            text-xs
            leading-5
            text-gray-400

            min-[375px]:text-sm
            min-[375px]:leading-6

            sm:mt-3

            lg:mt-4
            lg:text-base
            lg:leading-relaxed
          "
        >
          {description}
        </p>

        {/* =================================================
            SPECIFICATION
        ================================================= */}
        <div
          className="
            mt-4

            border-t
            border-white/10

            pt-4

            sm:mt-5
            sm:pt-5

            lg:mt-6
            lg:pt-6
          "
        >
          <p
            className="
              text-[11px]
              font-semibold
              text-emerald-400

              min-[375px]:text-xs

              sm:text-sm
            "
          >
            Spesifikasi
          </p>

          <p
            className="
              mt-1.5

              min-w-0

              break-words

              text-[11px]
              leading-5
              text-gray-300

              min-[375px]:text-xs

              sm:mt-2
              sm:text-sm

              lg:text-base
            "
          >
            {specs}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
