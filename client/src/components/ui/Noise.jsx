import noise from "../../assets/noise.svg";

export default function Noise() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.035] -z-40"
      style={{
        backgroundImage: `url(${noise})`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
