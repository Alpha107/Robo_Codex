import { PcbBoard, DipChip, headerPositions } from './parts';

const PCB_WIDTH = 1.7;
const PCB_DEPTH = 0.75;
const PCB_HEIGHT = 0.12;

const DIGIT_W = 0.3;
const DIGIT_H = 0.5;
const DIGIT_THICK = 0.12;
const DIGIT_Y = PCB_HEIGHT / 2 + DIGIT_H / 2;

const SEG_LEN = 0.16;
const SEG_THICK = 0.03;

// x positions for the 4 digits, evenly spread with a small central gap for the colon
const DIGIT_XS = [-0.6, -0.2, 0.2, 0.6];

export const TM1637_DISPLAY_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'CLK', 'DIO'],
  -0.45,
  0.45,
  PCB_DEPTH / 2 + 0.12,
  -PCB_HEIGHT / 2 - 0.03,
);

function HSeg({ x, y }: { x: number; y: number }) {
  return (
    <mesh position={[x, y, DIGIT_THICK / 2 + 0.005]}>
      <boxGeometry args={[SEG_LEN, SEG_THICK, 0.01]} />
      <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
    </mesh>
  );
}

function VSeg({ x, y }: { x: number; y: number }) {
  return (
    <mesh position={[x, y, DIGIT_THICK / 2 + 0.005]}>
      <boxGeometry args={[SEG_THICK, SEG_LEN, 0.01]} />
      <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
    </mesh>
  );
}

function Digit({ x }: { x: number }) {
  return (
    <group position={[x, DIGIT_Y, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[DIGIT_W, DIGIT_H, DIGIT_THICK]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.5} />
      </mesh>
      <HSeg x={0} y={DIGIT_H / 2 - 0.06} />
      <VSeg x={SEG_LEN / 2 + 0.01} y={DIGIT_H / 4 - 0.02} />
      <VSeg x={SEG_LEN / 2 + 0.01} y={-DIGIT_H / 4 + 0.02} />
      <HSeg x={0} y={-DIGIT_H / 2 + 0.06} />
      <VSeg x={-SEG_LEN / 2 - 0.01} y={-DIGIT_H / 4 + 0.02} />
      <VSeg x={-SEG_LEN / 2 - 0.01} y={DIGIT_H / 4 - 0.02} />
      <HSeg x={0} y={0} />
    </group>
  );
}

export default function Tm1637DisplayModel() {
  return (
    <group>
      <PcbBoard width={PCB_WIDTH} depth={PCB_DEPTH} />

      {DIGIT_XS.map((x) => (
        <Digit key={x} x={x} />
      ))}

      {/* Colon dots between digit 2 and 3 */}
      <mesh position={[0, DIGIT_Y + 0.08, DIGIT_THICK / 2 + 0.005]}>
        <boxGeometry args={[0.03, 0.03, 0.01]} />
        <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, DIGIT_Y - 0.08, DIGIT_THICK / 2 + 0.005]}>
        <boxGeometry args={[0.03, 0.03, 0.01]} />
        <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
      </mesh>

      {/* TM1637 driver chip, mounted between the digits and the header */}
      <DipChip position={[0, PCB_HEIGHT / 2 + 0.03, PCB_DEPTH / 2 - 0.18]} size={[0.5, 0.06, 0.22]} />

      {/* 4-pin header block (VCC, GND, CLK, DIO) */}
      <mesh position={[0, -PCB_HEIGHT / 2 - 0.01, PCB_DEPTH / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.95, 0.1, 0.14]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>
    </group>
  );
}
