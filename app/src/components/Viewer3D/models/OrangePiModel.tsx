import { PcbBoard, UsbConnector, headerPositions } from './parts';

const WIDTH = 2.3;
const DEPTH = 1.5;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

const gpioPins = ['3.3V', '5V', 'GND', 'I2C SDA', 'I2C SCL', 'UART TX', 'UART RX', 'SPI MOSI', 'SPI MISO', 'SPI SCK', 'GPIO A', 'GPIO B'];
const HEADER_Z = DEPTH / 2 - 0.06;
const PIN_Y = TOP + 0.16;

export const ORANGE_PI_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  gpioPins,
  -WIDTH / 2 + 0.2,
  WIDTH / 2 - 0.6,
  HEADER_Z,
  PIN_Y,
);

export default function OrangePiModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#d9631b" />

      <mesh position={[0.25, TOP + 0.06, HEADER_Z]} castShadow>
        <boxGeometry args={[1.6, 0.12, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      <mesh position={[0, TOP + 0.03, -0.2]} castShadow>
        <boxGeometry args={[0.4, 0.06, 0.4]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>

      <mesh position={[WIDTH / 2 + 0.1, 0.15, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.18, 0.28]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>
      <mesh position={[WIDTH / 2 + 0.08, 0.16, -0.15]} castShadow>
        <boxGeometry args={[0.16, 0.22, 0.32]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>

      <UsbConnector position={[-WIDTH / 2 - 0.06, 0.09, -0.4]} type="microB" rotation={[0, Math.PI / 2, 0]} />
      {/* 3.5mm audio jack */}
      <mesh position={[-WIDTH / 2 - 0.04, 0.09, 0.4]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
