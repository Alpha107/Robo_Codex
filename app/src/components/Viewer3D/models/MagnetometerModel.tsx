import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.42;
const DEPTH = 0.32;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const MAGNETOMETER_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SCL', 'SDA', 'DRDY'],
  -0.16,
  0.16,
  -DEPTH / 2 + 0.03,
  TOP + 0.15,
);

export default function MagnetometerModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#8a2be2" />

      {/* Small magnetometer chip on top, no other distinguishing feature */}
      <mesh position={[0, TOP + 0.015, 0.04]} castShadow>
        <boxGeometry args={[0.13, 0.03, 0.13]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* Header housing */}
      <mesh position={[0, TOP + 0.05, -DEPTH / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.36, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
