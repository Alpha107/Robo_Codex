// Slewing Ring Bearing: a large, thin, flat ring (torusGeometry, laid flat) with a
// visible ring of small ball elements around it, plus integrated gear teeth,
// mounting bolt circles, a grease fitting and a seal lip.

const RING_RADIUS = 1.0;
const TUBE_RADIUS = 0.18;
const OUTER_EDGE = RING_RADIUS + TUBE_RADIUS;
const INNER_EDGE = RING_RADIUS - TUBE_RADIUS;

const BALL_COUNT = 20;
const BALL_RADIUS = 0.09;

const TOOTH_COUNT = 28;

export const SLEWING_RING_BEARING_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Inner Race Mounting Holes': [0, 0.1, INNER_EDGE - 0.05],
  'Outer Race Mounting Holes': [0, 0.1, OUTER_EDGE + 0.05],
  'Gear Teeth (Drive Gear)': [OUTER_EDGE * Math.cos(0.6), 0, OUTER_EDGE * Math.sin(0.6)],
  'Grease Fitting / Lubrication Port': [0, TUBE_RADIUS + 0.15, RING_RADIUS],
  Seal: [0, -TUBE_RADIUS - 0.05, INNER_EDGE + 0.05],
};

export default function SlewingRingBearingModel() {
  const balls = Array.from({ length: BALL_COUNT }, (_, i) => {
    const angle = (i / BALL_COUNT) * Math.PI * 2;
    return [Math.cos(angle) * RING_RADIUS, TUBE_RADIUS * 0.6, Math.sin(angle) * RING_RADIUS] as [
      number,
      number,
      number,
    ];
  });

  const teeth = Array.from({ length: TOOTH_COUNT }, (_, i) => {
    const angle = (i / TOOTH_COUNT) * Math.PI * 2;
    return { angle, pos: [Math.cos(angle) * (OUTER_EDGE + 0.03), 0, Math.sin(angle) * (OUTER_EDGE + 0.03)] as [
      number,
      number,
      number,
    ] };
  });

  return (
    <group>
      {/* Main flat ring (races) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[RING_RADIUS, TUBE_RADIUS, 16, 64]} />
        <meshStandardMaterial color="#71797e" metalness={0.75} roughness={0.35} />
      </mesh>

      {/* Seal lip at the inner edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[INNER_EDGE + 0.02, 0.03, 8, 64]} />
        <meshStandardMaterial color="#111318" roughness={0.7} />
      </mesh>

      {/* Visible ring of ball elements */}
      {balls.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <sphereGeometry args={[BALL_RADIUS, 16, 16]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.85} roughness={0.15} />
        </mesh>
      ))}

      {/* Integrated ring gear teeth around the outer edge */}
      {teeth.map(({ angle, pos }, i) => (
        <mesh key={i} position={pos} rotation={[0, -angle, 0]} castShadow>
          <boxGeometry args={[0.05, 0.12, 0.06]} />
          <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Grease fitting nub */}
      <mesh position={[0, TUBE_RADIUS + 0.06, RING_RADIUS]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.12, 12]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
