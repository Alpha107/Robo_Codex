import { PcbBoard, UsbConnector, headerPositions } from './parts';

const WIDTH = 1.3;
const DEPTH = 0.6;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;

const gpioPins = [
  '3V3', '5V', 'GND', 'GPIO2 (SDA1)', 'GPIO3 (SCL1)', 'GPIO4', 'GPIO14 (TXD)', 'GPIO15 (RXD)', 'GPIO17', 'GPIO18',
  'GPIO27', 'GPIO22', 'GPIO23', 'GPIO10 (MOSI)', 'GPIO9 (MISO)', 'GPIO11 (SCLK)', 'GPIO8 (CE0)', 'GPIO25', 'GPIO5', 'GPIO6',
  'GPIO12', 'GPIO13', 'GPIO19', 'GPIO16', 'GPIO26', 'GPIO20', 'GPIO21',
];

const HEADER_Z = DEPTH / 2 - 0.03;
const PIN_Y = TOP + 0.01;

export const RASPBERRY_PI_ZERO_W_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  gpioPins,
  -WIDTH / 2 + 0.08,
  WIDTH / 2 - 0.08,
  HEADER_Z,
  PIN_Y,
);

export default function RaspberryPiZeroWModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#5b2a86" />

      {/* BCM SoC */}
      <mesh position={[-0.15, TOP + 0.025, -0.05]} castShadow>
        <boxGeometry args={[0.28, 0.05, 0.28]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* Mini-HDMI */}
      <mesh position={[WIDTH / 2 + 0.04, 0.06, -0.15]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.14]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>

      <UsbConnector position={[WIDTH / 2 + 0.05, 0.06, 0.1]} type="microB" rotation={[0, Math.PI / 2, 0]} />
      <UsbConnector position={[WIDTH / 2 + 0.05, 0.06, 0.22]} type="microB" rotation={[0, Math.PI / 2, 0]} />

      {/* Camera connector */}
      <mesh position={[0.35, TOP + 0.01, -DEPTH / 2 + 0.04]} castShadow>
        <boxGeometry args={[0.2, 0.03, 0.06]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.4} />
      </mesh>
    </group>
  );
}
