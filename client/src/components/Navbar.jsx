import {
  Activity,
  BarChart3,
  CalendarDays,
  Database,
  Home,
  MapPin,
  Menu,
  Mountain,
  Server,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const menus = [
  {
    id: "hero",
    label: "Beranda",
    icon: Home,
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: Activity,
  },
  {
    id: "system",
    label: "Sistem",
    icon: Server,
  },
  {
    id: "grafik",
    label: "Grafik",
    icon: BarChart3,
  },
  {
    id: "history",
    label: "Riwayat",
    icon: CalendarDays,
  },
  {
    id: "sensor",
    label: "Sensor",
    icon: Database,
  },
  {
    id: "lokasi",
    label: "Lokasi",
    icon: MapPin,
  },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // JAM REALTIME
  // =====================================================
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

  // =====================================================
  // DETEKSI SECTION AKTIF
  // =====================================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      let current = "hero";

      menus.forEach((menu) => {
        const section = document.getElementById(menu.id);

        if (!section) return;

        if (scrollPosition >= section.offsetTop) {
          current = menu.id;
        }
      });

      setActive(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // LOCK BODY SCROLL SAAT DRAWER TERBUKA
  // =====================================================
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =====================================================
  // TUTUP DRAWER SAAT MASUK DESKTOP
  // =====================================================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =====================================================
  // TUTUP DRAWER DENGAN ESC
  // =====================================================
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =====================================================
  // SCROLL KE SECTION
  // =====================================================
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    setActive(id);
    setMenuOpen(false);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* =====================================================
          NAVBAR WRAPPER
      ====================================================== */}
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50

          w-full
          max-w-full

          px-3
          pt-3

          sm:px-4
          sm:pt-4

          lg:px-5
        "
      >
        {/* ===================================================
            TRANSPARENT GLASS NAVBAR
        ==================================================== */}
        <div
          className="
            mx-auto
            flex
            h-16
            w-full
            max-w-7xl
            min-w-0
            items-center
            justify-between
            gap-3

            rounded-2xl

            border
            border-white/[0.08]

            bg-black/[0.08]

            px-3

            shadow-[0_8px_30px_rgba(0,0,0,0.12)]

            backdrop-blur-xl
            backdrop-saturate-150

            sm:h-[70px]
            sm:px-4

            xl:h-[76px]
            xl:px-5
          "
        >
          {/* =================================================
              BRAND / LOGO
          ================================================= */}
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="
              group
              flex
              min-w-0
              flex-1
              items-center
              gap-2.5

              sm:gap-3

              xl:flex-none
            "
            aria-label="Kembali ke beranda"
          >
            {/* LOGO */}
            <div className="relative shrink-0">
              {/* GLOW */}
              <div
                className="
                  absolute
                  inset-1

                  rounded-xl

                  bg-emerald-400/25

                  blur-lg

                  transition-all
                  duration-300

                  group-hover:bg-emerald-400/35
                "
              />

              {/* LOGO CONTAINER */}
              <div
                className="
                  relative

                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-emerald-300/25

                  bg-emerald-500/85

                  shadow-[0_0_20px_rgba(16,185,129,0.25)]

                  backdrop-blur-md

                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:bg-emerald-500

                  sm:h-11
                  sm:w-11
                "
              >
                <Mountain
                  className="
                    h-5
                    w-5
                    text-white

                    sm:h-[22px]
                    sm:w-[22px]
                  "
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* BRAND TEXT */}
            <div className="min-w-0 text-left">
              <h1
                className="
                  truncate

                  text-sm
                  font-bold
                  leading-tight
                  tracking-tight
                  text-white

                  sm:text-base
                "
              >
                Jaga
                <span className="text-emerald-400">Bumi</span>
              </h1>

              <p
                className="
                  mt-0.5

                  max-w-[145px]
                  truncate

                  text-[8px]
                  leading-tight
                  text-white/45

                  min-[375px]:max-w-[185px]
                  min-[375px]:text-[9px]

                  sm:max-w-[230px]
                  sm:text-[10px]

                  xl:max-w-none
                "
              >
                Sistem Peringatan Dini Longsor
              </p>
            </div>
          </button>

          {/* =================================================
              DESKTOP NAVIGATION
              MULAI 1280px
          ================================================= */}
          <nav
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center
              gap-1

              xl:flex

              2xl:gap-2
            "
            aria-label="Navigasi utama"
          >
            {menus.map((menu) => {
              const isActive = active === menu.id;

              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => scrollToSection(menu.id)}
                  className={`
                    group
                    relative

                    flex
                    h-11
                    shrink-0
                    items-center
                    justify-center

                    px-3

                    whitespace-nowrap

                    text-[13px]
                    font-medium

                    transition-colors
                    duration-300

                    2xl:px-4
                    2xl:text-sm

                    ${isActive ? "text-emerald-400" : "text-white/70 hover:text-white"}
                  `}
                >
                  {menu.label}

                  {/* =========================================
                      GARIS HIJAU SECTION AKTIF
                  ========================================== */}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-3
                      right-3

                      h-[2px]

                      origin-center
                      rounded-full

                      bg-emerald-400

                      shadow-[0_0_8px_rgba(52,211,153,0.55)]

                      transition-all
                      duration-300

                      ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
                    `}
                  />
                </button>
              );
            })}
          </nav>

          {/* =================================================
              DESKTOP CLOCK
          ================================================= */}
          <div
            className="
              hidden
              shrink-0

              xl:flex
              xl:items-center
            "
          >
            <div
              className="
                flex
                h-11
                items-center
                gap-2.5

                rounded-xl

                border
                border-white/[0.07]

                bg-white/[0.025]

                px-3.5

                shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]

                backdrop-blur-lg

                2xl:px-4
              "
            >
              {/* CLOCK INDICATOR */}
              <div
                className="
                  relative

                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-emerald-400/60
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5

                    rounded-full

                    bg-emerald-400

                    shadow-[0_0_8px_rgba(52,211,153,0.8)]
                  "
                />
              </div>

              <span
                className="
                  whitespace-nowrap

                  text-xs
                  font-semibold
                  text-white/90

                  2xl:text-[13px]
                "
              >
                {time} WITA
              </span>
            </div>
          </div>

          {/* =================================================
              MOBILE / TABLET HAMBURGER
          ================================================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              border
              border-white/[0.08]

              bg-white/[0.025]

              text-white/85

              shadow-[0_8px_24px_rgba(0,0,0,0.10)]

              backdrop-blur-lg

              transition-all
              duration-300

              hover:border-white/[0.14]
              hover:bg-white/[0.06]
              hover:text-white

              active:scale-95

              sm:h-11
              sm:w-11

              xl:hidden
            "
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu
              className="
                h-5
                w-5

                sm:h-[22px]
                sm:w-[22px]
              "
              strokeWidth={1.8}
            />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`
          fixed
          inset-0
          z-[60]

          bg-black/30

          backdrop-blur-[2px]

          transition-all
          duration-300

          xl:hidden

          ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE / TABLET DRAWER
      ====================================================== */}
      <aside
        id="mobile-navigation"
        className={`
          fixed
          right-0
          top-0
          z-[70]

          flex
          h-dvh

          w-[86vw]
          max-w-[360px]
          min-w-0

          flex-col

          overflow-hidden

          border-l
          border-white/[0.08]

          bg-[#020806]/65

          shadow-[-20px_0_70px_rgba(0,0,0,0.35)]

          backdrop-blur-3xl
          backdrop-saturate-150

          transition-transform
          duration-300
          ease-out

          xl:hidden

          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!menuOpen}
      >
        {/* =================================================
            DRAWER HEADER
        ================================================= */}
        <div
          className="
            flex
            h-[76px]
            shrink-0
            items-center
            justify-between
            gap-3

            border-b
            border-white/[0.06]

            px-4

            sm:px-5
          "
        >
          {/* DRAWER BRAND */}
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-3
            "
          >
            {/* DRAWER LOGO */}
            <div className="relative shrink-0">
              <div
                className="
                  absolute
                  inset-1

                  rounded-xl

                  bg-emerald-400/25

                  blur-lg
                "
              />

              <div
                className="
                  relative

                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-emerald-300/25

                  bg-emerald-500/85

                  shadow-[0_0_18px_rgba(16,185,129,0.25)]
                "
              >
                <Mountain
                  className="
                    h-5
                    w-5
                    text-white
                  "
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* DRAWER BRAND TEXT */}
            <div className="min-w-0 text-left">
              <p
                className="
                  truncate

                  text-sm
                  font-bold
                  text-white
                "
              >
                Jaga
                <span className="text-emerald-400">Bumi</span>
              </p>

              <p
                className="
                  mt-0.5

                  truncate

                  text-[9px]
                  text-white/40
                "
              >
                Sistem Peringatan Dini Longsor
              </p>
            </div>
          </button>

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              border
              border-white/[0.08]

              bg-white/[0.025]

              text-white/75

              backdrop-blur-lg

              transition-all
              duration-300

              hover:border-white/[0.14]
              hover:bg-white/[0.06]
              hover:text-white

              active:scale-95

              sm:h-11
              sm:w-11
            "
            aria-label="Tutup menu navigasi"
          >
            <X
              className="
                h-5
                w-5
              "
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* =================================================
            DRAWER NAVIGATION
        ================================================= */}
        <nav
          className="
            min-h-0
            flex-1

            overflow-y-auto
            overscroll-contain

            px-4
            py-5

            sm:px-5
            sm:py-6
          "
          aria-label="Navigasi mobile"
        >
          <div className="space-y-1.5">
            {menus.map((menu) => {
              const isActive = active === menu.id;
              const Icon = menu.icon;

              return (
                <button
                  type="button"
                  key={menu.id}
                  onClick={() => scrollToSection(menu.id)}
                  className={`
                    group
                    relative

                    flex
                    min-h-[54px]
                    w-full
                    min-w-0
                    items-center
                    gap-4

                    overflow-hidden

                    rounded-xl

                    border

                    px-4

                    text-left

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          border-emerald-400/[0.07]
                          bg-emerald-400/[0.06]
                          text-emerald-400
                        `
                        : `
                          border-transparent
                          bg-transparent
                          text-white/65
                          hover:bg-white/[0.025]
                          hover:text-white
                        `
                    }
                  `}
                >
                  {/* =========================================
                      ACTIVE LEFT LINE
                  ========================================== */}
                  <span
                    className={`
                      absolute
                      bottom-3
                      left-0
                      top-3

                      w-[2px]

                      rounded-full

                      bg-emerald-400

                      shadow-[0_0_10px_rgba(52,211,153,0.55)]

                      transition-all
                      duration-300

                      ${isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
                    `}
                  />

                  {/* ICON */}
                  <Icon
                    className={`
                      h-5
                      w-5
                      shrink-0

                      transition-colors
                      duration-300

                      ${isActive ? "text-emerald-400" : "text-white/50 group-hover:text-white/80"}
                    `}
                    strokeWidth={1.7}
                  />

                  {/* LABEL */}
                  <span
                    className="
                      min-w-0
                      truncate

                      text-sm
                      font-medium
                    "
                  >
                    {menu.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* =================================================
            DRAWER CLOCK
        ================================================= */}
        <div
          className="
            shrink-0

            border-t
            border-white/[0.06]

            p-4

            sm:p-5
          "
        >
          <div
            className="
              rounded-xl

              border
              border-white/[0.07]

              bg-white/[0.02]

              px-4
              py-4

              backdrop-blur-lg
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                text-white/35
              "
            >
              Waktu Lokal
            </p>

            <div
              className="
                mt-2

                flex
                min-w-0
                items-center
                gap-2.5
              "
            >
              {/* STATUS CLOCK */}
              <div
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-emerald-400/60
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5

                    rounded-full

                    bg-emerald-400

                    shadow-[0_0_8px_rgba(52,211,153,0.8)]
                  "
                />
              </div>

              {/* TIME */}
              <p
                className="
                  min-w-0
                  truncate

                  text-sm
                  font-semibold
                  text-white
                "
              >
                {time} WITA
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
