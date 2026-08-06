export default function LocationSection() {
  // =====================================================
  // GOOGLE MAPS
  // =====================================================
  const latitude = -8.3807;
  const longitude = 116.5312;

  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;

  const googleMapsOpenUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

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
        lg:py-32
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
            SECTION HEADER
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

              lg:text-base
              lg:tracking-widest
            "
          >
            Lokasi Penelitian
          </p>

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
            CONTENT
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
          {/* =================================================
              GOOGLE MAPS
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

              bg-[#111827]

              sm:rounded-3xl

              lg:col-span-2
            "
          >
            <iframe
              title="Lokasi Pusuk Sembalun"
              src={googleMapsEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="
                block

                h-[280px]
                w-full

                border-0

                min-[375px]:h-[300px]

                sm:h-[350px]

                md:h-[400px]

                lg:h-[500px]
              "
            />

            {/* =============================================
                OPEN GOOGLE MAPS
            ============================================= */}
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
                border-white/10

                bg-black/80

                px-3

                text-[10px]
                font-medium
                text-white

                backdrop-blur-md

                hover:bg-black

                min-[375px]:px-4
                min-[375px]:text-[11px]

                sm:bottom-4
                sm:left-4
                sm:h-10
                sm:text-xs
              "
            >
              Buka di Google Maps
            </a>
          </div>

          {/* =================================================
              LOCATION INFO
          ================================================= */}
          <div
            className="
              glass-card

              flex
              h-full
              w-full
              min-w-0
              flex-col

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
            <h3
              className="
                break-words

                text-lg
                font-bold
                text-white

                min-[375px]:text-xl

                sm:text-2xl
              "
            >
              Informasi Lokasi
            </h3>

            {/* =================================================
                MOBILE  : 2 KOLOM
                DESKTOP : 1 KOLOM
            ================================================= */}
            <div
              className="
                mt-5

                grid
                grid-cols-2

                gap-x-4
                gap-y-5

                sm:mt-6
                sm:gap-x-6
                sm:gap-y-6

                lg:mt-8
                lg:grid-cols-1
                lg:gap-0
                lg:space-y-6
              "
            >
              {/* LOCATION */}
              <LocationItem label="Lokasi" value="Pusuk Sembalun" />

              {/* KABUPATEN */}
              <LocationItem label="Kabupaten" value="Lombok Timur" />

              {/* PROVINSI */}
              <LocationItem label="Provinsi" value="Nusa Tenggara Barat" />

              {/* NEGARA */}
              <LocationItem label="Negara" value="Indonesia" />
            </div>

            {/* =================================================
                COORDINATE
            ================================================= */}
            <div
              className="
                mt-6

                border-t
                border-white/10

                pt-5

                lg:mt-auto
                lg:pt-6
              "
            >
              <p
                className="
                  text-[10px]
                  text-gray-500

                  min-[375px]:text-[11px]

                  sm:text-xs
                "
              >
                Koordinat
              </p>

              <p
                className="
                  mt-1

                  text-xs
                  font-medium
                  text-gray-300

                  min-[375px]:text-sm
                "
              >
                {latitude}, {longitude}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================
// LOCATION ITEM
// =====================================================
function LocationItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-[10px]
          text-gray-400

          min-[375px]:text-[11px]

          sm:text-sm

          lg:text-base
        "
      >
        {label}
      </p>

      <h4
        className="
          mt-0.5

          break-words

          text-xs
          font-semibold
          leading-5
          text-white

          min-[375px]:text-sm

          sm:text-base

          lg:mt-0
        "
      >
        {value}
      </h4>
    </div>
  );
}
