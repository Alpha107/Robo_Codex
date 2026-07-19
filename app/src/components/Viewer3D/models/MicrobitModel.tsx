import { PcbBoard, UsbConnector, headerPositions } from './parts';

const WIDTH = 1.8;
const DEPTH = 1.3;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;

const edgePins = ['P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P19 (SCL)', 'P20 (SDA)', '3V', 'GND'];
const EDGE_Z = -DEPTH / 2 + 0.02;
const PIN_Y = TOP + 0.02;

export const MICROBIT_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  edgePins,
  -WIDTH / 2 + 0.15,
  WIDTH / 2 - 0.15,
  EDGE_Z,
  PIN_Y,
);

const LED_ROWS = 5;
const LED_COLS = 5;
const LED_SPACING = 0.14;

export default function MicrobitModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0d0d0f" />

      {/* Gold edge connector strip */}
      <mesh position={[0, TOP + 0.005, EDGE_Z]} castShadow>
        <boxGeometry args={[WIDTH - 0.1, 0.02, 0.18]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 5x5 LED matrix */}
      <group position={[-0.15, TOP + 0.01, 0.15]}>
        {Array.from({ length: LED_ROWS }).map((_, row) =>
          Array.from({ length: LED_COLS }).map((_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[(col - 2) * LED_SPACING, 0, (row - 2) * LED_SPACING]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry args={[0.03, 12]} />
              <meshStandardMaterial color="#c0272d" emissive="#c0272d" emissiveIntensity={0.3} />
            </mesh>
          )),
        )}
      </group>

      {/* Buttons A and B */}
      <mesh position={[-0.75, TOP + 0.03, 0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>
      <mesh position={[0.75, TOP + 0.03, 0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>

      <UsbConnector position={[-0.5, 0.08, DEPTH / 2 + 0.08]} type="microB" />
      {/* Battery JST connector */}
      <mesh position={[0.6, 0.06, DEPTH / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.16, 0.08, 0.12]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>
    </group>
  );
}
