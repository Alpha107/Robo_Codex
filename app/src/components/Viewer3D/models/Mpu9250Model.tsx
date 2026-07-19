import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.42;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const MPU9250_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SCL', 'SDA', 'AD0', 'NCS', 'INT', 'FSYNC'],
  -0.19,
  0.19,
  -DEPTH / 2 + 0.03,
  TOP + 0.15,
);

export default function Mpu9250Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#2e7d32" />

      <mesh position={[0, TOP + 0.02, 0.08]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      <mesh position={[0, TOP + 0.05, -DEPTH / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.42, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
