const OUTER_R = 0.28;
const INNER_R = 0.14;
const BALL_R = 0.035;
const WIDTH = 0.12;

export const BALL_BEARING_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Inner Race': [INNER_R, 0, 0],
  'Outer Race': [0, 0, OUTER_R],
  'Ball Track': [-(INNER_R + OUTER_R) / 2, 0, 0],
};

export default function BallBearingModel() {
  const ballCount = 10;
  const ballR = (INNER_R + OUTER_R) / 2;
  return (
    <group>
      {/* Outer race */}
      <mesh castShadow>
        <cylinderGeometry args={[OUTER_R, OUTER_R, WIDTH, 32, 1, true]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.75} roughness={0.25} side={2} />
      </mesh>
      {/* Inner race */}
      <mesh castShadow>
        <cylinderGeometry args={[INNER_R, INNER_R, WIDTH, 32, 1, true]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.75} roughness={0.25} side={2} />
      </mesh>
      {/* Balls — same local XZ plane as the races' natural radius */}
      {Array.from({ length: ballCount }).map((_, i) => {
        const a = (i / ballCount) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * ballR, 0, Math.sin(a) * ballR]} castShadow>
            <sphereGeometry args={[BALL_R, 12, 12]} />
            <meshStandardMaterial color="#e8e8ec" metalness={0.8} roughness={0.15} />
          </mesh>
        );
      })}
    </group>
  );
}
