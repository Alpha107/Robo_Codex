const BODY_W = 0.25;
const BODY_H = 0.35;
const BODY_D = 0.1;

export const VOLTAGE_REGULATOR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  IN: [-0.08, -BODY_H / 2 - 0.15, 0],
  GND: [0, -BODY_H / 2 - 0.15, 0],
  OUT: [0.08, -BODY_H / 2 - 0.15, 0],
};

export default function VoltageRegulatorModel() {
  return (
    <group>
      {/* TO-220 plastic body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.45} />
      </mesh>
      {/* Metal mounting tab with hole */}
      <mesh position={[0, BODY_H / 2 + 0.06, 0]} castShadow>
        <boxGeometry args={[BODY_W - 0.03, 0.12, 0.015]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, BODY_H / 2 + 0.09, 0.01]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.02, 0.035, 16]} />
        <meshStandardMaterial color="#0a0a0c" />
      </mesh>
      {/* 3 bent legs */}
      {[-0.08, 0, 0.08].map((x) => (
        <group key={x}>
          <mesh position={[x, -BODY_H / 2 - 0.05, 0]} castShadow>
            <boxGeometry args={[0.03, 0.1, 0.02]} />
            <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[x, -BODY_H / 2 - 0.12, 0.06]} rotation={[0.9, 0, 0]} castShadow>
            <boxGeometry args={[0.03, 0.1, 0.02]} />
            <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
