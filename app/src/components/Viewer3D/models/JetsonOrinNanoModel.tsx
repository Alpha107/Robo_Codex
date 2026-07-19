import { PcbBoard, UsbConnector, headerPositions } from './parts';

// NVIDIA Jetson Orin Nano - similar Pi-form-factor carrier board to the older
// Jetson Nano, but with a visibly bigger heatsink (beefier GPU), plus an
// M.2 NVMe slot, USB-C power, and a DisplayPort output the older board lacks.

const WIDTH = 2.6;
const DEPTH = 2.0;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

const gpioPins = [
  'Pin 1 (3V3)',
  'Pin 2 (5V)',
  'Pin 6 (GND)',
  'Pin 3 (I2C SDA)',
  'Pin 5 (I2C SCL)',
  'Pin 8 (UART TX)',
  'Pin 10 (UART RX)',
  'Pin 19 (SPI MOSI)',
  'Pin 21 (SPI MISO)',
  'Pin 23 (SPI SCK)',
  'Pin 24 (SPI CE0)',
  'Pin 32 (PWM)',
  'Pin 33 (PWM)',
];

const HEADER_Z = DEPTH / 2 - 0.08;
const PIN_Y = TOP + 0.16;

export const JETSON_ORIN_NANO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(gpioPins, -0.6, 1.2, HEADER_Z, PIN_Y),
  'USB-C Power Input': [-WIDTH / 2 - 0.2, 0.09, -0.7],
  'DisplayPort Output': [-WIDTH / 2 - 0.2, 0.08, -0.3],
  'CSI Camera Port 1': [-1.15, TOP + 0.05, 0.3],
  'CSI Camera Port 2': [-1.15, TOP + 0.05, -0.75],
  'M.2 NVMe Slot': [0.9, TOP + 0.12, -0.6],
  'Ethernet Port': [WIDTH / 2 + 0.2, 0.16, -0.5],
};

export default function JetsonOrinNanoModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1b1f24" />

      {/* Bigger heatsink over the SoM (beefier than the older Jetson Nano) */}
      <mesh position={[-0.3, TOP + 0.16, -0.3]} castShadow>
        <boxGeometry args={[1.6, 0.32, 1.4]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.7} roughness={0.3} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-1.1 + i * (1.6 / 9), TOP + 0.34, -0.3]} castShadow>
          <boxGeometry args={[0.02, 0.06, 1.35]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* GPIO header housing */}
      <mesh position={[0.3, TOP + 0.06, HEADER_Z]} castShadow>
        <boxGeometry args={[2.0, 0.12, 0.12]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>

      {/* 4x USB 3.2 ports (2x2 stack) */}
      {[0.35, 0.05].map((z, row) =>
        [0, 1].map((col) => (
          <mesh key={`${row}-${col}`} position={[WIDTH / 2 + 0.1, 0.16 + col * 0.2, 0.5 + z]} castShadow>
            <boxGeometry args={[0.2, 0.16, 0.28]} />
            <meshStandardMaterial color="#1c3fae" metalness={0.4} roughness={0.4} />
          </mesh>
        )),
      )}

      {/* Ethernet jack */}
      <mesh position={[WIDTH / 2 + 0.08, 0.16, -0.5]} castShadow>
        <boxGeometry args={[0.16, 0.22, 0.32]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* USB-C power + DisplayPort on the opposite edge */}
      <UsbConnector position={[-WIDTH / 2 - 0.08, 0.09, -0.7]} type="C" rotation={[0, Math.PI / 2, 0]} />
      <mesh position={[-WIDTH / 2 - 0.06, 0.08, -0.3]} castShadow>
        <boxGeometry args={[0.14, 0.1, 0.22]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>

      {/* CSI camera connectors */}
      <mesh position={[-1.1, TOP + 0.01, 0.3]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.1]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.4} />
      </mesh>
      <mesh position={[-1.1, TOP + 0.01, -0.75]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.1]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.4} />
      </mesh>

      {/* M.2 NVMe module */}
      <mesh position={[0.9, TOP + 0.03, -0.6]} castShadow>
        <boxGeometry args={[0.55, 0.03, 0.16]} />
        <meshStandardMaterial color="#15161a" roughness={0.5} />
      </mesh>
      <mesh position={[0.65, TOP + 0.01, -0.6]}>
        <boxGeometry args={[0.06, 0.01, 0.14]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
