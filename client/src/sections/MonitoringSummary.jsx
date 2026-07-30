import MonitoringCard from "../components/MonitoringCard";
import useSensor from "../hooks/useSensor";

import { CloudRain, Droplets, Mountain, ShieldAlert } from "lucide-react";

export default function MonitoringSummary() {
  const { sensor, history } = useSensor();

  console.log(sensor);
  console.log(history);

  return (
    <section id="monitoring" className="py-32 bg-gradient-to-b from-[#050505] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <p className="text-emerald-400 uppercase tracking-widest">Monitoring</p>

          <h2 className="text-5xl font-bold mt-3">Kondisi Lereng Secara Real-time</h2>

          <p className="text-gray-400 mt-5 max-w-3xl">
            Data berikut berasal dari sensor IoT yang dipasang pada area penelitian dan diperbarui
            secara langsung.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <MonitoringCard
            icon={CloudRain}
            title="Curah Hujan"
            value={sensor?.rain}
            unit="mm"
            category={sensor?.rain_fuzzy}
            color="bg-blue-500"
            iconBg="bg-blue-500/10"
            iconBorder="border-blue-500/20"
            iconColor="text-blue-400"
            status={
              sensor?.created_at
                ? `Last Update ${new Date(sensor.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} WITA`
                : "Menunggu data..."
            }
          />

          <MonitoringCard
            icon={Droplets}
            title="Kelembaban Tanah"
            value={sensor?.soil}
            unit="%"
            category={sensor?.soil_fuzzy}
            color="bg-emerald-500"
            iconBg="bg-emerald-500/10"
            iconBorder="border-emerald-500/20"
            iconColor="text-emerald-400"
            status={
              sensor?.created_at
                ? `Last Update ${new Date(sensor.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} WITA`
                : "Menunggu data..."
            }
          />

          <MonitoringCard
            icon={Mountain}
            title="Kemiringan Lereng"
            value={sensor?.tilt}
            unit="°"
            category={sensor?.tilt_fuzzy}
            color="bg-orange-400"
            iconBg="bg-orange-500/10"
            iconBorder="border-orange-500/20"
            iconColor="text-orange-400"
            status={
              sensor?.created_at
                ? `Last Update ${new Date(sensor.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} WITA`
                : "Menunggu data..."
            }
          />

          <MonitoringCard
            icon={ShieldAlert}
            title="Status Sistem"
            value={sensor?.status}
            unit=""
            iconBg={
              sensor?.status === "AMAN"
                ? "bg-emerald-500/10"
                : sensor?.status === "WASPADA"
                  ? "bg-yellow-500/10"
                  : "bg-red-500/10"
            }
            iconBorder={
              sensor?.status === "AMAN"
                ? "border-emerald-500/20"
                : sensor?.status === "WASPADA"
                  ? "border-yellow-500/20"
                  : "border-red-500/20"
            }
            iconColor={
              sensor?.status === "AMAN"
                ? "text-emerald-400"
                : sensor?.status === "WASPADA"
                  ? "text-yellow-400"
                  : "text-red-400"
            }
            status={sensor ? `Indeks Risiko ${sensor.fuzzy_value}%` : "Menunggu data..."}
          />
        </div>
      </div>
    </section>
  );
}
