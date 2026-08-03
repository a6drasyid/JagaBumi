import { ChevronUp } from "lucide-react";

export default function Footer() {
  // =====================================================
  // SCROLL TO TOP
  // =====================================================
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        w-full
        max-w-full
        overflow-hidden

        border-t
        border-white/10

        bg-[#030303]
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

          px-4
          py-12

          sm:px-6
          sm:py-14

          md:py-16

          lg:px-8
          lg:py-20
        "
      >
        {/* =================================================
            FOOTER CONTENT
        ================================================= */}
        <div
          className="
            grid
            grid-cols-2

            gap-x-5
            gap-y-10

            sm:gap-x-8
            sm:gap-y-12

            md:grid-cols-2

            lg:grid-cols-4
            lg:gap-12
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}
          <div
            className="
              col-span-2
              min-w-0

              md:col-span-2

              lg:col-span-1
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-white

                sm:text-[1.7rem]

                lg:text-3xl
              "
            >
              Jaga<span className="text-emerald-400">Bumi</span>
            </h2>

            <p
              className="
                mt-4
                max-w-xl

                text-xs
                leading-6
                text-gray-400

                min-[375px]:text-sm

                sm:mt-5
                sm:text-base
                sm:leading-7

                lg:mt-6
                lg:leading-8
              "
            >
              Sistem Peringatan Dini Longsor Berbasis IoT menggunakan metode Fuzzy Mamdani untuk
              monitoring kondisi lereng secara real-time.
            </p>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}
          <div className="min-w-0">
            <h3
              className="
                text-sm
                font-semibold
                text-white

                min-[375px]:text-base

                sm:text-lg

                lg:text-xl
              "
            >
              Navigasi
            </h3>

            <div
              className="
                mt-4
                flex
                flex-col

                gap-2.5

                text-xs
                text-gray-400

                min-[375px]:text-sm

                sm:mt-5
                sm:gap-3

                lg:mt-6
                lg:text-base
              "
            >
              <a
                href="#hero"
                className="
                  w-fit
                  transition-colors
                  hover:text-emerald-400
                "
              >
                Beranda
              </a>

              <a
                href="#system"
                className="
                  w-fit
                  transition-colors
                  hover:text-emerald-400
                "
              >
                Sistem
              </a>

              <a
                href="#monitoring"
                className="
                  w-fit
                  transition-colors
                  hover:text-emerald-400
                "
              >
                Monitoring
              </a>

              <a
                href="#sensor"
                className="
                  w-fit
                  transition-colors
                  hover:text-emerald-400
                "
              >
                Sensor
              </a>

              <a
                href="#lokasi"
                className="
                  w-fit
                  transition-colors
                  hover:text-emerald-400
                "
              >
                Lokasi
              </a>
            </div>
          </div>

          {/* =================================================
              RESEARCH
          ================================================= */}
          <div className="min-w-0">
            <h3
              className="
                text-sm
                font-semibold
                text-white

                min-[375px]:text-base

                sm:text-lg

                lg:text-xl
              "
            >
              Penelitian
            </h3>

            <div
              className="
                mt-4

                break-words

                text-[11px]
                leading-5
                text-gray-400

                min-[375px]:text-xs
                min-[375px]:leading-6

                sm:mt-5
                sm:text-sm
                sm:leading-7

                lg:mt-6
                lg:text-base
                lg:leading-8
              "
            >
              <p>Implementasi Sistem Peringatan Dini Longsor</p>

              <p>Berbasis Internet of Things</p>

              <p>Menggunakan Fuzzy Mamdani</p>
            </div>
          </div>

          {/* =================================================
              LOCATION
          ================================================= */}
          <div
            className="
              col-span-2
              min-w-0

              md:col-span-1

              lg:col-span-1
            "
          >
            <h3
              className="
                text-sm
                font-semibold
                text-white

                min-[375px]:text-base

                sm:text-lg

                lg:text-xl
              "
            >
              Lokasi
            </h3>

            <div
              className="
                mt-4

                text-xs
                leading-6
                text-gray-400

                min-[375px]:text-sm

                sm:mt-5
                sm:leading-7

                lg:mt-6
                lg:text-base
                lg:leading-8
              "
            >
              <p>Pusuk Sembalun</p>

              <p>Kabupaten Lombok Timur</p>

              <p>Nusa Tenggara Barat</p>

              <p>Indonesia</p>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER BOTTOM
        ================================================= */}
        <div
          className="
            mt-12

            flex
            min-w-0

            items-center
            justify-between

            gap-4

            border-t
            border-white/10

            pt-6

            sm:mt-14
            sm:pt-8

            lg:mt-20
            lg:gap-5
            lg:pt-10
          "
        >
          {/* COPYRIGHT */}
          <p
            className="
              min-w-0
              flex-1

              text-[9px]
              leading-4
              text-gray-500

              min-[375px]:text-[10px]

              sm:text-xs
              sm:leading-5

              md:text-sm

              lg:text-base
            "
          >
            © 2026 JagaBumi. All Rights Reserved.
          </p>

          {/* =================================================
              BACK TO TOP
          ================================================= */}
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Kembali ke atas"
            className="
              flex
              h-9
              w-9
              shrink-0

              items-center
              justify-center

              rounded-full

              bg-emerald-500

              text-white

              transition

              hover:bg-emerald-400

              min-[375px]:h-10
              min-[375px]:w-10

              sm:h-11
              sm:w-11

              lg:h-12
              lg:w-12
            "
          >
            <ChevronUp
              className="
                h-4
                w-4

                sm:h-[18px]
                sm:w-[18px]

                lg:h-5
                lg:w-5
              "
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
