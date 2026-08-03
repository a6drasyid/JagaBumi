import { motion } from "framer-motion";

export default function StatCard({ title, end, suffix = "", description }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        glass-card

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
      "
    >
      {/* =================================================
          TITLE

          min-height menjaga posisi angka tetap sejajar
          walaupun judul menjadi 2 baris
      ================================================= */}
      <div
        className="
          flex
          min-h-[32px]
          items-start

          min-[375px]:min-h-[36px]

          sm:min-h-[44px]

          lg:min-h-0
        "
      >
        <p
          className="
            min-w-0

            break-words

            text-[10px]
            font-medium
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
      </div>

      {/* =================================================
          VALUE
      ================================================= */}
      <div
        className="
          mt-2

          flex
          min-w-0
          items-end

          sm:mt-3

          lg:mt-4
        "
      >
        <span
          className="
            min-w-0

            break-words

            text-[1.65rem]
            font-bold
            leading-none
            tracking-tight
            text-white

            min-[360px]:text-[1.8rem]

            min-[390px]:text-3xl

            sm:text-4xl

            lg:text-5xl
          "
        >
          {end}
        </span>

        {suffix && (
          <span
            className="
              ml-0.5

              shrink-0

              text-lg
              font-bold
              leading-none
              text-emerald-400

              min-[375px]:text-xl

              sm:ml-1
              sm:text-2xl

              lg:text-3xl
            "
          >
            {suffix}
          </span>
        )}
      </div>

      {/* =================================================
          SPACER

          flex-1 mendorong description ke posisi bawah.
          Ini membuat semua description sejajar.
      ================================================= */}
      <div
        className="
          min-h-3
          flex-1

          sm:min-h-4

          lg:min-h-5
        "
      />

      {/* =================================================
          DESCRIPTION

          Tinggi minimum menjaga bagian bawah semua
          card tetap konsisten.
      ================================================= */}
      <div
        className="
          flex
          min-h-[48px]
          items-start

          min-[375px]:min-h-[52px]

          sm:min-h-[60px]

          lg:min-h-[72px]
        "
      >
        <p
          className="
            min-w-0

            break-words

            text-[9px]
            leading-4
            text-gray-400

            min-[375px]:text-[10px]

            sm:text-xs
            sm:leading-5

            lg:text-sm
            lg:leading-6
          "
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
