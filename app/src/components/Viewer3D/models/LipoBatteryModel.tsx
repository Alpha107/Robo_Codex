const W = 0.7;
const H = 0.12;
const D = 0.5;

export const LIPO_BATTERY_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Positive (+)': [-0.06, 0, -D / 2 - 0.05],
  'Negative (-)': [0.06, 0, -D / 2 - 0.05],
};

export default function LipoBatteryModel() {
  return (
    <group>
      {/* Foil pouch body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#c0c4cc" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Printed label */}
      <mesh position={[0, H / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, D - 0.15]} />
        <meshStandardMaterial color="#1c1c1e" />
      </mesh>
      {/* JST connector wires */}
      <mesh position={[-0.06, 0, -D / 2 - 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[0.06, 0, -D / 2 - 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, -D / 2 - 0.16]} castShadow>
        <boxGeometry args={[0.15, 0.06, 0.06]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>
    </group>
  );
}
