import RealtimeChart from "../components/RealtimeChart";
import StatusCard from "../components/StatusCard";

export default function RealtimeMonitoring() {
  return (
    <section
      id="grafik"
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
          max-w-7xl
          min-w-0

          px-3

          min-[375px]:px-4

          sm:px-6

          lg:px-8
        "
      >
        {/* =================================================
            SECTION TITLE
        ================================================= */}
        <h2
          className="
            mb-8

            break-words

            text-[1.75rem]
            font-bold
            leading-[1.15]
            tracking-tight

            text-white

            min-[375px]:text-3xl

            sm:mb-10
            sm:text-4xl

            md:mb-12

            lg:mb-16
            lg:text-5xl
          "
        >
          Monitoring Real-time
        </h2>

        {/* =================================================
            CONTENT

            MOBILE/TABLET:
            Grafik
            Status

            DESKTOP:
            2/3 Grafik + 1/3 Status
        ================================================= */}
        <div
          className="
            grid
            w-full
            min-w-0

            grid-cols-1

            gap-4

            sm:gap-5

            md:gap-6

            lg:grid-cols-3
            lg:gap-8
          "
        >
          {/* CHART */}
          <div
            className="
              w-full
              min-w-0

              lg:col-span-2
            "
          >
            <RealtimeChart />
          </div>

          {/* STATUS */}
          <div
            className="
              w-full
              min-w-0
            "
          >
            <StatusCard />
          </div>
        </div>
      </div>
    </section>
  );
}
