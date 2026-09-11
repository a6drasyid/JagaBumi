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
          setWeather(res.data.data);
          setError(false);
        } else {
          throw new Error("Data BMKG kosong");
        }
      } catch (err) {
        if (!mounted) return;

        console.error("BMKG Error:", err);

        setError(true);
        setWeather({
          weather: "Data BMKG tidak tersedia",
          temperature: "--",
          humidity: "--",
          windSpeed: "--",
          windDirection: "--",
          localTime: "Offline",
        });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { weather, loading, error };
}