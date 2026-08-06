import { createContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

const SensorContext = createContext(null);

export function SensorProvider({ children }) {
  // =====================================================
  // STATE
  // =====================================================
  const [sensor, setSensor] = useState(null);
  const [history, setHistory] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FILTER GRAFIK
  // =====================================================
  const [range, setRange] = useState("1h");

  const [customRange, setCustomRange] = useState({
    start: "",
    end: "",
  });

  // =====================================================
  // INITIAL DATA
  //
  // Latest + timeline cukup diambil ketika provider
  // pertama kali aktif.
  // Tidak perlu fetch ulang hanya karena filter chart berubah.
  // =====================================================
  useEffect(() => {
    let active = true;

    async function loadInitialData() {
      try {
        setLoading(true);

        const [latestResponse, timelineResponse] = await Promise.all([
          api.get("/sensor/latest"),
          api.get("/sensor/timeline"),
        ]);

        if (!active) return;

        // =================================================
        // DATA TERBARU
        // =================================================
        if (latestResponse.data) {
          setSensor(latestResponse.data);
        }

        // =================================================
        // TIMELINE
        // =================================================
        setTimeline(timelineResponse.data || []);
      } catch (err) {
        if (!active) return;

        console.error("Gagal mengambil data awal:", err.message);
      }
    }

    loadInitialData();

    return () => {
      active = false;
    };
  }, []);

  // =====================================================
  // HISTORY GRAFIK
  //
  // Hanya history yang perlu berubah ketika filter grafik
  // berubah.
  // =====================================================
  useEffect(() => {
    let active = true;

    async function loadHistory() {
      try {
        let response;

        // =================================================
        // CUSTOM RANGE
        // =================================================
        if (range === "custom") {
          // Jangan request jika tanggal belum lengkap.
          if (!customRange.start || !customRange.end) {
            return;
          }

          response = await api.get(
            `/sensor/history?start=${customRange.start}&end=${customRange.end}`
          );
        } else {
          // =================================================
          // NORMAL RANGE
          // =================================================
          response = await api.get(`/sensor/history?range=${range}`);
        }

        if (!active) return;

        setHistory(response.data || []);
      } catch (err) {
        if (!active) return;

        console.error("Gagal mengambil history sensor:", err.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      active = false;
    };
  }, [range, customRange.start, customRange.end]);

  // =====================================================
  // SOCKET REALTIME
  //
  // Listener hanya didaftarkan sekali.
  // =====================================================
  useEffect(() => {
    const handleSensorUpdate = (data) => {
      if (!data) return;

      // =================================================
      // SENSOR TERBARU
      // =================================================
      setSensor((prev) => {
        // Jika event yang sama masuk dua kali,
        // jangan trigger render yang tidak diperlukan.
        if (
          prev?.created_at === data.created_at &&
          prev?.rain === data.rain &&
          prev?.soil === data.soil &&
          prev?.tilt === data.tilt &&
          prev?.status === data.status &&
          prev?.fuzzy_value === data.fuzzy_value
        ) {
          return prev;
        }

        return data;
      });

      // =================================================
      // TIMELINE
      //
      // Hanya tambah timeline jika status berubah.
      // =================================================
      setTimeline((prev) => {
        const latest = prev[0];

        if (latest && latest.status === data.status) {
          return prev;
        }

        return [data, ...prev].slice(0, 20);
      });
    };

    socket.on("sensorUpdate", handleSensorUpdate);

    return () => {
      socket.off("sensorUpdate", handleSensorUpdate);
    };
  }, []);

  // =====================================================
  // SOCKET -> HISTORY REALTIME
  //
  // Dipisahkan karena history hanya menerima realtime
  // ketika range === "1h".
  // =====================================================
  useEffect(() => {
    if (range !== "1h") {
      return undefined;
    }

    const handleHistoryUpdate = (data) => {
      if (!data) return;

      setHistory((prev) => {
        // =================================================
        // CEGAH DATA DUPLIKAT
        // =================================================
        const lastItem = prev[prev.length - 1];

        if (lastItem?.created_at === data.created_at) {
          return prev;
        }

        const now = Date.now();
        const oneHourAgo = now - 60 * 60 * 1000;

        // =================================================
        // Cari index data pertama yang masih masuk
        // dalam periode satu jam.
        //
        // Ini menghindari pembuatan:
        //
        // [...prev, data].filter(...)
        //
        // pada setiap event.
        // =================================================
        let startIndex = 0;

        while (
          startIndex < prev.length &&
          new Date(prev[startIndex].created_at).getTime() < oneHourAgo
        ) {
          startIndex++;
        }

        // =================================================
        // Jika tidak ada data lama yang perlu dibuang
        // =================================================
        if (startIndex === 0) {
          return [...prev, data];
        }

        // =================================================
        // Buang data lama kemudian tambahkan data terbaru
        // =================================================
        return [...prev.slice(startIndex), data];
      });
    };

    socket.on("sensorUpdate", handleHistoryUpdate);

    return () => {
      socket.off("sensorUpdate", handleHistoryUpdate);
    };
  }, [range]);

  // =====================================================
  // CONTEXT VALUE
  //
  // Mencegah object Provider dibuat ulang hanya karena
  // SensorProvider sendiri mengalami parent render.
  // =====================================================
  const contextValue = useMemo(
    () => ({
      sensor,
      history,
      timeline,
      loading,
      range,
      setRange,
      customRange,
      setCustomRange,
    }),
    [sensor, history, timeline, loading, range, customRange]
  );

  return <SensorContext.Provider value={contextValue}>{children}</SensorContext.Provider>;
}

export default SensorContext;
