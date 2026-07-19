const CAP_R = 0.22;
const BODY_R = 0.16;
const BODY_H = 0.4;

export const PUSH_BUTTON_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Terminal 1': [-0.06, -BODY_H - 0.13, 0.05],
  'Terminal 2': [0.06, -BODY_H - 0.13, 0.05],
  'LED+': [-0.06, -BODY_H - 0.13, -0.05],
  'LED-': [0.06, -BODY_H - 0.13, -0.05],
};

export default function PushButtonModel() {
  return (
    <group>
      {/* Threaded mounting body */}
      <mesh position={[0, -BODY_H / 2, 0]} castShadow>
        <cylinderGeometry args={[BODY_R, BODY_R, BODY_H, 24]} />
        <meshStandardMaterial color="#2b2f36" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Panel flange */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[CAP_R + 0.05, CAP_R + 0.05, 0.04, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Colored cap */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[CAP_R, CAP_R, 0.14, 24]} />
        <meshStandardMaterial color="#d1342a" roughness={0.4} emissive="#d1342a" emissiveIntensity={0.15} />
      </mesh>
      {/* 4 wire leads at bottom */}
      {[
        [-0.06, 0.05],
        [0.06, 0.05],
        [-0.06, -0.05],
        [0.06, -0.05],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -BODY_H - 0.09, z]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.18, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
