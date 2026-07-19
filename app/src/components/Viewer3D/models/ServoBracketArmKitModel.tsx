export const SERVO_BRACKET_ARM_KIT_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Servo Mounting Holes': [-0.15, 0.3, 0.31],
  'Horn Attachment Point': [0, 0.34, 0.02],
  'Joint Bearing/Idler': [0.15, -0.02, 0.31],
};

export default function ServoBracketArmKitModel() {
  return (
    <group>
      {/* U-bracket sides */}
      <mesh position={[0, 0.15, 0.28]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.04]} />
        <meshStandardMaterial color="#e8482a" roughness={0.4} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.15, -0.28]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.04]} />
        <meshStandardMaterial color="#e8482a" roughness={0.4} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -0.08, 0]} castShadow>
        <boxGeometry args={[0.5, 0.04, 0.6]} />
        <meshStandardMaterial color="#e8482a" roughness={0.4} transparent opacity={0.9} />
      </mesh>

      {/* Servo body inside the bracket */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.35, 0.45]} />
        <meshStandardMaterial color="#2f5fa8" roughness={0.45} />
      </mesh>
      {/* Horn */}
      <mesh position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
        <meshStandardMaterial color="#f2f2f5" roughness={0.35} />
      </mesh>
    </group>
  );
}
