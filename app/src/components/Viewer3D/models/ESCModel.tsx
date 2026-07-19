const BODY_LEN = 0.9;
const BODY_W = 0.4;
const BODY_H = 0.18;

export const ESC_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Battery+': [-BODY_LEN / 2 - 0.15, 0.03, 0.08],
  'Battery-': [-BODY_LEN / 2 - 0.15, 0.03, -0.08],
  Signal: [BODY_LEN / 2 + 0.2, 0, 0.14],
  'BEC+ (5V)': [BODY_LEN / 2 + 0.2, 0, 0.05],
  'GND (signal)': [BODY_LEN / 2 + 0.2, 0, -0.04],
  'Phase A': [BODY_LEN / 2 + 0.15, 0, -0.14],
  'Phase B': [BODY_LEN / 2 + 0.25, 0, -0.18],
  'Phase C': [BODY_LEN / 2 + 0.35, 0, -0.14],
};

export default function ESCModel() {
  return (
    <group>
      {/* Heat-shrink wrapped body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_LEN, BODY_H, BODY_W]} />
        <meshStandardMaterial color="#1560bd" roughness={0.4} />
      </mesh>

      {/* Battery wires (thick) */}
      <mesh position={[-BODY_LEN / 2 - 0.1, 0.03, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.25, 8]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[-BODY_LEN / 2 - 0.1, 0.03, -0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.25, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Signal servo-style wires */}
      {[0.14, 0.05, -0.04].map((z, i) => {
        const colors = ['#e8901f', '#d1342a', '#3b2a1f'];
        return (
          <mesh key={z} position={[BODY_LEN / 2 + 0.12, 0, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 0.24, 8]} />
            <meshStandardMaterial color={colors[i]} />
          </mesh>
        );
      })}

      {/* Phase wires (thicker, to motor) */}
      {[-0.14, -0.18, -0.14].map((z, i) => (
        <mesh
          key={i}
          position={[BODY_LEN / 2 + 0.15 + i * 0.1, 0, z]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#2b2f36" />
        </mesh>
      ))}
    </group>
  );
}
