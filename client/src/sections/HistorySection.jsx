import TimelineItem from "../components/TimelineItem";
import useSensor from "../hooks/useSensor";

// =====================================================
// TIMELINE SKELETON
// =====================================================
function TimelineSkeleton() {
  return (
    <div
      className="
        relative

        pb-6
        pl-7

        animate-pulse

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
        className="
          absolute

          left-0
          top-2

          h-4
          w-4

          rounded-full

          border-[3px]
          border-[#050505]

          bg-white/10

          min-[375px]:h-[18px]
          min-[375px]:w-[18px]

          sm:h-5
          sm:w-5

          lg:h-7
          lg:w-7
          lg:border-4
        "
      />

      {/* =================================================
          CARD
      ================================================= */}
      <div
        className="
          w-full
          min-w-0

          rounded-2xl

          border
          border-white/10

          bg-white/5
          backdrop-blur-xl

          p-3

          min-[375px]:p-3.5

          sm:p-5

          lg:rounded-3xl
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

            gap-3

            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:gap-0
          "
        >
          <div
            className="
              h-4
              w-28
              max-w-full

              rounded
              bg-white/10

              min-[375px]:w-32

              sm:w-40

              lg:h-5
              lg:w-48
            "
          />

          <div
            className="
              h-6
              w-20

              rounded-full
              bg-white/10

              sm:h-7
              sm:w-24

              lg:h-8
              lg:w-28
            "
          />
        </div>

        {/* =================================================
            SENSOR SKELETON

            MOBILE  : 2 kolom
            TABLET  : 2 kolom
            XL      : 4 kolom (seperti desktop lama)
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
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
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
                  h-3
                  w-12
                  max-w-full

                  rounded
                  bg-white/10

                  sm:h-4
                  sm:w-20
                "
              />

              <div
                className="
                  mt-3

                  h-5
                  w-14
                  max-w-full

                  rounded
                  bg-white/10

                  sm:mt-4
                  sm:h-8
                  sm:w-24
                "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// HISTORY SECTION
// =====================================================
export default function HistorySection() {
  const { timeline, loading } = useSensor();

  const statusHistory = timeline.filter((item, index) => {
    // Data pertama selalu ditampilkan
    if (index === 0) return true;

    // Hanya tampilkan jika status berbeda dari data sebelumnya
    return item.status !== timeline[index - 1].status;
  });

  return (
    <section
      id="history"
      className="
        w-full
        max-w-full

        overflow-hidden

        bg-transparent

        py-14

        sm:py-16

        md:py-20

        lg:py-32
      "
    >
      <div
        className="
          mx-auto

          w-full
          max-w-6xl
          min-w-0

          px-3

          min-[375px]:px-4

          sm:px-6

          lg:px-8
        "
      >
        {/* =================================================
            HEADING
        ================================================= */}
        <div
          className="
            mb-8

            sm:mb-10

            md:mb-12

            lg:mb-16
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-emerald-400

              min-[375px]:text-[11px]

              sm:text-xs

              lg:text-base
              lg:tracking-widest
            "
          >
            Riwayat
          </p>

          <h2
            className="
              mt-2.5

              break-words

              text-[1.75rem]
              font-bold
              leading-[1.15]
              tracking-tight

              text-white

              min-[375px]:text-3xl

              sm:mt-3
              sm:text-4xl

              lg:mt-4
              lg:text-5xl
            "
          >
            Aktivitas Monitoring
          </h2>

          <p
            className="
              mt-3

              max-w-2xl

              text-xs
              leading-5
              text-gray-400

              min-[375px]:text-sm
              min-[375px]:leading-6

              sm:mt-4
              sm:text-base
              sm:leading-7

              lg:mt-5
            "
          >
            Riwayat perubahan status sistem berdasarkan hasil klasifikasi Fuzzy Mamdani.
          </p>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}
        {loading ? (
          <>
            <TimelineSkeleton />
            <TimelineSkeleton />
            <TimelineSkeleton />
          </>
        ) : statusHistory.length === 0 ? (
          /* =================================================
             EMPTY STATE
          ================================================= */
          <div
            className="
              w-full
              min-w-0

              rounded-2xl

              border
              border-dashed
              border-white/10

              bg-white/5
              backdrop-blur-xl

              px-4
              py-8

              text-center

              sm:rounded-3xl
              sm:p-10

              lg:p-14
            "
          >
            {/* ICON */}
            <div
              className="
                mx-auto

                flex
                h-14
                w-14

                items-center
                justify-center

                rounded-full

                border
                border-white/10

                bg-white/5

                text-2xl

                sm:h-16
                sm:w-16
                sm:text-3xl

                lg:h-20
                lg:w-20
                lg:text-4xl
              "
            >
              📡
            </div>

            {/* TITLE */}
            <h3
              className="
                mt-4

                text-lg
                font-semibold
                text-white

                sm:mt-5
                sm:text-xl

                lg:mt-6
                lg:text-2xl
              "
            >
              Belum Ada Riwayat Monitoring
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                mx-auto

                mt-2.5

                max-w-md

                text-xs
                leading-5
                text-gray-400

                min-[375px]:text-sm
                min-[375px]:leading-6

                sm:mt-3

                lg:mt-4
                lg:text-base
              "
            >
              Sistem sedang menunggu data pertama dari perangkat IoT. Timeline akan otomatis muncul
              ketika status berubah.
            </p>
          </div>
        ) : (
          /* =================================================
             TIMELINE
          ================================================= */
          statusHistory.map((item) => (
            <TimelineItem
              key={`${item.created_at}-${item.status}`}
              time={new Date(item.created_at).toLocaleString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
              rain={item.rain}
              soil={item.soil}
              tilt={item.tilt}
              fuzzy={item.fuzzy_value}
              status={item.status}
            />
          ))
        )}
      </div>
    </section>
  );
}
