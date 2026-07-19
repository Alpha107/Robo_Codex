import { PcbBoard, DipChip, headerPositions } from './parts';

const PCB_WIDTH = 1.3;
const PCB_DEPTH = 1.3;
const PCB_HEIGHT = 0.12;
const TOP = PCB_HEIGHT / 2;

const GRID_SIZE = 8;
const CELL = 0.11;
const CELL_GAP = 0.015;
const GRID_SPAN = GRID_SIZE * CELL + (GRID_SIZE - 1) * CELL_GAP;
const GRID_START = -GRID_SPAN / 2 + CELL / 2;
const GRID_Z = -0.1; // shift grid slightly toward the back so the header/chip fit up front

export const MAX7219_DOT_MATRIX_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'DIN', 'CS', 'CLK'],
  -0.5,
  0.5,
  PCB_DEPTH / 2 + 0.1,
  -TOP - 0.02,
);

export default function Max7219DotMatrixModel() {
  const cells: number[] = Array.from({ length: GRID_SIZE });
  return (
    <group>
      <PcbBoard width={PCB_WIDTH} depth={PCB_DEPTH} color="#7a1f1f" />

      {/* Black matrix housing behind the LED grid */}
      <mesh position={[0, TOP + 0.02, GRID_Z]} castShadow>
        <boxGeometry args={[GRID_SPAN + 0.14, 0.04, GRID_SPAN + 0.14]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.5} />
      </mesh>

      {/* 8x8 grid of LED elements */}
      {cells.map((_, row) =>
        cells.map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              GRID_START + col * (CELL + CELL_GAP),
              TOP + 0.045,
              GRID_Z + GRID_START + row * (CELL + CELL_GAP),
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[CELL * 0.82, CELL * 0.82]} />
            <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.1} />
          </mesh>
        )),
      )}

      {/* MAX7219 driver chip, mounted toward the front edge */}
      <DipChip
        position={[0, TOP + 0.03, PCB_DEPTH / 2 - 0.22]}
        size={[0.75, 0.06, 0.22]}
      />

      {/* 5-pin header (VCC, GND, DIN, CS, CLK) on the front edge */}
      <mesh position={[0, -TOP - 0.01, PCB_DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[1.05, 0.1, 0.14]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>

      {/* Second header on the back edge, representing the DOUT chain-out side for daisy-chaining */}
      <mesh position={[0, -TOP - 0.01, -PCB_DEPTH / 2 - 0.05]} castShadow>
        <boxGeometry args={[1.05, 0.1, 0.14]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>
    </group>
  );
}
