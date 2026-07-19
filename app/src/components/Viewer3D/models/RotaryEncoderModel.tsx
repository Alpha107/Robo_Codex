import { PcbBoard, headerPositions } from './parts';

const WIDTH = 0.45;
const DEPTH = 0.4;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

export const ROTARY_ENCODER_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['GND', 'VCC', 'SW', 'DT', 'CLK'],
  -0.17,
  0.17,
  -DEPTH / 2 + 0.03,
  TOP + 0.02,
);

export default function RotaryEncoderModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* Body of the encoder */}
      <mesh position={[0, TOP + 0.08, 0.06]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.16, 16]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, TOP + 0.2, 0.06]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.1, 12]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Knob cap */}
      <mesh position={[0, TOP + 0.27, 0.06]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
    </group>
  );
}
