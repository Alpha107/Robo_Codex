import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.9;
const DEPTH = 0.5;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;

export const IR_OBSTACLE_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'OUT'],
  -0.15,
  0.15,
  -DEPTH / 2 + 0.06,
  TOP + 0.18,
);

export default function IrObstacleSensorModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {/* IR emitter + receiver domes */}
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, TOP + 0.09, 0.08]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.18, 20]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Trimpot */}
      <mesh position={[0, TOP + 0.03, -0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
        <meshStandardMaterial color="#e8a020" roughness={0.5} />
      </mesh>

      {/* Header housing */}
      <mesh position={[0, TOP + 0.06, -DEPTH / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
