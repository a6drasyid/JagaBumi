import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import FeedbackSection from "./sections/FeedbackSection";
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
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#050807] text-white">
      {/* =================================================
          FIXED BACKGROUND GLOW
          Tetap di tempat ketika halaman di-scroll
      ================================================= */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden

          bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.13),transparent_18%),radial-gradient(circle_at_85%_32%,rgba(16,185,129,0.07),transparent_18%),radial-gradient(circle_at_20%_68%,rgba(16,185,129,0.055),transparent_16%),radial-gradient(circle_at_78%_80%,rgba(16,185,129,0.065),transparent_18%)]

          before:absolute
          before:inset-0
          before:bg-[linear-gradient(180deg,rgba(16,185,129,0.018)_0%,transparent_25%,transparent_75%,rgba(16,185,129,0.02)_100%)]
        "
      />

      {/* =================================================
          GLOBAL CONTENT
      ================================================= */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main>
          <Hero />

          <MonitoringSummary />

          <SystemFlow />

          <RealtimeMonitoring />

          <HistorySection />

          <SensorSection />

          <StatisticsSection />

          <LocationSection />

          <FeedbackSection />
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
