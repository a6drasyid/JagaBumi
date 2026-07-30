import { Mountain } from "lucide-react";
import { useEffect, useState } from "react";

const menus = [
  { id: "hero", label: "Beranda" },
  { id: "monitoring", label: "Monitoring" },
  { id: "system", label: "Sistem" },
  { id: "grafik", label: "Grafik" },
  { id: "history", label: "Riwayat" },
  { id: "sensor", label: "Sensor" },
  { id: "lokasi", label: "Lokasi" },
];

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");

  // ===============================
  // Jam Realtime
  // ===============================
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  // ===============================
  // Scroll + Active Section
  // ===============================
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);

      let current = "hero";

      menus.forEach((menu) => {
        const section = document.getElementById(menu.id);

        if (!section) return;

        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          current = menu.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ===============================
  // Smooth Scroll
  // ===============================
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className="fixed top-5 left-0 w-full z-50 px-6"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scroll ? "bg-black/50 backdrop-blur-2xl shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
        {/* ================= Logo ================= */}

        <button onClick={() => scrollToSection("hero")} className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/30 blur-xl group-hover:blur-2xl transition-all"></div>

            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Mountain className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-left">
            <h1 className="text-lg font-bold tracking-wide text-white">
              Jaga
              <span className="text-emerald-400">Bumi</span>
            </h1>

            <p className="text-xs text-gray-400">Sistem Peringatan Dini Longsor</p>
          </div>
        </button>

        {/* ================= Menu ================= */}

        <nav className="hidden lg:flex items-center gap-8">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => scrollToSection(menu.id)}
              className={`relative text-sm font-medium transition-all duration-300 ${
                active === menu.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {menu.label}

              <span
                className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-emerald-400 transition-all duration-300 ${
                  active === menu.id ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* ================= Jam ================= */}

        <div className="hidden lg:flex items-center">
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-gray-500">Waktu Lokal</p>

            <h3 className="text-white font-semibold text-base">{time} WITA</h3>
          </div>
        </div>
      </div>
    </header>
  );
}
