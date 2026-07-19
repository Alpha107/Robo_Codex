const W = 1.4;
const D = 1.0;
const H = 0.04;

export const ROBOT_CHASSIS_KIT_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Motor Mount (Left)': [-W / 2 - 0.03, 0.1, 0.25],
  'Motor Mount (Right)': [-W / 2 - 0.03, 0.1, -0.25],
  'Caster Mount': [W / 2 - 0.1, H / 2 + 0.02, 0],
  'Deck Standoffs': [-W / 2 + 0.1, 0.26, D / 2 - 0.1],
  'Component Mounting Holes': [-0.5, H / 2 + 0.02, -0.35],
};

export default function RobotChassisKitModel() {
  return (
    <group>
      {/* Acrylic base plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#7ec8e3" transparent opacity={0.5} roughness={0.3} />
      </mesh>

      {/* Mounting holes pattern */}
      {[-0.5, -0.2, 0.1, 0.4].map((x) =>
        [-0.35, 0.35].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, H / 2 + 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.02, 0.03, 12]} />
            <meshStandardMaterial color="#2b2f36" />
          </mesh>
        )),
      )}

      {/* Motor mount brackets */}
      <mesh position={[-W / 2 - 0.03, 0, 0.25]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.3]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} />
      </mesh>
      <mesh position={[-W / 2 - 0.03, 0, -0.25]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.3]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} />
      </mesh>

      {/* Standoffs at corners */}
      {[
        [-W / 2 + 0.1, D / 2 - 0.1],
        [-W / 2 + 0.1, -D / 2 + 0.1],
        [W / 2 - 0.1, D / 2 - 0.1],
        [W / 2 - 0.1, -D / 2 + 0.1],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
