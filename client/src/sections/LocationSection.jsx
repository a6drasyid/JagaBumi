import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const position = [-8.3807, 116.5312]; // Pusuk Sembalun (perkiraan)

export default function LocationSection() {
  return (
    <section id="lokasi" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-emerald-400">Lokasi Penelitian</p>

          <h2 className="text-5xl font-bold mt-4">Pusuk Sembalun</h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto">
            Sistem dipasang pada kawasan lereng di Pusuk Sembalun, Kabupaten Lombok Timur, Nusa
            Tenggara Barat, sebagai lokasi penelitian implementasi IoT dan Fuzzy Mamdani untuk
            mitigasi longsor.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-white/10">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-[500px] w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position}>
                <Popup>Pusuk Sembalun</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Info */}
          <div className="glass-card rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">
            <h3 className="text-2xl font-bold">Informasi Lokasi</h3>

            <div className="space-y-6 mt-8">
              <div>
                <p className="text-gray-400">Lokasi</p>
                <h4 className="font-semibold">Pusuk Sembalun</h4>
              </div>

              <div>
                <p className="text-gray-400">Kabupaten</p>
                <h4 className="font-semibold">Lombok Timur</h4>
              </div>

              <div>
                <p className="text-gray-400">Provinsi</p>
                <h4 className="font-semibold">Nusa Tenggara Barat</h4>
              </div>

              <div>
                <p className="text-gray-400">Negara</p>
                <h4 className="font-semibold">Indonesia</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
