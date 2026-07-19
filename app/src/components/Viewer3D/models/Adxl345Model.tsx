import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.45;
const DEPTH = 0.4;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const ADXL345_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'SCL/SCLK', 'SDA/SDI', 'SDO', 'CS', 'INT1', 'INT2'],
  -0.17,
  0.17,
  -DEPTH / 2 + 0.03,
  TOP + 0.15,
);

export default function Adxl345Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#d9631b" />

      <mesh position={[0, TOP + 0.015, 0.08]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      <mesh position={[0, TOP + 0.05, -DEPTH / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.38, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
