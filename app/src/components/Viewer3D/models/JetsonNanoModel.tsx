import { PcbBoard, headerPositions } from './parts';

const WIDTH = 2.6;
const DEPTH = 2.0;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

const gpioPins = [
  'Pin 1 (3V3)', 'Pin 2 (5V)', 'Pin 6 (GND)', 'Pin 3 (I2C SDA)', 'Pin 5 (I2C SCL)', 'Pin 7', 'Pin 8 (UART TX)', 'Pin 10 (UART RX)',
  'Pin 11', 'Pin 12', 'Pin 13', 'Pin 15', 'Pin 18', 'Pin 19 (SPI MOSI)', 'Pin 21 (SPI MISO)', 'Pin 23 (SPI SCK)',
  'Pin 24 (SPI CE0)', 'Pin 29', 'Pin 31', 'Pin 32', 'Pin 33',
];

const HEADER_Z = DEPTH / 2 - 0.08;
const PIN_Y = TOP + 0.16;

export const JETSON_NANO_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  gpioPins,
  -0.6,
  1.2,
  HEADER_Z,
  PIN_Y,
);

export default function JetsonNanoModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1b1f24" />

      {/* Heatsink over the SoM */}
      <mesh position={[-0.3, TOP + 0.13, -0.3]} castShadow>
        <boxGeometry args={[1.3, 0.22, 1.1]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.7} roughness={0.3} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.9 + i * 0.19, TOP + 0.26, -0.3]} castShadow>
          <boxGeometry args={[0.02, 0.05, 1.05]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* GPIO header housing */}
      <mesh position={[0.3, TOP + 0.06, HEADER_Z]} castShadow>
        <boxGeometry args={[2.0, 0.12, 0.12]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>

      {/* 4x USB 3.0 ports (2x2 stack) */}
      {[0.35, 0.05].map((z, row) =>
        [0, 1].map((col) => (
          <mesh key={`${row}-${col}`} position={[WIDTH / 2 + 0.1, 0.16 + col * 0.2, 0.5 + z]} castShadow>
            <boxGeometry args={[0.2, 0.16, 0.28]} />
            <meshStandardMaterial color="#1c3fae" metalness={0.4} roughness={0.4} />
          </mesh>
        )),
      )}

      {/* HDMI + DisplayPort */}
      <mesh position={[WIDTH / 2 + 0.08, 0.14, -0.5]} castShadow>
        <boxGeometry args={[0.16, 0.14, 0.3]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>
      <mesh position={[WIDTH / 2 + 0.08, 0.14, -0.85]} castShadow>
        <boxGeometry args={[0.16, 0.14, 0.24]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>

      {/* CSI camera connectors */}
      <mesh position={[-1.0, TOP + 0.01, 0.2]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.1]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.4} />
      </mesh>
      <mesh position={[-1.0, TOP + 0.01, -0.65]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.1]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.4} />
      </mesh>
    </group>
  );
}
