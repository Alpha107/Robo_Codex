import { PcbBoard, headerPositions } from './parts';

const PANEL_W = 0.9;
const PANEL_D = 0.7;
const PANEL_H = 0.04;

const BOARD_W = 0.35;
const BOARD_D = 0.3;
const BOARD_H = 0.06;

export const RAIN_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'AOUT', 'DOUT'],
  -0.12,
  0.12,
  -PANEL_D / 2 - BOARD_D - 0.05,
  BOARD_H / 2 + 0.02,
);

export default function RainSensorModel() {
  return (
    <group>
      {/* Sensing panel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[PANEL_W, PANEL_H, PANEL_D]} />
        <meshStandardMaterial color="#0c3d2e" roughness={0.5} />
      </mesh>
      {/* Grid of copper traces */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-PANEL_W / 2 + 0.1 + i * 0.1, PANEL_H / 2 + 0.002, 0]}>
          <boxGeometry args={[0.02, 0.002, PANEL_D - 0.1]} />
          <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Comparator board */}
      <group position={[0, 0, -PANEL_D / 2 - BOARD_D / 2 - 0.05]}>
        <PcbBoard width={BOARD_W} depth={BOARD_D} height={BOARD_H} color="#1560bd" />
        <mesh position={[0, BOARD_H / 2 + 0.02, -0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color="#e8a020" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
