import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

const SensorContext = createContext(null);

export function SensorProvider({ children }) {
  const [sensor, setSensor] = useState(null);
  const [history, setHistory] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter grafik
  const [range, setRange] = useState("1h");

  const [customRange, setCustomRange] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    let mounted = true;

    async function loadInitialData() {
      try {
        setLoading(true);

        const historyRequest =
          range === "custom"
            ? api.get(`/sensor/history?start=${customRange.start}&end=${customRange.end}`)
            : api.get(`/sensor/history?range=${range}`);

        const timelineRequest =
          range === "custom"
            ? api.get(`/sensor/timeline?start=${customRange.start}&end=${customRange.end}`)
            : api.get("/sensor/timeline");

        const [historyResponse, latestResponse, timelineResponse] = await Promise.all([
          historyRequest,
          api.get("/sensor/latest"),
          timelineRequest,
        ]);

        if (!mounted) return;

        // ============================
        // HISTORY GRAFIK
        // ============================

        setHistory(historyResponse.data || []);

        // ============================
        // DATA TERBARU
        // ============================

        if (latestResponse.data) {
          setSensor(latestResponse.data);
        }

        // ============================
        // TIMELINE
        // ============================

        setTimeline(timelineResponse.data || []);
      } catch (err) {
        console.error("Gagal mengambil data awal:", err.message);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadInitialData();

    // ============================
    // SOCKET REALTIME
    // ============================

    const handleSensorUpdate = (data) => {
      if (!mounted) return;

      console.log("Realtime :", data);

      // ============================
      // Status Card
      // ============================

      setSensor(data);

      // ============================
      // Grafik hanya realtime jika
      // filter 1 Jam
      // ============================

      if (range === "1h") {
        setHistory((prev) => {
          const now = Date.now();

          const next = [...prev, data];

          return next.filter((item) => {
            const time = new Date(item.created_at).getTime();

            return now - time <= 60 * 60 * 1000;
          });
        });
      }

      // ============================
      // Timeline
      // ============================

      setTimeline((prev) => {
        const latest = prev[0];

        // Jika status belum berubah
        if (latest && latest.status === data.status) {
          return prev;
        }

        return [data, ...prev].slice(0, 20);
      });
    };

    socket.on("sensorUpdate", handleSensorUpdate);

    return () => {
      mounted = false;

      socket.off("sensorUpdate", handleSensorUpdate);
    };
  }, [range, customRange]);

  return (
    <SensorContext.Provider
      value={{
        sensor,
        history,
        timeline,
        loading,
        range,
        setRange,
        customRange,
        setCustomRange,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
}

export default SensorContext;
