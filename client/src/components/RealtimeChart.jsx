import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

      if (!meta.data.length) return;

      const point = meta.data[meta.data.length - 1];

      const pulse = 7 + Math.sin(Date.now() / 90) * 4;

      ctx.save();

      // Glow
      ctx.shadowBlur = 45;
      ctx.shadowColor = dataset.borderColor;

      // Ring luar
      ctx.beginPath();
      ctx.arc(point.x, point.y, pulse, 0, Math.PI * 2);
      ctx.fillStyle = dataset.borderColor + "22";
      ctx.fill();

      // Titik utama
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = dataset.borderColor;
      ctx.fill();

      ctx.restore();
    });
  },
};

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

export default function RealtimeChart() {
  const { history, range, setRange, setCustomRange } = useSensor();

  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");

  const [showCustomPanel, setShowCustomPanel] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const customDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);

  const [, forceUpdate] = useState(0);

  // =====================================================
  // LIVE POINT ANIMATION
  // =====================================================
  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 14);

    return () => clearInterval(timer);
  }, []);

  // =====================================================
  // CLICK OUTSIDE DROPDOWN
  // =====================================================
  useEffect(() => {
    function handleClickOutside(event) {
      if (customDropdownRef.current && !customDropdownRef.current.contains(event.target)) {
        setShowCustomPanel(false);
      }

      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
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
  const labels = history.map((item) => {
    const date = new Date(item.created_at);

    if (range === "1h") {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (range === "1d") {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (range === "custom") {
      const start = new Date(draftStartDate);
      const end = new Date(draftEndDate);

      const diffDay = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (diffDay <= 1) {
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

    return date.toLocaleTimeString("id-ID");
  });

  // =====================================================
  // CHART DATA
  // =====================================================
  const data = {
    labels,

    datasets: [
      {
        label: "Curah Hujan",

        data: history.map((item) => item.rain),

        borderColor: "#3B82F6",
        borderCapStyle: "round",
        borderJoinStyle: "round",

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

          gradient.addColorStop(0, "rgba(59,130,246,.40)");
          gradient.addColorStop(0.5, "rgba(59,130,246,.12)");
          gradient.addColorStop(1, "rgba(59,130,246,0)");

          return gradient;
        },

        borderWidth: 1,
        fill: true,
        tension: 0.5,

        cubicInterpolationMode: "monotone",

        pointRadius: (context) => {
          const last = history.length - 1;

          return context.dataIndex === last ? 7 : 0;
        },

        pointHoverRadius: 10,
      },

      {
        label: "Kelembaban Tanah",

        data: history.map((item) => item.soil),

        borderColor: "#10B981",
        borderCapStyle: "round",
        borderJoinStyle: "round",

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

          gradient.addColorStop(0, "rgba(16,185,129,.40)");
          gradient.addColorStop(0.5, "rgba(16,185,129,.12)");
          gradient.addColorStop(1, "rgba(16,185,129,0)");

          return gradient;
        },

        borderWidth: 1,
        fill: true,
        tension: 0.5,

        cubicInterpolationMode: "monotone",

        pointRadius: (context) => {
          const last = history.length - 1;

          return context.dataIndex === last ? 7 : 0;
        },

        pointHoverRadius: 10,
      },

      {
        label: "Kemiringan Lereng",

        data: history.map((item) => item.tilt),

        borderColor: "#F59E0B",
        borderCapStyle: "round",
        borderJoinStyle: "round",

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

          gradient.addColorStop(0, "rgba(245,158,11,.40)");
          gradient.addColorStop(0.5, "rgba(245,158,11,.12)");
          gradient.addColorStop(1, "rgba(245,158,11,0)");

          return gradient;
        },

        borderWidth: 1,
        fill: true,
        tension: 0.5,

        cubicInterpolationMode: "monotone",

        pointRadius: (context) => {
          const last = history.length - 1;

          return context.dataIndex === last ? 7 : 0;
        },

        pointHoverRadius: 10,
      },
    ],
  };

  // =====================================================
  // FORMAT CATEGORY
  // =====================================================
  const formatCategory = (text) => {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // =====================================================
  // CHART OPTIONS
  // =====================================================
  const options = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 400,
    },

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        labels: {
          color: "#fff",
          usePointStyle: true,
          pointStyle: "circle",

          // Supaya legend lebih aman di layar sempit
          boxWidth: 8,
          boxHeight: 8,
          padding: 12,
          font: {
            size: 11,
          },
        },
      },

      tooltip: {
        backgroundColor: "#09090B",
        borderColor: "#27272A",
        borderWidth: 1,
        cornerRadius: 14,
        padding: 14,
        titleColor: "#fff",
        bodyColor: "#D4D4D8",

        callbacks: {
          title(context) {
            const date = new Date(history[context[0].dataIndex].created_at);

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
              }) + " WITA",
            ];
          },

          label(context) {
            const item = history[context.dataIndex];

            switch (context.dataset.label) {
              case "Curah Hujan":
                return `Curah Hujan : ${item.rain} mm • ${formatCategory(item.rain_fuzzy)}`;

              case "Kelembaban Tanah":
                return `Kelembaban Tanah : ${item.soil}% • ${formatCategory(item.soil_fuzzy)}`;

              case "Kemiringan Lereng":
                return `Kemiringan Lereng : ${item.tilt}° • ${formatCategory(item.tilt_fuzzy)}`;

              default:
                return context.formattedValue;
            }
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#9CA3AF",

          // Menghindari label terlalu padat
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7,

          font: {
            size: 10,
          },
        },

        grid: {
          color: "rgba(255,255,255,.05)",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#9CA3AF",

          font: {
            size: 10,
          },
        },

        grid: {
          color: "rgba(255,255,255,.05)",
        },
      },
    },
  };

  // =====================================================
  // EXPORT EXCEL
  // =====================================================
  const handleExportExcel = async () => {
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
  };

  // =====================================================
  // EXPORT PDF
  // =====================================================
  const handleExportPDF = async () => {
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
  };

  return (
    <div
      className="
        relative

        flex
        h-[440px]
        w-full
        min-w-0
        flex-col

        rounded-2xl

        border
        border-white/10

        bg-white/5
        backdrop-blur-xl

        p-3

        shadow-2xl

        min-[375px]:p-4

        sm:h-[460px]
        sm:rounded-3xl
        sm:p-5

        md:h-[480px]
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
          mb-4

          flex
          w-full
          min-w-0

          flex-col

          gap-4

          sm:mb-5

          md:flex-row
          md:items-start
          md:justify-between

          lg:mb-6
          lg:items-center
      "
      >
        {/* =================================================
            TITLE
        ================================================= */}
        <div className="min-w-0">
          <h3
            className="
              text-base
              font-semibold
              text-white

              sm:text-lg

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

              lg:mt-0
              lg:text-sm
            "
          >
            Data sensor berdasarkan rentang waktu
          </p>
        </div>

        {/* =================================================
            FILTER + EXPORT
        ================================================= */}
        <div
          className="
            flex
            w-full
            min-w-0

            flex-wrap
            items-center

            gap-1.5

            sm:gap-2

            md:w-auto
            md:justify-end
          "
        >
          {/* 1 JAM */}
          <button
            onClick={() => setRange("1h")}
            className={`
              shrink-0

              rounded-full

              px-2.5
              py-2

              text-[10px]
              font-medium

              transition

              min-[375px]:px-3
              min-[375px]:text-[11px]

              sm:px-4
              sm:text-sm

              ${
                range === "1h"
                  ? "bg-emerald-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }
            `}
          >
            1 Jam
          </button>

          {/* 24 JAM */}
          <button
            onClick={() => setRange("1d")}
            className={`
              shrink-0

              rounded-full

              px-2.5
              py-2

              text-[10px]
              font-medium

              transition

              min-[375px]:px-3
              min-[375px]:text-[11px]

              sm:px-4
              sm:text-sm

              ${
                range === "1d"
                  ? "bg-emerald-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }
            `}
          >
            24 Jam
          </button>

          {/* =================================================
              CUSTOM
          ================================================= */}
          <div className="relative min-w-0" ref={customDropdownRef}>
            <button
              onClick={() => {
                setShowExportMenu(false);

                setShowCustomPanel((prev) => !prev);
              }}
              className={`
                flex
                shrink-0
                items-center

                gap-1

                rounded-full

                px-2.5
                py-2

                text-[10px]
                font-medium

                transition

                min-[375px]:px-3
                min-[375px]:text-[11px]

                sm:gap-2
                sm:px-4
                sm:text-sm

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
                  h-3.5
                  w-3.5

                  shrink-0

                  transition-transform
                  duration-300

                  sm:h-4
                  sm:w-4

                  ${showCustomPanel ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* =================================================
                CUSTOM DROPDOWN
            ================================================= */}
            <AnimatePresence>
              {showCustomPanel && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 8,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    absolute
                    left-0
                    top-full
                    z-50

                    mt-2

                    w-[min(18rem,calc(100vw-2rem))]

                    rounded-2xl

                    border
                    border-white/10

                    bg-[#111827]/95
                    backdrop-blur-xl

                    p-3

                    shadow-2xl

                    sm:left-auto
                    sm:right-0
                    sm:w-72
                    sm:p-4
                  "
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        className="
                          mb-2
                          block
                          text-xs
                          text-gray-400
                        "
                      >
                        Tanggal Mulai
                      </label>

                      <input
                        type="date"
                        value={draftStartDate}
                        onChange={(e) => setDraftStartDate(e.target.value)}
                        className="
                          w-full
                          min-w-0

                          rounded-xl

                          border
                          border-white/10

                          bg-white/5

                          px-3
                          py-2

                          text-sm
                          text-white

                          sm:px-4
                        "
                      />
                    </div>

                    <div>
                      <label
                        className="
                          mb-2
                          block
                          text-xs
                          text-gray-400
                        "
                      >
                        Tanggal Selesai
                      </label>

                      <input
                        type="date"
                        value={draftEndDate}
                        onChange={(e) => setDraftEndDate(e.target.value)}
                        className="
                          w-full
                          min-w-0

                          rounded-xl

                          border
                          border-white/10

                          bg-white/5

                          px-3
                          py-2

                          text-sm
                          text-white

                          sm:px-4
                        "
                      />
                    </div>

                    <button
                      onClick={() => {
                        setRange("custom");

                        setCustomRange({
                          start: draftStartDate,
                          end: draftEndDate,
                        });

                        setShowCustomPanel(false);
                      }}
                      className="
                        w-full

                        rounded-xl

                        bg-emerald-500

                        py-2.5

                        text-sm
                        text-white

                        transition

                        hover:bg-emerald-600

                        sm:py-3
                      "
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =================================================
              EXPORT
          ================================================= */}
          <div className="relative min-w-0" ref={exportDropdownRef}>
            <button
              onClick={() => {
                setShowCustomPanel(false);

                setShowExportMenu((prev) => !prev);
              }}
              className="
                flex
                shrink-0
                items-center

                gap-1

                rounded-full

                bg-white/5

                px-2.5
                py-2

                text-[10px]
                font-medium
                text-white

                transition

                hover:bg-white/10

                min-[375px]:px-3
                min-[375px]:text-[11px]

                sm:gap-2
                sm:px-4
                sm:text-sm
              "
            >
              <Download
                className="
                  h-3.5
                  w-3.5
                  shrink-0

                  sm:h-4
                  sm:w-4
                "
              />

              <span>Export</span>

              <ChevronDown
                className={`
                  h-3.5
                  w-3.5
                  shrink-0

                  transition-transform

                  sm:h-[15px]
                  sm:w-[15px]

                  ${showExportMenu ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* =================================================
                EXPORT DROPDOWN
            ================================================= */}
            <AnimatePresence>
              {showExportMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 8,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    absolute
                    right-0
                    top-full
                    z-50

                    mt-2

                    w-48

                    overflow-hidden

                    rounded-2xl

                    border
                    border-white/10

                    bg-[#111827]/95
                    backdrop-blur-xl

                    shadow-2xl

                    sm:w-56
                  "
                >
                  <button
                    onClick={handleExportExcel}
                    className="
                      flex
                      w-full
                      items-center

                      gap-3

                      px-4
                      py-3

                      text-left
                      text-xs
                      text-white

                      transition

                      hover:bg-white/5

                      sm:text-sm
                    "
                  >
                    <FileSpreadsheet
                      className="
                        h-4
                        w-4
                        shrink-0

                        sm:h-[18px]
                        sm:w-[18px]
                      "
                    />
                    Export Excel
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="
                      flex
                      w-full
                      items-center

                      gap-3

                      px-4
                      py-3

                      text-left
                      text-xs
                      text-white

                      transition

                      hover:bg-white/5

                      sm:text-sm
                    "
                  >
                    <FileText
                      className="
                        h-4
                        w-4
                        shrink-0

                        sm:h-[18px]
                        sm:w-[18px]
                      "
                    />
                    Export PDF
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* =================================================
          CHART
      ================================================= */}
      <div
        className="
          relative

          min-h-0
          min-w-0

          flex-1

          overflow-hidden

          lg:h-[380px]
          lg:flex-none
        "
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
