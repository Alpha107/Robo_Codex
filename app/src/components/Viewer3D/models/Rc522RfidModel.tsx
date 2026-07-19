import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.6;
const DEPTH = 0.6;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const RC522_RFID_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['SDA (SS)', 'SCK', 'MOSI', 'MISO', 'IRQ', 'GND', 'RST', '3.3V'],
  -0.24,
  0.24,
  -DEPTH / 2 + 0.04,
  TOP + 0.02,
);

export default function Rc522RfidModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {/* Antenna coil (concentric square rings) */}
      {[0.24, 0.19, 0.14].map((s, i) => (
        <mesh key={i} position={[0, TOP + 0.001, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[s - 0.015, s, 4]} />
          <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* RC522 chip */}
      <mesh position={[0, TOP + 0.015, 0.02]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
    </group>
  );
}
