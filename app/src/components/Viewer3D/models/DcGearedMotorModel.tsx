const BODY_LEN = 0.55;
const BODY_R = 0.22;
const GEARBOX_W = 0.4;

export const DC_GEARED_MOTOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Terminal A': [-0.55, 0.06, 0.14],
  'Terminal B': [-0.55, -0.06, 0.14],
};

export default function DcGearedMotorModel() {
  return (
    <group>
      {/* Metal motor cylinder, laid on its side along X */}
      <mesh position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[BODY_R, BODY_R, BODY_LEN, 24]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Yellow gearbox */}
      <mesh position={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[GEARBOX_W, 0.4, 0.4]} />
        <meshStandardMaterial color="#f0c419" roughness={0.5} />
      </mesh>
      {/* Output shaft */}
      <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 12]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Wire leads */}
      <mesh position={[-0.55, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[-0.55, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
