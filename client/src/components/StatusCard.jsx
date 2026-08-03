import { motion } from "framer-motion";
import useSensor from "../hooks/useSensor";

export default function StatusCard() {
  const { sensor } = useSensor();

  // =====================================================
  // SENSOR DATA
  // =====================================================
  const status = sensor?.status ?? "OFFLINE";
  const fuzzy = sensor?.fuzzy_value ?? 0;

  const lastUpdate = sensor?.created_at
    ? new Date(sensor.created_at).toLocaleString("id-ID")
    : "--";

  // =====================================================
  // STATUS COLOR
  // =====================================================
  const statusColor =
    status === "AMAN"
      ? "text-emerald-400"
      : status === "WASPADA"
        ? "text-yellow-400"
        : status === "BAHAYA"
          ? "text-red-500"
          : "text-gray-400";

  // =====================================================
  // STATUS BACKGROUND
  // =====================================================
  const statusBackground =
    status === "AMAN"
      ? "bg-emerald-400"
      : status === "WASPADA"
        ? "bg-yellow-400"
        : status === "BAHAYA"
          ? "bg-red-500"
          : "bg-gray-400";

  return (
    <motion.div
      whileHover={{
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

        p-4

        sm:rounded-3xl
        sm:p-5

        md:p-6

        lg:p-8
      "
    >
      {/* =================================================
          LIVE
      ================================================= */}
      <div
        className="
          flex
          items-center

          gap-2

          lg:gap-3
        "
      >
        <div
          className={`
            h-2
            w-2
            shrink-0

            animate-pulse

            rounded-full

            sm:h-2.5
            sm:w-2.5

            lg:h-3
            lg:w-3

            ${statusBackground}
          `}
        />

        <span
          className="
            text-[10px]
            font-medium
            text-gray-400

            sm:text-xs

            lg:text-base
          "
        >
          LIVE
        </span>
      </div>

      {/* =================================================
          STATUS SAAT INI
      ================================================= */}
      <div
        className="
          mt-4

          sm:mt-5

          lg:mt-6
        "
      >
        <h2
          className="
            text-xs
            text-gray-400

            sm:text-sm

            lg:text-base
          "
        >
          Status Saat Ini
        </h2>

        <h1
          className={`
            mt-1.5

            max-w-full

            break-words

            text-3xl
            font-bold
            leading-none
            tracking-tight

            min-[375px]:text-4xl

            sm:mt-2
            sm:text-5xl

            lg:text-6xl

            ${statusColor}
          `}
        >
          {status}
        </h1>
      </div>

      {/* =================================================
          MOBILE / TABLET INFORMATION

          Mobile dibuat 2 kolom supaya card tidak terlalu
          tinggi.

          Desktop kembali ke layout asli.
      ================================================= */}
      <div
        className="
          mt-6

          grid
          grid-cols-2

          gap-4

          sm:mt-7
          sm:gap-6

          lg:mt-0
          lg:block
        "
      >
        {/* =================================================
            NILAI FUZZY
        ================================================= */}
        <div
          className="
            min-w-0

            lg:mt-10
          "
        >
          <p
            className="
              text-[11px]
              text-gray-400

              sm:text-sm

              lg:text-base
            "
          >
            Nilai Fuzzy
          </p>

          <h2
            className="
              mt-1

              break-words

              text-2xl
              font-bold
              leading-none
              text-white

              min-[375px]:text-3xl

              sm:text-4xl

              lg:mt-0
              lg:text-4xl
            "
          >
            {fuzzy}
          </h2>
        </div>

        {/* =================================================
            LAST UPDATE
            Mobile ditempatkan di samping Nilai Fuzzy
        ================================================= */}
        <div
          className="
            min-w-0

            lg:hidden
          "
        >
          <p
            className="
              text-[11px]
              text-gray-400

              sm:text-sm
            "
          >
            Last Update
          </p>

          <p
            className="
              mt-1

              min-w-0
              break-words

              text-[10px]
              leading-4
              text-white

              min-[375px]:text-[11px]

              sm:text-sm
              sm:leading-5
            "
          >
            {lastUpdate}
          </p>
        </div>
      </div>

      {/* =================================================
          INDEKS RISIKO
      ================================================= */}
      <div
        className="
          mt-6

          sm:mt-7

          lg:mt-10
        "
      >
        <div
          className="
            flex
            items-center
            justify-between

            gap-3
          "
        >
          <p
            className="
              text-[11px]
              text-gray-400

              sm:text-sm

              lg:text-base
            "
          >
            Indeks Risiko
          </p>

          {/* Persentase hanya membantu pembacaan di mobile */}
          <span
            className={`
              text-[11px]
              font-medium

              sm:text-xs

              lg:hidden

              ${statusColor}
            `}
          >
            {Math.min(fuzzy, 100)}%
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div
          className="
            mt-2.5

            h-2
            w-full

            overflow-hidden

            rounded-full
            bg-white/10

            sm:mt-3
            sm:h-3

            lg:mt-4
            lg:h-4
        "
        >
          <div
            className={`
              h-full

              rounded-full

              transition-all
              duration-700

              ${statusBackground}
            `}
            style={{
              width: `${Math.min(fuzzy, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* =================================================
          LAST UPDATE
          DESKTOP

          Desktop dipertahankan seperti layout lama.
      ================================================= */}
      <div
        className="
          hidden

          lg:mt-10
          lg:block
        "
      >
        <p className="text-gray-400">Last Update</p>

        <p
          className="
            mt-2
            break-words
            text-white
          "
        >
          {lastUpdate}
        </p>
      </div>
    </motion.div>
  );
}
