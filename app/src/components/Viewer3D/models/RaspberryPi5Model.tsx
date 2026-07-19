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

export const RASPBERRY_PI_5_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(gpioPins, -WIDTH / 2 + 0.15, WIDTH / 2 - 0.55, HEADER_Z, PIN_Y),
  PCIE_FFC: [-0.55, TOP + 0.02, -DEPTH / 2 + 0.06],
  FAN_HEADER: [0.35, TOP + 0.1, -0.15],
  RTC_BATTERY: [0.85, TOP + 0.02, -DEPTH / 2 + 0.06],
  PWR_BUTTON: [WIDTH / 2 - 0.15, TOP + 0.03, HEADER_Z - 0.2],
  CAM_DSI: [-0.15, TOP + 0.02, -DEPTH / 2 + 0.06],
};

export default function RaspberryPi5Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#2b7a3d" />

      {/* GPIO header housing (40-pin, same footprint as Pi 4) */}
      <mesh position={[-0.3, TOP + 0.06, HEADER_Z]} castShadow>
        <boxGeometry args={[WIDTH - 0.7, 0.12, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* BCM2712 SoC (larger than the Pi 4's BCM2711) */}
      <mesh position={[0, TOP + 0.035, -0.15]} castShadow>
        <boxGeometry args={[0.52, 0.07, 0.52]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* RP1 southbridge chip, separate from the SoC */}
      <mesh position={[0.65, TOP + 0.025, -0.35]} castShadow>
        <boxGeometry args={[0.24, 0.05, 0.24]} />
        <meshStandardMaterial color="#1c1f26" roughness={0.4} />
      </mesh>

      {/* PCIe FFC connector slot */}
      <mesh position={[-0.55, TOP + 0.015, -DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[0.4, 0.03, 0.1]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.5} />
      </mesh>

      {/* Dual camera/display MIPI connectors */}
      {[-0.15, 0.1].map((x) => (
        <mesh key={x} position={[x, TOP + 0.012, -DEPTH / 2 + 0.05]} castShadow>
          <boxGeometry args={[0.18, 0.024, 0.09]} />
          <meshStandardMaterial color="#111318" roughness={0.5} />
        </mesh>
      ))}

      {/* RTC battery connector (2-pin JST) */}
      <mesh position={[0.85, TOP + 0.015, -DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[0.08, 0.03, 0.06]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* 4-pin fan header near the SoC */}
      <mesh position={[0.35, TOP + 0.05, -0.15]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* Power button */}
      <mesh position={[WIDTH / 2 - 0.15, TOP + 0.02, HEADER_Z - 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
        <meshStandardMaterial color="#d0433e" roughness={0.4} />
      </mesh>

      {/* USB-A ports (stacked, 2x USB3.0 blue + 2x USB2.0) */}
      <mesh position={[WIDTH / 2 + 0.1, 0.15, 0.4]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.3]} />
        <meshStandardMaterial color="#1a3d8f" roughness={0.4} />
      </mesh>
      <mesh position={[WIDTH / 2 + 0.1, 0.15, 0.05]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.3]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      {/* Ethernet jack (now driven via RP1) */}
      <mesh position={[WIDTH / 2 + 0.08, 0.16, -0.45]} castShadow>
        <boxGeometry args={[0.16, 0.22, 0.32]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* USB-C power (5V/5A PD) + dual micro-HDMI on the opposite edge */}
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
