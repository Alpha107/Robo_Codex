import { PcbBoard, headerPositionsZ, Led } from './parts';

const WIDTH = 0.5;
const DEPTH = 0.58;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.02;

// Real XBee modules use a 2x10 castellated edge; we surface the pins that matter.
const leftPins = ['VCC', 'DOUT', 'DIN', 'RESET'];
const rightPins = ['GND', 'CTS', 'RTS', 'ASSOCIATE'];

export const XBEE_MODULE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(leftPins, DEPTH / 2 - 0.06, -DEPTH / 2 + 0.14, -WIDTH / 2 + 0.02, PIN_Y),
  ...headerPositionsZ(rightPins, DEPTH / 2 - 0.06, -DEPTH / 2 + 0.14, WIDTH / 2 - 0.02, PIN_Y),
  RSSI_PWM: [0, PIN_Y, -DEPTH / 2 + 0.03],
};

export default function XbeeModuleModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* RF shield can covering the radio section */}
      <mesh position={[0, TOP + 0.035, 0.08]} castShadow>
        <boxGeometry args={[WIDTH - 0.06, 0.07, 0.34]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.65} roughness={0.32} />
      </mesh>

      {/* Chip antenna at the top edge */}
      <mesh position={[0, TOP + 0.02, DEPTH / 2 - 0.06]} castShadow>
        <boxGeometry args={[0.14, 0.03, 0.1]} />
        <meshStandardMaterial color="#d9c07a" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Association status LED */}
      <Led position={[0.16, TOP + 0.005, -0.22]} color="#4dabff" />

      {/* Castellated edge pin strips (visual only, real pins are on the board edge) */}
      <mesh position={[-WIDTH / 2 + 0.01, TOP + 0.005, -0.1]}>
        <boxGeometry args={[0.02, 0.02, 0.32]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[WIDTH / 2 - 0.01, TOP + 0.005, -0.1]}>
        <boxGeometry args={[0.02, 0.02, 0.32]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
