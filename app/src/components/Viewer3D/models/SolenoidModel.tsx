const COIL_LEN = 0.5;
const COIL_R = 0.22;

export const SOLENOID_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Coil+': [0.22, 0.22, -COIL_LEN / 2 + 0.15],
  'Coil-': [-0.22, 0.22, -COIL_LEN / 2 + 0.15],
};

export default function SolenoidModel() {
  return (
    <group>
      {/* Coil body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[COIL_R, COIL_R, COIL_LEN, 24]} />
        <meshStandardMaterial color="#2b2f36" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Winding ridges */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -COIL_LEN / 2 + 0.08 + i * 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[COIL_R + 0.005, 0.01, 8, 24]} />
          <meshStandardMaterial color="#8a6d1f" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Plunger rod extending from front */}
      <mesh position={[0, 0, COIL_LEN / 2 + 0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.75} roughness={0.25} />
      </mesh>
      {/* Mounting bracket at base */}
      <mesh position={[0, 0, -COIL_LEN / 2 - 0.03]} castShadow>
        <boxGeometry args={[COIL_R * 2.2, COIL_R * 2.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Coil lead wires, angled out past the coil's radius so they stay visible */}
      {[0.22, -0.22].map((x) => (
        <mesh
          key={x}
          position={[x / 2, 0.11, -COIL_LEN / 2 + 0.03]}
          rotation={[0, 0, x > 0 ? -Math.PI / 4 : Math.PI / 4]}
          castShadow
        >
          <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
          <meshStandardMaterial color="#d1342a" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
