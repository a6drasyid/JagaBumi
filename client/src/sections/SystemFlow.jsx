import StepCard from "../components/StepCard";
import {
  CloudRain,
  Droplets,
  Mountain,
  Cpu,
  BrainCircuit,
  ServerCog,
  MonitorSmartphone,
  MessageCircleMore,
} from "lucide-react";

const steps = [
  {
    icon: CloudRain,
    title: "Rain Gauge",
    description: "Mengukur curah hujan.",
  },
  {
    icon: Droplets,
    title: "FC-28",
    description: "Mengukur kelembaban tanah.",
  },
  {
    icon: Mountain,
    title: "MPU6050",
    description: "Mengukur perubahan kemiringan.",
  },
  {
    icon: Cpu,
    title: "ESP32",
    description: "Mengumpulkan data sensor.",
  },
  {
    icon: BrainCircuit,
    title: "Fuzzy Mamdani",
    description: "Menentukan tingkat risiko.",
  },
  {
    icon: ServerCog,
    title: "Node.js API",
    description: "Mengirim data ke server.",
  },
  {
    icon: MonitorSmartphone,
    title: "Website",
    description: "Monitoring real-time.",
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp",
    description: "Mengirim notifikasi.",
  },
];

export default function SystemFlow() {
  return (
    <section id="system" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <p className="uppercase tracking-widest text-emerald-400">Cara Kerja</p>

          <h2 className="text-5xl font-bold mt-4">Bagaimana Sistem Bekerja</h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto">
            Sistem mengintegrasikan sensor IoT, metode Fuzzy Mamdani, dan website monitoring untuk
            memberikan peringatan dini secara real-time.
          </p>
        </div>

        <div className="flex gap-10 overflow-x-auto pb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <StepCard {...step} />

              {index < steps.length - 1 && <div className="mx-6 text-3xl text-emerald-400">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
