import { PcbBoard, headerPositions } from './parts';

const WIDTH = 1.3;
const DEPTH = 1.0;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.1;

const logicPins = ['RPWM', 'LPWM', 'R_EN', 'L_EN', 'R_IS', 'L_IS', 'VCC', 'GND'];

export const BTS7960_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(logicPins, -0.55, 0.55, -DEPTH / 2 + 0.08, PIN_Y),
  'B+': [-0.35, TOP + 0.16, DEPTH / 2 - 0.08],
  'B-': [-0.12, TOP + 0.16, DEPTH / 2 - 0.08],
  'M+': [0.12, TOP + 0.16, DEPTH / 2 - 0.08],
  'M-': [0.35, TOP + 0.16, DEPTH / 2 - 0.08],
};

export default function BTS7960Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1c1c1e" />

      {/* Two large heatsinked ICs side by side */}
      <mesh position={[-0.25, TOP + 0.09, 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.18, 0.4]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.25, TOP + 0.09, 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.18, 0.4]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Power screw terminals */}
      <mesh position={[0, TOP + 0.06, DEPTH / 2 - 0.08]} castShadow>
        <boxGeometry args={[1.0, 0.12, 0.14]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>

      {/* Logic pin header */}
      <mesh position={[0, TOP + 0.06, -DEPTH / 2 + 0.08]} castShadow>
        <boxGeometry args={[1.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>
    </group>
  );
}
