import AuroraBackground from "./components/ui/AuroraBackground";
import FloatingGlow from "./components/ui/FloatingGlow";
import Noise from "./components/ui/Noise";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import HistorySection from "./sections/HistorySection";
import LocationSection from "./sections/LocationSection";
import MonitoringSummary from "./sections/MonitoringSummary";
import RealtimeMonitoring from "./sections/RealtimeMonitoring";
import SensorSection from "./sections/SensorSection";
import StatisticsSection from "./sections/StatisticsSection";
import SystemFlow from "./sections/SystemFlow";

import useLenis from "./hooks/useLenis";

function App() {
  useLenis();
  return (
    <div className="bg-[#050505] text-white">
      <AuroraBackground />
      <FloatingGlow />
      <Noise />

      <Navbar />

      <Hero />

      <MonitoringSummary />

      <SystemFlow />

      <RealtimeMonitoring />

      <HistorySection />

      <SensorSection />

      <StatisticsSection />

      <LocationSection />

      <Footer />
    </div>
  );
}

export default App;
