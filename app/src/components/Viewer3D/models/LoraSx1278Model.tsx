import { PcbBoard, headerPositionsZ } from './parts';

const WIDTH = 0.55;
const DEPTH = 0.55;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.02;

const pins = ['GND', 'VCC', 'NSS', 'SCK', 'MOSI', 'MISO', 'RST', 'DIO0'];

export const LORA_SX1278_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(pins, DEPTH / 2 - 0.05, -DEPTH / 2 + 0.1, -WIDTH / 2 + 0.03, PIN_Y),
  ANT: [WIDTH / 2 + 0.1, TOP + 0.05, 0.1],
};

export default function LoraSx1278Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* RF shield can */}
      <mesh position={[0.1, TOP + 0.03, 0.05]} castShadow>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* SMA antenna connector */}
      <mesh position={[WIDTH / 2 + 0.05, TOP + 0.05, 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 12]} />
        <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
