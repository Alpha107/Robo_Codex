import { PcbBoard, headerPositions } from './parts';

const BOARD_W = 0.5;
const BOARD_D = 0.4;
const BOARD_H = 0.06;
const TOP = BOARD_H / 2;

export const MQ_GAS_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'AOUT', 'DOUT'],
  -0.15,
  0.15,
  -BOARD_D / 2 + 0.03,
  TOP + 0.02,
);

export default function MqGasSensorModel() {
  return (
    <group>
      <PcbBoard width={BOARD_W} depth={BOARD_D} height={BOARD_H} color="#1560bd" />

      {/* Black plastic base of the sensor can */}
      <mesh position={[0, TOP + 0.03, 0.05]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.06, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Metal mesh dome */}
      <mesh position={[0, TOP + 0.09, 0.05]} castShadow>
        <sphereGeometry args={[0.15, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.7} roughness={0.4} wireframe />
      </mesh>
      <mesh position={[0, TOP + 0.09, 0.05]} castShadow>
        <sphereGeometry args={[0.148, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.5} transparent opacity={0.35} />
      </mesh>

      {/* Trimpot */}
      <mesh position={[0.15, TOP + 0.02, -0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>
    </group>
  );
}
