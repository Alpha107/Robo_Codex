import { PcbBoard, HeaderStrip, UsbConnector, TactileButton, headerPositionsZ } from './parts';

const WIDTH = 2.1;
const DEPTH = 2.4;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.16;

const p9 = [
  'P9_3 (3.3V)', 'P9_5 (VDD_5V)', 'P9_1 (GND)', 'P9_11', 'P9_12', 'P9_13', 'P9_14', 'P9_15', 'P9_16',
  'P9_17 (SPI0 CS0)', 'P9_18 (SPI0 D1)', 'P9_19 (I2C2 SCL)', 'P9_20 (I2C2 SDA)', 'P9_21 (UART2 TXD)',
  'P9_22 (UART2 RXD)', 'P9_24 (UART1 TXD)', 'P9_26 (UART1 RXD)',
];
const p8 = ['P8_7', 'P8_8', 'P8_9', 'P8_10', 'P8_11', 'P8_12'];

const LEFT_X = -WIDTH / 2 - 0.04;
const RIGHT_X = WIDTH / 2 + 0.04;

export const BEAGLEBONE_BLACK_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(p9, DEPTH / 2 - 0.1, -DEPTH / 2 + 0.1, LEFT_X, PIN_Y),
  ...headerPositionsZ(p8, DEPTH / 2 - 0.3, DEPTH / 2 - 1.3, RIGHT_X, PIN_Y),
};

export default function BeagleBoneBlackModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1c1c1e" />

      <HeaderStrip position={[LEFT_X, TOP + 0.08, 0]} length={DEPTH - 0.2} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} color="#4a4f58" />
      <HeaderStrip position={[RIGHT_X, TOP + 0.08, DEPTH / 2 - 0.8]} length={1.0} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} color="#4a4f58" />

      {/* AM335x SoC */}
      <mesh position={[0, TOP + 0.03, 0.2]} castShadow>
        <boxGeometry args={[0.4, 0.06, 0.4]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      <UsbConnector position={[0, 0.08, DEPTH / 2 + 0.08]} type="microB" />
      <mesh position={[0.4, 0.14, DEPTH / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.16, 0.14]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>
      <mesh position={[0.4, 0.14, -DEPTH / 2 - 0.06]} castShadow>
        <boxGeometry args={[0.16, 0.2, 0.28]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>

      <TactileButton position={[-0.3, TOP + 0.03, -DEPTH / 2 + 0.3]} radius={0.05} />

      {/* 4 user LEDs — kept away from both header rows and given a color
          outside the hotspot palette so they never read as clickable pins */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-0.15 + i * 0.09, TOP + 0.02, 0.55]}>
          <boxGeometry args={[0.04, 0.02, 0.04]} />
          <meshStandardMaterial color="#f5f5f5" emissive="#ffa94d" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}
