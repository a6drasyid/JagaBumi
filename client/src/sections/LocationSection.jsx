import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position = [-8.3807, 116.5312]; // Pusuk Sembalun (perkiraan)

export default function LocationSection() {
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

              lg:text-base
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
              tracking-tight
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
            CONTENT GRID

            MOBILE / TABLET:
            Map
            Info

            DESKTOP:
            Map 2/3 + Info 1/3
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
              MAP
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

              sm:rounded-3xl

              lg:col-span-2
            "
          >
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="
                h-[280px]
                w-full

                min-[375px]:h-[300px]

                sm:h-[350px]

                md:h-[400px]

                lg:h-[500px]
              "
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position}>
                <Popup>Pusuk Sembalun</Popup>
              </Marker>
            </MapContainer>
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
            {/* TITLE */}
            <h3
              className="
                break-words

                text-lg
                font-bold
                text-white

                min-[375px]:text-xl

                sm:text-2xl

                lg:text-2xl
              "
            >
              Informasi Lokasi
            </h3>

            {/* =================================================
                MOBILE:
                2 kolom

                DESKTOP:
                kembali vertikal seperti desain awal
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
                  Lokasi
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
                  Pusuk Sembalun
                </h4>
              </div>

              {/* KABUPATEN */}
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
                  Kabupaten
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
                  Lombok Timur
                </h4>
              </div>

              {/* PROVINCE */}
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
                  Provinsi
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
                  Nusa Tenggara Barat
                </h4>
              </div>

              {/* COUNTRY */}
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
                  Negara
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
                  Indonesia
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
