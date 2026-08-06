import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useSensor from "../hooks/useSensor";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

// =====================================================
// LIVE POINT PLUGIN
// =====================================================
const livePointPlugin = {
  id: "livePointPlugin",

  afterDatasetsDraw(chart) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      if (!meta?.data?.length) return;

      const point = meta.data[meta.data.length - 1];

      if (!point) return;

      ctx.save();

      ctx.beginPath();
      ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = `${dataset.borderColor}22`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = dataset.borderColor;
      ctx.fill();

      ctx.restore();
    });
  },
};

// =====================================================
// REGISTER CHART
// =====================================================
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
  livePointPlugin
);

// =====================================================
// FORMAT CATEGORY
// =====================================================
function formatCategory(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// =====================================================
// MOBILE DETECTION
// =====================================================
function getIsMobile() {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(max-width: 639px)").matches;
}

// =====================================================
// COMPONENT
// =====================================================
export default function RealtimeChart() {
  const { history, range, setRange, setCustomRange } = useSensor();

  // =====================================================
  // STATE
  // =====================================================
  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");

  const [showCustomPanel, setShowCustomPanel] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [isMobile, setIsMobile] = useState(getIsMobile);

  // =====================================================
  // REF
  // =====================================================
  const controlsRef = useRef(null);

  // =====================================================
  // RESPONSIVE LISTENER
  // =====================================================
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    function handleChange(event) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // =====================================================
  // CLICK OUTSIDE
  // =====================================================
  useEffect(() => {
    function handleClickOutside(event) {
      if (controlsRef.current && !controlsRef.current.contains(event.target)) {
        setShowCustomPanel(false);
        setShowExportMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // LABELS
  // =====================================================
  const labels = useMemo(() => {
    let customDiffDay = null;

    if (range === "custom" && draftStartDate && draftEndDate) {
      const start = new Date(draftStartDate);
      const end = new Date(draftEndDate);

      customDiffDay = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }

    return history.map((item) => {
      const date = new Date(item.created_at);

      if (range === "1h" || range === "1d") {
        return date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      if (range === "custom") {
        if (customDiffDay !== null && customDiffDay <= 1) {
          return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        });
      }

      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    });
  }, [history, range, draftStartDate, draftEndDate]);

  // =====================================================
  // SENSOR VALUES
  // =====================================================
  const sensorValues = useMemo(() => {
    const rain = [];
    const soil = [];
    const tilt = [];

    for (let i = 0; i < history.length; i += 1) {
      const item = history[i];

      rain.push(item.rain);
      soil.push(item.soil);
      tilt.push(item.tilt);
    }

    return {
      rain,
      soil,
      tilt,
    };
  }, [history]);

  // =====================================================
  // GRADIENT
  // =====================================================
  const createGradient = useCallback((context, startColor, middleColor, endColor) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;

    if (!chartArea) {
      return endColor;
    }

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

    gradient.addColorStop(0, startColor);
    gradient.addColorStop(0.5, middleColor);
    gradient.addColorStop(1, endColor);

    return gradient;
  }, []);

  // =====================================================
  // CHART DATA
  // =====================================================
  const data = useMemo(
    () => ({
      labels,

      datasets: [
        {
          label: "Curah Hujan",

          data: sensorValues.rain,

          borderColor: "#3B82F6",

          backgroundColor: (context) =>
            createGradient(
              context,
              "rgba(59,130,246,.40)",
              "rgba(59,130,246,.12)",
              "rgba(59,130,246,0)"
            ),

          borderWidth: 1,

          borderCapStyle: "round",
          borderJoinStyle: "round",

          fill: true,

          tension: 0.5,

          cubicInterpolationMode: "monotone",

          pointRadius: 0,
          pointHoverRadius: 7,
          pointHitRadius: 10,
        },

        {
          label: "Kelembaban Tanah",

          data: sensorValues.soil,

          borderColor: "#10B981",

          backgroundColor: (context) =>
            createGradient(
              context,
              "rgba(16,185,129,.40)",
              "rgba(16,185,129,.12)",
              "rgba(16,185,129,0)"
            ),

          borderWidth: 1,

          borderCapStyle: "round",
          borderJoinStyle: "round",

          fill: true,

          tension: 0.5,

          cubicInterpolationMode: "monotone",

          pointRadius: 0,
          pointHoverRadius: 7,
          pointHitRadius: 10,
        },

        {
          label: "Kemiringan",

          data: sensorValues.tilt,

          borderColor: "#F59E0B",

          backgroundColor: (context) =>
            createGradient(
              context,
              "rgba(245,158,11,.40)",
              "rgba(245,158,11,.12)",
              "rgba(245,158,11,0)"
            ),

          borderWidth: 1,

          borderCapStyle: "round",
          borderJoinStyle: "round",

          fill: true,

          tension: 0.5,

          cubicInterpolationMode: "monotone",

          pointRadius: 0,
          pointHoverRadius: 7,
          pointHitRadius: 10,
        },
      ],
    }),
    [labels, sensorValues, createGradient]
  );

  // =====================================================
  // CHART OPTIONS
  // =====================================================
  const options = useMemo(
    () => ({
      responsive: true,

      maintainAspectRatio: false,

      normalized: true,

      layout: {
        padding: {
          left: 2,
          right: 6,
          top: 4,
          bottom: 0,
        },
      },

      animation: {
        duration: 150,
      },

      interaction: {
        mode: "index",
        intersect: false,
      },

      plugins: {
        // =================================================
        // LEGEND
        // =================================================
        legend: {
          position: "top",

          align: "center",

          labels: {
            color: "#D1D5DB",

            usePointStyle: true,
            pointStyle: "circle",

            boxWidth: isMobile ? 6 : 7,
            boxHeight: isMobile ? 6 : 7,

            padding: isMobile ? 8 : 12,

            font: {
              size: isMobile ? 8 : 12,
            },
          },
        },

        // =================================================
        // TOOLTIP
        // =================================================
        tooltip: {
          enabled: true,

          backgroundColor: "#09090B",
          borderColor: "#27272A",
          borderWidth: 1,

          cornerRadius: isMobile ? 8 : 12,
          padding: isMobile ? 8 : 12,

          titleColor: "#FFFFFF",
          bodyColor: "#D4D4D8",

          footerColor: (context) => {
            const index = context?.tooltip?.dataPoints?.[0]?.dataIndex;

            const item = history[index];

            if (!item) return "#9CA3AF";

            switch (item.status) {
              case "AMAN":
                return "#34D399";

              case "WASPADA":
                return "#FACC15";

              case "BAHAYA":
                return "#EF4444";

              default:
                return "#9CA3AF";
            }
          },

          titleFont: {
            size: isMobile ? 10 : 13,
            weight: "600",
          },

          bodyFont: {
            size: isMobile ? 9 : 12,
          },

          footerFont: {
            size: isMobile ? 9 : 12,
            weight: "600",
          },

          boxWidth: isMobile ? 7 : 10,
          boxHeight: isMobile ? 7 : 10,

          usePointStyle: true,
          displayColors: true,

          caretSize: isMobile ? 4 : 5,

          callbacks: {
            // =================================================
            // TANGGAL + JAM
            // =================================================
            title(context) {
              const index = context?.[0]?.dataIndex;

              const item = history[index];

              if (!item) return "";

              const date = new Date(item.created_at);

              if (isMobile) {
                return [
                  date.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),

                  date.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                ];
              }

              return [
                date.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }),

                date.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
              ];
            },

            // =================================================
            // SENSOR
            // =================================================
            label(context) {
              const item = history[context.dataIndex];

              if (!item) {
                return context.formattedValue;
              }

              switch (context.dataset.label) {
                case "Curah Hujan":
                  return isMobile
                    ? `Hujan: ${item.rain} mm • ${formatCategory(item.rain_fuzzy)}`
                    : `Curah Hujan : ${item.rain} mm • ${formatCategory(item.rain_fuzzy)}`;

                case "Kelembaban Tanah":
                  return isMobile
                    ? `Tanah: ${item.soil}% • ${formatCategory(item.soil_fuzzy)}`
                    : `Kelembaban Tanah : ${item.soil}% • ${formatCategory(item.soil_fuzzy)}`;

                case "Kemiringan":
                  return `Kemiringan: ${item.tilt}° • ${formatCategory(item.tilt_fuzzy)}`;

                default:
                  return context.formattedValue;
              }
            },

            // =================================================
            // STATUS
            // =================================================
            footer(context) {
              const index = context?.[0]?.dataIndex;

              const item = history[index];

              if (!item) return "";

              return `Status : ${item.status || "-"}`;
            },
          },
        },
      },

      // =================================================
      // SCALES
      // =================================================
      scales: {
        x: {
          offset: true,

          ticks: {
            color: "#9CA3AF",

            autoSkip: true,

            maxTicksLimit: isMobile ? 5 : 10,

            maxRotation: 0,
            minRotation: 0,

            padding: 6,

            font: {
              size: isMobile ? 8 : 11,
            },
          },

          grid: {
            color: "rgba(255,255,255,.05)",
          },

          border: {
            display: false,
          },
        },

        y: {
          beginAtZero: true,

          ticks: {
            color: "#9CA3AF",

            padding: 6,

            font: {
              size: isMobile ? 8 : 11,
            },
          },

          grid: {
            color: "rgba(255,255,255,.05)",
          },

          border: {
            display: false,
          },
        },
      },
    }),
    [history, isMobile]
  );

  // =====================================================
  // EXPORT EXCEL
  // =====================================================
  const handleExportExcel = useCallback(async () => {
    try {
      let url = "https://jagabumi.up.railway.app/api/export/excel";

      if (range === "custom" && draftStartDate && draftEndDate) {
        url += `?start=${draftStartDate}&end=${draftEndDate}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal export Excel");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = downloadUrl;
      a.download = "Monitoring.xlsx";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(downloadUrl);

      setShowExportMenu(false);
    } catch (error) {
      console.error(error);

      alert("Export Excel gagal.");
    }
  }, [range, draftStartDate, draftEndDate]);

  // =====================================================
  // EXPORT PDF
  // =====================================================
  const handleExportPDF = useCallback(async () => {
    try {
      let url = "https://jagabumi.up.railway.app/api/export/pdf";

      if (range === "custom" && draftStartDate && draftEndDate) {
        url += `?start=${draftStartDate}&end=${draftEndDate}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal export PDF");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = downloadUrl;
      a.download = "Monitoring.pdf";

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(downloadUrl);

      setShowExportMenu(false);
    } catch (error) {
      console.error(error);

      alert("Export PDF gagal.");
    }
  }, [range, draftStartDate, draftEndDate]);

  // =====================================================
  // APPLY CUSTOM RANGE
  // =====================================================
  const handleApplyCustomRange = useCallback(() => {
    if (!draftStartDate || !draftEndDate) {
      return;
    }

    setRange("custom");

    setCustomRange({
      start: draftStartDate,
      end: draftEndDate,
    });

    setShowCustomPanel(false);
  }, [draftStartDate, draftEndDate, setRange, setCustomRange]);

  return (
    <div
      className="
        relative
        w-full
        min-w-0

        rounded-2xl
        border
        border-white/10

        bg-white/5

        p-4

        shadow-2xl
        backdrop-blur-xl

        sm:rounded-3xl
        sm:p-5

        md:p-6

        lg:h-[500px]
        lg:p-8
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}
      <div
        className="
          mb-5

          flex
          min-w-0
          flex-col

          gap-4

          lg:mb-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* =================================================
            TITLE
        ================================================= */}
        <div className="min-w-0">
          <h3
            className="
              text-lg
              font-semibold
              text-white

              lg:text-xl
            "
          >
            Grafik Monitoring
          </h3>

          <p
            className="
              mt-1

              text-[11px]
              leading-5
              text-gray-400

              sm:text-xs

              lg:text-sm
            "
          >
            Data sensor berdasarkan rentang waktu
          </p>
        </div>

        {/* =================================================
            CONTROLS
        ================================================= */}
        <div
          ref={controlsRef}
          className="
            relative

            w-full
            min-w-0

            lg:w-auto
          "
        >
          {/* =================================================
              BUTTON ROW

              MOBILE:
              4 tombol selalu sejajar.

              TABLET/DESKTOP:
              kembali ke ukuran normal.
          ================================================= */}
          <div
            className="
              grid
              w-full
              min-w-0

              grid-cols-[0.9fr_1fr_1.25fr_1.35fr]

              items-center

              gap-1.5

              min-[375px]:gap-2

              sm:flex
              sm:w-auto
              sm:flex-wrap
              sm:gap-2

              lg:flex-nowrap
            "
          >
            {/* =============================================
                1 JAM
            ============================================= */}
            <button
              type="button"
              onClick={() => {
                setRange("1h");
                setShowCustomPanel(false);
                setShowExportMenu(false);
              }}
              className={`
                flex
                h-9
                min-w-0

                items-center
                justify-center

                rounded-full

                px-1

                text-[9px]
                font-medium
                whitespace-nowrap

                transition-colors

                min-[375px]:px-2
                min-[375px]:text-[10px]

                sm:h-10
                sm:w-auto
                sm:px-4
                sm:text-xs

                lg:text-sm

                ${
                  range === "1h"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }
              `}
            >
              1 Jam
            </button>

            {/* =============================================
                24 JAM
            ============================================= */}
            <button
              type="button"
              onClick={() => {
                setRange("1d");
                setShowCustomPanel(false);
                setShowExportMenu(false);
              }}
              className={`
                flex
                h-9
                min-w-0

                items-center
                justify-center

                rounded-full

                px-1

                text-[9px]
                font-medium
                whitespace-nowrap

                transition-colors

                min-[375px]:px-2
                min-[375px]:text-[10px]

                sm:h-10
                sm:w-auto
                sm:px-4
                sm:text-xs

                lg:text-sm

                ${
                  range === "1d"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }
              `}
            >
              24 Jam
            </button>

            {/* =============================================
                CUSTOM
            ============================================= */}
            <button
              type="button"
              onClick={() => {
                setShowExportMenu(false);

                setShowCustomPanel((prev) => !prev);
              }}
              className={`
                flex
                h-9
                min-w-0

                items-center
                justify-center

                gap-1

                rounded-full

                px-1

                text-[9px]
                font-medium
                whitespace-nowrap

                transition-colors

                min-[375px]:gap-1.5
                min-[375px]:px-2
                min-[375px]:text-[10px]

                sm:h-10
                sm:w-auto
                sm:px-4
                sm:text-xs

                lg:gap-2
                lg:text-sm

                ${
                  range === "custom"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }
              `}
            >
              <span>Custom</span>

              <ChevronDown
                className={`
                  h-3
                  w-3
                  shrink-0

                  transition-transform
                  duration-200

                  sm:h-3.5
                  sm:w-3.5

                  ${showCustomPanel ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* =============================================
                EXPORT
            ============================================= */}
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => {
                  setShowCustomPanel(false);

                  setShowExportMenu((prev) => !prev);
                }}
                className="
                  flex
                  h-9
                  w-full
                  min-w-0

                  items-center
                  justify-center

                  gap-1

                  rounded-full

                  bg-white/5

                  px-1

                  text-[9px]
                  font-medium
                  text-white
                  whitespace-nowrap

                  transition-colors

                  hover:bg-white/10

                  min-[375px]:gap-1.5
                  min-[375px]:px-2
                  min-[375px]:text-[10px]

                  sm:h-10
                  sm:w-auto
                  sm:px-4
                  sm:text-xs

                  lg:gap-2
                  lg:text-sm
                "
              >
                <Download
                  className="
                    h-3
                    w-3
                    shrink-0

                    min-[375px]:h-3.5
                    min-[375px]:w-3.5

                    sm:h-4
                    sm:w-4
                  "
                />

                <span>Export</span>

                <ChevronDown
                  className={`
                    h-3
                    w-3
                    shrink-0

                    transition-transform
                    duration-200

                    sm:h-3.5
                    sm:w-3.5

                    ${showExportMenu ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* =========================================
                  EXPORT MENU
              ========================================= */}
              <AnimatePresence>
                {showExportMenu && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 8,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                    className="
                      absolute
                      right-0
                      top-full
                      z-50

                      w-40

                      overflow-hidden

                      rounded-xl

                      border
                      border-white/10

                      bg-[#111827]

                      shadow-2xl

                      sm:w-52
                    "
                  >
                    <button
                      type="button"
                      onClick={handleExportExcel}
                      className="
                        flex
                        w-full

                        items-center

                        gap-2.5

                        px-3
                        py-2.5

                        text-left
                        text-[10px]
                        text-gray-200

                        transition-colors

                        hover:bg-white/5

                        sm:gap-3
                        sm:px-4
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      <FileSpreadsheet
                        className="
                          h-4
                          w-4
                          shrink-0

                          text-emerald-400

                          sm:h-[17px]
                          sm:w-[17px]
                        "
                      />

                      <span>Export Excel</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportPDF}
                      className="
                        flex
                        w-full

                        items-center

                        gap-2.5

                        border-t
                        border-white/5

                        px-3
                        py-2.5

                        text-left
                        text-[10px]
                        text-gray-200

                        transition-colors

                        hover:bg-white/5

                        sm:gap-3
                        sm:px-4
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      <FileText
                        className="
                          h-4
                          w-4
                          shrink-0

                          text-red-400

                          sm:h-[17px]
                          sm:w-[17px]
                        "
                      />

                      <span>Export PDF</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* =================================================
              CUSTOM FILTER
          ================================================= */}
          <AnimatePresence>
            {showCustomPanel && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="
                  relative

                  mt-3

                  w-full

                  rounded-xl

                  border
                  border-white/10

                  bg-[#111827]

                  p-3

                  shadow-xl

                  sm:rounded-2xl
                  sm:p-4

                  lg:absolute
                  lg:right-0
                  lg:top-full
                  lg:z-50
                  lg:mt-2
                  lg:w-[360px]
                "
              >
                {/* =========================================
                    DATE GRID
                ========================================= */}
                <div
                  className="
                    grid
                    grid-cols-2

                    gap-2

                    sm:gap-3
                  "
                >
                  {/* =====================================
                      START DATE
                  ===================================== */}
                  <div className="min-w-0">
                    <label
                      className="
                        mb-1.5
                        block
                        truncate

                        text-[8px]
                        font-medium
                        text-gray-400

                        min-[375px]:text-[9px]

                        sm:mb-2
                        sm:text-xs
                      "
                    >
                      Tanggal Mulai
                    </label>

                    <input
                      type="date"
                      value={draftStartDate}
                      onChange={(e) => setDraftStartDate(e.target.value)}
                      className="
                        h-9
                        w-full
                        min-w-0

                        rounded-lg

                        border
                        border-white/10

                        bg-white/5

                        px-1.5

                        text-[8px]
                        text-white

                        outline-none

                        focus:border-emerald-500/50

                        min-[375px]:px-2
                        min-[375px]:text-[9px]

                        sm:h-11
                        sm:rounded-xl
                        sm:px-3
                        sm:text-xs

                        lg:text-sm
                      "
                    />
                  </div>

                  {/* =====================================
                      END DATE
                  ===================================== */}
                  <div className="min-w-0">
                    <label
                      className="
                        mb-1.5
                        block
                        truncate

                        text-[8px]
                        font-medium
                        text-gray-400

                        min-[375px]:text-[9px]

                        sm:mb-2
                        sm:text-xs
                      "
                    >
                      Tanggal Selesai
                    </label>

                    <input
                      type="date"
                      value={draftEndDate}
                      onChange={(e) => setDraftEndDate(e.target.value)}
                      className="
                        h-9
                        w-full
                        min-w-0

                        rounded-lg

                        border
                        border-white/10

                        bg-white/5

                        px-1.5

                        text-[8px]
                        text-white

                        outline-none

                        focus:border-emerald-500/50

                        min-[375px]:px-2
                        min-[375px]:text-[9px]

                        sm:h-11
                        sm:rounded-xl
                        sm:px-3
                        sm:text-xs

                        lg:text-sm
                      "
                    />
                  </div>
                </div>

                {/* =========================================
                    APPLY BUTTON
                ========================================= */}
                <button
                  type="button"
                  onClick={handleApplyCustomRange}
                  disabled={!draftStartDate || !draftEndDate}
                  className="
                    mt-3

                    flex
                    h-9
                    w-full

                    items-center
                    justify-center

                    rounded-lg

                    bg-emerald-500

                    text-[10px]
                    font-medium
                    text-white

                    transition-colors

                    hover:bg-emerald-600

                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    sm:mt-4
                    sm:h-11
                    sm:rounded-xl
                    sm:text-sm
                  "
                >
                  Terapkan Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =================================================
          CHART
      ================================================= */}
      <div
        className="
          relative

          h-[315px]

          w-full
          min-w-0
          max-w-full

          sm:h-[330px]

          md:h-[340px]

          lg:h-[380px]
        "
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
