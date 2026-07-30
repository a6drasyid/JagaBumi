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

  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 14);

    return () => clearInterval(timer);
  }, []);

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

      // Custom ≤ 1 hari
      if (diffDay <= 1) {
        return date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      // Custom > 1 hari
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
    }

    return date.toLocaleTimeString("id-ID");
  });

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

  const formatCategory = (text) => {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

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
        },

        grid: {
          color: "rgba(255,255,255,.05)",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#9CA3AF",
        },

        grid: {
          color: "rgba(255,255,255,.05)",
        },
      },
    },
  };

  const handleExportExcel = async () => {
    try {
      let url = "http://localhost:3000/api/export/excel";

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

  const handleExportPDF = async () => {
    try {
      let url = "http://localhost:3000/api/export/pdf";

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
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Grafik Monitoring</h3>

          <p className="text-sm text-gray-400">Data sensor berdasarkan rentang waktu</p>
        </div>

        <div className="relative flex gap-2">
          <button
            onClick={() => setRange("1h")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              range === "1h"
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            1 Jam
          </button>

          <button
            onClick={() => setRange("1d")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              range === "1d"
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            24 Jam
          </button>

          <div className="relative" ref={customDropdownRef}>
            <button
              onClick={() => {
                setShowExportMenu(false);

                setShowCustomPanel((prev) => !prev);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                range === "custom"
                  ? "bg-emerald-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <span>Custom</span>

              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  showCustomPanel ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showCustomPanel && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 8, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="
absolute
right-0
top-full
mt-2
w-72
rounded-2xl
border border-white/10
bg-[#111827]/95
backdrop-blur-xl
shadow-2xl
p-4
z-50
"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Tanggal Mulai</label>

                      <input
                        type="date"
                        value={draftStartDate}
                        onChange={(e) => setDraftStartDate(e.target.value)}
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Tanggal Selesai</label>

                      <input
                        type="date"
                        value={draftEndDate}
                        onChange={(e) => setDraftEndDate(e.target.value)}
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white"
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
                      className="w-full rounded-xl bg-emerald-500 py-3 text-white hover:bg-emerald-600"
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={exportDropdownRef}>
            <button
              onClick={() => {
                setShowCustomPanel(false);

                setShowExportMenu((prev) => !prev);
              }}
              className="
        flex
        items-center
        gap-2
        rounded-full
        bg-white/5
        px-4
        py-2
        text-sm
        text-white
        hover:bg-white/10
        transition
        "
            >
              <Download size={16} />
              Export
              <ChevronDown
                size={15}
                className={`transition ${showExportMenu ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <AnimatePresence>
            {showExportMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}

                animate={{ opacity: 1, y: 8 }}

                exit={{ opacity: 0, y: -10 }}

                transition={{ duration: 0.2 }}

                className="
absolute
right-0
top-full
mt-2
w-56
rounded-2xl
border
border-white/10
bg-[#111827]/95
backdrop-blur-xl
shadow-2xl
overflow-hidden
z-50
"
              >
                <button
                  onClick={handleExportExcel}
                  className="
w-full
flex
items-center
gap-3
px-4
py-3
hover:bg-white/5
transition
"
                >
                  <FileSpreadsheet size={18} />
                  Export Excel
                </button>

                <button
                  onClick={handleExportPDF}
                  className="
w-full
flex
items-center
gap-3
px-4
py-3
hover:bg-white/5
transition
"
                >
                  <FileText size={18} />
                  Export PDF
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence initial={false}></AnimatePresence>
      <div className="h-[380px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
