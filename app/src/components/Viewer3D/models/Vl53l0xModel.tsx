import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.35;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const VL53L0X_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VIN', 'GND', 'SDA', 'SCL', 'GPIO1', 'XSHUT'],
  -0.2,
  0.2,
  -DEPTH / 2 + 0.04,
  TOP + 0.15,
);

export default function Vl53l0xModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* Sensor die window */}
      <mesh position={[0, TOP + 0.02, 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.14]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[-0.04, TOP + 0.041, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#3a1a4a" roughness={0.15} />
      </mesh>
      <mesh position={[0.04, TOP + 0.041, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#3a1a4a" roughness={0.15} />
      </mesh>

      {/* Header housing */}
      <mesh position={[0, TOP + 0.05, -DEPTH / 2 + 0.04]} castShadow>
        <boxGeometry args={[0.42, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
