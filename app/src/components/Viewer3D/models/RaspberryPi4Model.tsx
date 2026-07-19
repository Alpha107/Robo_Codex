import { PcbBoard, UsbConnector, headerPositions } from './parts';

const WIDTH = 2.4;
const DEPTH = 1.6;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

const gpioPins = [
  '3V3', '5V', 'GPIO2 (SDA1)', 'GPIO3 (SCL1)', 'GPIO4', 'GPIO14 (TXD)', 'GPIO15 (RXD)', 'GPIO17', 'GPIO18', 'GPIO27',
  'GPIO22', 'GPIO23', 'GPIO24', 'GPIO10 (MOSI)', 'GPIO9 (MISO)', 'GPIO11 (SCLK)', 'GPIO8 (CE0)', 'GPIO7 (CE1)', 'GPIO25', 'GPIO5',
  'GPIO6', 'GPIO12', 'GPIO13', 'GPIO19', 'GPIO16', 'GPIO26', 'GPIO20', 'GPIO21', 'GND',
];

const HEADER_Z = DEPTH / 2 - 0.05;
const PIN_Y = TOP + 0.16;

export const RASPBERRY_PI_4_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  gpioPins,
  -WIDTH / 2 + 0.15,
  WIDTH / 2 - 0.55,
  HEADER_Z,
  PIN_Y,
);

export default function RaspberryPi4Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#2e7d32" />

      {/* GPIO header housing */}
      <mesh position={[-0.3, TOP + 0.06, HEADER_Z]} castShadow>
        <boxGeometry args={[WIDTH - 0.7, 0.12, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* BCM SoC */}
      <mesh position={[0, TOP + 0.03, -0.2]} castShadow>
        <boxGeometry args={[0.45, 0.06, 0.45]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* USB-A ports (stacked) */}
      <mesh position={[WIDTH / 2 + 0.1, 0.15, 0.4]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.3]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>
      <mesh position={[WIDTH / 2 + 0.1, 0.15, 0.05]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.3]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* Ethernet jack */}
      <mesh position={[WIDTH / 2 + 0.08, 0.16, -0.45]} castShadow>
        <boxGeometry args={[0.16, 0.22, 0.32]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* USB-C power + micro-HDMI x2 on the opposite edge */}
      <UsbConnector position={[-WIDTH / 2 - 0.08, 0.09, -0.55]} type="C" rotation={[0, Math.PI / 2, 0]} />
      <mesh position={[-WIDTH / 2 - 0.06, 0.08, -0.15]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.18]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>
      <mesh position={[-WIDTH / 2 - 0.06, 0.08, 0.1]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.18]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>
    </group>
  );
}
