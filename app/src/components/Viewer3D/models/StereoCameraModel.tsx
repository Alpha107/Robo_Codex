const BODY_W = 1.3;
const BODY_H = 0.32;
const BODY_D = 0.3;

export const STEREO_CAMERA_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'USB-C': [-BODY_W / 2 - 0.05, -0.05, 0],
  'Sync/Trigger': [BODY_W / 2 + 0.05, -0.05, 0],
};

export default function StereoCameraModel() {
  return (
    <group>
      {/* Bar-shaped body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#26282c" roughness={0.5} metalness={0.25} />
      </mesh>

      {/* Front face plate */}
      <mesh position={[0, 0, BODY_D / 2 + 0.005]} castShadow>
        <boxGeometry args={[BODY_W - 0.05, BODY_H - 0.05, 0.01]} />
        <meshStandardMaterial color="#101114" roughness={0.55} />
      </mesh>

      {/* Two synchronized lenses, side by side */}
      {[-0.4, 0.4].map((x) => (
        <group key={x} position={[x, 0, BODY_D / 2 + 0.02]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
            <meshStandardMaterial color="#0a0a0c" roughness={0.35} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.031]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.07, 20]} />
            <meshStandardMaterial color="#132a44" roughness={0.1} metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* USB-C connector */}
      <mesh position={[-BODY_W / 2 - 0.025, -0.05, 0]} castShadow>
        <boxGeometry args={[0.05, 0.08, 0.14]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Small sync/trigger port on the opposite side */}
      <mesh position={[BODY_W / 2 + 0.02, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
        <meshStandardMaterial color="#111318" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Mounting holes, bottom */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, -BODY_H / 2 - 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.05, 20]} />
          <meshStandardMaterial color="#05050a" />
        </mesh>
      ))}
    </group>
  );
}
