import { PcbBoard, headerPositions, Led } from './parts';

const WIDTH = 0.7;
const DEPTH = 0.35;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const HC05_BLUETOOTH_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'TXD', 'RXD', 'STATE', 'EN/KEY'],
  -0.26,
  0.26,
  -DEPTH / 2 + 0.03,
  TOP + 0.03,
);

export default function Hc05BluetoothModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* Bluetooth metal-can module */}
      <mesh position={[0, TOP + 0.06, 0.06]} castShadow>
        <boxGeometry args={[0.35, 0.12, 0.18]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>

      <Led position={[0.28, TOP + 0.01, 0.06]} color="#ffa94d" />
    </group>
  );
}
