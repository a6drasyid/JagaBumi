import RealtimeChart from "../components/RealtimeChart";
import StatusCard from "../components/StatusCard";

export default function RealtimeMonitoring() {
  return (
    <section id="grafik" className="py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-bold mb-16">Monitoring Real-time</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RealtimeChart />
          </div>

          <StatusCard />
        </div>
      </div>
    </section>
  );
}
