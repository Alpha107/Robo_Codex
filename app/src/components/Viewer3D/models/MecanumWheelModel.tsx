const HUB_R = 0.3;
const ROLLER_COUNT = 9;

export const MECANUM_WHEEL_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Hub Bore': [0, 0.06, 0],
  'Roller Assembly': [HUB_R - 0.04, 0, 0],
};

export default function MecanumWheelModel() {
  return (
    <group>
      {/* Hub */}
      <mesh castShadow>
        <cylinderGeometry args={[HUB_R - 0.08, HUB_R - 0.08, 0.08, 6]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Center bore */}
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
        <meshStandardMaterial color="#0a0a0c" />
      </mesh>
      {/* Angled rollers around the rim */}
      {Array.from({ length: ROLLER_COUNT }).map((_, i) => {
        const a = (i / ROLLER_COUNT) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * (HUB_R - 0.04), 0, Math.sin(a) * (HUB_R - 0.04)]}
            rotation={[0, -a, Math.PI / 4]}
            castShadow
          >
            <cylinderGeometry args={[0.035, 0.035, 0.16, 10]} />
            <meshStandardMaterial color="#1c1c1e" roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
