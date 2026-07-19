import { PcbBoard, DipChip, headerPositions, MountingHole } from './parts';

// --- Load cell bar (elongated metal beam, bolted at one end) ---
const BAR_LENGTH = 1.1;
const BAR_WIDTH = 0.16;
const BAR_HEIGHT = 0.1;
const BAR_X = -0.35;
const GAUGE_BULGE_WIDTH = 0.22;

// --- HX711 amplifier PCB, positioned near the free end of the bar ---
const BOARD_WIDTH = 0.55;
const BOARD_DEPTH = 0.35;
const BOARD_HEIGHT = 0.06;
const BOARD_X = 0.55;
const BOARD_Z = 0.35;
const TOP = BOARD_HEIGHT / 2;

// 4-pin screw terminal (load cell wires) on the near edge of the board
const terminalPins = headerPositions(['E+', 'E-', 'S+', 'S-'], -0.18, 0.18, BOARD_Z - BOARD_DEPTH / 2 + 0.03, TOP + 0.04);
// 4-pin header (MCU side) on the far edge of the board
const mcuPins = headerPositions(['VCC', 'GND', 'DT', 'SCK'], -0.18, 0.18, BOARD_Z + BOARD_DEPTH / 2 - 0.03, TOP + 0.04);

export const LOAD_CELL_HX711_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...terminalPins,
  ...mcuPins,
};

export default function LoadCellHx711Model() {
  return (
    <group>
      {/* Load cell bar */}
      <group position={[BAR_X, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[BAR_LENGTH, BAR_HEIGHT, BAR_WIDTH]} />
          <meshStandardMaterial color="#b8bcc2" metalness={0.75} roughness={0.3} />
        </mesh>
        {/* Strain-gauge bulge in the middle (thinned/machined section) */}
        <mesh position={[0, -0.01, 0]} castShadow>
          <boxGeometry args={[GAUGE_BULGE_WIDTH, BAR_HEIGHT * 0.6, BAR_WIDTH + 0.02]} />
          <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Fixed-end mounting hole */}
        <MountingHole position={[-BAR_LENGTH / 2 + 0.1, BAR_HEIGHT / 2 + 0.001, 0]} radius={0.045} />
        {/* Free-end (load application) mounting hole */}
        <MountingHole position={[BAR_LENGTH / 2 - 0.1, BAR_HEIGHT / 2 + 0.001, 0]} radius={0.045} />
      </group>

      {/* HX711 amplifier board */}
      <group position={[BOARD_X, -0.02, BOARD_Z]}>
        <PcbBoard width={BOARD_WIDTH} depth={BOARD_DEPTH} height={BOARD_HEIGHT} color="#8a2be2" />
        <DipChip position={[0, TOP + 0.03, 0]} size={[0.28, 0.05, 0.14]} />
        {/* Screw terminal block for the load cell wires */}
        <mesh position={[0, TOP + 0.03, -BOARD_DEPTH / 2 + 0.04]} castShadow>
          <boxGeometry args={[0.32, 0.08, 0.08]} />
          <meshStandardMaterial color="#111318" roughness={0.6} />
        </mesh>
        {/* MCU-side header */}
        <mesh position={[0, TOP + 0.03, BOARD_DEPTH / 2 - 0.04]} castShadow>
          <boxGeometry args={[0.32, 0.06, 0.08]} />
          <meshStandardMaterial color="#111318" roughness={0.6} />
        </mesh>
      </group>

      {/* Wire bundle connecting the load cell to the HX711 terminal */}
      {(() => {
        const barEndX = BAR_X + BAR_LENGTH / 2;
        const termX = BOARD_X;
        const termZ = BOARD_Z - BOARD_DEPTH / 2 + 0.03;
        const dx = termX - barEndX;
        const dz = termZ;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);
        return (
          <group position={[(barEndX + termX) / 2, -0.03, termZ / 2]} rotation={[0, angle, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, length, 8]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
            </mesh>
          </group>
        );
      })()}
    </group>
  );
}
