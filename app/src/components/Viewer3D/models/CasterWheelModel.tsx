export const CASTER_WHEEL_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Mounting Screws': [0, 0.17, 0],
  'Ball/Swivel Point': [0.13, -0.15, 0.13],
};

export default function CasterWheelModel() {
  return (
    <group>
      {/* Mounting plate */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.03, 0.3]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Housing */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.2, 16]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} />
      </mesh>
      {/* Ball */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#e8e8ec" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}
