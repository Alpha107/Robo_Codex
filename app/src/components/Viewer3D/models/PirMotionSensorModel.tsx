import { PcbBoard, headerPositions } from './parts';

const BOARD_W = 0.55;
const BOARD_D = 0.42;
const BOARD_H = 0.06;
const TOP = BOARD_H / 2;
const DOME_R = 0.24;

export const PIR_MOTION_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'OUT', 'GND'],
  -0.14,
  0.14,
  -BOARD_D / 2 + 0.04,
  TOP + 0.18,
);

export default function PirMotionSensorModel() {
  return (
    <group>
      <PcbBoard width={BOARD_W} depth={BOARD_D} height={BOARD_H} color="#2e7d32" />

      {/* Signature white/translucent fresnel dome, the recognizable feature */}
      <mesh position={[0, TOP + 0.02, 0.03]} castShadow>
        <sphereGeometry args={[DOME_R, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#f4f2ea"
          roughness={0.25}
          metalness={0}
          transparent
          opacity={0.75}
        />
      </mesh>
      {/* Faint fresnel ring lines on the dome for a lens-like look */}
      {[0.1, 0.16, 0.21].map((r) => (
        <mesh key={r} position={[0, TOP + 0.005, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.006, 32]} />
          <meshStandardMaterial color="#d8d5c8" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Small round sensor carrier board under the dome */}
      <mesh position={[0, TOP + 0.005, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[DOME_R - 0.01, 28]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.6} />
      </mesh>

      {/* Two trimpots (sensitivity + delay) on the main board */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, TOP + 0.03, -0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 14]} />
          <meshStandardMaterial color="#3a6bd8" roughness={0.5} />
        </mesh>
      ))}

      {/* 3-pin header */}
      <mesh position={[0, TOP + 0.05, -BOARD_D / 2 + 0.04]} castShadow>
        <boxGeometry args={[0.34, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
