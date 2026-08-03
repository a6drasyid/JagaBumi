import StepCard from "../components/StepCard";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CloudRain,
  Cpu,
  Droplets,
  MessageCircleMore,
  MonitorSmartphone,
  Mountain,
  ServerCog,
} from "lucide-react";

// =====================================================
// SYSTEM STEPS
// =====================================================
const steps = [
  {
    icon: CloudRain,
    title: "Rain Gauge",
    description: "Mengukur curah hujan.",
  },
  {
    icon: Droplets,
    title: "FC-28",
    description: "Mengukur kelembaban tanah.",
  },
  {
    icon: Mountain,
    title: "MPU6050",
    description: "Mengukur perubahan kemiringan.",
  },
  {
    icon: Cpu,
    title: "ESP32",
    description: "Mengumpulkan data sensor.",
  },
  {
    icon: BrainCircuit,
    title: "Fuzzy Mamdani",
    description: "Menentukan tingkat risiko.",
  },
  {
    icon: ServerCog,
    title: "Node.js API",
    description: "Mengirim data ke server.",
  },
  {
    icon: MonitorSmartphone,
    title: "Website",
    description: "Monitoring real-time.",
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp",
    description: "Mengirim notifikasi.",
  },
];

export default function SystemFlow() {
  return (
    <section
      id="system"
      className="
        relative
        w-full
        max-w-full
        overflow-hidden
        bg-[#050505]

        py-12
        sm:py-16
        md:py-20
        lg:py-24
        xl:py-28
      "
    >
      {/* =================================================
          CONTAINER
      ================================================= */}
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
            HEADER
        ================================================= */}
        <div
          className="
            mx-auto
            mb-7
            w-full
            max-w-4xl
            text-center

            min-[375px]:mb-8
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
              sm:tracking-[0.22em]

              lg:text-sm
              lg:tracking-widest
            "
          >
            Cara Kerja
          </p>

          <h2
            className="
              mt-2

              break-words

              text-[1.55rem]
              font-bold
              leading-[1.15]
              tracking-tight
              text-white

              min-[375px]:text-[1.75rem]

              sm:mt-3
              sm:text-4xl

              lg:text-5xl
            "
          >
            Bagaimana Sistem Bekerja
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-3xl

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
            Sistem mengintegrasikan sensor IoT, metode Fuzzy Mamdani, dan website monitoring untuk
            memberikan peringatan dini secara real-time.
          </p>
        </div>

        {/* =================================================
            MOBILE + TABLET FLOW

            1 → 2
                ↓
            4 ← 3
            ↓
            5 → 6
                ↓
            8 ← 7
        ================================================= */}
        <div className="w-full min-w-0 lg:hidden">
          <div
            className="
              grid
              w-full
              min-w-0

              grid-cols-[minmax(0,1fr)_14px_minmax(0,1fr)]

              items-stretch

              gap-x-0.5
              gap-y-1

              min-[375px]:grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)]
              min-[375px]:gap-x-1
              min-[375px]:gap-y-1.5

              sm:grid-cols-[minmax(0,1fr)_22px_minmax(0,1fr)]
              sm:gap-x-1.5
              sm:gap-y-2

              md:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)]
              md:gap-x-2
              md:gap-y-2.5
            "
          >
            {/* =================================================
                ROW 1
                RAIN GAUGE → FC-28
            ================================================= */}
            <div className="min-w-0">
              <StepCard {...steps[0]} />
            </div>

            <div className="flex min-w-0 items-center justify-center">
              <ArrowRight
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            <div className="min-w-0">
              <StepCard {...steps[1]} />
            </div>

            {/* =================================================
                TURN 1
            ================================================= */}
            <div />
            <div />

            <div
              className="
                flex
                h-3
                items-center
                justify-center

                min-[375px]:h-4

                sm:h-5
                md:h-6
              "
            >
              <ArrowDown
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            {/* =================================================
                ROW 2
                ESP32 ← MPU6050
            ================================================= */}
            <div className="min-w-0">
              <StepCard {...steps[3]} />
            </div>

            <div className="flex min-w-0 items-center justify-center">
              <ArrowLeft
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            <div className="min-w-0">
              <StepCard {...steps[2]} />
            </div>

            {/* =================================================
                TURN 2
            ================================================= */}
            <div
              className="
                flex
                h-3
                items-center
                justify-center

                min-[375px]:h-4

                sm:h-5
                md:h-6
              "
            >
              <ArrowDown
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            <div />
            <div />

            {/* =================================================
                ROW 3
                FUZZY → NODE.JS
            ================================================= */}
            <div className="min-w-0">
              <StepCard {...steps[4]} />
            </div>

            <div className="flex min-w-0 items-center justify-center">
              <ArrowRight
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            <div className="min-w-0">
              <StepCard {...steps[5]} />
            </div>

            {/* =================================================
                TURN 3
            ================================================= */}
            <div />
            <div />

            <div
              className="
                flex
                h-3
                items-center
                justify-center

                min-[375px]:h-4

                sm:h-5
                md:h-6
              "
            >
              <ArrowDown
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            {/* =================================================
                ROW 4
                WHATSAPP ← WEBSITE
            ================================================= */}
            <div className="min-w-0">
              <StepCard {...steps[7]} />
            </div>

            <div className="flex min-w-0 items-center justify-center">
              <ArrowLeft
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400

                  sm:h-3.5
                  sm:w-3.5

                  md:h-4
                  md:w-4
                "
              />
            </div>

            <div className="min-w-0">
              <StepCard {...steps[6]} />
            </div>
          </div>
        </div>

        {/* =================================================
            DESKTOP FLOW
        ================================================= */}
        <div className="hidden w-full min-w-0 lg:block">
          <div
            className="
              flex
              w-full
              min-w-0
              items-center

              overflow-x-auto
              overscroll-x-contain

              pb-6
            "
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="
                  flex
                  shrink-0
                  items-center
                "
              >
                <StepCard {...step} />

                {index < steps.length - 1 && (
                  <div
                    className="
                      mx-3
                      flex
                      shrink-0
                      items-center
                      justify-center

                      xl:mx-4
                    "
                  >
                    <ArrowRight
                      className="
                        h-5
                        w-5
                        shrink-0
                        text-emerald-400

                        xl:h-6
                        xl:w-6
                      "
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
