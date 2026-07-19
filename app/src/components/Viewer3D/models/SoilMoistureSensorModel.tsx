import { PcbBoard, headerPositions } from './parts';

const PROBE_W = 0.35;
const PROBE_LEN = 0.9;
const PROBE_H = 0.03;

const BOARD_W = 0.35;
const BOARD_D = 0.3;
const BOARD_H = 0.06;

export const SOIL_MOISTURE_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'AOUT', 'DOUT'],
  -0.12,
  0.12,
  -PROBE_LEN / 2 - BOARD_D - 0.06,
  BOARD_H / 2 + 0.02,
);

export default function SoilMoistureSensorModel() {
  return (
    <group>
      {/* Probe blade */}
      <mesh position={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[PROBE_W, PROBE_H, PROBE_LEN]} />
        <meshStandardMaterial color="#0c3d2e" roughness={0.5} />
      </mesh>
      {/* Two exposed prongs (gold traces) */}
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, PROBE_H / 2 + 0.002, -0.15]}>
          <boxGeometry args={[0.04, 0.002, PROBE_LEN - 0.1]} />
          <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Comparator board */}
      <group position={[0, 0, -PROBE_LEN / 2 - BOARD_D / 2 - 0.05]}>
        <PcbBoard width={BOARD_W} depth={BOARD_D} height={BOARD_H} color="#1560bd" />
        <mesh position={[0, BOARD_H / 2 + 0.02, -0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color="#e8a020" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
