import { useContext } from "react";
import SensorContext from "../context/SensorContext";

export default function useSensor() {
  return useContext(SensorContext);
}
