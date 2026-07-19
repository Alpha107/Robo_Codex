const TUBE_LEN = 1.1;
const TUBE_R = 0.14;
const ROD_LEN = 0.5;

export const LINEAR_ACTUATOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Motor+': [-TUBE_LEN / 2 - 0.05, 0.06, 0],
  'Motor-': [-TUBE_LEN / 2 - 0.05, -0.06, 0],
  'Potentiometer Wiper': [-TUBE_LEN / 2 - 0.05, 0, 0.08],
};

export default function LinearActuatorModel() {
  return (
    <group>
      {/* Motor body */}
      <mesh position={[-TUBE_LEN / 2 + 0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[TUBE_R + 0.03, TUBE_R + 0.03, 0.35, 20]} />
        <meshStandardMaterial color="#3a4046" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Main tube housing */}
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[TUBE_R, TUBE_R, TUBE_LEN, 24]} />
        <meshStandardMaterial color="#9aa0a8" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Extending rod */}
      <mesh position={[TUBE_LEN / 2 + ROD_LEN / 2 - 0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, ROD_LEN, 16]} />
        <meshStandardMaterial color="#e8e8ec" metalness={0.75} roughness={0.2} />
      </mesh>
      {/* End mounting brackets */}
      <mesh position={[-TUBE_LEN / 2 - 0.05, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.24, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh position={[TUBE_LEN / 2 + ROD_LEN - 0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.24, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
    </group>
  );
}
