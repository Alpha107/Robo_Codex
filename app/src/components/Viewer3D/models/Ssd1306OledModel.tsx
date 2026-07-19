import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.65;
const DEPTH = 0.4;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

export const SSD1306_OLED_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['GND', 'VCC', 'SCL', 'SDA'],
  -0.14,
  0.14,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function Ssd1306OledModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0d0d0f" />

      {/* Black display glass area with a cyan glowing screen */}
      <mesh position={[0, TOP + 0.005, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.26]} />
        <meshStandardMaterial color="#04141a" />
      </mesh>
      <mesh position={[0, TOP + 0.006, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.44, 0.2]} />
        <meshStandardMaterial color="#38d9c9" emissive="#38d9c9" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}
