import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.4;
const DEPTH = 0.35;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const BME280_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SCL', 'SDA', 'CSB', 'SDO'],
  -0.15,
  0.15,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function Bme280Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#5b2a86" />

      {/* Small metal-lidded sensor can */}
      <mesh position={[0, TOP + 0.015, 0.07]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.1]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
