import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.8;
const DEPTH = 0.45;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const FLAME_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'AOUT', 'DOUT'],
  -0.12,
  0.12,
  -DEPTH / 2 + 0.05,
  TOP + 0.17,
);

export default function FlameSensorModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#a52422" />

      {/* Single IR receiver dome (no emitter needed - flame is the source) */}
      <mesh position={[0, TOP + 0.09, 0.08]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} transparent opacity={0.85} />
      </mesh>

      {/* Trimpot */}
      <mesh position={[0.2, TOP + 0.03, -0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>

      {/* Header housing */}
      <mesh position={[0, TOP + 0.06, -DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
