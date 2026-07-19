import { PcbBoard, headerPositionsZ } from './parts';

const WIDTH = 0.45;
const DEPTH = 0.65;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.02;

const pins = ['GND', 'VCC', 'CE', 'CSN', 'SCK', 'MOSI', 'MISO', 'IRQ'];

export const NRF24L01_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositionsZ(
  pins,
  DEPTH / 2 - 0.05,
  -DEPTH / 2 + 0.15,
  -WIDTH / 2 + 0.03,
  PIN_Y,
);

export default function Nrf24l01Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* RF chip */}
      <mesh position={[0.08, TOP + 0.015, -0.15]} castShadow>
        <boxGeometry args={[0.16, 0.03, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* PCB trace antenna pattern (inverted-F, approximated) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[0, TOP + 0.001, -DEPTH / 2 + 0.08 + i * 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3 - i * 0.05, 0.015]} />
          <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
