export default function LocationSection() {
  // =====================================================
  // LOCATION
  // =====================================================
  const latitude = -8.416489;
  const longitude = 116.537822;

  // Satellite sebagai tampilan awal
  const googleMapsEmbedUrl =
    `https://maps.google.com/maps` +
    `?q=${latitude},${longitude}` +
    `&z=17` +
    `&t=k` +
    `&output=embed`;

  // Link Google Maps
  const googleMapsOpenUrl =
    `https://www.google.com/maps/search/?api=1` + `&query=${latitude},${longitude}`;

  return (
    <section
      id="lokasi"
      className="
        w-full
        max-w-full
        overflow-hidden
        bg-[#050505]

        py-14
        sm:py-16
        md:py-20
        lg:py-28
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
            mb-8
            w-full
            max-w-4xl
            text-center

            sm:mb-10
            md:mb-12
            lg:mb-14
          "
        >
          {/* LABEL */}
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
            Lokasi Penelitian
          </p>

          {/* TITLE */}
          <h2
            className="
              mt-2.5
              break-words

              text-[1.75rem]
              font-bold
              leading-[1.15]
              text-white

              min-[375px]:text-3xl

              sm:mt-3
              sm:text-4xl

              lg:mt-4
              lg:text-5xl
            "
          >
            Pusuk Sembalun
          </h2>

          {/* DESCRIPTION */}
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
            Sistem dipasang pada kawasan lereng di Pusuk Sembalun, Kabupaten Lombok Timur, Nusa
            Tenggara Barat, sebagai lokasi penelitian implementasi IoT dan Fuzzy Mamdani untuk
            mitigasi longsor.
          </p>
        </div>

        {/* =================================================
            GOOGLE MAPS - FULL WIDTH
        ================================================= */}
        <div
          className="
            relative
            w-full
            min-w-0
            overflow-hidden

            rounded-2xl

            border
            border-white/10

            bg-[#0a0a0a]

            shadow-2xl

            sm:rounded-3xl
          "
        >
          <iframe
            title="Lokasi Penelitian Pusuk Sembalun"
            src={googleMapsEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="
              block
              w-full
              border-0

              h-[320px]

              min-[375px]:h-[350px]

              sm:h-[420px]

              md:h-[480px]

              lg:h-[560px]

              xl:h-[600px]
            "
          />

          {/* =================================================
              BOTTOM OVERLAY
          ================================================= */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0

              h-24

              bg-gradient-to-t
              from-black/50
              via-black/15
              to-transparent
            "
          />

          {/* =================================================
              LOCATION INFO
          ================================================= */}
          <div
            className="
              pointer-events-none

              absolute
              left-3
              top-3
              z-10

              max-w-[70%]

              rounded-xl

              border
              border-white/10

              bg-black/70

              px-3
              py-2

              backdrop-blur-md

              sm:left-4
              sm:top-4
              sm:rounded-2xl
              sm:px-4
              sm:py-3
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                text-gray-400

                sm:text-xs
              "
            >
              Titik Penelitian
            </p>

            <p
              className="
                mt-0.5

                text-xs
                font-semibold
                text-white

                sm:text-sm
              "
            >
              Pusuk Sembalun
            </p>

            <p
              className="
                mt-0.5

                text-[9px]
                text-gray-400

                sm:text-[11px]
              "
            >
              {latitude}, {longitude}
            </p>
          </div>

          {/* =================================================
              SATELLITE BADGE
          ================================================= */}
          <div
            className="
              pointer-events-none

              absolute
              right-3
              top-3
              z-10

              rounded-full

              border
              border-white/10

              bg-black/70

              px-3
              py-1.5

              text-[9px]
              font-medium
              text-white

              backdrop-blur-md

              sm:right-4
              sm:top-4
              sm:text-[10px]
            "
          >
            Satellite
          </div>

          {/* =================================================
              OPEN GOOGLE MAPS
          ================================================= */}
          <a
            href={googleMapsOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              absolute
              bottom-3
              left-3
              z-10

              inline-flex
              h-9
              items-center
              justify-center

              rounded-full

              border
              border-white/15

              bg-black/75

              px-4

              text-[10px]
              font-medium
              text-white

              backdrop-blur-md

              transition-colors
              duration-200

              hover:bg-black

              sm:bottom-4
              sm:left-4
              sm:h-10
              sm:px-5
              sm:text-xs
            "
          >
            Buka di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
