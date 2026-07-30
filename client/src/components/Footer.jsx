import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#030303] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo */}

          <div>
            <h2 className="text-3xl font-bold">
              Landslide<span className="text-emerald-400">IoT</span>
            </h2>

            <p className="text-gray-400 mt-6 leading-8">
              Sistem Peringatan Dini Longsor Berbasis IoT menggunakan metode Fuzzy Mamdani untuk
              monitoring kondisi lereng secara real-time.
            </p>
          </div>

          {/* Navigasi */}

          <div>
            <h3 className="font-semibold text-xl">Navigasi</h3>

            <div className="flex flex-col mt-6 gap-3">
              <a href="#hero">Beranda</a>

              <a href="#system">Sistem</a>

              <a href="#monitoring">Monitoring</a>

              <a href="#sensor">Sensor</a>

              <a href="#lokasi">Lokasi</a>
            </div>
          </div>

          {/* Penelitian */}

          <div>
            <h3 className="font-semibold text-xl">Penelitian</h3>

            <div className="mt-6 text-gray-400 leading-8">
              <p>Implementasi Sistem Peringatan Dini Longsor</p>

              <p>Berbasis Internet of Things</p>

              <p>Menggunakan Fuzzy Mamdani</p>
            </div>
          </div>

          {/* Lokasi */}

          <div>
            <h3 className="font-semibold text-xl">Lokasi</h3>

            <div className="mt-6 text-gray-400 leading-8">
              <p>Pusuk Sembalun</p>

              <p>Lombok Timur</p>

              <p>Nusa Tenggara Barat</p>

              <p>Indonesia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-20 pt-10 flex justify-between items-center flex-wrap gap-5">
          <p className="text-gray-500">
            © 2026 Sistem Peringatan Dini Longsor Berbasis IoT. All Rights Reserved.
          </p>

          <button
            onClick={scrollTop}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 transition flex justify-center items-center"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
