import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;
const SOCKET = import.meta.env.VITE_SOCKET_URL;

export default function useStatistics() {
  const [stats, setStats] = useState({
    totalData: 0,
    accuracy: 99,
    monitoringDays: 0,
    activeSensors: 3,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io(SOCKET, {
      transports: ["websocket"],
    });

    async function loadStatistics() {
      try {
        const res = await axios.get(`${API}/statistics`);

        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil statistik:", err);
      } finally {
        setLoading(false);
      }
    }

    // Load pertama
    loadStatistics();

    // Realtime setiap ESP32 mengirim data baru
    socket.on("sensorUpdate", () => {
      loadStatistics();
    });

    return () => {
      socket.off("sensorUpdate");
      socket.disconnect();
    };
  }, []);

  return { stats, loading };
}