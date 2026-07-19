const R = 0.1;

export const STANDARD_LED_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Anode (+)': [-0.05, -0.3, 0],
  'Cathode (-)': [0.05, -0.22, 0],
};

export default function StandardLedModel() {
  return (
    <group>
      {/* Cylindrical body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[R, R, 0.16, 24]} />
        <meshStandardMaterial color="#d1342a" emissive="#d1342a" emissiveIntensity={0.3} transparent opacity={0.75} />
      </mesh>
      {/* Domed top */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[R, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d1342a" emissive="#d1342a" emissiveIntensity={0.3} transparent opacity={0.75} />
      </mesh>
      {/* Flat edge marker (cathode side) */}
      <mesh position={[0.095, -0.02, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.15]} />
        <meshStandardMaterial color="#d1342a" emissive="#d1342a" emissiveIntensity={0.3} transparent opacity={0.75} />
      </mesh>
      {/* Two legs, anode longer */}
      <mesh position={[-0.05, -0.24, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.32, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.05, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
