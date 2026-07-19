// Harmonic Drive Gearbox: a compact cylindrical housing (wave generator + circular
// spline) with an input shaft stub on one face and a wider, slightly offset output
// flange (flexspline) on the other. The visual point is "compact cylinder", not a
// big boxy gearbox.

const HOUSING_RADIUS = 0.9;
const HOUSING_HEIGHT = 0.6;
const TOP_Y = HOUSING_HEIGHT / 2;
const BOTTOM_Y = -HOUSING_HEIGHT / 2;

const SHAFT_RADIUS = 0.18;
const SHAFT_HEIGHT = 0.35;

const FLANGE_RADIUS = 1.0;
const FLANGE_HEIGHT = 0.15;

const BOLT_COUNT = 8;
const BOLT_RING_RADIUS = 0.72;

export const HARMONIC_DRIVE_GEARBOX_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Input Shaft': [0, TOP_Y + SHAFT_HEIGHT + 0.15, 0],
  'Output Flange': [0, BOTTOM_Y - FLANGE_HEIGHT - 0.1, 0],
  'Circular Spline Housing Mounting Bolts': [BOLT_RING_RADIUS, TOP_Y + 0.05, 0],
  'Lubrication Port': [HOUSING_RADIUS + 0.25, 0, 0],
  'Cross Roller Output Bearing': [HOUSING_RADIUS * 0.95, BOTTOM_Y - 0.02, 0],
};

export default function HarmonicDriveGearboxModel() {
  const bolts = Array.from({ length: BOLT_COUNT }, (_, i) => {
    const angle = (i / BOLT_COUNT) * Math.PI * 2;
    return [Math.cos(angle) * BOLT_RING_RADIUS, TOP_Y + 0.02, Math.sin(angle) * BOLT_RING_RADIUS] as [
      number,
      number,
      number,
    ];
  });

  return (
    <group>
      {/* Main housing (wave generator + circular spline) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[HOUSING_RADIUS, HOUSING_RADIUS, HOUSING_HEIGHT, 48]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Subtle rib line suggesting wave-generator cover plate */}
      <mesh position={[0, TOP_Y - 0.02, 0]}>
        <cylinderGeometry args={[HOUSING_RADIUS * 0.98, HOUSING_RADIUS * 0.98, 0.02, 48]} />
        <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Input shaft stub (top) */}
      <mesh position={[0, TOP_Y + SHAFT_HEIGHT / 2, 0]} castShadow>
        <cylinderGeometry args={[SHAFT_RADIUS, SHAFT_RADIUS, SHAFT_HEIGHT, 24]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Output flange (bottom, wider short disc - flexspline output) */}
      <mesh position={[0, BOTTOM_Y - FLANGE_HEIGHT / 2, 0]} castShadow>
        <cylinderGeometry args={[FLANGE_RADIUS, FLANGE_RADIUS, FLANGE_HEIGHT, 48]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Cross roller output bearing ring, seated between housing and flange */}
      <mesh position={[0, BOTTOM_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[HOUSING_RADIUS * 0.92, 0.035, 8, 48]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Circular spline mounting bolts (ring around top face) */}
      {bolts.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
          <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Lubrication port nub, sticking out radially */}
      <mesh position={[HOUSING_RADIUS + 0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.16, 16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
