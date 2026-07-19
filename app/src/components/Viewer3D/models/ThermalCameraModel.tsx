import { PcbBoard, headerPositions } from './parts';

const BOARD_W = 0.4;
const BOARD_D = 0.32;
const BOARD_H = 0.06;
const TOP = BOARD_H / 2;

export const THERMAL_CAMERA_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SDA', 'SCL'],
  -0.14,
  0.14,
  -BOARD_D / 2 + 0.03,
  TOP + 0.15,
);

export default function ThermalCameraModel() {
  return (
    <group>
      <PcbBoard width={BOARD_W} depth={BOARD_D} height={BOARD_H} color="#1c1c1e" />

      {/* Chunky matte housing (boxier than a normal camera, no glass shine) */}
      <mesh position={[0, TOP + 0.09, 0.02]} castShadow>
        <boxGeometry args={[0.24, 0.18, 0.22]} />
        <meshStandardMaterial color="#2b2d31" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Matte sensor window, flush and dark, no shine/ring */}
      <mesh position={[0, TOP + 0.09, 0.02 + 0.11 + 0.001]} castShadow>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshStandardMaterial color="#111214" roughness={0.95} metalness={0} />
      </mesh>

      {/* Small die/chip visible on the PCB behind the housing */}
      <mesh position={[0, TOP + 0.015, -0.08]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* Header housing */}
      <mesh position={[0, TOP + 0.05, -BOARD_D / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
