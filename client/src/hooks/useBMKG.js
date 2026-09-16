import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function useBMKG() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(`${API}/bmkg`);

        if (!mounted) return;

        if (res.data.success) {
          const data = res.data.data;

          // Ambil data cuaca saat ini
          const current = data.current;

          // Ambil prakiraan 24 jam (8 interval × 3 jam)
          const forecast24h = (data.forecast24h || []).slice(0, 8).map((item) => ({
            time: new Date(item.local_datetime).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            weather: item.weather_desc,
            temp: item.t,
            humidity: item.hu,
            windSpeed: item.ws,
            windDirection: item.wd,
          }));

          setWeather({
            ...current,
            forecast24h,
          });

          setError(false);
        } else {
          throw new Error("Data BMKG kosong");
        }
      } catch (err) {
        if (!mounted) return;

        console.error("BMKG Error:", err);

        setError(true);

        // Data fallback jika API gagal
        setWeather({
          weather: "Data BMKG tidak tersedia",
          temperature: "--",
          humidity: "--",
          windSpeed: "--",
          windDirection: "--",
          localTime: "Offline",
          forecast24h: [],
        });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Ambil data pertama kali
    fetchWeather();

    // Refresh otomatis setiap 30 menit
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { weather, loading, error };
}