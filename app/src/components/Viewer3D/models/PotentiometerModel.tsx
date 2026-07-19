const BODY_R = 0.18;
const BODY_H = 0.14;

export const POTENTIOMETER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Terminal 1 (End A)': [-0.1, -BODY_H / 2 - 0.2, 0.06],
  Wiper: [0, -BODY_H / 2 - 0.2, 0.06],
  'Terminal 2 (End B)': [0.1, -BODY_H / 2 - 0.2, 0.06],
};

export default function PotentiometerModel() {
  return (
    <group>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[BODY_R, BODY_R, BODY_H, 24]} />
        <meshStandardMaterial color="#3a4046" metalness={0.4} roughness={0.45} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, BODY_H / 2 + 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.16, 12]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Knob */}
      <mesh position={[0, BODY_H / 2 + 0.19, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Indicator line on knob */}
      <mesh position={[0, BODY_H / 2 + 0.24, 0.055]}>
        <boxGeometry args={[0.008, 0.001, 0.02]} />
        <meshStandardMaterial color="#e8e8ec" />
      </mesh>
      {/* 3 legs */}
      {[-0.1, 0, 0.1].map((x) => (
        <mesh key={x} position={[x, -BODY_H / 2 - 0.13, 0.06]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.16, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
