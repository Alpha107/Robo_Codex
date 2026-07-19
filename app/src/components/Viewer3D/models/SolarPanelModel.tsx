import { PcbBoard } from './parts';

// Solar panel
const PANEL_WIDTH = 1.8;
const PANEL_DEPTH = 1.1;
const PANEL_THICK = 0.05;
const PANEL_X = -0.9;

// Charge controller board
const CTRL_WIDTH = 0.6;
const CTRL_DEPTH = 0.45;
const CTRL_HEIGHT = 0.1;
const CTRL_X = 1.0;
const CTRL_TOP = CTRL_HEIGHT / 2;

export const SOLAR_PANEL_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'PANEL+': [PANEL_X + PANEL_WIDTH / 2 - 0.15, PANEL_THICK / 2, PANEL_DEPTH / 2 + 0.08],
  'PANEL-': [PANEL_X + PANEL_WIDTH / 2 - 0.35, PANEL_THICK / 2, PANEL_DEPTH / 2 + 0.08],
  'BAT+': [CTRL_X - 0.15, -CTRL_TOP, CTRL_DEPTH / 2 + 0.05],
  'BAT-': [CTRL_X - 0.03, -CTRL_TOP, CTRL_DEPTH / 2 + 0.05],
  'LOAD+': [CTRL_X + 0.1, -CTRL_TOP, CTRL_DEPTH / 2 + 0.05],
  'LOAD-': [CTRL_X + 0.22, -CTRL_TOP, CTRL_DEPTH / 2 + 0.05],
};

const GRID_COLS = 5;
const GRID_ROWS = 3;

function GridLines() {
  return (
    <>
      {Array.from({ length: GRID_COLS - 1 }).map((_, idx) => {
        const i = idx + 1;
        const x = -PANEL_WIDTH / 2 + (PANEL_WIDTH / GRID_COLS) * i;
        return (
          <mesh key={`v-${i}`} position={[x, PANEL_THICK / 2 + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.012, PANEL_DEPTH - 0.06]} />
            <meshStandardMaterial color="#3a5f9a" emissive="#3a5f9a" emissiveIntensity={0.3} />
          </mesh>
        );
      })}
      {Array.from({ length: GRID_ROWS - 1 }).map((_, idx) => {
        const i = idx + 1;
        const z = -PANEL_DEPTH / 2 + (PANEL_DEPTH / GRID_ROWS) * i;
        return (
          <mesh key={`h-${i}`} position={[0, PANEL_THICK / 2 + 0.003, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[PANEL_WIDTH - 0.06, 0.012]} />
            <meshStandardMaterial color="#3a5f9a" emissive="#3a5f9a" emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </>
  );
}

function TerminalBlock({ x }: { x: number }) {
  return (
    <group position={[x, CTRL_TOP + 0.035, CTRL_DEPTH / 2 - 0.05]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.09, 0.13]} />
        <meshStandardMaterial color="#1f7a3d" roughness={0.5} />
      </mesh>
      <mesh position={[-0.05, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.02, 10]} />
        <meshStandardMaterial color="#888c92" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.05, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.02, 10]} />
        <meshStandardMaterial color="#888c92" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function SolarPanelModel() {
  return (
    <group>
      {/* Solar panel */}
      <group position={[PANEL_X, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[PANEL_WIDTH, PANEL_THICK, PANEL_DEPTH]} />
          <meshStandardMaterial color="#0c1626" roughness={0.35} metalness={0.4} />
        </mesh>
        <GridLines />
        {/* Panel frame edge */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[PANEL_WIDTH + 0.03, PANEL_THICK - 0.01, PANEL_DEPTH + 0.03]} />
          <meshStandardMaterial color="#2a2f38" roughness={0.5} wireframe />
        </mesh>
        {/* Small terminal pads at the edge for PANEL+/PANEL- */}
        <mesh position={[PANEL_WIDTH / 2 - 0.15, PANEL_THICK / 2 + 0.005, PANEL_DEPTH / 2 + 0.03]}>
          <boxGeometry args={[0.06, 0.01, 0.06]} />
          <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[PANEL_WIDTH / 2 - 0.35, PANEL_THICK / 2 + 0.005, PANEL_DEPTH / 2 + 0.03]}>
          <boxGeometry args={[0.06, 0.01, 0.06]} />
          <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.35} />
        </mesh>
      </group>

      {/* Charge controller board */}
      <group position={[CTRL_X, 0, 0]}>
        <PcbBoard width={CTRL_WIDTH} depth={CTRL_DEPTH} height={CTRL_HEIGHT} color="#0b6e77" />
        <TerminalBlock x={-0.15} />
        <TerminalBlock x={0.16} />
        {/* Small status LED */}
        <mesh position={[0, CTRL_TOP + 0.02, -CTRL_DEPTH / 2 + 0.08]}>
          <boxGeometry args={[0.04, 0.03, 0.03]} />
          <meshStandardMaterial color="#3ddc5a" emissive="#3ddc5a" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}
