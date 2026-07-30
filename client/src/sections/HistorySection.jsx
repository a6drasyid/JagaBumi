import TimelineItem from "../components/TimelineItem";
import useSensor from "../hooks/useSensor";

function TimelineSkeleton() {
  return (
    <div className="relative pl-12 pb-10 animate-pulse">
      {/* Timeline Line */}
      <div className="absolute left-[14px] top-0 h-full w-[2px] bg-white/10"></div>

      {/* Dot */}
      <div className="absolute left-0 top-2 h-7 w-7 rounded-full bg-white/10 border-4 border-[#050505]"></div>

      {/* Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-48 rounded bg-white/10"></div>
          <div className="h-8 w-28 rounded-full bg-white/10"></div>
        </div>

        {/* Sensor */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="h-4 w-20 rounded bg-white/10"></div>
              <div className="mt-4 h-8 w-24 rounded bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HistorySection() {
  const { timeline, loading } = useSensor();
  const statusHistory = timeline;
  return (
    <section id="history" className="py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading */}

        <div className="mb-16">
          <p className="uppercase tracking-widest text-emerald-400">Riwayat</p>

          <h2 className="text-5xl font-bold mt-4">Aktivitas Monitoring</h2>

          <p className="text-gray-400 mt-5 max-w-2xl">
            Riwayat perubahan status sistem berdasarkan hasil klasifikasi Fuzzy Mamdani.
          </p>
        </div>

        {/* Loading */}

        {loading ? (
          <>
            <TimelineSkeleton />
            <TimelineSkeleton />
            <TimelineSkeleton />
          </>
        ) : statusHistory.length === 0 ? (
          // Empty State

          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-14 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl">
              📡
            </div>

            <h3 className="mt-6 text-2xl font-semibold">Belum Ada Riwayat Monitoring</h3>

            <p className="mt-4 text-gray-400 max-w-md mx-auto">
              Sistem sedang menunggu data pertama dari perangkat IoT. Timeline akan otomatis muncul
              ketika status berubah.
            </p>
          </div>
        ) : (
          // Timeline

          statusHistory.map((item) => (
            <TimelineItem
              key={`${item.created_at}-${item.status}`}

              time={new Date(item.created_at).toLocaleString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}

              rain={item.rain}

              soil={item.soil}

              tilt={item.tilt}

              fuzzy={item.fuzzy_value}

              status={item.status}
            />
          ))
        )}
      </div>
    </section>
  );
}
