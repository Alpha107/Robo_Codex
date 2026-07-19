import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.4;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const MPU6050_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SCL', 'SDA', 'XDA', 'XCL', 'AD0', 'INT'],
  -0.19,
  0.19,
  -DEPTH / 2 + 0.03,
  TOP + 0.15,
);

export default function Mpu6050Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {/* MPU chip (small QFN) */}
      <mesh position={[0, TOP + 0.02, 0.06]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* Header housing */}
      <mesh position={[0, TOP + 0.05, -DEPTH / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.42, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
