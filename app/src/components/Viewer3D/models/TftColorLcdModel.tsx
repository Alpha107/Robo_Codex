import { PcbBoard, headerPositions } from './parts';

const WIDTH = 1.0;
const DEPTH = 0.65;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const TFT_COLOR_LCD_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'CS', 'RESET', 'DC', 'SDI', 'SCK', 'LED', 'SDO'],
  -0.42,
  0.42,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function TftColorLcdModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0d0d0f" />

      {/* Black display bezel/glass area, wider/flatter than the OLED module */}
      <mesh position={[0, TOP + 0.005, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.86, 0.5]} />
        <meshStandardMaterial color="#050508" />
      </mesh>

      {/* Larger glowing full-color display area */}
      <mesh position={[0, TOP + 0.006, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.78, 0.42]} />
        <meshStandardMaterial color="#2f6fd1" emissive="#2f6fd1" emissiveIntensity={0.5} />
      </mesh>
      {/* Color accent bands to hint at full-color capability vs monochrome OLED */}
      <mesh position={[-0.26, TOP + 0.0065, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.24, 0.42]} />
        <meshStandardMaterial color="#e0433e" emissive="#e0433e" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[0.26, TOP + 0.0065, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.24, 0.42]} />
        <meshStandardMaterial color="#3ecf6e" emissive="#3ecf6e" emissiveIntensity={0.45} />
      </mesh>

      {/* SPI header row (more pins than the OLED's I2C header) */}
      <mesh position={[0, TOP + 0.06, -DEPTH / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.92, 0.12, 0.14]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
